const form = document.querySelector('#claimForm');
const steps = [...document.querySelectorAll('.step')];
const nextBtn = document.querySelector('#next');
const backBtn = document.querySelector('#back');
const formActions = document.querySelector('#formActions');
const progressBar = document.querySelector('#progressBar');
const stepLabel = document.querySelector('#stepLabel');
const saveStatus = document.querySelector('#saveStatus');
const liveStatus = document.querySelector('#liveStatus');
const globalError = document.querySelector('#globalError');
const fileInput = document.querySelector('#evidence');
const fileStatus = document.querySelector('#fileStatus');
const unknownTime = document.querySelector('#unknownTime');
const lossTime = document.querySelector('#lossTime');
const STORAGE_KEY = 'cedarline-fnol-demo-v1';
let currentStep = 1;
let selectedFiles = [];

const fallbackCategories = [
  ['collision','Vehicle collision','Crash involving another vehicle, object, or roadway incident.'],
  ['storm','Weather or storm','Wind, hail, lightning, falling branches, or storm-related damage.'],
  ['water','Water damage','Leak, burst pipe, appliance, or other non-flood water loss.'],
  ['theft','Theft or vandalism','Stolen property, break-in, malicious damage, or attempted theft.'],
  ['other','Something else / not sure','Use this if none of the categories fit or you are unsure.']
];

async function loadLossCategories(){
  const target = document.querySelector('#lossOptions');
  try{
    const response = await fetch('data/loss-categories.xml');
    if(!response.ok) throw new Error('XML request failed');
    const xmlText = await response.text();
    const xml = new DOMParser().parseFromString(xmlText,'application/xml');
    const categories = [...xml.querySelectorAll('category')].map(node=>[
      node.getAttribute('code'),
      node.querySelector('label')?.textContent || 'Unknown',
      node.querySelector('description')?.textContent || ''
    ]);
    renderLossCategories(categories);
  }catch(error){
    renderLossCategories(fallbackCategories);
    liveStatus.textContent = 'Loss categories loaded using the built-in fallback data.';
  }
  function renderLossCategories(categories){
    target.replaceChildren(...categories.map(([code,label,description])=>{
      const wrapper=document.createElement('label'); wrapper.className='choice-card';
      const input=document.createElement('input'); input.type='radio'; input.name='lossType'; input.value=label; input.required=true;
      const span=document.createElement('span');
      const strong=document.createElement('strong'); strong.textContent=label;
      const small=document.createElement('small'); small.textContent=description;
      span.append(strong,small); wrapper.append(input,span); return wrapper;
    }));
    restoreDraft();
  }
}

