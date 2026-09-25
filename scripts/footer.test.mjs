import assert from 'node:assert/strict';
import {createServer} from 'vite';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {MemoryRouter} from 'react-router-dom';

const server = await createServer({server:{middlewareMode:true,hmr:false,ws:false},appType:'custom'});
try {
  const {Footer} = await server.ssrLoadModule('/src/components/Footer.tsx');
  const html = renderToStaticMarkup(
    createElement(MemoryRouter,null,createElement(Footer,{onSocial:()=>{}}))
  );
  assert.ok(html.includes('Experiencia y tradición desde 1940'),'The footer brand must present its complete historic tagline');
  assert.ok(html.includes('R.N.M. N° 26 y 1173'),'The footer must identify both auctioneer registrations');
  assert.ok(!html.includes('Una nueva forma de acercarnos.'),'The registration must replace the generic marketing note');
  console.log('Footer: historic identity and auctioneer registrations verified.');
} finally { await server.close(); }
