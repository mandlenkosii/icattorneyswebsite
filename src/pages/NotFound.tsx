import { Link } from "react-router";
import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";
import { SITE } from "../data/site";

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page not found"
        path="/404"
        description={`The page you are looking for could not be found. Return to the ${SITE.name} home page or contact our Johannesburg office.`}
      />
      <PageHeader
        eyebrow="404"
        title="Page not found"
        intro={
          <>
            <p>The page you are looking for may have moved or no longer exists.</p>
            <Link to="/" className="btn btn-dark mt-8">
              Return home
            </Link>
          </>
        }
      />
    </>
  );
}
