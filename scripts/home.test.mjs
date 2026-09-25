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
  assert.ok(!html.includes('La experiencia de siempre.'),'The former generic hero must not remain');
  console.log('Home: featured in-person auction, dates and detail access verified.');
} finally { await server.close(); }
