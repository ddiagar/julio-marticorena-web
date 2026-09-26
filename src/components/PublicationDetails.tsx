import details from '../data/publicationDetails.json';
import {useRef} from 'react';
import {Expand,ImageOff,X} from 'lucide-react';
import {assetUrl} from '../data/assetUrl';
interface JudicialVehicle {readonly title:string;readonly year:string;readonly plate:string;readonly court:string;readonly case:string;readonly notice:string;readonly image?:string;}
interface PublicationSection {readonly id:string;readonly title:string;readonly paragraphs:readonly string[];readonly highlight?:boolean;readonly intro?:string;readonly cards?:readonly JudicialVehicle[];}
interface PublicationDetailsProps {readonly auctionId:string;}
function JudicialVehicleCard({vehicle}:{readonly vehicle:JudicialVehicle}){
 const dialog=useRef<HTMLDialogElement>(null);
 const photoLabel=`${vehicle.plate} · ${vehicle.title}`;
 return <article className="judicial-card">
  {vehicle.image?<>
   <button className="judicial-photo-button" aria-label={`Ampliar fotografía de ${vehicle.plate}`} onClick={()=>dialog.current?.showModal()}>
    <img className="judicial-photo" src={assetUrl(vehicle.image)} alt={photoLabel} loading="lazy"/><span className="judicial-expand"><Expand size={17}/></span>
   </button>
   <dialog ref={dialog} className="judicial-lightbox" onCancel={()=>dialog.current?.close()} aria-label={`Fotografía ampliada de ${vehicle.plate}`}>
    <button className="judicial-lightbox-close" onClick={()=>dialog.current?.close()} aria-label="Cerrar fotografía ampliada"><X/></button>
    <img src={assetUrl(vehicle.image)} alt={photoLabel}/>
    <p>{vehicle.plate} · {vehicle.title}</p>
   </dialog>
  </>:<div className="judicial-photo-missing"><ImageOff size={28} aria-hidden="true"/><span>Sin fotografía individual publicada</span></div>}
  <div className="judicial-card-body"><p className="eyebrow">Vehículo judicial · {vehicle.year}</p><h3>{vehicle.title}</h3>
   <span className="vehicle-plate" role="img" aria-label={`Patente ${vehicle.plate}`}><span className="vehicle-plate-number" aria-hidden="true">{vehicle.plate.replace('.', ' · ')}</span><span className="vehicle-plate-country" aria-hidden="true">CHILE</span></span>
   <dl><div><dt>Tribunal</dt><dd>{vehicle.court}</dd></div><div><dt>Rol</dt><dd>{vehicle.case}</dd></div></dl>
   <details><summary>Aviso judicial completo</summary><p>{vehicle.notice}</p></details>
  </div>
 </article>;
}
export function PublicationDetails({auctionId}:PublicationDetailsProps){
 const sections:readonly PublicationSection[]=(details as Record<string,readonly PublicationSection[]>)[auctionId]??[];
 return <div className="publication-details">
  <div className="publication-index"><p className="eyebrow">En este remate</p><div>{sections.map(section=><button key={section.id} onClick={()=>document.getElementById(section.id)?.scrollIntoView({behavior:'smooth',block:'start'})}>{section.title}</button>)}</div></div>
  <div className="publication-inventory">{sections.map(section=><section className={'publication-section'+(section.highlight?' publication-highlight':'')} key={section.id} id={section.id}>
   <h2>{section.title}</h2>{section.intro&&<p className="publication-intro">{section.intro}</p>}
   {section.paragraphs.length>0&&<ul className="publication-list">{section.paragraphs.map((paragraph,index)=><li key={index}>{paragraph}</li>)}</ul>}
   {section.cards&&<div className="judicial-grid">{section.cards.map(vehicle=><JudicialVehicleCard vehicle={vehicle} key={vehicle.plate}/>)}</div>}
  </section>)}</div>
 </div>;
}
