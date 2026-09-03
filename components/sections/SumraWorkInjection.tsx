'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { Locale } from '@/content/site';

function SumraMark(){
  return <div aria-hidden="true" style={{position:'relative',width:116,height:78,margin:'0 auto'}}>
    <i style={{position:'absolute',inset:'0 0 auto',height:58,border:'12px solid #C98D5C',borderBottom:0,borderRadius:'100px 100px 0 0'}}/>
    <i style={{position:'absolute',left:24,top:21,width:68,height:37,border:'10px solid #8C5A33',borderBottom:0,borderRadius:'70px 70px 0 0'}}/>
    <i style={{position:'absolute',left:47,top:40,width:22,height:18,border:'7px solid #4B2E1E',borderBottom:0,borderRadius:'30px 30px 0 0'}}/>
  </div>;
}

export function SumraWorkInjection({locale}:{locale:Locale}){
  const [target,setTarget]=useState<Element|null>(null);
  const ar=locale==='ar';

  useEffect(()=>{
    const work=document.querySelector('#work');
    const list=work?.querySelector('[class*="projectList"]') ?? null;
    const heading=work?.querySelector('h2');
    if(heading) heading.textContent=ar?'أعمال':'Work';
    setTarget(list);
  },[ar]);

  if(!target) return null;

  return createPortal(
    <article style={{paddingBlock:'clamp(56px,7vw,100px)',borderTop:'1px solid rgba(15,17,19,.18)',borderBottom:'1px solid rgba(15,17,19,.10)',marginBlock:'clamp(20px,3vw,44px)',display:'grid',gap:'clamp(28px,5vw,70px)',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,330px),1fr))',alignItems:'center'}}>
      <div style={{minHeight:'clamp(360px,56vw,720px)',background:'#F4EADB',display:'grid',gridTemplateColumns:'1.1fr .9fr',overflow:'hidden'}}>
        <div style={{background:'#4B2E1E',color:'#F4EADB',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',gap:18,padding:'8%'}}>
          <SumraMark/>
          <strong style={{fontSize:'clamp(40px,6vw,78px)',fontFamily:'Noto Naskh Arabic, serif',lineHeight:1}}>{ar?'سُمرة':'SUMRA'}</strong>
          <span style={{letterSpacing:'.32em',fontSize:14}}>SUMRA</span>
          <small>{ar?'كل حبة لها سُمرتها.':'Every bean has its own sumra.'}</small>
        </div>
        <div style={{display:'grid',gridTemplateRows:'1fr 1fr 1fr'}}><div style={{background:'#C98D5C'}}/><div style={{background:'#8C5A33'}}/><div style={{background:'#241611'}}/></div>
      </div>

      <div style={{direction:ar?'rtl':'ltr'}}>
        <div style={{display:'flex',justifyContent:'space-between',gap:20,marginBottom:28,color:'rgba(15,17,19,.55)',fontSize:13}}><span>04</span><small>{ar?'مشروع تصوري من ATHRBRANDS':'Concept project by ATHRBRANDS'}</small></div>
        <p style={{margin:'0 0 12px',color:'#8C5A33'}}>{ar?'محمصة ومقهى قهوة مختصة':'Specialty coffee roastery & café'}</p>
        <h3 style={{fontSize:'clamp(38px,5vw,72px)',margin:'0 0 18px',fontWeight:500}}>{ar?'سُمرة · SUMRA':'SUMRA'}</h3>
        <p style={{color:'rgba(15,17,19,.58)',lineHeight:1.9,margin:'0 0 30px'}}>{ar?'الاستراتيجية · التوجه الإبداعي · الهوية البصرية · التغليف والتطبيقات':'Strategy · Creative direction · Visual identity · Packaging & applications'}</p>
        <div style={{paddingBlock:22,borderTop:'1px solid rgba(15,17,19,.12)',borderBottom:'1px solid rgba(15,17,19,.12)',marginBottom:28}}><span style={{display:'block',fontSize:12,color:'rgba(15,17,19,.48)',marginBottom:8}}>{ar?'الفكرة الإبداعية':'Creative idea'}</span><b style={{fontSize:'clamp(24px,3vw,40px)',fontWeight:500}}>{ar?'كل حبة لها سُمرتها.':'Every bean has its own sumra.'}</b></div>
        <p style={{lineHeight:1.9,color:'rgba(15,17,19,.7)',maxWidth:660}}>{ar?'نظام هوية يجعل درجة التحميص بطل القصة: ثلاث درجات تتحول إلى لون وإيقاع وتغليف، مع دفء سعودي معاصر بلا رموز تراثية مباشرة.':'An identity system that makes roast level the hero: three roast stages become color, rhythm and packaging, with contemporary Saudi warmth and no literal heritage motifs.'}</p>
        <Link href={`/${locale}/work/sumra`} style={{display:'inline-flex',gap:14,alignItems:'center',marginTop:28,color:'#0f1113',textDecoration:'none',borderBottom:'1px solid #B69A70',paddingBottom:10}}>{ar?'استكشف ملامح المشروع':'Explore the project direction'}<span aria-hidden="true">↗</span></Link>
      </div>
    </article>,
    target
  );
}
