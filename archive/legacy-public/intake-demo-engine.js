// Shared validation for the local portfolio demonstration.
export const fields = [
  {id:'first', label:'First name', target:'patient.first_name', required:true},
  {id:'last', label:'Last name', target:'patient.last_name', required:true},
  {id:'dob', label:'Date of birth', target:'patient.dob', required:true},
  {id:'email', label:'Email', target:'patient.email', required:true},
  {id:'diagnosis', label:'Diagnosis type', target:'patient.diagnosis_type', required:true},
  {id:'chronic', label:'Condition details', target:'patient.condition_details', required:true},
  {id:'transport', label:'Transportation', target:'patient.transportation', required:false},
];
export const diagnoses = ['Single Chronic Condition','Two Chronic Conditions','Developmental Disability'];
export function dateValue(value, today = new Date()) {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  if (!match) return null;
  const [,month,day,year] = match.map(Number);
  const d = new Date(year,month-1,day);
  const cutoff = new Date(today.getFullYear(),today.getMonth(),today.getDate());
  if(year<1900 || d.getFullYear()!==year || d.getMonth()!==month-1 || d.getDate()!==day || d>cutoff) return null;
  return `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
}
export function validateIntake(values, mappings, signature, today = new Date()) {
  const rows = [];
  const active = fields.filter(f=>f.id!=='chronic' || values.diagnosis==='Two Chronic Conditions');
  for(const f of active) {
    const value = String(values[f.id] || '').trim();
    let message = '';
    if(f.required && !value) message = `${f.label} is required.`;
    else if(value && ['first','last'].includes(f.id) && !/^[\p{L}\p{M}][\p{L}\p{M}\s'.’\-]*$/u.test(value)) message = 'Use a name containing letters, spaces, apostrophes or hyphens.';
    else if(f.id==='dob' && value && !dateValue(value,today)) message = 'Use a real, non-future date in MM/DD/YYYY format (1900 or later).';
    else if(f.id==='email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) message = 'Enter a valid email address.';
    else if(f.id==='diagnosis' && !diagnoses.includes(value)) message = 'Select a listed diagnosis type.';
    else if(f.id==='transport' && value && !['Yes','No'].includes(value)) message = 'Choose Yes, No, or leave this optional field empty.';
    rows.push({id:f.id, label:f.label, pass:!message, message:message || (value?'Value is valid.':'Optional field left empty.')});
    const mapped = mappings[f.id] === f.target;
    rows.push({id:`map-${f.id}`, label:`${f.label} mapping`, pass:mapped, message:mapped?`Resolves to ${f.target}.`:`Expected ${f.target}; received ${mappings[f.id] || 'no target'}.`});
  }
  rows.push({id:'signature',label:'Applicant signature',pass:!!signature?.savedAt && !!signature?.value,message:signature?.savedAt&&signature?.value?'Signature saved with a timestamp.':'Draw or type and save a demo signature.'});
  const failed = rows.filter(r=>!r.pass).length;
  const record = {patient:{first_name:String(values.first||'').trim(),last_name:String(values.last||'').trim(),dob:dateValue(String(values.dob||'').trim(),today),email:String(values.email||'').trim(),diagnosis_type:values.diagnosis,transportation:values.transport||null}};
  if(values.diagnosis==='Two Chronic Conditions') record.patient.condition_details=String(values.chronic||'').trim();
  return {pass:failed===0, failed, passed:rows.length-failed, total:rows.length, rows, record};
}
