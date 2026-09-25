import assert from 'node:assert/strict';
import {createServer} from 'vite';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {MemoryRouter} from 'react-router-dom';

const server = await createServer({server:{middlewareMode:true,hmr:false,ws:false},appType:'custom'});
try {
  const {HomePage} = await server.ssrLoadModule('/src/pages/HomePage.tsx');
  const html = renderToStaticMarkup(
    createElement(MemoryRouter,null,createElement(HomePage,{onSocial:()=>{}}))
  );
  for (const fact of [
    'Remate presencial Bascuñán Guerrero',
    '25 septiembre 2026 · 14:30',
    'desde el 21 de septiembre, de 10:00 a 16:00',
    '22, 23 y 24 de septiembre, de 11:00 a 15:00',
    'viernes 2 de octubre a las 12:00'
  ]) assert.ok(html.includes(fact),`The featured auction is missing: ${fact}`);
  assert.ok(html.includes('href="/remates/bascunan-guerrero"'),'The featured auction must link to its detail');
  assert.ok(html.includes('aria-label="Galería del remate destacado"'),'The featured auction must expose an accessible carousel');
  assert.ok(html.includes('aria-label="Fotografía anterior"'),'The featured carousel must offer previous navigation');
  assert.ok(html.includes('aria-label="Fotografía siguiente"'),'The featured carousel must offer next navigation');
  assert.equal((html.match(/class="featured-carousel-dot"/g)??[]).length,6,'The featured carousel must expose six direct-selection controls');
  for (const image of ['001','020','040','060','080','096']) {
    assert.ok(html.includes(`/images/presencial/${image}.jpg`),`The featured carousel is missing representative image ${image}`);
  }
  assert.ok(!html.includes('La experiencia de siempre.'),'The former generic hero must not remain');
  console.log('Home: featured in-person auction, dates and detail access verified.');
} finally { await server.close(); }
