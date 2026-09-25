import assert from 'node:assert/strict';
import {createServer} from 'vite';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';

const server = await createServer({server:{middlewareMode:true,hmr:false,ws:false},appType:'custom'});
try {
  const {ContactBlock} = await server.ssrLoadModule('/src/components/ContactBlock.tsx');
  const html = renderToStaticMarkup(createElement(ContactBlock,{onSocial:()=>{},full:true}));
  assert.equal((html.match(/<iframe /g) ?? []).length,2,'Each office must display a map');
  for (const destination of ['https://wa.me/56968134197','https://www.facebook.com/','https://www.instagram.com/']) {
    assert.ok(html.includes(`href="${destination}"`),`Missing active social link: ${destination}`);
  }
  assert.equal((html.match(/href="https:\/\/www.waze.com\/ul\?/g) ?? []).length,2,'Both offices need Waze links');
  assert.ok(html.includes('Bascu%C3%B1%C3%A1n'),'Preserve address accents in map queries');
  assert.ok(html.includes('Antofagasta'),'Identify the northern office city');
  assert.ok(!html.includes('próximamente'),'Contact channels must not appear pending');
  console.log('Contact: two maps, navigation links and three active social destinations verified.');
} finally { await server.close(); }
