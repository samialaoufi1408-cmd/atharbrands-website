import Link from 'next/link';

const sections = [
  ['01','الغلاف','استراتيجية وهوية بصرية لمتجر ألعاب وتجارب للأطفال'],
  ['02','الفكرة','مرح يراه الطفل، وهوية يطمئن لها الوالد.'],
  ['03','دهشة','الاسم والفكرة المركزية للعلامة.'],
  ['04','الجمهور','طفل يختار، وأسرة تثق.'],
  ['05','منصة العلامة','متعة الاكتشاف.'],
  ['06','صانع الدهشة','ملامح الشخصية التي تقود التجربة.'],
  ['07','النظام','ثلاثة عوالم. قرار واحد.'],
  ['08','اللون','وصفة واو.'],
  ['09','بناء العلامة','من الدهشة إلى علامة.'],
  ['10','الحل المقترح','الشعار والنظام المعتمد.'],
  ['11','نسخ الشعار','مرن في المساحة، ثابت في النسب.'],
  ['12','المساحة الآمنة','نظام واضح مهما صغر.'],
  ['13','الألوان','منظومة لون محسوبة.'],
  ['14','الخطوط','حروف ودودة، قراءة سهلة.'],
  ['15','النمط','نظام يجمع المفاجأة.'],
  ['16','لغة الأيقونات','محل يعلّمك كيف تلعب.'],
  ['17','التجربة المكانية','محور أصله لون اللعبة.'],
  ['18','التغليف','هوية تفرح من أول لمس.'],
  ['19','المتجر','المتجر يقود التجربة بصرياً.'],
  ['20','المطبوعات','حتى المساحات الهادئة لها روح العلامة.'],
  ['21','المحتوى الرقمي','مفاجأة واضحة، رسالة قصيرة.'],
  ['22','الخلاصة','نظام متكامل، لا مجرد مفردة.'],
] as const;

const colors=['#2d5be7','#ffd43b','#ff665e','#27c7b7','#7548ff','#191824'];

