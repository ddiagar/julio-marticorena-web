import { readFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
const page=process.argv[2];
const raw=JSON.parse(readFileSync(`screen-${page}.json`, 'utf8'));
const screen=raw.structuredContent ?? JSON.parse(raw.content.find(c=>c.type==='text').text);
mkdirSync('.stitch/designs',{recursive:true});
const fetchScript='/Users/ddiagar-mpro/.codex/skills/react-components/scripts/fetch-stitch.sh';
for(const [url,extension] of [[screen.htmlCode.downloadUrl,'html'],[screen.screenshot.downloadUrl+`=w${screen.width}`,'png']]) {
 execFileSync('bash',[fetchScript,url,`.stitch/designs/${page}.${extension}`],{stdio:'inherit'});
}
console.log(JSON.stringify({page,id:screen.id,width:screen.width,height:screen.height}));
