import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const [method, input, output] = process.argv.slice(2);
const headers = JSON.parse(execFileSync(fileURLToPath(new URL('../../.stitch-token-helper.sh', import.meta.url)), [], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }));
const params = input ? JSON.parse(readFileSync(input, 'utf8')) : {};
const response = await fetch('https://stitch.googleapis.com/mcp', {
  method: 'POST', headers: { ...headers, 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream' },
  body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: method === 'tools/list' ? method : 'tools/call', params: method === 'tools/list' ? {} : { name: method, arguments: params } }),
  signal: AbortSignal.timeout(600000)
});
const body = await response.text();
let result;
try { result = JSON.parse(body); } catch { const events = body.split('\n').filter(line => line.startsWith('data: ')); result = JSON.parse(events.at(-1).slice(6)); }
if (!response.ok || result.error || result.result?.isError) { console.error(JSON.stringify(result)); process.exit(1); }
if (output) { writeFileSync(output, JSON.stringify(result.result, null, 2)); console.log('Saved:', output); }
else console.log(JSON.stringify(result.result, null, 2));
