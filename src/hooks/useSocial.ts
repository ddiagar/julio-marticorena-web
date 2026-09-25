import {useEffect,useRef,useState} from 'react';
import {channels,type Channel} from '../data/mockData';
export function useSocial(){
 const [selected,setSelected]=useState<Channel|null>(null);const dialog=useRef<HTMLDialogElement>(null);
 const open=(channel:Channel)=>{const url=channels[channel].url;if(url){const destination=new URL(url);if(destination.protocol==='https:')window.open(destination.href,'_blank','noopener,noreferrer');}else setSelected(channel);};
 const close=()=>setSelected(null);
 useEffect(()=>{if(selected)dialog.current?.showModal();else dialog.current?.close();},[selected]);
 return {selected,dialog,open,close};
}
