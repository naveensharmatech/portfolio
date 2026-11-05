import {expectedMappings,sampleSources,workflowInputs,mappingChecks} from './bolt-workbench-engine.js?v=2';
const $=id=>document.getElementById(id);
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const labels={name:{name:'Patient name',group:'Personal info',value:'Jordan Rivera',editable:true},signed:{name:'Signing date employee',group:'Signatures',value:'2026-04-08',editable:true},transport:{name:'Transportation',group:'Anticipated Need',value:'Yes',editable:true},diagnosis:{name:'Diagnosis 1',group:'Child workflow',value:'Sample condition A',editable:true}};
let selected='name',mappings={...expectedMappings},hasTested=false;
function renderInputs(){
 $('docInputs').innerHTML=Object.entries(labels).map(([id,l])=>`<button class="doc-input" data-label="${id}" aria-pressed="${id===selected}"><strong>${esc(l.name||'Unlabeled input')}</strong><small>${esc(l.group)} · ${id==='transport'?'Checkbox':'Text'} input</small></button>`).join('');
 for(const b of $('docInputs').querySelectorAll('button'))b.addEventListener('click',()=>{selected=b.dataset.label;renderInputs();editLabel();});
}
function editLabel(){const l=labels[selected];$('labelName').value=l.name;$('labelGroup').value=l.group;$('labelDefault').value=l.value;$('labelEditable').checked=l.editable;}
function generated(){
 $('generatedDoc').hidden=false;
 $('generatedPaper').innerHTML='<span class="eyebrow">Generated sample · saved configuration</span><h2>Employment packet</h2>'+Object.entries(labels).map(([id,l])=>`<label for="preview-${id}">${esc(l.name)}</label>${l.editable?`<input id="preview-${id}" value="${esc(l.value)}">`:`<p>${esc(l.value||'—')}</p>`}`).join('')+'<hr><p>Portfolio sample only · no submission to BOLT</p>';
}
for(const id of ['labelName','labelGroup','labelDefault','labelEditable'])$(id).addEventListener('input',()=>{$('labelStatus').textContent='Unsaved changes. Save Changes before generating.';});
$('saveLabel').addEventListener('click',()=>{
 if(!$('labelName').value.trim()){$('labelStatus').textContent='FAIL — enter an input label before saving.';return;}
 labels[selected]={name:$('labelName').value.trim(),group:$('labelGroup').value.trim(),value:$('labelDefault').value,editable:$('labelEditable').checked};
 $('labelStatus').textContent='PASS — label configuration saved.';$('generatedDoc').hidden=true;renderInputs();renderMappingRows();previewMapped();if(hasTested)runMapping();
});
$('generateDoc').addEventListener('click',generated);
$('printDoc').addEventListener('click',()=>window.print());
function renderMappingRows(){
 $('dynamicRows').innerHTML=Object.entries(labels).map(([id,l])=>`<tr><td>${esc(l.name)}</td><td>${id==='transport'?'checkbox':'text'}</td><td>Yes</td><td>${id==='signed'?'Yes':'No'}</td><td><label class="sr-only" for="map-${id}">${esc(l.name)} source</label><select id="map-${id}" data-map="${id}"><option value="">Unmapped</option>${Object.keys(sampleSources).map(s=>`<option value="${esc(s)}" ${s===mappings[id]?'selected':''}>${esc(s)}</option>`).join('')}</select></td></tr>`).join('');
 for(const s of $('dynamicRows').querySelectorAll('select'))s.addEventListener('change',()=>{mappings[s.dataset.map]=s.value;previewMapped();if(hasTested)runMapping();});
}
function previewMapped(){
 $('mappedPaper').innerHTML='<span class="eyebrow">Sample mapped document</span><h2>Welcome packet</h2>'+Object.entries(labels).map(([id,l])=>`<label>${esc(l.name)}</label><span class="mapped-value">${id==='transport'?(sampleSources[mappings[id]]==='Yes'?'☑ Transportation':'☐ Transportation'):esc(sampleSources[mappings[id]]??'UNRESOLVED')}</span>`).join('');
}
function runMapping(){
 hasTested=true;const checks=mappingChecks(mappings,labels),passed=checks.filter(c=>c.pass).length;
 $('mappingResult').className='pill '+(passed===checks.length?'pass':'fail');$('mappingResult').textContent=`${passed===checks.length?'PASS':'FAIL'} — ${passed}/${checks.length} mappings verified`;
 $('mappingChecks').innerHTML=checks.map(c=>`<li class="${c.pass?'good':'bad'}">${c.pass?'PASS':'FAIL'} · ${esc(labels[c.id].name)} — ${esc(c.message)}</li>`).join('');
}
$('testMapping').addEventListener('click',runMapping);
$('breakMapping').addEventListener('click',()=>{mappings.signed='Current Date';mappings.diagnosis='';renderMappingRows();previewMapped();runMapping();});
$('fixMapping').addEventListener('click',()=>{mappings={...expectedMappings};renderMappingRows();previewMapped();runMapping();});
function subOptions(){
 const options=workflowInputs[$('workflow').value][$('workflowStage').value]||[];
 $('workflowSub').replaceChildren();for(const text of options){const opt=document.createElement('option');opt.textContent=text;opt.value=text;$('workflowSub').append(opt);}
 $('workflowSub').disabled=!options.length;$('applySub').disabled=!options.length;
 $('subStatus').textContent=options.length?'Select and apply the intended sub-input.':'FAIL — this workflow/status has no available sub-input. Choose another status or workflow.';
}
function stageOptions(){
 $('workflowStage').replaceChildren();for(const text of Object.keys(workflowInputs[$('workflow').value])){const o=document.createElement('option');o.value=text;o.textContent=text;$('workflowStage').append(o);}subOptions();
}
$('workflow').addEventListener('change',stageOptions);$('workflowStage').addEventListener('change',subOptions);
$('applySub').addEventListener('click',()=>{
 const v=$('workflowSub').value;if(!v)return;
 mappings.diagnosis=`${$('workflow').value} > ${$('workflowStage').value} > ${v}`;
 $('subStatus').textContent='Applied to Diagnosis 1. Run Mapping Test to verify the selected source.';renderMappingRows();previewMapped();runMapping();
});
renderInputs();editLabel();renderMappingRows();previewMapped();stageOptions();
let dropdowns=[{name:'Employment packet',type:'Esign',step:'Step 2',file:'Employment packet',tooltip:'Complete the employment packet.'}];
function renderDropdowns(){
 $('dropdownRows').replaceChildren();
 for(const [i,row] of dropdowns.entries()){
  const card=document.createElement('div');card.className='card';
  const title=document.createElement('strong');title.textContent=row.name;card.append(title);
  const text=document.createElement('p');text.textContent=`${row.type} · ${row.step} · ${row.file}`;card.append(text);
  const hint=document.createElement('p');hint.className='hint';hint.textContent=row.tooltip;card.append(hint);
  const remove=document.createElement('button');remove.className='btn';remove.textContent='Remove '+row.name;remove.addEventListener('click',()=>{dropdowns.splice(i,1);renderDropdowns();$('dropStatus').textContent='Input removed.';});card.append(remove);$('dropdownRows').append(card);
 }
}
$('addDropdown').addEventListener('click',()=>{
 const name=$('dropName').value.trim();
 if(!name){$('dropStatus').textContent='FAIL — enter an input name.';return;}
 if(dropdowns.some(d=>d.name.toLowerCase()===name.toLowerCase())){$('dropStatus').textContent='FAIL — this input name already exists.';return;}
 dropdowns.push({name,type:$('dropType').value,step:$('dropStep').value,file:$('dropFile').value,tooltip:$('dropTooltip').value.trim()});renderDropdowns();$('dropStatus').textContent='PASS — intake input linked to the selected document and step.';$('dropName').value='';
});
renderDropdowns();
const signerRoles=['Consumer / Patient','Designated Representative / Caregiver','Health Plan Representative / Insurance / Homecare'];
for(const [i,role] of signerRoles.entries()){
 const row=document.createElement('div');row.className='card';
 const a=document.createElement('a');a.href='#demo-signer-'+(i+1);a.textContent=`${i+1}. ${role}`;
 a.addEventListener('click',()=>{$('linkStatus').textContent='Selected sample signer: '+role+'. Submit a passing case, then use the signer controls below.';});row.append(a);
 const input=document.createElement('input');const url=new URL(location.href);url.hash='demo-signer-'+(i+1);input.value=url.href;input.readOnly=true;input.setAttribute('aria-label',role+' demo link');row.append(input);
 const copy=document.createElement('button');copy.className='btn';copy.textContent='Copy '+role+' link';copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(input.value);$('linkStatus').textContent='Copied the local sample link for '+role+'.';}catch{input.focus();input.select();$('linkStatus').textContent='Select and copy the highlighted sample link.';}});row.append(copy);$('signLinks').append(row);
}

function selectLinkedSigner(){
 const match=/^#demo-signer-([1-3])$/.exec(location.hash);if(!match)return;
 $('tab-signers').click();$('linkStatus').textContent='Selected sample signer: '+signerRoles[Number(match[1])-1]+'. Submit a passing case in this browser session to begin the sample signing flow.';
}
window.addEventListener('hashchange',selectLinkedSigner);selectLinkedSigner();
