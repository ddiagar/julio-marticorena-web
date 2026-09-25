export function assetUrl(path:string):string{
 if(!path.startsWith('/'))return path;
 return `.${path}`;
}
