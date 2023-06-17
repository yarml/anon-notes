import { Metadata } from "next";
import PrivPageContent from "./content";

export const metadata: Metadata = {
  title: "Private Notes",
};

export default function PrivPage() {
  return <PrivPageContent />;
}
