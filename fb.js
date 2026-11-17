/* Firebase 연결: 로그인, 멤버 승인, 저장소(공용/개인), 사진 저장.
   앱 본체는 예전처럼 cloud.db / cloud.assets 를 그대로 써요. 경로만 여기서 나눠요.
   - 공용 내용(드래곤 사진, 펫, 능력치)  → content/main/...  (멤버는 읽기만, 주인만 쓰기)
   - 내 게임 기록(보석, 카드, 미니게임) → users/{내 uid}/...  (나만 읽고 쓰기) */
(function(){
  "use strict";
  const SHARED_COLL=new Set(["photos","live","petdefs","petphotos","blobs","tourney"]);
  const SHARED_DOC=new Set(["settings/rarity","settings/extras","settings/battle","settings/minidefaults","settings/events"]);
  const BLANK="";
  let app,auth,fs,user=null,isOwner=false,myName="",myBday="",readyResolve,readyReject;
  const ready=new Promise((a,b)=>{ readyResolve=a; readyReject=b; });
  const $=s=>document.querySelector(s);
  const escH=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

  function mapPath(p){
    const seg=p.split("/");
    if(SHARED_COLL.has(seg[0])||SHARED_DOC.has(seg.slice(0,2).join("/"))) return "content/main/"+p;
    return "users/"+user.uid+"/"+p;
  }
  /* 무료 사용량(하루 쓰기 2만 번) 보호: 내 기록 문서는 같은 문서를 4초에 한 번만 실제로 저장하고, 그 사이 바뀐 건 마지막 값으로 모아서 저장해요.
     앱을 닫거나 다른 앱으로 넘어가면 바로 저장해요. */
  const THROTTLE_MS=4000, pend=new Map();
  function flushOne(path){ const e=pend.get(path); if(!e||!e.has) return; e.has=false; e.last=Date.now(); clearTimeout(e.t); e.t=null;
    const v=e.val, ws=e.waiters; e.waiters=[]; fs.doc(path).set(v).then(()=>ws.forEach(w=>w[0]()),err=>ws.forEach(w=>w[1](err))); }
  function flushAll(){ for(const k of pend.keys()) flushOne(k); }
  document.addEventListener("visibilitychange",()=>{ if(document.hidden) flushAll(); });
  window.addEventListener("pagehide",flushAll);
  function throttledSet(path,val){ let e=pend.get(path); if(!e){ e={last:0,t:null,has:false,val:null,waiters:[]}; pend.set(path,e); }
    e.val=val; e.has=true; const pr=new Promise((ok,bad)=>e.waiters.push([ok,bad]));
    const wait=THROTTLE_MS-(Date.now()-e.last);
    if(wait<=0) flushOne(path); else if(!e.t) e.t=setTimeout(()=>flushOne(path),wait);
    return pr; }
  function wrapDoc(path){ const ref=fs.doc(path); if(!path.startsWith("users/")||/\/settings\/(season|bank|bday|tour|raid|tama)$/.test(path)) return ref;
    return { id:ref.id, path, get:o=>ref.get(o), update:v=>ref.update(v), onSnapshot:(...a)=>ref.onSnapshot(...a),
      delete:()=>{ const e=pend.get(path); if(e){ e.has=false; clearTimeout(e.t); } return ref.delete(); },
      set:(v,o)=>o&&o.merge?ref.set(v,o):throttledSet(path,v) }; }
  function wrapColl(path){ const c=fs.collection(path); if(!path.startsWith("users/")) return c;
    return new Proxy(c,{ get(t,k){ if(k==="doc") return id=>wrapDoc(id?path+"/"+id:c.doc().path); const v=t[k]; return typeof v==="function"?v.bind(t):v; } }); }
  const dbShim={ doc:p=>wrapDoc(mapPath(p)), collection:p=>wrapColl(mapPath(p)) };

  /* ---- 사진: Firestore 문서에 base64로 저장, 이 기기 IndexedDB에 캐시 ---- */
  const urls=new Map(), loading=new Map();
  let idb=null;
  function idbOpen(){ if(idb) return idb; idb=new Promise(ok=>{ try{ const r=indexedDB.open("berk-blobs",1); r.onupgradeneeded=()=>r.result.createObjectStore("b"); r.onsuccess=()=>ok(r.result); r.onerror=()=>ok(null); }catch(e){ ok(null); } }); return idb; }
  async function idbGet(id){ const d=await idbOpen(); if(!d) return null; return new Promise(ok=>{ try{ const q=d.transaction("b").objectStore("b").get(id); q.onsuccess=()=>ok(q.result||null); q.onerror=()=>ok(null); }catch(e){ ok(null); } }); }
  async function idbPut(id,blob){ const d=await idbOpen(); if(!d) return; try{ d.transaction("b","readwrite").objectStore("b").put(blob,id); }catch(e){} }
  async function idbDel(id){ const d=await idbOpen(); if(!d) return; try{ d.transaction("b","readwrite").objectStore("b").delete(id); }catch(e){} }
  const b64ToBlob=(b,t)=>{ const bin=atob(b), a=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) a[i]=bin.charCodeAt(i); return new Blob([a],{type:t||"image/jpeg"}); };
  const blobToB64=blob=>new Promise((ok,bad)=>{ const r=new FileReader(); r.onload=()=>ok(String(r.result).split(",")[1]||""); r.onerror=bad; r.readAsDataURL(blob); });
  const validId=id=>typeof id==="string"&&/^[A-Za-z0-9_-]{6,64}$/.test(id);
  let changedT=null;
  function changed(){ clearTimeout(changedT); changedT=setTimeout(()=>{ try{ window.onBlobsLoaded&&window.onBlobsLoaded(); }catch(e){} },120); }
  function load(id){
    if(!validId(id)) return Promise.resolve(null);
    if(urls.has(id)) return Promise.resolve(urls.get(id));
    if(loading.has(id)) return loading.get(id);
    const p=(async()=>{
      let blob=await idbGet(id);
      if(!blob){
        for(const path of ["content/main/blobs/"+id,"users/"+user.uid+"/blobs/"+id]){
          try{ const s=await fs.doc(path).get(); if(s.exists){ const v=s.data(); blob=b64ToBlob(v.b,v.t); idbPut(id,blob); break; } }catch(e){}
        }
      }
      if(!blob){ loading.delete(id); return null; }
      const u=URL.createObjectURL(blob); urls.set(id,u); loading.delete(id); changed(); return u;
    })();
    loading.set(id,p); return p;
  }
  window.blobUrl=function(id){ if(urls.has(id)) return urls.get(id); if(user) load(id); return BLANK; };
  async function preload(ids,onProgress){ const list=[...new Set(ids.filter(validId))]; let n=0;
    const q=list.slice(); const work=async()=>{ while(q.length){ const id=q.shift(); await load(id); n++; onProgress&&onProgress(n,list.length); } };
    await Promise.all([work(),work(),work(),work()]); }
  const randId=()=>{ const a=new Uint8Array(16); crypto.getRandomValues(a); return [...a].map(x=>x.toString(16).padStart(2,"0")).join(""); };
  const assetsShim={
    async upload(blob,o){ o=o||{};
      let b64=await blobToB64(blob);
      if(b64.length>900000){ const e=new Error("too_large"); e.code="too_large"; throw e; }
      const id=randId(), mine=!isOwner; // 관리자가 올린 사진은 공용(기본 사진)으로, 다른 사람은 자기 칸에
      await fs.doc((mine?"users/"+user.uid:"content/main")+"/blobs/"+id).set({t:blob.type||"image/jpeg",b:b64,at:Date.now()});
      urls.set(id,URL.createObjectURL(blob)); idbPut(id,blob); return {id};
    },
    async delete(id){ if(!validId(id)) return;
      try{ await fs.doc("users/"+user.uid+"/blobs/"+id).delete(); }catch(e){}
      if(isOwner){ try{ await fs.doc("content/main/blobs/"+id).delete(); }catch(e){} }
      idbDel(id); }
  };

  /* ---- 로그인 / 승인 화면 ---- */
  function gate(html){ const g=$("#gate"); g.hidden=false; g.innerHTML=`<div class="gcard">${html}</div>`; }
  function gateOff(){ const g=$("#gate"); g.hidden=true; g.innerHTML=""; }
  function showSignIn(msg){
    gate(`<h1>버크 드래곤 도감</h1><p>드래곤 퀴즈, 뽑기, 전투, 미니게임을 하려면 로그인해요.</p>
      ${msg?`<p class="gerr">${escH(msg)}</p>`:""}
      <button class="btn" id="gSign">구글로 로그인</button>
      <p class="gnote">이름이나 이메일은 게임 기록에 저장하지 않아요. 처음 들어오면 관리자가 승인해야 시작할 수 있어요.</p>`);
    $("#gSign").onclick=async()=>{ const b=$("#gSign"); b.disabled=true; b.textContent="로그인 중…";
      const prov=new firebase.auth.GoogleAuthProvider(); prov.setCustomParameters({prompt:"select_account"});
      try{ await auth.signInWithPopup(prov); }
      catch(e){ if(e&&(e.code==="auth/popup-blocked"||e.code==="auth/operation-not-supported-in-this-environment")){ try{ await auth.signInWithRedirect(prov); return; }catch(e2){} }
        showSignIn(e&&e.code==="auth/popup-closed-by-user"?"":"로그인하지 못했어요. 다시 해 주세요."); } };
  }
  function showPending(sent){
    gate(`<h1>승인 기다리는 중</h1>
      ${sent?`<p>요청을 보냈어요. 관리자가 승인하면 바로 시작돼요.<br>이 화면을 켜 두면 승인되는 순간 자동으로 넘어가요.</p>`
        :`<p>처음 오셨네요! 관리자에게 같이 놀자고 요청을 보내요.</p>
          <label class="gfield"><span>관리자가 알아볼 이름 (별명도 좋아요)</span><input id="gName" maxlength="20" autocomplete="off" placeholder="예: 민준"></label>
          <button class="btn" id="gReq">요청 보내기</button>`}
      <button class="btn ghost small" id="gOut">다른 계정으로 로그인</button>`);
    const r=$("#gReq"); if(r) r.onclick=async()=>{ const name=($("#gName").value||"").trim().slice(0,20); if(!name){ $("#gName").focus(); return; }
      r.disabled=true; try{ await fs.doc("requests/"+user.uid).set({name,at:Date.now()}); showPending(true); }catch(e){ r.disabled=false; alertMsg("요청을 보내지 못했어요. 잠시 뒤 다시 해 주세요."); } };
    $("#gOut").onclick=()=>auth.signOut();
  }
  function alertMsg(t){ const p=document.createElement("p"); p.className="gerr"; p.textContent=t; const c=$("#gate .gcard"); if(c) c.appendChild(p); }

  let memberUnsub=null, started=false;
  async function afterLogin(u){
    user=u; isOwner=false;
    gate(`<h1>버크 드래곤 도감</h1><p>들어가는 중…</p>`);
    try{ const a=await fs.doc("content/main/meta/admin").get(); isOwner=true; myName=(a.exists&&a.data().name)||"관리자"; myBday=(a.exists&&a.data().bday)||""; }catch(e){ isOwner=false; }
    if(isOwner){ return start(); }
    if(memberUnsub) memberUnsub();
    let asked=null;
    try{ const r=await fs.doc("requests/"+u.uid).get(); asked=r.exists; }catch(e){}
    memberUnsub=fs.doc("content/main/members/"+u.uid).onSnapshot(s=>{
      if(s.exists){ myName=String((s.data()||{}).name||"").slice(0,20); myBday=String((s.data()||{}).bday||""); memberUnsub(); memberUnsub=null; fs.doc("requests/"+u.uid).delete().catch(()=>{}); start(); }
      else showPending(asked);
    },()=>showPending(asked));
  }
  function start(){
    if(started){ location.reload(); return; }
    // 같은 기기에서 다른 사람이 로그인하면, 앞사람의 게임 기록이 섞이지 않게 이 기기 저장분을 비우고 다시 열어요
    try{ const last=localStorage.getItem("berk-uid");
      if(last!==user.uid){ const keep=k=>k.startsWith("__mock"); Object.keys(localStorage).filter(k=>!keep(k)).forEach(k=>localStorage.removeItem(k));
        localStorage.setItem("berk-uid",user.uid); if(localStorage.getItem("berk-uid")===user.uid){ location.reload(); return; } } }catch(e){}
    started=true; document.body.classList.toggle("is-owner",isOwner);
    gate(`<h1>버크 드래곤 도감</h1><p id="gProg">사진 불러오는 중…</p>`);
    readyResolve({db:dbShim,assets:assetsShim});
  }

  /* ---- 관리자 도구 (앱의 사진 탭 맨 위에 보여요) ---- */
  const admin={
    watchRequests(cb){ return fs.collection("requests").onSnapshot(s=>cb(s.docs.map(d=>({uid:d.id,...d.data()}))),()=>cb([])); },
    watchMembers(cb){ return fs.collection("content/main/members").onSnapshot(s=>cb(s.docs.map(d=>({uid:d.id,...d.data()}))),()=>cb([])); },
    async approve(r){ await fs.doc("content/main/members/"+r.uid).set({name:String(r.name||"").slice(0,20),at:Date.now()}); await fs.doc("requests/"+r.uid).delete(); },
    async deny(uid){ await fs.doc("requests/"+uid).delete(); },
    async setBday(uid,v){ v=String(v||"").slice(0,5);
      if(!uid){ await fs.doc("content/main/meta/admin").set({bday:v},{merge:true}); myBday=v; return; }
      await fs.doc("content/main/members/"+uid).set({bday:v},{merge:true}); },
    async setName(n){ n=String(n||"").trim().slice(0,20); if(!n) return; await fs.doc("content/main/meta/admin").set({name:n,at:Date.now()},{merge:true}); myName=n; },
    async remove(uid){ await fs.doc("content/main/members/"+uid).delete(); },
    async gift(uid,g){ const id="gift-"+Date.now()+"-"+Math.floor(Math.random()*1e6);
      await fs.doc("users/"+(uid||user.uid)+"/purse/"+id).set({gems:Math.max(0,+g.gems||0),coins:Math.max(0,+g.coins||0),tickets:Math.max(0,+g.tickets||0),completions:0,at:Date.now()}); },
    async importData(json,onStep){
      const data=typeof json==="string"?JSON.parse(json):json;
      if(!data||data.format!=="berk-export-1") throw new Error("이 파일은 버크 내보내기 파일이 아니에요");
      await fs.doc("content/main/meta/admin").set({at:Date.now()});
      const docs=[];
      for(const [path,val] of Object.entries(data.content||{})) docs.push(["content/main/"+path,val]);
      for(const [path,val] of Object.entries(data.mine||{})) docs.push(["users/"+user.uid+"/"+path,val]);
      let n=0; const total=docs.length+Object.keys(data.blobs||{}).length;
      for(let i=0;i<docs.length;i+=200){ const b=fs.batch(); for(const [p,v] of docs.slice(i,i+200)) b.set(fs.doc(p),v); await b.commit(); n+=Math.min(200,docs.length-i); onStep&&onStep(n,total); }
      for(const [id,v] of Object.entries(data.blobs||{})){ if(!validId(id)) continue;
        const where=v.scope==="mine"?"users/"+user.uid:"content/main";
        await fs.doc(where+"/blobs/"+id).set({t:v.t||"image/jpeg",b:v.b,at:Date.now()}); n++; onStep&&onStep(n,total); }
      return total;
    }
  };

  async function publishBlobs(ids){ if(!isOwner) return; // 관리자 개인 칸에 있던 사진을 공용으로 복사
    for(const id of [...new Set(ids)]){ if(!validId(id)) continue;
      try{ const c=await fs.doc("content/main/blobs/"+id).get(); if(c.exists) continue;
        const u=await fs.doc("users/"+user.uid+"/blobs/"+id).get(); if(u.exists) await fs.doc("content/main/blobs/"+id).set(u.data()); }catch(e){} } }
  /* 랭킹: rank/{게임}/s/{uid} 에 내 최고 기록 하나. 더 좋아질 때만 고치고, 시간은 서버 시간. 같은 기록이면 먼저 세운 사람이 위 */
  const RANK_IDS=["suika","fly","hide","mem_easy","mem_normal","mem_hard","sling","run","stack","simon","egg","dodge","rhythm","magic","tetris"];
  const rank={
    async list(game){ if(!RANK_IDS.includes(game)) return []; const low=game.startsWith("mem_");
      const s=await fs.collection("rank/"+game+"/s").get();
      const arr=s.docs.map(d=>{ const v=d.data()||{}; const at=v.at&&v.at.toDate?v.at.toDate():typeof v.at==="number"?new Date(v.at):null;
        return {uid:d.id,name:String(v.name||""),score:+v.score||0,at,me:!!user&&d.id===user.uid}; });
      const t=r=>r.at?r.at.getTime():Number.MAX_SAFE_INTEGER;
      arr.sort((a,b)=>(low?a.score-b.score:b.score-a.score)||(t(a)-t(b)));
      arr.forEach((r,i)=>r.place=i+1); return arr; },
    async seed(game,score){ if(!user||!RANK_IDS.includes(game)) return; score=Math.max(0,Math.floor(+score||0)); if(!score) return; const low=game.startsWith("mem_");
      const ref=fs.doc("rank/"+game+"/s/"+user.uid); let cur=null; try{ const s=await ref.get(); if(s.exists) cur=s.data(); }catch(e){ return; }
      if(!cur||(low?score<cur.score:score>cur.score)) await ref.set({score,name:myName.slice(0,20)||"이름 없음",at:firebase.firestore.FieldValue.serverTimestamp()}); },
    async submit(game,score){ if(!user||!RANK_IDS.includes(game)) return null; score=Math.max(0,Math.floor(+score||0)); const low=game.startsWith("mem_");
      if(low&&score<=0) return null;
      const ref=fs.doc("rank/"+game+"/s/"+user.uid); let cur=null;
      try{ const s=await ref.get(); if(s.exists) cur=s.data(); }catch(e){}
      const better=!cur||(low?score<cur.score:score>cur.score);
      if(better&&(score>0||low)) await ref.set({score,name:myName.slice(0,20)||"이름 없음",at:firebase.firestore.FieldValue.serverTimestamp()});
      const list=await rank.list(game); const me=list.find(r=>r.me);
      return {improved:better&&score>0,place:me?me.place:null,total:list.length}; }
  };
  /* 친구 대결: arena/{uid} 에 내 팀 하나 */
  const arena={
    async publish(team,power){ const ref=fs.doc("arena/"+user.uid); let cur={}; try{ const s=await ref.get(); if(s.exists) cur=s.data()||{}; }catch(e){}
      if(cur.team&&JSON.stringify(cur.team)===JSON.stringify(team)&&cur.name===myName&&cur.power===power) return;
      await ref.set({name:myName.slice(0,20)||"이름 없음",team,power:Math.floor(power)||0,wins:Math.floor(cur.wins||0),losses:Math.floor(cur.losses||0),at:firebase.firestore.FieldValue.serverTimestamp()}); },
    async list(){ const s=await fs.collection("arena").get(); return s.docs.map(d=>Object.assign({},d.data(),{uid:d.id,me:d.id===user.uid})); },
    async record(win){ const ref=fs.doc("arena/"+user.uid); const s=await ref.get(); if(!s.exists) return; const v=s.data();
      await ref.set({name:v.name,team:v.team,power:v.power,wins:Math.floor(v.wins||0)+(win?1:0),losses:Math.floor(v.losses||0)+(win?0:1),at:firebase.firestore.FieldValue.serverTimestamp()}); }
  };
  /* 레이드: raid/{주} 보스 체력은 모두가 함께, raid/{주}/dmg/{uid} 는 내 기여 */
  const raid={
    watch(rid,cb){ return fs.doc("raid/"+rid).onSnapshot(s=>cb(s.exists?s.data():null),()=>cb(null)); },
    watchDmg(rid,cb){ return fs.collection("raid/"+rid+"/dmg").onSnapshot(s=>cb(s.docs.map(d=>Object.assign({},d.data(),{uid:d.id,me:d.id===user.uid}))),()=>cb([])); },
    async create(rid,data){ if(!isOwner) return; const ref=fs.doc("raid/"+rid); const s=await ref.get(); if(s.exists) return; await ref.set(data); },
    async attack(rid,dmg){ dmg=Math.max(1,Math.min(9e15,Math.floor(+dmg||0))); const ref=fs.doc("raid/"+rid), mine=fs.doc("raid/"+rid+"/dmg/"+user.uid);
      return fs.runTransaction(async tx=>{ const s=await tx.get(ref); if(!s.exists) throw new Error("no raid"); const v=s.data(); if(v.hp<=0) return {dealt:0,hp:0};
        const d=Math.min(dmg,v.maxHit,v.hp); const m=await tx.get(mine); const prev=m.exists?m.data():{dmg:0,n:0};
        tx.update(ref,{hp:v.hp-d}); tx.set(mine,{dmg:Math.floor(prev.dmg||0)+d,n:Math.floor(prev.n||0)+1,name:myName.slice(0,20)||"이름 없음",at:firebase.firestore.FieldValue.serverTimestamp()});
        return {dealt:d,hp:v.hp-d}; }); }
  };
  window.FB={ publishBlobs, rank, arena, raid, get name(){ return myName; }, get bday(){ return myBday; }, ready:()=>ready, preload, get isOwner(){ return isOwner; }, get uid(){ return user&&user.uid; },
    signOut:()=>auth.signOut(), admin, gateOff, progress:t=>{ const p=$("#gProg"); if(p) p.textContent=t; } };

  try{
    if(!window.firebase||!window.FIREBASE_CONFIG||!window.FIREBASE_CONFIG.apiKey) throw new Error("config");
    app=firebase.initializeApp(window.FIREBASE_CONFIG); auth=firebase.auth(); fs=firebase.firestore();
    try{ fs.enablePersistence({synchronizeTabs:true}).catch(()=>{}); }catch(e){}
    auth.getRedirectResult().catch(()=>{});
    auth.onAuthStateChanged(u=>{ if(u){ if(started&&user&&user.uid!==u.uid){ location.reload(); return; } afterLogin(u); } else { if(started){ location.reload(); return; } user=null; showSignIn(""); } });
  }catch(e){
    document.addEventListener("DOMContentLoaded",()=>gate(`<h1>버크 드래곤 도감</h1><p class="gerr">서버에 연결하지 못했어요. 인터넷 연결을 확인하고 다시 열어 주세요.</p>`));
    readyReject(e);
  }
})();
