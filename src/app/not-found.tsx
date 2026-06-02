import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/Logo";
import { Pattern } from "@/components/ui/Pattern";

export default function NotFound() {
  return (
    <section className="bg-midnight text-ivory relative flex min-h-screen items-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <Pattern className="text-gold/[0.06] h-full w-full" id="nf-geo" />
      </div>
      <Container className="relative">
        <div className="mx-auto flex max-w-xl flex-col items-center pt-20 text-center">
          <LogoMark className="text-gold h-14 w-14" />
          <p className="text-gold mt-8 font-serif text-6xl">404</p>
          <h1 className="text-ivory mt-4 text-3xl">الصفحة غير موجودة</h1>
          <p className="text-ivory/65 mt-3">يبدو أن الرابط الذي تبحث عنه غير متاح أو تم نقله.</p>
          <Button href="/" className="mt-8">
            العودة إلى الرئيسية
          </Button>
        </div>
      </Container>
    </section>
  );
}
