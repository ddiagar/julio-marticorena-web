import {Plus} from 'lucide-react';
import {content} from '../data/mockData';
interface FaqProps {readonly className?:string;}
export function Faq({className=''}:FaqProps){return <section className={`section container faq-layout ${className}`}><div><p className="eyebrow">{content.faqEyebrow}</p><h2>{content.faqTitle}</h2></div><div>{content.faqs.map(f=><details className="faq-item" key={f.title}><summary>{f.title}<Plus size={18}/></summary><p className="muted">{f.body}</p></details>)}</div></section>;}
