import { CONTACT_EMAIL, FOOTER_LOGO_URL, SITE_NAME } from '@/config/site';

export default function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <img src={FOOTER_LOGO_URL} alt="" width={240} height={240} loading="lazy" className="size-40 sm:size-60" />
        <div className="mt-8 flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
          <p>
            {SITE_NAME} © {new Date().getFullYear()}
          </p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-4 hover:text-foreground">
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
    </footer>
  );
}
