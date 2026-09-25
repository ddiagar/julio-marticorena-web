import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const styles={};
for(const page of ['home','catalog','detail']) {
 const html=readFileSync(`.stitch/designs/${page}.html`,'utf8');
 const script=html.match(/<script[^>]*id="tailwind-config"[^>]*>([\s\S]*?)<\/script>/)?.[1];
 if(!script)throw new Error(`Missing theme: ${page}`);
 const context={tailwind:{}};runInNewContext(script,context,{timeout:1000});styles[page]=context.tailwind.config.theme.extend;
}
mkdirSync('resources',{recursive:true});writeFileSync('resources/style-guide.json',JSON.stringify(styles,null,2));
const theme=styles.home;
const variables=Object.entries(theme.colors).map(([k,v])=>`  --color-${k}: ${v};`);
writeFileSync('src/tokens.css',`@theme {\n${variables.join('\n')}\n  --font-display: "Newsreader", Georgia, serif;\n  --font-body: "Inter", Arial, sans-serif;\n}\n`);
console.log('Extracted all 3 Stitch themes; primary:',theme.colors.primary,'fonts:',theme.fontFamily['body-md']);
