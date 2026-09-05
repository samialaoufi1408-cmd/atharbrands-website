from pathlib import Path
from html import escape
import fitz,json,re,io,sys,os,tempfile
from fontTools.ttLib import TTFont
from PIL import Image
# Development dependencies: PyMuPDF, Pillow, fontTools.
# Run from any directory; optionally set ATHR_GUIDE_OUTPUT_DIR for a review copy.
ROOT=Path(__file__).resolve().parents[1];REPO=ROOT
OUT=Path(os.environ.get('ATHR_GUIDE_OUTPUT_DIR',str(ROOT/'public/downloads')));OUT.mkdir(parents=True,exist_ok=True)
WORK=Path(tempfile.mkdtemp(prefix='athr-project-guides-'));REVIEW=WORK/'review';REVIEW.mkdir()
FONT=WORK/'fonts';FONT.mkdir()
for source in (ROOT/'public/fonts/nabra').glob('NotoSans*.woff'):
 font=TTFont(source,recalcTimestamp=False);font.flavor=None;font.save(FONT/(source.stem+'.ttf'))
required={'NotoSansArabic-Regular.ttf','NotoSansArabic-Bold.ttf','NotoSans-Regular.ttf','NotoSans-Bold.ttf'}
if not required.issubset({p.name for p in FONT.iterdir()}):
 raise RuntimeError('Restore the four public/fonts/nabra font files before building guides.')
ARCHIVE=fitz.Archive(str(FONT))
CSSFONT='''@font-face{font-family:Study;src:url(NotoSansArabic-Regular.ttf);font-weight:400;}@font-face{font-family:Study;src:url(NotoSansArabic-Bold.ttf);font-weight:700;}@font-face{font-family:Latin;src:url(NotoSans-Regular.ttf);font-weight:400;}@font-face{font-family:Latin;src:url(NotoSans-Bold.ttf);font-weight:700;}'''
W,H=960,540;LOG=[];OVERFLOW=[];DOC=None;STUDY=None;IMAGES={}
def rgb(h):return tuple(int(h[i:i+2],16)/255 for i in (1,3,5))
def p(t):return '<p dir="rtl">'+escape(t)+'</p>'
def rich(t):
 t=t.replace('<bdi dir="ltr">','<span class="latin" dir="ltr">').replace('</bdi>','</span>')
 return re.sub(r'<(p|h4)(?=>)',r'<\1 dir="rtl"',t)
def box(page,html,rect,size=18,color=None,line=1.48,name='body',record=True):
 color=color or STUDY['theme']['ink'];html=rich(html)
 css=CSSFONT+f'''*{{box-sizing:border-box;}}p,h4,td,th,li{{font-family:Study;direction:rtl;text-align:left;color:{color};}}p{{font-size:{size}px;line-height:{line};margin:0 0 10px 0;}}h4{{font-size:{size+3}px;font-weight:700;line-height:1.35;margin:0 0 8px 0;}}.latin{{font-family:Latin;direction:ltr;}}b,strong{{font-weight:700;}}a{{color:{color};text-decoration:underline;}}table{{width:100%;border-collapse:collapse;margin:0;}}td,th{{font-size:{size}px;line-height:1.32;vertical-align:top;padding:8px 12px;border-bottom:1px solid {STUDY['theme']['soft']};}}td p,th p{{font-size:{size}px;line-height:1.32;margin:0;}}th{{background:{STUDY['theme']['brand']};color:{STUDY['theme']['paper']};font-weight:700;}}'''
 spare,scale=page.insert_htmlbox(fitz.Rect(rect),html,css=css,archive=ARCHIVE,scale_low=1)
 if record:LOG.append(dict(slug=STUDY['slug'],page=len(DOC),box=name,spare=round(spare,2),scale=scale,font=size))
 if spare<0:OVERFLOW.append(dict(slug=STUDY['slug'],page=len(DOC),box=name,rect=list(rect),html=html[:140]))
 return spare

def measure(html,width,size=16,line=1.48):
 d=fitz.open();pg=d.new_page(width=width,height=1200);spare=box(pg,html,(0,0,width,1200),size=size,line=line,name='measure',record=False);d.close();return 1200-spare

def image(page,src,rect):
 path=REPO/'public'/src.lstrip('/')
 if str(path) not in IMAGES:
  im=Image.open(path).convert('RGB');buf=io.BytesIO();im.save(buf,format='JPEG',quality=94,subsampling=0);IMAGES[str(path)]=buf.getvalue()
 page.insert_image(fitz.Rect(rect),stream=IMAGES[str(path)],keep_proportion=True)

