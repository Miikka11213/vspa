import { GuideDetail } from "../views";
import guides from "../original-guides.json";

const guide = guides.find((item) => item.path === "/mens-intimate-spa");
export const metadata = {
  title: { absolute: "Men's Spa and Grooming in Toronto | V Spa Toronto" },
  description: guide.summary,
  alternates: { canonical: guide.path },
};

export default function Page() {
  return <GuideDetail guide={guide} />;
}
