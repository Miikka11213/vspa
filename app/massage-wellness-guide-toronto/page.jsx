import { GuideDetail } from "../views";
import guides from "../original-guides.json";

const guide = guides.find((item) => item.path === "/massage-wellness-guide-toronto");
export const metadata = {
  title: { absolute: guide.seoTitle },
  description: guide.summary,
  alternates: { canonical: guide.path },
};

export default function Page() {
  return <GuideDetail guide={guide} />;
}