def new_page(title,kicker,dark=False):
 page=DOC.new_page(width=W,height=H);t=STUDY['theme'];bg=t['brand'] if dark else t['paper'];fg=t['paper'] if dark else t['ink']
 page.draw_rect(page.rect,color=None,fill=rgb(bg));page.draw_rect(fitz.Rect(0,0,W,8),color=None,fill=rgb(t['accent']))
 box(page,p(kicker),(48,20,912,54),14,fg,name='kicker')
 box(page,'<p dir="rtl"><b>'+escape(title)+'</b></p>',(48,65,912,130),31,fg,line=1.2,name='title')
 page.draw_line((48,498),(912,498),color=rgb(fg),width=.4,stroke_opacity=.22)
 footer=STUDY['name']+' • الاستراتيجية والهوية • '+('مشروع تصوري من أثر' if STUDY['concept'] else 'هوية استوديو أثر')
 box(page,p(footer),(105,505,912,539),11,fg,name='footer')
 box(page,'<p dir="ltr" class="latin">'+f'{len(DOC):02d}'+'</p>',(48,505,100,539),11,fg,name='number')
 return page,fg

def draw_table(page,b,top,bottom):
 import math
 headers=b['headers'];rows=b['rows'];n=len(headers)
 if 'النسبة المحسوبة' in headers:widths=[260,130,474]
 else:
  lengths=[max(len(re.sub('<[^>]+>','',str(row[j]))) for row in [headers]+rows) for j in range(n)]
  weights=[math.sqrt(max(10,x)) for x in lengths];minimum=175 if n==3 else 130
  widths=[minimum+(864-minimum*n)*w/sum(weights) for w in weights]
 def cell(value,header=False):return '<p dir="rtl" style="margin:0">'+('<b>'+value+'</b>' if header else value)+'</p>'
 data=[headers]+rows;heights=[]
 for i,row in enumerate(data):
  heights.append(max(measure(cell(v,i==0),widths[j]-24,16,1.32) for j,v in enumerate(row))+18)
 if sum(heights)>bottom-top:
  OVERFLOW.append(dict(slug=STUDY['slug'],page=len(DOC),box='table total',needed=sum(heights),available=bottom-top));return
 y=top
 for i,(row,height) in enumerate(zip(data,heights)):
  bg=STUDY['theme']['brand'] if i==0 else STUDY['theme']['paper'] if i%2 else STUDY['theme']['soft']
  fg=STUDY['theme']['paper'] if i==0 else STUDY['theme']['ink']
  page.draw_rect(fitz.Rect(48,y,912,y+height),color=None,fill=rgb(bg))
  right=912
  for j,value in enumerate(row):
   left=right-widths[j]
   box(page,cell(value,i==0),(left+12,y+8,right-12,y+height-8),16,fg,line=1.32,name=f'table row {i} cell {j}')
   right=left
  page.draw_line((48,y+height),(912,y+height),color=rgb(STUDY['theme']['ink']),width=.35,stroke_opacity=.16)
  y+=height

def render_palette(page,b,notes):
 colors=b['colors'];cols=4 if len(colors)>6 else 3 if len(colors)>4 else 2;gap=20;width=(864-gap*(cols-1))/cols
 noteh=measure(''.join(x['html'] for x in notes),864,14.5)+4 if notes else 0
 bottom=486-noteh;rowh=(bottom-148-18)/2
 for i,c in enumerate(colors):
  col=i%cols;row=i//cols;x=912-width-col*(width+gap);y=148+row*(rowh+18)
  page.draw_rect(fitz.Rect(x,y,x+width,y+34),color=rgb(STUDY['theme']['ink']),width=.4,stroke_opacity=.18,fill=rgb(c['hex']))
  fs=16 if cols<4 else 14.5
  box(page,p(c['name']),(x,y+41,x+width,y+66),fs,name='color name')
  data='<p class="latin" dir="ltr">'+c['hex']+'<br>RGB '+c['rgb']+'</p>'
  box(page,data,(x,y+69,x+width,y+105),11.5,line=1.25,name='color code')
  box(page,p(c['role']),(x,y+108,x+width,y+rowh+2),13.5,line=1.3,name='color role')
 if notes:box(page,''.join(x['html'] for x in notes),(48,bottom+6,912,491),14.5,line=1.4,name='palette note')

