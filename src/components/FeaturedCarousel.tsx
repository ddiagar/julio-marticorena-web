import {useEffect,useState} from 'react';
import {ChevronLeft,ChevronRight} from 'lucide-react';
import {Link} from 'react-router-dom';
import {assetUrl} from '../data/assetUrl';
import {content} from '../data/mockData';

interface FeaturedCarouselProps {
 readonly images:readonly string[];
 readonly title:string;
 readonly detailUrl:string;
}

export function FeaturedCarousel({images,title,detailUrl}:FeaturedCarouselProps){
 const [index,setIndex]=useState(0);
 const [paused,setPaused]=useState(false);
 const previous=()=>setIndex(value=>(value-1+images.length)%images.length);
 const next=()=>setIndex(value=>(value+1)%images.length);

 useEffect(()=>{
  if(paused||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const timer=window.setInterval(next,5000);
  return()=>window.clearInterval(timer);
 },[paused,images.length]);

 return <figure className="hero-figure featured-carousel" aria-label={content.hero.carouselLabel} onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)} onFocus={()=>setPaused(true)} onBlur={()=>setPaused(false)}>
  <div className="featured-carousel-stage">
   {images.map((image,slide)=><Link key={image} to={detailUrl} className={`featured-carousel-slide ${slide===index?'is-active':''}`} aria-hidden={slide!==index} tabIndex={slide===index?0:-1}>
    <img src={assetUrl(image)} alt={slide===index?`${title} · ${content.gallery.photo} ${slide+1}`:''} width="1000" height="1200" fetchPriority={slide===0?'high':undefined} loading={slide===0?'eager':'lazy'}/>
   </Link>)}
   <button className="featured-carousel-arrow previous" type="button" onClick={previous} aria-label={content.gallery.previous}><ChevronLeft/></button>
   <button className="featured-carousel-arrow next" type="button" onClick={next} aria-label={content.gallery.next}><ChevronRight/></button>
  </div>
  <figcaption><span>{content.hero.caption}</span><span role="status">{index+1} {content.gallery.of} {images.length}</span></figcaption>
  <div className="featured-carousel-dots" aria-label={content.hero.carouselNavigation}>
   {images.map((image,slide)=><button key={image} type="button" className="featured-carousel-dot" aria-label={`${content.gallery.photo} ${slide+1}`} aria-pressed={slide===index} onClick={()=>setIndex(slide)}/>)}
  </div>
 </figure>;
}
