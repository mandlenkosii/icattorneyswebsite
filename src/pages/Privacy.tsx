import type { ReactNode } from "react";
import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";
import { SITE, addressLine } from "../data/site";

/**
 * POPIA privacy notice. This is a starting template written for how this website
 * actually works — it should be reviewed by the firm before publication.
 */
const LAST_UPDATED = "November 2026";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-line pt-10">
      <h2 className="mb-5 text-[30px]">{title}</h2>
      <div className="space-y-4 text-[15px] leading-relaxed text-muted">{children}</div>
    </section>
  );
}

export default function Privacy() {
  return (
    <>
      <Seo
        title="Privacy Notice"
        path="/privacy"
        description={`How ${SITE.name} collects, uses and protects personal information in terms of the Protection of Personal Information Act (POPIA).`}
      />
      <PageHeader
        crumb="Privacy Notice"
        eyebrow="Legal"
        title="Privacy notice"
        intro={
          <p>
            How we collect, use and protect your personal information in terms of the Protection of Personal
            Information Act 4 of 2013 (POPIA). Last updated {LAST_UPDATED}.
          </p>
        }
      />

      <div className="container-site max-w-3xl space-y-12 py-24">
        <Section title="Who we are">
          <p>
            {SITE.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is a firm of attorneys at {addressLine(true)}. We are
            the responsible party for personal information you share with us. Our information officer is{" "}
            {SITE.director.name}, who can be contacted at{" "}
            <a className="text-ink underline" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>
            .
          </p>
        </Section>

        <Section title="What this website collects">
          <p>
            This website does not store the enquiries you type into our contact form. When you press &ldquo;Send
            via WhatsApp&rdquo; or &ldquo;Send via Email&rdquo;, your message is passed to WhatsApp or to your own
            email app on your device, and is only sent to us if you choose to send it from there.
          </p>
          <p>
            The website does not use analytics or advertising cookies. Fonts are loaded from Google Fonts, and the
            map on our contact page is only loaded from Google if you choose to show it; those services may receive
            technical information such as your IP address.
          </p>
        </Section>

        <Section title="Information you send us">
          <p>
            When you contact us we receive the information you choose to share — typically your name, contact
            details and a description of your matter. We use it to respond to your enquiry, to assess whether we
            can assist, to check for conflicts of interest and, if you instruct us, to provide legal services.
          </p>
          <p>
            Information about legal matters may be confidential and privileged. We treat it accordingly and share
            it only where necessary to act on your instructions, where required by law, or with your consent.
          </p>
        </Section>

        <Section title="How long we keep it">
          <p>
            We keep personal information only for as long as needed for the purpose it was collected, or as
            required by law and the rules governing attorneys&rsquo; records.
          </p>
        </Section>

        <Section title="Your rights">
          <p>
            Under POPIA you may ask whether we hold personal information about you, request access to it, and ask
            us to correct or delete it. You may also object to its processing in certain circumstances. To do so,
            email{" "}
            <a className="text-ink underline" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>
            .
          </p>
          <p>
            If you are not satisfied with how we have handled your information, you may lodge a complaint with
            the Information Regulator (South Africa) at{" "}
            <a
              className="text-ink underline"
              href="https://inforegulator.org.za"
              target="_blank"
              rel="noopener noreferrer"
            >
              inforegulator.org.za
            </a>
            .
          </p>
        </Section>

        <Section title="Disclaimer">
          <p>
            The content of this website is general information and does not constitute legal advice. No
            attorney–client relationship is created by using this website or sending us an enquiry until we have
            confirmed that we will act for you.
          </p>
        </Section>
      </div>
    </>
  );
}
