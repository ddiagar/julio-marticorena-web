import {useEffect,useRef,useState} from 'react';
export function useGallery(count:number){
 const [index,setIndex]=useState(0);const [expanded,setExpanded]=useState(false);const dialog=useRef<HTMLDialogElement>(null);
 const next=()=>setIndex(value=>(value+1)%count);const previous=()=>setIndex(value=>(value-1+count)%count);
 const open=()=>setExpanded(true);const close=()=>setExpanded(false);
 const keyDown=(event:React.KeyboardEvent)=>{if(event.key==='ArrowRight'){event.preventDefault();next();}if(event.key==='ArrowLeft'){event.preventDefault();previous();}};
 useEffect(()=>{if(expanded)dialog.current?.showModal();else dialog.current?.close();},[expanded]);
 return {index,select:setIndex,next,previous,open,close,dialog,keyDown};
}
