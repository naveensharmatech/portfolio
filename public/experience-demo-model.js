export function productionReport({processed,accepted,rejected,observation,issue,checks}) {
  const counts=[processed,accepted,rejected].map(Number);
  if(counts.some(n=>!Number.isSafeInteger(n)||n<0)||counts[0]===0) return {error:'Enter whole, non-negative counts and a processed total greater than zero.'};
  if(counts[1]+counts[2]!==counts[0]) return {error:'Accepted + rejected must equal the processed total. Reconcile the counts before handoff.'};
  if(checks.some(c=>!c)) return {error:'Complete the three review checks before generating the handoff.'};
  if(issue!=='none'&&!observation.trim()) return {error:'Add an observation so the next person understands the issue.'};
  return {processed:counts[0],accepted:counts[1],rejected:counts[2],yield:(counts[1]/counts[0]*100).toFixed(1),status:issue==='none'?'Routine handoff':'Issue recorded · supervisor review needed',observation:observation.trim()||'No additional observation recorded.',issue};
}
export function enrollment({name,course,batch,fee,paid,capacity},roster) {
  if(!name.trim()) return {error:'Enter a sample learner name.'};
  const f=Number(fee),p=Number(paid),c=Number(capacity);
  if(!Number.isFinite(f)||!Number.isFinite(p)||f<0||p<0||p>f) return {error:'Enter valid fees. Amount paid must be between zero and the total fee.'};
  if(!Number.isSafeInteger(c)||c<1||c>30) return {error:'Set a demo batch capacity from 1 to 30.'};
  if(roster.filter(r=>r.batch===batch).length>=c) return {error:'This demo batch is full. Choose another time or increase the sample capacity.'};
  if(roster.some(r=>r.name.toLowerCase()===name.trim().toLowerCase()&&r.batch===batch)) return {error:'This learner is already enrolled in that batch.'};
  return {name:name.trim(),course,batch,fee:f,paid:p,balance:f-p};
}
