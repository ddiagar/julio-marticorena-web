import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
const galleries={};const report={};
for(const [slug,id] of [['presencial','3676'],['electronico','3675'],['venta','472'],['pv4','1673']]){
 const source=JSON.parse(readFileSync(`.stitch/sources/${slug}.json`,'utf8'));const html=readFileSync(`.stitch/sources/${slug}.html`,'utf8');
 const pageUrls=[...new Set([...html.matchAll(/href="([^"]*DIRECTION=\d+)"/g)].map(m=>new URL(m[1].replaceAll('&amp;','&'),source.url).href))];
 const urls=new Set(source.imageUrls);
 for(const url of pageUrls){if(new URL(url).searchParams.get('DIRECTION')==='1')continue;const res=await fetch(url);if(!res.ok)throw new Error(`Page failed ${res.status}`);const body=new TextDecoder('windows-1252').decode(await res.arrayBuffer());for(const m of body.matchAll(/src\s*=\s*"([^"]*fotos\/[^" ]+\.(?:jpg|jpeg|png))"/gi))urls.add(new URL(m[1],url).href);}
 mkdirSync(`public/images/${slug}`,{recursive:true});const images=[...urls];const downloaded=[];
 for(let i=0;i<images.length;i+=5){await Promise.all(images.slice(i,i+5).map(async(url,offset)=>{const index=i+offset;const path=`/images/${slug}/${String(index+1).padStart(3,'0')}.jpg`;const response=await fetch(url);if(!response.ok)throw new Error(`Image failed ${response.status}`);writeFileSync(`public${path}`,Buffer.from(await response.arrayBuffer()));downloaded[index]=path;}));}
 galleries[slug]=downloaded;report[slug]={source:source.url,count:downloaded.length,sourceImages:images};console.log(`${slug}: ${downloaded.length} photographs imported.`);
}
mkdirSync('src/data',{recursive:true});writeFileSync('src/data/galleries.json',JSON.stringify(galleries,null,2));writeFileSync('.stitch/sources/gallery-provenance.json',JSON.stringify(report,null,2));
