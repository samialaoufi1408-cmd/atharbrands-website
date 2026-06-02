"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/Logo";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Hook for future client-side error reporting.
  }, [error]);

  return (
    <section className="bg-midnight text-ivory flex min-h-screen items-center">
      <Container>
        <div className="mx-auto flex max-w-xl flex-col items-center pt-20 text-center">
          <LogoMark className="text-gold h-14 w-14" />
          <h1 className="text-ivory mt-8 text-3xl">حدث خطأ غير متوقع</h1>
          <p className="text-ivory/65 mt-3">
            نعتذر عن ذلك. يمكنك إعادة المحاولة، وإن استمرت المشكلة تواصل معنا.
          </p>
          <Button onClick={() => reset()} className="mt-8">
            إعادة المحاولة
          </Button>
        </div>
      </Container>
    </section>
  );
}
