import Link from 'next/link';
import Image from 'next/image';
import { StudioServices, StudioApproach, StudioAbout } from './StudioSections';
import { StudioContact } from './StudioContact';
import { StudioMobileMenu } from './StudioMobileMenu';
import { CONTACT_EMAIL, CONTACT_LINKEDIN, whatsappUrl } from '@/lib/contact';
import { Locale } from '@/content/site';
import { BUSINESS_CASES, type BusinessCaseKey } from '@/content/business-cases';
import { Seal } from '@/components/brand/Seal';
import styles from './StudioHomeV4.module.css';
interface StudioHomeV4Props{locale:Locale}
const COPY={ar:{nav:{work:'الأعمال',approach:'المنهج',services:'الخدمات',start:'ابدأ مشروعك'},hero:{kicker:'استوديو متخصص يبني أنظمة هوية واضحة للعلامات الطموحة',lineOne:'هويةٌ تُرى.',lineTwo:'أثرٌ يبقى.',body:'نجمع بين الفهم الاستراتيجي والتنفيذ البصري الدقيق؛ لنمنح العلامة وضوحًا واتساقًا وقابلية للنمو.',primary:'استكشف الأعمال',secondary:'ابدأ مشروعك',proof:'استراتيجية · هوية · تجربة',note:'نشرح لماذا اخترنا، لا ماذا رسمنا فقط.'},work:{eyebrow:'أعمال مختارة',title:'أعمال',intro:'لا نعرض شعارًا منفصلًا؛ بل نعرض الفكرة التي قادته، والنظام الذي يحميه، والتجربة التي تمنحه قيمة.',actual:'مشروع الاستوديو',concept:'مشروع تصوري من ATHRBRANDS',explore:'استكشف ملامح المشروع',projects:{athr:{sector:'استوديو صناعة هويات بصرية',name:'ATHR BRANDS',scope:'الاستراتيجية · الهوية اللفظية · النظام البصري · التجربة الرقمية',idea:'هويةٌ تُرى. أثرٌ يبقى.',description:'نظام هوية يجمع بين الفهم الاستراتيجي والتنفيذ البصري الدقيق، ويحوّل كل قرار إلى قاعدة واضحة قابلة للاستخدام والنمو.'},naysar:{sector:'عطور معاصرة',name:'أوّل نفحة · AWWAL NAFHA',scope:'الاستراتيجية · التسمية · الهوية البصرية · التغليف · التجربة الرقمية',idea:'حضورٌ يُحَسّ.',description:'هوية تربط الإحساس بالعطر بوضوح الاختيار؛ من الزجاجة والعلبة ومجموعة التجربة إلى صفحة المنتج وصور الإطلاق.'},wizan:{sector:'عافية وقائية رقمية',name:'وِزان · WIZAN',scope:'الاستراتيجية · التسمية · الهوية اللفظية والبصرية · النظام الرقمي',idea:'الاتزان في حركة',description:'منصة عافية وقائية تجمع مؤشرات نمط الحياة المتفرقة، وتفسرها بلغة مفهومة، ثم تقترح خطوة واحدة قابلة للتنفيذ في يوم واقعي.'},sumra:{sector:'محمصة ومقهى قهوة مختصة',name:'سُمرة · SUMRA',scope:'الاستراتيجية · التوجه الإبداعي · الهوية البصرية · التغليف والتطبيقات',idea:'كل حبة لها سُمرتها.',description:'نظام هوية يجعل درجة التحميص بطل القصة: ثلاث درجات تتحول إلى لون وإيقاع وتغليف، مع دفء سعودي معاصر بلا رموز تراثية مباشرة.'}}},footer:'الرياض، المملكة العربية السعودية · نخدم العلامات في المملكة والخليج'},en:{nav:{work:'Work',approach:'Approach',services:'Services',start:'Start a project'},hero:{kicker:'A specialist studio building clear identity systems for ambitious brands',lineOne:'An identity seen.',lineTwo:'An impact that remains.',body:'We combine strategic understanding with precise visual execution to give brands clarity, consistency and room to grow.',primary:'Explore selected work',secondary:'Start a project',proof:'Strategy · Identity · Experience',note:'We explain why we chose—not only what we drew.'},work:{eyebrow:'Selected work',title:'Work',intro:'We do not present a logo in isolation. We show the idea that shaped it, the system that protects it and the experience that gives it value.',actual:'Studio project',concept:'Concept project by ATHRBRANDS',explore:'Explore the project direction',projects:{athr:{sector:'Brand identity studio',name:'ATHR BRANDS',scope:'Strategy · Verbal identity · Visual system · Digital experience',idea:'An identity seen. An impact that remains.',description:'An identity system combining strategic understanding with precise visual execution, turning decisions into clear rules built for use and growth.'},naysar:{sector:'Contemporary fragrance',name:'AWWAL NAFHA',scope:'Strategy · Naming · Visual identity · Packaging · Digital experience',idea:'Presence, felt.',description:'A fragrance identity connecting sensory character with a clear way to choose, from bottle, packaging and discovery set to the product page and launch imagery.'},wizan:{sector:'Preventive digital wellbeing',name:'WIZAN',scope:'Strategy · Naming · Verbal & Visual Identity · Digital System',idea:'Balance in motion',description:'A preventive wellbeing platform that gathers fragmented lifestyle indicators, interprets them in plain language, then suggests one realistic next step.'},sumra:{sector:'Specialty coffee roastery & café',name:'SUMRA',scope:'Strategy · Creative direction · Visual identity · Packaging & applications',idea:'Every bean has its own sumra.',description:'An identity system that makes roast level the hero: three roast stages become color, rhythm and packaging, with contemporary Saudi warmth and no literal heritage motifs.'}}},footer:'Riyadh, Saudi Arabia · Working with brands across Saudi Arabia and the GCC'}} as const;
function Arrow(){return <span aria-hidden="true">↗</span>}
function WizanMark({className}:{className?:string}){return <svg className={className} viewBox="0 0 512 512" aria-label="WIZAN brand mark" role="img"><path d="M184.15 410.07A170 170 0 1 1 327.85 410.07" fill="none" stroke="currentColor" strokeWidth="34" strokeLinecap="round"/><path d="M208.67 357.51A112 112 0 0 1 208.67 154.49" fill="none" stroke="#91A79D" strokeWidth="34" strokeLinecap="round"/><path d="M303.33 154.49A112 112 0 0 1 208.67 357.51" fill="none" stroke="#DD776A" strokeWidth="34" strokeLinecap="round"/><circle cx="256" cy="256" r="26" fill="currentColor"/><circle cx="365" cy="118" r="14" fill="#6087A0"/></svg>}
function AthrArt(){return <div className={`${styles.caseArt} ${styles.athrArt}`} aria-hidden="true"><div className={styles.athrCover}><Seal variant="full" idSuffix="v4-work-athr" className={styles.coverSeal}/><span className={styles.coverEyebrow}>BRAND STRATEGY &amp; IDENTITY · V2.0</span><strong>هويةٌ تُرى.<br/>أثرٌ يبقى.</strong><span className={styles.coverName}>ATHR BRANDS</span><small>أثر لصناعة الهويات البصرية</small></div><div className={`${styles.systemSheet} ${styles.athrLogoSheet}`}><span>نظام لا شعار منفرد</span><Seal variant="full" idSuffix="v4-work-athr-small" className={styles.sheetSeal}/><b>وضوح · اتساق · قابلية للنمو</b></div><div className={`${styles.systemSheet} ${styles.athrPaletteSheet}`}><span>النظام البصري</span><div className={styles.swatches}><i style={{background:'#161616'}}/><i style={{background:'#B69A70'}}/><i style={{background:'#F0EADF'}}/></div><b>فحمي · ذهبي · عاجي</b></div><div className={`${styles.systemSheet} ${styles.athrDigitalSheet}`}><span>صوت واضح، هادئ، وواثق</span><div className={styles.browserMock}><Seal variant="mono" idSuffix="v4-work-athr-browser" className={styles.browserSeal}/><p>نبني نظامًا بصريًا يساعد علامتك على الظهور بوضوح واتساق.</p><em>ابدأ مشروعك</em></div></div></div>}
function WizanArt(){return <div className={`${styles.caseArt} ${styles.wizanArt}`} aria-hidden="true"><div className={styles.wizanCover}><WizanMark className={styles.wizanMarkLarge}/><span>وِزان</span><strong>WIZAN</strong><small>عافية تُقاس. حياة تتوازن.</small></div><div className={styles.wizanGeometry}><span>مؤشر عافية مفتوح</span><WizanMark className={styles.wizanGeometryMark}/><div className={styles.gridTicks}><i/><i/><i/><i/></div></div><div className={styles.wizanApp}><div className={styles.phoneTop}><WizanMark/><b>WIZAN</b></div><small>صباح الخير، نورة</small><strong>78</strong><em>مؤشر العافية اليوم</em><div className={styles.metricBars}><i style={{width:'82%'}}/><i style={{width:'74%'}}/><i style={{width:'79%'}}/><i style={{width:'65%'}}/></div></div><div className={styles.wizanReport}><span>تقرير العافية</span><div className={styles.reportCards}><i/><i/><i/></div><p>بيانات واضحة، وخطوة تالية قابلة للتنفيذ.</p></div></div>}


