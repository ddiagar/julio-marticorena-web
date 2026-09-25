import {HashRouter,Route,Routes,Link} from 'react-router-dom';
import {Header} from './components/Header';
import {Footer} from './components/Footer';
import {SocialButton} from './components/SocialButton';
import {HomePage} from './pages/HomePage';
import {CatalogPage} from './pages/CatalogPage';
import {DetailPage} from './pages/DetailPage';
import {InformationPage} from './pages/InformationPage';
import {useSocial} from './hooks/useSocial';
import {channels,content} from './data/mockData';
interface AppProps {readonly className?:string;}
export function App({className=''}:AppProps){const social=useSocial();return <HashRouter><div className={className}><Header/><main id="main" tabIndex={-1}><Routes><Route path="/" element={<HomePage onSocial={social.open}/>}/><Route path="/remates" element={<CatalogPage/>}/><Route path="/remates/:id" element={<DetailPage/>}/>{(['participar','empresa','contacto'] as const).map(kind=><Route key={kind} path={`/${kind}`} element={<InformationPage kind={kind} onSocial={social.open}/>}/>)}<Route path="*" element={<section className="container section"><h1 className="page-title">{content.notFound.title}</h1><Link to="/" className="button">{content.notFound.back}</Link></section>}/></Routes></main><Footer onSocial={social.open}/><SocialButton channel="whatsapp" onOpen={social.open} label={content.social.floating} className="floating-whatsapp"/><dialog ref={social.dialog} className="social-dialog" onCancel={social.close} onClose={social.close} aria-labelledby="social-title"><p className="eyebrow">{content.social.title}</p><h2 id="social-title">{social.selected?channels[social.selected].label:content.social.title}</h2><p className="muted">{social.selected?channels[social.selected].pending:''}</p><a className="text-link" href={content.contact.phoneHref}>{content.contact.phone}</a><button className="button mt-7" onClick={social.close}>{content.social.close}</button></dialog></div></HashRouter>;}