function values(){
  const data = Object.fromEntries(new FormData(form).entries());
  data.unknownTime = unknownTime.checked;
  data.skipEvidence = document.querySelector('#skipEvidence').checked;
  data.files = selectedFiles;
  data.step = currentStep;
  return data;
}
function saveDraft(announce=true){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(values()));
  const time = new Date().toLocaleTimeString([], {hour:'numeric',minute:'2-digit'});
  saveStatus.textContent = `Saved ${time}`;
  if(announce) liveStatus.textContent = 'Your progress has been saved.';
}
function restoreDraft(){
  const raw=localStorage.getItem(STORAGE_KEY); if(!raw) return;
  let data; try{data=JSON.parse(raw)}catch{return}
  Object.entries(data).forEach(([key,value])=>{
    if(['files','step','unknownTime','skipEvidence'].includes(key)) return;
    const controls=form.elements[key]; if(!controls) return;
    if(controls instanceof RadioNodeList){
      [...controls].forEach(control=>{ if(control.value===value) control.checked=true; });
    }else if(controls.type!=='file'){ controls.value=value ?? ''; }
  });
  unknownTime.checked=Boolean(data.unknownTime); lossTime.disabled=unknownTime.checked;
  document.querySelector('#skipEvidence').checked=Boolean(data.skipEvidence);
  selectedFiles=Array.isArray(data.files)?data.files:[]; updateFileStatus();
  saveStatus.textContent='Draft restored'; liveStatus.textContent='Your saved draft was restored.';
}
function setStep(step){
  currentStep=step;
  steps.forEach(section=>section.hidden=Number(section.dataset.step)!==step);
  if(step<=7){
    progressBar.style.width=`${Math.max(1,step)/7*100}%`;
    stepLabel.textContent=`Step ${step} of 7`;
    backBtn.disabled=step===1;
    nextBtn.textContent = step===1?'Start report':step===7?'Submit claim report':'Continue';
    formActions.hidden=false;
  }else{
    progressBar.style.width='100%'; stepLabel.textContent='Submitted'; formActions.hidden=true;
  }
  globalError.hidden=true; globalError.innerHTML='';
  const heading=document.querySelector(`.step[data-step="${step}"] h2`); heading?.focus();
  window.scrollTo({top:0,behavior:'smooth'});
}
function clearErrors(){
  document.querySelectorAll('.field-error').forEach(el=>el.textContent='');
  globalError.hidden=true; globalError.innerHTML='';
}
function validateStep(step){
  clearErrors(); const errors=[];
  const add=(id,message)=>{ const target=document.querySelector(`#${id}`); if(target) target.textContent=message; errors.push({id,message}); };
  if(step===2 && !form.querySelector('input[name="lossType"]:checked')) add('lossHelp','Choose the option that best matches what happened.');
  if(step===3){ if(!document.querySelector('#lossDate').value) add('lossDateError','Enter the date of the loss.'); if(!document.querySelector('#location').value.trim()) add('locationError','Enter an address, intersection, or general location.'); }
  if(step===4){ if(!form.querySelector('input[name="injury"]:checked')) add('injuryError','Choose No, Yes, or Unsure.'); if(!form.querySelector('input[name="usable"]:checked')) add('usableError','Choose Yes, No, or Unsure.'); if(!document.querySelector('#damage').value.trim()) add('damageError','Describe the damage you can see right now.'); }
  if(step===6 && !form.querySelector('input[name="contact"]:checked')) add('contactError','Choose how you would like us to contact you first.');
  if(step===7 && !document.querySelector('#accuracy').checked) add('accuracyError','Confirm the statement before submitting your report.');
  if(errors.length){
    globalError.hidden=false;
    globalError.innerHTML=`<strong>Please fix ${errors.length===1?'this item':`${errors.length} items`}:</strong><ul>${errors.map(e=>`<li>${e.message}</li>`).join('')}</ul>`;
    globalError.focus(); return false;
  }
  return true;
}
function buildReview(){
  const data=values();
  const rows=[
    ['What happened',data.lossType||'Not provided'],
    ['When',`${data.lossDate||'Not provided'}${data.unknownTime?' • exact time unknown':data.lossTime?` • ${data.lossTime}`:''}`],
    ['Where',data.location||'Not provided'],
    ['Injuries',data.injury||'Not provided'],
    ['Safe to use',data.usable||'Not provided'],
    ['Visible damage',data.damage||'Not provided'],
    ['Evidence',selectedFiles.length?`${selectedFiles.length} file(s): ${selectedFiles.join(', ')}`:'Adding later'],
    ['Preferred contact',data.contact||'Not provided'],
    ['Best contact time',data.contactWindow||'No preference provided']
  ];
  const container=document.querySelector('#reviewContent'); container.innerHTML='';
  rows.forEach(([label,value])=>{
    const dl=document.createElement('dl'); dl.className='review-item';
    const dt=document.createElement('dt'); dt.textContent=label;
    const dd=document.createElement('dd'); dd.textContent=value;
    dl.append(dt,dd); container.append(dl);
  });
}
function submitClaim(){
  const data=values();
  const stamp=Date.now().toString().slice(-6);
  document.querySelector('#claimNumber').textContent=`CLM-${stamp}`;
  document.querySelector('#submittedAt').textContent=new Date().toLocaleString();
  document.querySelector('#confirmedContact').textContent=data.contact||'Your selected preference';
  localStorage.removeItem(STORAGE_KEY);
  liveStatus.textContent='Claim report submitted successfully.';
  setStep(8);
}
function updateFileStatus(){ fileStatus.textContent=selectedFiles.length?`${selectedFiles.length} file(s) selected: ${selectedFiles.join(', ')}`:'No files selected.'; }

nextBtn.addEventListener('click',()=>{
  if(!validateStep(currentStep)) return;
  if(currentStep===7){submitClaim(); return;}
  saveDraft(false); const next=currentStep+1; if(next===7) buildReview(); setStep(next);
});
backBtn.addEventListener('click',()=>{if(currentStep>1)setStep(currentStep-1)});
form.addEventListener('input',event=>{ if(event.target.type!=='file') saveDraft(false); });
fileInput.addEventListener('change',()=>{selectedFiles=[...fileInput.files].map(file=>file.name); updateFileStatus(); saveDraft(false); liveStatus.textContent=`${selectedFiles.length} file${selectedFiles.length===1?'':'s'} selected.`;});
unknownTime.addEventListener('change',()=>{lossTime.disabled=unknownTime.checked;if(unknownTime.checked)lossTime.value='';saveDraft(false)});
document.querySelector('#saveExit').addEventListener('click',()=>saveDraft(true));
document.querySelector('#restart').addEventListener('click',()=>{form.reset();selectedFiles=[];updateFileStatus();localStorage.removeItem(STORAGE_KEY);setStep(1);saveStatus.textContent='Not saved yet';});

loadLossCategories();
setStep(1);
