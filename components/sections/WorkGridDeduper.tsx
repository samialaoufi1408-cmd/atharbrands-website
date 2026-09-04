'use client';
import { useEffect } from 'react';
import { Locale } from '@/content/site';

export function WorkGridDeduper({locale}:{locale:Locale}){
  useEffect(()=>{
    const clean=()=>{
      const section=document.querySelector('#work');
      if(!section)return;
      const heading=section.querySelector('h2');
      if(heading) heading.textContent=locale==='ar'?'أعمال':'Work';
      const articles=Array.from(section.querySelectorAll('article')) as HTMLElement[];
      if(articles.length<=5)return;
      const sumra=articles.filter(a=>/س[ُ]?مرة|SUMRA/i.test(a.textContent||''));
      if(sumra.length>1){
        const preferred=sumra.find(a=>a.querySelector('img')) || sumra[sumra.length-1];
        sumra.forEach(a=>{if(a!==preferred)a.remove();});
      }
      const remaining=Array.from(section.querySelectorAll('article')) as HTMLElement[];
      while(remaining.length>5){
        const extra=remaining.pop();
        if(extra)extra.remove();
      }
    };
    const t1=window.setTimeout(clean,50);
    const t2=window.setTimeout(clean,500);
    const t3=window.setTimeout(clean,1500);
    return()=>{clearTimeout(t1);clearTimeout(t2);clearTimeout(t3)};
  },[locale]);
  return null;
}
