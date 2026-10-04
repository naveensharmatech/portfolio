import {fields, validateIntake} from './intake-demo-engine.js';
const $ = id => document.getElementById(id);
let selected = 'diagnosis', tested = false, signature = null, packet = null;
let mappings = Object.fromEntries(fields.map(f=>[f.id,f.target]));
let strokes = [], currentStroke = null;
const canvas = $('sigPad'), context = canvas.getContext('2d');
const tabs = [...document.querySelectorAll('[data-tab]')];
function openTab(name, focus=false) {
  for(const tab of tabs) {
    const active = tab.dataset.tab === name;
    tab.setAttribute('aria-selected',String(active)); tab.tabIndex = active?0:-1;
    $('view-'+tab.dataset.tab).hidden = !active;
    if(active&&focus) tab.focus();
  }
  if(name==='builder') resizeCanvas();
}
for(const [i,tab] of tabs.entries()) {
  tab.addEventListener('click',()=>openTab(tab.dataset.tab));
  tab.addEventListener('keydown',event=>{
    let index;
    if(event.key==='ArrowRight') index=(i+1)%tabs.length;
    if(event.key==='ArrowLeft') index=(i+tabs.length-1)%tabs.length;
    if(event.key==='Home') index=0;
    if(event.key==='End') index=tabs.length-1;
    if(index!==undefined){event.preventDefault();openTab(tabs[index].dataset.tab,true);}
  });
}
function values(){return Object.fromEntries(fields.map(f=>[f.id,$('f_'+f.id).value]));}
function invalidatePacket(){packet=null;$('successBox').hidden=true;renderSigners();}
function redraw(){
  const rect=canvas.getBoundingClientRect();
  context.clearRect(0,0,rect.width,150);
  context.strokeStyle='#172321';context.lineWidth=2.2;context.lineCap='round';context.lineJoin='round';
  for(const stroke of strokes) {
    if(!stroke.length) continue;
    context.beginPath();context.moveTo(stroke[0].x*rect.width,stroke[0].y*150);
    for(const p of stroke.slice(1)) context.lineTo(p.x*rect.width,p.y*150);
    context.stroke();
  }
}
function resizeCanvas(){
  const width=canvas.getBoundingClientRect().width;
  if(!width)return;
  const ratio=window.devicePixelRatio||1;
  canvas.width=Math.round(width*ratio);canvas.height=Math.round(150*ratio);
  context.setTransform(ratio,0,0,ratio,0,0);redraw();
}
function point(event){const r=canvas.getBoundingClientRect();return {x:(event.clientX-r.left)/r.width,y:(event.clientY-r.top)/r.height};}
canvas.addEventListener('pointerdown',event=>{
  if(event.button!==0)return;
  event.preventDefault();canvas.setPointerCapture(event.pointerId);
  currentStroke=[point(event)];strokes.push(currentStroke);signature=null;
  $('sigStatus').textContent='Drawing changed. Save your signature.';invalidatePacket();
  if(tested) renderValidation();
});
canvas.addEventListener('pointermove',event=>{
  if(!currentStroke)return;event.preventDefault();currentStroke.push(point(event));redraw();
});
for(const type of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(type,()=>{currentStroke=null;});
window.addEventListener('resize',resizeCanvas);
function clearSignature(){
  strokes=[];currentStroke=null;signature=null;$('signatureName').value='';
  $('sigStatus').textContent='No signature saved.';redraw();invalidatePacket();
  if(tested)renderValidation();
}
$('sigClear').addEventListener('click',clearSignature);
function saveSignature(kind,value){
  signature={kind,value,savedAt:new Date().toISOString()};
  $('sigStatus').textContent=`Signature saved (${kind}) at ${new Date(signature.savedAt).toLocaleTimeString()}.`;
  invalidatePacket();if(tested)renderValidation();
}
$('sigSave').addEventListener('click',()=>{
  if(!strokes.some(s=>s.length>1 && s.some(p=>Math.abs(p.x-s[0].x)+Math.abs(p.y-s[0].y)>.005))) {
    $('sigStatus').textContent='Draw a signature first, or use the typed option.';return;
  }
  saveSignature('drawn',canvas.toDataURL('image/png'));
});
$('saveTyped').addEventListener('click',()=>{
  const name=$('signatureName').value.trim();
  if(!/^[\p{L}\p{M}][\p{L}\p{M}\s'.’\-]*$/u.test(name)){
    $('sigStatus').textContent='Type a name with letters before saving.';return;
  }
  saveSignature('typed',name);
});
$('signatureName').addEventListener('input',()=>{
  if(signature?.kind==='typed'){
    signature=null;invalidatePacket();$('sigStatus').textContent='Typed name changed. Save it again.';
    if(tested)renderValidation();
  }
});
function activeFields(){return fields.filter(f=>f.id!=='chronic'||$('f_diagnosis').value==='Two Chronic Conditions');}
function renderFields(){
  const active=activeFields();
  if(!active.some(f=>f.id===selected))selected='diagnosis';
  $('fieldList').replaceChildren();
  for(const f of active){
    const button=document.createElement('button');button.type='button';button.className='field-button';
    button.setAttribute('aria-pressed',String(f.id===selected));button.textContent=f.label;
    const small=document.createElement('small');small.textContent=f.required?'Required':'Optional';button.append(small);
    button.addEventListener('click',()=>{selected=f.id;renderFields();renderConfig();});
    $('fieldList').append(button);
  }
}
function renderConfig(){
  const f=fields.find(f=>f.id===selected);
  $('cfgLabel').textContent=f.label;$('cfgRequired').textContent=f.required?'Required':'Optional';
  $('cfgMapping').replaceChildren();
  for(const target of ['',...fields.map(f=>f.target)]){
    const option=document.createElement('option');option.value=target;option.textContent=target||'Unmapped';$('cfgMapping').append(option);
  }
  $('cfgMapping').value=mappings[selected];$('cfgExpected').textContent='Expected: '+f.target;
  $('cfgStatus').textContent=mappings[selected]===f.target?'Correct mapping configured.':'Mapping mismatch — validation will fail.';
}
$('cfgMapping').addEventListener('change',()=>{
  mappings[selected]=$('cfgMapping').value;invalidatePacket();renderConfig();if(tested)renderValidation();
});
$('restoreMappings').addEventListener('click',()=>{
  mappings=Object.fromEntries(fields.map(f=>[f.id,f.target]));invalidatePacket();renderConfig();if(tested)renderValidation();
});
function syncConditional(){
  const enabled=$('f_diagnosis').value==='Two Chronic Conditions';
  $('condBlock').hidden=!enabled;$('f_chronic').disabled=!enabled;
  renderFields();renderConfig();
}
for(const f of fields){
  const el=$('f_'+f.id);
  el.addEventListener('input',()=>{invalidatePacket();if(f.id==='diagnosis')syncConditional();if(tested)renderValidation();});
  // Select changes and mobile picker changes are supported even if a browser omits input.
  el.addEventListener('change',()=>{invalidatePacket();if(f.id==='diagnosis')syncConditional();if(tested)renderValidation();});
}
function renderValidation(focus=false){
  tested=true;const result=validateIntake(values(),mappings,signature);
  $('results').hidden=false;$('resSummary').className='pill '+(result.pass?'pass':'fail');
  $('resSummary').textContent=`${result.pass?'PASS':'FAIL'} — ${result.passed}/${result.total} checks passed${result.failed?`; ${result.failed} failed`:''}`;
  $('resList').replaceChildren();
  for(const row of result.rows){
    const li=document.createElement('li');li.className=row.pass?'good':'bad';
    li.textContent=`${row.pass?'PASS':'FAIL'} · ${row.label} — ${row.message}`;$('resList').append(li);
  }
  for(const id of [...fields.map(f=>f.id),'signature']){
    const row=result.rows.find(r=>r.id===id),error=$('e_'+id),input=$('f_'+id);
    if(error){error.hidden=!row||row.pass;error.textContent=row&&!row.pass?row.message:'';}
    if(input){input.classList.toggle('invalid',!!row&&!row.pass);input.setAttribute('aria-invalid',String(!!row&&!row.pass));}
  }
  $('jsonPreview').textContent=JSON.stringify({validation:result.pass?'PASS':'FAIL',...result.record},null,2);
  if(focus)$('results').focus();
  return result;
}
$('runTest').addEventListener('click',()=>renderValidation(true));
$('intakeForm').addEventListener('submit',event=>{
  event.preventDefault();invalidatePacket();const result=renderValidation(true);
  if(!result.pass)return;
  packet={demo:true,reference:'DEMO-'+(crypto.randomUUID?.()||Date.now().toString(36)),createdAt:new Date().toISOString(),validation:'PASS',mappings:{...mappings},...result.record,signatures:[{role:'Applicant',...signature}]};
  $('successBox').hidden=false;$('submissionRef').textContent=`Reference: ${packet.reference}`;renderSigners();
});
$('downloadJson').addEventListener('click',()=>{
  if(!packet)return;
  const blob=new Blob([JSON.stringify(packet,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob);
  const anchor=document.createElement('a');anchor.href=url;anchor.download='naveen-intake-demo.json';anchor.hidden=true;document.body.append(anchor);anchor.click();anchor.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);
});
function resetForm(){
  tested=false;$('intakeForm').reset();mappings=Object.fromEntries(fields.map(f=>[f.id,f.target]));
  clearSignature();$('results').hidden=true;
  for(const f of fields){$('f_'+f.id).classList.remove('invalid');$('f_'+f.id).setAttribute('aria-invalid','false');$('e_'+f.id).hidden=true;}
  $('e_signature').hidden=true;syncConditional();
}
$('resetForm').addEventListener('click',resetForm);
function loadSample(failing=false){
  resetForm();const sample={first:'Jordan',last:'Rivera',dob:failing?'02/30/1990':'04/12/1990',email:failing?'not-an-email':'jordan.rivera@example.com',diagnosis:failing?'Two Chronic Conditions':'Single Chronic Condition',chronic:'',transport:'Yes'};
  for(const f of fields)$('f_'+f.id).value=sample[f.id];
  $('signatureName').value='Jordan Rivera';saveSignature('typed','Jordan Rivera');syncConditional();renderValidation(true);
}
$('fillValid').addEventListener('click',()=>loadSample());$('fillInvalid').addEventListener('click',()=>loadSample(true));
function renderSigners(){
  $('signRows').replaceChildren();
  const roles=['Applicant','Caregiver','Program Coordinator'];
  for(const [index,role] of roles.entries()){
    const row=document.createElement('div');row.className='signer';const label=document.createElement('strong');label.textContent=`${index+1}. ${role}`;row.append(label);
    const signed=packet?.signatures[index];
    if(signed){const status=document.createElement('span');status.className='pill pass';status.textContent='Signed · '+new Date(signed.savedAt).toLocaleTimeString();row.append(status);}
    else{const button=document.createElement('button');button.className='btn';button.textContent='Simulate '+role+' signature';button.disabled=!packet||index!==packet.signatures.length;
      button.addEventListener('click',()=>{if(!packet||index!==packet.signatures.length)return;packet.signatures.push({role,kind:'simulated',value:'Demo signer',savedAt:new Date().toISOString()});renderSigners();});row.append(button);}
    $('signRows').append(row);
  }
  const count=packet?.signatures.length||0;
  $('signState').className='pill '+(count===3?'pass':'');$('signState').textContent=!packet?'Submit a passing intake to begin.':count===3?'PASS — all 3 sample signer steps complete':`${count}/3 signed — next signer unlocked`;
  if(packet){$('submissionStatus').textContent=count===3?'PASS — demo packet complete':'PASS — demo packet created';packet.status=count===3?'complete':'awaiting-signatures';$('jsonPreview').textContent=JSON.stringify(packet,null,2);}
}
$('resetSigners').addEventListener('click',()=>{if(packet){packet.signatures=packet.signatures.slice(0,1);renderSigners();}});
const taskSeeds=[{title:'Configure intake labels',context:'Input labels and required rules',stage:0},{title:'Map intake fields',context:'Check configured output targets',stage:0},{title:'Check conditional inputs',context:'Validate the extra required field',stage:1}];
let tasks=taskSeeds.map(t=>({...t}));const stages=['Pending','Mapping','Testing','Complete'];
function renderTasks(){
  $('taskBoard').replaceChildren();
  for(const [stage,label] of stages.entries()){
    const lane=document.createElement('div');lane.className='lane';const heading=document.createElement('h3');heading.textContent=`${label} (${tasks.filter(t=>t.stage===stage).length})`;lane.append(heading);
    for(const t of tasks.filter(t=>t.stage===stage)){
      const card=document.createElement('div');card.className='card';const title=document.createElement('strong');title.textContent=t.title;card.append(title);
      const description=document.createElement('p');description.className='hint';description.textContent=t.context;card.append(description);
      if(stage<3){const button=document.createElement('button');button.className='btn';button.textContent=stage===2?'Validate current form':'Move to '+stages[stage+1];button.addEventListener('click',()=>{
        if(stage===2){const result=validateIntake(values(),mappings,signature);if(!result.pass){description.textContent=`FAIL — ${result.failed} checks need fixing. Open Form & mapping.`;return;}}
        t.stage++;renderTasks();});card.append(button);}
      lane.append(card);
    }
    $('taskBoard').append(lane);
  }
}
$('resetTasks').addEventListener('click',()=>{tasks=taskSeeds.map(t=>({...t}));renderTasks();$('suiteResults').hidden=true;});
$('runSuite').addEventListener('click',()=>{
  const v={first:'Jordan',last:'Rivera',dob:'04/12/1990',email:'jordan@example.com',diagnosis:'Single Chronic Condition',transport:'Yes'};
  const m=Object.fromEntries(fields.map(f=>[f.id,f.target]));const s={value:'Jordan Rivera',savedAt:new Date().toISOString()};
  const cases=[
    ['Valid intake',v,m,s,true],
    ['Missing first name',{...v,first:''},m,s,false],
    ['Impossible date',{...v,dob:'02/30/1990'},m,s,false],
    ['Invalid email',{...v,email:'invalid'},m,s,false],
    ['Missing conditional detail',{...v,diagnosis:'Two Chronic Conditions'},m,s,false],
    ['Conditional detail provided',{...v,diagnosis:'Two Chronic Conditions',chronic:'Sample A and B'},m,s,true],
    ['Wrong output target',v,{...m,email:'patient.dob'},s,false],
    ['Unsigned intake',v,m,null,false],
    ['Optional value empty',{...v,transport:''},m,s,true]
  ];
  const table=document.createElement('table');table.className='test-table';const head=document.createElement('tr');
  for(const name of ['Test case','Expected','Actual','Test result']){const th=document.createElement('th');th.textContent=name;head.append(th);}table.append(head);
  for(const [name,data,map,sig,expected] of cases){const actual=validateIntake(data,map,sig).pass;const row=document.createElement('tr');for(const value of [name,expected?'PASS':'FAIL',actual?'PASS':'FAIL',actual===expected?'PASS':'FAIL']){const td=document.createElement('td');td.textContent=value;row.append(td);}table.append(row);}
  $('suiteTable').replaceChildren(table);$('suiteResults').hidden=false;
});
resizeCanvas();syncConditional();renderSigners();renderTasks();
