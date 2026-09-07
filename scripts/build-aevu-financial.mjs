import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Workbook, SpreadsheetFile } from '@oai/artifact-tool';
const root=process.env.AEVU_REPO || path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const build=process.env.AEVU_BUILD_DIR || path.resolve(root, '../aevu-build');
const out=root+'/public/downloads';
const qa=build+'/workbook-qa';
await fs.mkdir(qa,{recursive:true});
const data=JSON.parse(await fs.readFile(root+'/content/aevu-financial.json','utf8'));
const sources=JSON.parse(await fs.readFile(build+'/sources.json','utf8'));
const wb=Workbook.create();
const names=['ملخص','الافتراضات','التكاليف','شهري','السيناريوهات','ثلاث سنوات','المصادر والفحص'];
const sheets=Object.fromEntries(names.map(n=>[n,wb.worksheets.add(n)]));
const col=i=>String.fromCharCode(66+i);
const q=n=>`'${n}'!`;
const inp=q(names[1]),cost=q(names[2]),month=q(names[3]);
const fmt='#,##0;[Red](#,##0);"—"',dec='#,##0.00;[Red](#,##0.00);"—"';
const set=(s,a,v)=>s.getRange(a).values=[[v]];
const formula=(s,a,f)=>{s.getRange(a).formulas=[[f]];s.getRange(a).format.font.color=f.includes("'!")||f.includes("'ال")?'#008000':'#000000';};
const input=(s,a,v,note)=>{set(s,a,v);s.getRange(a).format.fill='#CCD8C2';s.getRange(a).format.font.color='#0000FF';if(note)wb.comments.addThread({cell:s.getRange(a)},note);};
const merge=(s,a,text)=>{s.getRange(a).merge();s.getRange(a.split(':')[0]).values=[[text]];};
const band=(s,row,text,end='D')=>{merge(s,`A${row}:${end}${row}`,text);s.getRange(`A${row}:${end}${row}`).format={fill:'#382D42',font:{bold:true,color:'#FFFFFF'},rowHeight:30};};
wb.comments.setSelf({displayName:'ATHR — AEVU study'});
for(const [n,s] of Object.entries(sheets)){
 s.showGridLines=false;s.freezePanes.freezeRows(5);
 s.getRange('A1:M60').format={font:{name:'IBM Plex Sans Arabic',size:11,color:'#382D42'},rowHeight:25,verticalAlignment:'center',horizontalAlignment:'right'};
 s.getRange('A1:A60').format.columnWidthPx=300;
 s.getRange('B1:D60').format.columnWidthPx=175;
 s.getRange('B6:M60').setNumberFormat(fmt);
 band(s,1,'AEVU | إيڤو — '+n,n==='شهري'?'M':'D');
 merge(s,'A2:D3','دراسة تصورية • 7 سبتمبر 2026 • ريال سعودي • المدخلات باللون الأزرق، المعادلات بالأسود، وروابط الأوراق بالأخضر.');
 s.getRange('A2:D3').format={wrapText:true,fill:'#F2EFE8'};
}
const c=sheets['التكاليف'];
for(const [start,title,rows,totalRow] of [[6,'التأسيس وما قبل التشغيل',data.setup,14],[17,'التكلفة الثابتة الشهرية',data.fixed,25],[28,'تكلفة تصنيع العبوة الواحدة',data.productCost,34]]){
 band(c,start-1,title);
 rows.forEach(([label,value],i)=>{set(c,`A${start+i}`,label);input(c,`B${start+i}`,value,label.includes('تسجيل العلامة')?'رسوم طلب واحد وفئة واحدة: 1000 طلب + 500 نشر + 5000 تسجيل. المصدر: https://www.saip.gov.sa/ar/services/trademarks/trademark-registration — مراجعة 2026-09-07.':'افتراض داخلي للتخطيط، يحتاج عرض سعر أو عقد قبل الالتزام.');});
 set(c,`A${totalRow}`,'الإجمالي');formula(c,`B${totalRow}`,`=SUM(B${start}:B${totalRow-1})`);c.getRange(`A${totalRow}:D${totalRow}`).format.fill='#F2EFE8';
}
merge(c,'A37:D40','تكلفة المنتج تشمل العبوة والعلبة مرة واحدة. مبلغ تجهيز الإدراج أتعاب وتجهيز مفترضة؛ خدمة إخطار تسويق مستحضرات التجميل لدى الهيئة معلنة بلا مقابل. الغطاء والزجاج المخصصان في الصور تصور بصري؛ التأسيس لا يشمل قالب زجاج حصري.');c.getRange('A37:D40').format.wrapText=true;
c.getRange('A6:A34').format.wrapText=true;c.getRange('A6:A34').format.rowHeight=31;
const a=sheets['الافتراضات'];
a.getRange('A5:D5').values=[['الافتراض','القيمة','الوحدة','التفسير']];
a.getRange('D1:D60').format.columnWidthPx=390;a.getRange('E1:M60').format.columnWidthPx=90;
const rows=[
 ['سعر المستهلك',249,'ر.س / عبوة','يشمل القيمة المضافة قبل الخصم.'],['القيمة المضافة',.15,'%','المصدر الرسمي: ZATCA؛ النموذج يفترض تكلفة صافية من المدخلات القابلة للاسترداد.'],['متوسط الخصم',.08,'%','افتراض على كل الطلبات.'],['الإيراد المسترد',.02,'%','خصم من الإيراد بعد التخفيض؛ لا يعاد المنتج للمخزون.'],['تكلفة المنتج',null,'ر.س / عبوة','مرتبطة بتفصيل ورقة التكاليف.'],['التجهيز',5,'ر.س / طلب','تجهيز الطلب، مستقل عن تصنيع العلبة.'],['الشحن',18,'ر.س / طلب','تتحمله العلامة؛ لا إيراد شحن.'],['رسوم الدفع النسبية',.025,'%','على المحصل بعد الخصم وقبل الاسترداد.'],['رسوم الدفع الثابتة',1,'ر.س / طلب','إضافة إلى النسبة.'],['مخصص معالجة المرتجعات',2.5,'ر.س / طلب','نقل ومعالجة إضافية؛ مستقل عن رد الإيراد.'],['تسويق متغير',45,'ر.س / طلب','متوسط إنفاق على كل الطلبات، وليس تكلفة عميل جديد.'],['تكاليف ثابتة شهرية',null,'ر.س / شهر','تشمل أجر المؤسس؛ مرتبطة بورقة التكاليف.'],['تأسيس',null,'ر.س','تكلفة ما قبل التشغيل؛ لا تخصم مرة ثانية من النقد الافتتاحي.'],['مخزون افتتاحي مدفوع',1000,'عبوة','دفع بالكامل قبل الشهر الأول.'],['وديعة',3000,'ر.س','لا استرداد داخل أفق السنة.'],['احتياطي تشغيل',4,'أشهر ثابتة','سيولة افتتاحية وليست مصروفًا.'],['هامش توقيت الضريبة',10000,'ر.س','خارج حركة النقد الأساسية؛ احتياطي تقديري يحتاج مراجعة.'],['حجم الدفعة المستهدف',1000,'عبوة','مرجع للتخطيط؛ عدل مواعيد وكميات الاستلام في الصف 52 يدويًا.'],['مهلة التوريد',1,'شهر','الدفعة المقدمة تسبق الاستلام بهذه المدة.'],['مقدم المورد',.5,'%','الباقي عند استلام الدفعة.'],['مخزون أمان',250,'عبوة','عتبة تنبيه، لا تولد أمر شراء آليًا.'],['تحويل المتجر المستهدف',.02,'%','افتراض لتقدير الزيارات، لم يختبر.'],['نمو الحجم — السنة الثانية',.25,'%','افتراض نمو الطلبات.'],['نمو الحجم — السنة الثالثة',.20,'%','افتراض نمو الطلبات.'],['تضخم تكلفة المنتج',.03,'% سنويًا','يطبق على تكلفة المنتج وحدها.'],['نمو التكاليف الثابتة',.10,'% سنويًا','زيادة الموارد التشغيلية.'],['أفق السنة',12,'شهر','ثابت في هذا الملف؛ الجداول مبنية على 12 شهرًا.'],['سماحية الفحص',.01,'ر.س','فروق تقريبات الحسابات.']
];
rows.forEach(([label,v,unit,note],i)=>{const r=i+6;set(a,`A${r}`,label);set(a,`C${r}`,unit);set(a,`D${r}`,note);if(v!==null)input(a,`B${r}`,v,note+' المصدر: افتراض داخلي، باستثناء الضريبة الموثقة في ورقة المصادر.');});
formula(a,'B10',`=${cost}B34`);formula(a,'B17',`=${cost}B25`);formula(a,'B18',`=${cost}B14`);
for(const r of [7,8,9,13,25,27,28,29,30,31])a.getRange(`B${r}`).setNumberFormat('0.0%');
a.getRange('B15').setNumberFormat(dec);a.getRange('B33').setNumberFormat(dec);
a.getRange('B23').format.font.color='#382D42';a.getRange('B32:B33').format.font.color='#382D42';
a.getRange('D6:D33').format.wrapText=true;a.getRange('A6:D33').format.rowHeight=40;
band(a,35,'اقتصاد الطلب والتمويل');
const deriv=[['المحصل بعد الخصم','=B6*(1-B8)'],['إيراد صاف للطلب','=B36*(1-B9)/(1+B7)'],['رسوم الدفع','=B36*B13+B14'],['متغيرات الطلب','=SUM(B10:B12)+B38+B15+B16'],['مساهمة الطلب','=B37-B39'],['هامش المساهمة','=B40/B37'],['تعادل الطلبات شهريًا','=IF(B40>0,ROUNDUP(B17/B40,0),"لا يوجد")'],['تمويل البداية الأساسي','=B18+B19*B10+B20+B17*B21'],['السيولة الافتتاحية','=B17*B21'],['مظروف التمويل مع هامش الضريبة','=B43+B22']];
deriv.forEach(([l,f],i)=>{set(a,`A${i+36}`,l);formula(a,`B${i+36}`,f);});a.getRange('B36:B40').setNumberFormat(dec);a.getRange('B41').setNumberFormat('0.0%');
band(a,48,'خطة الطلبات والاستلام — عدل كليهما عند تغيير الحجم أو المورد','M');
a.getRange('B50:M52').values=[Array.from({length:12},(_,i)=>i+1),data.monthlyUnits,data.receiptsUnits];
set(a,'A50','الشهر');set(a,'A51','الطلبات المشحونة');set(a,'A52','استلام دفعات — عبوات');a.getRange('B51:M52').format={fill:'#CCD8C2',font:{color:'#0000FF'}};
a.dataValidations.add({range:'B24',rule:{type:'whole',operator:'between',formula1:0,formula2:3}});
a.dataValidations.add({range:'B51:M52',rule:{type:'whole',operator:'greaterThanOrEqual',formula1:0}});
merge(a,'A54:M56','الطلب = عبوة واحدة 50 مل. الاستلام في بداية الشهر والشحن على مدار الشهر. الخطة الشهرية لا تختبر نفاد المخزون داخل اليوم. عند تقديم موعد توريد إلى بداية السنة راجع أي دفعات مقدمة قبل الشهر الأول، وأضفها للتمويل.');a.getRange('A54:M56').format.wrapText=true;
const m=sheets['شهري'];m.getRange('B1:M40').format.columnWidthPx=108;m.freezePanes.freezeColumns(1);
m.getRange('B5:M5').values=[Array.from({length:12},(_,i)=>i+1)];
const labels={6:'طلبات مشحونة',7:'محصل شامل الضريبة بعد الخصم',8:'إيراد مسترد (خصم)',9:'إيراد صاف دون الضريبة',10:'تكلفة المنتج المباع',11:'تجهيز الطلبات',12:'الشحن',13:'رسوم الدفع',14:'معالجة المرتجعات',15:'التسويق المتغير',16:'إجمالي المتغير',17:'المساهمة',18:'ثابت شهري',19:'فائض التشغيل',21:'مخزون أول الشهر',22:'استلام في بداية الشهر',23:'شحنات الشهر',24:'مخزون آخر الشهر',25:'دفعة مقدمة للمورد',26:'باقي قيمة المستلم',27:'مشتريات نقدية',28:'تدفق نقد التشغيل',29:'نقد أول الشهر',30:'نقد آخر الشهر',31:'فحص حركة النقد',32:'فحص حركة المخزون',33:'الهامش فوق مخزون الأمان'};
for(const [r,l] of Object.entries(labels))set(m,`A${r}`,l);
for(let i=0;i<12;i++){
 const x=col(i),prev=col(i-1),R=r=>`${x}${r}`,I=r=>`${inp}$B$${r}`;
 const f={6:`${inp}${x}51`,7:`${R(6)}*${I(36)}`,8:`-${R(7)}*${I(9)}`,9:`(${R(7)}+${R(8)})/(1+${I(7)})`,10:`${R(6)}*${I(10)}`,11:`${R(6)}*${I(11)}`,12:`${R(6)}*${I(12)}`,13:`${R(6)}*${I(38)}`,14:`${R(6)}*${I(15)}`,15:`${R(6)}*${I(16)}`,16:`SUM(${R(10)}:${R(15)})`,17:`${R(9)}-${R(16)}`,18:I(17),19:`${R(17)}-${R(18)}`,21:i?`${prev}24`:I(19),22:`${inp}${x}52`,23:R(6),24:`${R(21)}+${R(22)}-${R(23)}`,25:`IF(${x}$5+${I(24)}<=${I(32)},INDEX(${inp}$B$52:$M$52,1,MIN(${I(32)},${x}$5+${I(24)}))*${I(10)}*${I(25)},0)`,26:`${R(22)}*${I(10)}*(1-${I(25)})`,27:`SUM(${R(25)}:${R(26)})`,28:`${R(9)}-SUM(${R(11)}:${R(15)})-${R(18)}-${R(27)}`,29:i?`${prev}30`:I(44),30:`${R(29)}+${R(28)}`,31:`${R(30)}-${R(29)}-${R(28)}`,32:`${R(24)}-${R(21)}-${R(22)}+${R(23)}`,33:`${R(24)}-${I(26)}`};
 for(const [r,v]of Object.entries(f))formula(m,`${x}${r}`,'='+v);
}
for(const r of [9,19,24,30])m.getRange(`A${r}:M${r}`).format={fill:'#CCD8C2',font:{bold:true}};
merge(m,'A36:M38','النقد يستبعد توقيت ضريبة المدخلات والمخرجات. لا تمويل أو إهلاك أو زكاة/ضريبة دخل أو توزيعات. تكلفة المنتج مصروف عند البيع، أما النقد فيتبع دفعات المورد. قيمة المخزون الافتتاحي دفعت من تمويل البداية، ولا تخصم مرة ثانية.');m.getRange('A36:M38').format.wrapText=true;
const sc=sheets['السيناريوهات'];sc.getRange('B5:D5').values=[['متحفظ','أساسي','متفائل']];
const fields=['price','vat','discount','refund','product','fulfillment','shipping','paymentPct','paymentFixed','returnsCost','marketing','fixed'];
for(let j=0;j<3;j++){
 const x=col(j),values=data.scenarios[j].inputs;
 fields.forEach((key,i)=>{set(sc,`A${i+6}`,rows[i][0]);if(j===1)formula(sc,`${x}${i+6}`,`=${inp}B${i+6}`);else input(sc,`${x}${i+6}`,values[key],'سيناريو افتراضي غير احتمالي؛ يعدل بالاختبار والعروض.');});
 input(sc,`${x}18`,[.7,1,1.3][j]);
 const f={19:`ROUND(SUM(${inp}$B$51:$M$51)*${x}18,0)`,21:`${x}6*(1-${x}8)`,22:`${x}21*(1-${x}9)/(1+${x}7)`,23:`${x}21*${x}13+${x}14`,24:`SUM(${x}10:${x}12)+${x}23+${x}15+${x}16`,25:`${x}22-${x}24`,26:`${x}19*${x}22`,27:`${x}19*${x}25-${x}17*${inp}$B$32`,28:`IF(${x}25>0,ROUNDUP(${x}17/${x}25,0),"لا يوجد")`};
 for(const[r,v]of Object.entries(f))formula(sc,`${x}${r}`,'='+v);
 for(const r of[7,8,9,13,18])sc.getRange(`${x}${r}`).setNumberFormat('0.0%');
}
for(const[r,l]of Object.entries({18:'مضاعف الحجم الأساسي',19:'طلبات السنة',21:'محصل الطلب',22:'إيراد صاف للطلب',23:'رسوم الدفع للطلب',24:'متغير الطلب',25:'مساهمة الطلب',26:'إيرادات السنة',27:'فائض تشغيل السنة',28:'التعادل — طلبات / شهر'}))set(sc,`A${r}`,l);
sc.getRange('B15:D15').setNumberFormat(dec);sc.getRange('B21:D25').setNumberFormat(dec);sc.getRange('A27:D28').format.fill='#CCD8C2';
band(sc,31,'حساسية فائض السنة — السعر × تسويق كل طلب');
set(sc,'A33','سعر شامل الضريبة / تسويق');sc.getRange('B33:D33').values=[[35,45,55]];sc.getRange('A34:A36').values=[[229],[249],[269]];sc.getRange('B33:D33').format.font.color='#0000FF';sc.getRange('A34:A36').format.font.color='#0000FF';
for(let j=0;j<3;j++)for(let r=34;r<=36;r++){const x=col(j);formula(sc,`${x}${r}`,`=SUM(${inp}$B$51:$M$51)*($A${r}*(1-${inp}$B$8)*(1-${inp}$B$9)/(1+${inp}$B$7)-SUM(${inp}$B$10:$B$12)-$A${r}*(1-${inp}$B$8)*${inp}$B$13-${inp}$B$14-${inp}$B$15-${x}$33)-${inp}$B$17*${inp}$B$32`);}
merge(sc,'A39:D42','السيناريوهات تقارن الربحية فقط؛ لا تعيد جدولة المخزون والتمويل تلقائيًا. انخفاض الطلب مع تكلفة مرتفعة قد يتطلب تأجيل الإطلاق. جدول الحساسية يثبت الحجم وبقية افتراضات الأساس ويغير السعر والتسويق فقط.');sc.getRange('A39:D42').format.wrapText=true;
const y=sheets['ثلاث سنوات'];y.getRange('B5:D5').values=[['السنة الأولى','السنة الثانية','السنة الثالثة']];
const yl={6:'طلبات السنة',7:'إيراد صاف للطلب',8:'تكلفة منتج العبوة',9:'إجمالي متغير الطلب',10:'مساهمة الطلب',11:'إيراد السنة',12:'ثابت السنة',13:'فائض التشغيل',14:'تراكمي فائض التشغيل',15:'تمويل بداية غير مغطى بالفائض'};
for(const[r,l]of Object.entries(yl))set(y,`A${r}`,l);
for(let j=0;j<3;j++){
 const x=col(j),p=col(j-1),f={6:j?`ROUND(${p}6*(1+${inp}$B$${j===1?28:29}),0)`:`SUM(${inp}$B$51:$M$51)`,7:`${inp}$B$37`,8:j?`${p}8*(1+${inp}$B$30)`:`${inp}$B$10`,9:`${inp}$B$39-${inp}$B$10+${x}8`,10:`${x}7-${x}9`,11:`${x}6*${x}7`,12:j?`${p}12*(1+${inp}$B$31)`:`${inp}$B$17*${inp}$B$32`,13:`${x}6*${x}10-${x}12`,14:`SUM($B13:${x}13)`,15:`MAX(0,${inp}$B$43-${x}14)`};
 for(const[r,v]of Object.entries(f))formula(y,`${x}${r}`,'='+v);
}y.getRange('B7:D10').setNumberFormat(dec);y.getRange('A13:D15').format.fill='#CCD8C2';
merge(y,'A18:D22','السنة الثانية: نمو طلبات 25%، والثالثة 20% مع تقريب العبوات لأقرب عدد صحيح. تضخم المنتج 3% سنويًا والثابت 10%. باقي السعر والخصم والتسويق ثابتة. هذه امتداد ربحية، وليست قائمة تدفق نقد أو تقييمًا استثماريًا؛ لا يفترض استرداد التمويل عند السنة الثالثة.');y.getRange('A18:D22').format.wrapText=true;
const su=sheets['ملخص'];band(su,5,'قرار أولي: اختبار محدود قبل التوسع');
const summary=[['طلبات السنة',`SUM(${month}B6:M6)`],['إيرادات صافية — ر.س',`SUM(${month}B9:M9)`],['فائض تشغيل السنة — ر.س',`SUM(${month}B19:M19)`],['تمويل البداية الأساسي — ر.س',`${inp}B43`],['التمويل مع هامش الضريبة — ر.س',`${inp}B45`],['التعادل — طلبات شهريًا',`${inp}B42`],['نقد نهاية السنة — ر.س',`${month}M30`],['أقل رصيد نهاية شهر — ر.س',`MIN(${inp}B44,${month}B30:M30)`],['مخزون نهاية السنة — عبوة',`${month}M24`],['هامش المساهمة',`${inp}B41`],['زيارات سنوية عند التحويل المستهدف',`ROUNDUP(B7/${inp}B27,0)`]];
summary.forEach(([l,f],i)=>{set(su,`A${i+7}`,l);formula(su,`B${i+7}`,'='+f);});su.getRange('B16').setNumberFormat('0.0%');su.getRange('A7:B17').format.rowHeight=34;su.getRange('B7:B17').format.fill='#CCD8C2';
merge(su,'A20:D24','طريقة الاستخدام: ابدأ بالتكاليف ثم الافتراضات. عدل الخلايا الزرقاء فقط، وراجع جدول الطلبات والاستلام معًا. راجع فحوص المخزون والسيولة في الورقة الأخيرة. السيناريو الأساسي تقدير مشروط، وليس مبيعات فعلية أو عرض سعر أو ضمان عائد.');su.getRange('A20:D24').format.wrapText=true;
merge(su,'A26:D29','النطاق: متجر سعودي، عطر واحد 50 مل، عبوة واحدة لكل طلب، تصنيع تعاقدي. السعر 249 ريال شامل الضريبة قبل الخصم. لا تشمل الدراسة متجرًا فعليًا أو مصنعًا مملوكًا أو قالب زجاج حصريًا. الصور توليد تصوري بالذكاء الاصطناعي.');su.getRange('A26:D29').format.wrapText=true;
merge(su,'A31:D34','الفائض قبل الإهلاك والتمويل والزكاة/ضريبة الدخل، وبعد أجر المؤسس والتسويق المفترض. السنة الأولى تتحمل تكاليف تأسيس منفصلة. الحاسبة المنشورة تفترض تجديد المخزون شهريًا؛ ورقة «شهري» تتبع دفعات المورد، لذلك يختلف رصيد النقد مع تطابق الربحية.');su.getRange('A31:D34').format.wrapText=true;
const so=sheets['المصادر والفحص'];so.getRange('C1:C60').format.columnWidthPx=570;so.getRange('D1:D60').format.columnWidthPx=330;
so.getRange('A5:D5').values=[['المرجع','التاريخ','الرابط الأصلي','استخدامه']];
const srcArr=Array.isArray(sources)?sources:Object.values(sources);
srcArr.forEach((src,i)=>{const r=i+6;const vals=Array.isArray(src)?src.slice(1):[src.title,src.url,src.note];set(so,`A${r}`,String(vals[0]??src.title??''));set(so,`B${r}`,'2026-09-07');set(so,`C${r}`,String(vals[1]??src.url??''));set(so,`D${r}`,String(vals[2]??src.note??''));});
so.getRange('A6:D15').format={wrapText:true,rowHeight:65};
band(so,18,'فحوص التوازن والمنطق — راجع أي نتيجة خلاف OK');
const checks=[
 ['رصيد النقد يتطابق مع حركته',`IF(MAX(ABS(MIN(${month}B31:M31)),ABS(MAX(${month}B31:M31)))<${inp}B33,"OK","راجع النقد")`],
 ['المخزون يتطابق مع حركته',`IF(MAX(ABS(MIN(${month}B32:M32)),ABS(MAX(${month}B32:M32)))<${inp}B33,"OK","راجع المخزون")`],
 ['لا مخزون سالب في نهاية شهر',`IF(MIN(${month}B24:M24)>=0,"OK","أعد جدولة التوريد")`],
 ['لا نقد سالب في نهاية شهر',`IF(MIN(${month}B30:M30)>=0,"OK","تمويل إضافي مطلوب")`],
 ['لا هبوط تحت مخزون الأمان',`IF(MIN(${month}B33:M33)>=0,"OK","راجع مخزون الأمان")`],
 ['الأساسي يتطابق مع السيناريو',`IF(ABS(SUM(${month}B19:M19)-'السيناريوهات'!C27)<${inp}B33,"OK","راجع الربحية")`],
 ['جسر الربح والنقد والمخزون',`IF(ABS(${month}M30-${inp}B44-SUM(${month}B19:M19)-(${inp}B19-${month}M24)*${inp}B10)<${inp}B33,"OK","راجع مقدم المورد")`],
 ['أفق النموذج ثابت 12 شهرًا',`IF(${inp}B32=12,"OK","الأفق غير مدعوم")`],
 ['استلام مبكر يحتاج مقدم افتتاحي',`IF(SUMPRODUCT(${inp}B52:M52,--(${month}B5:M5<=${inp}B24))*${inp}B25=0,"OK","أضف مقدم ما قبل السنة")`]
];
checks.forEach(([l,f],i)=>{set(so,`A${i+20}`,l);formula(so,`B${i+20}`,'='+f);});so.getRange('A20:B28').format.rowHeight=36;
merge(so,'A31:D34','التحقق الحسابي لا يثبت واقعية الافتراضات. يجب استبدال تكاليف المورد والتشغيل بعروض موثقة، وقياس التحويل والخصم والتسويق والمرتجعات في اختبار مدفوع. لا يتضمن الملف حجم سوق منشورًا أو إيرادًا محققًا.');so.getRange('A31:D34').format.wrapText=true;
console.log((await wb.inspect({kind:'region',sheetId:'ملخص',range:'A7:B17',maxChars:5000,tableMaxRows:12,tableMaxCols:2})).ndjson);
console.log((await wb.inspect({kind:'region',sheetId:'المصادر والفحص',range:'A20:B28',maxChars:3500,tableMaxRows:10,tableMaxCols:2})).ndjson);
const errors=await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!',options:{useRegex:true,maxResults:20},maxChars:3000});console.log(errors.ndjson);
const expected=[data.totalUnits,data.revenue,data.profit,data.funding,data.funding+10000,data.unitEconomics.breakEven,data.endingCash,data.minimumCash,data.endingStock];
const actual=su.getRange('B7:B15').values.map(r=>r[0]);actual.forEach((v,i)=>{if(typeof v!=='number'||Math.abs(v-expected[i])>.005)throw Error(`Summary ${i}: ${v} != ${expected[i]}`);});
for(let i=0;i<3;i++){const v=sc.getRange(`${col(i)}27`).values[0][0];if(Math.abs(v-data.scenarios[i].profit)>.005)throw Error('Scenario mismatch '+i);const p=y.getRange(`${col(i)}13`).values[0][0];if(Math.abs(p-data.years[i].profit)>.005)throw Error('Year mismatch '+i);}
if(so.getRange('B20:B28').values.some(r=>r[0]!=='OK'))throw Error('Failed financial checks');
const xlsx=await SpreadsheetFile.exportXlsx(wb);await xlsx.save(out+'/AEVU-Financial-Model.xlsx');
for(const [name,range] of [['ملخص','A1:D34'],['الافتراضات','A1:D45'],['التكاليف','A1:D40'],['شهري','A1:M38'],['السيناريوهات','A1:D42'],['ثلاث سنوات','A1:D22'],['المصادر والفحص','A1:D34']]){
 const preview=await wb.render({sheetName:name,range,scale:1,format:'png'});await fs.writeFile(`${qa}/${names.indexOf(name)}.png`,new Uint8Array(await preview.arrayBuffer()));
}
await fs.writeFile(qa+'/financial-check.json',JSON.stringify({actual,expected,checks:so.getRange('B20:B28').values},null,2));
console.log('AEVU workbook exported and all finance checks passed.');
