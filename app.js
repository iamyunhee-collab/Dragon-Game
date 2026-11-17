
// ---------- 드래곤 종 목록 (영어 원어 + 한글 표기 변형) ----------
const SPECIES = [
 ["night-fury","Night Fury",["나이트 퓨리","나이트퓨어리","밤의분노"]],
 ["light-fury","Light Fury",["라이트 퓨리","라이트퓨어리"]],
 ["deadly-nadder","Deadly Nadder",["데들리 나더","데들리 내더","데드리 나더"]],
 ["gronckle","Gronckle",["그론클","그롱클","그론켈"]],
 ["monstrous-nightmare","Monstrous Nightmare",["몬스트러스 나이트메어","몬스터러스 나이트메어","몬스터 나이트메어"]],
 ["hideous-zippleback","Hideous Zippleback",["히디어스 지플백","히디어스 지퍼백","지플백","지퍼백"]],
 ["terrible-terror","Terrible Terror",["테러블 테러","테러블테러"]],
 ["red-death","Red Death",["레드 데스"]],
 ["stormcutter","Stormcutter",["스톰커터","스톰 커터"]],
 ["bewilderbeast","Bewilderbeast",["비윌더비스트","빌더비스트"]],
 ["rumblehorn","Rumblehorn",["럼블혼"]],
 ["hotburple","Hotburple",["핫버플"]],
 ["typhoomerang","Typhoomerang",["타이푸머랭","타이푸메랑"]],
 ["thunderdrum","Thunderdrum",["썬더드럼","선더드럼"]],
 ["whispering-death","Whispering Death",["위스퍼링 데스"]],
 ["skrill","Skrill",["스크릴"]],
 ["changewing","Changewing",["체인지윙"]],
 ["smothering-smokebreath","Smothering Smokebreath",["스모더링 스모크브레스","스모크브레스"]],
 ["timberjack","Timberjack",["팀버잭"]],
 ["scauldron","Scauldron",["스콜드론","스카울드론","스콜드런"]],
 ["snaptrapper","Snaptrapper",["스냅트래퍼","스냅트랩퍼"]],
 ["eruptodon","Eruptodon",["이럽토돈","이럽터돈"]],
 ["death-song","Death Song",["데스 송","데스송"]],
 ["armorwing","Armorwing",["아머윙"]],
 ["deathgripper","Deathgripper",["데스그리퍼"]],
 ["triple-stryke","Triple Stryke",["트리플 스트라이크"]],
 ["buffalord","Buffalord",["버팔로드","버펄로드"]],
 ["dramillion","Dramillion",["드라밀리언","드라밀리온"]],
 ["sentinel","Sentinel",["센티넬"]],
 ["raincutter","Raincutter",["레인커터"]],
 ["speed-stinger","Speed Stinger",["스피드 스팅어","스피드 스팅거"]],
 ["slitherwing","Slitherwing",["슬리더윙","슬리서윙"]],
 ["crimson-goregutter","Crimson Goregutter",["크림슨 고어거터"]],
 ["snow-wraith","Snow Wraith",["스노우 레이스","스노 레이스"]],
 ["submaripper","Submaripper",["서브마리퍼"]],
 ["razorwhip","Razorwhip",["레이저윕","레이저휩"]],
 ["hobblegrunt","Hobblegrunt",["호블그런트"]],
 ["snafflefang","Snafflefang",["스내플팽"]],
 ["shellfire","Shellfire",["셸파이어","쉘파이어","셀파이어"]],
 ["sandbuster","Sandbuster",["샌드버스터","샌드 버스터","생드버스터"]],
 ["shadow-wing","Shadow Wing",["셰도우윙","쉐도우윙","섀도우윙","섀도윙","알파 셰도우윙","알파 쉐도우윙"]],
 ["seashocker","Seashocker",["씨쇼커","시쇼커","씨 쇼커"]],
 ["screaming-death","Screaming Death",["스크리밍 데스"]],
 ["foreverwing","Foreverwing",["포에버윙","포에버 윙","포레버윙"]],
 ["catastrophic-quaken","Catastrophic Quaken",["카타스트로픽 퀘이큰","캐타스트로픽 퀘이큰","퀘이큰","퀘이컨"]],
 ["night-terror","Night Terror",["나이트 테러","나잇 테러"]]
].map(([id,en,ko])=>({id,en,ko}));
const BY_ID = Object.fromEntries(SPECIES.map(s=>[s.id,s]));

// ---------- 정답 판정 ----------
const CHO="ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
const JUNG="ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ";
const JONG=["","ㄱ","ㄲ","ㄳ","ㄴ","ㄵ","ㄶ","ㄷ","ㄹ","ㄺ","ㄻ","ㄼ","ㄽ","ㄾ","ㄿ","ㅀ","ㅁ","ㅂ","ㅄ","ㅅ","ㅆ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
// 외래어 표기에서 흔들리는 소리를 하나로 묶음
const VMAP={"ㅠ":"ㅜ","ㅛ":"ㅗ","ㅑ":"ㅏ","ㅕ":"ㅓ","ㅖ":"ㅔ","ㅒ":"ㅔ","ㅐ":"ㅔ","ㅞ":"ㅔ","ㅙ":"ㅔ","ㅚ":"ㅔ","ㅢ":"ㅣ"};
// t/th 소리: ㅅ·ㅌ·ㄷ·ㄸ·ㅆ 을 같은 소리로 봄
const CMAP={"ㄲ":"ㄱ","ㄸ":"ㄷ","ㅃ":"ㅂ","ㅆ":"ㄷ","ㅅ":"ㄷ","ㅌ":"ㄷ","ㅉ":"ㅈ"};
const JMAP={"ㅅ":"ㄷ","ㅆ":"ㄷ","ㅈ":"ㄷ","ㅊ":"ㄷ","ㅌ":"ㄷ","ㅎ":"ㄷ"};
function norm(s){
  s=String(s||"").toLowerCase().replace(/[^a-z0-9가-힣]/g,"");
  let out="";
  for(const ch of s){
    const c=ch.charCodeAt(0);
    if(c>=0xAC00&&c<=0xD7A3){
      const i=c-0xAC00, cho=Math.floor(i/588), jung=Math.floor((i%588)/28), jong=i%28;
      if(cho!==11){const k=CHO[cho]; out+=CMAP[k]||k;}
      const v=JUNG[jung]; out+=VMAP[v]||v;
      if(jong){const j=JONG[jong]; out+=JMAP[j]||CMAP[j]||j;}
    } else out+=ch;
  }
  return out;
}
function lev(a,b){
  if(a===b) return 0;
  const m=a.length,n=b.length; if(!m) return n; if(!n) return m;
  let prev=Array.from({length:n+1},(_,j)=>j);
  for(let i=1;i<=m;i++){const cur=[i];for(let j=1;j<=n;j++){cur[j]=Math.min(prev[j]+1,cur[j-1]+1,prev[j-1]+(a[i-1]===b[j-1]?0:1));}prev=cur;}
  return prev[n];
}
function allowed(len){return len<=5?1:len<=12?2:3;}
function namesOf(sp){return [...sp.ko, sp.en.replace(/\(.*\)/,""), ...(extras[sp.id]||[])].map(norm).filter(Boolean);}
function judge(input, targetId){
  const n=norm(input); if(!n) return false;
  let tBest=Infinity, tLen=0, otherBest=Infinity;
  for(const sp of SPECIES){
    for(const nm of namesOf(sp)){
      const d=lev(n,nm);
      if(sp.id===targetId){ if(d<tBest){tBest=d;tLen=nm.length;} }
      else if(d<otherBest) otherBest=d;
    }
  }
  if(tBest===0) return true;
  return tBest<=allowed(tLen) && tBest<otherBest;
}
function choseong(s){
  let out="";
  for(const ch of s){const c=ch.charCodeAt(0); out+= (c>=0xAC00&&c<=0xD7A3)? CHO[Math.floor((c-0xAC00)/588)] : ch;}
  return out;
}

// ---------- 저장소 (이 기기 브라우저) ----------
let extras={};
try{extras=JSON.parse(localStorage.getItem("httyd-extras")||"{}")||{};}catch(e){extras={};}
function saveExtras(){
  try{localStorage.setItem("httyd-extras",JSON.stringify(extras));}catch(e){}
  if(cloud) cloud.db.doc("settings/extras").set({map:JSON.parse(JSON.stringify(extras))}).catch(()=>toast("저장하지 못했어요"));
}

let db=null, memPhotos=[];
function openDB(){
  return new Promise(res=>{
    try{
      const r=indexedDB.open("httyd-quiz",1);
      r.onupgradeneeded=()=>{r.result.createObjectStore("photos",{keyPath:"id"});};
      r.onsuccess=()=>res(r.result);
      r.onerror=()=>res(null);
    }catch(e){res(null);}
  });
}
function tx(mode){return db.transaction("photos",mode).objectStore("photos");}
function dbAll(){
  if(!db) return Promise.resolve(memPhotos.slice());
  return new Promise(res=>{try{const r=tx("readonly").getAll();r.onsuccess=()=>res(r.result||[]);r.onerror=()=>res([]);}catch(e){res([]);}});
}
function dbPut(p){
  if(!db){memPhotos.push(p);return Promise.resolve();}
  return new Promise(res=>{try{const r=tx("readwrite").put(p);r.onsuccess=()=>res();r.onerror=()=>res();}catch(e){memPhotos.push(p);res();}});
}
function dbDel(id){
  if(!db){memPhotos=memPhotos.filter(p=>p.id!==id);return Promise.resolve();}
  return new Promise(res=>{try{const r=tx("readwrite").delete(id);r.onsuccess=()=>res();r.onerror=()=>res();}catch(e){res();}});
}

// ---------- 공유 저장소 (어느 기기에서 열어도 같은 사진) ----------
let cloud=null, cloudState="pending", cloudPhotos=[];
let photos=[], localPhotos=[]; const urlCache=new Map();
function urlOf(p){
  if(p.assetId) return blobUrl(p.assetId);
  if(!urlCache.has(p.id)) urlCache.set(p.id,URL.createObjectURL(p.blob)); return urlCache.get(p.id);
}
function rerender(){
  updateTop();
  if(view==="quiz"){ if(!quiz.deck.length||quiz.done) renderQuiz(); }
  else if(view==="cup"){ if(!cup.round) renderCup(); }
  else if(view==="fortune"){ renderFortune(); }
  else if(view==="battle"){ softRenderBattle(); }
  else if(view==="home"){ renderHome(); }
  else if(view==="click"){ }
  else if(!document.activeElement||document.activeElement.id!=="q") renderManage();
}
async function refresh(){
  localPhotos=(await dbAll()).filter(p=>BY_ID[p.speciesId]);
  photos = cloud ? cloudPhotos.filter(p=>BY_ID[p.speciesId]) : localPhotos;
  rerender();
}
async function addPhoto(sid, blob){
  if(cloud){
    const r=await cloud.assets.upload(blob,{type:blob.type||"image/jpeg"});
    await cloud.db.collection("photos").doc().set({speciesId:sid,assetId:r.id,createdAt:Date.now()});
  } else await dbPut({id:uid(),speciesId:sid,blob});
}
async function removePhoto(p){
  if(p.assetId){
    await cloud.db.collection("photos").doc(p.id).delete();
    try{await cloud.assets.delete(p.assetId);}catch(e){}
  } else {
    await dbDel(p.id);
    if(urlCache.has(p.id)){URL.revokeObjectURL(urlCache.get(p.id));urlCache.delete(p.id);}
  }
}
function errMsg(e){return e&&e.code==="too_large"?"사진이 너무 커요":e&&e.code==="rate_limited"?"잠시 뒤에 다시 해주세요":"저장하지 못했어요. 다시 시도해 주세요";}
async function initCloud(){
  try{
    const {db:d,assets:a}=await FB.ready();
    await new Promise((ok,bad)=>{
      const t=setTimeout(()=>bad(0),10000);
      d.collection("photos").onSnapshot(s=>{
        clearTimeout(t);
        cloudPhotos=s.docs.map(x=>({id:x.id,...x.data()}));
        if(cloud){ FB.preload(cloudPhotos.map(p=>p.assetId)); refresh(); } ok();
      },()=>{clearTimeout(t);bad(0);});
    });
    cloud={db:d,assets:a}; cloudState="on";
    d.collection("live").onSnapshot(s=>{ livePhotos=s.docs.map(x=>({id:x.id,...x.data()})).filter(p=>LIVE_BY[p.speciesId]); if(view==="cup"&&cup.mode==="live"&&!cup.round) renderCup(); },()=>{});
    d.collection("champions").onSnapshot(s=>{ champs=s.docs.map(x=>x.data()); if(view==="cup"&&(!cup.round||cup.champ)) renderCup(); },()=>{});
    d.doc("settings/rarity").onSnapshot(s=>{ if(s.exists){ const v=s.data()||{}; rarity=JSON.parse(JSON.stringify(v.map||{})); if(v.odds) odds=Object.assign({},ODDS0,v.odds); if(view==="fortune") renderFortune(); } },()=>{});
    d.collection("petdefs").onSnapshot(s=>{ petDefs=s.docs.map(x=>({id:x.id,...x.data()})).sort((a,b)=>(a.createdAt||0)-(b.createdAt||0)); if(view==="fortune") renderFortune(); },()=>{});
    d.collection("petphotos").onSnapshot(s=>{ petPhotos=s.docs.map(x=>({id:x.id,...x.data()})); if(view==="fortune") renderFortune(); },()=>{});
    initBattleCloud(d); initClickCloud(d); initSuikaCloud(d); initMiniCloud(d); initBerkCloud(d); initEventsCloud(d); initG5Cloud(d);
    await initPurse(d);
    initTally(d);
    d.doc("settings/extras").onSnapshot(s=>{ if(s.exists){ extras=JSON.parse(JSON.stringify((s.data()||{}).map||{})); rerender(); } },()=>{});
  }catch(e){ cloud=null; cloudState="off"; }
  if(cloud){ try{ await FB.preload([...cloudPhotos.map(p=>p.assetId),...(typeof petPhotos!=="undefined"?petPhotos.map(p=>p.assetId):[])],(n,t)=>FB.progress(`사진 불러오는 중… ${n}/${t}`)); }catch(e){} }
  await refresh(); FB.gateOff();
}

window.onBlobsLoaded=function(){ try{ skLoadImgs(); }catch(e){} rerender(); try{ if(view==="click"){ if(mgMode==="click") renderClick(); else if(mgMode==="suika") skRenderSlots(); } }catch(e){} };
async function shrink(file){
  try{
    const src=URL.createObjectURL(file);
    const img=await new Promise((ok,bad)=>{const i=new Image();i.onload=()=>ok(i);i.onerror=bad;i.src=src;});
    const max=1000, sc=Math.min(1,max/Math.max(img.naturalWidth,img.naturalHeight));
    const c=document.createElement("canvas"); c.width=Math.round(img.naturalWidth*sc); c.height=Math.round(img.naturalHeight*sc);
    c.getContext("2d").drawImage(img,0,0,c.width,c.height); URL.revokeObjectURL(src);
    return await new Promise(ok=>c.toBlob(b=>ok(b||file),"image/jpeg",0.85));
  }catch(e){return file;}
}
// 일부 폰 사진(HEIC 등)은 브라우저가 못 읽어서 원본 그대로 올라가요
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,8);

// ---------- 공통 UI ----------
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
let toastT; function toast(msg){const t=$("#toast");t.textContent=msg;t.hidden=false;clearTimeout(toastT);toastT=setTimeout(()=>t.hidden=true,1800);}
function updateTop(){
  const label = view==="cup"&&cup.round&&!cup.champ ? `${cup.mode==="live"?"실사화 ":""}${cup.size}강 · ` : "";
  $("#topStat").innerHTML = `<span class="gembar">${label}<svg class="gem" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h12l4 6-10 12L2 9z" fill="var(--gem)"/><path d="M2 9h20M8 3l4 18 4-18M6 3l2 6m10-6-2 6" stroke="rgba(255,255,255,.55)" stroke-width="1.2" fill="none"/></svg><span>${fmt(typeof gems==="number"?gems:0)}</span>${typeof coins==="number"&&coins>0?`<span style="margin-left:8px;display:inline-flex;align-items:center;gap:4px"><svg class="gem" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="var(--coin)"/><circle cx="12" cy="12" r="7" fill="none" stroke="rgba(255,255,255,.6)" stroke-width="1.5"/><path d="M12 7.5v9M9.5 9.5h4a1.6 1.6 0 0 1 0 3.2h-3a1.6 1.6 0 0 0 0 3.2h4" stroke="rgba(120,70,0,.75)" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>${fmt(coins)}</span>`:""}</span>`;
}
let view="home";
function show(v){ if(typeof mgFull!=="undefined"&&mgFull&&v!=="click") mgSetFull(false);
  view=v; $("#homeView").hidden=v!=="home"; $("#tabHome").setAttribute("aria-selected",v==="home"); $("#quizView").hidden=v!=="quiz"; $("#manageView").hidden=v!=="manage"; $("#cupView").hidden=v!=="cup"; $("#fortuneView").hidden=v!=="fortune"; $("#battleView").hidden=v!=="battle"; $("#clickView").hidden=v!=="click"; $("#tabClick").setAttribute("aria-selected",v==="click"); $("#tabBattle").setAttribute("aria-selected",v==="battle");
  $("#tabQuiz").setAttribute("aria-selected",v==="quiz"); $("#tabManage").setAttribute("aria-selected",v==="manage"); $("#tabCup").setAttribute("aria-selected",v==="cup"); $("#tabFortune").setAttribute("aria-selected",v==="fortune");
  if(v==="home") renderHome(); else if(v==="quiz") renderQuiz(); else if(v==="cup") renderCup(); else if(v==="fortune") renderFortune(); else if(v==="battle") renderBattle(); else if(v==="click") renderClick(); else renderManage();
  updateTop(); window.scrollTo(0,0); if(typeof updateAutoPill==="function") updateAutoPill();
}
$("#tabQuiz").onclick=()=>show("quiz"); $("#tabHome").onclick=()=>show("home");
$("#tabManage").onclick=()=>show("manage");
$("#tabCup").onclick=()=>show("cup");
$("#tabFortune").onclick=()=>show("fortune");
$("#tabBattle").onclick=()=>show("battle");
$("#tabClick").onclick=()=>show("click");

// ---------- 퀴즈 ----------
const quiz={deck:[],i:0,score:0,answered:null,hint:false,wrong:[],done:false};
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function startQuiz(list){
  const src=list||photos;
  quiz.deck=shuffle(src.map(p=>p.id)); quiz.i=0; quiz.score=0; quiz.answered=null; quiz.hint=false; quiz.wrong=[]; quiz.done=false; quiz.stopped=0;
  renderQuiz(); updateTop();
}
function renderQuiz(){
  const el=$("#quizView");
  if(!photos.length){
    el.innerHTML=`<div class="empty">
      <h2>아직 문제가 없어요</h2>
      <p class="note">드래곤 사진을 넣으면 그 수만큼 문제가 생겨요. 지금 등록된 종은 ${SPECIES.length}가지예요.</p>
      <ol><li>아래 <b>사진 관리</b> 탭을 눌러요.</li><li>종 이름 옆 <b>이미지 검색</b>으로 사진을 찾아 폰에 저장해요.</li><li><b>사진 추가</b>로 저장한 사진을 넣어요.</li></ol>
      <button class="btn" id="goManage">사진 넣으러 가기</button></div>`;
    $("#goManage").onclick=()=>show("manage"); return;
  }
  if(!quiz.deck.length||quiz.done&&quiz.deck.length===0){
    const sp=new Set(photos.map(p=>p.speciesId)).size;
    el.innerHTML=`<div class="end"><h2>드래곤 이름 맞히기</h2>
      <p class="note">사진을 보고 드래곤 종 이름을 써요. 띄어쓰기는 상관없고, 비슷하게 쓰면 정답이에요.</p>
      <p style="margin:0"><span class="big">${photos.length}</span> 문제 · ${sp}종</p>
      <button class="btn" id="go">시작하기</button></div>`;
    $("#go").onclick=()=>startQuiz(); return;
  }
  if(quiz.done){
    const tot=quiz.deck.length;
    el.innerHTML=`<div class="end"><h2>${quiz.score===tot?"모두 맞혔어요! 드래곤 라이더 합격!":quiz.stopped?"여기까지 풀었어요":"끝까지 다 풀었어요"}</h2>
      <p style="margin:0"><span class="big">${quiz.score}</span> / ${tot} 정답</p>
      ${quiz.stopped?`<p class="note" style="margin:0">전체 ${quiz.stopped}문제 중 ${tot}문제를 풀고 멈췄어요.</p>`:""}
      <div class="row"><button class="btn" id="again">처음부터 다시</button><button class="btn kakao" id="qBrag">자랑하기</button>
      ${quiz.wrong.length?`<button class="btn ghost" id="retry">틀린 ${quiz.wrong.length}문제만 다시</button>`:""}</div></div>`;
    $("#again").onclick=()=>startQuiz(); { const qb=$("#qBrag"); if(qb) qb.onclick=()=>shareCard({game:"드래곤 이름 퀴즈",big:`${quiz.score} / ${quiz.deck.length} 정답`}); }
    if(quiz.wrong.length) $("#retry").onclick=()=>startQuiz(photos.filter(p=>quiz.wrong.includes(p.id)));
    return;
  }
  const p=photos.find(x=>x.id===quiz.deck[quiz.i]);
  if(!p){quiz.deck.splice(quiz.i,1); if(quiz.i>=quiz.deck.length) quiz.done=true; return renderQuiz();}
  const sp=BY_ID[p.speciesId]; const tot=quiz.deck.length; const a=quiz.answered;
  el.innerHTML=`<div class="progress" aria-hidden="true"><i style="width:${(quiz.i/tot)*100}%"></i></div>
    <div class="plate"><img src="${urlOf(p)}" alt="문제 ${quiz.i+1}의 드래곤 사진"></div>
    <div class="slate">
      <p class="ask">${quiz.i+1} / ${tot} · 이 드래곤의 종 이름은? <span class="note" style="font-family:var(--body)">(${quiz.score}점)</span></p>
      ${quiz.hint&&!a?`<p class="hint">${esc(choseong(sp.ko[0]))}</p>`:""}
      ${a?`<div class="verdict ${a.ok?"ok":"no"}">
          <b class="${a.ok?"ok-t":"no-t"}">${a.ok?"정답! 보석 +1":(a.pass?"정답은":"아쉬워요")}</b>
          ${!a.ok&&!a.pass&&a.text?`<span class="en">쓴 답: ${esc(a.text)}</span>`:""}
          <span class="name">${esc(sp.ko[0])}</span><span class="en">${esc(sp.en)}</span></div>
          <button class="btn" id="next">${quiz.i+1<tot?"다음 문제":"결과 보기"}</button>
          ${quiz.i+1<tot?`<div class="row"><button class="btn ghost small" id="stop">그만하기</button></div>`:""}`
        :`<form id="f" class="row" autocomplete="off">
          <label class="sr" for="ans">정답 입력</label>
          <input class="answer" id="ans" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="예: 나이트 퓨리" enterkeyhint="done">
          <button class="btn" type="submit">확인</button></form>
          <div class="row"><button class="btn ghost small" id="hintBtn" ${quiz.hint?"disabled":""}>초성 힌트</button>
          <button class="btn ghost small" id="pass">모르겠어요</button>
          <button class="btn ghost small" id="stop" style="margin-left:auto">그만하기</button></div>`}
    </div>`;
  const st=$("#stop");
  if(st) st.onclick=()=>{
    if(st.dataset.armed){ stopQuiz(); return; }
    st.dataset.armed="1"; st.textContent="한 번 더 누르면 그만해요"; st.style.borderColor="var(--blood)"; st.style.color="var(--blood)";
    setTimeout(()=>{ if(st.isConnected){ delete st.dataset.armed; st.textContent="그만하기"; st.style.borderColor=""; st.style.color=""; } },3000);
  };
  if(a){$("#next").onclick=next; $("#next").focus();}
  else{
    $("#f").onsubmit=e=>{e.preventDefault(); const v=$("#ans").value.trim(); if(!v){$("#ans").focus();return;}
      const ok=judge(v,sp.id); quiz.answered={ok,text:v}; if(ok){ quiz.score++; addGems(1,"quiz"); } else quiz.wrong.push(p.id); renderQuiz(); updateTop();};
    $("#hintBtn").onclick=()=>{quiz.hint=true; const v=$("#ans").value; renderQuiz(); $("#ans").value=v; $("#ans").focus();};
    $("#pass").onclick=()=>{quiz.answered={ok:false,pass:true}; quiz.wrong.push(p.id); renderQuiz();};
  }
}
function stopQuiz(){
  const done=quiz.i+(quiz.answered?1:0);
  if(!done){ quiz.deck=[]; quiz.done=false; quiz.stopped=0; }
  else { quiz.stopped=quiz.deck.length; quiz.deck=quiz.deck.slice(0,done); quiz.done=true; }
  quiz.answered=null; quiz.hint=false; renderQuiz(); updateTop(); window.scrollTo(0,0);
}
function next(){quiz.i++; quiz.answered=null; quiz.hint=false; if(quiz.i>=quiz.deck.length) quiz.done=true; renderQuiz(); updateTop(); window.scrollTo(0,0); const i=$("#ans"); if(i) i.focus({preventScroll:true});}

// ---------- 드래곤 월드컵 ----------
let champs=[];
// 실사화 월드컵 참가자
const LIVE=[
 ["la-toothless","투슬리스","Toothless · Night Fury"],
 ["la-stormfly","스톰플라이","Stormfly · Deadly Nadder"],
 ["la-barfbelch","바프 & 벨치","Barf & Belch · Hideous Zippleback"],
 ["la-hookfang","훅팽","Hookfang · Monstrous Nightmare"],
 ["la-terror","테러블 테러","Terrible Terror"],
 ["la-rumblehorn","럼블혼","Rumblehorn"],
 ["la-skrill","스크릴","Skrill"],
 ["la-gronckle","그롱클","Gronckle"],
 ["la-reddeath","레드 데스","Red Death"]
].map(([id,ko,en])=>({id,ko,en}));
const LIVE_BY=Object.fromEntries(LIVE.map(x=>[x.id,x]));
let livePhotos=[], liveSel=new Set(LIVE.map(x=>x.id)), liveArmed=null, liveMem=[];
try{const v=JSON.parse(localStorage.getItem("httyd-livesel")||"null"); if(Array.isArray(v)) liveSel=new Set(v.filter(id=>LIVE_BY[id]));}catch(e){}
function saveSel(){try{localStorage.setItem("httyd-livesel",JSON.stringify([...liveSel]));}catch(e){}}
const koOf=sid=>LIVE_BY[sid]?LIVE_BY[sid].ko:BY_ID[sid]?BY_ID[sid].ko[0]:"?";
const enOf=sid=>LIVE_BY[sid]?LIVE_BY[sid].en:BY_ID[sid]?BY_ID[sid].en:"";
const inMode=sid=>cup.mode==="live"?!!LIVE_BY[sid]:!!BY_ID[sid];
async function addLive(eid, blob){
  if(cloud){
    const r=await cloud.assets.upload(blob,{type:blob.type||"image/jpeg"});
    await cloud.db.collection("live").doc().set({speciesId:eid,assetId:r.id,createdAt:Date.now()});
  } else { liveMem.push({id:uid(),speciesId:eid,blob}); livePhotos=liveMem.slice(); }
}
async function removeLive(p){
  if(p.assetId){ await cloud.db.collection("live").doc(p.id).delete(); try{await cloud.assets.delete(p.assetId);}catch(e){} }
  else { liveMem=liveMem.filter(x=>x.id!==p.id); livePhotos=liveMem.slice(); }
}
function modeBar(){
  return `<div class="chips" role="group" aria-label="월드컵 종류">
    <button class="chip" data-mode="anim" aria-pressed="${cup.mode==="anim"}">애니메이션</button>
    <button class="chip" data-mode="live" aria-pressed="${cup.mode==="live"}">실사화</button></div>`;
}
function bindModeBar(el){
  el.querySelectorAll("[data-mode]").forEach(b=>b.onclick=()=>{cup.mode=b.dataset.mode; cup.round=null; cup.champ=null; renderCup(); updateTop();});
}
function renderLiveHome(el){
  const cnt={}; livePhotos.forEach(p=>cnt[p.speciesId]=(cnt[p.speciesId]||0)+1);
  const ready=LIVE.filter(x=>liveSel.has(x.id)&&cnt[x.id]);
  const sel=LIVE.filter(x=>liveSel.has(x.id)).length;
  const missing=LIVE.filter(x=>liveSel.has(x.id)&&!cnt[x.id]).length;
  let label, ok=false;
  if(ready.length>=8){ ok=true; label = ready.length>8 ? `8강 시작 · ${ready.length}마리 중 ${ready.length-8}마리 랜덤 탈락` : "8강 시작"; }
  else label = `사진 있는 참가자 ${ready.length}/8마리`;
  el.innerHTML=`${modeBar()}<div class="end">
    <h2>실사화 드래곤 월드컵</h2>
    <p class="note">사진이 있는 참가자가 8마리를 넘으면, 판마다 남는 드래곤이 무작위로 빠져요. 꼭 빼고 싶은 드래곤은 "참가" 버튼을 눌러 빼면 돼요.</p>
    <button class="btn" id="liveGo" ${ok?"":"disabled"} style="${ok?"":"opacity:.55"}">${label}</button>
    ${cloud?"":`<p class="warn" style="margin:0">공유 저장소에 연결되지 않아서, 여기서 넣은 사진은 창을 닫으면 사라져요.</p>`}
    <div class="list" style="width:100%">${LIVE.map(x=>{
      const ps=livePhotos.filter(p=>p.speciesId===x.id), on=liveSel.has(x.id);
      return `<div class="sp" style="${on?"":"opacity:.55"}">
        <div class="sp-head">
          <button class="chip" data-sel="${x.id}" aria-pressed="${on}" aria-label="${esc(x.ko)} 참가">${on?"참가":"빠짐"}</button>
          <div class="sp-name"><span class="ko">${esc(x.ko)}</span><span class="en">${esc(x.en)}</span></div>
          <span class="count ${ps.length?"has":""}">${ps.length}장</span></div>
        ${ps.length?`<div class="thumbs">${ps.map(p=>`<button class="thumb ${liveArmed===p.id?"armed":""}" data-lpid="${p.id}" aria-label="${esc(x.ko)} 사진${liveArmed===p.id?" 삭제":""}"><img src="${urlOf(p)}" alt=""></button>`).join("")}</div>`:""}
        <div class="sp-actions">
          <a class="btn ghost small" href="https://www.google.com/search?tbm=isch&q=${encodeURIComponent("How to Train Your Dragon 2025 live action "+x.en.split(" · ")[0])}" target="_blank" rel="noopener">이미지 검색</a>
          <span class="btn small pickwrap owner-only">사진 추가<input type="file" accept="image/*" multiple data-pick="live:${x.id}" aria-label="${esc(x.ko)} 사진 추가"></span>
        </div></div>`;}).join("")}</div>
    ${hallHTML()}</div>`;
  bindModeBar(el);
  if(ok) $("#liveGo").onclick=()=>startCup(8);
  el.querySelectorAll("[data-sel]").forEach(b=>b.onclick=()=>{const id=b.dataset.sel; liveSel.has(id)?liveSel.delete(id):liveSel.add(id); saveSel(); renderCup();});
  el.querySelectorAll("[data-lpid]").forEach(t=>t.onclick=async()=>{
    const id=t.dataset.lpid;
    if(liveArmed===id){ liveArmed=null; const p=livePhotos.find(x=>x.id===id); try{ if(p) await removeLive(p); toast("사진을 지웠어요"); }catch(e){ toast("지우지 못했어요"); } }
    else liveArmed=id;
    renderCup();
  });
}
const cup={mode:"anim",size:0,round:null,next:[],idx:0,hist:[],champ:null,second:null,busy:false};
const ROUND_NAME=n=>n===2?"결승":n===4?"4강":`${n}강`;
function cupPool(){
  const src=cup.mode==="live"?livePhotos.filter(p=>liveSel.has(p.speciesId)):photos;
  const by={}; src.forEach(p=>{(by[p.speciesId]=by[p.speciesId]||[]).push(p);});
  return Object.keys(by).map(sid=>{const ps=by[sid]; return {sid, p:ps[Math.floor(Math.random()*ps.length)]};});
}
function startCup(size){
  cup.size=size; cup.round=shuffle(cupPool()).slice(0,size); cup.next=[]; cup.idx=0; cup.hist=[]; cup.champ=null; cup.second=null; cup.busy=false;
  renderCup(); updateTop(); window.scrollTo(0,0);
}
function cupPick(side){
  if(cup.busy) return; cup.busy=true;
  const a=cup.round[cup.idx*2], b=cup.round[cup.idx*2+1], win=side?b:a, lose=side?a:b;
  const cards=document.querySelectorAll(".pick");
  cards[side].classList.add("won"); cards[1-side].classList.add("lost");
  setTimeout(()=>{
    cup.hist.push({round:cup.round,next:cup.next.slice(),idx:cup.idx});
    cup.next.push(win); cup.idx++;
    if(cup.idx*2>=cup.round.length){
      if(cup.next.length===1){ cup.champ=win; cup.second=lose; saveChamp(win.sid); setTimeout(()=>addGems(1,"cup"),300); }
      else { cup.round=cup.next; cup.next=[]; cup.idx=0; }
    }
    cup.busy=false; renderCup(); updateTop(); window.scrollTo(0,0);
  },420);
}
function cupUndo(){ const h=cup.hist.pop(); if(!h) return; cup.round=h.round; cup.next=h.next; cup.idx=h.idx; renderCup(); }
function saveChamp(sid){
  if(cloud) cloud.db.collection("champions").doc().set({speciesId:sid,size:cup.size,mode:cup.mode,at:Date.now()}).catch(()=>{});
  else champs.push({speciesId:sid,size:cup.size,mode:cup.mode,at:Date.now()});
}
function photoFor(sid){ return (cup.mode==="live"?livePhotos:photos).find(p=>p.speciesId===sid); }
function hallHTML(){
  const c={}; champs.forEach(x=>{ if(inMode(x.speciesId)) c[x.speciesId]=(c[x.speciesId]||0)+1; });
  const top=Object.entries(c).sort((a,b)=>b[1]-a[1]).slice(0,5);
  if(!top.length) return "";
  return `<p class="sec-title">명예의 전당</p><ol class="hall">${top.map(([sid,n])=>{const p=photoFor(sid);
    return `<li>${p?`<img src="${urlOf(p)}" alt="">`:""}<span class="nm">${esc(koOf(sid))}</span><span class="wins">우승 ${n}회</span></li>`;}).join("")}</ol>`;
}
function renderCup(){
  const el=$("#cupView");
  const n=new Set(photos.map(p=>p.speciesId)).size;
  if(cup.champ){
    const w=cup.champ, s2=cup.second;
    el.innerHTML=`<div class="end">
      <h2>${cup.mode==="live"?"실사화 ":""}${esc(ROUND_NAME(cup.size))} 월드컵 우승!</h2>
      <p class="note" style="margin:0">월드컵을 끝까지 해서 보석 1개를 받았어요.</p>
      <div class="crown"><img src="${urlOf(w.p)}" alt="${esc(koOf(w.sid))}"></div>
      <p style="margin:0"><span class="big" style="font-size:2.2rem">${esc(koOf(w.sid))}</span><br><span class="en">${esc(enOf(w.sid))}</span></p>
      <p class="note">준우승: ${esc(koOf(s2.sid))}</p>
      <div class="row"><button class="btn" id="cupAgain">한 번 더</button><button class="btn ghost" id="cupHome">대진 고르기</button><button class="btn kakao" id="cupBrag">자랑하기</button></div>
      ${hallHTML()}</div>`;
    $("#cupAgain").onclick=()=>startCup(cup.size); { const cb=$("#cupBrag"); if(cb) cb.onclick=()=>shareCard({game:"내 드래곤 월드컵 우승",big:koOf(cup.champ.sid),photo:urlOf(cup.champ.p)}); }
    $("#cupHome").onclick=()=>{cup.round=null; cup.champ=null; renderCup(); updateTop();};
    return;
  }
  if(!cup.round&&cup.mode==="live") return renderLiveHome(el);
  if(!cup.round){
    if(n<4){ el.innerHTML=`${modeBar()}<div class="empty"><h2>드래곤이 더 필요해요</h2><p class="note">월드컵은 사진이 있는 종이 4종 이상일 때 할 수 있어요. 지금은 ${n}종이에요.</p><button class="btn" id="goM">사진 넣으러 가기</button></div>`; $("#goM").onclick=()=>show("manage"); bindModeBar(el); return; }
    const sizes=[4,8,16,32,64].filter(x=>x<=n);
    el.innerHTML=`${modeBar()}<div class="end">
      <h2>최애 드래곤 월드컵</h2>
      <p class="note">두 드래곤 중 더 좋은 쪽을 눌러요. 마지막까지 살아남은 드래곤이 우승이에요. 사진이 있는 ${n}종 중에서 무작위로 뽑아요.</p>
      <div class="sizes">${sizes.map(x=>`<button class="btn ${x===sizes[sizes.length-1]?"":"ghost"}" data-size="${x}">${x}강</button>`).join("")}</div>
      ${hallHTML()}</div>`;
    bindModeBar(el);
    el.querySelectorAll("[data-size]").forEach(b=>b.onclick=()=>startCup(+b.dataset.size));
    return;
  }
  const a=cup.round[cup.idx*2], b=cup.round[cup.idx*2+1], games=cup.round.length/2;
  const card=(c,i)=>`<button class="pick" data-side="${i}" aria-label="${esc(koOf(c.sid))} 고르기"><img src="${urlOf(c.p)}" alt=""><span class="lbl"><b>${esc(koOf(c.sid))}</b><span>${esc(enOf(c.sid))}</span></span></button>`;
  el.innerHTML=`<div class="cup-head"><p class="cup-round">${ROUND_NAME(cup.round.length)}</p><span class="cup-step">${cup.round.length===2?"":`${cup.idx+1} / ${games}`}</span></div>
    <div class="progress" aria-hidden="true"><i style="width:${(cup.idx/games)*100}%"></i></div>
    <div class="duel">${card(a,0)}<span class="vs">VS</span>${card(b,1)}</div>
    <div class="row"><button class="btn ghost small" id="cupBack" ${cup.hist.length?"":"disabled"}>이전으로</button><button class="btn ghost small" id="cupQuit">그만하기</button></div>`;
  el.querySelectorAll(".pick").forEach(btn=>btn.onclick=()=>cupPick(+btn.dataset.side));
  $("#cupBack").onclick=cupUndo;
  $("#cupQuit").onclick=()=>{cup.round=null; renderCup(); updateTop();};
}

// ---------- 드래곤 뽑기 ----------
const TIERS=[
 {k:"legend",ko:"전설",cls:"t-legend"},
 {k:"epic",ko:"영웅",cls:"t-epic"},
 {k:"rare",ko:"희귀",cls:"t-rare"},
 {k:"common",ko:"일반",cls:"t-common"}
];
const TIER_BY=Object.fromEntries(TIERS.map(t=>[t.k,t]));
const ODDS0={legend:3,epic:12,rare:25,common:60};
const COST=8;
const PET_GEM_COST=1000;
const COIN_RATE=1; // 보석 1개 = 코인 1개
const NEW_REWARD={common:1,rare:2,epic:4,legend:8};
let rarity={}, odds=Object.assign({},ODDS0), last=null, gems=0, coins=0, completions=0, tickets=0, awarded=-1,
    petDefs=[], petPhotos=[], lastPet=null, pz={editing:false,armedDel:null},
    fz={editing:false,hatching:false,rfilter:"all",sub:"draw",resetArmed:false,auto:false,autoStats:{n:0,newN:0}};
try{const v=JSON.parse(localStorage.getItem("httyd-gacha2")||"null"); if(v){ rarity=v.rarity||{}; if(v.odds) odds=Object.assign({},ODDS0,v.odds); tLocalLoad(v); gems=v.gems||0; coins=v.coins||0; completions=v.completions||0; tickets=v.tickets||0; awarded=v.awarded??-1; petDefs=v.petDefs||[]; }}catch(e){}
function saveLocal(){try{localStorage.setItem("httyd-gacha2",JSON.stringify({rarity,odds,gems,coins,completions,tickets,awarded,petDefs,pullC,petC}));}catch(e){}}
function saveRarity(){ saveLocal(); if(cloud) cloud.db.doc("settings/rarity").set({map:JSON.parse(JSON.stringify(rarity)),odds:Object.assign({},odds)}).catch(()=>toast("저장하지 못했어요")); }
// 지갑: 열린 화면마다 자기 몫(변화량)만 따로 저장하고, 합계를 보여줘요.
// 그래서 폰·PC에서 동시에 열어도 서로 덮어쓰지 않아요.
const INST="i"+Date.now().toString(36)+Math.random().toString(36).slice(2,7);
const W_FIELDS=["gems","tickets","completions","coins"];

// 뽑기 기록: 한 번 뽑을 때마다 문서를 하나씩 만들면 저장공간(문서 25,000개)이 금방 차요.
// 그래서 "종마다 몇 번 뽑았는지" 숫자만 저장해요. 지갑처럼 열린 화면마다 자기 몫(tally/<화면>)만 저장하고 합계를 보여줘요.
// 예전 개별 기록(pulls, pets)은 tally/base 하나로 합친 뒤 지워요. 선물은 tally/gift-… 문서로 넣으면 돼요 ({p:{펫id:1}} 또는 {d:{드래곤id:1}}).
var pullC=pullC||{}, petC=petC||{}; // 위쪽에서 저장된 값을 이미 읽었을 수 있어요
var tBase={d:{},p:{}}, tOthers={d:{},p:{}}, tMine={d:{},p:{}}, tLocal=tLocal||{d:{},p:{}}, tallyOn=false, tallyT=null, tallyWriting=false, tallyAgain=false, migrating=false, cleaning=false;
function tLocalLoad(v){
  const d={},p={};
  if(v.pullC) Object.assign(d,v.pullC); else (v.pulls||[]).forEach(x=>{ if(x&&x.speciesId) d[x.speciesId]=(d[x.speciesId]||0)+1; });
  if(v.petC) Object.assign(p,v.petC); else (v.petsOwned||[]).forEach(x=>{ if(x&&x.petId) p[x.petId]=(p[x.petId]||0)+1; });
  tLocal={d,p}; pullC=Object.assign({},d); petC=Object.assign({},p);
}
function sumMaps(){ const o={}; for(const m of arguments) for(const k in (m||{})) o[k]=(o[k]||0)+(+m[k]||0); return o; }
function recomputeTally(){
  if(tallyOn){ pullC=sumMaps(tBase.d,tOthers.d,tMine.d); petC=sumMaps(tBase.p,tOthers.p,tMine.p); }
  else { pullC=Object.assign({},tLocal.d); petC=Object.assign({},tLocal.p); }
}
const pullTotal=()=>{ let n=0; for(const k in pullC) n+=pullC[k]; return n; };
const hasPull=sid=>(pullC[sid]||0)>0;
const pullN=sid=>pullC[sid]||0;
const petN=id=>petC[id]||0;
function addCount(kind,id){
  if(cloud){ tMine[kind][id]=(tMine[kind][id]||0)+1; clearTimeout(tallyT); tallyT=setTimeout(flushTally,600); }
  else tLocal[kind][id]=(tLocal[kind][id]||0)+1;
  recomputeTally(); saveLocal();
}
async function flushTally(){
  if(!cloud) return;
  if(tallyWriting){ tallyAgain=true; return; }
  tallyWriting=true; let ok=true;
  try{ await cloud.db.doc("tally/"+INST).set({d:Object.assign({},tMine.d),p:Object.assign({},tMine.p),at:Date.now()}); }catch(e){ ok=false; }
  tallyWriting=false;
  if(tallyAgain){ tallyAgain=false; flushTally(); }
  else if(!ok){ clearTimeout(tallyT); tallyT=setTimeout(flushTally,5000); }
}
function readAllOnce(d,coll){
  return new Promise((ok,bad)=>{
    let un=null, done=false;
    const t=setTimeout(()=>{ if(done) return; done=true; try{ if(typeof un==="function") un(); }catch(e){} bad(0); },60000);
    try{
      un=d.collection(coll).onSnapshot(s=>{
        if(done) return; done=true; clearTimeout(t);
        const docs=s.docs.map(x=>({id:x.id,...x.data()}));
        setTimeout(()=>{ try{ if(typeof un==="function") un(); }catch(e){} },0);
        ok(docs);
      },()=>{ if(done) return; done=true; clearTimeout(t); bad(0); });
    }catch(e){ if(!done){ done=true; clearTimeout(t); bad(0); } }
  });
}
function initTally(d){
  d.collection("tally").onSnapshot(s=>{
    const od={}, op={}; let b=null;
    for(const x of s.docs){
      const v=x.data()||{};
      if(x.id==="base"){ b=v; continue; }
      if(x.id===INST) continue;
      for(const k in (v.d||{})) od[k]=(od[k]||0)+(+v.d[k]||0);
      for(const k in (v.p||{})) op[k]=(op[k]||0)+(+v.p[k]||0);
    }
    tOthers={d:od,p:op};
    if(b) tBase={d:b.d||{},p:b.p||{}};
    tallyOn=true; recomputeTally(); saveLocal();
    if(view==="fortune") renderFortune();
    if(!b&&!migrating) migrateLegacy(d);
    else if(b&&b.done&&!cleaning) cleanLegacy(d);
  },()=>{});
}
// 예전 기록을 세어서 tally/base에 한 번만 저장해요.
async function migrateLegacy(d){
  migrating=true;
  try{
    const pl=await readAllOnce(d,"pulls"), pt=await readAllOnce(d,"pets");
    const bd={}, bp={};
    pl.forEach(x=>{ if(x.speciesId) bd[x.speciesId]=(bd[x.speciesId]||0)+1; });
    pt.forEach(x=>{ if(x.petId) bp[x.petId]=(bp[x.petId]||0)+1; });
    const ref=d.doc("tally/base");
    const cur=await ref.get(); if(cur.exists){ migrating=false; return; }
    // 저장공간이 꽉 차 있으면 새 문서를 못 만들어요. 이미 센 예전 기록 몇 개를 먼저 지워 자리를 만들어요.
    for(const x of pl.slice(0,3)){ try{ await d.collection("pulls").doc(x.id).delete(); }catch(e){} }
    await ref.set({d:bd,p:bp,pulls:pl.length,pets:pt.length,done:true,at:Date.now()});
  }catch(e){ migrating=false; }
}
// tally/base가 생긴 뒤에만 예전 개별 기록을 천천히 지워요. 중간에 닫혀도 다음에 이어서 지워요.
async function cleanLegacy(d){
  cleaning=true;
  try{
    for(const coll of ["pulls","pets"]){
      const docs=await readAllOnce(d,coll); let i=0, fails=0;
      const worker=async()=>{
        while(i<docs.length&&fails<30){
          const x=docs[i++];
          try{ await d.collection(coll).doc(x.id).delete(); fails=0; }
          catch(e){ fails++; await sleep(3000); }
        }
      };
      await Promise.all([worker(),worker(),worker(),worker()]);
    }
  }catch(e){}
}
let wBase={gems:0,tickets:0,completions:0,coins:0}, wOthers={gems:0,tickets:0,completions:0,coins:0}, wMine={gems:0,tickets:0,completions:0,coins:0};
let walletT=null, walletWriting=false, walletAgain=false, purseReady=false;
let giftSeen=new Set(); try{giftSeen=new Set(JSON.parse(localStorage.getItem("httyd-gifts")||"[]"));}catch(e){}
function recomputeWallet(){
  if(!cloud||!purseReady) return;
  gems=wBase.gems+wOthers.gems+wMine.gems; tickets=wBase.tickets+wOthers.tickets+wMine.tickets; completions=wBase.completions+wOthers.completions+wMine.completions; coins=wBase.coins+wOthers.coins+wMine.coins;
  const gb=$("#gemBig"), gm=$("#gemMeter"); if(gb) gb.textContent=fmt(gems); if(gm) gm.style.width=Math.min(100,gems/COST*100)+"%";
  updateTop();
}
function bump(field,d){
  if(cloud&&purseReady){ wMine[field]+=d; recomputeWallet(); }
  else { if(field==="gems") gems+=d; else if(field==="tickets") tickets+=d; else if(field==="coins") coins+=d; else completions+=d; }
  saveWallet();
}
function saveWallet(){
  saveLocal(); updateTop(); if(!cloud||!purseReady) return;
  clearTimeout(walletT); walletT=setTimeout(flushPurse,500);
}
async function flushPurse(){
  if(walletWriting){ walletAgain=true; return; }
  walletWriting=true;
  try{ await cloud.db.doc("purse/"+INST).set({gems:wMine.gems,tickets:wMine.tickets,completions:wMine.completions,coins:wMine.coins,at:Date.now()}); }catch(e){}
  walletWriting=false; if(walletAgain){ walletAgain=false; flushPurse(); }
}
async function initPurse(d){
  try{
    let b=await d.doc("settings/wallet2").get();
    if(!b.exists){
      const old=await d.doc("settings/wallet").get(); const v=old.exists?(old.data()||{}):{gems,tickets,completions};
      await d.doc("settings/wallet2").set({gems:+v.gems||0,tickets:+v.tickets||0,completions:+v.completions||0});
    }
  }catch(e){}
  d.doc("settings/wallet2").onSnapshot(s=>{ if(s.exists){ const v=s.data()||{}; W_FIELDS.forEach(k=>wBase[k]=+v[k]||0); purseReady=true; recomputeWallet(); if(view==="fortune") renderFortune(); } },()=>{});
  d.collection("purse").onSnapshot(s=>{
    const o={gems:0,tickets:0,completions:0,coins:0}; let newGift=0;
    for(const x of s.docs){ if(x.id===INST) continue; const v=x.data()||{}; W_FIELDS.forEach(k=>o[k]+=+v[k]||0);
      if(x.id.startsWith("gift")&&!giftSeen.has(x.id)){ giftSeen.add(x.id); newGift+=+v.gems||0; } }
    wOthers=o; recomputeWallet(); if(view==="fortune") renderFortune();
    if(newGift){ try{localStorage.setItem("httyd-gifts",JSON.stringify([...giftSeen]));}catch(e){} toast(`보석 ${fmt(newGift)}개를 선물로 받았어요!`); }
  },()=>{});
}
let gemFrac=0;
function addGems(n,why,quiet){
  const m=r2(gainMult(why)); const total=n*m+gemFrac; n=Math.floor(total+1e-9); gemFrac=total-n;
  if(n<=0) return;
  bump("gems",n); spXP(why==="quiz"?5:10);
  const gb=$("#gemBig"), gm=$("#gemMeter"); if(gb) gb.textContent=fmt(gems); if(gm) gm.style.width=Math.min(100,gems/COST*100)+"%";
  const el=document.createElement("div"); el.className="plus"; el.innerHTML=`<svg class="gem" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h12l4 6-10 12L2 9z" fill="var(--gem)"/><path d="M2 9h20M8 3l4 18 4-18M6 3l2 6m10-6-2 6" stroke="rgba(255,255,255,.55)" stroke-width="1.2" fill="none"/></svg> +${fmt(n)}${m>1?`<small class="xm">×${m}</small>`:""}`; el.setAttribute("aria-live","polite");
  if(quiet) el.classList.add("mini");
  document.body.appendChild(el); setTimeout(()=>el.remove(),1100);
}
const tierOf=sid=>TIER_BY[rarity[sid]]?rarity[sid]:"common";
function todayStr(){const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;}
const pick=(arr)=>arr[Math.floor(Math.random()*arr.length)];

function photoGroups(){ const by={}; photos.forEach(p=>{(by[p.speciesId]=by[p.speciesId]||[]).push(p);}); return by; }
function drawOne(name){
  const by=photoGroups(); const sids=Object.keys(by); if(!sids.length) return null;
  const groups={}; sids.forEach(sid=>{(groups[tierOf(sid)]=groups[tierOf(sid)]||[]).push(sid);});
  let pool=TIERS.filter(t=>groups[t.k]&&odds[t.k]>0); const w=t=>(pool.length&&odds[t.k]>0?odds[t.k]:1)*tierMult(t.k);
  if(!pool.length) pool=TIERS.filter(t=>groups[t.k]);
  // 드래곤마다 무게: 등급 확률 ÷ 등급 안 종 수 × (아직 없는 드래곤이면 펫 효과 배수)
  const nm=newMult(), have={has:hasPull}, cand=[];
  for(const t of pool) for(const sid of groups[t.k]) cand.push({sid,tier:t.k,wt:w(t)/groups[t.k].length*(have.has(sid)?1:nm)});
  let x=Math.random()*cand.reduce((a,c)=>a+c.wt,0), ch=cand[cand.length-1];
  for(const c of cand){ x-=c.wt; if(x<0){ch=c;break;} }
  const sid=ch.sid, tier=ch.tier; const p=pick(by[sid]);
  return {id:uid(),date:todayStr(),speciesId:sid,photoId:p.id,tier,at:Date.now()};
}
function revealFx(tier){
  const cfg={premium:{dur:3000,sparks:60,rays:1,word:"프리미엄!",quake:1},legend:{dur:2600,sparks:46,rays:1,word:"전설!",quake:1},epic:{dur:1900,sparks:24,rays:1,word:"영웅!"},rare:{dur:1300,sparks:10,rays:0,word:"희귀!"},common:{dur:700,sparks:0,rays:0}}[tier]||{dur:600,sparks:0};
  const t=TIER_BY[tier]||(tier==="premium"?{cls:"prem"}:TIER_BY.common);
  const fx=document.createElement("div"); fx.className=`reveal ${t.cls}`; fx.style.setProperty("--dur",cfg.dur+"ms");
  let h=`<div class="flash"></div>${cfg.rays?`<div class="rays"></div>`:""}`;
  for(let i=0;i<cfg.sparks;i++){
    const a=Math.random()*Math.PI*2, d=120+Math.random()*(tier==="legend"?320:200);
    h+=`<span class="spark" style="--dx:${Math.cos(a)*d}px;--dy:${Math.sin(a)*d}px;--s:${(0.8+Math.random()*1.8).toFixed(2)};--sd:${Math.round(cfg.dur*(0.5+Math.random()*0.5))}ms;animation-delay:${Math.round(Math.random()*cfg.dur*0.25)}ms"></span>`;
  }
  if(cfg.word) h+=`<span class="word">${cfg.word}</span>`;
  fx.innerHTML=h; document.body.appendChild(fx); speedUp(fx,speedMult());
  if(cfg.quake){ document.body.classList.add("quake"); setTimeout(()=>document.body.classList.remove("quake"),1000); }
  setTimeout(()=>fx.remove(),cfg.dur/speedMult()+200);
}
async function hatch(opt){
  const fast=!!(opt&&opt.fast===true), silent=!!(opt&&opt.silent===true);
  if(fz.hatching) return;
  if(gems<COST){ toast(`보석이 ${fmt(COST-gems)}개 더 필요해요`); return; }
  const rec=drawOne(); if(!rec){ toast("사진이 있는 드래곤이 없어요"); return; }
  rec.isNew=!hasPull(rec.speciesId);
  bump("gems",-COST); spXP(3);
  fz.hatching=true;
  const egg=silent?null:$("#egg"); const still=silent||matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(egg){ egg.classList.add("t-"+rec.tier); }
  const sp=speedMult();
  if(egg&&!still){ egg.classList.add("shake","cracking"); if(fast) egg.classList.add("fast"); if(rec.tier==="legend") egg.classList.add("glow-legend"); speedUp(egg,sp); await sleep((fast?550:1500)/sp); egg.classList.remove("shake","glow-legend"); egg.classList.add("open"); speedUp(egg,sp); await sleep((fast?380:650)/sp); }
  if(fz.auto){ fz.autoStats.n++; fz.autoStats[rec.tier]=(fz.autoStats[rec.tier]||0)+1; if(rec.isNew) fz.autoStats.newN++; }
  if(!still) revealFx(rec.tier);
  addCount("d",rec.speciesId); last=rec;
  fz.hatching=false; if(view==="fortune") renderFortune(); if(!silent) window.scrollTo(0,0);
  if(rec.isNew) setTimeout(()=>addGems(NEW_REWARD[rec.tier]||1,"dex",silent),silent?0:500);
  if(rec.isNew) setTimeout(checkComplete,1200);
  setTimeout(()=>{
    if(last!==rec) return;
    const c=document.querySelector("#fortuneView .fcard");
    if(c) c.classList.add("fade");
    setTimeout(()=>{ if(last===rec&&!fz.hatching){ last=null; if(view==="fortune") renderFortune(); } },400);
  },4000);
}
// 큰 숫자 줄여 쓰기: 1,500 → 1.5k, 2,300,000 → 2.3m, 4,000,000,000 → 4b
function fmt(n){
  n=Math.floor(+n||0); const neg=n<0; let a=Math.abs(n), u="";
  if(a>=1e9){a/=1e9;u="b";} else if(a>=1e6){a/=1e6;u="m";} else if(a>=1e3){a/=1e3;u="k";}
  if(u){ const d=a<10?2:a<100?1:0; const p=10**d; a=Math.floor(a*p)/p; }
  return (neg?"-":"")+a+u;
}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const onDrawView=()=>view==="fortune"&&fz.sub==="draw"&&!fz.editing&&!document.hidden;
function setAutoFlag(on){ try{ on?localStorage.setItem("httyd-auto","1"):localStorage.removeItem("httyd-auto"); }catch(e){} }
function updateAutoPill(){
  let pill=document.getElementById("autoPill");
  const showIt=fz.auto&&!(view==="fortune"&&fz.sub==="draw"&&!fz.editing);
  if(!showIt){ if(pill) pill.remove(); return; }
  if(!pill){ pill=document.createElement("div"); pill.id="autoPill"; pill.className="autopill";
    pill.innerHTML=`<span></span><button type="button">멈추기</button>`; document.body.appendChild(pill);
    pill.querySelector("button").onclick=()=>{ fz.auto=false; setAutoFlag(false); updateAutoPill(); }; }
  pill.querySelector("span").textContent=`자동 뽑기 중 · ${fz.autoStats.n}번 · 새 드래곤 ${fz.autoStats.newN}`;
}
async function autoLoop(){
  if(fz.autoRunning) return;
  fz.auto=true; fz.autoRunning=true; fz.autoStats={n:0,newN:0}; setAutoFlag(true); renderFortune(); updateAutoPill();
  while(fz.auto){
    if(gems<COST){ toast("보석이 모자라서 자동 뽑기를 멈췄어요"); break; }
    const watch=onDrawView();
    await hatch({fast:true,silent:!watch});
    updateAutoPill();
    const t=last&&last.tier; await sleep((!watch?350:t==="legend"?2600:t==="epic"?1900:900)/speedMult());
  }
  fz.auto=false; fz.autoRunning=false; setAutoFlag(false); updateAutoPill(); if(view==="fortune") renderFortune();
}
function autoSummary(){
  const a=fz.autoStats; if(!a.n) return "";
  return `<p class="note autosum" style="margin:0">자동 뽑기 ${a.n}번 · 새 드래곤 ${a.newN}마리${TIERS.filter(t=>a[t.k]).map(t=>` · ${t.ko} ${a[t.k]}`).join("")}</p>`;
}
function pullCard(rec){
  const t=TIER_BY[rec.tier]||TIER_BY.common;
  const p=photos.find(x=>x.id===rec.photoId)||photos.find(x=>x.speciesId===rec.speciesId);
  const have=pullN(rec.speciesId);
  return `<article class="fcard ${t.cls} t-${t.k}">
    <div class="ph">${p?`<img src="${urlOf(p)}" alt="${esc(koOf(rec.speciesId))}">`:""}<span class="tier">${t.ko}</span>${rec.isNew?`<span class="newb">NEW!</span>`:""}</div>
    <div class="body">
      <div><span class="luck">${t.ko} 드래곤을 길들였어요!</span><h3>${esc(koOf(rec.speciesId))}</h3><span class="en">${esc(enOf(rec.speciesId))}</span></div>
      <p class="fmsg" style="margin:0">${rec.isNew?`처음 만난 드래곤이에요! 도감 보상으로 보석 ${NEW_REWARD[rec.tier]||1}개를 받았어요.`:`벌써 ${have}마리째 길들였어요.`}</p>
    </div></article>`;
}
function dexStats(){
  const by=photoGroups(); const sids=SPECIES.map(s=>s.id).filter(id=>by[id]);
  const got=Object.assign({},pullC);
  return {by,sids,got,total:sids.filter(s=>got[s]).length};
}
function dexHTML(){
  const {by,sids,got,total}=dexStats();
  const order=sids.slice().sort((a,b)=>TIERS.findIndex(t=>t.k===tierOf(a))-TIERS.findIndex(t=>t.k===tierOf(b))||koOf(a).localeCompare(koOf(b),"ko"));
  const per=TIERS.map(t=>{const all=sids.filter(s=>tierOf(s)===t.k); return {t,all:all.length,got:all.filter(s=>got[s]).length};});
  const full=sids.length&&total===sids.length;
  return `<div class="end" style="gap:10px">
      <h2>${full?"도감 완성!":"나의 드래곤 도감"}</h2>
      <p style="margin:0"><span class="big" style="font-size:2.4rem">${total}</span> / ${sids.length}종 · 총 ${fmt(pullTotal())}번 뽑았어요${completions?` · 완성 ${completions}회`:""}</p>
      ${full?`<p class="note" style="margin:0">모든 드래곤을 길들였어요! 이제 전투 탭에서 드래곤 카드를 키워 보세요.</p>`:""}
      <div class="odds">${per.map(x=>`<div class="${x.t.cls}"><b>${x.t.ko}</b><span>${x.got} / ${x.all}</span></div>`).join("")}</div>
    </div>
    <div class="dex">${order.map(sid=>{const t=TIER_BY[tierOf(sid)]; const n=got[sid];
      return n?`<div class="dx ${t.cls}"><img src="${urlOf(by[sid][0])}" alt=""><span class="dn">${esc(koOf(sid))}</span>${n>1?`<span class="dc">×${n}</span>`:""}</div>`
              :`<div class="dx off ${t.cls}" aria-label="아직 못 만난 ${t.ko} 드래곤"><span class="q">?</span><span class="dn">${t.ko}</span></div>`;}).join("")}</div>`;
}

// ---------- 아기 드래곤 펫 (프리미엄) ----------
function checkComplete(){ /* 펫 뽑기권은 도감을 리셋할 때만 받아요 */ }
const petById=id=>petDefs.find(p=>p.id===id);
const petPhotosOf=id=>petPhotos.filter(p=>p.speciesId===id);
function savePetDef(p){ saveLocal(); if(cloud) cloud.db.collection("petdefs").doc(p.id).set({name:p.name,effect:p.effect||"",createdAt:p.createdAt,fx:Object.assign({},p.fx||{type:"none"}),bfx:Object.assign({},p.bfx||{type:"none"}),btext:p.btext||"",bsum:p.bsum||"",brules:JSON.parse(JSON.stringify(p.brules||[])),beffects:JSON.parse(JSON.stringify(p.beffects||[]))}).catch(()=>toast("저장하지 못했어요")); }
// ---------- 펫 효과 ----------
const FX_TYPES=[
 ["none","효과 없음"],["quiz_mult","퀴즈 정답 보석 N배"],["all_mult","받는 보석 모두 N배"],["cup_mult","월드컵 보상 N배"],
 ["dex_mult","도감 보상 N배"],["new_odds","뽑기 때 새 드래곤 나올 확률 N% 증가"],["speed","모든 뽑기 속도 N% 증가"],["tier_odds","특정 등급 나올 확률 N배"],["passive","앱이 켜져 있으면 X초마다 보석 +N"],["boost","X초 기다린 뒤 Y초 동안 보석 N배 (반복)"]
];
const T0=Date.now();
function describeFx(f){
  if(!f||!f.type||f.type==="none") return "";
  const n=f.n||2, tier=(TIER_BY[f.tier]||TIER_BY.legend).ko;
  return {quiz_mult:`퀴즈 정답 보석 ${n}배`,all_mult:`받는 보석 모두 ${n}배`,cup_mult:`월드컵 보상 ${n}배`,dex_mult:`도감 보상 ${n}배`,new_odds:`뽑기 때 새 드래곤 나올 확률 ${n}% 증가`,speed:`모든 뽑기 속도 ${n}% 증가`,
    tier_odds:`${tier} 드래곤 나올 확률 ${n}배`,passive:`앱이 켜져 있으면 ${f.sec||5}초마다 보석 +${n}`,boost:`${f.sec||5}초마다 ${f.dur||7}초 동안 보석 ${n}배`}[f.type]||"";
}
function ownedFx(){
  const own={has:id=>petN(id)>0};
  return petDefs.filter(p=>own.has(p.id)&&p.fx&&p.fx.type&&p.fx.type!=="none");
}
// 같은 펫을 또 뽑을 때마다 효과가 기본값의 10분의 1씩 세져요
const r2=x=>Math.round(x*100)/100;
function petCopies(id){ return petN(id); }
function fxN(p){ const base=+p.fx.n||(p.fx.type==="new_odds"||p.fx.type==="speed"?0:1); return base*(1+0.1*Math.max(0,petCopies(p.id)-1)); }
function fxNow(p){ return Object.assign({},p.fx,{n:r2(fxN(p))}); }
function boostLeft(f){ const sec=(f.sec||5)*1000, dur=(f.dur||7)*1000, t=(Date.now()-T0)%(sec+dur); return t>=sec?Math.ceil((sec+dur-t)/1000):0; }
function gainMult(why){
  let m=1;
  for(const p of ownedFx()){ const f=p.fx, n=Math.max(1,fxN(p));
    if(f.type==="all_mult") m*=n;
    else if(f.type==="quiz_mult"&&why==="quiz") m*=n;
    else if(f.type==="cup_mult"&&why==="cup") m*=n;
    else if(f.type==="dex_mult"&&why==="dex") m*=n;
    else if(f.type==="boost"&&boostLeft(f)) m*=n;
  }
  return m;
}
function speedMult(){ let m=1; for(const p of ownedFx()){ if(p.fx.type==="speed") m*=1+Math.max(0,fxN(p))/100; } return m; }
function speedUp(el,sp){ if(sp<=1||!el.getAnimations) return; requestAnimationFrame(()=>{ try{ el.getAnimations({subtree:true}).forEach(a=>a.playbackRate=sp); }catch(e){} }); }
function newMult(){ let m=1; for(const p of ownedFx()){ const f=p.fx; if(f.type==="new_odds") m*=1+Math.max(0,fxN(p))/100; } return m; }
function tierMult(k){ let m=1; for(const p of ownedFx()){ const f=p.fx; if(f.type==="tier_odds"&&(f.tier||"legend")===k) m*=Math.max(1,fxN(p)); } return m; }
const passiveLast={};
setInterval(()=>{
  const list=ownedFx();
  // 보석 N배 타임 표시
  const boosts=list.filter(p=>p.fx.type==="boost"&&boostLeft(p.fx));
  let bar=document.getElementById("boostBar");
  if(boosts.length){
    if(!bar){ bar=document.createElement("div"); bar.id="boostBar"; bar.className="boostbar"; document.body.appendChild(bar); }
    bar.textContent=boosts.map(p=>`${p.name} 보석 ${r2(fxN(p))}배! ${boostLeft(p.fx)}초`).join(" · ");
  } else if(bar) bar.remove();
  if(document.visibilityState!=="visible"||!cloudState||cloudState==="pending") return;
  const now=Date.now();
  for(const p of list){ if(p.fx.type!=="passive") continue;
    const iv=Math.max(1,+p.fx.sec||5)*1000;
    if(!passiveLast[p.id]){ passiveLast[p.id]=now; continue; }
    if(now-passiveLast[p.id]>=iv){ passiveLast[p.id]=now; addGems(Math.max(0,fxN(p)),"passive",true); }
  }
},500);
document.addEventListener("visibilitychange",()=>{ if(document.visibilityState==="visible") for(const k in passiveLast) passiveLast[k]=Date.now(); });
async function addPetPhoto(pid, blob){
  if(!cloud) throw {code:"no_cloud"};
  const r=await cloud.assets.upload(blob,{type:blob.type||"image/jpeg"});
  await cloud.db.collection("petphotos").doc().set({speciesId:pid,assetId:r.id,createdAt:Date.now()});
}
async function removePet(p){
  for(const ph of petPhotosOf(p.id)){ try{ await cloud.db.collection("petphotos").doc(ph.id).delete(); await cloud.assets.delete(ph.assetId); }catch(e){} }
  try{ await cloud.db.collection("petdefs").doc(p.id).delete(); }catch(e){}
  petDefs=petDefs.filter(x=>x.id!==p.id); saveLocal();
}
async function hatchPet(opt){
  const silent=!!(opt&&opt.silent===true);
  if(fz.hatching) return;
  const useTicket=tickets>0;
  if(!useTicket&&gems<PET_GEM_COST){ toast(`뽑기권이 없고 보석이 ${fmt(PET_GEM_COST-gems)}개 모자라요`); return; }
  const ready=petDefs.filter(p=>petPhotosOf(p.id).length);
  if(!ready.length){ toast("사진이 있는 펫이 없어요"); return; }
  const pet=ready[Math.floor(Math.random()*ready.length)]; const ph=pick(petPhotosOf(pet.id));
  const rec={id:uid(),petId:pet.id,photoId:ph.id,at:Date.now()};
  rec.isNew=!(petN(pet.id)>0);
  if(useTicket) bump("tickets",-1); else bump("gems",-PET_GEM_COST); fz.hatching=true;
  const egg=silent?null:$("#egg"); const still=silent||matchMedia("(prefers-reduced-motion: reduce)").matches;
  const sp=speedMult()*(opt&&opt.fast?1.6:1);
  if(egg&&!still){ egg.classList.add("shake","cracking","glow-prem"); speedUp(egg,sp); await sleep(1800/sp); egg.classList.remove("shake","glow-prem"); egg.classList.add("open"); speedUp(egg,sp); await sleep(650/sp); }
  if(!still) revealFx("premium");
  addCount("p",rec.petId); lastPet=rec;
  if(fz.petAuto){ fz.petStats.n++; if(rec.isNew) fz.petStats.newN++; }
  fz.hatching=false; if(view==="fortune") renderFortune(); if(!silent) window.scrollTo(0,0);
}
async function petAutoLoop(){
  if(fz.petAutoRunning) return;
  fz.petAuto=true; fz.petAutoRunning=true; fz.petStats={n:0,newN:0}; renderFortune();
  while(fz.petAuto){
    if(tickets<1&&gems<PET_GEM_COST){ toast("뽑기권과 보석이 모자라서 펫 자동 뽑기를 멈췄어요"); break; }
    if(!petDefs.some(p=>petPhotosOf(p.id).length)) break;
    const watch=view==="fortune"&&fz.sub==="pet"&&!pz.editing&&!document.hidden;
    await hatchPet({fast:true,silent:!watch});
    await sleep((watch?2400:350)/speedMult());
  }
  fz.petAuto=false; fz.petAutoRunning=false; if(view==="fortune") renderFortune();
}
function petCard(rec){
  const pet=petById(rec.petId); if(!pet) return "";
  const ph=petPhotos.find(x=>x.id===rec.photoId)||petPhotosOf(pet.id)[0];
  const have=petN(pet.id);
  return `<article class="fcard prem">
    <div class="ph">${ph?`<img src="${urlOf(ph)}" alt="${esc(pet.name)}">`:""}<span class="tier">프리미엄</span>${rec.isNew?`<span class="newb">NEW!</span>`:""}</div>
    <div class="body">
      <div><span class="luck">아기 드래곤 펫이 태어났어요!</span><h3>${esc(pet.name)}</h3></div>
      ${pet.effect?`<p class="fmsg" style="margin:0"><b>효과</b> · ${esc(pet.effect)}</p>`:""}
      ${!rec.isNew?`<p class="note" style="margin:0">벌써 ${have}마리째 함께하고 있어요. 효과가 10% 더 세졌어요!${pet.fx&&pet.fx.type&&pet.fx.type!=="none"?` 지금: ${esc(describeFx(fxNow(pet)))}`:""}</p>`:""}
    </div></article>`;
}
function petHTML(){
  if(pz.editing) return petEditorHTML();
  const st=dexStats(); const ready=petDefs.filter(p=>petPhotosOf(p.id).length);
  const got=Object.assign({},petC);
  const egg=`<span class="light"></span><span class="half bot"></span><span class="half top"></span><svg class="crack" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><polyline class="cg" pathLength="1" points="0,53 12,45 24,56 37,46 50,58 63,46 76,56 88,45 100,52"/><polyline class="c1" pathLength="1" points="0,53 12,45 24,56 37,46 50,58 63,46 76,56 88,45 100,52"/><polyline class="c2" pathLength="1" points="37,46 41,36 39,28"/><polyline class="c2" pathLength="1" points="76,56 80,66 77,73"/></svg>`;
  let stage;
  if(!ready.length) stage=`<p class="note">아직 준비된 펫이 없어요. 아래 "펫 관리"에서 펫을 만들고 사진을 넣어주세요.</p>`;
  else if(tickets>0) stage=`<button class="egg prem" id="egg" aria-label="펫 뽑기권으로 아기 드래곤 알 깨기">${egg}</button><p class="note" style="margin:0">무지개 알을 눌러 깨 보세요! (뽑기권 1장)</p>`;
  else if(gems>=PET_GEM_COST) stage=`<button class="egg prem" id="egg" aria-label="보석 ${fmt(PET_GEM_COST)}개로 아기 드래곤 알 깨기">${egg}</button><p class="note" style="margin:0">무지개 알을 눌러 깨 보세요! (보석 ${fmt(PET_GEM_COST)}개)</p>`;
  else stage=`<div class="egg prem" style="opacity:.35" aria-hidden="true">${egg}</div><p class="note" style="margin:0">뽑기권 1장 또는 보석 ${fmt(PET_GEM_COST)}개가 필요해요. 보석은 ${fmt(Math.max(0,PET_GEM_COST-gems))}개 더 모으면 돼요.</p>`;
  return `<div class="end" style="gap:8px">
      <h2>아기 드래곤 펫</h2>
      <div class="gemrow"><span class="ticket">펫 뽑기권</span><span class="big" style="color:var(--t-epic)">${tickets}</span><span class="note">장</span></div>
      <p class="note" style="margin:0">보석 ${fmt(PET_GEM_COST)}개로 아기 드래곤 펫을 뽑아요. 뽑기권이 남아 있으면 뽑기권을 먼저 써요.</p>
    </div>
    ${ownedFx().length?`<div class="end" style="gap:6px"><p class="sec-title" style="margin:0">지금 켜진 펫 효과</p><ul class="fxlist">${ownedFx().map(p=>{const c=petCopies(p.id); return `<li><b>${esc(p.name)}</b>${c>1?` <span class="note">${c}마리 · +${(c-1)*10}%</span>`:""} ${esc(describeFx(fxNow(p)))}</li>`;}).join("")}</ul></div>`:""}
    ${lastPet?petCard(lastPet):""}
    <div class="egg-stage">${stage}
      ${ready.length&&(tickets>0||gems>=PET_GEM_COST||fz.petAuto)?`<button class="btn ${fz.petAuto?"":"ghost"}" id="petAutoBtn">${fz.petAuto?"펫 자동 뽑기 멈추기":"펫 자동 뽑기"}</button>`:""}
      ${fz.petStats&&fz.petStats.n?`<p class="note autosum" style="margin:0">펫 자동 뽑기 ${fz.petStats.n}번 · 새 펫 ${fz.petStats.newN}마리</p>`:""}</div>
    ${petDefs.length?`<p class="sec-title">내 펫 · 전투에 장착 ${equippedPets().length} / ${petSlots()}</p>${slotBuyHTML()}<p class="note" style="margin:0">가진 펫을 누르면 장착하거나 뺄 수 있어요. 장착한 펫의 전투 효과가 켜지고, 1마리마다 팀 체력·공격도 +10% 올라요.</p><div class="dex">${petDefs.map(p=>{const ph=petPhotosOf(p.id)[0]; const n=got[p.id]; const eq=equippedPets().includes(p.id);
      return n&&ph?`<button class="dx prem ${eq?"equipped":""}" data-equip="${p.id}" aria-pressed="${eq}" style="padding:0;cursor:pointer"><img src="${urlOf(ph)}" alt=""><span class="dn">${esc(p.name)}</span>${n>1?`<span class="dc">×${n}</span>`:""}${eq?`<span class="eqb">장착</span>`:""}</button>`
        :`<div class="dx off prem"><span class="q">?</span><span class="dn">프리미엄</span></div>`;}).join("")}</div>`:""}
    ${FB.isOwner?`<button class="btn ghost" id="petEdit">펫 관리</button>`:""}`;
}
function fxEditor(p){
  const f=p.fx||{type:"none"}, t=f.type||"none", id=p.id;
  const num=(key,label,val,min,max)=>`<label class="fxf"><span>${label}</span><input type="number" inputmode="numeric" min="${min}" max="${max}" value="${val}" data-fxk="${key}" data-fxp="${id}"></label>`;
  return `<div class="fxbox">
    <label class="fxf" style="flex:1 1 100%"><span>보석 효과</span><select data-fxk="type" data-fxp="${id}">${FX_TYPES.map(([k,l])=>`<option value="${k}" ${k===t?"selected":""}>${l}</option>`).join("")}</select></label>
    ${t==="tier_odds"?`<label class="fxf"><span>등급</span><select data-fxk="tier" data-fxp="${id}">${TIERS.map(x=>`<option value="${x.k}" ${x.k===(f.tier||"legend")?"selected":""}>${x.ko}</option>`).join("")}</select></label>`:""}
    ${t==="passive"||t==="boost"?num("sec",t==="boost"?"기다리는 초":"몇 초마다",f.sec||5,1,600):""}
    ${t==="boost"?num("dur","몇 초 동안",f.dur||7,1,600):""}
    ${t!=="none"?num("n",t==="passive"?"보석 몇 개":(t==="new_odds"||t==="speed")?"몇 % 증가":"몇 배",f.n||2,1,(t==="new_odds"||t==="speed")?1000:100):""}
    <p class="note" style="margin:0;flex:1 1 100%">카드에 보이는 글: ${esc(p.effect||describeFx(f)||"없음")}</p>
  </div>`;
}
const BFX_TYPES=[["none","전투 효과 없음"],["team_hp","팀 체력 N% 증가"],["team_atk","팀 공격 N% 증가"],["regen","내 차례마다 체력 N% 회복"],
 ["crit","치명타 확률 N% 증가"],["start_charge","전투 시작 때 필살기 게이지 N칸"],["revive","한 번 쓰러져도 체력 N%로 부활"],["reward","전투 코인 보상 N% 증가"]];
const BFX_N0={team_hp:20,team_atk:20,regen:5,crit:15,start_charge:1,revive:30,reward:50};
function describeBfx(f){ if(!f||!f.type||f.type==="none") return ""; const t=BFX_TYPES.find(x=>x[0]===f.type); return t?t[1].replace("N",r2(+f.n||0)):""; }
// 펫 하나에 전투 효과 여러 개 (각각 글 + 규칙)
function effectsOf(p){
  if(Array.isArray(p.beffects)&&p.beffects.length) return p.beffects;
  if(p.brules&&p.brules.length) return [{text:p.btext||"",sum:p.bsum||"",rules:p.brules}];
  return [];
}
function syncEffects(p,list){ p.beffects=list; p.brules=list.flatMap(e=>e.rules||[]); p.bsum=list.map(e=>e.sum).filter(Boolean).join(" · "); }
function bfxEditor(p){
  const f=p.bfx||{type:"none"}, t=f.type||"none", busy=bparseBusy===p.id, effs=effectsOf(p);
  return `<div class="fxbox" style="border-left:4px solid var(--blood)">
    <span class="note" style="flex:1 1 100%">전투 효과 ${effs.length}개 (여러 개를 함께 쓸 수 있어요)</span>
    ${effs.length?`<ul class="fxlist" style="flex:1 1 100%">${effs.map((e,i)=>{const k=p.id+"|"+i, armed=pz.armedDel===k; return `<li style="border-left-color:var(--blood);display:flex;gap:8px;align-items:flex-start"><span style="flex:1;min-width:0">${esc(e.sum||e.text||"효과")}${e.text&&e.sum?`<br><span class="note">쓴 글: ${esc(e.text)}</span>`:""}</span><button class="btn ghost small" data-bdel="${k}" style="${armed?"border-color:var(--blood);color:var(--blood)":""}">${armed?"한 번 더":"지우기"}</button></li>`;}).join("")}</ul>`
      :(t!=="none"?`<p class="note" style="margin:0;flex:1 1 100%">지금 적용: ${esc(describeBfx(f))}</p>`:"")}
    <div class="fxf" style="flex:1 1 100%;display:flex;flex-wrap:wrap;gap:6px;align-items:flex-end">
      <span style="flex:1 1 100%">새 전투 효과 만들기</span>
      <label class="fxf"><span>언제</span><select data-rb="trigger" data-rbp="${p.id}">${Object.entries(R_TRIG).map(([k,l])=>`<option value="${k}">${l}</option>`).join("")}</select></label>
      <label class="fxf"><span>무엇을</span><select data-rb="action" data-rbp="${p.id}">${Object.entries(R_ACT).map(([k,l])=>`<option value="${k}">${l}</option>`).join("")}</select></label>
      <label class="fxf"><span>얼마나</span><input type="number" inputmode="numeric" min="1" max="1000" value="20" data-rb="value" data-rbp="${p.id}"></label>
      <label class="fxf"><span>확률 %</span><input type="number" inputmode="numeric" min="1" max="100" value="100" data-rb="chance" data-rbp="${p.id}"></label>
      <label class="fxf"><span>몇 턴</span><input type="number" inputmode="numeric" min="1" max="20" value="2" data-rb="turns" data-rbp="${p.id}"></label>
      <label class="fxf"><span>체력 몇 % 이하</span><input type="number" inputmode="numeric" min="1" max="99" value="30" data-rb="threshold" data-rbp="${p.id}"></label>
      <button class="btn small" data-radd="${p.id}">효과 추가하기</button>
      <p class="note" style="margin:0;flex:1 1 100%">'몇 턴'은 기절·봉인·헷갈림 같은 상태에, '체력 몇 % 이하'는 '체력이 낮을 때'에만 쓰여요.</p>
    </div>
    ${p.bunsup?`<p class="note" style="margin:0;flex:1 1 100%;color:var(--blood)">적용 못 한 부분: ${esc(p.bunsup)}</p>`:""}
    <details style="flex:1 1 100%"><summary class="note" style="cursor:pointer">목록에서 고르기</summary>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:8px">
      <label class="fxf" style="flex:1 1 100%"><span>전투 효과</span><select data-bfk="type" data-bfp="${p.id}">${BFX_TYPES.map(([k,l])=>`<option value="${k}" ${k===t&&!effs.length?"selected":""}>${l}</option>`).join("")}</select></label>
      ${t!=="none"?`<label class="fxf"><span>${t==="start_charge"?"몇 칸":"몇 %"}</span><input type="number" inputmode="numeric" min="1" max="${t==="start_charge"?10:1000}" value="${f.n||BFX_N0[t]||10}" data-bfk="n" data-bfp="${p.id}"></label>`:""}
      </div></details>
  </div>`;
}
// ---- 글로 쓴 전투 효과 → 규칙 ----
let sampleFn=null, bparseBusy=null;
const R_TRIG={always:"항상",start:"전투 시작 때",turn:"내 차례가 끝날 때마다",attack:"일반 공격할 때",special:"필살기 쓸 때",hit:"공격받을 때",low_hp:"체력이 낮을 때",faint:"쓰러질 때(드래곤마다 1번)",low_hp_once:"처음으로 체력이 낮아질 때(드래곤마다 1번)"};
const R_ACT={atk_mult:"공격력 %증가",hp_mult:"최대 체력 %증가",heal_pct:"최대 체력의 %만큼 회복",dmg_reduce_pct:"받는 피해 %감소",crit_pct:"치명타 확률 %p증가",charge:"필살기 게이지 칸 충전",stun_enemy:"상대 기절",extra_dmg_pct:"준 피해의 %만큼 추가 피해",revive_pct:"체력 %로 부활",coin_pct:"코인 보상 %증가",enemy_atk_down:"상대 공격력 %감소",enemy_misfire:"상대가 헷갈려 자기 편 공격",seal_enemy:"상대 필살기 N턴 봉인",absorb_hit:"공격을 피해 대신 회복으로 바꿈(%)",recover_hit:"받은 피해의 %만큼 맞은 뒤 회복",lifesteal_pct:"내가 입힌 피해의 %만큼 회복",curse_heal:"상대 회복을 N턴 동안 피해로 바꿈",confuse_enemy:"상대가 N턴 동안 헷갈림",dmg_taken_pct:"받는 피해 %증가",heal_boost_pct:"모든 회복량 %증가",heal_to_dmg:"회복한 양의 %만큼 상대에게 피해",evade_reflect:"N턴 동안 모든 공격 피하고 피한 피해 %를 상대에게",heal_dealt:"지금까지 입힌 피해(%)만큼 회복"};
function ruleSummary(r){ const lab=R_ACT[r.action]||r.action, n=r.value;
  let what=lab.replace("N턴",r.turns+"턴");
  what=what.includes("%")?what.replace("%",n+"%"):what.includes("칸")?what.replace("칸",n+"칸"):what;
  const when=r.trigger==="low_hp"||r.trigger==="low_hp_once"?`체력 ${r.threshold}% 이하일 때`:R_TRIG[r.trigger];
  return `${when} ${r.chance<100?r.chance+"% 확률로 ":""}${what}`; }
function cleanRules(arr){
  if(!Array.isArray(arr)) return [];
  return arr.slice(0,6).map(r=>({trigger:R_TRIG[r.trigger]?r.trigger:"always",action:r.action,value:Math.max(0,Math.min(1000,+r.value||0)),
    chance:Math.max(1,Math.min(100,+r.chance||100)),threshold:Math.max(1,Math.min(99,+r.threshold||30)),turns:Math.max(1,Math.min(20,Math.round(+r.turns||3)))})).map(r=>(r.action==="enemy_misfire"||r.action==="stun_enemy")&&!r.value?Object.assign(r,{value:1}):r).filter(r=>R_ACT[r.action]&&r.value>0);
}
async function parseBattleText(p,text){
  const prompt=`아이와 아빠가 만든 드래곤 턴제 전투 게임이에요. 펫의 "전투 효과" 설명을 읽고, 게임이 실행할 수 있는 규칙(JSON)으로 바꿔주세요.

규칙 하나 = {"trigger","action","value","chance","threshold","turns"}
trigger(언제):
- "always": 전투 내내 늘 켜짐
- "start": 전투 시작할 때 한 번
- "turn": 내 차례가 끝날 때마다
- "attack": 내 드래곤이 일반 공격할 때마다
- "special": 내 드래곤이 필살기를 쓸 때마다
- "hit": 내 드래곤이 공격받을 때마다
- "low_hp": 내 드래곤 체력이 threshold% 이하인 동안 (threshold: 1~99)
- "faint": 내 드래곤이 쓰러질 때 (드래곤마다 한 번)
- "low_hp_once": 내 드래곤 체력이 처음으로 threshold% 이하가 됐을 때 (드래곤마다 한 번) (heal_dealt, heal_pct, charge와 함께)
action(무엇을)과 value 단위:
- "atk_mult": 공격력 value% 증가 (2배 = 100)
- "hp_mult": 최대 체력 value% 증가 (always에서만)
- "heal_pct": 최대 체력의 value% 회복
- "dmg_reduce_pct": 받는 피해 value% 감소 (최대 90)
- "crit_pct": 치명타 확률 value%p 증가 (치명타는 1.5배)
- "charge": 필살기 게이지 value칸 충전
- "stun_enemy": 상대를 기절시켜 한 번 쉬게 함 (value는 1)
- "extra_dmg_pct": 이번에 준 피해의 value%만큼 추가 피해
- "revive_pct": 체력 value%로 부활 (faint에서만)
- "coin_pct": 전투 승리 코인 value% 증가 (always에서만)
- "enemy_atk_down": 상대 공격력 value% 감소 (always 또는 start)
- "enemy_misfire": 상대가 공격할 때 헷갈려서 자기 팀원(없으면 자기 자신)을 대신 공격함 (trigger는 "hit", 확률은 chance, value는 1)
- "seal_enemy": 상대가 value턴 동안 필살기를 쓰지 못함 ("start"면 상대 드래곤 모두, attack/special/hit면 지금 상대 하나)
- "dmg_taken_pct": 받는 피해가 value% 늘어남 (보통 always)
- "heal_boost_pct": 우리 드래곤이 받는 모든 회복량이 value% 늘어남 (1.5배면 50, 보통 always)
- "heal_to_dmg": 우리 드래곤이 회복할 때마다 회복한 양의 value%만큼 상대에게 피해 (그대로면 100, 보통 always)
- "evade_reflect": turns턴 동안 우리 팀이 모든 공격을 피하고, 피한 피해의 value%를 상대에게 되돌려줌 (규칙에 "turns" 숫자도 넣어요)
- "confuse_enemy": 상대가 value턴 동안 무조건 헷갈려서 자기 팀원(없으면 자기 자신)을 공격함 (보통 trigger는 "special" 또는 "attack")
- "curse_heal": 상대가 value턴 동안 받는 모든 회복이 피해로 바뀜 (보통 trigger는 "special" 또는 "attack")
- "heal_dealt": 이번 전투에서 지금까지 우리 팀이 입힌 피해의 value%만큼 회복 (그대로면 100)
- "lifesteal_pct": 내가 입힌 피해의 value%만큼 회복 (일반 공격과 필살기 모두면 "attack"과 "special" 규칙을 각각 하나씩)
- "recover_hit": 공격을 받은 뒤(피해는 그대로 받고) 받은 피해의 value%만큼 회복 (trigger는 "hit")
- "absorb_hit": 공격받을 때 피해를 받지 않고, 대신 그 피해의 value%만큼 체력을 회복 (trigger는 "hit", 피해만큼 회복이면 100)
- "extra_dmg_pct"를 "hit"에 쓰면: 공격받을 때 받은 피해의 value%를 상대에게 되돌려줌(반사)
chance: 확률(1~100, 없으면 100). 문장에 "~% 확률"이 있으면 그 숫자.
"내 팀/우리 드래곤"은 내 드래곤에게 적용된다고 보면 돼요.
설명에 숫자가 없으면 아이 게임에 알맞은 적당한 값을 골라주세요.

설명: """${text}"""

JSON 하나만 답해요:
{"rules":[...최대 6개...],"summary":"적용되는 내용을 아이가 이해할 짧은 한국어 한 문장","unsupported":"규칙으로 못 바꾼 부분이 있으면 짧게, 없으면 빈 문자열"}
예: {"rules":[{"trigger":"low_hp","threshold":30,"action":"atk_mult","value":100},{"trigger":"attack","chance":20,"action":"stun_enemy","value":1}],"summary":"체력이 30% 이하면 공격력 2배, 공격할 때 20% 확률로 상대 기절","unsupported":""}`;
  const res=await sampleFn.json(prompt,{modelTier:"default"});
  const rules=cleanRules(res&&res.rules);
  return {rules,summary:String(res&&res.summary||"").slice(0,200),unsupported:String(res&&res.unsupported||"").slice(0,200)};
}
function petEditorHTML(){
  return `<div class="end" style="gap:10px">
      <h2>펫 관리</h2>
      <p class="note" style="margin:0">아기 드래곤 펫의 이름, 효과, 사진을 정해요. 사진이 있는 펫만 뽑기에 나와요.</p>
      ${cloud?"":`<p class="warn" style="margin:0">공유 저장소에 연결되어야 펫 사진을 넣을 수 있어요.</p>`}
      <form id="petAdd" class="who" style="width:100%"><label class="sr" for="petName">새 펫 이름</label><input id="petName" placeholder="새 펫 이름" maxlength="20" autocomplete="off"><button class="btn small" type="submit">펫 추가</button></form>
      <button class="btn" id="petDone">다 했어요</button>
    </div>
    <div class="list">${petDefs.map(p=>{const ps=petPhotosOf(p.id);
      return `<div class="sp prem-edge">
        <div class="sp-head"><div class="sp-name"><label class="sr" for="pn-${p.id}">이름</label><input class="search" id="pn-${p.id}" data-pname="${p.id}" value="${esc(p.name)}" maxlength="20" style="min-height:40px"></div>
          <span class="count ${ps.length?"has":""}">${ps.length}장</span></div>
        ${fxEditor(p)}
        ${bfxEditor(p)}
        ${ps.length?`<div class="thumbs">${ps.map(ph=>`<button class="thumb ${pz.armedDel===ph.id?"armed":""}" data-pph="${ph.id}" aria-label="펫 사진${pz.armedDel===ph.id?" 삭제":""}"><img src="${urlOf(ph)}" alt=""></button>`).join("")}</div>`:""}
        <div class="sp-actions">
          <a class="btn ghost small" href="https://www.google.com/search?tbm=isch&q=${encodeURIComponent((/아기/.test(p.name)?p.name:"아기 "+p.name)+" 드래곤 길들이기 baby dragon")}" target="_blank" rel="noopener">아기 사진 찾기</a>
          <span class="btn small pickwrap">사진 추가<input type="file" accept="image/*" multiple data-pick="pet:${p.id}" aria-label="${esc(p.name)} 사진 추가"></span>
          <button class="btn ghost small" data-pdel="${p.id}" style="${pz.armedDel===p.id?"border-color:var(--blood);color:var(--blood)":""}">${pz.armedDel===p.id?"한 번 더 누르면 삭제":"펫 삭제"}</button>
        </div></div>`;}).join("")||`<p class="note">아직 펫이 없어요. 위에서 이름을 넣고 추가해 주세요.</p>`}</div>`;
}
function bindPet(el){
  const egg=$("#egg"); if(egg&&egg.classList.contains("prem")) egg.onclick=()=>{ if(!fz.petAuto) hatchPet(); };
  el.querySelectorAll("[data-equip]").forEach(b=>b.onclick=()=>{ const id=b.dataset.equip; let c=equippedPets();
    if(c.includes(id)) c=c.filter(x=>x!==id); else { if(c.length>=petSlots()){ toast(`펫은 ${petSlots()}마리까지 장착할 수 있어요. 먼저 하나를 빼거나 장착 칸을 늘려주세요`); return; } c.push(id); }
    supPets=c; saveCards(); renderFortune(); });
  const pab=$("#petAutoBtn"); if(pab) pab.onclick=()=>{ if(fz.petAuto){ fz.petAuto=false; pab.textContent="멈추는 중…"; } else petAutoLoop(); };
  const pe=$("#petEdit"); if(pe) pe.onclick=()=>{ pz.editing=true; lastPet=null; renderFortune(); window.scrollTo(0,0); };
  const pd=$("#petDone"); if(pd) pd.onclick=()=>{ pz.editing=false; pz.armedDel=null; renderFortune(); window.scrollTo(0,0); };
  const pa=$("#petAdd"); if(pa) pa.onsubmit=e=>{ e.preventDefault(); const v=$("#petName").value.trim(); if(!v) return;
    const p={id:uid(),name:v,effect:"",createdAt:Date.now()}; petDefs.push(p); savePetDef(p); document.activeElement.blur(); renderFortune(); };
  el.querySelectorAll("[data-pname]").forEach(i=>i.onchange=()=>{ const p=petById(i.dataset.pname); if(!p) return; p.name=i.value.trim()||p.name; savePetDef(p); });
  el.querySelectorAll("[data-bdel]").forEach(b=>b.onclick=()=>{ const [pid,idx]=b.dataset.bdel.split("|"); const p=petById(pid); if(!p) return;
    if(pz.armedDel!==b.dataset.bdel){ pz.armedDel=b.dataset.bdel; renderFortune(); return; }
    pz.armedDel=null; const list=effectsOf(p).slice(); list.splice(+idx,1); syncEffects(p,list); savePetDef(p); toast("효과를 지웠어요"); renderFortune(); });
  el.querySelectorAll("[data-radd]").forEach(b=>b.onclick=()=>{ const p=petById(b.dataset.radd); if(!p) return;
    const v=k=>{ const i=el.querySelector(`[data-rb="${k}"][data-rbp="${p.id}"]`); return i?i.value:""; };
    const rules=cleanRules([{trigger:v("trigger"),action:v("action"),value:+v("value"),chance:+v("chance"),turns:+v("turns"),threshold:+v("threshold")}]);
    if(!rules.length){ toast("효과 값을 확인해 주세요"); return; }
    syncEffects(p,[...effectsOf(p),{text:"",sum:ruleSummary(rules[0]),rules}]); savePetDef(p); toast("전투 효과를 추가했어요"); renderFortune(); });
  el.querySelectorAll("[data-bparse]").forEach(b=>b.onclick=async()=>{ const p=petById(b.dataset.bparse); if(!p||!sampleFn) return;
    const ta=el.querySelector(`[data-btext="${p.id}"]`); const text=(ta?ta.value:"").trim(); if(!text){ toast("효과를 먼저 써주세요"); return; }
    bparseBusy=p.id; if(document.activeElement) document.activeElement.blur(); renderFortune();
    try{ const r=await parseBattleText(p,text);
      if(!r.rules.length){ toast("이 글로는 효과를 만들지 못했어요. 조금 더 구체적으로 써주세요"); p.bunsup=r.unsupported||"읽을 수 있는 효과가 없었어요"; }
      else { syncEffects(p,[...effectsOf(p),{text,sum:r.summary,rules:r.rules}]); p.btext=""; p.bunsup=r.unsupported; toast("전투 효과를 추가했어요"); }
      savePetDef(p);
    }catch(e){ toast(e&&e.code==="not_granted"?"Claude 사용을 허락해야 글로 효과를 만들 수 있어요":e&&e.code==="rate_limited"?"잠시 뒤에 다시 해주세요":"효과를 만들지 못했어요. 다시 해주세요"); }
    bparseBusy=null; renderFortune(); });
  el.querySelectorAll("[data-bfk]").forEach(i=>i.onchange=()=>{ const p=petById(i.dataset.bfp); if(!p) return;
    const f=Object.assign({type:"none"},p.bfx||{}), k=i.dataset.bfk;
    if(k==="type"){ f.type=i.value; f.n=BFX_N0[i.value]||10; } else f.n=Math.max(1,Math.round(+i.value||1));
    p.bfx=f; syncEffects(p,[]); p.bunsup=""; savePetDef(p); i.blur(); toast("전투 효과를 저장했어요"); renderFortune(); });
  el.querySelectorAll("[data-fxk]").forEach(i=>i.onchange=()=>{ const p=petById(i.dataset.fxp); if(!p) return;
    const f=Object.assign({type:"none"},p.fx||{}), k=i.dataset.fxk;
    if(k==="type"||k==="tier") f[k]=i.value; else f[k]=Math.max(1,Math.round(+i.value||1));
    if(k==="type"){ if(!f.n) f.n=2; if(f.type==="passive"&&!f.sec) f.sec=5; if(f.type==="boost"){ f.sec=f.sec||5; f.dur=f.dur||7; } if(f.type==="tier_odds"&&!f.tier) f.tier="legend"; }
    p.fx=f; p.effect=describeFx(f); savePetDef(p); i.blur(); toast("효과를 저장했어요"); renderFortune(); });
  el.querySelectorAll("[data-pph]").forEach(b=>b.onclick=async()=>{ const id=b.dataset.pph;
    if(pz.armedDel===id){ pz.armedDel=null; const ph=petPhotos.find(x=>x.id===id); if(ph){ try{ await cloud.db.collection("petphotos").doc(id).delete(); await cloud.assets.delete(ph.assetId); toast("사진을 지웠어요"); }catch(e){ toast("지우지 못했어요"); } } }
    else pz.armedDel=id; renderFortune(); });
  el.querySelectorAll("[data-pdel]").forEach(b=>b.onclick=async()=>{ const id=b.dataset.pdel;
    if(pz.armedDel===id){ pz.armedDel=null; const p=petById(id); if(p){ await removePet(p); toast("펫을 삭제했어요"); } }
    else { pz.armedDel=id; setTimeout(()=>{ if(pz.armedDel===id){ pz.armedDel=null; if(view==="fortune") renderFortune(); } },3000); }
    renderFortune(); });
}
function renderFortune(){
  const el=$("#fortuneView"); if(fz.hatching) return;
  const ae=document.activeElement; if(ae&&el.contains(ae)&&(ae.tagName==="TEXTAREA"||(ae.tagName==="INPUT"&&ae.type!=="file"))) return;
  if(fz.editing) return renderRarity(el);
  const n=Object.keys(photoGroups()).length;
  const sub=`<div class="chips" role="group" aria-label="뽑기 화면"><button class="chip" data-sub="draw" aria-pressed="${fz.sub==="draw"}">뽑기</button><button class="chip" data-sub="dex" aria-pressed="${fz.sub==="dex"}">도감</button><button class="chip" data-sub="pet" aria-pressed="${fz.sub==="pet"}">아기 펫${tickets?` (${tickets})`:""}</button></div>`;
  let body="";
  if(fz.sub==="pet") body=petHTML();
  else if(!n) body=`<div class="empty"><h2>드래곤 사진이 필요해요</h2><p class="note">사진 관리 탭에서 사진을 넣으면 그 드래곤들이 뽑기에 나와요.</p></div>`;
  else if(fz.sub==="dex") body=dexHTML();
  else {
    const can=gems>=COST, st=dexStats();
    body=`<div class="end" style="gap:8px">
        <div class="gemrow"><svg class="gem" style="width:2.2rem;height:2.2rem" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h12l4 6-10 12L2 9z" fill="var(--gem)"/><path d="M2 9h20M8 3l4 18 4-18M6 3l2 6m10-6-2 6" stroke="rgba(255,255,255,.55)" stroke-width="1.2" fill="none"/></svg><span class="big" id="gemBig" style="color:var(--gem)">${fmt(gems)}</span>
          <div class="meter" aria-hidden="true"><i id="gemMeter" style="width:${Math.min(100,gems/COST*100)}%"></i></div></div>
        <p class="note" style="margin:0">보석 ${COST}개로 알 하나를 깰 수 있어요. 퀴즈를 하나 맞힐 때마다 보석 1개, 도감에 새 드래곤이 올라가면 일반 1개, 희귀 2개, 영웅 4개, 전설 8개를 받아요. 도감 ${st.total} / ${st.sids.length}종</p>
        <div class="gemrow" style="gap:8px"><svg class="gem" style="width:1.6rem;height:1.6rem" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="var(--coin)"/><circle cx="12" cy="12" r="7" fill="none" stroke="rgba(255,255,255,.6)" stroke-width="1.5"/><path d="M12 7.5v9M9.5 9.5h4a1.6 1.6 0 0 1 0 3.2h-3a1.6 1.6 0 0 0 0 3.2h4" stroke="rgba(120,70,0,.75)" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg><span class="luck" style="color:var(--coin);font-size:1.4rem">${fmt(coins)}</span><span class="note">코인</span>
          <button class="btn ghost small" id="toCoin" style="margin-left:auto;${fz.coinArmed?"border-color:var(--coin);color:var(--coin)":""}" ${gems>0?"":"disabled"}>${fz.coinArmed?`한 번 더 누르면 보석 ${fmt(gems)}개를 바꿔요`:"보석 모두 코인으로 바꾸기"}</button></div>
      </div>
      ${last?pullCard(last):""}
      <div class="egg-stage">
        ${can?`<button class="egg" id="egg" aria-label="보석 ${COST}개로 드래곤 알 깨기"><span class="light"></span><span class="half bot"></span><span class="half top"></span><svg class="crack" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><polyline class="cg" pathLength="1" points="0,53 12,45 24,56 37,46 50,58 63,46 76,56 88,45 100,52"/><polyline class="c1" pathLength="1" points="0,53 12,45 24,56 37,46 50,58 63,46 76,56 88,45 100,52"/><polyline class="c2" pathLength="1" points="37,46 41,36 39,28"/><polyline class="c2" pathLength="1" points="76,56 80,66 77,73"/></svg></button><p class="note" style="margin:0">${fz.auto?"자동으로 알을 깨는 중…":`알을 눌러 깨 보세요! (보석 ${COST}개)`}</p>
          <button class="btn ${fz.auto?"":"ghost"}" id="autoBtn">${fz.auto?"자동 뽑기 멈추기":`자동 뽑기 (보석 ${fmt(Math.floor(gems/COST))}번)`}</button>${autoSummary()}`
          :`<div class="egg" style="opacity:.35;cursor:default" aria-hidden="true"><span class="light"></span><span class="half bot"></span><span class="half top"></span><svg class="crack" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><polyline class="cg" pathLength="1" points="0,53 12,45 24,56 37,46 50,58 63,46 76,56 88,45 100,52"/><polyline class="c1" pathLength="1" points="0,53 12,45 24,56 37,46 50,58 63,46 76,56 88,45 100,52"/><polyline class="c2" pathLength="1" points="37,46 41,36 39,28"/><polyline class="c2" pathLength="1" points="76,56 80,66 77,73"/></svg></div><p class="note" style="margin:0">보석이 ${fmt(COST-gems)}개 더 필요해요.</p>${autoSummary()}<button class="btn" id="toQuiz">퀴즈 풀고 보석 모으기</button>`}
      </div>`;
  }
  el.innerHTML=`${sub}${body}${fz.sub==="pet"||!FB.isOwner?"":`<button class="btn ghost" id="editR">희귀도 정하기</button>`}`;
  bindPet(el);
  el.querySelectorAll("[data-sub]").forEach(b=>b.onclick=()=>{ fz.sub=b.dataset.sub; updateAutoPill(); fz.resetArmed=false; pz.editing=false; renderFortune(); });
  const egg=$("#egg"); if(egg&&!egg.classList.contains("prem")) egg.onclick=()=>{ if(!fz.auto) hatch(); };
  const tc=$("#toCoin"); if(tc) tc.onclick=()=>{
    if(!fz.coinArmed){ fz.coinArmed=true; renderFortune(); setTimeout(()=>{ if(fz.coinArmed){ fz.coinArmed=false; if(view==="fortune") renderFortune(); } },3000); return; }
    fz.coinArmed=false; const g=gems; if(g<=0) return; if(fz.auto){ fz.auto=false; setAutoFlag(false); }
    bump("gems",-g); bump("coins",g*COIN_RATE); toast(`보석 ${fmt(g)}개를 코인 ${fmt(g*COIN_RATE)}개로 바꿨어요`); renderFortune(); };
  const ab=$("#autoBtn"); if(ab) ab.onclick=()=>{ if(fz.auto){ fz.auto=false; setAutoFlag(false); ab.textContent="멈추는 중…"; } else autoLoop(); };
  if(fz.sub==="dex") checkComplete();
  const tq=$("#toQuiz"); if(tq) tq.onclick=()=>show("quiz");
  const er=$("#editR"); if(er) er.onclick=()=>{ fz.editing=true; renderFortune(); window.scrollTo(0,0); };
  if(fz.sub==="draw") checkComplete();
}
function renderRarity(el){
  const by={}; photos.forEach(p=>{ if(!by[p.speciesId]) by[p.speciesId]=p; });
  const sids=SPECIES.map(s=>s.id).filter(id=>by[id]).sort((a,b)=>koOf(a).localeCompare(koOf(b),"ko"));
  const cnt={}; sids.forEach(s=>cnt[tierOf(s)]=(cnt[tierOf(s)]||0)+1);
  const tot=TIERS.reduce((a,t)=>a+(cnt[t.k]?odds[t.k]:0),0)||1;
  const shown=sids.filter(s=>fz.rfilter==="all"||tierOf(s)===fz.rfilter);
  el.innerHTML=`<div class="end" style="gap:10px">
      <h2>희귀도 정하기</h2>
      <p class="note" style="margin:0">드래곤마다 등급을 골라주세요. 위 숫자는 그 등급이 나올 확률(%)이고, 같은 등급 안에서는 똑같은 확률로 나와요. 정하지 않은 드래곤은 일반이에요.</p>
      <div class="odds">${TIERS.map(t=>`<div class="${t.cls}"><b>${t.ko}</b>
        <label class="sr" for="od-${t.k}">${t.ko} 확률</label><input id="od-${t.k}" type="number" inputmode="numeric" min="0" max="100" value="${odds[t.k]}" data-odds="${t.k}">
        <span>${cnt[t.k]||0}종 · 1종당 ${cnt[t.k]?((odds[t.k]/tot*100)/cnt[t.k]).toFixed(1):"0"}%</span></div>`).join("")}</div>
      <div class="chips"><button class="chip" data-rf="all" aria-pressed="${fz.rfilter==="all"}">전체 ${sids.length}</button>${TIERS.map(t=>`<button class="chip" data-rf="${t.k}" aria-pressed="${fz.rfilter===t.k}">${t.ko} ${cnt[t.k]||0}</button>`).join("")}</div>
      <button class="btn" id="doneR">다 정했어요</button>
    </div>
    <div class="rlist">${shown.map(sid=>`<div class="rrow"><img src="${urlOf(by[sid])}" alt=""><span class="nm">${esc(koOf(sid))}</span>
      <div class="seg" role="group" aria-label="${esc(koOf(sid))} 등급">${TIERS.slice().reverse().map(t=>`<button class="${t.cls}" data-sid="${sid}" data-tier="${t.k}" aria-pressed="${tierOf(sid)===t.k}">${t.ko}</button>`).join("")}</div></div>`).join("")||`<p class="note">이 등급의 드래곤이 없어요.</p>`}</div>`;
  el.querySelectorAll("[data-tier]").forEach(b=>b.onclick=()=>{ const sid=b.dataset.sid, t=b.dataset.tier; if(t==="common") delete rarity[sid]; else rarity[sid]=t; saveRarity(); renderFortune(); });
  el.querySelectorAll("[data-odds]").forEach(i=>i.onchange=()=>{ odds[i.dataset.odds]=Math.max(0,Math.min(100,Math.round(+i.value||0))); saveRarity(); renderFortune(); });
  el.querySelectorAll("[data-rf]").forEach(b=>b.onclick=()=>{ fz.rfilter=b.dataset.rf; renderFortune(); });
  $("#doneR").onclick=()=>{ fz.editing=false; renderFortune(); window.scrollTo(0,0); };
}

const COIN_SVG='<svg class="gem" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="var(--coin)"/><circle cx="12" cy="12" r="7" fill="none" stroke="rgba(255,255,255,.6)" stroke-width="1.5"/><path d="M12 7.5v9M9.5 9.5h4a1.6 1.6 0 0 1 0 3.2h-3a1.6 1.6 0 0 0 0 3.2h4" stroke="rgba(120,70,0,.75)" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>';
// ---------- 전투 ----------
const SK_TYPES=[
 ["smash","강타","공격력의 N배 피해"],
 ["multi","연속 공격","공격력의 N배로 3번 공격"],
 ["stun","기절","공격력의 N배 피해 + 상대가 한 번 쉬어요"],
 ["drain","흡혈","공격력의 N배 피해 + 준 피해의 절반 회복"],
 ["shield","방패","공격력의 N배 피해 + 다음 공격 2번 피해 절반"],
 ["heal","회복","최대 체력의 N% 회복"]
];
const SK_BY=Object.fromEntries(SK_TYPES.map(t=>[t[0],t]));
const SK_POW0={smash:2.5,multi:0.85,stun:1.2,drain:1.6,shield:1.1,heal:40};
const SK_NAME0={smash:"불꽃 강타",multi:"연속 할퀴기",stun:"날카로운 포효",drain:"기운 흡수",shield:"단단한 비늘",heal:"드래곤 휴식"};
const SK_KNOWN={
 "night-fury":["플라즈마 블라스트","smash",2.8],"light-fury":["플라즈마 블라스트","smash",2.7],"deadly-nadder":["가시 꼬리 발사","multi",0.9],
 "gronckle":["용암 덩어리","smash",2.4],"monstrous-nightmare":["온몸 불꽃","drain",1.7],"hideous-zippleback":["가스 폭발","smash",2.6],
 "skrill":["번개 폭풍","stun",1.3],"thunderdrum":["음파 포효","stun",1.2],"whispering-death":["회전 드릴","multi",0.85],"screaming-death":["비명 포효","stun",1.3],
 "bewilderbeast":["얼음 숨결","stun",1.4],"red-death":["거대 화염","smash",3.0],"catastrophic-quaken":["지진 내려찍기","stun",1.3],
 "typhoomerang":["회오리 불꽃","multi",0.9],"stormcutter":["네 날개 돌풍","multi",0.85],"timberjack":["날개 칼날","smash",2.4],
 "death-song":["호박 덫","stun",1.2],"foreverwing":["숲의 회복","heal",45],"eruptodon":["용암 먹기","heal",40],"razorwhip":["칼날 꼬리","multi",0.9]
};
const TIER_BONUS={common:1,rare:1.1,epic:1.2,legend:1.35};
const BOSSES=["red-death","bewilderbeast","catastrophic-quaken"];
let bset={}, cardLv={}, team=[], supPets=[], bprog={cleared:0,bossPaid:{}};
const bv={sub:"adv",open:null,setOpen:null};
try{const v=JSON.parse(localStorage.getItem("httyd-battle")||"null"); if(v){ bset=v.bset||{}; cardLv=v.cardLv||{}; team=v.team||[]; supPets=Array.isArray(v.supPets)?v.supPets:(v.supPet?[v.supPet]:[]); bprog=Object.assign({cleared:0,bossPaid:{}},v.bprog||{}); }}catch(e){}
function saveBLocal(){ try{localStorage.setItem("httyd-battle",JSON.stringify({bset,cardLv,team,supPets,bprog,extraSlots}));}catch(e){} }
const dirtyDocs={}; // 아직 저장 중인 문서는 서버에서 온 옛 값으로 덮어쓰지 않아요
function makeSaver(path,get){
  let t=null,busy=false,again=false;
  const flush=async()=>{ if(!cloud){ dirtyDocs[path]=false; return; } if(busy){again=true;return;} busy=true;
    try{ await cloud.db.doc(path).set(JSON.parse(JSON.stringify(get()))); }catch(e){}
    busy=false; if(again){again=false; flush(); return;} setTimeout(()=>{ if(!busy&&!t) dirtyDocs[path]=false; },800); };
  return ()=>{ dirtyDocs[path]=true; saveBLocal(); clearTimeout(t); t=setTimeout(()=>{ t=null; flush(); },500); };
}
const saveBset=makeSaver("settings/battle",()=>({map:bset}));
const saveCards=makeSaver("settings/cards",()=>({lv:cardLv,team,pets:supPets.slice(0,petSlots()),pet:supPets[0]||"",slots:extraSlots}));
const saveProg=makeSaver("settings/bprog",()=>bprog);
function initBattleCloud(d){
  d.doc("settings/battle").onSnapshot(s=>{ if(s.exists&&!dirtyDocs["settings/battle"]&&!s.metadata.hasPendingWrites){ bset=JSON.parse(JSON.stringify((s.data()||{}).map||{})); /* 서버 값은 고칠 수 없게 잠겨 있어서 복사해서 써요 */ saveBLocal(); softRenderBattle(); } },()=>{});
  d.doc("settings/cards").onSnapshot(s=>{ if(s.exists&&!dirtyDocs["settings/cards"]&&!s.metadata.hasPendingWrites){ const v=s.data()||{}; cardLv=JSON.parse(JSON.stringify(v.lv||{})); team=Array.isArray(v.team)?v.team:[]; extraSlots=Math.max(0,+v.slots||0); supPets=Array.isArray(v.pets)?v.pets.slice(0,petSlots()):(v.pet?[v.pet]:[]); saveBLocal(); softRenderBattle(); } },()=>{});
  d.doc("settings/bprog").onSnapshot(s=>{ if(s.exists&&!dirtyDocs["settings/bprog"]&&!s.metadata.hasPendingWrites){ bprog=Object.assign({cleared:0,bossPaid:{}},JSON.parse(JSON.stringify(s.data()||{}))); saveBLocal(); softRenderBattle(); } },()=>{});
}
function seedRand(str){ return rng(hashStr(str)); }
function hashStr(str){let h=2166136261; for(const ch of str){h^=ch.codePointAt(0); h=Math.imul(h,16777619);} return h>>>0;}
function rng(seed){let a=seed>>>0; return ()=>{a=(a+0x6D2B79F5)>>>0; let t=a; t=Math.imul(t^(t>>>15),t|1); t^=t+Math.imul(t^(t>>>7),t|61); return ((t^(t>>>14))>>>0)/4294967296;};}
function defaultCfg(sid){
  const r=seedRand("stat|"+sid), tb=TIER_BONUS[tierOf(sid)]||1;
  // 체력은 공격력의 약 10배 (300 안팎, 공격 30 안팎)
  const hp=Math.round((300+Math.round(r()*72-36))*tb), atk=Math.round((30+Math.round(r()*12-6))*tb);
  let sk;
  if(SK_KNOWN[sid]){ const [name,type,pow]=SK_KNOWN[sid]; sk={name,type,pow,cd:3}; }
  else { const type=SK_TYPES[Math.floor(r()*SK_TYPES.length)][0]; sk={name:SK_NAME0[type],type,pow:SK_POW0[type],cd:3}; }
  return {on:sid!=="terrible-terror",hp,atk,sk,photo:""};
}
function cfgOf(sid){ const d=defaultCfg(sid), c=bset[sid]||{}; return {on:c.on!=null?c.on:d.on,hp:+c.hp||d.hp,atk:+c.atk||d.atk,sk:Object.assign({},d.sk,c.sk||{}),photo:c.photo||""}; }
function setCfg(sid,patch){ const c=Object.assign({},bset[sid]||{}); Object.assign(c,patch); bset[sid]=c; saveBset(); }
function cardPhoto(sid){ const ps=photos.filter(p=>p.speciesId===sid); const want=cfgOf(sid).photo; return ps.find(p=>p.id===want)||ps[0]; }
// 레벨 = 중복 카드로 오른 레벨 + 코인으로 올린 레벨
// 중복 카드: Lv1→2에 1장, Lv2→3에 2장, Lv3→4에 3장 … 레벨이 오를수록 더 많이 필요해요
const dupsOf=sid=>Math.max(0,pullN(sid)-1);
function dupLevel(sid){ let d=dupsOf(sid), lv=1, need=1; while(d>=need&&lv<99){ d-=need; lv++; need++; } return {lv,have:d,need}; }
const coinLv=sid=>Math.max(0,(+cardLv[sid]||1)-1);
const lvOf=sid=>Math.min(199,dupLevel(sid).lv+coinLv(sid));
const lvCost=lv=>Math.round(50*Math.pow(1.4,lv-1));
let extraSlots=0; try{ extraSlots=+(JSON.parse(localStorage.getItem("httyd-battle")||"{}").extraSlots)||0; }catch(e){}
const SLOT_COST=250e9, MAX_SLOTS=10;
const petSlots=()=>Math.min(MAX_SLOTS,3+extraSlots);
const equippedPets=()=>supPets.filter(id=>petN(id)>0&&petById(id)).slice(0,petSlots());
function slotBuyHTML(){ if(petSlots()>=MAX_SLOTS) return "";
  return `<button class="btn ghost small" data-buyslot="1" ${gems>=SLOT_COST?"":"disabled"} style="align-self:flex-start">장착 칸 늘리기 (보석 ${fmt(SLOT_COST)})${gems>=SLOT_COST?"":` · ${fmt(SLOT_COST-gems)} 더 필요`}</button>`; }
function buySlot(){ if(gems<SLOT_COST){ toast("보석이 모자라요"); return false; } if(petSlots()>=MAX_SLOTS) return false;
  bump("gems",-SLOT_COST); extraSlots++; saveCards(); toast(`장착 칸이 ${petSlots()}칸이 됐어요!`); return true; }
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("[data-buyslot]"); if(!b) return;
  if(buySlot()){ if(view==="fortune") renderFortune(); else if(view==="battle") renderBattle(); } });
function petBonus(){ return 1+0.1*equippedPets().length; }
function playerStats(sid){ const c=cfgOf(sid), lv=lvOf(sid), m=(1+0.1*(lv-1))*petBonus(); return {hp:Math.round(c.hp*m),atk:Math.round(c.atk*m),lv}; }
function skText(sk){ const t=SK_BY[sk.type]; if(!t) return ""; return t[2].replace("N%",`${sk.pow}%`).replace("N배",`${sk.pow}배`); }
function battleOwned(){ const have={has:hasPull}; return SPECIES.map(s=>s.id).filter(id=>have.has(id)&&cfgOf(id).on&&cardPhoto(id)); }
function battlePool(){ return SPECIES.map(s=>s.id).filter(id=>cfgOf(id).on&&cardPhoto(id)); }
function stageInfo(n){
  const pool=battlePool(); if(!pool.length) return null;
  const isBoss=n%10===0; const lv=n;
  const r=seedRand("stage|"+n), normal=pool.filter(id=>!BOSSES.includes(id));
  const src=normal.length?normal:pool;
  if(isBoss){
    const want=BOSSES[(n/10-1)%BOSSES.length]; const boss=pool.includes(want)?want:pool.slice().sort((a,b)=>cfgOf(b).hp+cfgOf(b).atk*3-(cfgOf(a).hp+cfgOf(a).atk*3))[0];
    const minions=n>=20?[src[Math.floor(r()*src.length)]]:[];
    return {n,boss:true,lv,units:[...minions.map(id=>({sid:id,lv:Math.max(1,lv-2),boss:false})),{sid:boss,lv,boss:true}]};
  }
  const size=n<=3?1:n<=10?2:3; const units=[];
  for(let i=0;i<size;i++) units.push({sid:src[Math.floor(r()*src.length)],lv:Math.max(1,lv-(size-1-i)),boss:false});
  return {n,boss:false,lv,units};
}
const DIFFS=[["easy","쉬움",0.7],["normal","보통",1],["hard","어려움",1.35],["hell","지옥",1.8]];
const diffMul=()=>{ const d=DIFFS.find(x=>x[0]===(bprog.diff||"normal")); return d?d[2]:1; };
function enemyUnit(u,n){
  // 적 강화: 레벨당 10% + 스테이지마다 2%씩 복리 + 기본 15% + 난이도 배수
  const st=n||bt&&bt.n||1, g=Math.pow(1.02,st)*1.15*diffMul();
  const c=cfgOf(u.sid), m=(1+0.1*(u.lv-1))*g, hm=u.boss?3:1, am=u.boss?1.4:1;
  const hp=Math.round(c.hp*m*hm); return {sid:u.sid,lv:u.lv,boss:u.boss,max:hp,hp,atk:Math.round(c.atk*m*am),sk:c.sk,charge:0,stun:false,shield:0};
}
// 가진 펫들의 전투 효과 합계 (같은 펫이 더 있으면 10%씩 세져요)
// 가진 펫들의 전투 규칙 (펫을 여러 마리 가져도 전투 효과는 한 번만 적용돼요)
const BFX2RULE={team_hp:["always","hp_mult"],team_atk:["always","atk_mult"],regen:["turn","heal_pct"],crit:["always","crit_pct"],start_charge:["start","charge"],revive:["faint","revive_pct"],reward:["always","coin_pct"]};
function petRules(p){
  const effs=effectsOf(p); if(effs.length) return effs.flatMap(e=>e.rules||[]);
  if(p.bfx&&BFX2RULE[p.bfx.type]){ const [trigger,action]=BFX2RULE[p.bfx.type]; return [{trigger,action,value:+p.bfx.n||0,chance:100,threshold:30}]; }
  return [];
}
function bfxList(){ const eq=equippedPets(); return petDefs.filter(p=>eq.includes(p.id)&&petRules(p).length); }
function battleRules(){
  const own=Object.assign({},petC); const out=[];
  const eq=equippedPets(); // 장착한 펫(최대 3마리)의 전투 효과만 켜져요
  for(const p of petDefs){ if(!own[p.id]||!eq.includes(p.id)) continue; for(const r of petRules(p)) out.push(Object.assign({},r,{value:r.value,pet:p.name})); }
  return out;
}
function bfxSum(){ const o={}; for(const r of battleRules()) if(r.trigger==="always"||r.trigger==="start") o[r.action]=(o[r.action]||0)+r.value; return o; }
const roll=r=>Math.random()*100<(r.chance||100);
const isLow=(u,r)=>u&&u.hp>0&&u.hp/u.max*100<=(r.threshold||30);
function rsum(action,trig,u){ if(!bt) return 0; let v=0; for(const r of bt.rules){ if(r.action!==action) continue;
  if(r.trigger==="always"||(trig&&r.trigger===trig)||(r.trigger==="low_hp"&&u&&isLow(u,r))) v+=r.value; } return v; }
function rfire(trig,u){ // 확률 굴려서 이번에 켜진 규칙들
  if(!bt) return []; return bt.rules.filter(r=>r.trigger===trig&&roll(r)); }
function playerUnit(sid){ const s=playerStats(sid), c=cfgOf(sid), b=bfxSum();
  const hp=Math.round(s.hp*(1+((b.hp_mult||0))/100)), atk=Math.round(s.atk*(1+((battleRules().filter(r=>r.trigger==="always"&&r.action==="atk_mult").reduce((a,r)=>a+r.value,0)))/100));
  const startCharge=battleRules().filter(r=>r.trigger==="start"&&r.action==="charge").reduce((a,r)=>a+r.value,0);
  return {sid,lv:s.lv,boss:false,max:hp,hp,atk,sk:c.sk,charge:Math.min(c.sk.cd,Math.floor(startCharge)),stun:false,shield:0,mine:true}; }
function rewardOf(n,first){ return Math.round(30*n*(first?2:1)*Math.max(1,diffMul())); }

const bsleep=ms=>sleep(ms*(bt&&bt.auto?1.8:1)); // 자동 전투는 천천히
function hb(h,u){ if(!u||!u.mine||!bt) return h; const v=rsum("heal_boost_pct",null,u); if(v) h=Math.round(h*(1+v/100)); // 모든 회복 강화
  const hd=rsum("heal_to_dmg",null,u); // 회복한 만큼 상대에게 피해
  if(hd&&h>0){ const f=cur("foe"); if(alive(f)){ const x=Math.max(1,Math.round(h*hd/100)); f.hp=Math.max(0,f.hp-x); bt.healDmg=(bt.healDmg||0)+x; bt.healDmgBy=bt.rules.find(r=>r.action==="heal_to_dmg").pet; } }
  return h; }
async function showHealDmg(){ if(!bt||!bt.healDmg) return; const x=bt.healDmg; bt.healDmg=0; bt.log+=` · ${bt.healDmgBy} 회복한 만큼 상대에게 ${x} 피해!`; await fxHit("foe","-"+x,"big"); updBars(); await bsleep(350); }
// ---- 전투 진행 ----
let bt=null;
function startBattle(n){
  const st=stageInfo(n); const mine=team.filter(id=>battleOwned().includes(id));
  if(!st){ toast("전투할 드래곤 사진이 없어요"); return; }
  if(!mine.length){ toast("먼저 카드 탭에서 팀을 골라주세요"); bv.sub="cards"; renderBattle(); return; }
  const foes=st.units.map(u=>enemyUnit(u,n)), down=battleRules().filter(r=>(r.trigger==="always"||r.trigger==="start")&&r.action==="enemy_atk_down").reduce((a,r)=>a+r.value,0);
  if(down) foes.forEach(f=>f.atk=Math.max(1,Math.round(f.atk*(1-Math.min(90,down)/100))));
  bt={n,info:st,rules:battleRules(),usedFaint:new Set(),dodged:false,me:mine.map(playerUnit),foe:foes,mi:0,fi:0,log:`${st.boss?"보스 ":""}스테이지 ${n} 시작!`,busy:false,auto:!!bv.autoOn,done:null,switching:false,turn:1};
  if(battleRules().some(r=>r.trigger==="start"&&r.action==="stun_enemy"&&roll(r))) bt.foe[0].stun=true;
  { const seal=battleRules().filter(r=>r.trigger==="start"&&r.action==="seal_enemy"&&roll(r)).reduce((m,r)=>Math.max(m,Math.round(r.value)),0);
    if(seal){ bt.foe.forEach(f=>f.sealed=seal); bt.log+=` 펫 효과로 상대가 ${seal}턴 동안 필살기를 못 써요!`; } }
  renderBattle(); window.scrollTo(0,0);
  if(bt.auto) setTimeout(autoStep,700);
}
const alive=u=>u&&u.hp>0;
const cur=side=>side==="me"?bt.me[bt.mi]:bt.foe[bt.fi];
function dmgRoll(atk,mult,mine){
  const u=mine&&bt?cur("me"):null;
  const crit=Math.random()<0.1+(u?rsum("crit_pct",null,u)/100:0);
  const boost=u?1+bt.rules.filter(r=>r.trigger==="low_hp"&&r.action==="atk_mult"&&isLow(u,r)).reduce((a,r)=>a+r.value,0)/100:1;
  return {d:Math.max(1,Math.round(atk*mult*boost*(0.85+Math.random()*0.3)*(crit?1.5:1))),crit}; }
function applyHit(target,d){
  let absorb=null, recover=null;
  if(target.mine&&bt&&bt.evade&&bt.evade.turns>0){ // 펫 효과: 공격을 피하고 일부를 되돌려줘요
    const f=cur("foe"), x=Math.max(1,Math.round(d*bt.evade.pct/100));
    if(alive(f)){ f.hp=Math.max(0,f.hp-x); bt.reflect=(bt.reflect||0)+x; bt.reflectBy=bt.evade.by; }
    bt.dodged=true; return 0; }
  if(target.mine&&bt){
    const up=rsum("dmg_taken_pct",null,target); if(up) d=Math.max(1,Math.round(d*(1+up/100)));
    const hf=rfire("hit"); let red=rsum("dmg_reduce_pct",null,target); for(const r of hf) if(r.action==="dmg_reduce_pct") red+=r.value;
    if(red) d=Math.max(1,Math.round(d*(1-Math.min(90,red)/100)));
    for(const r of hf){ if(r.action==="extra_dmg_pct"){ const f=cur("foe"); if(alive(f)){ const x=Math.max(1,Math.round(d*r.value/100)); f.hp=Math.max(0,f.hp-x); bt.reflect=(bt.reflect||0)+x; bt.reflectBy=r.pet; } }
      if(r.action==="absorb_hit") absorb=r;
      if(r.action==="recover_hit") recover=r;
      if(r.action==="heal_pct") target.hp=Math.min(target.max,target.hp+hb(Math.round(target.max*r.value/100),target)); if(r.action==="charge") target.charge=Math.min(target.sk.cd,target.charge+Math.round(r.value)); }
  }
  if(absorb){ // 피해 대신 그만큼 회복
    let h=Math.round(d*absorb.value/100); h=hb(h,target); target.hp=Math.min(target.max,target.hp+h); bt.absorbNow={x:h,by:absorb.pet}; return 0; }
  if(target.shield>0){ d=Math.max(1,Math.round(d/2)); target.shield--; }
  if(!target.mine&&bt) bt.dealtTotal=(bt.dealtTotal||0)+Math.min(d,target.hp);
  target.hp=Math.max(0,target.hp-d);
  if(recover&&target.hp>0){ let h=Math.round(d*recover.value/100); bt.recover=(bt.recover||0)+h; bt.recoverBy=recover.pet; bt.recoverTo=target; } // 회복은 잠깐 뒤에
  return d; }
async function fxHit(side,text,kind){
  if(bt&&bt.dodged){ bt.dodged=false; text="피했어요!"; kind="heal";
    const c=document.querySelector(".bcard.me.act"); if(c){ c.classList.remove("phase"); void c.offsetWidth; c.classList.add("phase"); c.classList.add("evading");
      const ff=document.createElement("span"); ff.className="dmg heal"; ff.textContent=text; c.appendChild(ff); setTimeout(()=>ff.remove(),900); } return; }
  if(bt&&side==="me"&&bt.absorbNow){ const a=bt.absorbNow; bt.absorbNow=null; text="회복 +"+a.x; kind="heal"; bt.log=`${a.by} 덕분에 공격을 받는 대신 체력 +${a.x} 회복!`; const lg=document.getElementById("blog"); if(lg) lg.textContent=bt.log; }
  const el=document.querySelector(`.bcard.${side}.act`); if(!el) return;
  el.classList.remove("hit"); void el.offsetWidth; el.classList.add("hit");
  const f=document.createElement("span"); f.className="dmg "+(kind||""); f.textContent=text; el.appendChild(f); setTimeout(()=>f.remove(),900);
}
function updBars(){
  for(const side of ["me","foe"]){ const u=cur(side); const el=document.querySelector(`.bcard.${side}.act`); if(!el||!u) continue;
    el.querySelector(".hpf").style.width=(u.hp/u.max*100)+"%"; el.querySelector(".hpt").textContent=`${u.hp} / ${u.max}`; }
  const lg=document.getElementById("blog"); if(lg) lg.textContent=bt.log;
}
async function lowOnce(){ // 처음으로 체력이 N% 이하가 되면 한 번
  const u=cur("me"); if(!alive(u)) return;
  for(let i=0;i<bt.rules.length;i++){ const r=bt.rules[i]; const key="o"+i+"|"+bt.mi; if(r.trigger!=="low_hp_once"||bt.usedFaint.has(key)) continue;
    if(u.hp/u.max*100>(r.threshold||30)||!roll(r)) continue; bt.usedFaint.add(key); // 드래곤마다 한 번
    if(r.action==="heal_dealt"){ let h=Math.round((bt.dealtTotal||0)*(r.value||100)/100); if(h>0){ h=hb(h,u); u.hp=Math.min(u.max,u.hp+h); bt.log=`${r.pet}의 힘! 지금까지 입힌 피해 ${bt.dealtTotal}에서 체력 +${h} 회복!`; await fxHit("me","+"+h,"heal"); updBars(); await bsleep(900); } }
    else if(r.action==="heal_pct"){ let h=Math.round(u.max*r.value/100); h=hb(h,u); u.hp=Math.min(u.max,u.hp+h); bt.log=`${r.pet}의 힘! 체력 +${h}`; await fxHit("me","+"+h,"heal"); updBars(); await bsleep(700); }
    else if(r.action==="charge"){ u.charge=Math.min(u.sk.cd,u.charge+Math.round(r.value)); bt.log=`${r.pet}의 힘! 필살기 충전`; updBars(); await bsleep(500); }
  }
  await showHealDmg();
}
async function petTrig(trig,a,o,dealt){
  const fired=rfire(trig); if(!fired.length) return; const msgs=[];
  // 상대가 이번 공격으로 쓰러졌으면, 상태 효과는 다음에 나올 상대에게 걸어요
  const so=alive(o)?o:(a.mine?bt.foe.find(alive):null);
  for(const r of fired){
    if(r.action==="extra_dmg_pct"&&alive(o)&&dealt>0){ const x=Math.max(1,Math.round(dealt*r.value/100)); o.hp=Math.max(0,o.hp-x); await fxHit(a===cur("me")?"foe":"me","-"+x,"big"); msgs.push(`${r.pet} 추가 피해 ${x}`); }
    else if(r.action==="stun_enemy"&&so){ so.stun=true; msgs.push(`${r.pet} 덕분에 상대 기절!`); }
    else if(r.action==="evade_reflect"){ bt.evade={turns:Math.max(1,Math.round(r.turns||3)),pct:r.value,by:r.pet}; msgs.push(`${r.pet} 덕분에 ${bt.evade.turns}턴 동안 모든 공격을 피해요!`); }
    else if(r.action==="confuse_enemy"&&so){ so.confused=Math.max(so.confused||0,Math.round(r.value)); so.confusedBy=r.pet; msgs.push(`${r.pet} 덕분에 상대가 ${Math.round(r.value)}턴 동안 헷갈려요!`); }
    else if(r.action==="curse_heal"&&so){ so.curse=Math.max(so.curse||0,Math.round(r.value)); msgs.push(`${r.pet}의 저주! 상대는 ${Math.round(r.value)}턴 동안 회복이 피해가 돼요`); }
    else if(r.action==="seal_enemy"&&so){ so.sealed=Math.max(so.sealed||0,Math.round(r.value)); msgs.push(`${r.pet} 덕분에 상대 필살기 ${Math.round(r.value)}턴 봉인!`); }
    else if(r.action==="lifesteal_pct"&&dealt>0&&a.hp<a.max){ updBars(); await bsleep(400); let h=Math.max(1,Math.round(dealt*r.value/100)); h=hb(h,a); a.hp=Math.min(a.max,a.hp+h); await fxHit("me","+"+h,"heal"); msgs.push(`${r.pet} 흡혈 +${h}`); }
    else if(r.action==="heal_pct"&&a.hp<a.max){ let h=Math.round(a.max*r.value/100); h=hb(h,a); a.hp=Math.min(a.max,a.hp+h); await fxHit("me","+"+h,"heal"); msgs.push(`${r.pet} 회복 +${h}`); }
    else if(r.action==="charge"){ a.charge=Math.min(a.sk.cd,a.charge+Math.round(r.value)); msgs.push(`${r.pet} 필살기 충전`); }
  }
  if(msgs.length){ bt.log+=" · "+msgs.join(", "); updBars(); await bsleep(350); }
}
async function doAction(side,kind){
  const a=cur(side), oside=side==="me"?"foe":"me", o=cur(oside); if(!alive(a)||!alive(o)) return;
  const nm=koOf(a.sid);
  if(a.stun){ a.stun=false; bt.log=`${nm}은(는) 기절해서 쉬어요!`; updBars(); await bsleep(700); return; }
  if(side==="foe"){ let mf=null; if((a.confused||0)>0){ a.confused--; mf={pet:a.confusedBy||"펫"}; } else mf=rfire("hit").find(r=>r.action==="enemy_misfire");
    if(mf){ const mates=bt.foe.filter(u=>u!==a&&alive(u)); const tgt=mates.length?pick(mates):a; const isSk=kind==="special"&&a.charge>=a.sk.cd&&a.sk.type!=="heal";
      if(isSk) a.charge=0; else a.charge=Math.min(a.sk.cd,a.charge+1);
      const r=dmgRoll(a.atk,isSk?(a.sk.type==="multi"?a.sk.pow*3:a.sk.pow):1,false); tgt.hp=Math.max(0,tgt.hp-r.d);
      bt.log=`${mf.pet} 효과! ${nm}이(가) 헷갈려서 ${tgt===a?"자기 자신":koOf(tgt.sid)}을(를) 공격했어요! ${r.d} 피해`;
      fxHit("me","피해 없음","heal"); await fxHit("foe","헷갈림! -"+r.d,"big"); updBars(); await bsleep(750); return; } }
  // 봉인은 필살기 게이지가 다 찬 다음부터 턴을 세요
  const sealedNow=(a.sealed||0)>0; if(sealedNow&&a.charge>=a.sk.cd){ a.sealed--; if(kind==="special") bt.sealMsg=true; }
  if(kind==="special"&&sealedNow){ kind="attack"; }
  if(kind==="special"&&a.charge>=a.sk.cd){
    a.charge=0; const sk=a.sk;
    const card=document.querySelector(`.bcard.${side}.act`); if(card){ card.classList.add("skill"); setTimeout(()=>card.classList.remove("skill"),900); }
    bt.log=`${nm}의 ${sk.name}!`; updBars(); await bsleep(450);
    if(sk.type==="heal"){ let h=Math.round(a.max*sk.pow/100);
      if(a.curse>0){ a.hp=Math.max(0,a.hp-h); bt.log=`${nm}의 ${sk.name}! 그런데 저주 때문에 회복 대신 ${h} 피해!`; await fxHit(side,"저주 -"+h,"big"); }
      else { h=hb(h,a); a.hp=Math.min(a.max,a.hp+h); bt.log=`${nm}의 ${sk.name}! 체력 +${h}`; await fxHit(side,"+"+h,"heal"); }
      if(a.mine) await petTrig("special",a,o,0); }
    else if(sk.type==="multi"){ let tot=0; for(let i=0;i<3&&alive(o);i++){ const r=dmgRoll(a.atk,sk.pow,a.mine); const d=applyHit(o,r.d); tot+=d; await fxHit(oside,(r.crit?"치명타! ":"")+"-"+d,"big"); updBars(); await bsleep(260); } bt.log=`${nm}의 ${sk.name}! 3연속 ${tot} 피해`; if(a.mine) await petTrig("special",a,o,tot); }
    else { const r=dmgRoll(a.atk,sk.pow,a.mine); const d=applyHit(o,r.d); await fxHit(oside,(r.crit?"치명타! ":"")+"-"+d,"big");
      let extra="";
      if(sk.type==="stun"){ o.stun=true; extra=" 상대가 기절했어요!"; }
      if(sk.type==="drain"){ let h=Math.round(d/2); if(a.curse>0){ a.hp=Math.max(0,a.hp-h); extra=` 저주 때문에 회복 대신 ${h} 피해!`; } else { h=hb(h,a); a.hp=Math.min(a.max,a.hp+h); extra=` 체력 +${h}`; } }
      if(sk.type==="shield"){ a.shield=2; extra=" 방패가 생겼어요!"; }
      bt.log=d||a.mine?`${nm}의 ${sk.name}! ${d} 피해${r.crit?" (치명타)":""}.${extra}`:`${nm}의 ${sk.name}! 하지만 피했어요!`; if(a.mine) await petTrig("special",a,o,d); }
  } else {
    const r=dmgRoll(a.atk,1,a.mine); const d=applyHit(o,r.d); a.charge=Math.min(a.sk.cd,a.charge+1);
    bt.log=d||a.mine?`${nm}의 공격! ${d} 피해${r.crit?" (치명타!)":""}`:`${nm}의 공격! 하지만 피했어요!`; await fxHit(oside,(r.crit?"치명타! ":"")+"-"+d);
    if(a.mine) await petTrig("attack",a,o,d);
  }
  await showHealDmg();
  if(a.curse>0) a.curse--;
  if(side==="foe"&&bt.evade&&bt.evade.turns>0){ bt.evade.turns--; if(!bt.evade.turns){ const c=document.querySelector(".bcard.me.act"); if(c) c.classList.remove("evading"); } }
  if(side==="foe"&&bt.recover){ let x=bt.recover; const t=bt.recoverTo; bt.recover=0;
    updBars(); await bsleep(450);
    if(t&&t.hp>0){ x=hb(x,t); t.hp=Math.min(t.max,t.hp+x); bt.log+=` · ${bt.recoverBy} 회복 +${x}`; await fxHit("me","+"+x,"heal"); updBars(); await bsleep(350); } }
  if(side==="foe"&&bt.reflect){ const x=bt.reflect; bt.reflect=0; bt.log+=` · ${bt.reflectBy} 반사 ${x}!`; await fxHit("foe","반사 -"+x,"big"); }
  updBars(); await bsleep(650);
}
function nextAlive(arr,from){ for(let i=0;i<arr.length;i++) if(alive(arr[i])) return i; return -1; }
async function afterFaints(){
  if(!alive(cur("foe"))){ const k=nextAlive(bt.foe); if(k<0){ return finish(true); } bt.log=`${koOf(cur("foe").sid)}이(가) 쓰러졌어요! ${koOf(bt.foe[k].sid)} 등장!`; bt.fi=k; renderBattle(); await bsleep(800); }
  if(!alive(cur("me"))){ const rv=bt.rules.map((r,i)=>({r,i})).find(x=>x.r.trigger==="faint"&&x.r.action==="revive_pct"&&!bt.usedFaint.has(x.i+"|"+bt.mi)&&roll(x.r));
    if(rv){ const u=cur("me"); bt.usedFaint.add(rv.i+"|"+bt.mi); /* 드래곤마다 한 번 */ u.hp=Math.max(1,Math.round(u.max*Math.min(100,rv.r.value)/100)); bt.log=`${rv.r.pet}의 힘으로 ${koOf(u.sid)} 부활! 체력 ${u.hp}`; renderBattle(); await bsleep(900); } }
  if(!alive(cur("me"))){ const k=nextAlive(bt.me); if(k<0){ return finish(false); } bt.log=`${koOf(cur("me").sid)}이(가) 쓰러졌어요! ${koOf(bt.me[k].sid)} 출동!`; bt.mi=k; renderBattle(); await bsleep(800); }
  return false;
}
function quitNow(){ if(bt&&bt.quitPending){ bt=null; renderBattle(); toast("전투를 그만뒀어요"); return true; } return false; }
async function playerTurn(kind,switchTo){
  if(!bt||bt.busy||bt.done) return; bt.busy=true; renderBattle();
  if(kind==="switch"){ bt.mi=switchTo; bt.log=`${koOf(cur("me").sid)} 출동!`; bt.switching=false; renderBattle(); await bsleep(600); }
  else await doAction("me",kind);
  if(quitNow()) return;
  if(await afterFaints()===true||bt.done){ return; }
  if(alive(cur("me"))) await petTrig("turn",cur("me"),cur("foe"),0);
  if(quitNow()) return;
  const e=cur("foe"); await doAction("foe",e.charge>=e.sk.cd?"special":"attack");
  if(quitNow()) return;
  await lowOnce();
  if(await afterFaints()===true||bt.done){ return; }
  if(quitNow()) return;
  bt.turn++; bt.busy=false; renderBattle();
  if(bt.auto) setTimeout(autoStep,900);
}
function autoStep(){ if(!bt||!bt.auto||bt.busy||bt.done) return; const u=cur("me"); playerTurn(u.charge>=u.sk.cd?"special":"attack"); }
function finish(win){
  spXP(win?15:5);
  if(bt&&bt.pvp) return pvpFinish(win);
  const n=bt.n, first=win&&n>bprog.cleared; let reward=0, ticket=false;
  if(win){ reward=Math.round(rewardOf(n,first)*(1+rsum("coin_pct")/100)); bump("coins",reward);
    if(first) bprog.cleared=n;
    saveProg(); }
  bt.done={win,reward,ticket,first}; bt.busy=false; bt.auto=false; renderBattle(); return true;
}

// ---- 화면 ----
function hpBar(u){ return `<div class="hpb"><i class="hpf" style="width:${u.hp/u.max*100}%"></i><span class="hpt">${u.hp} / ${u.max}</span></div>`; }
function pips(u){ return `<span class="pips" aria-label="필살기 ${u.charge}/${u.sk.cd}">${Array.from({length:u.sk.cd},(_,i)=>`<i class="${i<u.charge?"on":""}"></i>`).join("")}</span>`; }
function bcard(u,side,act){
  const ph=cardPhoto(u.sid), t=TIER_BY[tierOf(u.sid)]||TIER_BY.common;
  const ev=u.mine&&bt&&bt.evade&&bt.evade.turns>0&&alive(u);
  return `<div class="bcard ${side} ${act?"act":""} ${t.cls} ${alive(u)?"":"down"} ${u.boss?"boss":""} ${ev?"evading":""}">
    <div class="bph">${ph?`<img src="${urlOf(ph)}" alt="">`:""}${u.boss?`<span class="bossb">보스</span>`:""}<span class="stats">${u.mine&&bt&&bt.evade&&bt.evade.turns>0&&alive(u)?`<i class="st-ev">회피 ${bt.evade.turns}</i>`:""}${u.stun?`<i class="st-stun">기절</i>`:""}${u.confused?`<i class="st-conf">헷갈림 ${u.confused}</i>`:""}${u.sealed?`<i class="st-seal">봉인 ${u.sealed}</i>`:""}${u.curse?`<i class="st-curse">저주 ${u.curse}</i>`:""}${u.shield?`<i class="st-sh">방패 ${u.shield}</i>`:""}</span></div>
    <div class="binfo"><div class="bname"><b>${esc(koOf(u.sid))}</b><span>Lv.${u.lv}</span></div>${hpBar(u)}${act?`<div class="bsk">${esc(u.sk.name)} ${pips(u)}</div>`:""}</div></div>`;
}
function bench(arr,idx,side){ return arr.length>1?`<div class="bench">${arr.map((u,i)=>i===idx?"":`<div class="bmini ${alive(u)?"":"down"}" title="${esc(koOf(u.sid))}">${cardPhoto(u.sid)?`<img src="${urlOf(cardPhoto(u.sid))}" alt="">`:""}<i style="width:${u.hp/u.max*100}%"></i></div>`).join("")}</div>`:""; }
function renderFight(el){
  const me=cur("me"), foe=cur("foe"), d=bt.done;
  if(d&&bt.pvp){ pvpResult(el); return; }
  if(d){
    el.innerHTML=`<div class="end bresult ${d.win?"win":"lose"}">
      <h2>${d.win?(bt.info.boss?"보스를 쓰러뜨렸어요!":"승리!"):"아쉽게 졌어요"}</h2>
      <p class="note" style="margin:0">스테이지 ${bt.n}${bt.info.boss?" · 보스":""}</p>
      ${d.win?`<div class="gemrow">${COIN_SVG}<span class="big" style="color:var(--coin)">+${fmt(d.reward)}</span><span class="note">코인${d.first?" (첫 승리 2배)":""}</span></div>`:`<p class="note" style="margin:0">카드 탭에서 코인으로 레벨을 올리거나 팀을 바꿔서 다시 도전해 봐요.</p>`}
      ${d.ticket?`<p class="ticket" style="margin:0">보스 첫 승리! 펫 뽑기권 +1</p>`:""}
      <div class="row">${d.win&&stageInfo(bt.n+1)?`<button class="btn" id="bNext">다음 스테이지</button>`:""}<button class="btn ${d.win?"ghost":""}" id="bAgain">${d.win?"한 번 더":"다시 도전"}</button><button class="btn ghost" id="bOut">나가기</button></div></div>`;
    const nx=$("#bNext"); if(nx) nx.onclick=()=>startBattle(bt.n+1);
    $("#bAgain").onclick=()=>startBattle(bt.n);
    $("#bOut").onclick=()=>{ bt=null; renderBattle(); };
    return;
  }
  const canSk=me.charge>=me.sk.cd, others=bt.me.map((u,i)=>({u,i})).filter(x=>x.i!==bt.mi&&alive(x.u));
  el.innerHTML=`<div class="bhead"><b>${bt.pvp?esc(bt.pvp.name)+" 팀과 대결":(bt.info.boss?"보스 ":"")+"스테이지 "+bt.n}</b><span class="note">${bt.turn}턴</span></div>
    <div class="bside foe">${bench(bt.foe,bt.fi,"foe")}${bcard(foe,"foe",true)}</div>
    <p class="blog" id="blog" aria-live="polite">${esc(bt.log)}</p>
    <div class="bside me">${bcard(me,"me",true)}${bench(bt.me,bt.mi,"me")}</div>
    ${bt.switching?`<div class="bswitch">${others.map(x=>`<button class="btn ghost small" data-sw="${x.i}">${esc(koOf(x.u.sid))} (${x.u.hp})</button>`).join("")}<button class="btn ghost small" id="swCancel">취소</button></div>`
    :`<div class="bact">
      <button class="btn" id="bAtk" ${bt.busy||bt.auto?"disabled":""}>공격</button>
      <button class="btn skillbtn" id="bSk" ${bt.busy||bt.auto||!canSk?"disabled":""}>${esc(me.sk.name)}${canSk?"":` ${me.charge}/${me.sk.cd}`}</button>
      <button class="btn ghost" id="bSw" ${bt.busy||bt.auto||!others.length?"disabled":""}>교체</button>
      <button class="btn ghost" id="bAuto">${bt.auto?"자동 끄기":"자동 전투"}</button></div>`}
    <button class="btn ghost small" id="bQuit" style="align-self:center">${bt.quitArmed?"한 번 더 누르면 전투를 그만둬요":"전투 그만두기"}</button>`;
  const q=id=>document.getElementById(id);
  if(q("bAtk")) q("bAtk").onclick=()=>playerTurn("attack");
  if(q("bSk")) q("bSk").onclick=()=>playerTurn("special");
  if(q("bSw")) q("bSw").onclick=()=>{ bt.switching=true; renderBattle(); };
  if(q("swCancel")) q("swCancel").onclick=()=>{ bt.switching=false; renderBattle(); };
  el.querySelectorAll("[data-sw]").forEach(b=>b.onclick=()=>playerTurn("switch",+b.dataset.sw));
  if(q("bQuit")) q("bQuit").onclick=()=>{ if(!bt.quitArmed){ bt.quitArmed=true; renderBattle(); setTimeout(()=>{ if(bt&&bt.quitArmed){ bt.quitArmed=false; renderBattle(); } },3000); return; }
    bt.auto=false; bv.autoOn=false; if(bt.busy){ bt.quitPending=true; const b=q("bQuit"); if(b) b.textContent="그만두는 중…"; } else { bt=null; renderBattle(); toast("전투를 그만뒀어요"); } };
  if(q("bAuto")) q("bAuto").onclick=()=>{ bt.auto=!bt.auto; bv.autoOn=bt.auto; renderBattle(); if(bt.auto) autoStep(); };
}
function bsubBar(){ return `<div class="chips" role="group" aria-label="전투 화면">${[["adv","모험"],["pvp","친구 대결"],["cards","카드와 팀"],["set","전투 설정"]].filter(x=>x[0]!=="set"||FB.isOwner).map(([k,l])=>`<button class="chip" data-bsub="${k}" aria-pressed="${bv.sub===k}">${l}</button>`).join("")}</div>`; }
function teamStrip(){
  const own=battleOwned(); const t=team.filter(id=>own.includes(id));
  return `<div class="tstrip">${[0,1,2].map(i=>{const id=t[i]; return id?`<div class="tslot">${cardPhoto(id)?`<img src="${urlOf(cardPhoto(id))}" alt="">`:""}<span>${esc(koOf(id))} Lv.${lvOf(id)}</span></div>`:`<div class="tslot empty"><span>빈 자리</span></div>`;}).join("")}</div>`;
}
function advHTML(){
  const top=Math.max(bprog.cleared+1,1), list=[];
  const from=Math.max(1,top-6), to=top+3;
  for(let n=to;n>=from;n--){ const st=stageInfo(n); if(!st) break; list.push(st); }
  const sp=equippedPets().map(petById);
  return `<div class="end" style="gap:10px">
      <h2>드래곤 모험</h2>
      <p class="note" style="margin:0">스테이지를 깨면 코인을 받아요. 처음 깬 스테이지는 2배예요. 10번째마다 보스가 나와요. 지금까지 ${bprog.cleared}스테이지까지 깼어요.</p>
      ${teamStrip()}
      <p class="note" style="margin:0">장착한 펫: ${sp.length?`${sp.map(p=>esc(p.name)).join(", ")} (팀 체력·공격 +${Math.round((petBonus()-1)*100)}%)`:"없음"}</p>
      ${bfxList().length?`<ul class="fxlist">${bfxList().map(p=>`<li style="border-left-color:var(--blood)"><b>${esc(p.name)}</b> ${effectsOf(p).length?effectsOf(p).map(e=>esc(e.sum||e.text)).join("<br>"):esc(describeBfx(p.bfx))}</li>`).join("")}</ul>`:`<p class="note" style="margin:0">장착한 펫이 없거나 전투 효과가 없어요. 카드와 팀, 또는 뽑기 → 아기 펫에서 3마리까지 장착해요.</p>`}
      <button class="btn ghost small" id="goTeam">팀과 응원 펫 바꾸기</button>
    </div>
    <div class="stages">${list.map(st=>{const lock=st.n>bprog.cleared+1, done=st.n<=bprog.cleared;
      return `<button class="stage ${st.boss?"boss":""} ${done?"done":""}" data-st="${st.n}" ${lock?"disabled":""}>
        <span class="sn">${st.boss?"보스 ":""}${st.n}</span>
        <span class="sf">${st.units.map(u=>`${cardPhoto(u.sid)?`<img src="${urlOf(cardPhoto(u.sid))}" alt="">`:""}`).join("")}</span>
        <span class="sl">${lock?"잠김":done?"클리어":"도전!"} · 적 Lv.${st.lv}</span></button>`;}).join("")}</div>`;
}
function cardsHTML(){
  const own=battleOwned();
  if(!own.length) return `<div class="empty"><h2>전투 카드가 없어요</h2><p class="note">뽑기에서 드래곤을 모으면 전투 카드가 돼요. 전투 설정에서 전투에 나갈 수 있는 드래곤을 고를 수 있어요.</p></div>`;
  const pets=petDefs.filter(p=>petN(p.id)>0);
  return `<div class="end" style="gap:8px">
      <h2>카드와 팀</h2>
      <p class="note" style="margin:0">뽑기에서 같은 드래곤이 또 나오면 그 카드의 중복 카드가 쌓여 레벨이 올라요. Lv.2까지 1장, Lv.3까지 2장, Lv.4까지 3장처럼 레벨이 오를수록 더 많이 필요해요. 코인으로도 레벨을 올릴 수 있어요. 레벨이 1 오를 때마다 체력과 공격이 기본값의 10%씩 올라요. 팀에는 3마리까지 넣을 수 있어요.</p>
      <div class="gemrow" style="gap:6px">${COIN_SVG}<span class="luck" style="color:var(--coin);font-size:1.3rem">${fmt(coins)}</span><span class="note">코인</span></div>
      ${teamStrip()}
      ${pets.length?`<div style="width:100%;display:flex;flex-direction:column;gap:6px">${slotBuyHTML()}<span class="note">장착한 펫 ${equippedPets().length} / ${petSlots()} (장착한 펫의 전투 효과가 켜지고, 1마리마다 팀 체력·공격 +10%)</span>
        <div class="chips">${pets.map(p=>`<button class="chip" data-sup="${p.id}" aria-pressed="${equippedPets().includes(p.id)}">${esc(p.name)}</button>`).join("")}</div></div>`:""}
    </div>
    <div class="cgrid">${own.sort((a,b)=>lvOf(b)-lvOf(a)||koOf(a).localeCompare(koOf(b),"ko")).map(id=>{const s=playerStats(id), c=cfgOf(id), t=TIER_BY[tierOf(id)]||TIER_BY.common, inT=team.includes(id), open=bv.open===id, cost=lvCost(s.lv);
      return `<div class="ccard ${t.cls} ${inT?"inteam":""} ${open?"open":""}">
        <button class="cface" data-cc="${id}">${cardPhoto(id)?`<img src="${urlOf(cardPhoto(id))}" alt="">`:""}<span class="clv">Lv.${s.lv}</span>${inT?`<span class="cteam">팀</span>`:""}</button>
        <div class="cbody"><b>${esc(koOf(id))}</b><span class="cst">체력 ${s.hp} · 공격 ${s.atk}</span><span class="csk">${esc(c.sk.name)}</span>
          ${(()=>{const dl=dupLevel(id); return `<div class="dupbar" title="다음 레벨까지 중복 카드"><i style="width:${dl.have/dl.need*100}%"></i></div><span class="csk">중복 ${dl.have} / ${dl.need}장${coinLv(id)?` · 코인 +${coinLv(id)}레벨`:""}</span>`;})()}</div>
        ${open?`<div class="cmore"><p class="note" style="margin:0">${esc(skText(c.sk))} · ${c.sk.cd}번 공격하면 사용</p>
          <button class="btn small" data-lvup="${id}" ${coins>=cost&&s.lv<99?"":"disabled"}>레벨업 ${COIN_SVG}${fmt(cost)}</button>
          <button class="btn ghost small" data-team="${id}">${inT?"팀에서 빼기":"팀에 넣기"}</button></div>`:""}
      </div>`;}).join("")}</div>`;
}
function setHTML(){
  const ids=SPECIES.map(s=>s.id).filter(id=>photos.some(p=>p.speciesId===id)).sort((a,b)=>koOf(a).localeCompare(koOf(b),"ko"));
  return `<div class="end" style="gap:8px">
      <h2>전투 설정</h2>
      <p class="note" style="margin:0">드래곤마다 전투에 나갈지, 기본 체력과 공격, 필살기를 정해요. 처음 값은 체력 300, 공격 30(체력이 공격의 약 10배)에서 조금씩 다르게 정해 두었고, 등급이 높을수록 조금 더 세요. 여기서 바꾼 값이 레벨 1 기준이에요.</p>
      <label class="fxf" style="width:100%"><span>전투 난이도 (어려울수록 코인 보상도 커요)</span><select id="diffSel">${DIFFS.map(([k,l,m])=>`<option value="${k}" ${k===(bprog.diff||"normal")?"selected":""}>${l} (적 ×${m})</option>`).join("")}</select></label>
    </div>
    <div class="slist">${ids.map(id=>{const c=cfgOf(id), open=bv.setOpen===id, ps=photos.filter(p=>p.speciesId===id);
      return `<div class="srow ${c.on?"":"off"}">
        <button class="shead" data-so="${id}">${cardPhoto(id)?`<img src="${urlOf(cardPhoto(id))}" alt="">`:""}<span class="nm">${esc(koOf(id))}</span><span class="note">${c.on?`체력 ${c.hp} · 공격 ${c.atk}`:"전투 제외"}</span></button>
        ${open?`<div class="sbody">
          <label class="fxf" style="flex:1 1 100%;flex-direction:row;align-items:center;gap:8px"><input type="checkbox" data-son="${id}" ${c.on?"checked":""} style="width:22px;height:22px;min-height:0"><span style="font-size:1rem;color:var(--ink)">전투에 나갈 수 있어요</span></label>
          <label class="fxf"><span>체력</span><input type="number" inputmode="numeric" min="1" max="99999" value="${c.hp}" data-sk="hp" data-sid="${id}"></label>
          <label class="fxf"><span>공격</span><input type="number" inputmode="numeric" min="1" max="9999" value="${c.atk}" data-sk="atk" data-sid="${id}"></label>
          <label class="fxf" style="flex:1 1 100%"><span>필살기 이름</span><input type="text" maxlength="16" value="${esc(c.sk.name)}" data-sk="name" data-sid="${id}"></label>
          <label class="fxf"><span>필살기 종류</span><select data-sk="type" data-sid="${id}">${SK_TYPES.map(([k,l])=>`<option value="${k}" ${k===c.sk.type?"selected":""}>${l}</option>`).join("")}</select></label>
          <label class="fxf"><span>${c.sk.type==="heal"?"회복 %":"몇 배"}</span><input type="number" inputmode="decimal" step="0.1" min="0.1" max="999" value="${c.sk.pow}" data-sk="pow" data-sid="${id}"></label>
          <label class="fxf"><span>공격 몇 번 후 사용</span><input type="number" inputmode="numeric" min="1" max="10" value="${c.sk.cd}" data-sk="cd" data-sid="${id}"></label>
          <p class="note" style="margin:0;flex:1 1 100%">${esc(skText(c.sk))}</p>
          ${ps.length>1?`<div style="flex:1 1 100%"><span class="note">전투 카드 사진</span><div class="thumbs">${ps.map(p=>`<button class="thumb ${cardPhoto(id)&&cardPhoto(id).id===p.id?"pickd":""}" data-sph="${p.id}" data-sid="${id}" aria-label="이 사진으로"><img src="${urlOf(p)}" alt=""></button>`).join("")}</div></div>`:""}
          <button class="btn ghost small" data-sreset="${id}">처음 값으로</button>
        </div>`:""}</div>`;}).join("")}</div>`;
}
function softRenderBattle(){ // 저장소에서 온 변화: 입력 중이면 화면을 다시 그리지 않아요
  if(view!=="battle"||bt) return; const el=$("#battleView"), ae=document.activeElement;
  if(ae&&el&&el.contains(ae)&&((ae.tagName==="INPUT"&&ae.type!=="checkbox")||ae.tagName==="SELECT"||ae.tagName==="TEXTAREA")) return;
  renderBattle(); }
function renderBattle(){
  const el=$("#battleView"); if(!el) return;
  if(bt) return renderFight(el);
  el.innerHTML=bsubBar()+(bv.sub==="cards"?cardsHTML():bv.sub==="set"?setHTML():bv.sub==="pvp"?pvpHTML():advHTML()); if(bv.sub==="pvp") pvpBind(el);
  el.querySelectorAll("[data-bsub]").forEach(b=>b.onclick=()=>{ bv.sub=b.dataset.bsub; renderBattle(); });
  const gt=$("#goTeam"); if(gt) gt.onclick=()=>{ bv.sub="cards"; renderBattle(); };
  el.querySelectorAll("[data-st]").forEach(b=>b.onclick=()=>startBattle(+b.dataset.st));
  el.querySelectorAll("[data-cc]").forEach(b=>b.onclick=()=>{ bv.open=bv.open===b.dataset.cc?null:b.dataset.cc; renderBattle(); });
  el.querySelectorAll("[data-lvup]").forEach(b=>b.onclick=()=>{ const id=b.dataset.lvup, lv=lvOf(id), cost=lvCost(lv); if(coins<cost){ toast("코인이 모자라요"); return; }
    bump("coins",-cost); cardLv=Object.assign({},cardLv,{[id]:coinLv(id)+2}); saveCards(); toast(`${koOf(id)} Lv.${lv+1}!`); renderBattle(); });
  el.querySelectorAll("[data-team]").forEach(b=>b.onclick=()=>{ const id=b.dataset.team; const own=battleOwned(); let t=team.filter(x=>own.includes(x));
    if(t.includes(id)) t=t.filter(x=>x!==id); else { if(t.length>=3){ toast("팀은 3마리까지예요. 먼저 한 마리를 빼주세요"); return; } t.push(id); }
    team=t; saveCards(); renderBattle(); });
  el.querySelectorAll("[data-sup]").forEach(b=>b.onclick=()=>{ const id=b.dataset.sup; let cur2=equippedPets();
    if(cur2.includes(id)) cur2=cur2.filter(x=>x!==id); else { if(cur2.length>=petSlots()){ toast(`펫은 ${petSlots()}마리까지 장착할 수 있어요. 먼저 하나를 빼거나 장착 칸을 늘려주세요`); return; } cur2.push(id); }
    supPets=cur2; saveCards(); renderBattle(); });
  el.querySelectorAll("[data-so]").forEach(b=>b.onclick=()=>{ bv.setOpen=bv.setOpen===b.dataset.so?null:b.dataset.so; renderBattle(); });
  el.querySelectorAll("[data-son]").forEach(i=>i.onchange=()=>{ setCfg(i.dataset.son,{on:i.checked}); renderBattle(); });
  const applySk=(i)=>{ const id=i.dataset.sid, k=i.dataset.sk, c=cfgOf(id);
    if(k==="hp"||k==="atk") setCfg(id,{[k]:Math.max(1,Math.round(+i.value||1))});
    else { const sk=Object.assign({},(bset[id]||{}).sk||{});
      if(k==="name") sk.name=i.value.trim()||c.sk.name;
      else if(k==="type"){ sk.type=i.value; sk.pow=SK_POW0[i.value]; if(!sk.name||Object.values(SK_NAME0).includes(c.sk.name)) sk.name=SK_NAME0[i.value]; }
      else if(k==="pow") sk.pow=Math.max(0.1,Math.round((+i.value||1)*10)/10);
      else if(k==="cd") sk.cd=Math.max(1,Math.min(10,Math.round(+i.value||3)));
      setCfg(id,{sk}); } };
  el.querySelectorAll("[data-sk]").forEach(i=>{
    let t=null; if(i.tagName==="INPUT") i.oninput=()=>{ clearTimeout(t); t=setTimeout(()=>{ if(i.value!=="") applySk(i); },700); };
    i.onchange=()=>{ clearTimeout(t); applySk(i); i.blur(); toast("저장했어요"); renderBattle(); };
    if(i.tagName==="INPUT") i.onkeydown=e=>{ if(e.key==="Enter"){ e.preventDefault(); i.blur(); } };
  });
  el.querySelectorAll("[data-sph]").forEach(b=>b.onclick=()=>{ setCfg(b.dataset.sid,{photo:b.dataset.sph}); renderBattle(); });
  const dsel=$("#diffSel"); if(dsel) dsel.onchange=()=>{ bprog=Object.assign({},bprog,{diff:dsel.value}); saveProg(); dsel.blur(); toast("난이도를 바꿨어요"); renderBattle(); };
  el.querySelectorAll("[data-sreset]").forEach(b=>b.onclick=()=>{ delete bset[b.dataset.sreset]; bset=Object.assign({},bset); saveBset(); toast("처음 값으로 되돌렸어요"); renderBattle(); });
}

// ---------- 클릭커 ----------
// 드래곤이나 내 사진을 눌러 물고기를 잡아요. 빠르게 30번 누르면 피버(3배). 보석은 주지 않아요.
// 클릭커 전용 자원: 물고기. 강화는 물고기로만 해요.
const CK_UP=[
 {k:"tap",name:"튼튼한 그물",desc:"한 번 누를 때 잡는 양이 30%씩 늘어요",base:20,grow:1.5,max:500},
 {k:"auto",name:"바이킹 어부",desc:"레벨마다 1초에 탭 0.2번만큼 저절로 잡아요",base:50,grow:1.5,max:500},
 {k:"crit",name:"황금 물고기",desc:"레벨마다 2% 확률로 10배 (최대 50%)",base:200,grow:1.9,max:25},
 {k:"feast",name:"버크 잔치",desc:"피버가 레벨마다 1초 더 길어져요 (기본 8초)",base:500,grow:2.2,max:12}
];
const FISH_SVG='<svg class="fish" viewBox="0 0 32 20" aria-hidden="true"><path d="M2 10c5-8 15-9 22-3l6-5v16l-6-5c-7 6-17 5-22-3z" fill="var(--fishc)"/><circle cx="9" cy="8.5" r="1.6" fill="#1b2a33"/><path d="M15 4c2 4 2 8 0 12" stroke="rgba(255,255,255,.5)" stroke-width="1.3" fill="none"/></svg>';
let ck={tap:0,auto:0,crit:0,feast:0,fish:0,taps:0,earned:0,pick:""};
try{ const v=JSON.parse(localStorage.getItem("httyd-clicker")||"null"); if(v) ck=Object.assign(ck,v); }catch(e){}
const saveCk=makeSaver("settings/clicker",()=>ck);
// 관리자가 미니게임 사진을 바꾸면 모두의 기본 사진도 같이 바뀌어요
let mgPubT=null;
function mgPublishSoon(){ if(!FB.isOwner||!cloud) return; clearTimeout(mgPubT); mgPubT=setTimeout(async()=>{
  const want={suika:Array.from({length:SK_N},(_,i)=>(sk.imgs&&sk.imgs[i])||""),click:ckMine()};
  if(JSON.stringify(want)===JSON.stringify({suika:mgDef.suika||[],click:mgDef.click||[]})) return;
  try{ await FB.publishBlobs([...want.suika,...want.click].filter(Boolean)); await cloud.db.doc("settings/minidefaults").set(want); }catch(e){} },1500); }
function saveCkAll(){ mgPublishSoon(); try{ localStorage.setItem("httyd-clicker",JSON.stringify(ck)); }catch(e){} saveCk(); }
function initClickCloud(d){
  d.doc("settings/clicker").onSnapshot(s=>{ if(s.exists&&!dirtyDocs["settings/clicker"]&&!s.metadata.hasPendingWrites){
    ck=Object.assign({tap:0,auto:0,crit:0,feast:0,fish:0,taps:0,earned:0,pick:""},JSON.parse(JSON.stringify(s.data()||{})));
    if(ck.fishReset!==FISH_RESET){ ck.fish=0; ckFishPend=0; ck.fishReset=FISH_RESET; saveCkAll(); } /* 아빠 요청: 물고기 한 번 0으로 */
    if(view==="click"){ if(mgMode==="click") renderClick(); else if(mgMode==="berk") bkRefresh(); } } },()=>{});
}
const FISH_RESET="2026-11-15";
const ckCost=(u,lv)=>Math.round(u.base*Math.pow(u.grow,lv));
const tapValue=()=>Math.max(1,Math.round(Math.pow(1.3,ck.tap)));
const autoPerSec=()=>ck.auto*0.2*tapValue();
const critChance=()=>Math.min(50,ck.crit*2);
const fever={until:0,hits:[]};
const feverOn=()=>Date.now()<fever.until;
let ckPend=0, ckFishPend=0, ckFlushT=null, ckSession=0;
function ckGain(n,fish){ // 물고기를 모았다가 한꺼번에 넣어요 (저장을 너무 자주 하지 않게). 클릭커는 보석을 주지 않아요.
  ckFishPend+=fish||0; ckSession+=fish||0;
  if(!ckFlushT) ckFlushT=setTimeout(()=>{ ckFlushT=null;
    const f=Math.floor(ckFishPend); if(f>0){ ckFishPend-=f; ck.fish=(ck.fish||0)+f; saveCkAll(); }
    ckRefreshNums(); },400);
}
function ckRefreshNums(){ if(mgMode==="suika") skRefreshFish(); const fs=$("#ckFish"); if(fs) fs.textContent=fmt(ck.fish||0);
  const se=$("#ckSess"); if(se) se.textContent=fmt(Math.floor(ckSession));
  document.querySelectorAll("[data-ckbuy]").forEach(b=>{ const u=CK_UP.find(x=>x.k===b.dataset.ckbuy), lv=ck[u.k]||0; b.disabled=lv>=u.max||(ck.fish||0)<ckCost(u,lv); });
  document.querySelectorAll("[data-ckmax]").forEach(b=>{ const u=CK_UP.find(x=>x.k===b.dataset.ckmax), lv=ck[u.k]||0; b.disabled=lv>=u.max||(ck.fish||0)<ckCost(u,lv); }); }
const feverMs=()=>8000+1000*(ck.feast||0);
function ckOwned(){ return SPECIES.map(s=>s.id).filter(id=>hasPull(id)&&cardPhoto(id)); }
function ckPickId(){ const own=ckOwned(); if(own.includes(ck.pick)) return ck.pick;
  const order=["legend","epic","rare","common"]; return own.slice().sort((a,b)=>order.indexOf(tierOf(a))-order.indexOf(tierOf(b)))[0]||""; }
function ckMine(){ return (ck.my||[]).filter(Boolean); }
let mgDef={suika:[],click:[]}; // 관리자가 정한 미니게임 기본 사진 (공용)
function ckAll(){ return [...new Set([...ckMine(),...(mgDef.click||[]).filter(Boolean)])]; }
function skImgId(i){ return (sk.imgs&&sk.imgs[i])||((mgDef.suika||[])[i])||""; }
function ckTarget(){ // 지금 누르는 대상: 내가 올린 사진, 기본 사진 또는 뽑은 드래곤
  const my=ckAll();
  if(ck.pick&&ck.pick.startsWith("my:")&&my.includes(ck.pick.slice(3))) return {key:ck.pick,url:blobUrl(ck.pick.slice(3)),name:"",cls:"legend",mine:true};
  const sid=ckPickId();
  if(sid){ const ph=cardPhoto(sid); return {key:sid,url:ph?urlOf(ph):"",name:koOf(sid),cls:(TIER_BY[tierOf(sid)]||TIER_BY.common).cls}; }
  if(my.length) return {key:"my:"+my[0],url:blobUrl(my[0]),name:"",cls:"legend",mine:true};
  return null;
}
async function ckUpload(files){
  if(!cloud){ toast("사진을 올리려면 claude.ai에 로그인한 상태여야 해요"); return; }
  let last="";
  for(const f of files){ try{ const blob=await shrink(f); const r=await cloud.assets.upload(blob,{type:blob.type||"image/jpeg",mine:true}); ck.my=[...ckMine(),r.id]; last=r.id; }catch(e){ toast("사진을 올리지 못했어요"); } }
  if(last){ ck.pick="my:"+last; saveCkAll(); renderClick(); toast("내 사진으로 바꿨어요"); }
}
async function ckRemoveMine(id){
  ck.my=ckMine().filter(x=>x!==id); if(ck.pick==="my:"+id) ck.pick=""; saveCkAll(); renderClick();
  try{ await cloud.assets.delete(id); }catch(e){}
}
function ckTap(e){
  const now=Date.now(); fever.hits=fever.hits.filter(t=>now-t<5000); fever.hits.push(now);
  if(!feverOn()&&fever.hits.length>=30){ fever.until=now+feverMs(); fever.hits=[]; const sc=$("#ckScene"); if(sc) sc.classList.add("fever"); toast(`피버! ${feverMs()/1000}초 동안 3배`); setTimeout(()=>{ const s2=$("#ckScene"); if(s2&&!feverOn()) s2.classList.remove("fever"); },feverMs()+100); }
  const crit=Math.random()*100<critChance();
  const base=tapValue()*(crit?10:1)*(feverOn()?3:1), g=0;
  ckGain(g,base); ck.taps=(ck.taps||0)+1;
  const st=$("#ckStage"); if(!st) return;
  const img=st.querySelector(".ckdrag"); if(img){ img.classList.remove("squish"); void img.offsetWidth; img.classList.add("squish"); }
  if(st.querySelectorAll(".ckpop").length<14){
    const r=st.getBoundingClientRect(), x=(e&&e.clientX!=null?e.clientX-r.left:r.width/2), y=(e&&e.clientY!=null?e.clientY-r.top:r.height/2);
    const p=document.createElement("span"); p.className="ckpop"+(crit?" crit":"")+(feverOn()?" fev":""); p.style.left=x+"px"; p.style.top=y+"px";
    p.innerHTML=(crit?"황금! ":"")+FISH_SVG+"+"+fmt(Math.floor(base)||1); st.appendChild(p); setTimeout(()=>p.remove(),800);
  }
  const fb=$("#ckFever"); if(fb) fb.style.width=(feverOn()?100:fever.hits.length/30*100)+"%";
  const tc=$("#ckTaps"); if(tc) tc.textContent=fmt(ck.taps);
}
// 자동 탭: 앱이 켜져 있으면 1초마다
setInterval(()=>{ if(document.hidden||!ck.auto) return; const base=autoPerSec()*(feverOn()?3:1), g=0; ckGain(g,base);
  if(view==="click"){ const st=$("#ckStage"); if(st&&st.querySelectorAll(".ckpop").length<14){ const p=document.createElement("span"); p.className="ckpop auto"; p.style.left=(20+Math.random()*60)+"%"; p.style.top="78%"; p.innerHTML=FISH_SVG+"+"+fmt(Math.floor(base)||1); st.appendChild(p); setTimeout(()=>p.remove(),800); } } },1000);
function buyUp(k,max){
  const u=CK_UP.find(x=>x.k===k); let n=0, spent=0;
  while((ck[k]||0)<u.max&&n<(max?1000:1)){ const c=ckCost(u,ck[k]||0); if((ck.fish||0)<c+spent) break; spent+=c; ck[k]=(ck[k]||0)+1; n++; }
  if(!n){ toast(ck[k]>=u.max?"이미 최대 레벨이에요":"물고기가 모자라요"); return; }
  ck.fish=(ck.fish||0)-spent; saveCkAll(); toast(`${u.name} +${n} (Lv.${ck[k]})`); renderClick();
}
const BERK_BG=`<svg class="ckbg" viewBox="0 0 400 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <defs><linearGradient id="cksky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="sk1"/><stop offset=".62" class="sk2"/></linearGradient>
  <linearGradient id="cksea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2E6F8E"/><stop offset="1" stop-color="#173F55"/></linearGradient>
  <linearGradient id="ckwood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8A5A35"/><stop offset="1" stop-color="#5B3A22"/></linearGradient></defs>
  <rect width="400" height="420" fill="url(#cksky)"/>
  <circle class="cksun" cx="318" cy="70" r="30"/>
  <g class="ckcloud c1"><ellipse cx="70" cy="70" rx="38" ry="12"/><ellipse cx="92" cy="62" rx="24" ry="12"/></g>
  <g class="ckcloud c2"><ellipse cx="220" cy="40" rx="30" ry="9"/><ellipse cx="238" cy="34" rx="18" ry="9"/></g>
  <path d="M0 250 L40 196 L78 222 L120 168 L168 214 L206 186 L252 230 L300 176 L344 214 L400 190 L400 260 L0 260Z" fill="#41606B"/>
  <path d="M0 262 L56 226 L104 248 L150 218 L198 246 L250 222 L300 250 L352 230 L400 246 L400 272 L0 272Z" fill="#2F4A54"/>
  <path d="M120 168 L132 182 L124 184 L114 178Z M300 176 L311 188 L302 190 L292 184Z" fill="#E8EEF0" opacity=".85"/>
  <g fill="#3B2A1E"><rect x="60" y="244" width="22" height="16"/><path d="M56 246 L71 232 L86 246Z" fill="#6E3B24"/><rect x="318" y="246" width="18" height="14"/><path d="M314 248 L327 236 L340 248Z" fill="#6E3B24"/></g>
  <rect y="268" width="400" height="152" fill="url(#cksea)"/>
  <g class="ckwave"><path d="M0 282 q25 -8 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0" stroke="rgba(255,255,255,.35)" stroke-width="3" fill="none"/>
  <path d="M-25 304 q25 -8 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0" stroke="rgba(255,255,255,.22)" stroke-width="3" fill="none"/></g>
  <path d="M30 372 L370 372 L384 412 L16 412Z" fill="url(#ckwood)"/>
  <g stroke="#3E2716" stroke-width="2" opacity=".55"><line x1="70" y1="374" x2="62" y2="410"/><line x1="130" y1="374" x2="126" y2="410"/><line x1="200" y1="374" x2="200" y2="410"/><line x1="270" y1="374" x2="274" y2="410"/><line x1="330" y1="374" x2="338" y2="410"/></g>
  <g><rect x="38" y="340" width="34" height="36" rx="6" fill="#7A4B2A"/><rect x="38" y="348" width="34" height="4" fill="#3E2716"/><rect x="38" y="364" width="34" height="4" fill="#3E2716"/>
  <path d="M44 340 q6 -12 12 0 q6 -12 12 0" fill="#9FC7D6"/></g>
  <g><rect x="330" y="344" width="30" height="32" rx="6" fill="#7A4B2A"/><rect x="330" y="352" width="30" height="4" fill="#3E2716"/><rect x="330" y="366" width="30" height="4" fill="#3E2716"/></g>
  <g class="ckembers"><circle cx="80" cy="200" r="3"/><circle cx="160" cy="150" r="2.5"/><circle cx="250" cy="120" r="3"/><circle cx="330" cy="210" r="2"/><circle cx="200" cy="230" r="2.5"/></g>
</svg>`;
function renderClick(force){
  if(mgMode==="suika"){ if(force||!$("#skCanvas")) renderSuika(); return; }
  if(mgMode==="fly"){ if(force||!$("#flyCanvas")) renderFly(); return; }
  if(mgMode==="hide"){ if(force||!$("#hdGrid")) renderHide(); return; }
  if(mgMode==="mem"){ if(force||!$(".memlv")) renderMem(); return; }
  if(mgMode==="sling"){ if(force||!$("#slingCanvas")) renderSling(); return; }
  if(mgMode==="run"){ if(force||!$("#runCanvas")) renderRun(); return; }
  if(mgMode==="stack"){ if(force||!$("#stackCanvas")) renderStack(); return; }
  if(mgMode==="simon"){ if(force||!$(".smgrid")) renderSimon(); return; }
  if(mgMode==="egg"){ if(force||!$("#eggCanvas")) renderEgg(); return; }
  if(mgMode==="dodge"){ if(force||!$("#dodgeCanvas")) renderDodge(); return; }
  if(mgMode==="tama"){ if(force||!$(".tama")) renderTama(); return; }
  if(mgMode==="rhythm"){ if(force||!$("#rhythmCanvas")) renderRhythm(); return; }
  if(mgMode==="magic"){ if(force||!$("#magicCanvas")) renderMagic(); return; }
  if(mgMode==="tetris"){ if(force||!$("#tetrisCanvas")) renderTetris(); return; }
  if(mgMode==="berk"){ if(force||!$("#bkMap")) renderBerk(); else bkRefresh(); return; }
  const el=$("#clickView"); if(!el) return;
  const own=ckOwned(), my=ckMine(), tg=ckTarget();
  el.innerHTML=mgTabsHtml()+`${tg?`<div class="ckscene ${feverOn()?"fever":""}" id="ckScene">${BERK_BG}
      <div class="cktop"><div class="ckbadge fishb">${FISH_SVG}<b id="ckFish">${fmt(ck.fish||0)}</b></div>
        <div class="ckbadge"><span style="font-size:.8rem;font-family:var(--body)">총 탭</span><b id="ckTaps">${fmt(ck.taps||0)}</b></div></div>
      <h2 class="cktitle">버크 부둣가 낚시</h2>
      <button class="ckstage ${tg.cls}" id="ckStage" aria-label="${tg.name?esc(tg.name)+" ":""}누르기">
        <span class="ckring"></span>${tg.url?`<img class="ckdrag" src="${tg.url}" alt="" draggable="false">`:""}${tg.name?`<span class="ckname">${esc(tg.name)}</span>`:""}</button>
      <div class="ckfev"><i id="ckFever" style="width:${feverOn()?100:Math.min(100,fever.hits.length/30*100)}%"></i><span>피버 게이지 · 5초 안에 30번</span></div>
    </div>
      <div class="ckstats">
        <div><span>한 번에 물고기</span><b>${fmt(tapValue())}</b></div>
        <div><span>1초에 자동</span><b>${fmt(Math.floor(autoPerSec()))}</b></div>
        <div><span>황금 물고기</span><b>${critChance()}%</b></div>
        <div><span>강화 레벨 합</span><b>${CK_UP.reduce((n,u)=>n+(ck[u.k]||0),0)}</b></div>
        <div><span>이번 물고기</span><b id="ckSess">${fmt(Math.floor(ckSession))}</b></div>
        <div><span>피버 시간</span><b>${feverMs()/1000}초</b></div>
      </div>`
      :`<div class="empty"><h2>누를 사진이 필요해요</h2><p class="note">아래에서 사진을 올리거나, 뽑기에서 드래곤을 뽑으면 낚시를 시작할 수 있어요.</p></div>`}
    <p class="sec-title">물고기로 강화 <span class="note" style="font-family:var(--body)">물고기는 클릭커에서만 써요.</span></p>
    <div class="ckups">${CK_UP.map(u=>{const lv=ck[u.k]||0, c=ckCost(u,lv), maxed=lv>=u.max, poor=(ck.fish||0)<c;
      return `<div class="ckup"><div class="ckupt"><b>${u.name}</b><span class="clv2">Lv.${lv}</span></div><p class="note" style="margin:0">${u.desc}</p>
        <div class="row"><button class="btn small fishbtn" data-ckbuy="${u.k}" ${maxed||poor?"disabled":""}>${maxed?"최대":`올리기 ${FISH_SVG}${fmt(c)}`}</button>
        <button class="btn ghost small" data-ckmax="${u.k}" ${maxed||poor?"disabled":""}>잡은 만큼 올리기</button></div></div>`;}).join("")}</div>
    <p class="sec-title">누를 사진 고르기</p>
    <div class="ckpick">
      ${my.map(id=>{const on=tg&&tg.key==="my:"+id; return `<div class="ckmine"><button class="ckp legend ${on?"on":""}" data-ckpick="my:${id}" aria-pressed="${on}"><img src="${blobUrl(id)}" alt=""><span>${FB.isOwner?"기본 사진":"내 사진"}</span></button><button class="ckdel" data-ckdel="${id}" aria-label="이 사진 지우기">×</button></div>`;}).join("")}
      ${(mgDef.click||[]).filter(id=>id&&!my.includes(id)).map(id=>{const on=tg&&tg.key==="my:"+id; return `<button class="ckp legend ${on?"on":""}" data-ckpick="my:${id}" aria-pressed="${on}"><img src="${blobUrl(id)}" alt=""><span>기본 사진</span></button>`;}).join("")}
      <label class="ckp ckadd"><b class="plus" aria-hidden="true">+</b><span>사진 올리기</span><input type="file" accept="image/*" multiple id="ckFile" aria-label="클릭커 사진 올리기"></label>
      ${own.map(id=>{const on=tg&&tg.key===id; return `<button class="ckp ${on?"on":""} ${(TIER_BY[tierOf(id)]||TIER_BY.common).cls}" data-ckpick="${id}" aria-pressed="${on}"><img src="${urlOf(cardPhoto(id))}" alt=""><span>${esc(koOf(id))}</span></button>`;}).join("")}
    </div>`;
  const st=$("#ckStage"); if(st){ st.addEventListener("pointerdown",e=>{ e.preventDefault(); ckTap(e); }); st.addEventListener("keydown",e=>{ if(e.key===" "||e.key==="Enter"){ e.preventDefault(); ckTap(null); } }); st.onclick=e=>e.preventDefault(); }
  el.querySelectorAll("[data-ckbuy]").forEach(b=>b.onclick=()=>buyUp(b.dataset.ckbuy,false));
  el.querySelectorAll("[data-ckmax]").forEach(b=>b.onclick=()=>buyUp(b.dataset.ckmax,true));
  el.querySelectorAll("[data-ckpick]").forEach(b=>b.onclick=()=>{ ck.pick=b.dataset.ckpick; saveCkAll(); renderClick(); });
  el.querySelectorAll("[data-ckdel]").forEach(b=>b.onclick=()=>{ if(b.dataset.armed){ ckRemoveMine(b.dataset.ckdel); } else { b.dataset.armed="1"; b.textContent="지우기?"; b.classList.add("armed"); setTimeout(()=>{ if(b.isConnected){ delete b.dataset.armed; b.textContent="×"; b.classList.remove("armed"); } },3000); } });
  bindMgTabs();
  const fi=$("#ckFile"); if(fi) fi.onchange=()=>{ const fs=[...fi.files]; fi.value=""; if(fs.length) ckUpload(fs); };
}

// ---------- 미니게임: 수박게임 ----------
// 같은 사진 두 개가 닿으면 합쳐져서 다음 단계 사진이 돼요. 사진은 단계마다 아빠가 골라요.
let mgMode="click"; try{ mgMode=localStorage.getItem("httyd-mgMode")||"click"; }catch(e){}
const SK_N=15, SK_W=420, SK_H=700, SK_LINE=100;
let mgFull=false;
const SK_R=[13,17,21,25,30,35,41,48,56,65,75,86,98,112,128];
const SK_COL=["#E85D75","#F08A4B","#F2C14E","#9BC53D","#3FA7D6","#5965D9","#A05CD6","#D65CA8","#2EC4B6","#E4572E","#FFD23F","#4CB944","#1F7A8C","#B23A48","#F7B32B"];
let sk={imgs:Array(SK_N).fill(""),best:0,games:0,items:{}};
// 수박게임 아이템: 클릭커 물고기로 사요
const SK_ITEMS=[
 {k:"merge",name:"강제 합체",desc:"드래곤 하나를 끌어서 같은 드래곤 위에 놓으면 멀리 있어도 합쳐져요",price:300},
 {k:"del",name:"삭제",desc:"누른 드래곤 하나를 없애요",price:150},
 {k:"shake",name:"흔들기",desc:"판을 흔들어 드래곤들을 띄워요",price:80}];
function skItemN(k){ return (sk.items&&sk.items[k])||0; }
const saveSk=makeSaver("settings/suika",()=>sk);
function saveSkAll(){ mgPublishSoon(); try{ localStorage.setItem("httyd-suika",JSON.stringify(sk)); }catch(e){} saveSk(); }
try{ const l=JSON.parse(localStorage.getItem("httyd-suika")||"null"); if(l) sk=Object.assign(sk,l); }catch(e){}
function skNorm(){ if(!sk.items||typeof sk.items!=="object") sk.items={}; sk.imgs=Array.from({length:SK_N},(_,i)=>(sk.imgs||[])[i]||""); }
skNorm();
function initSuikaCloud(d){
  d.doc("settings/minidefaults").onSnapshot(s=>{ mgDef=Object.assign({suika:[],click:[]},s.exists?JSON.parse(JSON.stringify(s.data()||{})):{});
    FB.preload([...(mgDef.suika||[]),...(mgDef.click||[])].filter(Boolean)); skLoadImgs();
    if(view==="click"){ if(mgMode==="suika") skRenderSlots(); else if(mgMode==="click") renderClick(); } },()=>{});
  if(FB.isOwner) setTimeout(mgPublishSoon,5000);
  d.doc("settings/suika").onSnapshot(s=>{ if(s.exists&&!dirtyDocs["settings/suika"]&&!s.metadata.hasPendingWrites){
    sk=Object.assign({imgs:[],best:0,games:0,items:{}},JSON.parse(JSON.stringify(s.data()||{}))); skNorm(); skLoadImgs();
    if(view==="click"&&mgMode==="suika") skRenderSlots(); } },()=>{});
}
const skImg={};
function skLoadImgs(){ Array.from({length:SK_N},(_,i)=>skImgId(i)).forEach(id=>{ const u=id&&blobUrl(id); if(u&&!skImg[id]){ const im=new Image(); im.src=u; skImg[id]=im; } }); }
skLoadImgs();

let G=null; // 게임 상태
function skNewGame(){
  if(!window.Matter) return null;
  const {Engine,Bodies,Composite,Events}=Matter;
  const engine=Engine.create(); engine.gravity.y=1.1;
  const wall={isStatic:true,friction:.3,restitution:.1};
  Composite.add(engine.world,[Bodies.rectangle(SK_W/2,SK_H+30-14,SK_W+200,60,wall),Bodies.rectangle(-30+4,SK_H/2,60,SK_H*3,wall),Bodies.rectangle(SK_W+30-4,SK_H/2,60,SK_H*3,wall)]);
  const g={engine,score:0,over:false,x:SK_W/2,cur:skRand(),next:skRand(),cool:0,overT:0,pops:[],merged:new Set()};
  Events.on(engine,"collisionStart",ev=>{ for(const p of ev.pairs){ const a=p.bodyA,b=p.bodyB;
    if(a.lv==null||a.lv!==b.lv||g.merged.has(a.id)||g.merged.has(b.id)) continue;
    g.merged.add(a.id); g.merged.add(b.id);
    const x=(a.position.x+b.position.x)/2, y=(a.position.y+b.position.y)/2, lv=a.lv;
    Composite.remove(engine.world,[a,b]);
    g.score+=(lv+1)*(lv+2)/2*2;
    if(lv+1<SK_N){ const nb=skBall(x,y,lv+1); Composite.add(engine.world,nb); }
    else g.score+=1000;
    g.pops.push({x,y,r:SK_R[Math.min(lv+1,SK_N-1)],t:0,c:SK_COL[Math.min(lv+1,SK_N-1)]});
  } });
  return g;
}
function skRand(){ return Math.floor(Math.random()*5); }
function skBall(x,y,lv){ const b=Matter.Bodies.circle(x,y,SK_R[lv],{restitution:.15,friction:.4,frictionStatic:.6,density:.001*(1+lv*.1)}); b.lv=lv; b.born=performance.now(); return b; }
function skDrop(){
  if(!G||G.over||performance.now()<G.cool) return;
  const r=SK_R[G.cur], x=Math.max(r+6,Math.min(SK_W-r-6,G.x));
  Matter.Composite.add(G.engine.world,skBall(x,SK_LINE-r-8,G.cur));
  G.cur=G.next; G.next=skRand(); G.cool=performance.now()+550; skHud();
}
function skDrawBall(ctx,x,y,r,lv,ang){
  const id=skImgId(lv), im=id&&skImg[id];
  ctx.save(); ctx.translate(x,y); ctx.rotate(ang||0);
  ctx.beginPath(); ctx.arc(0,0,r,0,Math.PI*2); ctx.closePath();
  if(im&&im.complete&&im.naturalWidth){ ctx.save(); ctx.clip(); const s=Math.max(2*r/im.naturalWidth,2*r/im.naturalHeight), w=im.naturalWidth*s, h=im.naturalHeight*s; ctx.drawImage(im,-w/2,-h/2,w,h); ctx.restore(); }
  else { ctx.fillStyle=SK_COL[lv]; ctx.fill(); ctx.fillStyle="rgba(255,255,255,.92)"; ctx.font=`bold ${Math.round(r*.8)}px sans-serif`; ctx.textAlign="center"; ctx.textBaseline="middle"; ctx.rotate(-(ang||0)); ctx.fillText(lv+1,0,1); }
  ctx.lineWidth=Math.max(2,r*.09); ctx.strokeStyle=SK_COL[lv]; ctx.beginPath(); ctx.arc(0,0,r,0,Math.PI*2); ctx.stroke();
  ctx.restore();
}
let skRaf=0, skLast=0;
function skLoop(t){
  skRaf=requestAnimationFrame(skLoop);
  const cv=$("#skCanvas"); if(!cv||!G||view!=="click"||mgMode!=="suika"||document.hidden){ skLast=t; return; }
  const dt=Math.min(33,t-(skLast||t)); skLast=t;
  if(!G.over&&!G.tool){ Matter.Engine.update(G.engine,dt||16.7); G.merged.clear();
    // 선 위에 오래 머물면 끝
    const bodies=Matter.Composite.allBodies(G.engine.world).filter(b=>b.lv!=null);
    const danger=bodies.some(b=>t-b.born>1200&&b.position.y-SK_R[b.lv]<SK_LINE&&Math.abs(b.velocity.y)<.6);
    G.overT=danger?G.overT+dt:0;
    if(G.overT>10000){ G.over=true; sk.games=(sk.games||0)+1; const nb=G.score>(sk.best||0); if(nb) sk.best=G.score; saveSkAll(); skHud(); skOver(nb); skRenderItems(); }
  }
  const ctx=cv.getContext("2d"), dpr=cv.width/SK_W;
  ctx.setTransform(dpr,0,0,dpr,0,0); ctx.clearRect(0,0,SK_W,SK_H);
  // 선
  ctx.setLineDash([8,8]); ctx.lineWidth=2; ctx.strokeStyle=G.overT>0?`rgba(224,72,40,${.5+.5*Math.sin(t/90)})`:"rgba(255,255,255,.55)";
  ctx.beginPath(); ctx.moveTo(0,SK_LINE); ctx.lineTo(SK_W,SK_LINE); ctx.stroke(); ctx.setLineDash([]);
  // 떨어뜨릴 공 + 안내선
  if(!G.over&&!G.tool){ const r=SK_R[G.cur], x=Math.max(r+2,Math.min(SK_W-r-2,G.x)), ready=t>=G.cool;
    ctx.strokeStyle="rgba(255,255,255,.35)"; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(x,SK_LINE); ctx.lineTo(x,SK_H); ctx.stroke();
    ctx.globalAlpha=ready?1:.45; skDrawBall(ctx,x,SK_LINE-r-8,r,G.cur,0); ctx.globalAlpha=1; }
  for(const b of Matter.Composite.allBodies(G.engine.world)) if(b.lv!=null) skDrawBall(ctx,b.position.x,b.position.y,SK_R[b.lv],b.lv,b.angle);
  if(G.tool){ ctx.fillStyle="rgba(20,32,40,.18)"; ctx.fillRect(0,0,SK_W,SK_H);
    if(G.drag){ const a=G.drag.body; ctx.strokeStyle="#FFD34D"; ctx.lineWidth=5; ctx.beginPath(); ctx.arc(a.position.x,a.position.y,SK_R[a.lv]+4,0,Math.PI*2); ctx.stroke();
      ctx.setLineDash([6,6]); ctx.beginPath(); ctx.moveTo(a.position.x,a.position.y); ctx.lineTo(G.drag.x,G.drag.y); ctx.stroke(); ctx.setLineDash([]); }
    ctx.fillStyle="#fff"; ctx.font="bold 20px sans-serif"; ctx.textAlign="center"; ctx.textBaseline="top";
    ctx.fillText(G.tool==="del"?"없앨 드래곤을 누르세요":"드래곤을 끌어서 같은 드래곤에 놓으세요",SK_W/2,12); }
  G.pops=G.pops.filter(p=>(p.t+=dt)<380);
  for(const p of G.pops){ const k=p.t/380; ctx.strokeStyle=p.c; ctx.globalAlpha=1-k; ctx.lineWidth=4; ctx.beginPath(); ctx.arc(p.x,p.y,p.r*(1+k*.6),0,Math.PI*2); ctx.stroke(); ctx.globalAlpha=1; }
  const sc=$("#skScore"); if(sc&&sc.textContent!==fmt(G.score)) sc.textContent=fmt(G.score);
}
function skBodyAt(x,y){ const bs=Matter.Composite.allBodies(G.engine.world).filter(b=>b.lv!=null);
  let best=null,bd=1e9; for(const b of bs){ const d=Math.hypot(b.position.x-x,b.position.y-y); if(d<=SK_R[b.lv]+6&&d<bd){ bd=d; best=b; } } return best; }
function skUseTool(x,y){
  const W=G.engine.world, C=Matter.Composite;
  if(G.tool==="del"){ const b=skBodyAt(x,y); if(!b) return;
    C.remove(W,b); G.pops.push({x:b.position.x,y:b.position.y,r:SK_R[b.lv],t:0,c:"#ffffff"}); skSpend("del"); }
  else if(G.tool==="merge"){ const a=G.drag&&G.drag.body; G.drag=null; if(!a) return; const b=skBodyAt(x,y);
    if(!b||b===a){ toast("다른 드래곤 위에 놓아 주세요"); return; }
    if(a.lv!==b.lv){ toast("같은 드래곤끼리만 합칠 수 있어요"); return; }
    const lv=a.lv, px=b.position.x, py=b.position.y; C.remove(W,[a,b]);
    G.score+=(lv+1)*(lv+2)/2*2;
    if(lv+1<SK_N) C.add(W,skBall(px,py,lv+1)); else G.score+=1000;
    G.pops.push({x:px,y:py,r:SK_R[Math.min(lv+1,SK_N-1)],t:0,c:"#FFD34D"}); skSpend("merge"); }
}
function skSpend(k){ sk.items[k]=Math.max(0,skItemN(k)-1); saveSkAll(); G.tool=null; G.drag=null; G.overT=0; skRenderItems(); }
function skShake(){ if(!G||G.over||!skItemN("shake")) return;
  for(const b of Matter.Composite.allBodies(G.engine.world)) if(b.lv!=null) Matter.Body.setVelocity(b,{x:(Math.random()-.5)*8,y:-6-Math.random()*6});
  sk.items.shake=skItemN("shake")-1; saveSkAll(); skRenderItems(); }
function skBuy(k){ const it=SK_ITEMS.find(x=>x.k===k); if((ck.fish||0)<it.price){ toast("물고기가 모자라요. 클릭커에서 잡아 오세요"); return; }
  ck.fish-=it.price; saveCkAll(); sk.items=sk.items||{}; sk.items[k]=skItemN(k)+1; saveSkAll(); skRenderItems(); toast(`${it.name} 1개 샀어요`); }
function skRefreshFish(){ const f=document.querySelector("#skItems .skfish b"); if(f) f.textContent=fmt(ck.fish||0);
  document.querySelectorAll("[data-skbuy]").forEach(b=>{ const it=SK_ITEMS.find(x=>x.k===b.dataset.skbuy); b.disabled=(ck.fish||0)<it.price; }); }
function skRenderItems(){
  const w=$("#skItems"); if(!w) return;
  w.innerHTML=`<div class="skfish">${FISH_SVG}<b>${fmt(ck.fish||0)}</b><span>클릭커 물고기</span></div>`+SK_ITEMS.map(it=>{ const n=skItemN(it.k), on=G&&G.tool===it.k;
    return `<div class="skitem ${on?"on":""}"><button class="skuse" data-skuse="${it.k}" ${n&&G&&!G.over?"":"disabled"} aria-pressed="${on}" title="${it.desc}"><b>${on?"취소":it.name}</b><span>${n}개</span></button>
      <button class="skbuy" data-skbuy="${it.k}" ${(ck.fish||0)<it.price?"disabled":""} aria-label="${it.name} 사기">사기 ${FISH_SVG}${fmt(it.price)}</button></div>`; }).join("");
  w.querySelectorAll("[data-skuse]").forEach(b=>b.onclick=()=>{ const k=b.dataset.skuse; if(!G||G.over) return;
    if(k==="shake"){ skShake(); return; } G.tool=G.tool===k?null:k; G.drag=null; skRenderItems(); });
  w.querySelectorAll("[data-skbuy]").forEach(b=>b.onclick=()=>skBuy(b.dataset.skbuy));
}
function skHud(){ const n=$("#skNext"); if(n&&G){ const c=n.getContext("2d"); c.setTransform(2,0,0,2,0,0); c.clearRect(0,0,40,40); skDrawBall(c,20,20,Math.min(18,SK_R[G.next]+4),G.next,0); }
  const b=$("#skBest"); if(b) b.textContent=fmt(sk.best||0); }
function skOver(nb){ const o=$("#skOver"); if(!o) return; o.hidden=false;
  o.innerHTML=`<div class="skocard"><h3>${nb?"최고 기록!":"게임 끝"}</h3><p class="skobig">${fmt(G.score)}점</p><p class="note" style="color:inherit;opacity:.8">최고 ${fmt(sk.best||0)}점</p><button class="btn" id="skAgain">다시 하기</button></div>`;
  brag("skOver","suika",G.score); $("#skAgain").onclick=()=>{ G=skNewGame(); o.hidden=true; skHud(); skRenderItems(); }; }
function renderSuika(){
  const el=$("#clickView"); if(!el) return;
  el.innerHTML=mgTabsHtml()+(window.Matter?`<div class="skwrap" id="skWrap">
      <div class="skhud"><div><span>점수</span><b id="skScore">0</b></div><div><span>최고</span><b id="skBest">${fmt(sk.best||0)}</b></div>
        <div class="sknext"><span>다음</span><canvas id="skNext" width="80" height="80"></canvas></div><button class="btn ghost small" id="skRestart">새 판</button></div>
      <div class="skbox"><canvas id="skCanvas"></canvas><div class="skover" id="skOver" hidden></div></div>
      <div class="skitems" id="skItems"></div>
    </div>`:`<div class="empty"><h2>게임을 불러오지 못했어요</h2><p class="note">인터넷 연결을 확인하고 다시 열어 주세요.</p></div>`)+
    `<p class="sec-title">단계별 사진 <span class="note" style="font-family:var(--body)">1이 가장 작고 15가 가장 커요. 같은 단계 둘이 닿으면 다음 단계가 돼요.</span></p>
    <div class="skslots" id="skSlots"></div>
    <div class="row"><span class="btn pickwrap" style="flex:1;text-align:center">여러 장 올리기 (빈 칸부터 차례로)<input type="file" accept="image/*" multiple id="skBulk" aria-label="수박게임 사진 여러 장 올리기"></span></div>`;
  bindMgTabs();
  skRenderSlots();
  const bk=$("#skBulk"); if(bk) bk.onchange=()=>{ const fs=[...bk.files]; bk.value=""; skUpload(fs,null); };
  if(!window.Matter) return;
  if(!G) G=skNewGame();
  const cv=$("#skCanvas"), dpr=Math.min(3,window.devicePixelRatio||1); cv.width=SK_W*dpr; cv.height=SK_H*dpr;
  const toX=e=>{ const r=cv.getBoundingClientRect(); return (e.clientX-r.left)/r.width*SK_W; };
  let down=false;
  const toY=e=>{ const r=cv.getBoundingClientRect(); return (e.clientY-r.top)/r.height*SK_H; };
  cv.addEventListener("pointerdown",e=>{ e.preventDefault(); down=true; G.x=toX(e); try{cv.setPointerCapture(e.pointerId);}catch(_){}
    if(G.tool){ const b=skBodyAt(G.x,toY(e)); if(G.tool==="merge"&&b) G.drag={body:b,x:G.x,y:toY(e)}; } });
  cv.addEventListener("pointermove",e=>{ if(!G) return; G.x=toX(e); if(G.drag){ G.drag.x=G.x; G.drag.y=toY(e); } });
  cv.addEventListener("pointerup",e=>{ if(!down) return; down=false; G.x=toX(e);
    if(G.tool){ skUseTool(G.x,toY(e)); return; } skDrop(); });
  cv.addEventListener("pointercancel",()=>{ down=false; if(G) G.drag=null; });
  $("#skRestart").onclick=e=>{ const b=e.currentTarget; if(G&&!G.over&&G.score>0&&!b.dataset.armed){ b.dataset.armed="1"; b.textContent="정말 새 판?"; setTimeout(()=>{ if(b.isConnected){ delete b.dataset.armed; b.textContent="새 판"; } },3000); return; }
    G=skNewGame(); $("#skOver").hidden=true; skRenderItems(); b.textContent="새 판"; delete b.dataset.armed; skHud(); };
  if(G.over) skOver(false);
  skRenderItems();
  skHud(); if(!skRaf) skRaf=requestAnimationFrame(skLoop);
}
function mgSetFull(on){ // 미니게임 전체화면: 어떤 게임이든 미니게임 화면 전체를 꽉 채워요
  mgFull=on; const v=$("#clickView"); if(v) v.classList.toggle("mgfull",on); document.body.classList.toggle("skfull",on);
  document.querySelectorAll("[data-mgfull]").forEach(b=>{ b.textContent=on?"닫기":"전체화면"; b.setAttribute("aria-pressed",on); });
  try{ if(on&&document.documentElement.requestFullscreen&&!document.fullscreenElement) document.documentElement.requestFullscreen().catch(()=>{});
       if(!on&&document.fullscreenElement) document.exitFullscreen().catch(()=>{}); }catch(e){}
}
document.addEventListener("keydown",e=>{ if(e.key==="Escape"&&mgFull) mgSetFull(false); });
document.addEventListener("fullscreenchange",()=>{ if(!document.fullscreenElement&&mgFull) mgSetFull(false); });
function skRenderSlots(){
  const w=$("#skSlots"); if(!w) return;
  w.innerHTML=sk.imgs.map((own,i)=>{ const id=own||((mgDef.suika||[])[i]||""), def=!own&&!!id; return `<div class="skslot">
    <label class="skpic" style="--c:${SK_COL[i]};--s:${(.55+.45*i/(SK_N-1)).toFixed(2)}">${id?`<img src="${blobUrl(id)}" alt="">`:`<b>+</b>`}
      <input type="file" accept="image/*" data-skslot="${i}" aria-label="${i+1}단계 사진 고르기"></label>
    <span class="sklv">${i+1}단계</span>${own?`<button class="ckdel skdel" data-skdel="${i}" aria-label="${i+1}단계 사진 빼기">×</button>`:""}${def?`<span class="skdef">기본</span>`:""}</div>`;}).join("");
  w.querySelectorAll("[data-skslot]").forEach(inp=>inp.onchange=()=>{ const fs=[...inp.files]; inp.value=""; if(fs.length) skUpload(fs.slice(0,1),+inp.dataset.skslot); });
  w.querySelectorAll("[data-skdel]").forEach(b=>b.onclick=()=>{ if(!b.dataset.armed){ b.dataset.armed="1"; b.textContent="빼기?"; b.classList.add("armed"); setTimeout(()=>{ if(b.isConnected){ delete b.dataset.armed; b.textContent="×"; b.classList.remove("armed"); } },3000); return; }
    const i=+b.dataset.skdel, old=sk.imgs[i]; sk.imgs[i]=""; saveSkAll(); skRenderSlots(); if(old&&cloud&&!sk.imgs.includes(old)) cloud.assets.delete(old).catch(()=>{}); });
}
async function skUpload(files,slot){
  if(!cloud){ toast("사진을 올리려면 claude.ai에 로그인한 상태여야 해요"); return; }
  let n=0;
  for(const f of files){
    const i=slot!=null?slot:sk.imgs.findIndex(x=>!x); if(i<0){ toast("15칸이 다 찼어요. 바꿀 칸을 눌러 주세요"); break; }
    try{ const blob=await shrink(f); const r=await cloud.assets.upload(blob,{type:blob.type||"image/jpeg",mine:true});
      const old=sk.imgs[i]; sk.imgs[i]=r.id; n++; skLoadImgs(); saveSkAll(); skRenderSlots();
      if(old&&!sk.imgs.includes(old)) cloud.assets.delete(old).catch(()=>{}); }catch(e){ toast("사진을 올리지 못했어요"); }
  }
  if(n) toast(`사진 ${n}장 넣었어요`);
}
function mgTabsHtml(){ return `<div class="mgbar"><div class="mgtabs" role="tablist"><button role="tab" data-mg="click" aria-selected="${mgMode==="click"}">클릭커</button><button role="tab" data-mg="suika" aria-selected="${mgMode==="suika"}">수박게임</button><button role="tab" data-mg="fly" aria-selected="${mgMode==="fly"}">비행</button><button role="tab" data-mg="hide" aria-selected="${mgMode==="hide"}">숨바꼭질</button><button role="tab" data-mg="mem" aria-selected="${mgMode==="mem"}">짝맞추기</button><button role="tab" data-mg="sling" aria-selected="${mgMode==="sling"}">불뿜기</button><button role="tab" data-mg="run" aria-selected="${mgMode==="run"}">달리기</button><button role="tab" data-mg="stack" aria-selected="${mgMode==="stack"}">탑쌓기</button><button role="tab" data-mg="simon" aria-selected="${mgMode==="simon"}">순서기억</button><button role="tab" data-mg="egg" aria-selected="${mgMode==="egg"}">알 받기</button><button role="tab" data-mg="dodge" aria-selected="${mgMode==="dodge"}">불꽃피하기</button><button role="tab" data-mg="berk" aria-selected="${mgMode==="berk"}">버크 만들기</button><button role="tab" data-mg="tama" aria-selected="${mgMode==="tama"}">드래곤 키우기</button><button role="tab" data-mg="rhythm" aria-selected="${mgMode==="rhythm"}">리듬</button><button role="tab" data-mg="magic" aria-selected="${mgMode==="magic"}">불꽃 마법</button><button role="tab" data-mg="tetris" aria-selected="${mgMode==="tetris"}">테트리스</button></div><button class="btn ghost small mgrank" data-mgrank>랭킹</button><button class="btn ghost small mgfsbtn" data-mgfull aria-pressed="${mgFull}">${mgFull?"닫기":"전체화면"}</button></div>`; }
function bindMgTabs(){ document.querySelectorAll("[data-mgrank]").forEach(b=>b.onclick=()=>openRank({suika:"suika",fly:"fly",hide:"hide",mem:"mem_"+(M&&M.lv||"easy"),sling:"sling",run:"run",stack:"stack",simon:"simon",egg:"egg",dodge:"dodge",rhythm:"rhythm",magic:"magic",tetris:"tetris"}[mgMode]||"suika")); const on=document.querySelector('.mgtabs [aria-selected="true"]'); if(on){ const bar=on.parentElement; bar.scrollLeft=on.offsetLeft-bar.clientWidth/2+on.offsetWidth/2; } document.querySelectorAll("[data-mgfull]").forEach(b=>b.onclick=()=>mgSetFull(!mgFull)); document.querySelectorAll("[data-mg]").forEach(b=>b.onclick=()=>{ if(mgMode===b.dataset.mg) return; mgMode=b.dataset.mg; try{ localStorage.setItem("httyd-mgMode",mgMode); }catch(e){} renderClick(true); }); }

// ---------- 미니게임: 드래곤 비행 · 드래곤 숨바꼭질 ----------
let mini={flyBest:0,hideBest:0};
const saveMini=makeSaver("settings/minis",()=>mini);
try{ const l=JSON.parse(localStorage.getItem("httyd-minis")||"null"); if(l) mini=Object.assign(mini,l); }catch(e){}
function saveMiniAll(){ try{ localStorage.setItem("httyd-minis",JSON.stringify(mini)); }catch(e){} saveMini(); }
function initMiniCloud(d){
  d.doc("settings/minis").onSnapshot(s=>{ if(s.exists&&!dirtyDocs["settings/minis"]&&!s.metadata.hasPendingWrites){
    mini=Object.assign({flyBest:0,hideBest:0},JSON.parse(JSON.stringify(s.data()||{}))); } },()=>{});
}
function miniGiveFish(n){ n=Math.floor(n); if(n<=0) return 0; spXP(20); ck.fish=(ck.fish||0)+n; saveCkAll(); return n; }
const imgCache={};
function imgOf(url){ if(!url) return null; if(!imgCache[url]){ const im=new Image(); im.src=url; imgCache[url]=im; } return imgCache[url]; }
function drawRoundImg(ctx,url,x,y,r,fallback){
  const im=imgOf(url); ctx.save(); ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.closePath();
  if(im&&im.complete&&im.naturalWidth){ ctx.save(); ctx.clip(); const s=Math.max(2*r/im.naturalWidth,2*r/im.naturalHeight), w=im.naturalWidth*s, h=im.naturalHeight*s; ctx.drawImage(im,x-w/2,y-h/2,w,h); ctx.restore(); }
  else { ctx.fillStyle=fallback||"#3B4A54"; ctx.fill(); }
  ctx.lineWidth=3; ctx.strokeStyle="#fff"; ctx.stroke(); ctx.restore();
}

/* ===== 드래곤 비행: 누르면 날아올라요. 바위 기둥 사이를 지나가고 물고기를 주워요 ===== */
const FW=420, FH=700, FSEA=640, FR=24;
let F=null, fRaf=0, fLast=0;
function flyNew(){ return {state:"ready",y:FH*0.42,vy:0,x:110,pipes:[],fish:[],dist:0,score:0,caught:0,next:260,t:0,flapT:0}; }
function flyFlap(){
  if(!F) return;
  if(F.state==="over") return;
  if(F.state==="ready") F.state="play";
  F.vy=-7.6; F.flapT=180;
}
function flyEnd(){
  F.state="over";
  const fish=miniGiveFish(F.caught*Math.max(1,tapValue())*3 + F.score*Math.max(1,tapValue()));
  const nb=F.score>(mini.flyBest||0); if(nb){ mini.flyBest=F.score; } saveMiniAll();
  const o=$("#flyOver"); if(!o) return; o.hidden=false;
  o.innerHTML=`<div class="skocard"><h3>${nb?"최고 기록!":"쿵!"}</h3><p class="skobig">${F.score}개 통과</p>
    <p style="margin:0">${FISH_SVG} 물고기 ${fmt(fish)}마리 받았어요</p><p class="note" style="color:inherit;opacity:.75;margin:0">최고 ${mini.flyBest||0}개</p>
    <button class="btn" id="flyAgain">다시 날기</button></div>`;
  brag("flyOver","fly",F.score); $("#flyAgain").onclick=e=>{ e.stopPropagation(); F=flyNew(); o.hidden=true; flyHud(); };
  flyHud();
}
function flyHud(){ const a=$("#flyScore"); if(a&&F) a.textContent=F.score; const b=$("#flyBest"); if(b) b.textContent=mini.flyBest||0; const c=$("#flyFish"); if(c&&F) c.textContent=F.caught; }
function flyLoop(t){
  fRaf=requestAnimationFrame(flyLoop);
  const cv=$("#flyCanvas"); if(!cv||!F||view!=="click"||mgMode!=="fly"||document.hidden){ fLast=t; return; }
  const dt=Math.min(2.2,(t-(fLast||t))/16.67); fLast=t; F.t+=dt;
  const speed=2.8+Math.min(2.4,F.score*0.06);
  if(F.state==="play"){
    F.vy=Math.min(11,F.vy+0.42*dt); F.y+=F.vy*dt; F.flapT=Math.max(0,F.flapT-dt*16.67);
    F.next-=speed*dt;
    if(F.next<=0){ const gap=Math.max(165,215-F.score*2), top=90+Math.random()*(FSEA-gap-180);
      F.pipes.push({x:FW+40,top,gap,w:70,passed:false});
      if(Math.random()<0.65) F.fish.push({x:FW+40+35,y:top+gap/2,got:false});
      F.next=240; }
    for(const p of F.pipes){ p.x-=speed*dt; if(!p.passed&&p.x+p.w<F.x-FR){ p.passed=true; F.score++; flyHud(); } }
    for(const f of F.fish){ f.x-=speed*dt; if(!f.got&&Math.hypot(f.x-F.x,f.y-F.y)<FR+16){ f.got=true; F.caught++; flyHud(); } }
    F.pipes=F.pipes.filter(p=>p.x>-90); F.fish=F.fish.filter(f=>f.x>-40&&!f.got);
    // 부딪힘
    if(F.y+FR>=FSEA||F.y-FR<=0) flyEnd();
    else for(const p of F.pipes){ if(F.x+FR-6>p.x&&F.x-FR+6<p.x+p.w&&(F.y-FR+6<p.top||F.y+FR-6>p.top+p.gap)){ flyEnd(); break; } }
  } else if(F.state==="ready"){ F.y=FH*0.42+Math.sin(F.t/12)*10; }
  // 그리기
  const ctx=cv.getContext("2d"), dpr=cv.width/FW; ctx.setTransform(dpr,0,0,dpr,0,0);
  const g=ctx.createLinearGradient(0,0,0,FH); g.addColorStop(0,"#6FA9C9"); g.addColorStop(.75,"#F2DFC0"); ctx.fillStyle=g; ctx.fillRect(0,0,FW,FH);
  ctx.fillStyle="#FFE7A6"; ctx.beginPath(); ctx.arc(330,90,32,0,Math.PI*2); ctx.fill();
  const off=(F.t*0.6)%420;
  ctx.fillStyle="#7F9BA6"; ctx.beginPath(); ctx.moveTo(0,FSEA);
  for(let i=-1;i<4;i++){ const bx=i*210-off*0.5; ctx.lineTo(bx+40,FSEA-120); ctx.lineTo(bx+100,FSEA-70); ctx.lineTo(bx+150,FSEA-150); ctx.lineTo(bx+210,FSEA); }
  ctx.lineTo(FW,FSEA); ctx.closePath(); ctx.fill();
  for(const p of F.pipes){
    ctx.fillStyle="#5E5A55"; ctx.strokeStyle="#3B3733"; ctx.lineWidth=3;
    ctx.beginPath(); ctx.roundRect(p.x,-10,p.w,p.top+10,10); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.roundRect(p.x,p.top+p.gap,p.w,FSEA-(p.top+p.gap)+10,10); ctx.fill(); ctx.stroke();
    ctx.fillStyle="#7A766F"; ctx.fillRect(p.x+10,0,8,p.top-8); ctx.fillRect(p.x+10,p.top+p.gap+8,8,FSEA-(p.top+p.gap)-8);
    ctx.fillStyle="#4E7A3A"; ctx.fillRect(p.x-4,p.top-12,p.w+8,12); ctx.fillRect(p.x-4,p.top+p.gap,p.w+8,12);
  }
  for(const f of F.fish){ ctx.save(); ctx.translate(f.x,f.y+Math.sin((F.t+f.x)/10)*4); ctx.fillStyle="#E9A23B";
    ctx.beginPath(); ctx.ellipse(0,0,15,9,0,0,Math.PI*2); ctx.fill(); ctx.beginPath(); ctx.moveTo(12,0); ctx.lineTo(22,-8); ctx.lineTo(22,8); ctx.closePath(); ctx.fill();
    ctx.fillStyle="#1b2a33"; ctx.beginPath(); ctx.arc(-7,-2,2,0,Math.PI*2); ctx.fill(); ctx.restore(); }
  ctx.fillStyle="#2E6F8E"; ctx.fillRect(0,FSEA,FW,FH-FSEA);
  ctx.strokeStyle="rgba(255,255,255,.4)"; ctx.lineWidth=3; ctx.beginPath();
  for(let x=-40;x<FW+40;x+=40){ const xx=x-(F.t*speed*0.9)%40; ctx.moveTo(xx,FSEA+14); ctx.quadraticCurveTo(xx+10,FSEA+6,xx+20,FSEA+14); } ctx.stroke();
  // 드래곤
  const tg=ckTarget(); ctx.save(); ctx.translate(F.x,F.y); ctx.rotate(Math.max(-.5,Math.min(.9,F.vy/12)));
  const flap=F.flapT>0?-1:Math.sin(F.t/5);
  ctx.fillStyle="#22313A"; for(const s of [-1,1]){ ctx.beginPath(); ctx.moveTo(-6,0); ctx.quadraticCurveTo(-20,-18*flap-10,-46,-10*flap*s*0+(-16*flap)); ctx.lineTo(-14,8); ctx.closePath(); ctx.fill(); }
  ctx.restore();
  ctx.save(); ctx.translate(F.x,F.y); ctx.rotate(Math.max(-.5,Math.min(.9,F.vy/12))); drawRoundImg(ctx,tg&&tg.url,0,0,FR,"#22313A"); ctx.restore();
  if(F.state==="ready"){ ctx.fillStyle="rgba(20,32,40,.6)"; ctx.beginPath(); ctx.roundRect(70,FH*0.58,280,60,16); ctx.fill();
    ctx.fillStyle="#fff"; ctx.font="bold 22px sans-serif"; ctx.textAlign="center"; ctx.textBaseline="middle"; ctx.fillText("눌러서 날아오르기",FW/2,FH*0.58+30); }
}
function renderFly(){
  const el=$("#clickView"); if(!el) return;
  if(!F) F=flyNew();
  const tg=ckTarget();
  el.innerHTML=mgTabsHtml()+`<div class="skwrap">
    <div class="skhud"><div><span>통과</span><b id="flyScore">${F.score}</b></div><div><span>최고</span><b id="flyBest">${mini.flyBest||0}</b></div>
      <div><span>주운 물고기</span><b id="flyFish">${F.caught}</b></div></div>
    <div class="skbox flybox"><canvas id="flyCanvas" aria-label="드래곤 비행 게임판. 누르면 날아올라요"></canvas><div class="skover" id="flyOver" hidden></div></div>
    <p class="note" style="margin:0;text-align:center">화면을 누르면 날아올라요. 바위 기둥을 하나 지날 때마다, 그리고 물고기를 주울 때마다 클릭커 물고기를 받아요.
    ${tg?"":"<br>클릭커에서 드래곤이나 사진을 고르면 그 얼굴로 날아요."}</p></div>`;
  bindMgTabs();
  const cv=$("#flyCanvas"), dpr=Math.min(3,window.devicePixelRatio||1); cv.width=FW*dpr; cv.height=FH*dpr;
  cv.addEventListener("pointerdown",e=>{ e.preventDefault(); flyFlap(); });
  if(F.state==="over"){ F=flyNew(); }
  flyHud(); if(!fRaf) fRaf=requestAnimationFrame(flyLoop);
}
document.addEventListener("keydown",e=>{ if(view==="click"&&mgMode==="fly"&&(e.key===" "||e.key==="ArrowUp")&&!e.target.closest("input,textarea")){ e.preventDefault(); flyFlap(); } });

/* ===== 드래곤 숨바꼭질: 집에서 튀어나오는 드래곤을 눌러요. 바이킹은 누르면 안 돼요 ===== */
const HD_TIME=30000, HD_N=9;
let H={state:"ready"}, hdT=null;
const VIKING_SVG=`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M8 26 Q4 10 14 6 Q12 18 18 24Z M56 26 Q60 10 50 6 Q52 18 46 24Z" fill="#EDE3CF" stroke="#8A7A5A" stroke-width="2"/>
<path d="M14 30 Q14 12 32 12 Q50 12 50 30Z" fill="#9AA4AA" stroke="#5A6268" stroke-width="2"/><rect x="12" y="28" width="40" height="6" rx="2" fill="#7A858B"/>
<circle cx="32" cy="40" r="13" fill="#F1C9A5"/><circle cx="27" cy="38" r="2" fill="#222"/><circle cx="37" cy="38" r="2" fill="#222"/>
<path d="M19 44 Q32 66 45 44 Q38 50 32 49 Q26 50 19 44Z" fill="#C8662B"/></svg>`;
function hdPics(){ const own=ckOwned().map(id=>({url:urlOf(cardPhoto(id)),name:koOf(id)})); const my=ckAll().map(id=>({url:blobUrl(id),name:""})); return [...own,...my]; }
function hdStart(){
  clearTimeout(hdT); H={state:"play",start:performance.now(),score:0,hits:0,miss:0,holes:Array(HD_N).fill(null),combo:0};
  $("#hdOver").hidden=true; renderHideBoard(); hdSpawn(); hdTick();
}
function hdElapsed(){ return performance.now()-H.start; }
function hdTick(){ if(H.state!=="play") return; const left=Math.max(0,HD_TIME-hdElapsed()); const bar=$("#hdBar"); if(bar) bar.style.width=(left/HD_TIME*100)+"%";
  const tx=$("#hdLeft"); if(tx) tx.textContent=Math.ceil(left/1000);
  if(left<=0){ hdEnd(); return; } requestAnimationFrame(hdTick); }
function hdSpawn(){
  if(H.state!=="play") return;
  if(view!=="click"||mgMode!=="hide"||document.hidden){ hdT=setTimeout(hdSpawn,300); return; }
  const e=hdElapsed(), free=H.holes.map((h,i)=>h?-1:i).filter(i=>i>=0);
  if(free.length){ const i=free[Math.floor(Math.random()*free.length)], pics=hdPics(), viking=Math.random()<0.12;
    const pic=pics.length?pics[Math.floor(Math.random()*pics.length)]:null;
    const life=Math.max(1200,1900-e/45), gold=!viking&&Math.random()<0.08;
    const tok={viking,gold,pic,until:performance.now()+life};
    H.holes[i]=tok; hdShow(i,tok);
    setTimeout(()=>{ if(H.holes[i]===tok){ H.holes[i]=null; hdHide(i); } },life); }
  hdT=setTimeout(hdSpawn,Math.max(650,1150-e/60)*(0.75+Math.random()*0.5));
}
function hdShow(i,tok){ const h=document.querySelector(`[data-hd="${i}"]`); if(!h) return; const pop=h.querySelector(".hdpop");
  pop.className="hdpop up"+(tok.viking?" viking":"")+(tok.gold?" gold":"");
  pop.innerHTML=tok.viking?VIKING_SVG:(tok.pic?`<img src="${tok.pic.url}" alt="">`:`<span class="hdq">?</span>`); }
function hdHide(i){ const h=document.querySelector(`[data-hd="${i}"]`); if(h) h.querySelector(".hdpop").classList.remove("up"); }
function hdHit(i){
  if(H.state!=="play") return; const tok=H.holes[i]; if(!tok) return;
  H.holes[i]=null; const h=document.querySelector(`[data-hd="${i}"]`);
  let txt;
  if(tok.viking){ H.score=Math.max(0,H.score-1); H.combo=0; H.miss++; txt="-1"; h.classList.add("bad"); setTimeout(()=>h.classList.remove("bad"),300); }
  else { H.combo++; const add=(tok.gold?5:1)+(H.combo>=5?1:0); H.score+=add; H.hits++; txt="+"+add; }
  hdHide(i);
  const p=document.createElement("span"); p.className="hdfloat"+(tok.viking?" neg":""); p.textContent=txt; h.appendChild(p); setTimeout(()=>p.remove(),700);
  const sc=$("#hdScore"); if(sc) sc.textContent=H.score; const cb=$("#hdCombo"); if(cb) cb.textContent=H.combo>=5?`${H.combo}연속! +1`:H.combo>1?`${H.combo}연속`:"";
}
function hdEnd(){
  H.state="over"; clearTimeout(hdT); H.holes=Array(HD_N).fill(null); for(let i=0;i<HD_N;i++) hdHide(i);
  const fish=miniGiveFish(H.score*Math.max(1,tapValue())*2);
  const nb=H.score>(mini.hideBest||0); if(nb) mini.hideBest=H.score; saveMiniAll();
  const o=$("#hdOver"); if(!o) return; o.hidden=false;
  o.innerHTML=`<div class="skocard"><h3>${nb?"최고 기록!":"시간 끝!"}</h3><p class="skobig">${H.score}점</p>
    <p style="margin:0">드래곤 ${H.hits}마리 · 바이킹 ${H.miss}번</p><p style="margin:0">${FISH_SVG} 물고기 ${fmt(fish)}마리 받았어요</p>
    <button class="btn" id="hdAgain">한 번 더</button></div>`;
  brag("hdOver","hide",H.score); $("#hdAgain").onclick=hdStart; const b=$("#hdBest"); if(b) b.textContent=mini.hideBest||0;
}
function renderHideBoard(){ const w=$("#hdGrid"); if(!w) return;
  w.innerHTML=Array.from({length:HD_N},(_,i)=>`<button class="hdhole" data-hd="${i}" aria-label="${i+1}번 집"><span class="hdroof"></span><span class="hdwin"><span class="hdpop"></span></span></button>`).join("");
  w.querySelectorAll("[data-hd]").forEach(b=>b.addEventListener("pointerdown",e=>{ e.preventDefault(); hdHit(+b.dataset.hd); })); }
function renderHide(){
  const el=$("#clickView"); if(!el) return;
  el.innerHTML=mgTabsHtml()+`<div class="skwrap">
    <div class="skhud"><div><span>점수</span><b id="hdScore">${H.score||0}</b></div><div><span>최고</span><b id="hdBest">${mini.hideBest||0}</b></div><div><span>남은 초</span><b id="hdLeft">${H.state==="play"?Math.ceil(Math.max(0,HD_TIME-hdElapsed())/1000):30}</b></div></div>
    <div class="hdtime"><i id="hdBar" style="width:100%"></i></div>
    <div class="hdbox"><div class="hdgrid" id="hdGrid"></div><p class="hdcombo" id="hdCombo"></p>
      <div class="skover" id="hdOver" ${H.state==="play"?"hidden":""}>${H.state==="play"?"":`<div class="skocard"><h3>드래곤 숨바꼭질</h3><p style="margin:0">30초 동안 집에서 튀어나오는 드래곤을 눌러요.<br>금빛 드래곤은 5점! 바이킹을 누르면 1점 깎여요.</p><button class="btn" id="hdGo">시작</button></div>`}</div></div>
    <p class="note" style="margin:0;text-align:center">점수만큼 클릭커 물고기를 받아요.${hdPics().length?"":" 드래곤을 뽑거나 클릭커에 사진을 올리면 그 얼굴이 나와요."}</p></div>`;
  bindMgTabs(); renderHideBoard();
  const go=$("#hdGo"); if(go) go.onclick=hdStart;
  if(H.state==="play"){ H.holes.forEach((tok,i)=>{ if(tok) hdShow(i,tok); }); hdTick(); }
}

/* ===== 짝 맞추기: 뒤집힌 카드에서 같은 드래곤 두 장을 찾아요 ===== */
const MEM_LV={easy:{name:"쉬움",cols:3,pairs:6},normal:{name:"보통",cols:4,pairs:8},hard:{name:"어려움",cols:5,pairs:10}};
let M={state:"ready",lv:"easy"};
try{ M.lv=localStorage.getItem("httyd-memlv")||"easy"; if(!MEM_LV[M.lv]) M.lv="easy"; }catch(e){}
const MEM_FB=["#E85D75","#F08A4B","#F2C14E","#9BC53D","#3FA7D6","#5965D9","#A05CD6","#D65CA8","#2EC4B6","#E4572E"];
function memPool(){ // 뽑은 드래곤 사진 → 클릭커 내 사진 → 수박게임 사진 순서로, 겹치지 않게
  const seen=new Set(), out=[];
  const add=(url,name)=>{ if(url&&!seen.has(url)){ seen.add(url); out.push({url,name}); } };
  ckOwned().forEach(id=>add(urlOf(cardPhoto(id)),koOf(id)));
  ckAll().forEach(id=>add(blobUrl(id),""));
  Array.from({length:SK_N},(_,i)=>skImgId(i)).forEach(id=>id&&add(blobUrl(id),""));
  return out;
}
function memShuffle(a){ for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
function memStart(){
  const L=MEM_LV[M.lv], pool=memShuffle(memPool()).slice(0,L.pairs);
  const faces=Array.from({length:L.pairs},(_,i)=>pool[i]?{key:"p"+i,url:pool[i].url,name:pool[i].name}:{key:"c"+i,url:"",name:"",col:MEM_FB[i%MEM_FB.length],num:i+1});
  const cards=memShuffle(faces.flatMap(f=>[{...f},{...f}])).map((c,i)=>({...c,i,open:false,done:false}));
  M={state:"play",lv:M.lv,cards,first:null,lock:false,moves:0,found:0,start:performance.now(),pairs:L.pairs};
  renderMem(true);
}
function memFlip(i){
  if(M.state!=="play"||M.lock) return; const c=M.cards[i]; if(!c||c.open||c.done) return;
  c.open=true; memCardEl(i);
  if(M.first==null){ M.first=i; return; }
  const a=M.cards[M.first]; M.first=null; M.moves++; memHud();
  if(a.key===c.key){ a.done=c.done=true; M.found++;
    setTimeout(()=>{ memCardEl(a.i); memCardEl(c.i); if(c.name) toast(c.name+"!"); },250);
    if(M.found>=M.pairs) setTimeout(memEnd,700);
  } else { M.lock=true; setTimeout(()=>{ a.open=c.open=false; memCardEl(a.i); memCardEl(c.i); M.lock=false; },850); }
}
function memEnd(){
  M.state="over"; const sec=Math.round((performance.now()-M.start)/1000);
  const fish=miniGiveFish(M.pairs*Math.max(1,tapValue())*3);
  mini.memBest=mini.memBest||{}; const prev=mini.memBest[M.lv], nb=!prev||M.moves<prev; if(nb) mini.memBest[M.lv]=M.moves; saveMiniAll();
  const o=$("#memOver"); if(!o) return; o.hidden=false;
  o.innerHTML=`<div class="skocard"><h3>${nb?"최고 기록!":"다 찾았어요!"}</h3><p class="skobig">${M.moves}번</p>
    <p style="margin:0">${sec}초 걸렸어요 · 최고 ${mini.memBest[M.lv]}번</p><p style="margin:0">${FISH_SVG} 물고기 ${fmt(fish)}마리 받았어요</p>
    <button class="btn" id="memAgain">한 판 더</button></div>`;
  brag("memOver","mem_"+M.lv,M.moves); $("#memAgain").onclick=memStart;
}
function memHud(){ const a=$("#memMoves"); if(a) a.textContent=M.moves||0; const b=$("#memFound"); if(b) b.textContent=`${M.found||0}/${MEM_LV[M.lv].pairs}`; }
function memFace(c){ return c.url?`<img src="${c.url}" alt="" draggable="false">${c.name?`<span class="memname">${esc(c.name)}</span>`:""}`:`<span class="memnum" style="background:${c.col}">${c.num}</span>`; }
function memCardEl(i){ const el=document.querySelector(`[data-mem="${i}"]`), c=M.cards[i]; if(!el) return;
  el.classList.toggle("open",c.open||c.done); el.classList.toggle("done",c.done);
  el.setAttribute("aria-label",(c.open||c.done)?(c.name||"카드")+(c.done?" (찾음)":""):"뒤집힌 카드"); }
function renderMem(){
  const el=$("#clickView"); if(!el) return; const L=MEM_LV[M.lv], best=(mini.memBest||{})[M.lv];
  const playing=M.state==="play"||M.state==="over";
  el.innerHTML=mgTabsHtml()+`<div class="skwrap">
    <div class="memlv" role="radiogroup" aria-label="난이도">${Object.entries(MEM_LV).map(([k,v])=>`<button role="radio" aria-checked="${M.lv===k}" data-memlv="${k}">${v.name} <small>${v.pairs}쌍</small></button>`).join("")}</div>
    <div class="skhud"><div><span>뒤집은 횟수</span><b id="memMoves">${M.moves||0}</b></div><div><span>찾은 짝</span><b id="memFound">${M.found||0}/${L.pairs}</b></div><div><span>최고</span><b>${best?best+"번":"-"}</b></div></div>
    <div class="membox">${playing?`<div class="memgrid" style="--cols:${L.cols}">${M.cards.map(c=>`<button class="memcard" data-mem="${c.i}"><span class="memin"><span class="memback"></span><span class="memfront">${memFace(c)}</span></span></button>`).join("")}</div>`:""}
      <div class="skover" id="memOver" ${playing&&M.state==="play"?"hidden":""}>${playing?"":`<div class="skocard"><h3>짝 맞추기</h3><p style="margin:0">카드를 두 장씩 뒤집어서<br>같은 드래곤을 찾아요.<br>적게 뒤집을수록 잘한 거예요!</p><button class="btn" id="memGo">시작</button></div>`}</div></div>
    <p class="note" style="margin:0;text-align:center">다 찾으면 클릭커 물고기를 받아요.${memPool().length<L.pairs?" 뽑은 드래곤이나 올린 사진이 모자라는 만큼은 숫자 카드가 나와요.":""}</p></div>`;
  bindMgTabs();
  el.querySelectorAll("[data-memlv]").forEach(b=>b.onclick=()=>{ if(M.lv===b.dataset.memlv) return; M={state:"ready",lv:b.dataset.memlv}; try{ localStorage.setItem("httyd-memlv",M.lv); }catch(e){} renderMem(); });
  el.querySelectorAll("[data-mem]").forEach(b=>{ b.addEventListener("pointerdown",e=>{ e.preventDefault(); memFlip(+b.dataset.mem); }); b.addEventListener("keydown",e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); memFlip(+b.dataset.mem); } }); });
  if(playing) M.cards.forEach(c=>memCardEl(c.i));
  const go=$("#memGo"); if(go) go.onclick=memStart;
  if(M.state==="over"){ const o=$("#memOver"); o.hidden=false; o.innerHTML=`<div class="skocard"><h3>다 찾았어요!</h3><p class="skobig">${M.moves}번</p><button class="btn" id="memAgain">한 판 더</button></div>`; $("#memAgain").onclick=memStart; }
}

/* ===== 미니게임 공용: 캔버스 게임 틀 ===== */
const GW=420, GH=700;
const MG_GAMES={}; let mgRaf=0, mgLast=0;
function mgTick(t){ mgRaf=requestAnimationFrame(mgTick); const g=MG_GAMES[mgMode];
  if(!g||view!=="click"||document.hidden||!$("#"+mgMode+"Canvas")){ mgLast=t; return; }
  const dt=Math.min(2.2,(t-(mgLast||t))/16.67); mgLast=t; g.step(dt,t); }
function mgMount(key,hud,help){
  const el=$("#clickView"); if(!el) return null;
  el.innerHTML=mgTabsHtml()+`<div class="skwrap"><div class="skhud">${hud}</div>
    <div class="skbox flybox"><canvas id="${key}Canvas"></canvas><div class="skover" id="${key}Over" hidden></div></div>
    <p class="note" style="margin:0;text-align:center">${help}</p></div>`;
  bindMgTabs();
  const cv=$("#"+key+"Canvas"), dpr=Math.min(3,window.devicePixelRatio||1); cv.width=GW*dpr; cv.height=GH*dpr;
  if(!mgRaf) mgRaf=requestAnimationFrame(mgTick);
  return cv;
}
function mgCtx(cv){ const c=cv.getContext("2d"), d=cv.width/GW; c.setTransform(d,0,0,d,0,0); return c; }
function mgPt(cv,e){ const r=cv.getBoundingClientRect(); return {x:(e.clientX-r.left)/r.width*GW,y:(e.clientY-r.top)/r.height*GH}; }
function mgOver(key,title,big,lines,again){ const o=$("#"+key+"Over"); if(!o) return; o.hidden=false;
  o.innerHTML=`<div class="skocard"><h3>${title}</h3><p class="skobig">${big}</p>${lines.map(l=>`<p style="margin:0">${l}</p>`).join("")}<button class="btn" id="${key}Again">한 판 더</button></div>`;
  $("#"+key+"Again").onclick=e=>{ e.stopPropagation(); o.hidden=true; again(); }; if(MG_KEY2GAME[key]) brag(key+"Over",MG_KEY2GAME[key],MG_SCORE[key]()); }
function mgSet(id,v){ const e=$("#"+id); if(e) e.textContent=v; }
function mgSky(ctx,top,bottom){ const g=ctx.createLinearGradient(0,0,0,GH); g.addColorStop(0,top); g.addColorStop(1,bottom); ctx.fillStyle=g; ctx.fillRect(0,0,GW,GH); }
function mgTapText(ctx,txt,y){ ctx.fillStyle="rgba(20,32,40,.62)"; ctx.beginPath(); ctx.roundRect(60,y,300,60,16); ctx.fill();
  ctx.fillStyle="#fff"; ctx.font="bold 22px sans-serif"; ctx.textAlign="center"; ctx.textBaseline="middle"; ctx.fillText(txt,GW/2,y+30); }
const VIKING_IMG=new Image(); VIKING_IMG.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(VIKING_SVG.replace("<svg ",'<svg xmlns="http://www.w3.org/2000/svg" '));
function mgFish(ctx,x,y){ ctx.save(); ctx.translate(x,y); ctx.fillStyle="#E9A23B"; ctx.beginPath(); ctx.ellipse(0,0,15,9,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.moveTo(12,0); ctx.lineTo(22,-8); ctx.lineTo(22,8); ctx.closePath(); ctx.fill(); ctx.fillStyle="#1b2a33"; ctx.beginPath(); ctx.arc(-7,-2,2,0,Math.PI*2); ctx.fill(); ctx.restore(); }

/* ===== 5. 드래곤 달리기: 누르면 점프 (공중에서 한 번 더 점프 가능) ===== */
const RG=560, RR=28, RX=100;
let R=null;
function runNew(){ return {state:"ready",y:RG-RR,vy:0,jumps:0,obs:[],fish:[],dist:0,caught:0,next:500,t:0}; }
function runJump(){ if(!R||R.state==="over") return; if(R.state==="ready") R.state="play";
  if(R.jumps<2){ R.vy=R.jumps?-11:-13.5; R.jumps++; } }
function runEnd(){ R.state="over"; const m=Math.floor(R.dist/20);
  const fish=miniGiveFish(Math.floor(m/5)*Math.max(1,tapValue())+R.caught*3*Math.max(1,tapValue()));
  const nb=m>(mini.runBest||0); if(nb) mini.runBest=m; saveMiniAll(); mgSet("runBest",(mini.runBest||0)+"m");
  mgOver("run",nb?"최고 기록!":"꽈당!",m+"m",[`물고기 ${R.caught}개 주웠어요`,`${FISH_SVG} 클릭커 물고기 ${fmt(fish)}마리 받았어요`],()=>{ R=runNew(); }); }
MG_GAMES.run={step(dt){
  const cv=$("#runCanvas"), ctx=mgCtx(cv); R.t+=dt;
  const sp=5+Math.min(5,R.dist/3000);
  if(R.state==="play"){
    R.vy+=0.72*dt; R.y+=R.vy*dt; if(R.y>=RG-RR){ R.y=RG-RR; R.vy=0; R.jumps=0; }
    R.dist+=sp*dt; R.next-=sp*dt;
    if(R.next<=0){ const big=Math.random()<Math.min(.5,R.dist/8000+.15), w=big?54:34+Math.random()*16, h=big?78:40+Math.random()*25;
      R.obs.push({x:GW+20,w,h}); if(Math.random()<.25&&R.dist>2500) R.obs.push({x:GW+20+w+150+Math.random()*60,w:34,h:44});
      if(Math.random()<.5) R.fish.push({x:GW+20+w/2,y:RG-h-110-Math.random()*60});
      R.next=280+Math.random()*260+sp*12; }
    for(const o of R.obs) o.x-=sp*dt; for(const f of R.fish) f.x-=sp*dt;
    R.obs=R.obs.filter(o=>o.x+o.w>-20);
    for(const f of R.fish){ if(!f.got&&Math.hypot(f.x-RX,f.y-R.y)<RR+16){ f.got=true; R.caught++; } }
    R.fish=R.fish.filter(f=>f.x>-30&&!f.got);
    for(const o of R.obs){ const cx=Math.max(o.x,Math.min(RX,o.x+o.w)), cy=Math.max(RG-o.h,Math.min(R.y,RG)); if(Math.hypot(RX-cx,R.y-cy)<RR-7){ runEnd(); break; } }
    mgSet("runM",Math.floor(R.dist/20)+"m"); mgSet("runFish",R.caught);
  } else if(R.state==="ready"){ R.y=RG-RR; }
  mgSky(ctx,"#7FB8D6","#F3E6C8");
  ctx.fillStyle="#FFE7A6"; ctx.beginPath(); ctx.arc(330,100,30,0,Math.PI*2); ctx.fill();
  const off=(R.dist*0.3)%240; ctx.fillStyle="#8AA3AD"; ctx.beginPath(); ctx.moveTo(-240-off,RG);
  for(let x=-240-off;x<GW+240;x+=240){ ctx.lineTo(x+70,RG-170); ctx.lineTo(x+130,RG-110); ctx.lineTo(x+180,RG-200); ctx.lineTo(x+240,RG); } ctx.closePath(); ctx.fill();
  ctx.fillStyle="#5E8C46"; ctx.fillRect(0,RG,GW,14); ctx.fillStyle="#7A5434"; ctx.fillRect(0,RG+14,GW,GH-RG-14);
  ctx.fillStyle="rgba(0,0,0,.15)"; for(let x=-(R.dist%60);x<GW;x+=60) ctx.fillRect(x,RG+30,26,6);
  for(const o of R.obs){ ctx.fillStyle="#6E6A64"; ctx.strokeStyle="#3B3733"; ctx.lineWidth=3; ctx.beginPath();
    ctx.moveTo(o.x,RG); ctx.lineTo(o.x+o.w*.15,RG-o.h*.7); ctx.lineTo(o.x+o.w*.5,RG-o.h); ctx.lineTo(o.x+o.w*.85,RG-o.h*.65); ctx.lineTo(o.x+o.w,RG); ctx.closePath(); ctx.fill(); ctx.stroke(); }
  for(const f of R.fish) mgFish(ctx,f.x,f.y+Math.sin((R.t+f.x)/8)*4);
  const tg=ckTarget(); const bob=R.state!=="play"||R.y<RG-RR-1?0:Math.sin(R.t/3)*2;
  ctx.fillStyle="rgba(0,0,0,.18)"; ctx.beginPath(); ctx.ellipse(RX,RG+4,RR*(1-(RG-RR-R.y)/400),6,0,0,Math.PI*2); ctx.fill();
  drawRoundImg(ctx,tg&&tg.url,RX,R.y+bob,RR,"#22313A");
  if(R.state==="ready") mgTapText(ctx,"눌러서 출발 · 점프",240);
}};
function renderRun(){ if(!R) R=runNew(); if(R.state==="over") R=runNew();
  const cv=mgMount("run",`<div><span>달린 거리</span><b id="runM">0m</b></div><div><span>최고</span><b id="runBest">${mini.runBest||0}m</b></div><div><span>물고기</span><b id="runFish">0</b></div>`,
    "화면을 누르면 점프해요. 공중에서 한 번 더 누르면 한 번 더 뛰어요. 바위에 부딪히면 끝나요.");
  if(!cv) return; cv.addEventListener("pointerdown",e=>{ e.preventDefault(); runJump(); }); }

/* ===== 6. 하늘 탑 쌓기: 움직이는 블록을 눌러서 떨어뜨려요. 삐져나온 만큼 잘려요 ===== */
const SBH=34, SBASE=GH-70;
let T=null;
function stkNew(){ return {state:"ready",blocks:[{x:100,w:220}],cur:{x:0,w:220,dir:1},cam:0,cuts:[],perfect:0,t:0,flash:0}; }
function stkDrop(){
  if(!T||T.state==="over") return; if(T.state==="ready"){ T.state="play"; return; }
  const prev=T.blocks[T.blocks.length-1], c=T.cur;
  const left=Math.max(c.x,prev.x), right=Math.min(c.x+c.w,prev.x+prev.w);
  if(right-left<=0){ T.cuts.push({x:c.x,w:c.w,y:stkY(T.blocks.length),vy:0}); stkEnd(); return; }
  if(Math.abs(c.x-prev.x)<7){ T.perfect++; T.flash=20; let w=prev.w; if(T.perfect>=3) w=Math.min(220,w+12); T.blocks.push({x:prev.x-(w-prev.w)/2,w}); }
  else { T.perfect=0; if(c.x<left) T.cuts.push({x:c.x,w:left-c.x,y:stkY(T.blocks.length),vy:0}); if(c.x+c.w>right) T.cuts.push({x:right,w:c.x+c.w-right,y:stkY(T.blocks.length),vy:0}); T.blocks.push({x:left,w:right-left}); }
  const n=T.blocks.length, top=T.blocks[n-1]; T.cur={x:n%2?-top.w:GW,w:top.w,dir:n%2?1:-1};
  mgSet("stkN",n-1);
}
function stkY(i){ return SBASE-i*SBH; }
function stkEnd(){ T.state="over"; const n=T.blocks.length-1;
  const fish=miniGiveFish(n*Math.max(1,tapValue())); const nb=n>(mini.stackBest||0); if(nb) mini.stackBest=n; saveMiniAll(); mgSet("stkBest",(mini.stackBest||0)+"층");
  setTimeout(()=>mgOver("stack",nb?"최고 기록!":"와르르!",n+"층",[`${FISH_SVG} 클릭커 물고기 ${fmt(fish)}마리 받았어요`],()=>{ T=stkNew(); mgSet("stkN",0); }),700); }
const STK_COL=["#B5651D","#C97B3A","#8C5A2B","#D9A066","#A0522D"];
MG_GAMES.stack={step(dt){
  const cv=$("#stackCanvas"), ctx=mgCtx(cv); T.t+=dt; const n=T.blocks.length;
  if(T.state==="play"){ const sp=(2.6+Math.min(4,n*0.12))*dt; T.cur.x+=T.cur.dir*sp;
    if(T.cur.x>GW-T.cur.w*0.15&&T.cur.dir>0) T.cur.dir=-1; if(T.cur.x<-T.cur.w*0.85&&T.cur.dir<0) T.cur.dir=1; }
  const want=Math.max(0,n*SBH-360); T.cam+=(want-T.cam)*0.08*dt;
  for(const c of T.cuts){ c.vy+=0.6*dt; c.y+=c.vy*dt; } T.cuts=T.cuts.filter(c=>c.y-T.cam<GH+80);
  const h=Math.min(1,T.cam/3000); mgSky(ctx,`rgb(${Math.round(127-90*h)},${Math.round(184-140*h)},${Math.round(214-120*h)})`,"#F3E6C8");
  ctx.save(); ctx.translate(0,T.cam);
  ctx.fillStyle="#5E8C46"; ctx.fillRect(0,SBASE+SBH,GW,20); ctx.fillStyle="#7A5434"; ctx.fillRect(0,SBASE+SBH+20,GW,400);
  const plank=(x,y,w,i)=>{ ctx.fillStyle=STK_COL[i%STK_COL.length]; ctx.fillRect(x,y,w,SBH-2); ctx.fillStyle="rgba(0,0,0,.18)"; ctx.fillRect(x,y+SBH-8,w,6);
    ctx.fillStyle="rgba(255,255,255,.18)"; ctx.fillRect(x,y,w,4); ctx.strokeStyle="#4E311C"; ctx.lineWidth=2; ctx.strokeRect(x+1,y+1,w-2,SBH-4); };
  T.blocks.forEach((b,i)=>plank(b.x,stkY(i),b.w,i));
  for(const c of T.cuts) plank(c.x,c.y,c.w,n);
  if(T.state!=="over"){ plank(T.cur.x,stkY(n),T.cur.w,n); }
  const top=T.blocks[n-1], tg=ckTarget(); drawRoundImg(ctx,tg&&tg.url,top.x+top.w/2,stkY(n-1)-22,20,"#22313A");
  ctx.restore();
  if(T.flash>0){ T.flash-=dt; ctx.fillStyle=`rgba(255,211,77,${T.flash/40})`; ctx.fillRect(0,0,GW,GH); ctx.fillStyle="#fff"; ctx.font="bold 26px sans-serif"; ctx.textAlign="center"; ctx.fillText(T.perfect>=3?"완벽! 블록이 넓어져요":"완벽!",GW/2,120); }
  if(T.state==="ready") mgTapText(ctx,"눌러서 시작",220);
}};
function renderStack(){ if(!T||T.state==="over") T=stkNew();
  const cv=mgMount("stack",`<div><span>쌓은 층</span><b id="stkN">${T.blocks.length-1}</b></div><div><span>최고</span><b id="stkBest">${mini.stackBest||0}층</b></div>`,
    "움직이는 나무 블록이 아래 블록 위에 왔을 때 눌러요. 삐져나온 부분은 잘려 나가요. 딱 맞추면 '완벽!', 3번 연속이면 블록이 넓어져요.");
  if(!cv) return; cv.addEventListener("pointerdown",e=>{ e.preventDefault(); stkDrop(); }); }

/* ===== 4. 불 뿜기 과녁: 뒤로 끌었다 놓으면 불덩이가 날아가 바이킹을 맞혀요 ===== */
const SL={x:86,y:470}, SGROUND=640, SPULL=120;
let S=null;
function slNew(){ return {state:"aim",level:1,score:0,kills:0,world:null,shots:0,ball:null,drag:null,wait:0,clearT:0,levelT:0}; }
function slBuild(){
  const {Engine,Bodies,Composite,Events}=Matter;
  const eng=Engine.create({enableSleeping:true}); S.engine=eng; S.vikings=[]; S.planks=[]; S.levelT=performance.now();
  Composite.add(eng.world,[Bodies.rectangle(GW/2,SGROUND+30,GW*3,60,{isStatic:true,friction:.9,label:"ground"})]);
  const lv=S.level, towers=lv>=3?2:1, floors=Math.min(3,1+Math.floor((lv-1)/2));
  const xs=towers===1?[310]:[255,365];
  for(const cx of xs){ let base=SGROUND; const fl=Math.max(1,floors-(towers===2&&Math.random()<.4?1:0));
    for(let f=0;f<fl;f++){ const opt={friction:.8,density:.0015,label:"plank"};
      const p1=Bodies.rectangle(cx-34,base-35,12,70,opt), p2=Bodies.rectangle(cx+34,base-35,12,70,opt), bm=Bodies.rectangle(cx,base-76,96,12,opt);
      S.planks.push(p1,p2,bm); Composite.add(eng.world,[p1,p2,bm]);
      if(f===0||Math.random()<.5){ const v=Bodies.circle(cx,base-16,15,{friction:.6,density:.001,label:"viking"}); S.vikings.push(v); Composite.add(eng.world,v); }
      base-=82; }
    if(lv>=2){ const v=Bodies.circle(cx,base-16,15,{friction:.6,density:.001,label:"viking"}); S.vikings.push(v); Composite.add(eng.world,v); } }
  S.shots=S.vikings.length+2; S.ball=null; S.state="aim";
  Events.on(eng,"collisionStart",ev=>{ if(performance.now()-S.levelT<900) return;
    for(const p of ev.pairs){ for(const [v,o] of [[p.bodyA,p.bodyB],[p.bodyB,p.bodyA]]){ if(v.label!=="viking"||v.dead) continue;
      const rv=Math.hypot(v.velocity.x-o.velocity.x,v.velocity.y-o.velocity.y); if(rv>(o.label==="ball"?1.5:3.2)) slKill(v); } } });
  mgSet("slLv",S.level); mgSet("slShots",S.shots);
}
function slKill(v){ if(v.dead) return; v.dead=true; S.kills++; S.score+=100; S.pops=(S.pops||[]); S.pops.push({x:v.position.x,y:v.position.y,t:0});
  setTimeout(()=>{ try{ Matter.Composite.remove(S.engine.world,v); }catch(e){} },60); mgSet("slScore",S.score); }
function slShoot(pull){
  const b=Matter.Bodies.circle(SL.x,SL.y,16,{density:.004,frictionAir:0,restitution:.3,label:"ball"});
  Matter.Composite.add(S.engine.world,b); Matter.Body.setVelocity(b,{x:pull.x*0.1,y:pull.y*0.1});
  S.ball=b; S.shots--; S.state="fly"; S.wait=0; S.flyT=performance.now(); mgSet("slShots",S.shots); }
function slEnd(){ S.state="over"; const fish=miniGiveFish(S.kills*2*Math.max(1,tapValue()));
  const nb=S.score>(mini.slingBest||0); if(nb) mini.slingBest=S.score; saveMiniAll(); mgSet("slBest",mini.slingBest||0);
  mgOver("sling",nb?"최고 기록!":"불덩이를 다 썼어요",S.score+"점",[`${S.level}단계까지 · 바이킹 ${S.kills}명`,`${FISH_SVG} 클릭커 물고기 ${fmt(fish)}마리 받았어요`],()=>{ S=slNew(); slBuild(); mgSet("slScore",0); }); }
MG_GAMES.sling={step(dt,t){
  const cv=$("#slingCanvas"), ctx=mgCtx(cv);
  if(!S.engine) slBuild();
  if(S.state!=="over") Matter.Engine.update(S.engine,16.67);
  for(const v of S.vikings) if(!v.dead&&(v.position.y>GH+40||v.position.x<-40||v.position.x>GW+40)) slKill(v);
  const alive=S.vikings.filter(v=>!v.dead).length;
  if(S.state==="fly"){ const b=S.ball, sp=Math.hypot(b.velocity.x,b.velocity.y);
    S.wait=sp<0.4?S.wait+dt:0;
    if(S.wait>40||b.position.x>GW+60||b.position.x<-60||b.position.y>GH+60||performance.now()-S.flyT>6000){
      Matter.Composite.remove(S.engine.world,b); S.ball=null; S.state="settle"; S.settleT=performance.now(); } }
  if(S.state==="settle"&&performance.now()-S.settleT>700){
    if(!alive){ S.score+=S.shots*50; mgSet("slScore",S.score); S.state="clear"; S.clearT=performance.now(); }
    else if(S.shots<=0) slEnd(); else S.state="aim"; }
  if(S.state==="aim"&&!alive&&performance.now()-S.levelT>1200){ S.state="clear"; S.clearT=performance.now(); }
  if(S.state==="clear"&&performance.now()-S.clearT>1300){ S.level++; slBuild(); }
  // 그리기
  mgSky(ctx,"#E9A06B","#F7E2C2");
  ctx.fillStyle="#9A8478"; ctx.beginPath(); ctx.moveTo(0,SGROUND); ctx.lineTo(120,SGROUND-160); ctx.lineTo(230,SGROUND-60); ctx.lineTo(330,SGROUND-190); ctx.lineTo(GW,SGROUND-80); ctx.lineTo(GW,SGROUND); ctx.fill();
  ctx.fillStyle="#5E8C46"; ctx.fillRect(0,SGROUND,GW,12); ctx.fillStyle="#7A5434"; ctx.fillRect(0,SGROUND+12,GW,GH);
  ctx.fillStyle="#6E6A64"; ctx.beginPath(); ctx.moveTo(30,SGROUND); ctx.lineTo(45,SL.y+40); ctx.lineTo(130,SL.y+40); ctx.lineTo(145,SGROUND); ctx.fill();
  for(const p of S.planks){ ctx.save(); ctx.translate(p.position.x,p.position.y); ctx.rotate(p.angle);
    const w=p.bounds.max.x-p.bounds.min.x, h=p.bounds.max.y-p.bounds.min.y; const vs=p.vertices, ww=Math.hypot(vs[1].x-vs[0].x,vs[1].y-vs[0].y), hh=Math.hypot(vs[2].x-vs[1].x,vs[2].y-vs[1].y);
    ctx.fillStyle="#B5651D"; ctx.fillRect(-ww/2,-hh/2,ww,hh); ctx.strokeStyle="#4E311C"; ctx.lineWidth=2; ctx.strokeRect(-ww/2,-hh/2,ww,hh); ctx.restore(); }
  for(const v of S.vikings){ if(v.dead) continue; ctx.save(); ctx.translate(v.position.x,v.position.y); ctx.rotate(v.angle);
    ctx.fillStyle="#D9E6EC"; ctx.beginPath(); ctx.arc(0,0,15,0,Math.PI*2); ctx.fill(); if(VIKING_IMG.complete) ctx.drawImage(VIKING_IMG,-17,-19,34,34); ctx.restore(); }
  S.pops=(S.pops||[]).filter(p=>(p.t+=dt)<30);
  for(const p of S.pops){ ctx.globalAlpha=1-p.t/30; ctx.fillStyle="#FFD34D"; ctx.font="bold 22px sans-serif"; ctx.textAlign="center"; ctx.fillText("+100",p.x,p.y-20-p.t); ctx.globalAlpha=1; }
  const tg=ckTarget(); drawRoundImg(ctx,tg&&tg.url,SL.x-42,SL.y+8,24,"#22313A");
  const fire=(x,y,r)=>{ const g=ctx.createRadialGradient(x-4,y-4,2,x,y,r+6); g.addColorStop(0,"#FFF4B0"); g.addColorStop(.45,"#FFB02E"); g.addColorStop(1,"rgba(224,72,40,.2)");
    ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x,y,r+6,0,Math.PI*2); ctx.fill(); };
  if(S.state==="aim"){ const d=S.drag; let bx=SL.x, by=SL.y;
    if(d){ const L=Math.min(SPULL,Math.hypot(d.px,d.py)), a=Math.atan2(d.py,d.px); bx=SL.x-Math.cos(a)*L*0.5; by=SL.y-Math.sin(a)*L*0.5;
      let x=SL.x,y=SL.y,vx=Math.cos(a)*L*0.1,vy=Math.sin(a)*L*0.1; ctx.fillStyle="rgba(255,255,255,.8)";
      for(let i=0;i<60;i++){ x+=vx; y+=vy; vy+=0.278; if(i%4===3){ ctx.beginPath(); ctx.arc(x,y,3,0,Math.PI*2); ctx.fill(); } if(y>SGROUND) break; }
      ctx.strokeStyle="#4E311C"; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(SL.x-14,SL.y-6); ctx.lineTo(bx,by); ctx.lineTo(SL.x+14,SL.y-6); ctx.stroke(); }
    fire(bx,by,16); }
  if(S.ball) fire(S.ball.position.x,S.ball.position.y,16);
  for(let i=0;i<S.shots-(S.state==="aim"?1:0);i++) fire(24+i*26,30,7);
  if(S.state==="clear") mgTapText(ctx,`${S.level}단계 성공!`,230);
  if(S.state==="aim"&&S.level===1&&S.shots===S.vikings.length+2&&!S.drag) mgTapText(ctx,"뒤로 끌었다가 놓기",230);
}};
function renderSling(){
  if(!window.Matter){ const el=$("#clickView"); el.innerHTML=mgTabsHtml()+`<div class="empty"><h2>게임을 불러오지 못했어요</h2><p class="note">인터넷 연결을 확인하고 다시 열어 주세요.</p></div>`; bindMgTabs(); return; }
  if(!S||S.state==="over"){ S=slNew(); }
  const cv=mgMount("sling",`<div><span>점수</span><b id="slScore">${S.score}</b></div><div><span>단계</span><b id="slLv">${S.level}</b></div><div><span>불덩이</span><b id="slShots">${S.shots}</b></div><div><span>최고</span><b id="slBest">${mini.slingBest||0}</b></div>`,
    "화면 아무 데나 누른 채 뒤로 끌었다가 놓으면 불덩이가 날아가요. 바이킹을 모두 맞히면 다음 단계예요.");
  if(!cv) return;
  let start=null;
  cv.addEventListener("pointerdown",e=>{ e.preventDefault(); if(S.state!=="aim") return; start=mgPt(cv,e); S.drag={px:0,py:0}; try{cv.setPointerCapture(e.pointerId);}catch(_){} });
  cv.addEventListener("pointermove",e=>{ if(!start||!S.drag) return; const p=mgPt(cv,e); S.drag={px:start.x-p.x,py:start.y-p.y}; });
  cv.addEventListener("pointerup",()=>{ if(!start||!S.drag) return; const d=S.drag; start=null; S.drag=null; const L=Math.min(SPULL,Math.hypot(d.px,d.py));
    if(L<15||S.state!=="aim") return; const a=Math.atan2(d.py,d.px); slShoot({x:Math.cos(a)*L,y:Math.sin(a)*L}); });
  cv.addEventListener("pointercancel",()=>{ start=null; S.drag=null; });
}

/* ===== 3. 순서 기억하기: 드래곤이 반짝인 순서대로 눌러요 ===== */
let SM={state:"ready",seq:[],pos:0,round:0}, smAudio=null;
const SM_COL=["#E4572E","#3FA7D6","#9BC53D","#F2C14E"], SM_HZ=[329.6,392,523.3,659.3];
function smTone(i,ms){ try{ smAudio=smAudio||new (window.AudioContext||window.webkitAudioContext)(); const o=smAudio.createOscillator(), g=smAudio.createGain();
  o.type="triangle"; o.frequency.value=SM_HZ[i]; g.gain.setValueAtTime(.0001,smAudio.currentTime); g.gain.exponentialRampToValueAtTime(.25,smAudio.currentTime+.02); g.gain.exponentialRampToValueAtTime(.0001,smAudio.currentTime+ms/1000);
  o.connect(g).connect(smAudio.destination); o.start(); o.stop(smAudio.currentTime+ms/1000+.05); }catch(e){} }
function smLight(i,ms){ const b=document.querySelector(`[data-sm="${i}"]`); if(!b) return; b.classList.add("lit"); smTone(i,ms); setTimeout(()=>b.classList.remove("lit"),ms); }
function smMsg(t){ mgSet("smMsg",t); }
function smStart(){ SM={state:"show",seq:[],pos:0,round:0}; const o=$("#smOver"); if(o) o.hidden=true; smNext(); }
function smNext(){ SM.seq.push(Math.floor(Math.random()*4)); SM.pos=0; SM.state="show"; smMsg("잘 보세요…"); mgSet("smRound",SM.seq.length);
  const step=Math.max(320,620-SM.seq.length*25); let k=0;
  const go=()=>{ if(SM.state!=="show"||mgMode!=="simon") return; if(k>=SM.seq.length){ SM.state="input"; smMsg("이제 따라 눌러요!"); return; }
    smLight(SM.seq[k],step*0.7); k++; setTimeout(go,step); };
  setTimeout(go,700); }
function smPress(i){
  if(SM.state!=="input") return; smLight(i,220);
  if(SM.seq[SM.pos]!==i){ smEnd(); return; }
  SM.pos++; if(SM.pos>=SM.seq.length){ SM.round=SM.seq.length; SM.state="wait"; smMsg("맞았어요!"); setTimeout(smNext,700); } }
function smEnd(){ SM.state="over"; const n=SM.round;
  const fish=miniGiveFish(n*2*Math.max(1,tapValue())); const nb=n>(mini.simonBest||0); if(nb) mini.simonBest=n; saveMiniAll(); mgSet("smBest",mini.simonBest||0);
  smMsg("앗, 순서가 달라요"); setTimeout(()=>mgOver("sm",nb?"최고 기록!":"아쉬워요!",n+"개 기억",[`${FISH_SVG} 클릭커 물고기 ${fmt(fish)}마리 받았어요`],smStart),500); }
function renderSimon(){
  const el=$("#clickView"); if(!el) return; const pool=memPool();
  el.innerHTML=mgTabsHtml()+`<div class="skwrap">
    <div class="skhud"><div><span>지금 길이</span><b id="smRound">${SM.seq.length||0}</b></div><div><span>최고</span><b id="smBest">${mini.simonBest||0}</b></div></div>
    <div class="smbox"><p class="smmsg" id="smMsg">드래곤이 반짝인 순서를 기억해요</p>
      <div class="smgrid">${[0,1,2,3].map(i=>`<button class="smpad" data-sm="${i}" style="--c:${SM_COL[i]}" aria-label="${i+1}번 드래곤">${pool[i]?`<img src="${pool[i].url}" alt="" draggable="false">`:`<b>${i+1}</b>`}</button>`).join("")}</div>
      <div class="skover" id="smOver" ${SM.state==="ready"||SM.state==="over"?"":"hidden"}><div class="skocard"><h3>순서 기억하기</h3><p style="margin:0">드래곤이 반짝이는 순서를 잘 보고<br>똑같이 눌러요. 소리도 나요!</p><button class="btn" id="smGo">시작</button></div></div></div>
    <p class="note" style="margin:0;text-align:center">한 번 맞힐 때마다 순서가 하나씩 길어져요. 기억한 만큼 클릭커 물고기를 받아요.</p></div>`;
  bindMgTabs();
  el.querySelectorAll("[data-sm]").forEach(b=>b.addEventListener("pointerdown",e=>{ e.preventDefault(); smPress(+b.dataset.sm); }));
  $("#smGo").onclick=smStart;
  if(SM.state!=="ready"&&SM.state!=="over"){ SM={state:"ready",seq:[],pos:0,round:0}; $("#smOver").hidden=false; }
}

/* ===== 4. 알 받기: 바구니를 움직여 드래곤 알을 받아요. 폭탄은 피해요 ===== */
const EB_Y=610, EB_W=96;
let E=null;
function eggNew(){ return {state:"ready",bx:GW/2,eggs:[],score:0,hearts:3,missed:0,t:0,next:40,caught:0,shake:0}; }
function eggEnd(){ E.state="over"; const fish=miniGiveFish(E.score*Math.max(1,tapValue()));
  const nb=E.score>(mini.eggBest||0); if(nb) mini.eggBest=E.score; saveMiniAll(); mgSet("eggBest",mini.eggBest||0);
  mgOver("egg",nb?"최고 기록!":"끝!",E.score+"점",[`알 ${E.caught}개 받았어요`,`${FISH_SVG} 클릭커 물고기 ${fmt(fish)}마리 받았어요`],()=>{ E=eggNew(); mgSet("eggScore",0); mgSet("eggHeart","♥♥♥"); }); }
MG_GAMES.egg={step(dt){
  const ctx=mgCtx($("#eggCanvas")); E.t+=dt;
  if(E.state==="play"){ const lvl=Math.min(1,E.t/3600);
    E.next-=dt; if(E.next<=0){ const r=Math.random(), bomb=r<.12+lvl*.13, gold=!bomb&&r>.92;
      E.eggs.push({x:30+Math.random()*(GW-60),y:-30,vy:(2.4+lvl*4.5)*(0.85+Math.random()*.3),type:bomb?"bomb":gold?"gold":"egg",rot:Math.random()*6});
      E.next=Math.max(16,52-lvl*34)*(0.7+Math.random()*.6); }
    for(const g of E.eggs){ g.y+=g.vy*dt; g.rot+=0.03*dt;
      if(!g.done&&g.y>EB_Y-18&&g.y<EB_Y+20&&Math.abs(g.x-E.bx)<EB_W/2+6){ g.done=true;
        if(g.type==="bomb"){ E.hearts--; E.shake=14; } else { E.score+=g.type==="gold"?5:1; E.caught++; } }
      else if(!g.done&&g.y>GH+20){ g.done=true; if(g.type!=="bomb"){ E.missed++; if(E.missed%5===0){ E.hearts--; E.shake=8; } } } }
    E.eggs=E.eggs.filter(g=>!g.done);
    mgSet("eggScore",E.score); mgSet("eggHeart","♥".repeat(Math.max(0,E.hearts))+"♡".repeat(Math.max(0,3-E.hearts)));
    if(E.hearts<=0) eggEnd(); }
  const sx=E.shake>0?(Math.random()-.5)*E.shake:0; E.shake=Math.max(0,E.shake-dt);
  ctx.save(); ctx.translate(sx,0);
  mgSky(ctx,"#8EC5E0","#F6EBD3");
  ctx.fillStyle="#8AA3AD"; ctx.beginPath(); ctx.moveTo(-10,560); ctx.lineTo(90,420); ctx.lineTo(170,500); ctx.lineTo(270,380); ctx.lineTo(430,540); ctx.lineTo(430,700); ctx.lineTo(-10,700); ctx.fill();
  ctx.fillStyle="#5E8C46"; ctx.fillRect(-10,640,GW+20,70);
  for(const g of E.eggs){ ctx.save(); ctx.translate(g.x,g.y); ctx.rotate(Math.sin(g.rot)*.3);
    if(g.type==="bomb"){ ctx.fillStyle="#2B2B2B"; ctx.beginPath(); ctx.arc(0,0,17,0,Math.PI*2); ctx.fill(); ctx.strokeStyle="#7A5434"; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(6,-14); ctx.quadraticCurveTo(12,-24,4,-28); ctx.stroke();
      ctx.fillStyle=E.t%10<5?"#FFD34D":"#FF6B2E"; ctx.beginPath(); ctx.arc(4,-29,4,0,Math.PI*2); ctx.fill(); }
    else { const gold=g.type==="gold"; if(gold){ ctx.shadowColor="#FFD34D"; ctx.shadowBlur=18; }
      ctx.fillStyle=gold?"#FFD34D":"#C9E4CA"; ctx.beginPath(); ctx.ellipse(0,0,15,20,0,0,Math.PI*2); ctx.fill(); ctx.shadowBlur=0;
      ctx.fillStyle=gold?"#E0A21B":"#6FA071"; for(const [a,b,c] of [[-5,-7,3],[5,2,4],[-3,9,2.5]]){ ctx.beginPath(); ctx.arc(a,b,c,0,Math.PI*2); ctx.fill(); } }
    ctx.restore(); }
  const bx=E.bx; ctx.fillStyle="#A0652D"; ctx.beginPath(); ctx.moveTo(bx-EB_W/2,EB_Y-14); ctx.lineTo(bx+EB_W/2,EB_Y-14); ctx.lineTo(bx+EB_W/2-12,EB_Y+26); ctx.lineTo(bx-EB_W/2+12,EB_Y+26); ctx.closePath(); ctx.fill();
  ctx.strokeStyle="#6B4528"; ctx.lineWidth=2; for(let y=EB_Y-6;y<EB_Y+26;y+=8){ ctx.beginPath(); ctx.moveTo(bx-EB_W/2+6,y); ctx.lineTo(bx+EB_W/2-6,y); ctx.stroke(); }
  ctx.fillStyle="#7A4B2A"; ctx.fillRect(bx-EB_W/2-4,EB_Y-18,EB_W+8,7);
  const tg=ckTarget(); drawRoundImg(ctx,tg&&tg.url,bx+EB_W/2+6,EB_Y-30,16,"#22313A");
  ctx.restore();
  if(E.state==="ready") mgTapText(ctx,"눌러서 시작 · 좌우로 움직이기",250);
}};
function renderEgg(){ if(!E||E.state==="over") E=eggNew();
  const cv=mgMount("egg",`<div><span>점수</span><b id="eggScore">${E.score}</b></div><div><span>목숨</span><b id="eggHeart" style="color:#E4572E">${"♥".repeat(E.hearts)}${"♡".repeat(3-E.hearts)}</b></div><div><span>최고</span><b id="eggBest">${mini.eggBest||0}</b></div>`,
    "손가락으로 바구니를 좌우로 움직여 알을 받아요. 금빛 알은 5점! 폭탄을 받거나 알을 5개 놓칠 때마다 목숨이 줄어요.");
  if(!cv) return;
  const mv=e=>{ E.bx=Math.max(EB_W/2,Math.min(GW-EB_W/2,mgPt(cv,e).x)); };
  cv.addEventListener("pointerdown",e=>{ e.preventDefault(); if(E.state==="ready") E.state="play"; mv(e); try{cv.setPointerCapture(e.pointerId);}catch(_){} });
  cv.addEventListener("pointermove",e=>{ if(E.state==="play") mv(e); }); }

/* ===== 5. 불꽃 피하기: 드래곤을 끌어서 날아오는 불덩이를 피해요 ===== */
let D=null;
function dgNew(){ return {state:"ready",x:GW/2,y:GH*0.6,balls:[],fish:[],t:0,time:0,next:60,caught:0,off:null}; }
function dgEnd(){ D.state="over"; const s=Math.floor(D.time/60);
  const fish=miniGiveFish(s*Math.max(1,tapValue())+D.caught*3*Math.max(1,tapValue()));
  const nb=s>(mini.dodgeBest||0); if(nb) mini.dodgeBest=s; saveMiniAll(); mgSet("dgBest",(mini.dodgeBest||0)+"초");
  mgOver("dodge",nb?"최고 기록!":"앗 뜨거!",s+"초 버텼어요",[`물고기 ${D.caught}개 주웠어요`,`${FISH_SVG} 클릭커 물고기 ${fmt(fish)}마리 받았어요`],()=>{ D=dgNew(); mgSet("dgTime","0초"); }); }
MG_GAMES.dodge={step(dt){
  const ctx=mgCtx($("#dodgeCanvas")); D.t+=dt;
  if(D.state==="play"){ D.time+=dt; const lvl=Math.min(1,D.time/3600);
    D.next-=dt; if(D.next<=0){ const side=Math.floor(Math.random()*4); let x,y;
      if(side===0){x=Math.random()*GW;y=-20;} else if(side===1){x=GW+20;y=Math.random()*GH;} else if(side===2){x=Math.random()*GW;y=GH+20;} else {x=-20;y=Math.random()*GH;}
      const a=Math.atan2(D.y-y,D.x-x)+(Math.random()-.5)*.7, sp=2.2+lvl*4+Math.random()*1.2;
      D.balls.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,r:9+Math.random()*8}); D.next=Math.max(9,40-lvl*30)*(0.7+Math.random()*.6);
      if(Math.random()<.06) D.fish.push({x:40+Math.random()*(GW-80),y:60+Math.random()*(GH-160),t:0}); }
    for(const b of D.balls){ b.x+=b.vx*dt; b.y+=b.vy*dt; if(Math.hypot(b.x-D.x,b.y-D.y)<b.r+22-6){ dgEnd(); break; } }
    D.balls=D.balls.filter(b=>b.x>-60&&b.x<GW+60&&b.y>-60&&b.y<GH+60);
    for(const f of D.fish){ f.t+=dt; if(!f.got&&Math.hypot(f.x-D.x,f.y-D.y)<38){ f.got=true; D.caught++; } } D.fish=D.fish.filter(f=>!f.got&&f.t<420);
    mgSet("dgTime",Math.floor(D.time/60)+"초"); mgSet("dgFish",D.caught); }
  mgSky(ctx,"#2B1B2E","#7A2E1E");
  ctx.fillStyle="rgba(255,180,90,.08)"; for(let i=0;i<14;i++){ const x=(i*97+D.t*.6)%GW, y=(i*151)%GH; ctx.beginPath(); ctx.arc(x,y,2,0,Math.PI*2); ctx.fill(); }
  for(const f of D.fish) mgFish(ctx,f.x,f.y+Math.sin(f.t/8)*3);
  for(const b of D.balls){ const g=ctx.createRadialGradient(b.x,b.y,1,b.x,b.y,b.r+5); g.addColorStop(0,"#FFF4B0"); g.addColorStop(.5,"#FF9F1C"); g.addColorStop(1,"rgba(230,57,70,0)");
    ctx.fillStyle=g; ctx.beginPath(); ctx.arc(b.x,b.y,b.r+5,0,Math.PI*2); ctx.fill(); }
  const tg=ckTarget(); drawRoundImg(ctx,tg&&tg.url,D.x,D.y,22,"#3FA7D6");
  if(D.state==="ready") mgTapText(ctx,"드래곤을 끌어서 피하기",GH*0.35);
}};
function renderDodge(){ if(!D||D.state==="over") D=dgNew();
  const cv=mgMount("dodge",`<div><span>버틴 시간</span><b id="dgTime">${Math.floor(D.time/60)}초</b></div><div><span>최고</span><b id="dgBest">${mini.dodgeBest||0}초</b></div><div><span>물고기</span><b id="dgFish">${D.caught}</b></div>`,
    "화면 어디든 누른 채 움직이면 드래곤이 따라 움직여요. 불덩이에 닿으면 끝! 가끔 나오는 물고기도 주워요.");
  if(!cv) return;
  cv.addEventListener("pointerdown",e=>{ e.preventDefault(); const p=mgPt(cv,e); D.off={x:D.x-p.x,y:D.y-p.y}; if(D.state==="ready") D.state="play"; try{cv.setPointerCapture(e.pointerId);}catch(_){} });
  cv.addEventListener("pointermove",e=>{ if(!D.off||D.state!=="play") return; const p=mgPt(cv,e); D.x=Math.max(22,Math.min(GW-22,p.x+D.off.x)); D.y=Math.max(22,Math.min(GH-22,p.y+D.off.y)); });
  const up=()=>{ D.off=null; }; cv.addEventListener("pointerup",up); cv.addEventListener("pointercancel",up); }

/* ===== 8+. 버크 만들기: 물고기로 건물을 지어 나만의 버크 마을을 키워요. 건물이 시간마다 물고기를 모아 줘요 ===== */
const BK_MAP=["~~~~~~~","~~LLL~~","~LLLLL~","LLLLLL~","~LLLLLL","~LLLLL~","LLLLLL~","~LLLL~~","~~~~~~~"];
const BK_C=7, BK_R=BK_MAP.length, BK_CAP=8*60; // 최대 8시간 모아 둬요
const BK_B={
  house:{name:"바이킹 집",ico:"🏠",cost:50,rate:1,desc:"물고기를 조금씩 모아요. 그레이트 홀 옆이면 +30%."},
  fishery:{name:"어부 오두막",ico:"🎣",cost:120,rate:3,desc:"바다 옆에 지으면 2배로 잡아요."},
  farm:{name:"양 목장",ico:"🐑",cost:300,rate:6,desc:"옆에 붙은 바이킹 집 하나마다 +20%."},
  forge:{name:"대장간",ico:"⚒️",cost:600,rate:0,desc:"직접 모으지는 않지만, 상하좌우 건물을 +25%씩 도와줘요."},
  stable:{name:"드래곤 우리",ico:"🐉",cost:900,rate:3,desc:"드래곤을 넣으면 등급만큼 더 모아요 (희귀 +5, 영웅 +12, 전설 +30)."},
  hall:{name:"그레이트 홀",ico:"🏛️",cost:2500,rate:10,unique:true,desc:"버크의 중심. 레벨마다 마을 전체 +10%. 경기장을 지으려면 먼저 필요해요."},
  arena:{name:"드래곤 경기장",ico:"🏟️",cost:8000,rate:30,need:"hall",desc:"옆에 붙은 드래곤 우리 하나마다 +15%."},
  tree:{name:"소나무",ico:"🌲",cost:15,rate:0,deco:true,desc:"꾸미기. 꾸미기 하나마다 마을 전체 +2% (최대 +30%)."},
  torch:{name:"횃불",ico:"🔥",cost:40,rate:0,deco:true,desc:"꾸미기. 밤이 되면 환하게 빛나요. 마을 전체 +2%."},
  statue:{name:"투슬리스 동상",ico:"🗿",cost:20000,rate:0,unique:true,need:"arena",desc:"버크의 자랑. 마을 전체 +25%."},
  spring_statue:{name:"벚꽃 라이트 퓨리 동상",ico:"🌸",cost:8000,rate:0,unique:true,season:"spring",bonus:0.1,desc:"봄에만 지을 수 있는 계절 동상. 한 번 지으면 계속 남아요. 마을 전체 +10% (레벨마다 더)."},
  summer_statue:{name:"해변 그롱클 동상",ico:"🏖️",cost:8000,rate:0,unique:true,season:"summer",bonus:0.1,desc:"여름에만 지을 수 있는 계절 동상. 한 번 지으면 계속 남아요. 마을 전체 +10% (레벨마다 더)."},
  autumn_statue:{name:"단풍 스톰플라이 동상",ico:"🍁",cost:8000,rate:0,unique:true,season:"autumn",bonus:0.1,desc:"가을에만 지을 수 있는 계절 동상. 한 번 지으면 계속 남아요. 마을 전체 +10% (레벨마다 더)."},
  winter_statue:{name:"눈사람 투슬리스 동상",ico:"⛄",cost:8000,rate:0,unique:true,season:"winter",bonus:0.1,desc:"겨울에만 지을 수 있는 계절 동상. 한 번 지으면 계속 남아요. 마을 전체 +10% (레벨마다 더)."},
  xmas_tree:{name:"크리스마스 트리",ico:"🎄",cost:5000,rate:0,unique:true,reward:true,bonus:0.05,desc:"크리스마스 시즌 패스 10단계 보상. 마을 전체 +5% (레벨마다 더)."},
  santa_statue:{name:"산타 투슬리스 동상",ico:"🎅",cost:20000,rate:0,unique:true,reward:true,bonus:0.2,desc:"크리스마스 시즌 패스 30단계 보상. 마을 전체 +20% (레벨마다 더)."}
};
const SEASON_KO={spring:"봄",summer:"여름",autumn:"가을",winter:"겨울"};
function bkLock(k){ const B=BK_B[k];
  if(B.unique&&bkHas(k)) return "이미 있어요"; if(B.need&&!bkHas(B.need)) return BK_B[B.need].name+" 필요";
  if(B.season&&B.season!==bkSeason()) return SEASON_KO[B.season]+"에만";
  if(B.reward&&!((bk.inv||{})[k]>0)) return "시즌 패스 보상"; return ""; }
function bkStatueMult(){ let m=1; for(const t of Object.values(bk.tiles)){ const B=BK_B[t.k]; if(B&&B.bonus) m*=1+B.bonus*(1+0.5*((t.lv||1)-1)); } return m; }
const BK_MAXLV=5;
let bk={tiles:{},bank:0,last:Date.now(),total:0};
const saveBk=makeSaver("settings/berk",()=>bk);
try{ const l=JSON.parse(localStorage.getItem("httyd-berk")||"null"); if(l) bk=Object.assign(bk,l); }catch(e){}
function saveBkAll(){ try{ localStorage.setItem("httyd-berk",JSON.stringify(bk)); }catch(e){} saveBk(); }
function initBerkCloud(d){ d.doc("settings/berk").onSnapshot(s=>{ if(s.exists&&!dirtyDocs["settings/berk"]&&!s.metadata.hasPendingWrites){
  bk=Object.assign({tiles:{},bank:0,last:Date.now(),total:0},JSON.parse(JSON.stringify(s.data()||{}))); if(view==="click"&&mgMode==="berk") renderBerk(); } },()=>{}); }
const bkLand=(r,c)=>r>=0&&c>=0&&r<BK_R&&c<BK_C&&BK_MAP[r][c]==="L";
const bkN4=(r,c)=>[[r-1,c],[r+1,c],[r,c-1],[r,c+1]];
const bkAt=(r,c)=>bk.tiles[r+","+c];
function bkCoast(r,c){ return bkN4(r,c).some(([a,b])=>!bkLand(a,b)); }
function bkHas(k){ return Object.values(bk.tiles).some(t=>t.k===k); }
function bkLvMult(lv){ return 1+0.6*((lv||1)-1); }
function bkGlobal(){ const ts=Object.values(bk.tiles); const hall=ts.find(t=>t.k==="hall"); const deco=ts.filter(t=>BK_B[t.k].deco).length;
  return (1+(hall?0.1*(hall.lv||1):0))*(1+Math.min(0.3,deco*0.02))*(bkHas("statue")?1.25:1)*bkStatueMult(); }
function bkTileRate(r,c){ const t=bkAt(r,c); if(!t) return 0; const B=BK_B[t.k]; let v=B.rate;
  const nb=bkN4(r,c).map(([a,b])=>bkAt(a,b)).filter(Boolean);
  if(t.k==="house"&&nb.some(n=>n.k==="hall")) v*=1.3;
  if(t.k==="fishery"&&bkCoast(r,c)) v*=2;
  if(t.k==="farm") v*=1+0.2*nb.filter(n=>n.k==="house").length;
  if(t.k==="stable"&&t.dragon){ v+={common:0,rare:5,epic:12,legend:30}[tierOf(t.dragon)]||0; }
  if(t.k==="arena") v*=1+0.15*nb.filter(n=>n.k==="stable").length;
  v*=1+0.25*nb.filter(n=>n.k==="forge").length;
  return v*bkLvMult(t.lv)*seasonMult(t.k); }
function bkRate(){ let s=0; for(const key in bk.tiles){ const [r,c]=key.split(",").map(Number); s+=bkTileRate(r,c); } return s*bkGlobal(); } // 1분에 모으는 물고기
function bkPending(){ const mins=Math.min(BK_CAP,Math.max(0,(Date.now()-(bk.last||Date.now()))/60000)); return (bk.bank||0)+bkRate()*mins; }
function bkBankNow(){ bk.bank=bkPending(); bk.last=Date.now(); } // 건물이 바뀌기 전에 지금까지 모은 걸 저장
let bkSel=null, bkTimer=null, bkVisitT=null;
function bkCollect(){ const n=Math.floor(bkPending()); if(n<=0){ toast("아직 모인 물고기가 없어요"); return; }
  bkBankNow(); bk.bank-=n; bk.total=(bk.total||0)+n; miniGiveFish(n); saveBkAll(); toast(`물고기 ${fmt(n)}마리를 걷었어요`); bkRefresh(); renderBerkPanel(); }
function bkUpCost(t){ return Math.round(BK_B[t.k].cost*Math.pow(2,t.lv||1)); }
function bkBuild(k){ const B=BK_B[k], [r,c]=bkSel;
  const lk=bkLock(k); if(lk){ toast(lk==="이미 있어요"?"하나만 지을 수 있어요":lk); return; }
  if(!B.reward&&(ck.fish||0)<B.cost){ toast("물고기가 모자라요"); return; }
  bkBankNow(); if(B.reward){ bk.inv=Object.assign({},bk.inv); bk.inv[k]--; } else { ck.fish-=B.cost; saveCkAll(); } bk.tiles[r+","+c]={k,lv:1}; saveBkAll(); toast(`${B.name}을(를) 지었어요!`); renderBerk(); }
function bkUpgrade(){ const [r,c]=bkSel, t=bkAt(r,c); if(!t||(t.lv||1)>=BK_MAXLV) return; const cost=bkUpCost(t);
  if((ck.fish||0)<cost){ toast("물고기가 모자라요"); return; }
  bkBankNow(); ck.fish-=cost; saveCkAll(); t.lv=(t.lv||1)+1; saveBkAll(); toast(`${BK_B[t.k].name} Lv.${t.lv}!`); renderBerk(); }
function bkDemolish(){ const [r,c]=bkSel, t=bkAt(r,c); if(!t) return; let spent=BK_B[t.k].cost; for(let l=1;l<(t.lv||1);l++) spent+=Math.round(BK_B[t.k].cost*Math.pow(2,l));
  bkBankNow(); delete bk.tiles[r+","+c]; miniGiveFish(Math.floor(spent/2)); saveBkAll(); toast(`부수고 물고기 ${fmt(Math.floor(spent/2))}마리를 돌려받았어요`); renderBerk(); }
function bkSetDragon(id){ const [r,c]=bkSel, t=bkAt(r,c); if(!t) return; bkBankNow(); t.dragon=id||""; saveBkAll(); renderBerk(); }
function bkNight(){ const h=new Date().getHours(); return h>=19||h<6; }
function bkRefresh(){ mgSet("bkRate",fmt(Math.round(bkRate()*10)/10)); mgSet("bkPend",fmt(Math.floor(bkPending()))); mgSet("bkFish",fmt(ck.fish||0));
  const full=bkPending()>=bkRate()*BK_CAP-0.5&&bkRate()>0; const w=$("#bkFull"); if(w) w.hidden=!full;
  const f=ck.fish||0;
  document.querySelectorAll("[data-bkbuild]").forEach(b=>{ const B=BK_B[b.dataset.bkbuild]; const lock=bkLock(b.dataset.bkbuild); b.disabled=!!lock||(!B.reward&&f<B.cost); });
  const up=$("#bkUp"); if(up&&bkSel){ const t=bkAt(bkSel[0],bkSel[1]); if(t) up.disabled=f<bkUpCost(t); } }
function renderBerk(){
  const el=$("#clickView"); if(!el) return;
  const cells=[]; for(let r=0;r<BK_R;r++) for(let c=0;c<BK_C;c++){ const land=bkLand(r,c), t=bkAt(r,c), sel=bkSel&&bkSel[0]===r&&bkSel[1]===c;
    const ph=t&&t.k==="stable"&&t.dragon&&cardPhoto(t.dragon);
    cells.push(`<button class="bkt ${land?"land":"sea"} ${land&&bkCoast(r,c)?"coast":""} ${t?"b-"+t.k:""} ${sel?"sel":""}" data-bk="${r},${c}" aria-label="${t?BK_B[t.k].name+" Lv."+(t.lv||1):land?"빈 땅":"바다"}">
      ${t?(ph?`<img src="${urlOf(ph)}" alt="">`:`<span class="bkico">${BK_B[t.k].ico}</span>`)+((t.lv||1)>1?`<span class="bklv">${t.lv}</span>`:""):""}</button>`); }
  el.innerHTML=mgTabsHtml()+`<div class="skwrap">
    <div class="skhud"><div><span>1분에</span><b>${FISH_SVG}<span id="bkRate"></span></b></div><div><span>모인 물고기</span><b id="bkPend">0</b></div><button class="btn small" id="bkCollect">걷기</button></div>
    <p class="note bkfull" id="bkFull" hidden>창고가 꽉 찼어요! 걷어야 더 모여요 (최대 8시간).</p>
    <p class="bkseason">${SEASON_INFO[bkSeason()].ico} 지금은 <b>${SEASON_INFO[bkSeason()].name}</b> · ${SEASON_INFO[bkSeason()].bonus}${bkSeason()==="winter"||bkSeason()==="autumn"?"":""}</p>
    <div class="bkmap ${bkNight()?"night":""} season-${bkSeason()}" id="bkMap" style="--c:${BK_C}">${cells.join("")}<div class="bkvisit" id="bkVisit" hidden></div></div>
    <div class="bkpanel" id="bkPanel"></div>
    <p class="note" style="margin:0;text-align:center">가진 물고기 ${FISH_SVG}<b id="bkFish">${fmt(ck.fish||0)}</b> · 지금까지 걷은 물고기 ${fmt(bk.total||0)}마리<br>앱을 꺼 둬도 최대 8시간 동안 모여요. 가끔 날아오는 야생 드래곤을 누르면 선물을 줘요.</p></div>`;
  bindMgTabs();
  el.querySelectorAll("[data-bk]").forEach(b=>b.onclick=()=>{ bkSel=b.dataset.bk.split(",").map(Number); el.querySelectorAll(".bkt.sel").forEach(x=>x.classList.remove("sel")); b.classList.add("sel"); renderBerkPanel(); });
  $("#bkCollect").onclick=bkCollect;
  renderBerkPanel(); bkRefresh();
  clearInterval(bkTimer); bkTimer=setInterval(()=>{ if(!$("#bkMap")){ clearInterval(bkTimer); return; } bkRefresh(); },1000);
  bkScheduleVisit();
}
function renderBerkPanel(){
  const p=$("#bkPanel"); if(!p) return;
  if(!bkSel){ p.innerHTML=`<p class="note" style="margin:0">땅을 눌러서 건물을 지어 보세요. 바다 옆 땅은 어부 오두막 자리로 좋아요.</p>`; return; }
  const [r,c]=bkSel, t=bkAt(r,c);
  if(!bkLand(r,c)){ p.innerHTML=`<p class="note" style="margin:0">바다예요. 여기는 지을 수 없어요.</p>`; return; }
  if(!t){
    p.innerHTML=`<p class="bkh">빈 땅${bkCoast(r,c)?" · 바닷가":""}</p><div class="bkshop">${Object.entries(BK_B).map(([k,B])=>{ const lock=bkLock(k);
      return `<div class="bkitem ${lock?"lock":""}"><span class="bkico">${B.ico}</span><div><b>${B.name}</b><p class="note" style="margin:0">${B.desc}</p></div>
        <button class="btn small fishbtn" data-bkbuild="${k}" ${lock||(!B.reward&&(ck.fish||0)<B.cost)?"disabled":""}>${lock||(B.reward?"선물로 짓기":`${FISH_SVG}${fmt(B.cost)}`)}</button></div>`; }).join("")}</div>`;
    p.querySelectorAll("[data-bkbuild]").forEach(b=>b.onclick=()=>bkBuild(b.dataset.bkbuild)); return; }
  const B=BK_B[t.k], lv=t.lv||1, rate=bkTileRate(r,c)*bkGlobal(), own=ckOwned();
  p.innerHTML=`<p class="bkh"><span class="bkico">${B.ico}</span> ${B.name} <span class="clv2">Lv.${lv}</span></p>
    <p class="note" style="margin:0">${B.desc}</p>
    ${B.rate||t.k==="stable"?`<p style="margin:0">이 건물이 1분에 ${FISH_SVG}<b>${fmt(Math.round(rate*10)/10)}</b>마리 모아요</p>`:""}
    ${t.k==="stable"?`<p class="bkh" style="font-size:1rem">우리에 넣을 드래곤</p>${own.length?`<div class="ckpick">${own.map(id=>`<button class="ckp ${t.dragon===id?"on":""} ${(TIER_BY[tierOf(id)]||TIER_BY.common).cls}" data-bkdrag="${id}"><img src="${urlOf(cardPhoto(id))}" alt=""><span>${esc(koOf(id))}</span></button>`).join("")}</div>`:`<p class="note">뽑기에서 드래곤을 뽑으면 넣을 수 있어요.</p>`}`:""}
    <div class="row">${lv<BK_MAXLV?`<button class="btn small fishbtn" id="bkUp" ${(ck.fish||0)<bkUpCost(t)?"disabled":""}>Lv.${lv+1}로 올리기 ${FISH_SVG}${fmt(bkUpCost(t))}</button>`:`<span class="note">최대 레벨이에요</span>`}
      <button class="btn ghost small" id="bkDel">부수기 (절반 돌려받기)</button></div>`;
  const up=$("#bkUp"); if(up) up.onclick=bkUpgrade;
  const del=$("#bkDel"); del.onclick=()=>{ if(!del.dataset.armed){ del.dataset.armed="1"; del.textContent="정말 부술까요?"; setTimeout(()=>{ if(del.isConnected){ delete del.dataset.armed; del.textContent="부수기 (절반 돌려받기)"; } },3000); return; } bkDemolish(); };
  p.querySelectorAll("[data-bkdrag]").forEach(b=>b.onclick=()=>bkSetDragon(t.dragon===b.dataset.bkdrag?"":b.dataset.bkdrag));
}
function bkScheduleVisit(){ clearTimeout(bkVisitT); bkVisitT=setTimeout(()=>{
  const v=$("#bkVisit"); if(!v||view!=="click"||mgMode!=="berk"||document.hidden){ if($("#bkMap")) bkScheduleVisit(); return; }
  const pics=hdPics(), pic=pics.length?pics[Math.floor(Math.random()*pics.length)]:null;
  v.innerHTML=pic?`<img src="${pic.url}" alt="">`:`<span>🐉</span>`; v.style.top=(10+Math.random()*60)+"%"; v.hidden=false; v.classList.remove("fly"); void v.offsetWidth; v.classList.add("fly");
  const gift=Math.max(20,Math.round(bkRate()*10));
  v.onclick=()=>{ if(v.hidden) return; v.hidden=true; miniGiveFish(gift); toast(`야생 드래곤이 물고기 ${fmt(gift)}마리를 주고 갔어요!`); bkRefresh(); };
  setTimeout(()=>{ v.hidden=true; },7000); bkScheduleVisit(); }, 35000+Math.random()*55000); }

// ---------- 관리자 도구 (멤버 승인, 선물, 데이터 가져오기) ----------
let adm={reqs:[],mems:[],unsubs:null,busy:""};
function admWatch(){ if(adm.unsubs||!FB.isOwner) return; adm.unsubs=[FB.admin.watchRequests(r=>{ adm.reqs=r; admPaint(); }),FB.admin.watchMembers(m=>{ adm.mems=m; admPaint(); })]; }
function admPaint(){ const box=$("#adminPanel"); if(!box) return;
  if(!box.dataset.built){ box.dataset.built="1";
  box.innerHTML=`<h2>관리자</h2>
    <div class="admsec"><h3>승인 요청 <span id="admReqN"></span></h3><div id="admReqs"></div></div>
    <div class="admsec"><h3 id="admMemH">멤버</h3><div id="admMems"></div></div>
    <div class="admsec"><h3>랭킹에 보일 내 이름</h3><div class="admrow"><input id="agName" maxlength="20" autocomplete="off" style="flex:1;min-width:8em;padding:8px 10px;border-radius:8px;border:1.5px solid var(--line)"><button class="btn small" id="agNameGo">저장</button></div></div>
    <div class="admsec"><h3>내 생일</h3><div class="admrow"><input id="agBday" maxlength="5" placeholder="MM-DD" class="admbd"><button class="btn small" id="agBdayGo">저장</button></div></div>
    <div class="admsec"><h3>생일 선물 (멤버가 생일날 하나 골라요)</h3>
      <div class="admgift"><label class="fxf"><span>펫 뽑기권</span><input id="ebT" type="number" min="0"></label><label class="fxf"><span>보석</span><input id="ebG" type="number" min="0"></label>
        <label class="fxf"><span>코인</span><input id="ebC" type="number" min="0"></label><label class="fxf"><span>물고기</span><input id="ebF" type="number" min="0"></label></div>
      <label class="fxf" style="width:100%"><span>축하 메시지</span><input id="ebMsg" maxlength="80" style="width:100%"></label><button class="btn small" id="ebGo">생일 선물 저장</button></div>
    <div class="admsec"><h3>선물 주기</h3>
      <div class="admgift"><label class="fxf"><span>누구에게</span><select id="agWho"></select></label>
        <label class="fxf"><span>보석</span><input id="agGems" type="number" inputmode="numeric" min="0" value="0"></label>
        <label class="fxf"><span>코인</span><input id="agCoins" type="number" inputmode="numeric" min="0" value="0"></label>
        <label class="fxf"><span>펫 뽑기권</span><input id="agTix" type="number" inputmode="numeric" min="0" value="0"></label>
        <button class="btn small" id="agGo">선물 보내기</button></div></div>
    <div class="admsec"><h3>예전 데이터 가져오기</h3><p class="note" style="margin:0">예전 앱(claude.ai)의 사진 탭에서 만든 내보내기 파일(.json)을 고르면 사진, 펫, 능력치와 관리자 게임 기록을 이 서버로 옮겨요. 한 번만 하면 돼요.</p>
      <span class="btn ghost small pickwrap">파일 고르기<input type="file" accept=".json,application/json" id="agImp"></span><span class="note" id="agImpMsg"></span></div>
    <button class="btn ghost small" id="agOut">로그아웃</button>`;
  $("#agGo").onclick=async()=>{ const g={gems:Math.floor(+$("#agGems").value||0),coins:Math.floor(+$("#agCoins").value||0),tickets:Math.floor(+$("#agTix").value||0)};
    if(!g.gems&&!g.coins&&!g.tickets){ toast("선물할 양을 넣어 주세요"); return; }
    try{ await FB.admin.gift($("#agWho").value,g); toast("선물을 보냈어요"); ["agGems","agCoins","agTix"].forEach(i=>$("#"+i).value=0); }catch(e){ toast("선물을 보내지 못했어요"); } };
  $("#agImp").onchange=async e=>{ const f=e.target.files[0]; e.target.value=""; if(!f) return; const m=$("#agImpMsg");
    try{ const txt=await f.text(); const n=await FB.admin.importData(txt,(i,t)=>{ m.textContent=` 옮기는 중… ${i}/${t}`; }); m.textContent=` 다 옮겼어요 (${n}개). 다시 여는 중…`; setTimeout(()=>location.reload(),1500); }
    catch(err){ m.textContent=" "+(err&&err.message||"가져오지 못했어요"); } };
  $("#agOut").onclick=()=>FB.signOut();
  $("#agBday").value=FB.bday||""; $("#agBdayGo").onclick=async()=>{ const v=$("#agBday").value.trim(); if(v&&!/^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(v)){ toast("12-25처럼 넣어 주세요"); return; } try{ await FB.admin.setBday("",v); toast("저장했어요"); }catch(e){ toast("저장하지 못했어요"); } };
  { const b=evCfg.bday||{}; $("#ebT").value=b.tickets||0; $("#ebG").value=b.gems||0; $("#ebC").value=b.coins||0; $("#ebF").value=b.fish||0; $("#ebMsg").value=evCfg.msg||""; }
  $("#ebGo").onclick=async()=>{ const n=id=>Math.max(0,Math.floor(+$(id).value||0)); const cfg={bday:{tickets:n("#ebT"),gems:n("#ebG"),coins:n("#ebC"),fish:n("#ebF")},msg:$("#ebMsg").value.trim().slice(0,80)};
    try{ await cloud.db.doc("settings/events").set(cfg); toast("생일 선물을 저장했어요"); }catch(e){ toast("저장하지 못했어요"); } };
  $("#agName").value=FB.name||""; $("#agNameGo").onclick=async()=>{ try{ await FB.admin.setName($("#agName").value); toast("이름을 저장했어요. 다음 기록부터 이 이름으로 올라가요"); }catch(e){ toast("저장하지 못했어요"); } }; }
  $("#admReqN").innerHTML=adm.reqs.length?`<span class="badge">${adm.reqs.length}</span>`:"";
  $("#admReqs").innerHTML=adm.reqs.length?adm.reqs.map(r=>`<div class="admrow"><b>${esc(r.name||"이름 없음")}</b><span class="note">${new Date(r.at||0).toLocaleString("ko-KR")}</span>
        <button class="btn small" data-aok="${esc(r.uid)}">승인</button><button class="btn ghost small" data-ano="${esc(r.uid)}">거절</button></div>`).join(""):`<p class="note" style="margin:0">새 요청이 없어요.</p>`;
  $("#admMemH").textContent=`멤버 ${adm.mems.length}명`;
  $("#admMems").innerHTML=adm.mems.map(m=>`<div class="admrow"><b>${esc(m.name||"이름 없음")}</b><input class="admbd" data-abd="${esc(m.uid)}" value="${esc(m.bday||"")}" placeholder="생일 MM-DD" maxlength="5" aria-label="${esc(m.name||"")} 생일"><button class="btn ghost small" data-arm="${esc(m.uid)}">${adm.busy==="rm:"+m.uid?"한 번 더 누르면 빼기":"빼기"}</button></div>`).join("")||`<p class="note" style="margin:0">아직 멤버가 없어요.</p>`;
  const sel=$("#agWho"), keepV=sel.value;
  sel.innerHTML=[`<option value="">나 (관리자)</option>`,...adm.mems.map(m=>`<option value="${esc(m.uid)}">${esc(m.name||"이름 없음")}</option>`)].join(""); if([...sel.options].some(o=>o.value===keepV)) sel.value=keepV;
  box.querySelectorAll("[data-abd]").forEach(i=>i.onchange=async()=>{ const v=i.value.trim(); if(v&&!/^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(v)){ toast("생일은 12-25처럼 월-일로 넣어 주세요"); return; }
    try{ await FB.admin.setBday(i.dataset.abd,v); toast(v?"생일을 저장했어요":"생일을 지웠어요"); }catch(e){ toast("저장하지 못했어요"); } });
  box.querySelectorAll("[data-aok]").forEach(b=>b.onclick=async()=>{ const r=adm.reqs.find(x=>x.uid===b.dataset.aok); b.disabled=true; try{ await FB.admin.approve(r); toast(`${r.name}님을 승인했어요`); }catch(e){ toast("승인하지 못했어요"); b.disabled=false; } });
  box.querySelectorAll("[data-ano]").forEach(b=>b.onclick=async()=>{ b.disabled=true; try{ await FB.admin.deny(b.dataset.ano); }catch(e){ b.disabled=false; } });
  box.querySelectorAll("[data-arm]").forEach(b=>b.onclick=async()=>{ const k="rm:"+b.dataset.arm; if(adm.busy!==k){ adm.busy=k; admPaint(); setTimeout(()=>{ if(adm.busy===k){ adm.busy=""; admPaint(); } },3000); return; } adm.busy=""; try{ await FB.admin.remove(b.dataset.arm); toast("멤버에서 뺐어요"); }catch(e){ toast("빼지 못했어요"); } });
}
let admBox=null;
function mountAdmin(){ const v=$("#manageView"); if(!v||!FB.isOwner) return; if(!admBox){ admBox=document.createElement("div"); admBox.id="adminPanel"; admBox.className="admin"; } v.prepend(admBox); admWatch(); admPaint(); }
// ---------- 사진 관리 ----------
const mg={q:"",filter:"all",pending:[],armed:null};
const sorted=()=>SPECIES.slice().sort((a,b)=>a.ko[0].localeCompare(b.ko[0],"ko"));
function renderManage(){
  const el=$("#manageView");
  const counts={}; photos.forEach(p=>counts[p.speciesId]=(counts[p.speciesId]||0)+1);
  const q=norm(mg.q);
  const list=sorted().filter(s=>{
    if(mg.filter==="has"&&!counts[s.id]) return false;
    if(mg.filter==="none"&&counts[s.id]) return false;
    if(!q) return true;
    return namesOf(s).some(n=>n.includes(q)) || s.en.toLowerCase().includes(mg.q.toLowerCase());
  });
  const opts=sorted().map(s=>`<option value="${s.id}">${esc(s.ko[0])} (${esc(s.en)})</option>`).join("");
  el.innerHTML=`<div class="tools">
    ${cloud&&localPhotos.length?`<div class="move"><b>이 기기에만 저장된 사진 ${localPhotos.length}장이 있어요</b>
      <span class="note">옮기면 폰, PC 어디서 열어도 같은 사진으로 퀴즈를 풀 수 있어요.</span>
      <button class="btn" id="migrate">${localPhotos.length}장 옮기기</button></div>`:""}
    <div class="row"><span class="btn pickwrap" style="flex:1;text-align:center">여러 장 한번에 올리기<input type="file" accept="image/*" multiple data-pick="bulk" aria-label="여러 장 한번에 올리기"></span></div>
    ${mg.pending.length?`<p class="sec-title">어떤 드래곤인지 골라주세요</p>
      <div class="pending">${mg.pending.map((p,i)=>`<div class="pend"><img src="${p.url}" alt="올릴 사진 ${i+1}">
        <label class="sr" for="ps${i}">종 선택</label><select id="ps${i}" data-i="${i}"><option value="">종 선택…</option>${opts}</select></div>`).join("")}</div>
      <div class="row"><button class="btn" id="savePend">지정한 사진 저장</button><button class="btn ghost" id="cancelPend">취소</button></div>`:""}
    <label class="sr" for="q">종 검색</label>
    <input class="search" id="q" placeholder="종 이름 검색 (한글/영어)" value="${esc(mg.q)}" autocomplete="off">
    <div class="chips">
      <button class="chip" data-f="all" aria-pressed="${mg.filter==="all"}">전체 ${SPECIES.length}</button>
      <button class="chip" data-f="has" aria-pressed="${mg.filter==="has"}">사진 있음 ${Object.keys(counts).length}</button>
      <button class="chip" data-f="none" aria-pressed="${mg.filter==="none"}">사진 없음 ${SPECIES.length-Object.keys(counts).filter(k=>BY_ID[k]).length}</button>
    </div>
    <p class="note">사진을 누르면 삭제 버튼이 나와요. 한 번 더 누르면 지워져요.</p>
  </div>
  <div class="list">${list.map(s=>{
    const ps=photos.filter(p=>p.speciesId===s.id); const ex=extras[s.id]||[];
    return `<div class="sp" data-id="${s.id}">
      <div class="sp-head"><div class="sp-name"><span class="ko">${esc(s.ko[0])}</span><span class="en">${esc(s.en)}</span></div>
        <span class="count ${ps.length?"has":""}">${ps.length}장</span></div>
      ${ps.length?`<div class="thumbs">${ps.map(p=>`<button class="thumb ${mg.armed===p.id?"armed":""}" data-pid="${p.id}" aria-label="${esc(s.ko[0])} 사진${mg.armed===p.id?" 삭제":""}"><img src="${urlOf(p)}" alt=""></button>`).join("")}</div>`:""}
      <div class="sp-actions">
        <a class="btn ghost small" href="https://www.google.com/search?tbm=isch&q=${encodeURIComponent("How to Train Your Dragon "+s.en.replace(/\(.*\)/,"")+" dragon")}" target="_blank" rel="noopener">이미지 검색</a>
        <span class="btn small pickwrap">사진 추가<input type="file" accept="image/*" multiple data-pick="anim:${s.id}" aria-label="${esc(s.ko[0])} 사진 추가"></span>
      </div>
      <div class="extra"><span class="en">정답으로 인정: ${esc(s.ko.join(", "))}</span>
        ${ex.map((e,i)=>`<button class="tag" data-sid="${s.id}" data-xi="${i}" aria-label="${esc(e)} 지우기">${esc(e)} ✕</button>`).join("")}</div>
      <form class="extra" data-sid="${s.id}"><label class="sr" for="x-${s.id}">인정할 답 추가</label>
        <input id="x-${s.id}" placeholder="아이가 부르는 이름 추가" autocomplete="off"><button class="btn ghost small" type="submit">추가</button></form>
    </div>`;}).join("")||`<p class="note">찾는 종이 없어요.</p>`}</div>`;

  const mb=$("#migrate");
  if(mb) mb.onclick=async()=>{
    mb.disabled=true; let n=0; const all=localPhotos.slice();
    try{ for(const p of all){ mb.textContent=`옮기는 중 ${n+1}/${all.length}`; await addPhoto(p.speciesId,p.blob); await dbDel(p.id); n++; } }
    catch(err){ toast(errMsg(err)); }
    await refresh(); toast(`${n}장 옮겼어요`); renderManage();
  };
  el.querySelectorAll(".pend select").forEach(s=>{const p=mg.pending[+s.dataset.i]; s.value=p.sid; s.onchange=()=>{p.sid=s.value;};});
  if(mg.pending.length){
    $("#savePend").onclick=async()=>{
      const go=mg.pending.filter(p=>p.sid); if(!go.length){toast("종을 먼저 골라주세요");return;}
      const b=$("#savePend"); b.disabled=true; let n=0;
      try{ for(const p of go){ b.textContent=`저장 중 ${n+1}/${go.length}`; await addPhoto(p.sid,p.blob); URL.revokeObjectURL(p.url); p.done=true; n++; } }
      catch(err){ toast(errMsg(err)); }
      mg.pending=mg.pending.filter(p=>!p.done);
      await refresh(); if(n) toast(`${n}장 저장했어요`); renderManage();
    };
    $("#cancelPend").onclick=()=>{mg.pending.forEach(p=>URL.revokeObjectURL(p.url)); mg.pending=[]; renderManage();};
  }
  const qi=$("#q"); qi.oninput=()=>{mg.q=qi.value; const pos=qi.selectionStart; renderManage(); const n=$("#q"); n.focus(); n.setSelectionRange(pos,pos);};
  el.querySelectorAll(".chip").forEach(c=>c.onclick=()=>{mg.filter=c.dataset.f; renderManage();});
  el.querySelectorAll(".thumb").forEach(t=>t.onclick=async()=>{
    const id=t.dataset.pid;
    if(mg.armed===id){const p=photos.find(x=>x.id===id); mg.armed=null; try{ if(p) await removePhoto(p); toast("사진을 지웠어요"); }catch(err){ toast("지우지 못했어요"); } await refresh();}
    else mg.armed=id;
    renderManage();
  });
  el.querySelectorAll("form.extra").forEach(f=>f.onsubmit=e=>{
    e.preventDefault(); const sid=f.dataset.sid; const v=f.querySelector("input").value.trim(); if(!v) return;
    (extras[sid]=extras[sid]||[]).push(v); saveExtras(); toast(`"${v}"도 정답으로 인정해요`); renderManage();
  });
  el.querySelectorAll(".tag").forEach(b=>b.onclick=()=>{extras[b.dataset.sid].splice(+b.dataset.xi,1); saveExtras(); renderManage();});
}

// ---------- 사진 고르기 (화면이 다시 그려져도 끊기지 않는 하나의 입력칸) ----------
let pickBusy=false, picking=false, needRender=false;
function guard(fn){ return function(){ if(picking){ needRender=true; return; } return fn.apply(this,arguments); }; }
renderManage=guard(renderManage); renderCup=guard(renderCup); renderFortune=guard(renderFortune);
function endPicking(){ picking=false; if(needRender){ needRender=false; if(view==="cup") renderCup(); else if(view==="fortune") renderFortune(); else if(view==="manage") renderManage(); } }
document.addEventListener("click",e=>{
  const inp=e.target.closest&&e.target.closest("input[data-pick]"); if(!inp) return;
  if(pickBusy){ e.preventDefault(); toast("저장이 끝날 때까지 기다려 주세요"); return; }
  picking=true;
  // 사진첩을 그냥 닫은 경우: 화면으로 돌아오면 잠시 뒤 원상태로
  const back=()=>{ window.removeEventListener("focus",back); document.removeEventListener("visibilitychange",vis); setTimeout(()=>{ if(!pickBusy) endPicking(); },1500); };
  const vis=()=>{ if(document.visibilityState==="visible") back(); };
  window.addEventListener("focus",back); document.addEventListener("visibilitychange",vis);
},true);
document.addEventListener("change",async e=>{
  const inp=e.target; if(!inp.matches||!inp.matches("input[data-pick]")) return;
  const files=[...inp.files]; const t=inp.dataset.pick; inp.value="";
  if(!files.length){ endPicking(); return; }
  pickBusy=true; let n=0;
  try{
    if(t==="bulk"){
      toast("사진 준비 중…");
      for(const f of files){const b=await shrink(f); mg.pending.push({blob:b,url:URL.createObjectURL(b),sid:""});}
      return;
    }
    const [kind,id]=t.split(":");
    for(const f of files){
      toast(`저장 중 ${n+1}/${files.length}`);
      const b=await shrink(f);
      if(kind==="live") await addLive(id,b); else if(kind==="pet") await addPetPhoto(id,b); else await addPhoto(id,b);
      n++;
    }
    toast(`${kind==="live"?LIVE_BY[id].ko:kind==="pet"?(petById(id)||{name:"펫"}).name:BY_ID[id].ko[0]} 사진 ${n}장 저장`);
  }catch(err){
    toast(n?`${n}장 저장, 나머지는 실패했어요 (${err&&err.code||"오류"})`:`${errMsg(err)} (${err&&err.code||"오류"})`);
  }finally{
    pickBusy=false; picking=false; needRender=false;
    if(t!=="bulk"&&!t.startsWith("live")&&!t.startsWith("pet")) await refresh();
    if(view==="cup") renderCup(); else if(view==="fortune") renderFortune(); else renderManage();
  }
});

// ---------- 시작 ----------
(async()=>{
  db=await openDB();
  await refresh(); show("home");
  await initCloud();
  if(!cloud) $("#warn").hidden=false;
  // 자동 뽑기를 켜둔 채 앱을 닫았다면 다시 열 때 이어서
  let resume=false; try{ resume=localStorage.getItem("httyd-auto")==="1"; }catch(e){}
  if(resume){ const t0=Date.now(); while(cloud&&!purseReady&&Date.now()-t0<8000) await sleep(200); if(gems>=COST){ toast("자동 뽑기를 이어서 해요"); autoLoop(); } else setAutoFlag(false); }
})();

// ---------- 자랑하기(공유)와 랭킹 ----------
const RANK_GAMES={
  suika:{name:"수박게임",unit:"점"}, fly:{name:"비행",unit:"개 통과"}, hide:{name:"숨바꼭질",unit:"점"},
  mem_easy:{name:"짝맞추기 쉬움",unit:"번",low:true}, mem_normal:{name:"짝맞추기 보통",unit:"번",low:true}, mem_hard:{name:"짝맞추기 어려움",unit:"번",low:true},
  sling:{name:"불뿜기",unit:"점"}, run:{name:"달리기",unit:"m"}, stack:{name:"탑쌓기",unit:"층"},
  simon:{name:"순서기억",unit:"개"}, egg:{name:"알 받기",unit:"점"}, dodge:{name:"불꽃피하기",unit:"초"},
  rhythm:{name:"리듬",unit:"점"}, magic:{name:"불꽃 마법",unit:"점"}, tetris:{name:"테트리스",unit:"점"}};
const MG_KEY2GAME={run:"run",stack:"stack",sling:"sling",sm:"simon",egg:"egg",dodge:"dodge",rhythm:"rhythm",magic:"magic",tetris:"tetris"};
const MG_SCORE={run:()=>Math.floor(R.dist/20),stack:()=>T.blocks.length-1,sling:()=>S.score,sm:()=>SM.round,egg:()=>E.score,dodge:()=>Math.floor(D.time/60),rhythm:()=>Math.floor(RH.score),magic:()=>MW.score,tetris:()=>TT.score};
const fmtScore=(g,v)=>`${fmt(v)}${RANK_GAMES[g].unit}`;
// 게임이 끝나면: 랭킹에 기록하고, 결과 창에 '자랑하기'와 '랭킹 보기' 버튼을 붙여요
function brag(overId,game,score){
  const card=document.querySelector("#"+overId+" .skocard"); if(!card) return;
  const row=document.createElement("div"); row.className="bragrow";
  row.innerHTML=`<button class="btn small kakao" data-brag>자랑하기</button><button class="btn ghost small" data-rk>랭킹 보기</button><p class="note bragrank" style="margin:0;flex:1 1 100%"></p>`;
  card.appendChild(row);
  const info=row.querySelector(".bragrank");
  let place=null;
  FB.rank.submit(game,score).then(r=>{ if(!r) return; place=r.place; info.textContent=r.improved?`랭킹 ${r.place}등에 올랐어요! (${r.total}명 중)`:`내 최고 기록은 랭킹 ${r.place}등이에요 (${r.total}명 중)`; }).catch(()=>{});
  row.querySelector("[data-brag]").onclick=e=>{ e.stopPropagation(); shareCard({game:RANK_GAMES[game].name,big:fmtScore(game,score),place}); };
  row.querySelector("[data-rk]").onclick=e=>{ e.stopPropagation(); openRank(game); };
}
// 공유용 카드 그림을 만들어서 카카오톡 등으로 보내요 (휴대폰 공유 창)
async function cardImage(o){
  const W=720,H=720,c=document.createElement("canvas"); c.width=W; c.height=H; const x=c.getContext("2d");
  const g=x.createLinearGradient(0,0,0,H); g.addColorStop(0,"#1E3440"); g.addColorStop(1,"#2E6F8E"); x.fillStyle=g; x.fillRect(0,0,W,H);
  x.fillStyle="rgba(255,255,255,.08)"; for(let i=0;i<30;i++){ x.beginPath(); x.arc((i*137)%W,(i*251)%H,2+i%4,0,Math.PI*2); x.fill(); }
  x.fillStyle="#FFD34D"; x.font="bold 34px sans-serif"; x.textAlign="center"; x.fillText("버크 드래곤 도감",W/2,70);
  const url=o.photo||(ckTarget()&&ckTarget().url);
  if(url){ await new Promise(ok=>{ const im=new Image(); im.onload=()=>{ x.save(); x.beginPath(); x.arc(W/2,250,120,0,Math.PI*2); x.clip();
      const s=Math.max(240/im.width,240/im.height); x.drawImage(im,W/2-im.width*s/2,250-im.height*s/2,im.width*s,im.height*s); x.restore();
      x.lineWidth=8; x.strokeStyle="#FFD34D"; x.beginPath(); x.arc(W/2,250,120,0,Math.PI*2); x.stroke(); ok(); }; im.onerror=ok; im.src=url; }); }
  x.fillStyle="#fff"; x.font="bold 40px sans-serif"; x.fillText(o.game,W/2,440);
  let fs=92; x.font=`bold ${fs}px sans-serif`; while(x.measureText(o.big).width>W-60&&fs>30){ fs-=4; x.font=`bold ${fs}px sans-serif`; }
  x.fillStyle="#FFF4D6"; x.fillText(o.big,W/2,545);
  if(o.place){ x.font="bold 36px sans-serif"; x.fillStyle="#FFD34D"; x.fillText(`랭킹 ${o.place}등`,W/2,605); }
  x.font="28px sans-serif"; x.fillStyle="rgba(255,255,255,.85)"; x.fillText(`${FB.name||""} · 같이 하자!`,W/2,670);
  return new Promise(ok=>c.toBlob(ok,"image/png"));
}
async function shareCard(o){
  const link=location.origin+location.pathname;
  const text=`[버크 드래곤 도감] ${FB.name?FB.name+"의 ":""}${o.game} ${o.big}${o.place?` (랭킹 ${o.place}등)`:""}! 나랑 대결해 볼래?`;
  try{
    const blob=await cardImage(o); const file=blob&&new File([blob],"berk-dragon.png",{type:"image/png"});
    if(file&&navigator.canShare&&navigator.canShare({files:[file]})){ await navigator.share({files:[file],text:text+"\n"+link,title:"버크 드래곤 도감"}); return; }
    if(navigator.share){ await navigator.share({text,url:link,title:"버크 드래곤 도감"}); return; }
  }catch(e){ if(e&&e.name==="AbortError") return; }
  try{ await navigator.clipboard.writeText(text+"\n"+link); toast("자랑 글을 복사했어요. 카카오톡 대화방에 붙여 넣어 주세요"); }
  catch(e){ toast("이 기기에서는 공유를 할 수 없어요"); }
}
// 랭킹 창
let rkGame="suika";
async function openRank(game){
  if(game) rkGame=game;
  let m=$("#rankModal"); if(!m){ m=document.createElement("div"); m.id="rankModal"; m.className="rankmodal"; document.body.appendChild(m); }
  m.hidden=false; document.body.classList.add("skfull");
  const paint=(list,err)=>{ const G=RANK_GAMES[rkGame]; const me=list&&list.find(r=>r.me);
    m.innerHTML=`<div class="rkcard" role="dialog" aria-label="랭킹">
      <div class="rkhead"><h2>랭킹</h2><button class="btn ghost small" id="rkClose">닫기</button></div>
      <div class="rkchips">${Object.entries(RANK_GAMES).map(([k,v])=>`<button data-rkg="${k}" aria-pressed="${k===rkGame}">${v.name}</button>`).join("")}</div>
      <p class="note" style="margin:0">${G.low?"적게 뒤집을수록":"점수가 높을수록"} 위예요. 같은 기록이면 먼저 세운 사람이 위예요.</p>
      <ol class="rklist">${list?list.slice(0,30).map(r=>`<li class="${r.me?"me":""}"><span class="rkp">${r.place<=3?["🥇","🥈","🥉"][r.place-1]:r.place}</span><b>${esc(r.name||"이름 없음")}${r.me?" (나)":""}</b><span class="rks">${fmtScore(rkGame,r.score)}</span><span class="rkt">${r.at?r.at.toLocaleDateString("ko-KR",{month:"numeric",day:"numeric"}):""}</span></li>`).join("")||`<p class="note">아직 기록이 없어요. 첫 번째 주인공이 되어 보세요!</p>`:`<p class="note">${err?"랭킹을 불러오지 못했어요.":"불러오는 중…"}</p>`}</ol>
      ${me&&me.place>30?`<p class="rkme">내 순위: ${me.place}등 · ${fmtScore(rkGame,me.score)}</p>`:""}</div>`;
    $("#rkClose").onclick=()=>{ m.hidden=true; if(!mgFull) document.body.classList.remove("skfull"); };
    m.onclick=e=>{ if(e.target===m) $("#rkClose").click(); };
    m.querySelectorAll("[data-rkg]").forEach(b=>b.onclick=()=>openRank(b.dataset.rkg));
    const on=m.querySelector('[data-rkg][aria-pressed="true"]'); if(on) on.scrollIntoView({inline:"center",block:"nearest"});
  };
  paint(null); try{ paint(await FB.rank.list(rkGame)); }catch(e){ paint(null,true); }
}

// 이전에 세운 내 최고 기록도 랭킹에 올려요 (앱을 열 때 한 번, 더 좋은 기록일 때만)
setTimeout(()=>{ if(!cloud) return; const mb=mini.memBest||{};
  [["suika",sk.best],["fly",mini.flyBest],["hide",mini.hideBest],["mem_easy",mb.easy],["mem_normal",mb.normal],["mem_hard",mb.hard],["sling",mini.slingBest],["run",mini.runBest],["stack",mini.stackBest],["simon",mini.simonBest],["egg",mini.eggBest],["dodge",mini.dodgeBest],["rhythm",mini.rhythmBest],["magic",mini.magicBest],["tetris",mini.tetrisBest]]
    .forEach(([g,v])=>{ if(v) FB.rank.seed(g,v).catch(()=>{}); }); },8000);

// ---------- 친구 대결: 친구가 등록한 팀과 내 팀이 싸워요 (친구가 접속해 있지 않아도 돼요) ----------
let arenaList=null, arenaLoading=false;
const SAFE=n=>Math.max(0,Math.min(9e15,Math.floor(+n||0)));
function myArenaTeam(){ const own=battleOwned(); return team.filter(id=>own.includes(id)).map(sid=>{ const u=playerUnit(sid); return {sid,lv:SAFE(u.lv),hp:SAFE(u.max),atk:SAFE(u.atk)}; }); }
const teamPower=t=>SAFE(t.reduce((a,u)=>a+u.hp/10+u.atk,0));
async function pvpLoad(){ if(arenaLoading) return; arenaLoading=true;
  try{ const t=myArenaTeam(); if(t.length) await FB.arena.publish(t,teamPower(t)); arenaList=await FB.arena.list(); }catch(e){ arenaList=arenaList||[]; }
  arenaLoading=false; if(view==="battle"&&bv.sub==="pvp"&&!bt) renderBattle(); }
const pvpUnitsHTML=t=>`<div class="pvpteam">${(t||[]).filter(u=>SPECIES.some(s=>s.id===u.sid)).map(u=>{ const ph=cardPhoto(u.sid), tc=(TIER_BY[tierOf(u.sid)]||TIER_BY.common).cls;
  return `<span class="pvpu ${tc}">${ph?`<img src="${urlOf(ph)}" alt="">`:""}<i>${esc(koOf(u.sid))} Lv.${fmt(u.lv)}</i></span>`; }).join("")}</div>`;
function pvpHTML(){
  if(arenaList===null) pvpLoad();
  const list=arenaList||[], me=list.find(a=>a.me), t=myArenaTeam();
  const others=list.filter(a=>!a.me&&Array.isArray(a.team)&&a.team.length).sort((a,b)=>(b.power||0)-(a.power||0));
  return `<div class="pvp">
    <div class="pvpme"><h3>내 팀</h3>${t.length?`${pvpUnitsHTML(t)}<p class="note" style="margin:0">전투력 <b>${fmt(teamPower(t))}</b>${me?` · ${me.wins||0}승 ${me.losses||0}패`:""}</p>
      <p class="note" style="margin:0">친구들은 이 팀과 대결해요. 팀을 바꾸면 이 탭에 들어올 때 자동으로 바뀌어요.</p>`
      :`<p class="note" style="margin:0">'카드와 팀'에서 팀을 먼저 골라 주세요.</p><button class="btn small" id="goTeam">팀 고르기</button>`}</div>
    <h3 style="margin:4px 0 0">대결할 친구</h3>
    ${arenaList===null?`<p class="note">불러오는 중…</p>`:others.length?others.map(a=>`<div class="pvprow">
        <div class="pvpwho"><b>${esc(a.name||"이름 없음")}</b><span class="note">전투력 ${fmt(a.power||0)} · ${a.wins||0}승 ${a.losses||0}패</span>${pvpUnitsHTML(a.team)}</div>
        <button class="btn small" data-pvp="${esc(a.uid)}" ${t.length?"":"disabled"}>대결!</button></div>`).join("")
      :`<p class="note">아직 팀을 등록한 친구가 없어요. 친구가 '친구 대결' 탭에 한 번 들어오면 여기에 나와요.</p>`}
    <button class="btn ghost small" id="pvpRefresh">새로 고침</button></div>`;
}
function pvpBind(el){ el.querySelectorAll("[data-pvp]").forEach(b=>b.onclick=()=>startPvp(b.dataset.pvp));
  const r=$("#pvpRefresh"); if(r) r.onclick=()=>{ arenaList=null; renderBattle(); }; }
function startPvp(uid){
  const a=(arenaList||[]).find(x=>x.uid===uid); if(!a) return;
  const mine=team.filter(id=>battleOwned().includes(id)); if(!mine.length){ toast("먼저 팀을 골라주세요"); return; }
  const foes=(a.team||[]).filter(u=>SPECIES.some(s=>s.id===u.sid)).slice(0,3).map(u=>{ const c=cfgOf(u.sid), hp=Math.max(1,SAFE(u.hp));
    return {sid:u.sid,lv:Math.max(1,SAFE(u.lv)),boss:false,max:hp,hp,atk:Math.max(1,SAFE(u.atk)),sk:c.sk,charge:0,stun:false,shield:0}; });
  if(!foes.length){ toast("이 친구 팀을 불러오지 못했어요"); return; }
  const down=battleRules().filter(r=>(r.trigger==="always"||r.trigger==="start")&&r.action==="enemy_atk_down").reduce((s,r)=>s+r.value,0);
  if(down) foes.forEach(f=>f.atk=Math.max(1,Math.round(f.atk*(1-Math.min(90,down)/100))));
  bt={n:0,pvp:{uid:a.uid,name:a.name||"친구",power:a.power||0},info:{boss:false},rules:battleRules(),usedFaint:new Set(),dodged:false,me:mine.map(playerUnit),foe:foes,mi:0,fi:0,
    log:`${a.name||"친구"} 팀과 대결 시작!`,busy:false,auto:!!bv.autoOn,done:null,switching:false,turn:1};
  if(battleRules().some(r=>r.trigger==="start"&&r.action==="stun_enemy"&&roll(r))) bt.foe[0].stun=true;
  { const seal=battleRules().filter(r=>r.trigger==="start"&&r.action==="seal_enemy"&&roll(r)).reduce((m,r)=>Math.max(m,Math.round(r.value)),0);
    if(seal){ bt.foe.forEach(f=>f.sealed=seal); bt.log+=` 펫 효과로 상대가 ${seal}턴 동안 필살기를 못 써요!`; } }
  renderBattle(); window.scrollTo(0,0); if(bt.auto) setTimeout(autoStep,700);
}
function pvpFinish(win){
  const reward=win?Math.min(100000,100+Math.round((bt.pvp.power||0)/50)):0;
  if(reward) bump("coins",reward);
  FB.arena.record(win).then(()=>{ arenaList=null; }).catch(()=>{});
  bt.done={win,reward}; bt.busy=false; bt.auto=false; renderBattle(); return true;
}
function pvpResult(el){ const d=bt.done, nm=esc(bt.pvp.name);
  el.innerHTML=`<div class="end bresult ${d.win?"win":"lose"}">
    <h2>${d.win?`${nm} 팀을 이겼어요!`:`${nm} 팀에게 졌어요`}</h2>
    ${d.win?`<div class="gemrow">${COIN_SVG}<span class="big" style="color:var(--coin)">+${fmt(d.reward)}</span><span class="note">코인</span></div>`:`<p class="note" style="margin:0">카드 레벨을 올리거나 팀·펫을 바꿔서 다시 도전해 봐요.</p>`}
    <div class="row"><button class="btn" id="pvpAgain">다시 대결</button>${d.win?`<button class="btn kakao" id="pvpBrag">자랑하기</button>`:""}<button class="btn ghost" id="pvpOut">다른 친구</button></div></div>`;
  const uid=bt.pvp.uid, name=bt.pvp.name;
  $("#pvpAgain").onclick=()=>{ bt=null; startPvp(uid); };
  const bb=$("#pvpBrag"); if(bb) bb.onclick=()=>shareCard({game:"친구 대결",big:`${name} 팀 격파!`,photo:cardPhoto(bt.me[0].sid)?urlOf(cardPhoto(bt.me[0].sid)):null});
  $("#pvpOut").onclick=()=>{ bt=null; bv.sub="pvp"; arenaList=null; renderBattle(); };
}

// ---------- 홈: 접속하면 처음 보이는 화면. 큰 아이콘으로 고르고, 기능마다 자세한 설명을 볼 수 있어요 ----------
const HOME_SECTIONS=[
 {title:"이벤트",items:[
  {id:"season",ico:"🎄",col:"#2E8B57",name:"크리스마스 시즌 패스",sum:"놀면서 경험치 모아 단계별 선물 받기",go:()=>openSeason(),
   det:`<p>12월 31일까지 열리는 <b>크리스마스 시즌</b>이에요. 무엇을 하든 경험치가 쌓이고, 100마다 한 단계씩 올라요. 모두 30단계예요.</p>
   <ul><li>경험치: 매일 첫 접속 +50, 퀴즈 정답 +5, 미니게임 한 판 +20, 전투 승리 +15, 드래곤 뽑기 +3 등.</li>
   <li>단계마다 보석, 코인, 물고기, 펫 뽑기권을 받아요. 5단계마다 펫 뽑기권이에요.</li>
   <li><b>10단계</b>에는 버크에 놓을 <b>크리스마스 트리</b>, <b>30단계</b>에는 <b>산타 투슬리스 동상</b>을 줘요.</li>
   <li>급하면 <b>보석 1,000개</b>로 한 단계를 건너뛸 수 있어요.</li>
   <li>받은 단계는 '받기'를 눌러야 들어와요.</li></ul>`},
  {id:"bank",ico:"🐷",col:"#D65CA8",name:"보석 저금통",sum:"보석을 맡기면 7일 뒤 이자가 붙어요",go:()=>openBank(),
   det:`<p>보석을 맡겨 두면 <b>7일 뒤에 10% 이자</b>를 붙여서 돌려줘요. 1,000개를 맡기면 1,100개가 돼요.</p>
   <ul><li>여러 번 나눠서 맡길 수 있고, 각각 따로 7일을 세요.</li>
   <li>7일 전에 찾으면 이자 없이 맡긴 만큼만 돌려줘요.</li>
   <li>참고 기다리면 더 많아진다는 걸 배우는 저축 연습이에요.</li></ul>`},
 ]},
 {title:"드래곤 도감",items:[
  {id:"quiz",ico:"🧩",col:"#3FA7D6",name:"드래곤 퀴즈",sum:"사진을 보고 드래곤 이름 맞히기",go:()=>show("quiz"),
   det:`<p>드래곤 사진이 한 장씩 나오면 그 드래곤의 이름을 써서 맞혀요.</p>
   <ul><li>띄어쓰기는 신경 쓰지 않아도 돼요. 비슷하게 쓰면 정답으로 인정해요. (예: 나이트퓨리, 나이트 퓨리)</li>
   <li>한 문제 맞힐 때마다 <b>보석 1개</b>를 받아요.</li>
   <li>중간에 멈출 수 있고, 끝나면 <b>틀린 문제만 다시</b> 풀 수 있어요.</li>
   <li>끝난 화면에서 <b>자랑하기</b>로 점수를 카톡에 보낼 수 있어요.</li></ul>`},
  {id:"cup",ico:"🏆",col:"#F2C14E",name:"이상형 월드컵",sum:"두 마리 중 더 좋은 드래곤 고르기",go:()=>show("cup"),
   det:`<p>드래곤 두 마리가 나오면 더 좋은 쪽을 눌러요. 계속 고르다 보면 마지막 한 마리가 <b>우승</b>해요.</p>
   <ul><li>16강, 8강처럼 대진 크기를 고를 수 있어요.</li>
   <li><b>실사화 월드컵</b>은 실사 영화 드래곤 8강이에요. 매번 한 마리가 무작위로 빠져요.</li>
   <li>끝까지 하면 <b>보석 1개</b>를 받고, 우승 기록이 명예의 전당에 남아요.</li>
   <li>우승 화면에서 <b>자랑하기</b>로 내 최애 드래곤을 카톡에 보낼 수 있어요.</li></ul>`},
 ]},
 {title:"뽑기와 펫",items:[
  {id:"draw",ico:"🥚",col:"#E85D75",name:"드래곤 뽑기",sum:"보석으로 알을 깨서 드래곤 모으기",go:()=>{ fz.sub="draw"; show("fortune"); },
   det:`<p>보석 <b>8개</b>로 알을 하나 깨요. 알에서 나온 드래곤은 <b>도감</b>에 모여요.</p>
   <ul><li>등급은 일반 · 희귀 · 영웅 · 전설이 있어요. 높은 등급일수록 알이 화려하게 빛나요.</li>
   <li>처음 보는 드래곤이면 보너스 보석을 줘요. (희귀 2개, 영웅 4개, 전설 8개)</li>
   <li><b>자동 뽑기</b>를 켜면 보석이 있는 동안 계속 뽑아요.</li>
   <li>같은 드래곤이 또 나오면 '카드와 팀'에서 카드 레벨을 올리는 데 써요.</li>
   <li>'도감' 칸에서 모은 드래곤과 아직 못 모은 드래곤을 볼 수 있어요.</li></ul>`},
  {id:"pet",ico:"🐣",col:"#A05CD6",name:"아기 드래곤 펫",sum:"특별한 능력을 가진 펫 뽑고 장착하기",go:()=>{ fz.sub="pet"; show("fortune"); },
   det:`<p>보석 <b>1,000개</b> 또는 <b>펫 뽑기권</b>으로 아기 드래곤 펫을 뽑아요.</p>
   <ul><li>펫마다 능력이 있어요. 보석을 더 많이 받게 해 주거나, 전투에서 회복·부활·봉인 같은 효과를 내요.</li>
   <li>전투 효과는 <b>장착한 펫</b>만 켜져요. 기본 3칸이고, 칸은 보석으로 늘릴 수 있어요.</li>
   <li>장착은 '전투 → 카드와 팀'에서 해요.</li>
   <li>펫 뽑기권은 도감을 완성하거나 관리자 선물로 받을 수 있어요.</li></ul>`},
 ]},
 {title:"전투",items:[
  {id:"adv",ico:"⚔️",col:"#E4572E",name:"모험",sum:"스테이지를 깨며 코인 모으기",go:()=>{ bv.sub="adv"; show("battle"); },
   det:`<p>내 드래곤 3마리 팀으로 적과 <b>번갈아 공격하는 턴제 전투</b>를 해요.</p>
   <ul><li>공격하면 필살기 게이지가 차고, 가득 차면 <b>필살기</b>를 쓸 수 있어요.</li>
   <li>10스테이지마다 <b>보스</b>가 나와요. 레드 데스 같은 거대 드래곤이에요.</li>
   <li>이기면 <b>코인</b>을 받아요. 처음 깬 스테이지는 2배예요.</li>
   <li>난이도(쉬움~지옥)를 고를 수 있어요. 어려울수록 적이 세고 보상도 커요.</li>
   <li><b>자동 전투</b>를 켜면 알아서 싸우고, 다음 스테이지로도 계속 넘어가요.</li></ul>`},
  {id:"pvp",ico:"🤝",col:"#2EC4B6",name:"친구 대결",sum:"친구가 등록한 팀과 겨루기",go:()=>{ bv.sub="pvp"; show("battle"); },
   det:`<p>친구가 등록해 둔 팀과 내 팀이 싸워요. <b>친구가 접속해 있지 않아도</b> 돼요.</p>
   <ul><li>이 탭에 들어오면 내 팀도 자동으로 등록돼서, 친구들이 내 팀과 대결할 수 있어요.</li>
   <li>내 펫 효과도 그대로 써요. 자동 전투도 돼요.</li>
   <li>이기면 상대 전투력에 따라 <b>코인</b>을 받고, 승패 기록이 쌓여요.</li>
   <li>이긴 화면에서 <b>자랑하기</b>로 친구에게 알려 줄 수 있어요.</li></ul>`},
  {id:"cards",ico:"🃏",col:"#5965D9",name:"카드와 팀",sum:"카드 레벨 올리고 팀·펫 정하기",go:()=>{ bv.sub="cards"; show("battle"); },
   det:`<p>뽑은 드래곤이 <b>전투 카드</b>가 돼요. 여기서 카드를 키우고 팀을 짜요.</p>
   <ul><li>같은 드래곤을 여러 번 뽑으면 레벨이 올라가요. 코인을 써서 더 올릴 수도 있어요.</li>
   <li>레벨이 오르면 체력과 공격력이 세져요.</li>
   <li>전투에 나갈 드래곤 <b>3마리</b>와 응원할 펫을 골라요.</li></ul>`},
 ]},
 {title:"미니게임",items:[
  {id:"tama",ico:"🥚",col:"#F08A4B",name:"드래곤 키우기",sum:"내 드래곤에게 밥 주고 놀아 주기",go:()=>goMini("tama"),
   det:`<p>뽑은 드래곤 한 마리를 골라서 <b>직접 키워요</b>. 다마고치처럼 실제 시간이 흐르면 상태가 바뀌어요.</p>
   <ul><li>🍖 배부름, 🎈 즐거움, ⚡ 기운이 있어요. 시간이 지나면 조금씩 줄어요.</li>
   <li><b>밥 주기</b>는 물고기를 써요. 드래곤을 <b>손가락으로 쓰다듬으면</b> 즐거움이 올라가요. <b>재우면</b> 기운이 다시 차요.</li>
   <li>돌봐 줄수록 애정이 쌓여서 레벨이 올라요. 레벨이 오를 때마다 보석 선물을 줘요.</li>
   <li>세 가지가 모두 50 이상이면 하루에 한 번 <b>오늘의 선물</b>(보석·물고기)을 받아요.</li>
   <li>오래 안 돌보면 배고파하고 시무룩해져요. 매일 들러 주세요!</li></ul>`},
  {id:"rhythm",ico:"🎵",col:"#A05CD6",name:"리듬",sum:"박자에 맞춰 발자국 누르기",go:()=>goMini("rhythm"),
   det:`<p>음악에 맞춰 네 줄로 <b>드래곤 발자국</b>이 떨어져요. 아래 선에 닿는 순간 그 줄을 눌러요.</p>
   <ul><li>딱 맞으면 <b>완벽!</b>(300점), 조금 빗나가면 <b>좋아!</b>(100점)이에요.</li>
   <li>연속으로 맞히면 <b>콤보</b>가 쌓여서 점수가 커져요. 놓치면 콤보가 끊겨요.</li>
   <li>1분짜리 곡이고, 뒤로 갈수록 발자국이 많아지고 두 개가 같이 나오기도 해요.</li>
   <li>소리를 켜고 하면 훨씬 재밌어요. 점수는 <b>랭킹</b>에 올라가요.</li></ul>`},
  {id:"magic",ico:"🪄",col:"#E4572E",name:"불꽃 마법",sum:"모양을 그려 바이킹 물리치기",go:()=>goMini("magic"),
   det:`<p>바이킹들이 마을로 걸어와요. 바이킹 머리 위에 있는 <b>노란 모양</b>을 화면에 손가락으로 그리면 드래곤이 불을 뿜어요.</p>
   <ul><li>모양은 ─ (가로줄), │ (세로줄), V, Λ, ○ (동그라미), Z 여섯 가지예요.</li>
   <li>같은 모양을 가진 바이킹이 <b>한꺼번에</b> 맞아요. 모양을 모두 지우면 쓰러져요.</li>
   <li>갈수록 모양이 2~3개인 바이킹이 나와요. 순서대로 그려야 해요.</li>
   <li>바이킹이 빨간 선까지 오면 마을 하트가 줄어요. 하트 3개가 다 없어지면 끝나요.</li></ul>`},
  {id:"tetris",ico:"🧩",col:"#3FA7D6",name:"테트리스",sum:"블록으로 줄을 채워 지우기",go:()=>goMini("tetris"),
   det:`<p>떨어지는 블록을 돌리고 옮겨서 <b>가로 한 줄을 꽉 채우면</b> 사라져요.</p>
   <ul><li>아래 버튼: ◀ ▶ 옮기기, ⟳ 돌리기, ▼ 한 칸 내리기, ⤓ 바로 떨어뜨리기. 버튼을 누르고 있으면 계속 움직여요.</li>
   <li>판을 좌우로 밀어서 옮기거나, 톡 눌러 돌리거나, 아래로 쓸어 바로 떨어뜨릴 수도 있어요.</li>
   <li>한 번에 많이 지울수록 점수가 커져요. 4줄을 한 번에 지우면 <b>테트리스!</b></li>
   <li>10줄마다 레벨이 오르고 빨라져요. 위까지 꽉 차면 끝나요.</li></ul>`},
  {id:"berk",ico:"🏝️",col:"#4CB944",name:"버크 만들기",sum:"건물을 지어 나만의 마을 키우기",go:()=>goMini("berk"),
   det:`<p><b>계절</b>이 바뀌면 마을 모습과 보너스가 바뀌어요. 봄엔 양 목장, 여름엔 어부 오두막, 가을엔 모든 건물, 겨울엔 바이킹 집이 더 많이 모아요.
   계절마다 그 계절에만 지을 수 있는 <b>계절 동상</b>이 있어요. 한 번 지으면 계속 남아서 마을 전체 생산을 올려 줘요. (라이즈 오브 버크처럼!)</p><p>버크 섬 지도의 땅을 눌러 <b>물고기</b>로 건물을 지어요. 건물은 <b>1분마다 물고기를 모아</b> 줘요.</p>
   <ul><li>앱을 꺼 둬도 최대 8시간 동안 쌓여요. <b>걷기</b>를 누르면 물고기가 들어와요.</li>
   <li>어부 오두막은 바닷가에 지으면 2배, 양 목장은 집 옆에 있으면 더 많이 모아요. <b>어디에 짓느냐</b>가 중요해요.</li>
   <li>드래곤 우리에 뽑은 드래곤을 넣으면 등급만큼 더 모아요.</li>
   <li>건물은 Lv.5까지 올릴 수 있어요. 부수면 쓴 물고기의 절반을 돌려받아요.</li>
   <li>가끔 날아오는 <b>야생 드래곤</b>을 누르면 선물을 줘요. 밤이 되면 마을에 불이 켜져요.</li></ul>`},
  {id:"click",ico:"🐟",col:"#E9A23B",name:"클릭커 낚시",sum:"드래곤을 마구 눌러 물고기 잡기",go:()=>goMini("click"),
   det:`<p>버크 부둣가에서 드래곤을 누를 때마다 <b>물고기</b>를 잡아요. 물고기는 모든 미니게임에서 쓰는 돈이에요.</p>
   <ul><li>5초 안에 30번 누르면 <b>피버</b>! 하늘이 붉게 물들고 잡는 양이 3배가 돼요.</li>
   <li>물고기로 그물(한 번에 더 많이), 바이킹 어부(자동으로 잡기), 황금 물고기(가끔 10배), 버크 잔치(피버 시간 늘리기)를 올려요.</li>
   <li>누를 드래곤이나 사진을 바꿀 수 있어요. 고른 얼굴은 다른 미니게임에도 나와요.</li></ul>`},
  {id:"suika",ico:"🍉",col:"#E85D75",name:"수박게임",sum:"같은 드래곤을 합쳐 더 크게",go:()=>goMini("suika"),
   det:`<p>드래곤 공을 떨어뜨려서 <b>같은 단계 둘이 닿으면 합쳐져</b> 다음 단계가 돼요. 15단계까지 있어요.</p>
   <ul><li>화면을 누른 채 좌우로 움직이고, 손을 떼면 떨어져요.</li>
   <li>점선 위에 공이 <b>10초 넘게</b> 쌓여 있으면 끝나요.</li>
   <li>물고기로 아이템을 살 수 있어요: <b>강제 합체</b>(같은 드래곤끼리 끌어서 합치기), <b>삭제</b>, <b>흔들기</b>.</li>
   <li>단계별 사진은 기본 사진이 나오고, 칸을 눌러 내 사진으로 바꿀 수 있어요.</li>
   <li>점수는 <b>랭킹</b>에 올라가요.</li></ul>`},
  {id:"fly",ico:"🪽",col:"#3FA7D6",name:"비행",sum:"바위 기둥 사이로 날아가기",go:()=>goMini("fly"),
   det:`<p>화면을 누를 때마다 드래곤이 날아올라요. <b>바위 기둥 사이</b>를 통과해요.</p>
   <ul><li>기둥이나 바다, 하늘 끝에 닿으면 끝나요.</li>
   <li>기둥 사이에 떠 있는 물고기를 주울 수 있어요.</li>
   <li>많이 지날수록 빨라지고 틈이 좁아져요.</li>
   <li>지난 기둥 수가 <b>랭킹</b>에 올라가요.</li></ul>`},
  {id:"hide",ico:"🏠",col:"#8C3B22",name:"숨바꼭질",sum:"집에서 튀어나오는 드래곤 잡기",go:()=>goMini("hide"),
   det:`<p>30초 동안 버크 집 9채에서 드래곤이 튀어나오면 재빨리 눌러요.</p>
   <ul><li>드래곤은 1점, <b>금빛 드래곤은 5점</b>이에요. 5번 넘게 연속으로 맞히면 1점씩 더 줘요.</li>
   <li><b>바이킹</b>을 누르면 1점 깎여요.</li>
   <li>시간이 갈수록 빨라져요.</li></ul>`},
  {id:"mem",ico:"🎴",col:"#5965D9",name:"짝맞추기",sum:"같은 드래곤 카드 두 장 찾기",go:()=>goMini("mem"),
   det:`<p>뒤집힌 카드를 두 장씩 뒤집어서 <b>같은 드래곤</b>을 찾아요.</p>
   <ul><li>쉬움(6쌍), 보통(8쌍), 어려움(10쌍)이 있어요.</li>
   <li>찾으면 드래곤 이름이 나와서 이름 외우기 연습도 돼요.</li>
   <li><b>적게 뒤집을수록</b> 잘한 거예요. 난이도별로 랭킹이 따로 있어요.</li></ul>`},
  {id:"sling",ico:"🔥",col:"#E4572E",name:"불뿜기",sum:"불덩이를 날려 바이킹 맞히기",go:()=>goMini("sling"),
   det:`<p>화면을 누른 채 <b>뒤로 끌었다가 놓으면</b> 불덩이가 날아가요. 끄는 동안 날아갈 길이 점선으로 보여요.</p>
   <ul><li>나무 탑 사이의 바이킹을 맞히거나 무너뜨리면 100점이에요.</li>
   <li>바이킹을 모두 맞히면 다음 단계예요. 남은 불덩이 하나마다 50점을 더 줘요.</li>
   <li>단계가 오를수록 탑이 높아지고 늘어나요.</li></ul>`},
  {id:"run",ico:"🏃",col:"#9BC53D",name:"달리기",sum:"점프해서 바위 넘기",go:()=>goMini("run"),
   det:`<p>드래곤이 계속 달려요. 화면을 누르면 <b>점프</b>하고, 공중에서 한 번 더 누르면 한 번 더 뛰어요.</p>
   <ul><li>바위에 부딪히면 끝나요.</li>
   <li>하늘에 뜬 물고기를 점프해서 주워요.</li>
   <li>달린 거리(m)가 <b>랭킹</b>에 올라가요.</li></ul>`},
  {id:"stack",ico:"🧱",col:"#B5651D",name:"탑쌓기",sum:"블록을 딱 맞춰 높이 쌓기",go:()=>goMini("stack"),
   det:`<p>좌우로 움직이는 나무 블록이 아래 블록 위에 왔을 때 눌러요.</p>
   <ul><li>삐져나온 부분은 잘려 나가서 블록이 점점 좁아져요.</li>
   <li>딱 맞추면 '완벽!'이 떠요. <b>3번 연속</b>이면 블록이 다시 넓어져요.</li>
   <li>쌓은 층수가 <b>랭킹</b>에 올라가요.</li></ul>`},
  {id:"simon",ico:"🎵",col:"#F2C14E",name:"순서기억",sum:"반짝인 순서대로 누르기",go:()=>goMini("simon"),
   det:`<p>네 마리 드래곤이 소리와 함께 차례로 반짝여요. <b>똑같은 순서</b>로 눌러요.</p>
   <ul><li>맞힐 때마다 순서가 하나씩 길어지고 조금씩 빨라져요.</li>
   <li>기억한 길이가 <b>랭킹</b>에 올라가요.</li>
   <li>무음 모드에서는 소리가 안 날 수 있어요.</li></ul>`},
  {id:"egg",ico:"🧺",col:"#6FA071",name:"알 받기",sum:"바구니로 드래곤 알 받기",go:()=>goMini("egg"),
   det:`<p>화면을 누른 채 좌우로 움직여 바구니로 떨어지는 <b>드래곤 알</b>을 받아요.</p>
   <ul><li>금빛 알은 5점이에요.</li>
   <li>목숨은 ♥ 3개예요. <b>폭탄</b>을 받거나 알을 5개 놓칠 때마다 하나씩 줄어요.</li>
   <li>갈수록 빨라지고 폭탄도 많아져요.</li></ul>`},
  {id:"dodge",ico:"☄️",col:"#7A2E1E",name:"불꽃피하기",sum:"날아오는 불덩이 피하기",go:()=>goMini("dodge"),
   det:`<p>화면 아무 데나 누른 채 움직이면 드래곤이 따라와요. 사방에서 날아오는 <b>불덩이를 피해요</b>.</p>
   <ul><li>불덩이에 한 번이라도 닿으면 끝나요.</li>
   <li>가끔 나타나는 물고기를 주울 수 있어요.</li>
   <li>버틴 시간(초)이 <b>랭킹</b>에 올라가요.</li></ul>`},
 ]},
 {title:"모두 함께",items:[
  {id:"rank",ico:"🥇",col:"#1E3440",name:"랭킹",sum:"게임별 순위 보기",go:()=>openRank("suika"),
   det:`<p>미니게임마다 멤버들의 <b>최고 기록 순위</b>를 봐요.</p>
   <ul><li>같은 기록이면 <b>먼저 세운 사람</b>이 위예요.</li>
   <li>게임이 끝나면 내 기록이 자동으로 올라가고, 결과 창에 몇 등인지 나와요.</li>
   <li>결과 창의 <b>자랑하기</b>를 누르면 기록 카드 그림이 만들어져서 카카오톡으로 보낼 수 있어요.</li></ul>`},
  {id:"manage",ico:"🛠️",col:"#555",name:"관리자",sum:"멤버 승인, 선물, 사진 관리",owner:true,go:()=>show("manage"),
   det:`<p>관리자만 보여요.</p>
   <ul><li>새로 온 사람의 <b>승인 요청</b>을 승인하거나 거절하고, 멤버를 뺄 수 있어요.</li>
   <li>멤버에게 보석, 코인, 펫 뽑기권을 <b>선물</b>해요.</li>
   <li>랭킹에 보일 내 이름을 정해요.</li>
   <li>아래에서 드래곤 사진을 올리고 관리해요.</li></ul>`},
 ]}
];
function goMini(k){ mgMode=k; try{ localStorage.setItem("httyd-mg",k); }catch(e){} show("click"); renderClick(true); }
function renderHome(){
  const el=$("#homeView"); if(!el) return;
  const fish=typeof ck!=="undefined"?ck.fish||0:0;
  el.innerHTML=`<div class="home">
    <div class="hhello"><h1>${FB.name&&FB.name!=="관리자"?esc(FB.name)+"님, ":""}오늘은 뭐 할까?</h1>
      <div class="hstats"><span><svg class="gem" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h12l4 6-10 12L2 9z" fill="var(--gem)"/></svg>보석 <b>${fmt(gems)}</b></span><span>${COIN_SVG}코인 <b>${fmt(coins)}</b></span><span>${FISH_SVG}물고기 <b>${fmt(fish)}</b></span></div></div>
    ${HOME_SECTIONS.map(sec=>{ const items=sec.items.filter(it=>!it.owner||FB.isOwner); if(!items.length) return "";
      return `<section class="hsec"><h2>${sec.title}</h2><div class="hgrid">${items.map(it=>`<div class="hcard" style="--hc:${it.col}">
        <button class="hgo" data-hgo="${it.id}"><span class="hico" aria-hidden="true">${it.ico}</span><b>${it.name}</b><span class="hsum">${it.sum}</span></button>
        <details class="hdet"><summary>자세히 보기</summary>${it.det}</details></div>`).join("")}</div></section>`; }).join("")}
    <p class="note" style="text-align:center">생일에 접속하면 축하 선물을 고를 수 있어요 🎂 (생일은 관리자가 넣어 줘요)</p>
    <p class="note" style="text-align:center">아래 탭이나 각 화면에서 언제든 <b>홈</b>으로 돌아올 수 있어요.</p></div>`;
  const all=HOME_SECTIONS.flatMap(s=>s.items);
  el.querySelectorAll("[data-hgo]").forEach(b=>b.onclick=()=>{ const it=all.find(x=>x.id===b.dataset.hgo); if(it) it.go(); });
}

// ===================== 이벤트: 계절, 저금통, 생일, 시즌 패스 =====================
const KST=()=>new Date(Date.now()+9*3600e3); // 한국 시간 기준 (getUTC* 로 읽어요)
const dayKey=(d=KST())=>d.toISOString().slice(0,10);
const mmdd=(d=KST())=>d.toISOString().slice(5,10);
function giveAll(g){ // 보상 주기 (물고기는 시즌 경험치 없이 직접)
  if(g.gems) bump("gems",Math.floor(g.gems)); if(g.coins) bump("coins",Math.floor(g.coins)); if(g.tickets) bump("tickets",Math.floor(g.tickets));
  if(g.fish){ ck.fish=(ck.fish||0)+Math.floor(g.fish); saveCkAll(); }
  if(g.bk){ bk.inv=bk.inv||{}; bk.inv[g.bk]=(bk.inv[g.bk]||0)+1; saveBkAll(); }
  updateTop(); }
const giftText=g=>[g.gems&&`보석 ${fmt(g.gems)}개`,g.coins&&`코인 ${fmt(g.coins)}개`,g.fish&&`물고기 ${fmt(g.fish)}마리`,g.tickets&&`펫 뽑기권 ${g.tickets}장`,g.bk&&`버크 건물 '${BK_B[g.bk].name}'`].filter(Boolean).join(", ");
// 공용 시트(아래에서 올라오는 창)
function openSheet(html,bind,cls){ let m=$("#evSheet"); if(!m){ m=document.createElement("div"); m.id="evSheet"; m.className="rankmodal"; document.body.appendChild(m); }
  m.hidden=false; document.body.classList.add("skfull");
  m.innerHTML=`<div class="rkcard evcard ${cls||""}" role="dialog">${html}</div>`;
  const close=()=>{ m.hidden=true; if(!(typeof mgFull!=="undefined"&&mgFull)) document.body.classList.remove("skfull"); if(view==="home") renderHome(); };
  m.onclick=e=>{ if(e.target===m) close(); }; m.querySelectorAll("[data-evclose]").forEach(b=>b.onclick=close);
  bind&&bind(m,close); return close; }
function confetti(){ const box=document.createElement("div"); box.className="confetti"; const cols=["#E4572E","#F2C14E","#3FA7D6","#9BC53D","#A05CD6","#FFD34D"];
  box.innerHTML=Array.from({length:60},(_,i)=>`<i style="left:${Math.random()*100}%;background:${cols[i%cols.length]};animation-delay:${Math.random()*0.8}s;animation-duration:${2+Math.random()*1.5}s;transform:rotate(${Math.random()*360}deg)"></i>`).join("");
  document.body.appendChild(box); setTimeout(()=>box.remove(),4200); }

/* ---------- 21. 버크 계절 ---------- */
function bkSeason(){ const m=KST().getUTCMonth()+1; return m>=3&&m<=5?"spring":m>=6&&m<=8?"summer":m>=9&&m<=11?"autumn":"winter"; }
const SEASON_INFO={spring:{name:"봄",ico:"🌸",bonus:"양 목장 +20%",k:"farm"},summer:{name:"여름",ico:"☀️",bonus:"어부 오두막 +20%",k:"fishery"},
  autumn:{name:"가을",ico:"🍁",bonus:"모든 건물 +10%",k:"*"},winter:{name:"겨울",ico:"❄️",bonus:"바이킹 집 +20%",k:"house"}};
function seasonMult(k){ const s=SEASON_INFO[bkSeason()]; if(s.k==="*") return 1.1; return s.k===k?1.2:1; }

/* ---------- 25. 보석 저금통: 7일 맡기면 10% 이자 ---------- */
let bank={deps:[]}; const saveBank=makeSaver("settings/bank",()=>bank);
const BANK_DAYS=7, BANK_RATE=0.10, BANK_MIN=10;
function bankDeposit(n){ n=Math.floor(+n||0); if(n<BANK_MIN){ toast(`보석 ${BANK_MIN}개부터 맡길 수 있어요`); return false; } if(gems<n){ toast("보석이 모자라요"); return false; }
  bump("gems",-n); bank.deps=[...(bank.deps||[]),{amt:n,at:Date.now(),id:Date.now()+"-"+Math.floor(Math.random()*1e6)}]; saveBank(); spXP(10); return true; }
function bankTake(id){ const d=(bank.deps||[]).find(x=>x.id===id); if(!d) return; const ripe=Date.now()-d.at>=BANK_DAYS*864e5;
  const back=ripe?Math.floor(d.amt*(1+BANK_RATE)):d.amt; bank.deps=bank.deps.filter(x=>x.id!==id); saveBank(); bump("gems",back);
  toast(ripe?`이자까지 보석 ${fmt(back)}개를 찾았어요!`:`보석 ${fmt(back)}개를 찾았어요 (이자 없이)`); }
function openBank(){
  const deps=bank.deps||[], now=Date.now();
  const sum=deps.reduce((a,d)=>a+d.amt,0);
  openSheet(`<div class="rkhead"><h2>🐷 보석 저금통</h2><button class="btn ghost small" data-evclose>닫기</button></div>
    <p class="note" style="margin:0">보석을 맡기면 <b>${BANK_DAYS}일 뒤에 ${BANK_RATE*100}% 이자</b>를 붙여서 돌려줘요. 그 전에 찾으면 맡긴 만큼만 돌려줘요.</p>
    <div class="bankin"><input id="bankAmt" type="number" inputmode="numeric" min="${BANK_MIN}" placeholder="맡길 보석 (지금 ${fmt(gems)}개)"><button class="btn" id="bankGo">맡기기</button></div>
    <div class="row" style="gap:6px">${[100,1000,10000].map(v=>`<button class="btn ghost small" data-bq="${v}">${fmt(v)}</button>`).join("")}<button class="btn ghost small" data-bq="half">반</button></div>
    <h3 style="margin:6px 0 0">맡긴 보석 ${fmt(sum)}개</h3>
    <div class="banklist">${deps.length?deps.map(d=>{ const left=d.at+BANK_DAYS*864e5-now, ripe=left<=0, p=Math.min(100,(now-d.at)/(BANK_DAYS*864e5)*100);
      return `<div class="bankrow ${ripe?"ripe":""}"><div style="flex:1;min-width:0"><b>${fmt(d.amt)}개</b> → <b>${fmt(Math.floor(d.amt*(1+BANK_RATE)))}개</b>
        <div class="bankbar"><i style="width:${p}%"></i></div><span class="note">${ripe?"다 익었어요! 찾으면 이자까지":`${Math.ceil(left/864e5)}일 남았어요`}</span></div>
        <button class="btn small ${ripe?"":"ghost"}" data-btake="${d.id}">찾기</button></div>`; }).join(""):`<p class="note">아직 맡긴 보석이 없어요.</p>`}</div>`,
  (m)=>{ $("#bankGo").onclick=()=>{ if(bankDeposit($("#bankAmt").value)) openBank(); };
    m.querySelectorAll("[data-bq]").forEach(b=>b.onclick=()=>{ $("#bankAmt").value=b.dataset.bq==="half"?Math.floor(gems/2):b.dataset.bq; });
    m.querySelectorAll("[data-btake]").forEach(b=>b.onclick=()=>{ const d=(bank.deps||[]).find(x=>x.id===b.dataset.btake); if(!d) return;
      const ripe=Date.now()-d.at>=BANK_DAYS*864e5; if(!ripe&&!b.dataset.armed){ b.dataset.armed="1"; b.textContent="이자 없이 찾기?"; return; } bankTake(d.id); openBank(); }); });
}

/* ---------- 28. 생일: 관리자가 생일을 넣어 두면, 그날 접속했을 때 축하하고 보상을 골라요 ---------- */
let evCfg={bday:{tickets:3,gems:3000,coins:300000,fish:50000},msg:"생일 축하해! 버크의 모든 드래곤이 축하하고 있어 🎉"};
let bdayDone={year:""}; const saveBday=makeSaver("settings/bday",()=>bdayDone);
function checkBirthday(){ const b=FB.bday; if(!b||b!==mmdd()) return; const y=dayKey().slice(0,4); if(bdayDone.year===y) return;
  confetti(); const r=evCfg.bday||{};
  const opts=[["tickets","🎟️",`펫 뽑기권 ${r.tickets||0}장`],["gems","💎",`보석 ${fmt(r.gems||0)}개`],["coins","🪙",`코인 ${fmt(r.coins||0)}개`],["fish","🐟",`물고기 ${fmt(r.fish||0)}마리`]].filter(o=>r[o[0]]);
  openSheet(`<div class="bdayhead"><div class="bdaycake">🎂</div><h2>${esc(FB.name||"")}${FB.name?"님, ":""}생일 축하해요!</h2><p>${esc(evCfg.msg||"")}</p></div>
    <p style="margin:0;font-weight:700;text-align:center">생일 선물을 하나 골라요!</p>
    <div class="bdayopts">${opts.map(o=>`<button class="bdayopt" data-bd="${o[0]}"><span>${o[1]}</span><b>${o[2]}</b></button>`).join("")}</div>`,
   (m,close)=>{ m.querySelectorAll("[data-bd]").forEach(b=>b.onclick=()=>{ const k=b.dataset.bd; giveAll({[k]:r[k]}); bdayDone={year:y,pick:k}; saveBday(); confetti();
      m.querySelector(".evcard").innerHTML=`<div class="bdayhead"><div class="bdaycake">🎁</div><h2>선물을 받았어요!</h2><p>${giftText({[k]:r[k]})}</p><button class="btn" data-evclose>고마워요!</button></div>`;
      m.querySelector("[data-evclose]").onclick=close; }); },"bday");
}

/* ---------- 31. 시즌 패스: 크리스마스 시즌 ---------- */
const SEASON={id:"xmas2026",name:"크리스마스 시즌",ico:"🎄",start:"2026-11-17",end:"2026-12-31",tiers:30,xp:100,skip:1000};
function spReward(t){ // 단계별 보상
  if(t===10) return {bk:"xmas_tree"}; if(t===20) return {tickets:3}; if(t===30) return {bk:"santa_statue",tickets:2};
  if(t%5===0) return {tickets:1};
  const k=["gems","fish","coins"][t%3], base={gems:100,fish:3000,coins:30000}[k]; return {[k]:base*Math.ceil(t/3)}; }
let sp={id:SEASON.id,xp:0,claimed:{},day:""}; const saveSp=makeSaver("settings/season",()=>sp);
const spActive=()=>{ const d=dayKey(); return d>=SEASON.start&&d<=SEASON.end; };
const spTier=()=>Math.min(SEASON.tiers,Math.floor((sp.xp||0)/SEASON.xp));
function spXP(n){ if(!spActive()||!cloud) return; if(sp.id!==SEASON.id) sp={id:SEASON.id,xp:0,claimed:{},day:""};
  const before=spTier(); sp.xp=Math.min(SEASON.tiers*SEASON.xp,(sp.xp||0)+n); saveSp();
  if(spTier()>before){ toast(`${SEASON.ico} 시즌 패스 ${spTier()}단계! 보상을 받으러 가요`); } }
function spDaily(){ if(!spActive()) return; const d=dayKey(); if(sp.day!==d){ sp.day=d; spXP(50); } }
function openSeason(){
  const t=spTier(), inTier=(sp.xp||0)-t*SEASON.xp, max=t>=SEASON.tiers;
  const end=new Date(SEASON.end+"T23:59:59+09:00"), left=Math.max(0,Math.ceil((end-Date.now())/864e5));
  openSheet(`<div class="rkhead"><h2>${SEASON.ico} ${SEASON.name} 패스</h2><button class="btn ghost small" data-evclose>닫기</button></div>
    <div class="sphero"><div class="sptier">${t}<small>단계</small></div><div style="flex:1;min-width:0">
      <div class="bankbar big"><i style="width:${max?100:inTier/SEASON.xp*100}%"></i></div>
      <span class="note">${max?"모든 단계를 깼어요! 🎅":`다음 단계까지 ${SEASON.xp-inTier} 경험치`} · ${left}일 남았어요</span></div></div>
    <details class="hdet" style="border:0;padding:0"><summary style="text-align:left">경험치는 어떻게 모아요?</summary><ul>
      <li>매일 처음 접속하면 +50</li><li>퀴즈 정답 +5, 월드컵·선물 등 보석 받기 +10</li><li>드래곤 뽑기 1번 +3</li><li>미니게임 한 판 끝내기 +20 (버크 물고기 걷기 포함)</li><li>전투 승리 +15, 패배 +5</li><li>저금통에 맡기기 +10</li></ul></details>
    ${max?"":`<button class="btn ghost small" id="spSkip" ${gems<SEASON.skip?"disabled":""}>보석 ${fmt(SEASON.skip)}개로 한 단계 건너뛰기</button>`}
    <div class="splist">${Array.from({length:SEASON.tiers},(_,i)=>i+1).map(n=>{ const r=spReward(n), got=sp.claimed&&sp.claimed[n], open=n<=t, special=r.bk;
      return `<div class="sprow ${open?"open":""} ${got?"got":""} ${special?"special":""}"><span class="spn">${n}</span><span class="spr">${special?`${BK_B[r.bk].ico} `:""}${giftText(r)}</span>
        ${got?`<span class="note">받음 ✓</span>`:open?`<button class="btn small" data-spget="${n}">받기</button>`:`<span class="note">🔒</span>`}</div>`; }).join("")}</div>`,
  (m)=>{ const sk=$("#spSkip"); if(sk) sk.onclick=()=>{ if(gems<SEASON.skip){ toast("보석이 모자라요"); return; } if(!sk.dataset.armed){ sk.dataset.armed="1"; sk.textContent=`보석 ${fmt(SEASON.skip)}개를 쓸까요? 한 번 더 누르세요`; return; }
      bump("gems",-SEASON.skip); sp.xp=Math.min(SEASON.tiers*SEASON.xp,(spTier()+1)*SEASON.xp); saveSp(); toast(`${spTier()}단계로 건너뛰었어요!`); openSeason(); };
    m.querySelectorAll("[data-spget]").forEach(b=>b.onclick=()=>{ const n=+b.dataset.spget; if(sp.claimed&&sp.claimed[n]) return; const r=spReward(n);
      sp.claimed=Object.assign({},sp.claimed,{[n]:true}); saveSp(); giveAll(r); if(r.bk) confetti(); toast(`${giftText(r)}을(를) 받았어요!`); openSeason(); }); });
}

/* ---------- 저장소 연결 ---------- */
function initEventsCloud(d){
  const sub=(path,setter)=>d.doc(path).onSnapshot(s=>{ if(s.exists&&!dirtyDocs[path]&&!s.metadata.hasPendingWrites) setter(JSON.parse(JSON.stringify(s.data()||{}))); },()=>{});
  sub("settings/bank",v=>{ bank=Object.assign({deps:[]},v); });
  sub("settings/bday",v=>{ bdayDone=Object.assign({year:""},v); });
  sub("settings/season",v=>{ sp=v.id===SEASON.id?Object.assign({claimed:{}},v):{id:SEASON.id,xp:0,claimed:{},day:""}; });
  d.doc("settings/events").onSnapshot(s=>{ if(s.exists) evCfg=Object.assign({},evCfg,JSON.parse(JSON.stringify(s.data()||{}))); },()=>{});
  setTimeout(()=>{ spDaily(); checkBirthday(); },3500);
}

// ===================== 드래곤 키우기(다마고치) · 리듬 · 불꽃 그리기 마법 · 테트리스 =====================

/* ---------- 19. 드래곤 키우기 ---------- */
let tama={sid:"",hunger:80,fun:80,energy:80,sleeping:false,last:Date.now(),xp:0,lv:1,giftDay:"",taps:0};
const saveTama=makeSaver("settings/tama",()=>tama);
const TAMA_RATE={hunger:-6,fun:-5,energy:-4}; // 1시간마다
function tamaTick(){ const now=Date.now(), h=Math.min(48,(now-(tama.last||now))/3600e3); if(h<=0) return;
  const cl=v=>Math.max(0,Math.min(100,v));
  tama.hunger=cl(tama.hunger+(tama.sleeping?-3:TAMA_RATE.hunger)*h); tama.fun=cl(tama.fun+(tama.sleeping?-2:TAMA_RATE.fun)*h);
  tama.energy=cl(tama.energy+(tama.sleeping?15:TAMA_RATE.energy)*h); if(tama.sleeping&&tama.energy>=100) tama.sleeping=false; tama.last=now; }
const tamaNeed=()=>tama.lv*50;
function tamaXP(n){ tama.xp=(tama.xp||0)+n; while(tama.xp>=tamaNeed()){ tama.xp-=tamaNeed(); tama.lv++; const g=tama.lv*50; bump("gems",g); confetti(); toast(`드래곤이 Lv.${tama.lv}로 자랐어요! 보석 ${fmt(g)}개 선물`); } }
function tamaSid(){ const own=ckOwned(); if(tama.sid&&own.includes(tama.sid)) return tama.sid; return own[0]||""; }
function tamaMood(){ if(tama.sleeping) return ["😴","쿨쿨… 자는 중이에요"]; const lo=Math.min(tama.hunger,tama.fun,tama.energy);
  if(tama.hunger<25) return ["😢","배고파요… 밥 주세요!"]; if(tama.energy<25) return ["🥱","너무 졸려요. 재워 주세요"]; if(tama.fun<25) return ["😞","심심해요. 놀아 주세요!"];
  if(lo>=70) return ["😄","최고로 행복해요!"]; if(lo>=45) return ["🙂","기분 좋아요"]; return ["😐","조금 힘들어요"]; }
function renderTama(){
  const el=$("#clickView"); if(!el) return; tamaTick();
  const sid=tamaSid(), ph=sid&&cardPhoto(sid), [face,say]=tamaMood(), own=ckOwned(), feedCost=100*tama.lv, today=dayKey(), canGift=tama.giftDay!==today&&Math.min(tama.hunger,tama.fun,tama.energy)>=50;
  const bar=(k,ico,lab)=>`<div class="tmbar"><span>${ico} ${lab}</span><div class="bankbar"><i class="tm-${k}" style="width:${tama[k]}%"></i></div><b>${Math.round(tama[k])}</b></div>`;
  el.innerHTML=mgTabsHtml()+`<div class="tama">
    ${sid?`<div class="tmstage ${tama.sleeping?"sleep":""}"><button class="tmpet" id="tmPet" aria-label="쓰다듬기">${ph?`<img src="${urlOf(ph)}" alt="" draggable="false">`:""}</button>
      <span class="tmface">${face}</span>${tama.sleeping?`<span class="tmzzz">Z z z</span>`:""}<p class="tmsay">${say}</p></div>
      <div class="tmname"><b>${esc(koOf(sid))}</b> <span class="clv2">Lv.${tama.lv}</span><div class="bankbar"><i style="width:${tama.xp/tamaNeed()*100}%"></i></div><span class="note">다음 레벨까지 ${tamaNeed()-tama.xp} 애정</span></div>
      <div class="tmbars">${bar("hunger","🍖","배부름")}${bar("fun","🎈","즐거움")}${bar("energy","⚡","기운")}</div>
      <div class="tmacts"><button class="btn fishbtn" id="tmFeed" ${tama.sleeping?"disabled":""}>🐟 밥 주기 (${fmt(feedCost)})</button>
        <button class="btn" id="tmSleep">${tama.sleeping?"☀️ 깨우기":"🌙 재우기"}</button>
        <button class="btn kakao" id="tmGift" ${canGift?"":"disabled"}>🎁 오늘의 선물</button></div>
      <p class="note" style="margin:0;text-align:center">드래곤을 손가락으로 쓰다듬으면 즐거움이 올라가요. 시간이 지나면 배가 고파지고 심심해지고 졸려져요. 세 가지가 모두 50 이상이면 하루에 한 번 선물을 줘요.</p>
      ${own.length>1?`<p class="sec-title">키울 드래곤 바꾸기</p><div class="ckpick">${own.map(id=>`<button class="ckp ${id===sid?"on":""} ${(TIER_BY[tierOf(id)]||TIER_BY.common).cls}" data-tmpick="${id}"><img src="${urlOf(cardPhoto(id))}" alt=""><span>${esc(koOf(id))}</span></button>`).join("")}</div>`:""}`
    :`<div class="empty"><h2>키울 드래곤이 없어요</h2><p class="note">뽑기에서 드래곤을 뽑으면 키울 수 있어요.</p></div>`}</div>`;
  bindMgTabs(); if(!sid) return;
  const save=()=>{ saveTama(); };
  $("#tmPet").addEventListener("pointerdown",e=>{ e.preventDefault(); if(tama.sleeping){ toast("자고 있어요. 깨우면 같이 놀 수 있어요"); return; }
    if(tama.energy<5){ toast("너무 졸려서 못 놀아요"); return; }
    tama.fun=Math.min(100,tama.fun+3); tama.taps=(tama.taps||0)+1; if(tama.taps%5===0){ tama.energy=Math.max(0,tama.energy-1); tamaXP(1); }
    const h=document.createElement("span"); h.className="tmheart"; h.textContent=["💖","💕","✨","💗"][tama.taps%4]; h.style.left=(30+Math.random()*40)+"%"; $(".tmstage").appendChild(h); setTimeout(()=>h.remove(),900);
    const st=$("#tmPet"); st.classList.remove("wiggle"); void st.offsetWidth; st.classList.add("wiggle");
    clearTimeout(window._tmT); window._tmT=setTimeout(()=>{ save(); renderTama(); },900); });
  $("#tmFeed").onclick=()=>{ if(tama.hunger>=95){ toast("배불러요! 나중에 주세요"); return; } if((ck.fish||0)<feedCost){ toast("물고기가 모자라요. 클릭커에서 잡아 오세요"); return; }
    ck.fish-=feedCost; saveCkAll(); tama.hunger=Math.min(100,tama.hunger+25); tamaXP(5); spXP(5); save(); toast("냠냠! 맛있어요"); renderTama(); };
  $("#tmSleep").onclick=()=>{ tama.sleeping=!tama.sleeping; save(); renderTama(); };
  $("#tmGift").onclick=()=>{ if(!canGift) return; const g={gems:20*tama.lv,fish:500*tama.lv}; tama.giftDay=today; giveAll(g); tamaXP(10); save(); confetti(); toast(`선물: ${giftText(g)}!`); renderTama(); };
  el.querySelectorAll("[data-tmpick]").forEach(b=>b.onclick=()=>{ tama.sid=b.dataset.tmpick; save(); renderTama(); });
}

/* ---------- 1. 드래곤 리듬 ---------- */
const RH_LANES=4, RH_HIT=600, RH_SPEED=0.42, RH_LEN=60000, RH_COL=["#E4572E","#F2C14E","#3FA7D6","#9BC53D"], RH_HZ=[261.6,329.6,392,523.3];
let RH=null, rhAudio=null;
function rhNew(){ const bpm=112, beat=60000/bpm, notes=[]; let t=2000, i=0; const r=seedRand("rhythm|"+Date.now());
  while(t<RH_LEN){ const dense=t/RH_LEN; const step=dense<.3?beat:dense<.7?beat/2:beat/2;
    if(r()<(dense<.3?.7:dense<.7?.65:.8)){ const lane=Math.floor(r()*RH_LANES); notes.push({t,lane,hit:false,miss:false});
      if(dense>.6&&r()<.18) notes.push({t,lane:(lane+1+Math.floor(r()*3))%RH_LANES,hit:false,miss:false}); }
    t+=step; i++; }
  return {state:"ready",notes,score:0,combo:0,maxCombo:0,perfect:0,good:0,miss:0,start:0,beat,fx:[],lit:[0,0,0,0]}; }
function rhSound(hz,dur,vol,type){ try{ rhAudio=rhAudio||new (window.AudioContext||window.webkitAudioContext)(); const o=rhAudio.createOscillator(), g=rhAudio.createGain();
  o.type=type||"triangle"; o.frequency.value=hz; g.gain.setValueAtTime(vol||.2,rhAudio.currentTime); g.gain.exponentialRampToValueAtTime(.0001,rhAudio.currentTime+dur);
  o.connect(g).connect(rhAudio.destination); o.start(); o.stop(rhAudio.currentTime+dur+.02); }catch(e){} }
function rhTap(x){ if(!RH) return; if(RH.state==="ready"){ RH.state="play"; RH.start=performance.now(); RH.nextBeat=0; return; } if(RH.state!=="play") return;
  const lane=Math.max(0,Math.min(RH_LANES-1,Math.floor(x/(GW/RH_LANES)))), now=performance.now()-RH.start; RH.lit[lane]=8;
  let best=null; for(const n of RH.notes){ if(n.hit||n.miss||n.lane!==lane) continue; const d=Math.abs(n.t-now); if(d<=170&&(!best||d<Math.abs(best.t-now))) best=n; }
  if(!best){ return; } const d=Math.abs(best.t-now); best.hit=true; const pf=d<=75;
  RH.combo++; RH.maxCombo=Math.max(RH.maxCombo,RH.combo); RH.score+=(pf?300:100)*(1+Math.floor(RH.combo/10)*0.1); if(pf) RH.perfect++; else RH.good++;
  RH.fx.push({lane,t:0,txt:pf?"완벽!":"좋아!"}); rhSound(RH_HZ[lane]*(pf?2:1),.18,.18); }
function rhEnd(){ RH.state="over"; const s=Math.floor(RH.score); const fish=miniGiveFish(Math.floor(s/50)*Math.max(1,tapValue()));
  const nb=s>(mini.rhythmBest||0); if(nb) mini.rhythmBest=s; saveMiniAll(); mgSet("rhBest",fmt(mini.rhythmBest||0));
  mgOver("rhythm",nb?"최고 기록!":"공연 끝!",fmt(s)+"점",[`완벽 ${RH.perfect} · 좋아 ${RH.good} · 놓침 ${RH.miss} · 최대 콤보 ${RH.maxCombo}`,`${FISH_SVG} 클릭커 물고기 ${fmt(fish)}마리 받았어요`],()=>{ RH=rhNew(); }); }
MG_GAMES.rhythm={step(dt){
  const ctx=mgCtx($("#rhythmCanvas")); const now=RH.state==="play"?performance.now()-RH.start:0;
  if(RH.state==="play"){ // 박자 소리
    const b=Math.floor(now/RH.beat); if(b>=RH.nextBeat){ RH.nextBeat=b+1; rhSound(b%4===0?90:70,.08,.25,"sine"); if(b%2===1) rhSound(2200,.03,.04,"square"); }
    for(const n of RH.notes) if(!n.hit&&!n.miss&&now-n.t>170){ n.miss=true; RH.miss++; RH.combo=0; RH.fx.push({lane:n.lane,t:0,txt:"놓침",bad:true}); }
    if(now>RH_LEN+800) rhEnd();
    mgSet("rhScore",fmt(Math.floor(RH.score))); mgSet("rhCombo",RH.combo); }
  mgSky(ctx,"#1B1033","#3B1E54");
  const lw=GW/RH_LANES, pool=memPool();
  for(let i=0;i<RH_LANES;i++){ ctx.fillStyle=i%2?"rgba(255,255,255,.04)":"rgba(255,255,255,.08)"; ctx.fillRect(i*lw,0,lw,GH);
    if(RH.lit[i]>0){ ctx.fillStyle=RH_COL[i]+"44"; ctx.fillRect(i*lw,0,lw,RH_HIT+40); RH.lit[i]-=dt; } }
  ctx.strokeStyle="rgba(255,255,255,.7)"; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(0,RH_HIT); ctx.lineTo(GW,RH_HIT); ctx.stroke();
  for(const n of RH.notes){ if(n.hit) continue; const y=RH_HIT-(n.t-now)*RH_SPEED; if(y<-40||y>GH+40) continue; const x=n.lane*lw+lw/2;
    ctx.globalAlpha=n.miss?.3:1; ctx.fillStyle=RH_COL[n.lane]; ctx.beginPath(); ctx.ellipse(x,y,lw*.36,16,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle="rgba(255,255,255,.75)"; ctx.font="20px sans-serif"; ctx.textAlign="center"; ctx.textBaseline="middle"; ctx.fillText("🐾",x,y+1); ctx.globalAlpha=1; }
  for(let i=0;i<RH_LANES;i++){ const p=pool[i]; drawRoundImg(ctx,p&&p.url,i*lw+lw/2,RH_HIT+50,28,RH_COL[i]); }
  RH.fx=RH.fx.filter(f=>(f.t+=dt)<40); for(const f of RH.fx){ ctx.globalAlpha=1-f.t/40; ctx.fillStyle=f.bad?"#FF6B5B":"#FFF4B0"; ctx.font="bold 24px sans-serif"; ctx.textAlign="center"; ctx.fillText(f.txt,f.lane*lw+lw/2,RH_HIT-40-f.t); ctx.globalAlpha=1; }
  if(RH.state==="play"){ ctx.fillStyle="rgba(255,255,255,.25)"; ctx.fillRect(0,0,GW*Math.min(1,now/RH_LEN),6); }
  if(RH.state==="ready") mgTapText(ctx,"눌러서 시작 · 소리를 켜 주세요",260);
}};
function renderRhythm(){ if(!RH||RH.state==="over") RH=rhNew();
  const cv=mgMount("rhythm",`<div><span>점수</span><b id="rhScore">0</b></div><div><span>콤보</span><b id="rhCombo">0</b></div><div><span>최고</span><b id="rhBest">${fmt(mini.rhythmBest||0)}</b></div>`,
    "떨어지는 발자국이 아래 선에 닿을 때 그 줄을 눌러요. 딱 맞으면 '완벽!'(300점), 조금 빗나가면 '좋아!'(100점). 콤보가 쌓일수록 점수가 커져요. 1분짜리 곡이에요.");
  if(!cv) return; cv.addEventListener("pointerdown",e=>{ e.preventDefault(); rhTap(mgPt(cv,e).x); }); }

/* ---------- 4. 불꽃 그리기 마법 ---------- */
const MG_SYMS={h:"─",v:"│",V:"V",A:"Λ",O:"○",Z:"Z"};
const MG_TPL=(()=>{ const T={}, line=(pts)=>pts;
  const seg=(a,b,n)=>Array.from({length:n},(_,i)=>[a[0]+(b[0]-a[0])*i/(n-1),a[1]+(b[1]-a[1])*i/(n-1)]);
  const poly=ps=>ps.slice(1).flatMap((p,i)=>seg(ps[i],p,16));
  T.h=[poly([[-.5,0],[.5,0]])]; T.v=[poly([[0,-.5],[0,.5]])];
  T.V=[poly([[-.5,-.5],[0,.5],[.5,-.5]])]; T.A=[poly([[-.5,.5],[0,-.5],[.5,.5]])];
  T.Z=[poly([[-.5,-.5],[.5,-.5],[-.5,.5],[.5,.5]])];
  T.O=[]; for(let s=0;s<8;s++) for(const dir of [1,-1]) T.O.push(Array.from({length:48},(_,i)=>{ const a=s/8*Math.PI*2+dir*i/47*Math.PI*2; return [Math.cos(a)*.5,Math.sin(a)*.5]; }));
  for(const k in T) if(k!=="O") T[k].push(T[k][0].slice().reverse()); return T; })();
function mgNorm(pts){ // 48개로 고르게 → 가운데로 → 크기 맞추기(가로세로 비율 유지)
  if(pts.length<2) return null; let L=0; for(let i=1;i<pts.length;i++) L+=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]); if(L<20) return null;
  const N=48, step=L/(N-1), out=[pts[0]]; let acc=0, prev=pts[0];
  for(let i=1;i<pts.length;i++){ let cur=pts[i], d=Math.hypot(cur[0]-prev[0],cur[1]-prev[1]);
    while(acc+d>=step&&out.length<N){ const t=(step-acc)/d, q=[prev[0]+t*(cur[0]-prev[0]),prev[1]+t*(cur[1]-prev[1])]; out.push(q); prev=q; d=Math.hypot(cur[0]-prev[0],cur[1]-prev[1]); acc=0; }
    acc+=d; prev=cur; }
  while(out.length<N) out.push(pts[pts.length-1]);
  const xs=out.map(p=>p[0]), ys=out.map(p=>p[1]), cx=(Math.min(...xs)+Math.max(...xs))/2, cy=(Math.min(...ys)+Math.max(...ys))/2, sz=Math.max(Math.max(...xs)-Math.min(...xs),Math.max(...ys)-Math.min(...ys))||1;
  return out.map(p=>[(p[0]-cx)/sz,(p[1]-cy)/sz]); }
function mgRecognize(pts){ const n=mgNorm(pts); if(!n) return null; let best=null,bd=1e9;
  for(const [k,list] of Object.entries(MG_TPL)) for(const t of list){ let d=0; for(let i=0;i<48;i++){ const q=t[Math.min(t.length-1,Math.round(i*(t.length-1)/47))]; d+=Math.hypot(n[i][0]-q[0],n[i][1]-q[1]); } d/=48; if(d<bd){ bd=d; best=k; } }
  return bd<0.2?best:null; }
let MW=null;
function mwNew(){ return {state:"ready",foes:[],score:0,hearts:3,t:0,next:30,draw:[],trail:null,fire:[],kills:0,last:null}; }
function mwSpawn(){ const lvl=Math.min(1,MW.t/5400), keys=Object.keys(MG_SYMS), n=1+(Math.random()<lvl*.7?1:0)+(Math.random()<lvl*.35?1:0);
  MW.foes.push({x:40+Math.random()*(GW-80),y:-30,v:(0.35+lvl*.55)*(0.85+Math.random()*.3),syms:Array.from({length:n},()=>keys[Math.floor(Math.random()*keys.length)]),hurt:0}); }
function mwCast(k){ MW.last={k,t:0}; let hit=0;
  for(const f of MW.foes){ if(f.syms[0]===k){ f.syms.shift(); f.hurt=12; hit++; MW.score+=10; MW.fire.push({x:f.x,y:f.y,t:0}); } }
  const dead=MW.foes.filter(f=>!f.syms.length); MW.kills+=dead.length; MW.score+=dead.length*20; MW.foes=MW.foes.filter(f=>f.syms.length);
  if(!hit) MW.last.miss=true; mgSet("mwScore",MW.score); }
function mwEnd(){ MW.state="over"; const fish=miniGiveFish(Math.floor(MW.score/10)*Math.max(1,tapValue()));
  const nb=MW.score>(mini.magicBest||0); if(nb) mini.magicBest=MW.score; saveMiniAll(); mgSet("mwBest",mini.magicBest||0);
  mgOver("magic",nb?"최고 기록!":"마을이 위험해요!",MW.score+"점",[`바이킹 ${MW.kills}명을 물리쳤어요`,`${FISH_SVG} 클릭커 물고기 ${fmt(fish)}마리 받았어요`],()=>{ MW=mwNew(); mgSet("mwScore",0); mgSet("mwHeart","♥♥♥"); }); }
MG_GAMES.magic={step(dt){
  const ctx=mgCtx($("#magicCanvas"));
  if(MW.state==="play"){ MW.t+=dt; MW.next-=dt; if(MW.next<=0){ mwSpawn(); MW.next=Math.max(55,170-MW.t/40)*(0.7+Math.random()*.6); }
    for(const f of MW.foes){ f.y+=f.v*dt; if(f.hurt>0) f.hurt-=dt; }
    const reached=MW.foes.filter(f=>f.y>560); if(reached.length){ MW.hearts-=reached.length; MW.foes=MW.foes.filter(f=>f.y<=560); mgSet("mwHeart","♥".repeat(Math.max(0,MW.hearts))+"♡".repeat(Math.max(0,3-MW.hearts))); if(MW.hearts<=0) mwEnd(); } }
  mgSky(ctx,"#2B3A55","#5B6E8C");
  ctx.fillStyle="#5E8C46"; ctx.fillRect(0,580,GW,GH-580); ctx.fillStyle="#7A4B2A"; for(let x=10;x<GW;x+=70){ ctx.fillRect(x,600,46,34); ctx.fillStyle="#8C3B22"; ctx.beginPath(); ctx.moveTo(x-6,602); ctx.lineTo(x+23,580); ctx.lineTo(x+52,602); ctx.fill(); ctx.fillStyle="#7A4B2A"; }
  ctx.strokeStyle="rgba(255,90,60,.5)"; ctx.setLineDash([10,8]); ctx.beginPath(); ctx.moveTo(0,560); ctx.lineTo(GW,560); ctx.stroke(); ctx.setLineDash([]);
  for(const f of MW.foes){ ctx.save(); ctx.translate(f.x,f.y); if(f.hurt>0) ctx.translate((Math.random()-.5)*6,0);
    if(VIKING_IMG.complete) ctx.drawImage(VIKING_IMG,-22,-22,44,44);
    ctx.font="bold 20px sans-serif"; ctx.textAlign="center"; ctx.textBaseline="middle";
    f.syms.forEach((k,i)=>{ const x=(i-(f.syms.length-1)/2)*30; ctx.fillStyle=i===0?"#FFD34D":"rgba(255,255,255,.75)"; ctx.beginPath(); ctx.roundRect(x-13,-52,26,26,7); ctx.fill(); ctx.fillStyle="#1B2430"; ctx.fillText(MG_SYMS[k],x,-38); });
    ctx.restore(); }
  MW.fire=MW.fire.filter(p=>(p.t+=dt)<24); for(const p of MW.fire){ const g=ctx.createRadialGradient(p.x,p.y,2,p.x,p.y,30+p.t); g.addColorStop(0,"rgba(255,244,176,.9)"); g.addColorStop(1,"rgba(255,90,40,0)"); ctx.fillStyle=g; ctx.beginPath(); ctx.arc(p.x,p.y,30+p.t,0,Math.PI*2); ctx.fill(); }
  if(MW.trail&&MW.trail.length>1){ ctx.strokeStyle="#FFB347"; ctx.lineWidth=8; ctx.lineCap="round"; ctx.lineJoin="round"; ctx.shadowColor="#FF6B2E"; ctx.shadowBlur=14; ctx.beginPath(); MW.trail.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1])); ctx.stroke(); ctx.shadowBlur=0; }
  if(MW.last){ MW.last.t+=dt; if(MW.last.t<35){ ctx.globalAlpha=1-MW.last.t/35; ctx.fillStyle=MW.last.miss?"#FF6B5B":"#FFF4B0"; ctx.font="bold 30px sans-serif"; ctx.textAlign="center"; ctx.fillText(MW.last.miss?`${MW.last.k?MG_SYMS[MW.last.k]:"?"} 빗나감`:`${MG_SYMS[MW.last.k]} 불꽃!`,GW/2,520); ctx.globalAlpha=1; } }
  const tg=ckTarget(); drawRoundImg(ctx,tg&&tg.url,GW/2,650,30,"#22313A");
  if(MW.state==="ready") mgTapText(ctx,"바이킹 머리 위 모양을 그려요",220);
}};
function renderMagic(){ if(!MW||MW.state==="over") MW=mwNew();
  const cv=mgMount("magic",`<div><span>점수</span><b id="mwScore">${MW.score}</b></div><div><span>마을</span><b id="mwHeart" style="color:#E4572E">${"♥".repeat(MW.hearts)}${"♡".repeat(3-MW.hearts)}</b></div><div><span>최고</span><b id="mwBest">${mini.magicBest||0}</b></div>`,
    "바이킹 머리 위의 노란 모양(─ │ V Λ ○ Z)을 화면에 손가락으로 그리면 드래곤이 불을 뿜어요. 같은 모양을 가진 바이킹이 한꺼번에 맞아요. 모양을 다 지우면 쓰러져요. 마을 선까지 오면 마을이 다쳐요.");
  if(!cv) return;
  cv.addEventListener("pointerdown",e=>{ e.preventDefault(); if(MW.state==="ready"){ MW.state="play"; } if(MW.state!=="play") return; const p=mgPt(cv,e); MW.trail=[[p.x,p.y]]; try{cv.setPointerCapture(e.pointerId);}catch(_){} });
  cv.addEventListener("pointermove",e=>{ if(!MW.trail) return; const p=mgPt(cv,e); MW.trail.push([p.x,p.y]); });
  const up=()=>{ if(!MW.trail) return; const k=mgRecognize(MW.trail); MW.trail=null; if(MW.state!=="play") return; if(k) mwCast(k); else MW.last={k:null,t:0,miss:true}; };
  cv.addEventListener("pointerup",up); cv.addEventListener("pointercancel",()=>{ MW.trail=null; }); }

/* ---------- 8. 드래곤 테트리스 ---------- */
const TT_W=10, TT_H=20, TT_C=29, TT_X=10, TT_Y=10;
const TT_P={I:[[0,1],[1,1],[2,1],[3,1]],O:[[1,0],[2,0],[1,1],[2,1]],T:[[1,0],[0,1],[1,1],[2,1]],S:[[1,0],[2,0],[0,1],[1,1]],Z:[[0,0],[1,0],[1,1],[2,1]],J:[[0,0],[0,1],[1,1],[2,1]],L:[[2,0],[0,1],[1,1],[2,1]]};
const TT_COL={I:"#3FA7D6",O:"#F2C14E",T:"#A05CD6",S:"#9BC53D",Z:"#E4572E",J:"#5965D9",L:"#F08A4B"};
let TT=null;
function ttBag(){ const b=Object.keys(TT_P); for(let i=b.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [b[i],b[j]]=[b[j],b[i]]; } return b; }
function ttNew(){ const t={state:"ready",grid:Array.from({length:TT_H},()=>Array(TT_W).fill(null)),bag:ttBag(),score:0,lines:0,level:1,drop:0,cur:null,next:null,flash:[]}; t.next=t.bag.pop(); return t; }
function ttSpawn(){ if(!TT.bag.length) TT.bag=ttBag(); const k=TT.next; TT.next=TT.bag.pop(); TT.cur={k,cells:TT_P[k].map(c=>c.slice()),x:3,y:0};
  if(!ttFits(TT.cur.cells,TT.cur.x,TT.cur.y)) ttEnd(); }
function ttFits(cells,x,y){ return cells.every(([cx,cy])=>{ const gx=x+cx, gy=y+cy; return gx>=0&&gx<TT_W&&gy<TT_H&&(gy<0||!TT.grid[gy][gx]); }); }
function ttMove(dx){ if(TT.state!=="play"||!TT.cur) return; if(ttFits(TT.cur.cells,TT.cur.x+dx,TT.cur.y)) TT.cur.x+=dx; }
function ttRotate(){ if(TT.state!=="play"||!TT.cur||TT.cur.k==="O") return; const rot=TT.cur.cells.map(([x,y])=>[2-y,x]);
  for(const kick of [0,-1,1,-2,2]) if(ttFits(rot,TT.cur.x+kick,TT.cur.y)){ TT.cur.cells=rot; TT.cur.x+=kick; return; } }
function ttLock(){ for(const [cx,cy] of TT.cur.cells){ const gy=TT.cur.y+cy; if(gy<0){ ttEnd(); return; } TT.grid[gy][TT.cur.x+cx]=TT.cur.k; }
  const full=[]; TT.grid.forEach((row,i)=>{ if(row.every(Boolean)) full.push(i); });
  if(full.length){ TT.grid=TT.grid.filter((_,i)=>!full.includes(i)); while(TT.grid.length<TT_H) TT.grid.unshift(Array(TT_W).fill(null));
    TT.lines+=full.length; TT.score+=[0,100,300,500,800][full.length]*TT.level; TT.level=1+Math.floor(TT.lines/10); TT.flash.push({t:0,n:full.length}); }
  mgSet("ttScore",fmt(TT.score)); mgSet("ttLines",TT.lines); TT.cur=null; ttSpawn(); }
function ttDown(){ if(TT.state!=="play"||!TT.cur) return; if(ttFits(TT.cur.cells,TT.cur.x,TT.cur.y+1)) TT.cur.y++; else ttLock(); }
function ttHard(){ if(TT.state!=="play"||!TT.cur) return; let n=0; while(ttFits(TT.cur.cells,TT.cur.x,TT.cur.y+1)){ TT.cur.y++; n++; } TT.score+=n*2; ttLock(); }
function ttEnd(){ if(TT.state==="over") return; TT.state="over"; const fish=miniGiveFish(Math.floor(TT.score/40)*Math.max(1,tapValue()));
  const nb=TT.score>(mini.tetrisBest||0); if(nb) mini.tetrisBest=TT.score; saveMiniAll(); mgSet("ttBest",fmt(mini.tetrisBest||0));
  mgOver("tetris",nb?"최고 기록!":"꽉 찼어요!",fmt(TT.score)+"점",[`${TT.lines}줄 지웠어요 · Lv.${TT.level}`,`${FISH_SVG} 클릭커 물고기 ${fmt(fish)}마리 받았어요`],()=>{ TT=ttNew(); mgSet("ttScore",0); mgSet("ttLines",0); }); }
const TT_BTN=[{k:"left",x:12,lab:"◀"},{k:"rot",x:92,lab:"⟳"},{k:"right",x:172,lab:"▶"},{k:"down",x:252,lab:"▼"},{k:"hard",x:332,lab:"⤓"}];
function ttCell(ctx,x,y,k,a){ ctx.globalAlpha=a||1; ctx.fillStyle=TT_COL[k]; ctx.fillRect(x+1,y+1,TT_C-2,TT_C-2); ctx.fillStyle="rgba(255,255,255,.3)"; ctx.fillRect(x+1,y+1,TT_C-2,5); ctx.fillStyle="rgba(0,0,0,.18)"; ctx.fillRect(x+1,y+TT_C-7,TT_C-2,6); ctx.globalAlpha=1; }
MG_GAMES.tetris={step(dt){
  const ctx=mgCtx($("#tetrisCanvas"));
  if(TT.state==="play"){ if(!TT.cur) ttSpawn(); TT.drop+=dt; const iv=Math.max(4,48-(TT.level-1)*5); if(TT.drop>=iv){ TT.drop=0; ttDown(); } }
  mgSky(ctx,"#16202B","#26394A");
  ctx.fillStyle="rgba(255,255,255,.04)"; ctx.fillRect(TT_X,TT_Y,TT_W*TT_C,TT_H*TT_C);
  ctx.strokeStyle="rgba(255,255,255,.06)"; for(let i=0;i<=TT_W;i++){ ctx.beginPath(); ctx.moveTo(TT_X+i*TT_C,TT_Y); ctx.lineTo(TT_X+i*TT_C,TT_Y+TT_H*TT_C); ctx.stroke(); }
  TT.grid.forEach((row,y)=>row.forEach((k,x)=>{ if(k) ttCell(ctx,TT_X+x*TT_C,TT_Y+y*TT_C,k); }));
  if(TT.cur&&TT.state==="play"){ let gy=TT.cur.y; while(ttFits(TT.cur.cells,TT.cur.x,gy+1)) gy++;
    for(const [cx,cy] of TT.cur.cells){ if(gy+cy>=0) ttCell(ctx,TT_X+(TT.cur.x+cx)*TT_C,TT_Y+(gy+cy)*TT_C,TT.cur.k,.22); }
    for(const [cx,cy] of TT.cur.cells){ if(TT.cur.y+cy>=0) ttCell(ctx,TT_X+(TT.cur.x+cx)*TT_C,TT_Y+(TT.cur.y+cy)*TT_C,TT.cur.k); } }
  const sx=TT_X+TT_W*TT_C+10; ctx.fillStyle="#fff"; ctx.font="bold 16px sans-serif"; ctx.textAlign="left"; ctx.fillText("다음",sx,30);
  if(TT.next) for(const [cx,cy] of TT_P[TT.next]){ ctx.save(); ctx.translate(sx,44); ctx.scale(.7,.7); ttCell(ctx,cx*TT_C,cy*TT_C,TT.next); ctx.restore(); }
  ctx.fillText("Lv."+TT.level,sx,140); const tg=ckTarget(); drawRoundImg(ctx,tg&&tg.url,sx+42,210,32,"#22313A");
  TT.flash=TT.flash.filter(f=>(f.t+=dt)<40); for(const f of TT.flash){ ctx.globalAlpha=1-f.t/40; ctx.fillStyle="#FFD34D"; ctx.font="bold 30px sans-serif"; ctx.textAlign="center"; ctx.fillText(["","한 줄!","두 줄!","세 줄!","테트리스!!"][f.n],TT_X+TT_W*TT_C/2,300-f.t); ctx.globalAlpha=1; }
  for(const b of TT_BTN){ ctx.fillStyle="rgba(255,255,255,.14)"; ctx.beginPath(); ctx.roundRect(b.x,610,72,78,14); ctx.fill(); ctx.fillStyle="#fff"; ctx.font="bold 30px sans-serif"; ctx.textAlign="center"; ctx.textBaseline="middle"; ctx.fillText(b.lab,b.x+36,650); }
  ctx.textBaseline="alphabetic";
  if(TT.state==="ready") mgTapText(ctx,"눌러서 시작",260);
}};
function renderTetris(){ if(!TT||TT.state==="over") TT=ttNew();
  const cv=mgMount("tetris",`<div><span>점수</span><b id="ttScore">${fmt(TT.score)}</b></div><div><span>지운 줄</span><b id="ttLines">${TT.lines}</b></div><div><span>최고</span><b id="ttBest">${fmt(mini.tetrisBest||0)}</b></div>`,
    "떨어지는 블록을 돌리고 옮겨서 가로 한 줄을 꽉 채우면 사라져요. 아래 버튼: ◀ ▶ 옮기기, ⟳ 돌리기, ▼ 한 칸 내리기, ⤓ 바로 떨어뜨리기. 판을 밀어서 옮기거나 톡 눌러 돌릴 수도 있어요. 10줄마다 빨라져요.");
  if(!cv) return; let st=null, rep=null;
  const act=k=>{ if(k==="left") ttMove(-1); else if(k==="right") ttMove(1); else if(k==="rot") ttRotate(); else if(k==="down") ttDown(); else if(k==="hard") ttHard(); };
  cv.addEventListener("pointerdown",e=>{ e.preventDefault(); const p=mgPt(cv,e); if(TT.state==="ready"){ TT.state="play"; return; }
    const b=p.y>=610&&TT_BTN.find(b=>p.x>=b.x&&p.x<=b.x+72); if(b){ act(b.k); if(b.k!=="hard"&&b.k!=="rot"){ clearInterval(rep); rep=setInterval(()=>act(b.k),110); } return; }
    st={x:p.x,y:p.y,mx:0,t:performance.now()}; try{cv.setPointerCapture(e.pointerId);}catch(_){} });
  cv.addEventListener("pointermove",e=>{ if(!st) return; const p=mgPt(cv,e), dx=p.x-st.x-st.mx*TT_C; if(Math.abs(dx)>=TT_C){ const s=Math.sign(dx); ttMove(s); st.mx+=s; } });
  const up=e=>{ clearInterval(rep); if(!st) return; const p=mgPt(cv,e), dy=p.y-st.y, dt=performance.now()-st.t;
    if(dy>90&&Math.abs(p.x-st.x)<60) ttHard(); else if(!st.mx&&Math.abs(dy)<12&&dt<300) ttRotate(); st=null; };
  cv.addEventListener("pointerup",up); cv.addEventListener("pointercancel",()=>{ clearInterval(rep); st=null; }); }
document.addEventListener("keydown",e=>{ if(view!=="click"||mgMode!=="tetris"||!TT||e.target.closest("input,textarea")) return;
  const m={ArrowLeft:()=>ttMove(-1),ArrowRight:()=>ttMove(1),ArrowUp:ttRotate,ArrowDown:ttDown," ":ttHard}; if(m[e.key]){ e.preventDefault(); m[e.key](); } });

function initG5Cloud(d){ d.doc("settings/tama").onSnapshot(s=>{ if(s.exists&&!dirtyDocs["settings/tama"]&&!s.metadata.hasPendingWrites){ tama=Object.assign({},tama,JSON.parse(JSON.stringify(s.data()||{}))); if(view==="click"&&mgMode==="tama") renderTama(); } },()=>{}); }

{ const _rm=renderManage; renderManage=function(){ _rm(); mountAdmin(); }; }

