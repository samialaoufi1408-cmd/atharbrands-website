import { LogoMark } from "@/components/ui/Logo";

export default function Loading() {
  return (
    <div className="bg-midnight flex min-h-screen items-center justify-center">
      <LogoMark className="text-gold h-12 w-12 animate-pulse" />
    </div>
  );
}