export default function DahshaCase({params}:{params:{locale:'ar'|'en'}}){
  const ar=params.locale==='ar';
  return <main dir={ar?'rtl':'ltr'} style={{background:'#fff8eb',color:'#191824',minHeight:'100vh'}}>
    <header style={{position:'sticky',top:0,zIndex:20,padding:'20px clamp(18px,5vw,72px)',display:'flex',justifyContent:'space-between',alignItems:'center',gap:20,background:'rgba(255,248,235,.94)',backdropFilter:'blur(16px)',borderBottom:'1px solid rgba(25,24,36,.1)'}}>
      <b style={{letterSpacing:'.12em'}}>ATHR BRANDS</b>
      <Link href={`/${params.locale}#work`} style={{color:'#2d5be7',textDecoration:'none'}}>{ar?'العودة إلى الأعمال':'Back to work'}</Link>
    </header>

    <section style={{minHeight:'76vh',padding:'clamp(72px,11vw,150px) clamp(22px,8vw,130px)',display:'flex',flexDirection:'column',justifyContent:'center',gap:26,background:'#191824',color:'#fff'}}>
      <small style={{color:'#ffd43b',letterSpacing:'.08em'}}>05 · {ar?'مشروع تصوري':'CONCEPT PROJECT'}</small>
      <h1 style={{fontSize:'clamp(64px,12vw,150px)',margin:0,lineHeight:.92,fontWeight:800}}>{ar?'دهشة':'DAHSHA'}</h1>
      <h2 style={{fontSize:'clamp(27px,4.6vw,58px)',lineHeight:1.35,maxWidth:980,margin:0,fontWeight:500}}>{ar?'مرح يراه الطفل، وهوية يطمئن لها الوالد.':'Joy a child sees. A brand a parent trusts.'}</h2>
      <div style={{display:'flex',gap:8,marginTop:18}}>{colors.map(c=><i key={c} style={{width:38,height:10,borderRadius:20,background:c}} />)}</div>
    </section>

    <section style={{padding:'clamp(64px,9vw,120px) clamp(18px,6vw,90px)'}}>
      <div style={{maxWidth:1120,margin:'0 auto 56px'}}>
        <small style={{color:'#2d5be7'}}>DAHSHA · ATHR BRANDS · 2026</small>
        <h2 style={{fontSize:'clamp(34px,5vw,64px)',lineHeight:1.25,margin:'14px 0 0'}}>{ar?'دراسة العمل كاملة — 22 صفحة':'Full case study — 22 pages'}</h2>
        <p style={{fontSize:'clamp(16px,2vw,20px)',lineHeight:1.9,maxWidth:760,color:'rgba(25,24,36,.66)'}}>{ar?'تم ترتيب العمل هنا بحسب تسلسل الملف الأصلي، من الفكرة والجمهور إلى الشعار والألوان والخطوط والتطبيقات، بدون اختصار الدراسة إلى ثلاث أو أربع شاشات.':'The work follows the source document sequence from concept and audience through identity system and applications.'}</p>
      </div>

      <div style={{maxWidth:1120,margin:'0 auto',display:'grid',gap:'clamp(34px,6vw,76px)'}}>
        {sections.map(([no,label,title],index)=>{
          const dark=[2,4,9,13,16,20].includes(index);
          const blue=[6,14].includes(index);
          return <article key={no} style={{minHeight:'clamp(360px,62vw,700px)',padding:'clamp(30px,6vw,78px)',borderRadius:28,background:blue?'#2d5be7':dark?'#191824':'#fffdf7',color:(dark||blue)?'#fff':'#191824',border:dark||blue?'none':'1px solid rgba(25,24,36,.1)',boxShadow:dark||blue?'none':'0 20px 60px rgba(55,45,30,.06)',display:'flex',flexDirection:'column',justifyContent:'space-between',gap:44}}>
            <div style={{display:'flex',justifyContent:'space-between',gap:18,alignItems:'center'}}>
              <small style={{color:dark?'#ffd43b':blue?'#fff':'#2d5be7',opacity:.92}}>{no} · {label}</small>
              <span style={{fontSize:12,opacity:.45}}>DAHSHA / ATHR BRANDS</span>
            </div>
            <div style={{maxWidth:900}}>
              <h2 style={{fontSize:'clamp(34px,6vw,72px)',lineHeight:1.22,margin:0,fontWeight:600}}>{title}</h2>
              {index===4 && <div style={{display:'grid',gridTemplateColumns:'repeat(3,minmax(0,1fr))',gap:14,marginTop:52}}>{['فضول','ثقة','خيال','بساطة','مرح','اختيار'].map(x=><div key={x} style={{padding:'20px 12px',background:'#fff',color:'#191824',borderRadius:16,textAlign:'center',fontWeight:700}}>{x}</div>)}</div>}
              {index===6 && <div style={{display:'flex',gap:10,flexWrap:'wrap',marginTop:48}}>{colors.slice(0,5).map(c=><i key={c} style={{width:86,height:86,borderRadius:18,background:c,border:'1px solid rgba(255,255,255,.28)'}} />)}</div>}
              {index===12 && <div style={{display:'grid',gridTemplateColumns:'repeat(3,minmax(0,1fr))',gap:12,marginTop:48}}>{colors.map(c=><i key={c} style={{height:96,borderRadius:14,background:c,border:'1px solid rgba(25,24,36,.08)'}} />)}</div>}
              {index===14 && <div style={{marginTop:50,display:'flex',gap:14,flexWrap:'wrap'}}>{Array.from({length:18}).map((_,i)=><i key={i} style={{width:20+(i%3)*10,height:20+(i%3)*10,borderRadius:i%2?'50%':7,background:colors[i%colors.length]}} />)}</div>}
              {index===21 && <div style={{marginTop:54,display:'flex',alignItems:'center',gap:18}}><span style={{width:58,height:58,borderRadius:18,display:'grid',placeItems:'center',background:'#2d5be7',color:'#fff',fontSize:34,fontWeight:800}}>د</span><b style={{fontSize:'clamp(32px,5vw,60px)'}}>دهشة</b></div>}
            </div>
            <div style={{height:5,width:index%2===0?'38%':'62%',borderRadius:20,background:dark?'#ffd43b':blue?'#ffd43b':colors[index%colors.length]}} />
          </article>
        })}
      </div>
    </section>

    <footer style={{padding:'54px clamp(22px,8vw,130px)',display:'flex',justifyContent:'space-between',gap:20,background:'#191824',color:'#fff'}}>
      <b>DAHSHA · ATHR BRANDS 2026</b>
      <Link href={`/${params.locale}#work`} style={{color:'#ffd43b'}}>{ar?'العودة إلى الأعمال':'Back to work'}</Link>
    </footer>
  </main>
}
