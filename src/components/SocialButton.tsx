import {BrandIcon} from './BrandIcon';
import {channels,type Channel} from '../data/mockData';
interface SocialButtonProps { readonly channel:Channel; readonly onOpen:(channel:Channel)=>void; readonly compact?:boolean; readonly className?:string; readonly label?:string; }
export function SocialButton({channel,onOpen,compact=false,className='',label}:SocialButtonProps){
 const children=<><BrandIcon channel={channel}/>{!compact&&<span>{label??channels[channel].label}</span>}</>;
 const props={className:`social-button ${className}`,'aria-label':label??channels[channel].label};
 return channels[channel].url?<a {...props} href={channels[channel].url} target="_blank" rel="noopener noreferrer">{children}</a>:<button {...props} onClick={()=>onOpen(channel)}>{children}</button>;
}
