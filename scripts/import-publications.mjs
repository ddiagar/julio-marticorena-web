import {writeFileSync,mkdirSync} from 'node:fs';
mkdirSync('.stitch/sources',{recursive:true});
for(const [slug,url] of [['presencial','https://www.marticorenajulio.com/remate.asp?id_remate=3676'],['electronico','https://www.marticorenajulio.com/remate.asp?id_remate=3675'],['venta','https://www.marticorenajulio.com/remate.asp?id_remate=472'],['pv4','https://www.marticorenajulio.com/remate.asp?id_remate=1673']]){
 const r=await fetch(url);if(!r.ok)throw new Error(`${slug}: ${r.status}`);
 const html=new TextDecoder('windows-1252').decode(await r.arrayBuffer());writeFileSync(`.stitch/sources/${slug}.html`,html);
 const imageUrls=[...new Set([...html.matchAll(/(?:src|href)\s*=\s*["']([^"']+\.(?:jpg|jpeg|png)(?:\?[^"']*)?)["']/gi)].map(m=>new URL(m[1].replaceAll('&amp;','&'),url).href))].filter(u=>u.includes('/fotos/'));
 const text=html.replace(/<script[\s\S]*?<\/script>/gi,'').replace(/<style[\s\S]*?<\/style>/gi,'').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
 writeFileSync(`.stitch/sources/${slug}.json`,JSON.stringify({url,imageUrls,text},null,2));console.log(JSON.stringify({slug,imageUrls,text:text.slice(0,8500)}));
}
