import { Button } from "./Button";
import { Icon } from "./Icon";

/** Shared success state for forms. Optionally surfaces a WhatsApp follow-up. */
export function FormSuccess({
  title,
  message,
  waUrl,
}: {
  title: string;
  message: string;
  waUrl?: string;
}) {
  return (
    <div className="flex flex-col items-center py-2 text-center">
      <span className="bg-gold/15 text-gold grid size-14 place-items-center rounded-full">
        <Icon name="check" className="size-7" />
      </span>
      <h3 className="text-ivory mt-4 text-xl">{title}</h3>
      <p className="text-ivory/60 mt-2 max-w-sm text-sm leading-relaxed">{message}</p>
      {waUrl && (
        <Button
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="whatsapp"
          className="mt-6"
        >
          <Icon name="whatsapp" className="size-5" />
          متابعة عبر واتساب
        </Button>
      )}
    </div>
  );
}
