import assert from 'node:assert/strict';
import {createServer} from 'vite';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {MemoryRouter} from 'react-router-dom';

const server = await createServer({server:{middlewareMode:true,hmr:false,ws:false},appType:'custom'});
try {
  const {Header} = await server.ssrLoadModule('/src/components/Header.tsx');
  const html = renderToStaticMarkup(
    createElement(MemoryRouter,null,createElement(Header))
  );
  assert.ok(html.includes('Experiencia y tradición desde 1940'),'The brand must present its complete historic tagline');
  assert.ok(html.includes('Remates electrónicos'),'The header must expose electronic auctions');
  assert.ok(html.includes('href="https://www.remateselectronicos.com/"'),'The electronic-auction link must open the correct service');
  assert.ok(html.includes('target="_blank"'),'The external destination must open separately');
  assert.ok(html.includes('rel="noopener noreferrer"'),'The external tab must be isolated safely');
  console.log('Header: safe electronic-auction access verified.');
} finally { await server.close(); }
