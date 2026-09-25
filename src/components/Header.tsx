import {Link,NavLink} from 'react-router-dom';
import {Menu,X,ArrowUpRight,ExternalLink} from 'lucide-react';
import {content} from '../data/mockData';
import {useNavigation} from '../hooks/useNavigation';

interface HeaderProps { readonly className?:string; }

export function Header({className=''}:HeaderProps){
 const {open,toggle,skip}=useNavigation();
 return <>
  <a className="skip-link" href="#main" onClick={skip}>{content.skip}</a>
  <div className="location-bar">{content.proposal}</div>
  <header className={`site-header ${className}`}>
   <div className="container header-inner">
    <Link to="/" className="brand">{content.brand}<span>{content.since}</span></Link>
    <button className="mobile-toggle" onClick={toggle} aria-expanded={open} aria-controls="main-nav" aria-label={open?content.closeMenu:content.menu}>{open?<X/>:<Menu/>}</button>
    <nav id="main-nav" className={`main-nav ${open?'is-open':''}`}>
     {content.nav.map(n=><NavLink key={n.to} to={n.to} end={n.to==='/' }>{n.label}</NavLink>)}
     <a className="electronic-auctions-link" href={content.electronicAuctions.url} target="_blank" rel="noopener noreferrer">
      {content.electronicAuctions.label}<ExternalLink size={13} aria-hidden="true"/>
     </a>
    </nav>
    <Link className="button header-cta" to="/remates">{content.explore}<ArrowUpRight size={16}/></Link>
   </div>
  </header>
 </>;
}
