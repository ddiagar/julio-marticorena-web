import {useEffect,useState} from 'react';
import {useLocation} from 'react-router-dom';
export function useNavigation(){const [open,setOpen]=useState(false);const location=useLocation();useEffect(()=>{setOpen(false);window.scrollTo(0,0);},[location.pathname]);const skip=(event:React.MouseEvent<HTMLAnchorElement>)=>{event.preventDefault();document.getElementById('main')?.focus();document.getElementById('main')?.scrollIntoView();};return {open,skip,toggle:()=>setOpen(value=>!value)};}
