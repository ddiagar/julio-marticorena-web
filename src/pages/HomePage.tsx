import {Link} from 'react-router-dom';
import {AlertTriangle,ArrowUpRight,CalendarDays,Eye} from 'lucide-react';
import {auctions,content,type Channel} from '../data/mockData';
import {Catalog} from '../components/Catalog';
import {ParticipationSteps} from '../components/ParticipationSteps';
import {Heritage} from '../components/Heritage';
import {Faq} from '../components/Faq';
import {ContactBlock} from '../components/ContactBlock';
interface HomePageProps {readonly onSocial:(channel:Channel)=>void;}
export function HomePage({onSocial}:HomePageProps){const featured=auctions[0];return <><section className="hero featured-hero container"><div className="hero-copy"><p className="eyebrow">{content.hero.eyebrow}</p><h1>{featured.title}</h1><p className="hero-description">{featured.description}</p><div className="featured-facts"><div><CalendarDays size={19}/><span><strong>{content.agenda.date}</strong>{featured.date}</span></div><div><Eye size={19}/><span><strong>{content.hero.exhibitionLabel}</strong>{content.hero.exhibition}<small>{content.hero.caterpillar}</small></span></div></div><div className="hero-actions"><Link to={`/remates/${featured.id}`} className="button">{content.hero.detail}<ArrowUpRight size={18}/></Link><Link to="/participar" className="button secondary">{content.how}</Link></div><div className="hero-foot featured-notice"><AlertTriangle size={17}/>{content.hero.notice}</div></div><figure className="hero-figure"><Link to={`/remates/${featured.id}`} aria-label={content.hero.detail}><img src={content.hero.image} alt={content.hero.alt} width="1000" height="1200" fetchPriority="high"/></Link><figcaption>{content.hero.caption}</figcaption></figure></section><Catalog/><ParticipationSteps/><Heritage/><Faq/><ContactBlock onSocial={onSocial}/></>;}