def render_section(section):
 page,fg=new_page(section['title'],section['kicker'],section['theme']=='dark');blocks=section['blocks'];kind=blocks[0]['type']
 if kind=='columns':
  for i,html in enumerate(blocks[0]['items']):
   x=498 if i==0 else 48;box(page,html,(x,148,x+414,490),18,fg,name=f'column {i+1}')
 elif kind=='text':box(page,''.join(b['html'] for b in blocks),(48,148,912,490),20,fg,name='full text')
 elif kind=='table':
  notes=[b for b in blocks[1:] if b['type'] in ('note','text')];html=''.join(b['html'] for b in notes);nh=measure(html,864,14.5)+8 if notes else 0
  bottom=486-nh;draw_table(page,blocks[0],148,bottom)
  if notes:box(page,html,(48,bottom+8,912,492),14.5,fg,line=1.4,name='table note')
 elif kind=='image':
  image(page,blocks[0]['src'],(48,150,570,443))
  box(page,p(blocks[0]['alt']),(48,451,570,491),12.5,fg,line=1.35,name='image caption')
  box(page,''.join(b['html'] for b in blocks[1:]),(608,148,912,490),18,fg,name='image explanation')
 elif kind=='palette':render_palette(page,blocks[0],[b for b in blocks[1:] if b['type']=='note'])
 elif kind=='cards':
  for i,item in enumerate(blocks[0]['items']):
   x=644-i*298;bg=STUDY['theme']['brand'] if i==1 else STUDY['theme']['soft'];color=STUDY['theme']['paper'] if i==1 else STUDY['theme']['ink']
   page.draw_rect(fitz.Rect(x,148,x+268,417),color=None,fill=rgb(bg))
   box(page,p(item['label']),(x+18,164,x+250,198),13,color,name='card label')
   box(page,'<h4>'+escape(item['title'])+'</h4>',(x+18,209,x+250,305),21,color,name='card title')
   box(page,p(item['body']),(x+18,312,x+250,410),16.5,color,name='card body')
  box(page,''.join(b['html'] for b in blocks[1:]),(48,434,912,491),14.5,fg,line=1.4,name='cards note')
 else:raise ValueError(kind)

def cover(closing=False):
 t=STUDY['theme'];page=DOC.new_page(width=W,height=H);page.draw_rect(page.rect,color=None,fill=rgb(t['brand']))
 image(page,f"/assets/studies/{STUDY['slug']}/{STUDY['hero']}.webp",(48,130,580,436))
 box(page,p(STUDY['sector']),(617,47,912,105),15,t['paper'],name='cover sector')
 box(page,'<p dir="rtl"><b>'+escape(STUDY['name'])+'</b></p>',(615,113,912,189),43,t['paper'],line=1.2,name='cover name')
 box(page,'<p class="latin" dir="ltr">'+escape(STUDY['latinName'])+'</p>',(617,194,912,238),20,t['paper'],name='cover latin')
 title=STUDY['tagline'] if closing else 'الاستراتيجية\nوالهوية البصرية'
 box(page,'<p dir="rtl"><b>'+escape(title).replace('\n','<br>')+'</b></p>',(617,258,912,372),27,t['paper'],line=1.45,name='cover title')
 sub='من الفكرة إلى الاستخدام.\nمرجع واضح لكل خطوة.' if closing else 'دراسة كاملة ودليل تطبيق\n٩ فصول • ٤١ صفحة'
 box(page,p(sub).replace('\n','<br>'),(617,390,912,463),18,t['paper'],name='cover sub')
 label='إعداد أثر • سبتمبر ٢٠٢٦ • '+('مشروع تصوري' if STUDY['concept'] else 'هوية الاستوديو')
 box(page,p(label),(48,486,912,533),13,t['paper'],name='cover credit')

def build(path):
 global DOC,STUDY,LOG,OVERFLOW,IMAGES
 STUDY=json.loads(path.read_text());assert [x['page'] for x in STUDY['sections']]==list(range(2,41));DOC=fitz.open();IMAGES={};start=len(OVERFLOW);cover()
 for section in STUDY['sections']:render_section(section)
 cover(True)
 if len(OVERFLOW)>start:
  print(json.dumps(OVERFLOW[start:],ensure_ascii=False,indent=2));DOC.close();return False
 toc=[[1,'الغلاف',1]]
 for ch in STUDY['chapters']:
  toc.append([1,ch['title'],ch['start']])
  for se in STUDY['sections']:
   if ch['start']<=se['page']<=ch['end']:toc.append([2,se['title'],se['page']])
 toc.append([1,'الخاتمة',41]);DOC.set_toc(toc);DOC.set_metadata({'title':STUDY['name']+' — الاستراتيجية والهوية البصرية','author':'ATHR BRANDS','subject':'Complete brand strategy and visual identity study','keywords':STUDY['latinName']+', Arabic, brand strategy, visual identity','creator':'ATHR BRANDS editorial guide'})
 DOC.subset_fonts();file=OUT/STUDY['file'];DOC.save(file,garbage=4,deflate=True,deflate_images=True,deflate_fonts=True);DOC.close()
 print(STUDY['slug'],41,'pages',file.stat().st_size,'bytes',flush=True)
 return True

paths=sorted((REPO/'content/studies').glob('*.json'))
if len(sys.argv)>1:paths=[p for p in paths if p.stem in sys.argv[1:]]
results=[build(p) for p in paths]
(REVIEW/'layout-log.json').write_text(json.dumps({'boxes':LOG,'overflow':OVERFLOW},ensure_ascii=False,indent=2))
print('Layout report:',REVIEW/'layout-log.json',flush=True)
if not all(results):sys.exit(1)
