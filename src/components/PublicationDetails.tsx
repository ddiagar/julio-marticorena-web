import details from '../data/publicationDetails.json';
import {ImageOff} from 'lucide-react';
import {assetUrl} from '../data/assetUrl';
interface JudicialVehicle {readonly title:string;readonly year:string;readonly plate:string;readonly court:string;readonly case:string;readonly notice:string;readonly image?:string;}
interface PublicationSection {readonly id:string;readonly title:string;readonly paragraphs:readonly string[];readonly highlight?:boolean;readonly intro?:string;readonly cards?:readonly JudicialVehicle[];}
interface PublicationDetailsProps {readonly auctionId:string;}
export function PublicationDetails({auctionId}:PublicationDetailsProps){
 const sections:readonly PublicationSection[]=(details as Record<string,readonly PublicationSection[]>)[auctionId]??[];
 return <div className="publication-details">
  <div className="publication-index"><p className="eyebrow">En este remate</p><div>{sections.map(section=><button key={section.id} onClick={()=>document.getElementById(section.id)?.scrollIntoView({behavior:'smooth',block:'start'})}>{section.title}</button>)}</div></div>
  {sections.map(section=><section className={'publication-section'+(section.highlight?' publication-highlight':'')} key={section.id} id={section.id}>
   <h2>{section.title}</h2>{section.intro&&<p className="publication-intro">{section.intro}</p>}
   {section.paragraphs.length>0&&<ul className="publication-list">{section.paragraphs.map((paragraph,index)=><li key={index}>{paragraph}</li>)}</ul>}
   {section.cards&&<div className="judicial-grid">{section.cards.map(vehicle=><article className="judicial-card" key={vehicle.plate}>
    {vehicle.image?<img className="judicial-photo" src={assetUrl(vehicle.image)} alt={`${vehicle.plate} · ${vehicle.title}`} loading="lazy"/>:<div className="judicial-photo-missing"><ImageOff size={28} aria-hidden="true"/><span>Sin fotografía individual publicada</span></div>}
    <div className="judicial-card-body"><p className="eyebrow">Vehículo judicial · {vehicle.year}</p><h3>{vehicle.title}</h3><span className="vehicle-plate">{vehicle.plate}</span>
     <dl><div><dt>Tribunal</dt><dd>{vehicle.court}</dd></div><div><dt>Rol</dt><dd>{vehicle.case}</dd></div></dl>
     <details><summary>Aviso judicial completo</summary><p>{vehicle.notice}</p></details>
    </div>
   </article>)}</div>}
  </section>)}
 </div>;
}
