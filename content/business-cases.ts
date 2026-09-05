import type { Locale } from './site';

export type BusinessCaseKey = 'nawsaq' | 'darwaq';

export type BusinessCaseCopy = {
  name: string;
  sector: string;
  tagline: string;
  intro: string;
  summary: string;
  scope: string[];
  challenge: { title: string; body: string; audience: string; objective: string };
  idea: { title: string; body: string; principles: { title: string; body: string }[] };
  application: { title: string; body: string };
  environment: { title: string; body: string };
  digital: { title: string; body: string; caption: string };
  images: { hero: string; application: string; environment: string };
  paletteNames: string[];
  deliverables: string[];
};

type BusinessCase = {
  latinName: string;
  theme: 'architecture' | 'logistics';
  colors: string[];
  assets: { hero: string; application: string; environment: string };
  copy: Record<Locale, BusinessCaseCopy>;
};

export const BUSINESS_CASES: Record<BusinessCaseKey, BusinessCase> = {
  nawsaq: {
    latinName: 'NAWSAQ', theme: 'architecture',
    colors: ['#172F3D', '#BBC6DD', '#F1F0E8', '#B7684F'],
    assets: { hero: 'hero.png', application: 'presentation.png', environment: 'wayfinding.png' },
    copy: {
      ar: {
        name: 'نَوْسَق', sector: 'تطوير عقاري سكني', tagline: 'مكانٌ يتّسع لحياتك.',
        intro: 'هوية ترى المشروع من زاوية من سيسكنه؛ وتربط تفاصيل المكان بوضوح العرض.',
        summary: 'نظام هوية لشركة تطوير عقاري سكني، يمتد من ملف المشروع والمطبوعات إلى لوحات الموقع وتجربة استكشاف المساحات.',
        scope: ['الاستراتيجية والتسمية', 'الهوية البصرية', 'ملف المشروع', 'اللوحات والتجربة الرقمية'],
        challenge: {
          title: 'من صورة مبنى إلى فكرة عن الحياة فيه.',
          body: 'تصور لشركة تطوير عقاري تخاطب الباحثين عن مسكن يلائم يومهم. المهمة هي بناء لغة تساعد على فهم الفكرة والمساحات والتفاصيل، وتمنح كل مشروع صلة واضحة بالشركة المطوّرة.',
          audience: 'الأسر والباحثون عن مسكن يناسب أسلوب حياتهم.',
          objective: 'هوية موثوقة وعرض منظّم يساعد على المقارنة وفهم المشروع.',
        },
        idea: {
          title: 'الفراغ هو بداية الحكاية.',
          body: 'إطاران هندسيان مفتوحان يتركان مساحة في المركز. منهما تنطلق طريقة توزيع الصور والعناوين والمخططات، ليصبح الفراغ أداة لتنظيم المعلومات واستحضار الضوء والخصوصية.',
          principles: [
            { title: 'إطار واضح', body: 'وحدة هندسية تربط الشعار بتقسيمات ملف المشروع واللوحات.' },
            { title: 'مساحة مقصودة', body: 'هوامش رحبة تمنح الصور والمعلومات أولوية في القراءة.' },
            { title: 'حضور هادئ', body: 'أزرق عميق وحجر فاتح وتفصيل طيني يقرّب الهوية من المكان.' },
          ],
        },
        application: { title: 'ملف يجعل المشروع مفهومًا.', body: 'غلاف واضح، ترتيب ثابت للمعلومات، وصور تحمل الفكرة المعمارية. ينتقل الإطار من الاسم إلى الصفحات والبطاقات، مع تمييز المشروع ورقمه دون ازدحام بصري.' },
        environment: { title: 'هوية تقودك داخل المكان.', body: 'تُترجم النسب نفسها إلى لوحة المدخل وأرقام المباني وإشارات الاتجاه. اختلاف الحجم والخامة يحافظ على وظيفة كل لوحة، بينما يجمعها حضور بصري واحد.' },
        digital: { title: 'استكشاف المساحة قبل تفاصيلها.', body: 'تصور لواجهة تعرض فكرة الوحدة عبر ثلاثة محاور: اللقاء، والخصوصية، والضوء. يربط الترقيم بين الرسم والمعلومة، ويُبقي الانتقال إلى عرض المشروع واضحًا.', caption: 'تصور لواجهة عرض مشروع سكني ضمن دراسة الهوية.' },
        images: {
          hero: 'مدخل مبنى سكني تصوري بواجهة حجرية ولوحة زرقاء عميقة تحمل اسم نوسق بالإنجليزية',
          application: 'تطبيقات نوسق المطبوعة: ملف مشروع وبطاقات وهوية بلون أزرق عميق وحجر فاتح',
          environment: 'لوحات نوسق المعمارية وأرقام توجيه داخل مساحة سكنية تصورية',
        },
        paletteNames: ['أزرق عميق', 'أزرق ضبابي', 'حجر فاتح', 'طين'],
        deliverables: ['التموضع والتسمية والرسالة', 'الاسم البصري والعنصر الهندسي', 'الألوان وتسلسل المعلومات', 'ملف المشروع والبطاقات', 'لوحات الموقع والتوجيه', 'تصور واجهة استكشاف المساحات'],
      },
      en: {
        name: 'NAWSAQ', sector: 'Residential real estate development', tagline: 'Room for your life.',
        intro: 'An identity built around the people who will live there, connecting a sense of place with a clear presentation.',
        summary: 'A residential developer identity spanning project presentations, stationery, architectural signage and a digital space-exploration concept.',
        scope: ['Strategy & naming', 'Visual identity', 'Project presentation', 'Signage & digital'],
        challenge: {
          title: 'From a building image to a picture of life inside.',
          body: 'A concept for a residential developer speaking to people who want a home that fits their everyday life. The task is to make the idea, spaces and details understandable, while connecting each development to its parent brand.',
          audience: 'Households and home seekers choosing for their way of life.',
          objective: 'A credible identity and an organized presentation that supports understanding and comparison.',
        },
        idea: {
          title: 'The story begins with space.',
          body: 'Two open geometric frames leave room at the center. They guide the placement of imagery, titles and plans, using space to organize information and suggest light and privacy.',
          principles: [
            { title: 'A clear frame', body: 'One geometric unit connects the mark to presentation grids and signs.' },
            { title: 'Space with purpose', body: 'Generous margins give images and information a clear reading order.' },
            { title: 'A quiet presence', body: 'Deep blue, pale stone and a clay accent connect the identity to its setting.' },
          ],
        },
        application: { title: 'A presentation that makes the project clear.', body: 'A clear cover, consistent information hierarchy and imagery carrying the architectural idea. The frame moves from wordmark to pages and cards, keeping the project and its number recognizable.' },
        environment: { title: 'An identity that guides you through the place.', body: 'The same proportions become entrance signs, building numbers and directional markers. Scale and material serve each sign’s purpose while maintaining one visual language.' },
        digital: { title: 'Explore the space before the specifications.', body: 'A digital concept presents a home through three themes: gathering, privacy and light. Numbering connects the diagram to the information and keeps the path to the project presentation clear.', caption: 'Residential project interface concept, presented within the identity study.' },
        images: {
          hero: 'Conceptual residential entrance with pale stone and a deep-blue NAWSAQ sign',
          application: 'NAWSAQ project presentation and stationery in deep blue and pale stone colors',
          environment: 'NAWSAQ architectural signage and numbered wayfinding in a conceptual residential setting',
        },
        paletteNames: ['Deep blue', 'Mist blue', 'Pale stone', 'Clay'],
        deliverables: ['Positioning, naming and message', 'Wordmarks and geometric motif', 'Color and information hierarchy', 'Project presentation and stationery', 'Architectural signage and wayfinding', 'Digital space-exploration concept'],
      },
    },
  },
  darwaq: {
    latinName: 'DARWAQ', theme: 'logistics',
    colors: ['#273FEE', '#FF743D', '#F1F4F7', '#15212D'],
    assets: { hero: 'hero.png', application: 'parcels.png', environment: 'uniform.png' },
    copy: {
      ar: {
        name: 'دَرْوَق', sector: 'شحن وتوصيل للمتاجر', tagline: 'كل خطوة واضحة.',
        intro: 'من المتجر إلى الباب؛ هوية تجعل الحركة مفهومة وتمنح التفاصيل صوتًا واحدًا.',
        summary: 'هوية لخدمة شحن وتوصيل تربط المركبات والطرود والزيّ بواجهة تتبّع واضحة، بلغة بصرية مناسبة للمتاجر وعملائها.',
        scope: ['الاستراتيجية والتسمية', 'الهوية البصرية', 'المركبات والطرود', 'التتبّع والتواصل'],
        challenge: {
          title: 'الشحنة تتحرك. والمعلومة تتحرك معها.',
          body: 'تصور لخدمة توصيل تدعم المتاجر في آخر مرحلة من رحلة الطلب. المهمة هي جعل الخدمة سهلة التعرّف، وتوضيح موقع الشحنة في الرحلة بلغة يفهمها التاجر والمستلم.',
          audience: 'المتاجر الصغيرة والمتنامية وعملاؤها.',
          objective: 'حضور مميز واتصال واضح عبر نقاط الاستلام والنقل والتسليم.',
        },
        idea: {
          title: 'اتجاه واحد. خطوات مترابطة.',
          body: 'علامتان اتجاهيتان تصنعان إيقاع الحركة. تظهران بحجم كبير على المركبة، وباختصار على الطرد، وتتحولان إلى ترتيب واضح للحالات في واجهة التتبّع.',
          principles: [
            { title: 'تميّز من بعيد', body: 'كتلة زرقاء وكلمة واضحة وتفصيل برتقالي يسهل تمييزها في الشارع.' },
            { title: 'وضوح من قريب', body: 'مساحة ثابتة لاسم الخدمة ومعلومات الشحنة، دون خلط بينهما.' },
            { title: 'لغة مباشرة', body: 'تسمية الحالات بأفعال مفهومة، وإبراز الخطوة الحالية والتالية.' },
          ],
        },
        application: { title: 'كل طرد يحمل الهوية.', body: 'كراتين وأشرطة وأظرف تستخدم العناصر نفسها بنسب مختلفة. تترك الهوية مجالًا مستقلًا لبيانات الشحنة، وتبقى واضحة حتى في التطبيقات الصغيرة.' },
        environment: { title: 'حضور واحد أثناء العمل.', body: 'يمتد النظام إلى زيّ الفريق ومعداته. توزيع اللون والعلامة يراعي القراءة على القماش، ويصل بين ما يراه العميل على المركبة وما يستلمه عند الباب.' },
        digital: { title: 'معلومة تصل قبل السؤال.', body: 'تصور لواجهة تتبّع تبني تسلسلًا مفهومًا: الاستلام، ثم النقل، ثم التسليم. تُبرز الحالة الحالية وتعرض التالية بهدوء، دون إغراق المستخدم بالتفاصيل التشغيلية.', caption: 'تصور توضيحي لواجهة تتبّع، ببيانات عرض ضمن دراسة الهوية.' },
        images: {
          hero: 'مركبة توصيل تصورية بهوية دروق، بكتلة زرقاء واسم أبيض وعلامتين اتجاهيتين برتقاليتين',
          application: 'طرود وكراتين وأشرطة تغليف تحمل هوية دروق الزرقاء والبرتقالية',
          environment: 'زيّ ومعدات خدمة دروق بألوان زرقاء وبرتقالية وتطبيقات واضحة للاسم',
        },
        paletteNames: ['أزرق حيوي', 'برتقالي', 'رمادي فاتح', 'فحمي'],
        deliverables: ['التموضع والتسمية ونبرة التواصل', 'الاسم البصري والعلامة الاتجاهية', 'الألوان وقواعد التباين', 'هوية المركبات والطرود', 'تطبيقات الزيّ والمعدات', 'تصور واجهة تتبّع الشحنة'],
      },
      en: {
        name: 'DARWAQ', sector: 'Shipping and delivery for merchants', tagline: 'Every step, clear.',
        intro: 'From store to doorstep: an identity that makes movement understandable and gives the details one voice.',
        summary: 'A delivery identity connecting vehicles, parcels and workwear with a clear tracking-interface concept for merchants and their customers.',
        scope: ['Strategy & naming', 'Visual identity', 'Vehicles & parcels', 'Tracking & communication'],
        challenge: {
          title: 'The parcel moves. The information moves with it.',
          body: 'A delivery-service concept supporting merchants through the last stage of an order’s journey. The task is to make the service recognizable and its shipment stages understandable to both sender and recipient.',
          audience: 'Small and growing merchants and their customers.',
          objective: 'A distinctive presence and clear communication across collection, transit and delivery.',
        },
        idea: {
          title: 'One direction. Connected steps.',
          body: 'Two directional shapes create a rhythm of movement. They appear at scale on the vehicle, in a compact form on the parcel and as an ordered sequence of states in the tracking interface.',
          principles: [
            { title: 'Recognizable at a distance', body: 'A blue field, a clear wordmark and an orange accent are easy to distinguish on the street.' },
            { title: 'Clear at close range', body: 'Dedicated space separates service identity from shipment information.' },
            { title: 'Direct language', body: 'Understandable action words make the current and next steps explicit.' },
          ],
        },
        application: { title: 'Every parcel carries the identity.', body: 'Cartons, tape and mailers use the same elements at different scales. The system gives shipment information its own space and stays recognizable on small applications.' },
        environment: { title: 'One presence, on the job.', body: 'The system extends to team workwear and equipment. Color and mark placement account for legibility on fabric and connect the branded vehicle to the doorstep encounter.' },
        digital: { title: 'Information before the question.', body: 'A tracking-interface concept sets out a clear sequence: collection, transit and delivery. It highlights the current step and presents what comes next without overwhelming the customer with operational detail.', caption: 'Illustrative tracking-interface concept using demonstration data within the identity study.' },
        images: {
          hero: 'Conceptual DARWAQ delivery van with cobalt-blue livery, a white wordmark and orange chevrons',
          application: 'DARWAQ parcels, cartons and packaging tape in cobalt blue and orange',
          environment: 'DARWAQ delivery workwear and equipment with blue and orange identity applications',
        },
        paletteNames: ['Cobalt', 'Orange', 'Light gray', 'Graphite'],
        deliverables: ['Positioning, naming and tone of voice', 'Wordmarks and directional motif', 'Color and contrast rules', 'Vehicle livery and parcels', 'Workwear and equipment', 'Shipment-tracking interface concept'],
      },
    },
  },
};
