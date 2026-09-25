import {Mail,Phone,MapPin,Navigation,ArrowUpRight} from 'lucide-react';
import {content,type Channel} from '../data/mockData';
import {mapLinks} from '../data/mapLinks';
import {SocialButton} from './SocialButton';
interface ContactBlockProps {readonly onSocial:(channel:Channel)=>void;readonly full?:boolean;}
export function ContactBlock({onSocial,full=false}:ContactBlockProps){
 return <section className="section contact-section"><div className="container">
  <div className="contact-heading"><p className="eyebrow">{content.contact.eyebrow}</p>{full?<h1 className="page-title">{content.contact.title}</h1>:<h2>{content.contact.title}</h2>}<p className="muted">{content.contact.body}</p></div>
  <div className="contact-grid">{content.contact.offices.map(office=>{
   const maps=mapLinks(office.mapAddress);
   return <article className="office" key={office.name}>
    <div className="office-info"><MapPin size={21} aria-hidden="true"/><h3>{office.name}</h3>
     <a className="office-address" href={maps.google} target="_blank" rel="noopener noreferrer">{office.address}<ArrowUpRight size={16} aria-hidden="true"/></a>
     <a className="text-link" href={office.href}><Phone size={16} aria-hidden="true"/>{office.phone}</a>
    </div>
    <iframe className="office-map" title={content.contact.mapTitle+' '+office.name} src={maps.embed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen/>
    <div className="map-actions"><a className="social-button" href={maps.google} target="_blank" rel="noopener noreferrer"><MapPin size={17} aria-hidden="true"/>{content.contact.googleMaps}</a><a className="social-button" href={maps.waze} target="_blank" rel="noopener noreferrer"><Navigation size={17} aria-hidden="true"/>{content.contact.waze}</a></div>
   </article>;
  })}</div>
  <div className="contact-email"><Mail size={22} aria-hidden="true"/><div><h3>{content.contact.emailTitle}</h3><a className="text-link break-all" href={content.contact.emailHref}>{content.contact.email}</a></div></div>
  <div className="social-strip"><div><h3>{content.contact.socialTitle}</h3><p className="muted text-sm">{content.contact.socialBody}</p></div><div className="social-actions"><SocialButton channel="whatsapp" onOpen={onSocial} className="button" label={content.contact.whatsapp}/><SocialButton channel="facebook" onOpen={onSocial}/><SocialButton channel="instagram" onOpen={onSocial}/></div></div>
 </div></section>;
}
