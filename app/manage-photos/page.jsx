import { notFound } from "next/navigation";
import PhotoManager from "./photo-manager";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Manage photos",
  robots: { index: false, follow: false },
};
export default function Page() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <PhotoManager />;
}