function NaysarArt() {
  return <div className={styles.caseArt} data-case-art="photograph"><Image src="/assets/naysar/hero.png?v=names-v2" alt="" width={1536} height={1024} sizes="(max-width: 760px) 100vw, 85vw" style={{width:'100%',height:'100%',objectFit:'cover'}} /></div>;
}

function BusinessArt({ slug }: { slug: BusinessCaseKey }) {
  return <div className={styles.caseArt} data-case-art="photograph"><Image src={`/assets/${slug}/hero.png?v=names-v2`} alt="" width={1536} height={1024} sizes="(max-width: 760px) 100vw, 85vw" style={{width:'100%',height:'100%',objectFit:'cover'}} /></div>;
}

function SumraArt() {
  return <div className={styles.caseArt} data-case-art="photograph"><Image src="/assets/sumra/full.jpg" alt="" width={1536} height={1024} sizes="(max-width: 760px) 100vw, 85vw" style={{width:'100%',height:'100%',objectFit:'cover'}} /></div>;
}
function DahshaArt() {
  return <div className={styles.caseArt} data-case-art="photograph"><Image src="/assets/dahsha/campaign.png" alt="" width={1536} height={1024} sizes="(max-width: 760px) 100vw, 85vw" style={{width:'100%',height:'100%',objectFit:'cover'}} /></div>;
}

