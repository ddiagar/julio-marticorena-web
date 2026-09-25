import {content,type Channel} from '../data/mockData';
import {ParticipationSteps} from '../components/ParticipationSteps';
import {Heritage} from '../components/Heritage';
import {Faq} from '../components/Faq';
import {ContactBlock} from '../components/ContactBlock';
interface InformationPageProps {readonly kind:'participar'|'empresa'|'contacto';readonly onSocial:(channel:Channel)=>void;}
export function InformationPage({kind,onSocial}:InformationPageProps){if(kind==='contacto')return <ContactBlock full onSocial={onSocial}/>;if(kind==='participar')return <><ParticipationSteps standalone/><Faq/><ContactBlock onSocial={onSocial}/></>;return <><Heritage full/><section className="container section"><p className="eyebrow">{content.company.eyebrow}</p><h2>{content.company.servicesTitle}</h2><div className="steps-grid">{content.company.services.map(s=><article className="step" key={s.title}><h3>{s.title}</h3><p className="muted">{s.body}</p></article>)}</div></section><ContactBlock onSocial={onSocial}/></>;}
