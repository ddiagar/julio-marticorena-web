import assert from 'node:assert/strict';
import {createServer} from 'vite';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {MemoryRouter,Route,Routes} from 'react-router-dom';

const server = await createServer({server:{middlewareMode:true,hmr:false,ws:false},appType:'custom'});
try {
  const {HomePage} = await server.ssrLoadModule('/src/pages/HomePage.tsx');
  const {DetailPage} = await server.ssrLoadModule('/src/pages/DetailPage.tsx');
  const home = renderToStaticMarkup(
    createElement(MemoryRouter,null,createElement(HomePage,{onSocial:()=>{}}))
  );
  const detail = renderToStaticMarkup(
    createElement(MemoryRouter,{initialEntries:['/remates/bascunan-guerrero']},
      createElement(Routes,null,createElement(Route,{path:'/remates/:id',element:createElement(DetailPage)}))
    )
  );
  const html = home + detail;
  const localSources = [...html.matchAll(/src="([^"]*images\/[^"]+)"/g)].map(match=>match[1]);
  assert.ok(localSources.length>100,'The rendered pages must exercise their published images');
  assert.ok(localSources.every(source=>source.startsWith('./images/')),`Images must respect the deployment base; found ${localSources.find(source=>!source.startsWith('./images/'))}`);
  console.log(`Assets: ${localSources.length} rendered image URLs respect the deployment base.`);
} finally { await server.close(); }
