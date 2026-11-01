import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";
import PracticeCard from "../components/PracticeCard";
import Reveal from "../components/Reveal";
import ConsultationBand from "../components/ConsultationBand";
import { PRACTICES } from "../data/practices";
import { SITE } from "../data/site";

export default function PracticeAreas() {
  return (
    <>
      <Seo
        title="Practice Areas"
        path="/practice-areas"
        description={`Legal services from ${SITE.name} in Johannesburg: ${PRACTICES.map((p) => p.title).join(", ")}.`}
      />
      <PageHeader
        crumb="Practice Areas"
        eyebrow="Practice areas"
        title={
          <>
            How we can <em className="text-gold italic">help</em>
          </>
        }
        intro={
          <p>
            We advise individuals, families and businesses across a focused range of practice areas. Select a
            practice to send an enquiry, or open the detail to learn more about how we assist.
          </p>
        }
      />
      <section aria-label="All practice areas" className="py-24">
        <div className="container-site grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {PRACTICES.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 4) * 80}>
              <PracticeCard practice={p} index={i} variant="full" />
            </Reveal>
          ))}
        </div>
      </section>
      <ConsultationBand
        heading="Not sure which area applies?"
        text="Tell us briefly about your situation and we will advise on the right way forward."
      />
    </>
  );
}
