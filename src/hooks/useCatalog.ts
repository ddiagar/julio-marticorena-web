import { useMemo, useState } from 'react';
import { auctions, type Mode } from '../data/mockData';
const normalize=(value:string)=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
export function useCatalog(){
 const [mode,setMode]=useState<Mode>('Todos');const [query,setQuery]=useState('');
 const filtered=useMemo(()=>auctions.filter(a=>(mode==='Todos'||a.mode===mode)&&normalize(`${a.title} ${a.category} ${a.location}`).includes(normalize(query.trim()))),[mode,query]);
 const reset=()=>{setMode('Todos');setQuery('');};
 return {mode,query,filtered,setMode,changeQuery:(e:React.ChangeEvent<HTMLInputElement>)=>setQuery(e.target.value),reset};
}
