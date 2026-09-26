import { GuideDetail } from "../views";
import guides from "../original-guides.json";

const guide = guides.find((item) => item.path === "/toronto-adult-massage-guide");
export const metadata = {
  title: { absolute: "Adult Massage in Toronto: Discreet Guide | V Spa Toronto" },
  description: guide.summary,
  alternates: { canonical: guide.path },
};

export default function Page() {
  return <GuideDetail guide={guide} />;
}
