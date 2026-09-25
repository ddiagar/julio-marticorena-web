import {brandIcons} from '../data/brandIcons';
import type {Channel} from '../data/mockData';
interface BrandIconProps {readonly channel:Channel;}
export function BrandIcon({channel}:BrandIconProps){
 const icon=brandIcons[channel];
 return <svg className="brand-icon" width="20" height="20" viewBox={icon.viewBox} fill="currentColor" aria-hidden="true" focusable="false"><path d={icon.path}/></svg>;
}
