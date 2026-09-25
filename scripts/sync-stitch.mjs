import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
const node=process.execPath;
const read=p=>{const r=JSON.parse(readFileSync(p,'utf8'));return r.structuredContent??JSON.parse(r.content.find(c=>c.type==='text').text)};
mkdirSync('.stitch/designs',{recursive:true});
const screens=[];
for(const page of ['home','catalog','detail']) {
 if(!existsSync(`generated-${page}.json`))continue;
 const result=read(`generated-${page}.json`);
 for(const entry of result.outputComponents??[])for(const screen of entry.design?.screens??[]) {
  const slug=screen.htmlCode?page:`${page}-asset-${screens.length}`;
  const input=`get-${slug}.json`,output=`screen-${slug}.json`;
  if(!existsSync(output)){writeFileSync(input,JSON.stringify({name:screen.name}));execFileSync(node,['scripts/stitch.mjs','get_screen',input,output],{stdio:'inherit'});}
  const data=read(output);
  const script='/Users/ddiagar-mpro/.codex/skills/react-components/scripts/fetch-stitch.sh';
  for(const [asset,ext] of [[data.htmlCode,'html'],[data.screenshot,'png']]) {
   if(asset?.downloadUrl&&!existsSync(`.stitch/designs/${slug}.${ext}`))execFileSync('bash',[script,asset.downloadUrl+(ext==='png'?`=w${data.width}`:''),`.stitch/designs/${slug}.${ext}`],{stdio:'inherit'});
  }
  screens.push({id:data.name?.split('/').at(-1),label:data.title,sourceScreen:data.name,slug,width:data.width,height:data.height,deviceType:data.deviceType});
 }
}
execFileSync(node,['scripts/stitch.mjs','get_project','get-project.json','.stitch/project.json'],{stdio:'inherit'});
const project=read('.stitch/project.json');
for(const screen of screens){const instance=project.screenInstances?.find(x=>x.sourceScreen===screen.sourceScreen);screen.canvasPosition=instance?{x:instance.x,y:instance.y}:null;}
const metadata={projectId:'8946772629486226599',title:project.title,deviceType:'DESKTOP','Last Sync Time':new Date().toISOString(),screens,designSystem:{assetId:'11acc4dfd1344a50a6d62e35c304e4f5'}};
writeFileSync('.stitch/metadata.json',JSON.stringify(metadata,null,2));mkdirSync('../.stitch',{recursive:true});writeFileSync('../.stitch/metadata.json',JSON.stringify(metadata,null,2));
console.log(JSON.stringify(screens));
