import { test } from 'node:test';
import assert from 'node:assert/strict';
import { onRequestGet, onRequestPost } from '../functions/api/chat.js';
test('chat validates input and returns an explicitly labelled fallback without secrets',async()=>{
  const get=await (await onRequestGet({env:{}})).json();assert.equal(get.ai_configured,false);
  const post=body=>onRequestPost({env:{},request:new Request('https://test/api/chat',{method:'POST',body:JSON.stringify(body)})});
  assert.equal((await post({messages:[]})).status,400);
  assert.equal((await post({messages:[{role:'system',content:'test'}]})).status,400);
  const result=await (await post({messages:[{role:'user',content:'Who is Naveen?'}]})).json();
  assert.equal(result.mode,'saved-knowledge');assert.equal(result.ai_status,'missing_api_key');assert.match(result.reply,/Naveen/);
});
