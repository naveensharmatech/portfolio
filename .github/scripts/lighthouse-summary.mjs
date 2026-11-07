import {readFileSync} from 'node:fs';
const report=JSON.parse(readFileSync(process.argv[2],'utf8'));
console.log(JSON.stringify({
 url:report.finalDisplayedUrl||report.finalUrl,fetchTime:report.fetchTime,runtimeError:report.runtimeError,
 categories:Object.fromEntries(Object.entries(report.categories||{}).map(([key,v])=>[key,Math.round(v.score*100)])),
 metrics:Object.fromEntries(['first-contentful-paint','largest-contentful-paint','speed-index','total-blocking-time','cumulative-layout-shift'].map(key=>[key,report.audits?.[key]?.displayValue])),
 findings:Object.values(report.audits||{}).filter(a=>a.score!==null&&a.score<1).map(a=>({id:a.id,title:a.title,score:a.score,value:a.displayValue,details:a.details?.items?.slice(0,5)}))
},null,2));
