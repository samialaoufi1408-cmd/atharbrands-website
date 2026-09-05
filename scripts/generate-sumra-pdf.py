from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFile
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public/downloads/sumra-case-study-ar.pdf"
ASSETS = ROOT / "public/assets/sumra"
W, H = 1654, 2339
CREAM, LIGHT, MEDIUM = "#F4EADB", "#C98D5C", "#8C5A33"
DARK, ESPRESSO, SAFFRON = "#4B2E1E", "#241611", "#D9A441"
WHITE = "#FFFFFF"
ImageFile.LOAD_TRUNCATED_IMAGES = True
NASKH = "/usr/local/share/fonts/milh-identity/NotoNaskhArabic-Regular.ttf"
SANS = "/usr/local/share/fonts/milh-identity/NotoSans-Regular.ttf"

def f(size, latin=False): return ImageFont.truetype(SANS if latin else NASKH, size)
def rtl(d, xy, text, size, fill=ESPRESSO, anchor="ra", spacing=8):
    d.multiline_text(xy, text, font=f(size), fill=fill, anchor=anchor, align="right", spacing=spacing, direction="rtl", language="ar")
def lat(d, xy, text, size, fill=ESPRESSO, anchor="la"):
    d.text(xy, text, font=f(size, True), fill=fill, anchor=anchor)
def wrap(d, text, size, width):
    lines, line, ft = [], "", f(size)
    for word in text.split():
        candidate = word if not line else line + " " + word
        if d.textbbox((0, 0), candidate, font=ft, direction="rtl", language="ar")[2] <= width: line = candidate
        else: lines.append(line); line = word
    if line: lines.append(line)
    return "\n".join(lines)
def new(bg):
    im = Image.new("RGB", (W, H), bg); return im, ImageDraw.Draw(im)
def footer(d, n, dark=False):
    color = CREAM if dark else ESPRESSO
    d.line((110, H-118, W-110, H-118), fill=color, width=1)
    lat(d, (110, H-72), "ATHR BRANDS · SUMRA", 24, color, "ls")
    lat(d, (W-110, H-72), f"{n:02d}", 24, SAFFRON, "rs")