function NabraArt() {
  return <div className={styles.caseArt} data-case-art="photograph"><Image src="/assets/nabra/campaign.webp" alt="" width={1536} height={1024} sizes="(max-width: 760px) 100vw, 85vw" style={{width:'100%',height:'100%',objectFit:'cover'}} /></div>;
}

export function StudioHomeV4({ locale }: StudioHomeV4Props) {
  const ar = locale === 'ar';
  const c = COPY[locale];
  const projects = [
    { key:'athr', copy:c.work.projects.athr, tag:c.work.actual, art:<AthrArt/>, href:`/${locale}/work/athrbrands` },
    { key:'naysar', copy:c.work.projects.naysar, tag:c.work.concept, art:<NaysarArt/>, href:`/${locale}/work/awwal-nafha` },
    ...(['nawsaq', 'darwaq'] as const).map(slug => {
      const project = BUSINESS_CASES[slug];
      const copy = project.copy[locale];
      return {
        key: slug, tag: c.work.concept, art: <BusinessArt slug={slug}/>, href: `/${locale}/work/${project.slug}`,
        copy: {
          sector: copy.sector,
          name: ar ? `${copy.name} · ${project.latinName}` : project.latinName,
          scope: copy.scope.join(' · '),
          idea: copy.tagline,
          description: copy.summary,
        },
      };
    }),
    { key:'wizan', copy:c.work.projects.wizan, tag:c.work.concept, art:<WizanArt/>, href:`/${locale}/work/wizan` },
    {
      key:'nabra', tag:c.work.concept, art:<NabraArt/>, href:`/${locale}/work/nabra`,
      copy: ar ? {
        sector:'مركز طبي متعدد التخصصات', name:'نبرأ · NABRA',
        scope:'الاستراتيجية · الهوية اللفظية والبصرية · تجربة المراجع · التطبيقات',
        idea:'معك، خطوة بخطوة.',
        description:'دراسة كاملة تربط رعاية واضحة وقريبة بالتموضع والرسائل ومسارات الهوية، ثم تمتد إلى رحلة المراجع والإرشاد والمطبوعات والإطلاق.',
      } : {
        sector:'Multidisciplinary medical center', name:'NABRA',
        scope:'Strategy · Verbal & visual identity · Visitor journey · Applications',
        idea:'With you, step by step.',
        description:'A complete Arabic study connecting clear, approachable care with positioning, messages and a visual system, then extending it into the visitor journey, signage, print and launch planning.',
      },
    },
    { key:'sumra', copy:c.work.projects.sumra, tag:c.work.concept, art:<SumraArt/>, href:`/${locale}/work/sumra` },
    {
      key:'dahsha', tag:c.work.concept, art:<DahshaArt/>, href:`/${locale}/work/dahsha`,
      copy: ar ? {
        sector:'متجر ألعاب وتجارب للأطفال', name:'دهشة · DAHSHA',
        scope:'الاستراتيجية · التوجه الإبداعي · الهوية البصرية · تجربة المتجر',
        idea:'مرح يراه الطفل، وهوية يطمئن لها الوالد.',
        description:'هوية مرحة تربط فضول الطفل بوضوح الاختيار لدى الأسرة، من نظام الألوان والشعار إلى التغليف وتجربة المتجر.',
      } : {
        sector:'Children’s toys and experiences', name:'DAHSHA',
        scope:'Strategy · Creative direction · Visual identity · Store experience',
        idea:'Joy a child sees. A brand a parent trusts.',
        description:'A playful identity connecting children’s curiosity with clear choices for families, from color and logo to packaging and the store experience.',
      },
    },
  ];
  return (
    <div className={`${styles.site} ${ar ? styles.ar : styles.en}`}>
      <a className={styles.skipLink} href="#top">{ar ? 'انتقل إلى المحتوى' : 'Skip to content'}</a>
      <header className={styles.nav}>
        <a className={styles.brand} href="#top" aria-label={ar ? 'أثر — الرئيسية' : 'ATHR — home'}>
          <Seal variant="full" idSuffix="v4-nav" className={styles.navSeal}/><span>ATHR BRANDS</span>
        </a>
        <nav className={styles.desktopNav} aria-label={ar ? 'التنقل الرئيسي' : 'Main navigation'}>
          <a href="#work">{c.nav.work}</a><a href="#approach">{c.nav.approach}</a><a href="#services">{c.nav.services}</a>
        </nav>
        <div className={styles.navActions}>
          <Link href={ar ? '/en' : '/ar'} className={styles.language} aria-label={ar ? 'English' : 'العربية'}>{ar ? 'EN' : 'AR'}</Link>
          <a href="#contact" className={styles.navCta}>{c.nav.start}<Arrow/></a>
        </div>
        <StudioMobileMenu locale={locale}/>
      </header>
      <main id="top" tabIndex={-1}>
        <section className={styles.hero}>
          <div className={styles.heroGrid}/>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>{c.hero.kicker}</p>
            <h1><span>{c.hero.lineOne}</span><em>{c.hero.lineTwo}</em></h1>
            <p className={styles.heroBody}>{c.hero.body}</p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#contact">{c.nav.start}<Arrow/></a>
              <a className={styles.secondaryButton} href="#work">{c.hero.primary}</a>
            </div>
            <div className={styles.heroProof}><span>{c.hero.proof}</span><i/></div>
          </div>
          <div className={styles.heroIdentity}>
            <div className={styles.heroOrbit}/><Seal variant="full" idSuffix="v4-hero" className={styles.heroSeal}/>
            <p>{c.hero.note}</p>
          </div>
        </section>
        <section className={styles.work} id="work">
          <div className={styles.sectionIntro}><p>{c.work.eyebrow}</p><h2>{c.work.title}</h2><div><span/>{c.work.intro}</div></div>
          <div className={styles.projectList}>
            {projects.map((project,index) => (
              <article className={styles.project} key={project.key}>
                <Link className={styles.projectVisual} href={project.href} aria-label={`${c.work.explore}: ${project.copy.name}`}>{project.art}</Link>
                <div className={styles.projectCopy}>
                  <div className={styles.projectTopline}><span>0{index + 1}</span><small>{project.tag}</small></div>
                  <p className={styles.projectSector}>{project.copy.sector}</p><h3>{project.copy.name}</h3>
                  <p className={styles.projectScope}>{project.copy.scope}</p>
                  <div className={styles.projectIdea}><span>{ar ? 'الفكرة الإبداعية' : 'Creative idea'}</span><b>{project.copy.idea}</b></div>
                  <p className={styles.projectDescription}>{project.copy.description}</p>
                  <Link href={project.href} className={styles.projectLink}>{c.work.explore}<Arrow/></Link>
                </div>
              </article>
            ))}
          </div>
        </section>
        <StudioServices locale={locale}/>
        <StudioApproach locale={locale}/>
        <StudioAbout locale={locale}/>
        <StudioContact locale={locale}/>
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerBrand}><Seal variant="mono" idSuffix="v4-footer" className={styles.footerSeal}/><span>ATHR BRANDS</span></div>
        <p>{c.footer}</p>
        <div className={styles.footerLinks}>
          <a href={`mailto:${CONTACT_EMAIL}`} dir="ltr">{CONTACT_EMAIL}</a>
          <a href={whatsappUrl(locale)} target="_blank" rel="noopener noreferrer">{ar ? 'واتساب' : 'WhatsApp'}</a>
          <a href={CONTACT_LINKEDIN} target="_blank" rel="noopener noreferrer">{ar ? 'لينكدإن' : 'LinkedIn'}</a>
        </div>
      </footer>
    </div>
  );
}
