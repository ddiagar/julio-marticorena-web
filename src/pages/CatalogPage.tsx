import {content} from '../data/mockData';
import {Catalog} from '../components/Catalog';
interface CatalogPageProps {readonly className?:string;}
export function CatalogPage({className=''}:CatalogPageProps){return <div className={className}><div className="container page-intro"><p className="eyebrow">{content.agenda.eyebrow}</p><h1 className="page-title">{content.agenda.title}</h1><p className="muted">{content.agenda.snapshot}</p></div><Catalog full/></div>;}