def mark(d, cx, base, scale=1):
    for width, height, stroke, color in [(420,220,38,LIGHT),(280,145,32,MEDIUM),(138,72,24,DARK)]:
        width, height, stroke = int(width*scale), int(height*scale), int(stroke*scale)
        d.arc((cx-width//2,base-height,cx+width//2,base+height),180,360,fill=color,width=stroke)
def label(d, n, text, dark=False):
    color = CREAM if dark else ESPRESSO
    lat(d, (110,152), f"{n:02d}", 29, SAFFRON)
    rtl(d, (W-110,152), text, 32, color)
def applications(box, cups=False):
    x1,y1,x2,y2=box; cw,ch=x2-x1,y2-y1; canvas=Image.new("RGB",(cw,ch),"#EADCCA"); d=ImageDraw.Draw(canvas)
    if cups:
        for i,(x,c,ink) in enumerate(((int(cw*.22),CREAM,DARK),(int(cw*.58),DARK,CREAM))):
            d.rounded_rectangle((x,int(ch*.18),x+int(cw*.24),int(ch*.78)),36,fill=c)
            d.polygon([(x,int(ch*.69)),(x+int(cw*.24),int(ch*.69)),(x+int(cw*.21),int(ch*.86)),(x+int(cw*.03),int(ch*.86))],fill=c)
            rtl(d,(x+int(cw*.12),int(ch*.48)),"سُمرة",int(cw*.035),ink,"ma")
            lat(d,(x+int(cw*.12),int(ch*.55)),"SUMRA",int(cw*.014),ink,"ma")
    else:
        for i,(x,c,ink,tag) in enumerate(((int(cw*.12),CREAM,DARK,"LIGHT ROAST"),(int(cw*.39),MEDIUM,CREAM,"MEDIUM ROAST"),(int(cw*.66),DARK,CREAM,"DARK ROAST"))):
            d.rounded_rectangle((x,int(ch*.15),x+int(cw*.22),int(ch*.84)),18,fill=c,outline="#24161133",width=2)
            d.rectangle((x,int(ch*.15),x+int(cw*.22),int(ch*.22)),fill="#00000018")
            rtl(d,(x+int(cw*.11),int(ch*.47)),"سُمرة",int(cw*.042),ink,"ma")
            lat(d,(x+int(cw*.11),int(ch*.55)),"SUMRA",int(cw*.015),ink,"ma")
            lat(d,(x+int(cw*.11),int(ch*.72)),tag,int(cw*.011),ink,"ma")
    mask=Image.new("L",canvas.size); ImageDraw.Draw(mask).rounded_rectangle((0,0,cw-1,ch-1),26,fill=255)
    return canvas,mask

def pages():
    out=[]
    im,d=new(CREAM); lat(d,(110,115),"ATHR BRANDS",28); rtl(d,(W-110,118),"مشروع تصوري",28,MEDIUM); mark(d,W//2,850,.9)
    rtl(d,(W//2,1110),"سُمرة",180,anchor="ma"); lat(d,(W//2,1285),"SUMRA",42,anchor="ma")
    rtl(d,(W//2,1500),"كل حبة لها سُمرتها.",64,DARK,"ma"); rtl(d,(W//2,1645),"محمصة ومقهى قهوة مختصة · الرياض",34,MEDIUM,"ma")
    for i,c in enumerate((LIGHT,MEDIUM,DARK)): d.rounded_rectangle((110+i*478,1850,540+i*478,2050),210,fill=c)
    footer(d,1); out.append(im)

    im,d=new(WHITE); label(d,1,"التموضع"); rtl(d,(W-110,420),"درجة التحميص\nبطل القصة.",104)
    body="سُمرة محمصة قهوة مختصة ومقهى في الرياض، تحمّص حبوبها بدفعات صغيرة. تأخذ من التراث الدفء لا الرموز، ومن الحرفة الدقة لا البرود. كل حبة لها سُمرتها — ونحن نعرّفك عليها."
    rtl(d,(W-110,925),wrap(d,body,43,1080),43,DARK,spacing=22); d.rectangle((110,1755,W-110,1770),fill=LIGHT)
    rtl(d,(W-110,1880),"الفكرة الاستراتيجية",30,MEDIUM); rtl(d,(W-110,2020),wrap(d,"تحويل درجة التحميص من معلومة تقنية إلى قصة واضحة يراها العميل ويفهمها.",46,1200),46)
    footer(d,2); out.append(im)

    im,d=new(ESPRESSO); label(d,2,"الركائز",True); rtl(d,(W-110,410),"مصدر واضح. تحميص مدروس.\nضيافة لا خدمة.",92,CREAM)
    cards=[("01","مصدر واضح","اسم المزرعة والمنطقة والارتفاع على كل كيس. لا خلطة سرية."),("02","تحميص مدروس","ثلاث درجات فقط، لكل درجة نكهاتها وطريقة التحضير الموصى بها."),("03","ضيافة لا خدمة","الباريستا يرشح ولا يبيع، والكوب الأول يأتي مع تعريف قصير بالحبة.")]
    y=900
    for no,title,body in cards:
        d.rounded_rectangle((110,y,W-110,y+315),26,outline="#7A6A5D",width=2); lat(d,(155,y+58),no,30,SAFFRON)
        rtl(d,(W-155,y+80),title,48,CREAM); rtl(d,(W-155,y+176),wrap(d,body,32,1120),32,"#D8CCBC",spacing=12); y+=360
    footer(d,3,True); out.append(im)

    im,d=new(WHITE); label(d,3,"التوجه الإبداعي"); rtl(d,(W-110,390),"التدرّج: من الحبة الفاتحة\nإلى سُمرتها.",94)
    body="ثلاثة أقواس متدرجة على قاعدة واحدة: درجات التحميص، مدخل المقهى، والشمس التي تُسمّر. النظام يتجنب رموز التراث المباشرة، ويحتفظ بالدفء عبر اللون والخامة والإيقاع."
    rtl(d,(W-110,850),wrap(d,body,39,1090),39,DARK,spacing=18); d.rounded_rectangle((110,1370,W-110,2110),34,fill=CREAM)
    mark(d,W//2,1715,.85); rtl(d,(W//2,1900),"سُمرة",126,anchor="ma"); lat(d,(W//2,2020),"SUMRA",31,anchor="ma")
    footer(d,4); out.append(im)

    im,d=new(CREAM); label(d,4,"النظام البصري"); rtl(d,(W-110,410),"خمس درجات\nولون تمييز واحد.",98)
    colors=[(CREAM,"كريمي"),(LIGHT,"تحميص فاتح"),(MEDIUM,"متوسط"),(DARK,"غامق"),(ESPRESSO,"إسبرسو"),(SAFFRON,"زعفران")]
    for i,(c,name) in enumerate(colors):
        x=110+(i%3)*478; y=930+(i//3)*430; d.rounded_rectangle((x,y,x+430,y+285),22,fill=c,outline="#8A7E73",width=2); rtl(d,(x+410,y+350),name,30)
    rtl(d,(W-110,1885),"يُستخدم الزعفران للإشارات الصغيرة فقط.",34,MEDIUM); footer(d,5); out.append(im)

    im,d=new("#E8DCCB"); label(d,5,"التطبيق"); rtl(d,(W-110,390),"المنتج يشرح\nالنظام بنفسه.",100)
    intro="تنتقل درجات التحميص من النظام البصري إلى أكياس القهوة والأكواب، فتظهر الفروق بوضوح من دون إضافة عناصر زخرفية جديدة."
    rtl(d,(W-110,800),wrap(d,intro,38,1040),38,DARK,spacing=16); pic,mask=applications((110,1120,W-110,2110)); im.paste(pic,(110,1120),mask)
    footer(d,6); out.append(im)

    im,d=new("#E8DCCB"); label(d,6,"تطبيقات الهوية"); rtl(d,(W-110,355),"أكياس القهوة",84); pic,mask=applications((110,520,W-110,2110)); im.paste(pic,(110,520),mask); footer(d,7); out.append(im)
    im,d=new("#E8DCCB"); label(d,7,"تطبيقات الهوية"); rtl(d,(W-110,355),"أكواب سُمرة",84); pic,mask=applications((110,520,W-110,1820),True); im.paste(pic,(110,520),mask)
    rtl(d,(W//2,1970),"مشروع تصوري لعلامة خيالية أُعد لعرض منهجية ATHR BRANDS.\nجميع الأسماء والبيانات في التطبيقات افتراضية.",34,DARK,"ma",14); footer(d,8); out.append(im)
    return out

if __name__ == "__main__":
    OUT.parent.mkdir(parents=True,exist_ok=True); p=pages(); p[0].save(OUT,"PDF",resolution=150,save_all=True,append_images=p[1:])
    reader=PdfReader(str(OUT)); assert len(reader.pages)==8; print(f"created {OUT} ({OUT.stat().st_size} bytes, 8 pages)")
