import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createServer} from 'vite';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {MemoryRouter,Routes,Route} from 'react-router-dom';
const server=await createServer({server:{middlewareMode:true,hmr:false,ws:false},appType:'custom'});
const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/&amp;/g,'&').replace(/&#x27;/g,"'").replace(/&quot;|&#34;/g,'"').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim().toUpperCase();
try {
 const {DetailPage}=await server.ssrLoadModule('/src/pages/DetailPage.tsx');
 const {auctions}=await server.ssrLoadModule('/src/data/mockData.ts');
 const pv4=auctions.find(auction=>auction.id==='planchas-pv4');
 assert.ok(pv4,'PV4 must be an independent direct-sale publication');
 assert.equal(pv4.images.length,7,'PV4 must include all seven published photographs');
 const pv4Content=normalize(`${pv4.title} ${pv4.description} ${pv4.sections.map(section=>section.body).join(' ')}`);
 for(const fact of ['PLANCHAS PV4','ZINCALUM PREPINTADO','6 METROS','0,40 MM','ESPESOR']) assert.ok(pv4Content.includes(fact),`PV4 must preserve published fact: ${fact}`);
 for(const [slug,id] of [['presencial','bascunan-guerrero'],['electronico','antofagasta'],['venta','galpones-planchas']]){
  const html=renderToStaticMarkup(createElement(MemoryRouter,{initialEntries:['/remates/'+id]},createElement(Routes,null,createElement(Route,{path:'/remates/:id',element:createElement(DetailPage)}))));
  const source=readFileSync('.stitch/sources/'+slug+'.html','utf8').split('<tr><td valign=top>').at(-1).split('</td><td width=200')[0];
  const lines=source.replace(/<b>[\s\S]*?<\/b>/,'').split(/<br\s*\/?\s*>/i).map(normalize).filter(Boolean);
  for(const line of lines) assert.ok(normalize(html).includes(line),`${slug}: missing published information: ${line}`);
  if(slug==='presencial'){
   assert.equal((html.match(/class="judicial-photo"/g)??[]).length,4,'Render the four individual judicial vehicle photos published');
   assert.ok(html.includes('Sin fotografía individual publicada'),'Explain the missing Suzuki photo without substituting another vehicle');
   for(const plate of ['GCHW.97-1','RZZR.26-4','TBBF.86-8','SPLS.36-0']) assert.ok(html.includes(`alt="${plate}`),`Photo alt must identify ${plate}`);
  }
  console.log(`${slug}: ${lines.length} published lines preserved in the rendered detail.`);
 }
} finally {await server.close();}
