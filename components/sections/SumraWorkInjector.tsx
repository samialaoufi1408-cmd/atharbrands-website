'use client';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { Locale } from '@/content/site';

export function SumraWorkInjector({locale}:{locale:Locale}){
  const [target,setTarget]=useState<Element|null>(null);
  useEffect(()=>{
    const section=document.querySelector('#work');
    if(!section)return;
    const heading=section.querySelector('h2');
    if(heading)heading.textContent=locale==='ar'?'أعمال':'Work';
    const firstArticle=section.querySelector('article');
    if(firstArticle?.parentElement)setTarget(firstArticle.parentElement);
  },[locale]);
  if(!target)return null;
  const ar=locale==='ar';
  return createPortal(
    <article style={{paddingBlock:'clamp(56px,7vw,100px)',borderTop:'1px solid rgba(15,17,19,.18)',borderBottom:'1px solid rgba(15,17,19,.10)',marginBlock:'clamp(20px,3vw,44px)',display:'grid',gridTemplateColumns:'minmax(0,1.15fr) minmax(280px,.85fr)',gap:'clamp(28px,5vw,80px)',alignItems:'center'}}>
      <div style={{minHeight:'clamp(420px,55vw,720px)',background:'#F4EADB',display:'grid',gridTemplateColumns:'1.1fr .9fr',overflow:'hidden'}}>
        <div style={{background:'#4B2E1E',color:'#F4EADB',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',gap:18,padding:'8%'}}>
          <div style={{display:'flex',gap:9,alignItems:'end',height:72}}><i style={{width:34,height:62,border:'8px solid #C98D5C',borderBottom:0,borderRadius:'40px 40px 0 0'}}/><i style={{width:34,height:47,border:'8px solid #8C5A33',borderBottom:0,borderRadius:'40px 40px 0 0'}}/><i style={{width:34,height:31,border:'8px solid #F4EADB',borderBottom:0,borderRadius:'40px 40px 0 0'}}/></div>
          <strong style={{fontSize:'clamp(42px,6vw,82px)',fontWeight:500}}>سُمرة</strong><span style={{letterSpacing:'.34em'}}>SUMRA</span><small>{ar?'كل حبة لها سُمرتها.':'Every bean has its own sumra.'}</small>
        </div>
        <div style={{display:'grid',gridTemplateRows:'1fr 1fr 1fr'}}><div style={{background:'#C98D5C'}}/><div style={{background:'#8C5A33'}}/><div style={{background:'#241611'}}/></div>
      </div>
      <div style={{direction:ar?'rtl':'ltr'}}>
        <div style={{display:'flex',justifyContent:'space-between',gap:20,fontSize:13,letterSpacing:'.08em',opacity:.55,marginBottom:28}}><span>04</span><small>{ar?'مشروع تصوري من ATHRBRANDS':'Concept project by ATHRBRANDS'}</small></div>
        <p style={{fontSize:14,letterSpacing:'.08em',color:'#9A6B43'}}>{ar?'محمصة ومقهى قهوة مختصة':'Specialty coffee roastery & café'}</p>
        <h3 style={{fontSize:'clamp(38px,5vw,72px)',fontWeight:500,margin:'12px 0'}}>سُمرة · SUMRA</h3>
        <p style={{opacity:.6,lineHeight:1.9}}>{ar?'الاستراتيجية · التوجه الإبداعي · الهوية البصرية · التغليف والتطبيقات':'Strategy · Creative direction · Visual identity · Packaging & applications'}</p>
        <div style={{borderInlineStart:'2px solid #C98D5C',paddingInlineStart:20,margin:'34px 0'}}><span style={{display:'block',fontSize:13,opacity:.5}}>{ar?'الفكرة الإبداعية':'Creative idea'}</span><b style={{display:'block',fontSize:26,marginTop:8}}>{ar?'كل حبة لها سُمرتها.':'Every bean has its own sumra.'}</b></div>
        <p style={{lineHeight:1.9,opacity:.72}}>{ar?'نظام هوية يجعل درجة التحميص بطل القصة: ثلاث درجات تتحول إلى لون وإيقاع وتغليف، مع دفء سعودي معاصر بلا رموز تراثية مباشرة.':'An identity system that makes roast level the hero: three roast stages become color, rhythm and packaging, with contemporary Saudi warmth and no literal heritage motifs.'}</p>
        <Link href={`/${locale}/work/sumra`} style={{display:'inline-flex',gap:14,alignItems:'center',marginTop:30,color:'inherit',textDecoration:'none',borderBottom:'1px solid currentColor',paddingBottom:8}}>{ar?'استكشف ملامح المشروع':'Explore the project direction'} <span aria-hidden>↗</span></Link>
      </div>
      <style>{`@media(max-width:800px){#work article:last-child{grid-template-columns:1fr!important}#work article:last-child>div:first-child{min-height:480px!important}}`}</style>
    </article>,target
  );
}
