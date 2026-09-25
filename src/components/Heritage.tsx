import {Link} from 'react-router-dom';
import {ArrowRight} from 'lucide-react';
import {content} from '../data/mockData';
interface HeritageProps {readonly full?:boolean;}
export function Heritage({full=false}:HeritageProps){return <section className="section heritage"><div className="container heritage-grid"><div><p className="eyebrow">{content.heritage.eyebrow}</p>{full?<h1 className="page-title">{content.company.title}</h1>:<h2>{content.heritage.title}</h2>}<p>{content.heritage.body}</p>{full?<p>{content.heritage.second}</p>:<Link className="text-link mt-5" to="/empresa">{content.heritage.link}<ArrowRight size={17}/></Link>}</div><div className="heritage-year" aria-label={content.since}>{content.year}</div></div></section>;}
