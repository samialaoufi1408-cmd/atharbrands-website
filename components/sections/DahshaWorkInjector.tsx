'use client';

import Link from 'next/link';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { Locale } from '@/content/site';

export function DahshaWorkInjector({ locale }: { locale: Locale }) {
  const [target, setTarget] = useState<Element | null>(null);

  useEffect(() => {
    const section = document.querySelector('#work');
    if (!section) return;
    const firstArticle = section.querySelector('article');
    if (firstArticle?.parentElement) setTarget(firstArticle.parentElement);
  }, []);

  if (!target) return null;
  const ar = locale === 'ar';

  return createPortal(
    <article className="dahshaPortfolioCard" data-project="dahsha">
      <div className="dahshaVisual" aria-label={ar ? 'هوية دهشة البصرية' : 'DAHSHA visual identity'}>
        <div className="dahshaScene">
          <span className="dahshaSun" />
          <span className="dahshaEye" />
          <span className="dahshaBlock dahshaBlockA" />
          <span className="dahshaBlock dahshaBlockB" />
          <span className="dahshaBlock dahshaBlockC" />
          <div className="dahshaLogo"><b>{ar ? 'دهشة' : 'DAHSHA'}</b><small>DAHSHA</small></div>
        </div>
      </div>
      <div className="dahshaCopy" dir={ar ? 'rtl' : 'ltr'}>
        <div className="dahshaTop"><span>05</span><small>{ar ? 'مشروع تصوري من ATHRBRANDS' : 'Concept project by ATHRBRANDS'}</small></div>
        <p className="dahshaSector">{ar ? 'متجر ألعاب وتجارب للأطفال · السعودية' : 'Children’s play & discovery store · Saudi Arabia'}</p>
        <h3>{ar ? 'دهشة' : 'DAHSHA'}</h3>
        <p>{ar ? 'هوية مرحة ترى العالم بعين الطفل، وتحوّل الفضول والاختيار والخيال إلى نظام بصري حي وقابل للتوسع.' : 'A playful identity that sees the world through a child’s eyes, turning curiosity, choice and imagination into a lively scalable system.'}</p>
        <Link href={`/${locale}/work/dahsha`}><span>{ar ? 'استكشف المشروع' : 'Explore the project'}</span><span aria-hidden>↗</span></Link>
      </div>
      <style>{`
        #work .dahshaPortfolioCard{min-width:0;width:100%;margin:0;padding:0;display:flex;flex-direction:column;background:rgba(255,253,248,.72);border:1px solid rgba(112,76,52,.18);border-radius:18px;overflow:hidden;box-shadow:0 16px 42px rgba(65,43,28,.05)}
        #work .dahshaVisual{aspect-ratio:16/10;overflow:hidden;background:#fff5e5}
        #work .dahshaScene{height:100%;position:relative;background:linear-gradient(145deg,#fff5e5 0 54%,#2d5be7 54% 100%);overflow:hidden}
        #work .dahshaLogo{position:absolute;inset:50% auto auto 50%;transform:translate(-50%,-50%);background:rgba(255,249,238,.94);padding:22px 30px;border-radius:18px;text-align:center;color:#171625;box-shadow:0 18px 40px rgba(23,22,37,.12)}
        #work .dahshaLogo b{display:block;font-size:clamp(32px,4vw,54px);line-height:1;font-weight:800} #work .dahshaLogo small{font-size:9px;letter-spacing:.28em}
        #work .dahshaSun{position:absolute;width:72px;height:72px;background:#ffd43b;clip-path:polygon(50% 0,61% 22%,82% 8%,78% 33%,100% 36%,79% 51%,96% 69%,72% 68%,73% 94%,54% 75%,40% 100%,34% 74%,9% 84%,22% 60%,0 50%,25% 43%,8% 22%,34% 27%);top:13%;left:11%}
        #work .dahshaEye{position:absolute;width:92px;height:60px;border:14px solid #2d5be7;border-radius:50%;top:14%;right:11%;background:#fff5e5}
        #work .dahshaBlock{position:absolute;border-radius:18px}.dahshaBlockA{width:105px;height:35px;background:#7548ff;bottom:15%;left:10%}.dahshaBlockB{width:118px;height:62px;background:#28c5b8;bottom:11%;right:13%}.dahshaBlockC{width:28px;height:28px;background:#ff6460;bottom:26%;right:18%;border-radius:50%}
        #work .dahshaCopy{flex:1;padding:clamp(24px,3vw,42px);display:flex;flex-direction:column}.dahshaTop{display:flex;justify-content:space-between;gap:18px;color:rgba(33,23,18,.48);font-size:12px}.dahshaSector{color:#2d5be7;margin:24px 0 6px}.dahshaCopy h3{font-size:clamp(38px,5vw,66px)!important;line-height:1!important;margin:8px 0 18px!important}.dahshaCopy p{line-height:1.9;color:rgba(33,23,18,.7)}.dahshaCopy a{display:flex;justify-content:space-between;align-items:center;border:1px solid #2d5be7;color:#244cc5;padding:16px 20px;text-decoration:none;border-radius:8px;margin-top:auto}
        @media(min-width:1280px){#work .dahshaVisual{aspect-ratio:4/3}} @media(max-width:760px){#work .dahshaVisual{aspect-ratio:4/3}}
      `}</style>
    </article>, target
  );
}
