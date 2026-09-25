import ts from 'typescript';
import {readFileSync,readdirSync} from 'node:fs';
const files=['src/App.tsx',...['components','pages'].flatMap(dir=>readdirSync(`src/${dir}`).filter(f=>f.endsWith('.tsx')).map(f=>`src/${dir}/${f}`))];
const failures=[];
for(const file of files){const code=readFileSync(file,'utf8'),ast=ts.createSourceFile(file,code,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);const name=file.split('/').at(-1).replace('.tsx','');const props=ast.statements.find(s=>ts.isInterfaceDeclaration(s)&&s.name.text===`${name}Props`);if(!props)failures.push(`${file}: missing props interface`);else for(const member of props.members)if(!member.modifiers?.some(m=>m.kind===ts.SyntaxKind.ReadonlyKeyword))failures.push(`${file}: mutable props`);if(/href=["']#["']/.test(code))failures.push(`${file}: empty link`);if(/#[0-9a-f]{6}\b/i.test(code))failures.push(`${file}: inline color`);}
if(failures.length){console.error(failures.join('\n'));process.exit(1);}console.log(`Validated ${files.length} React components: readonly props, token-based colors, no empty links.`);
