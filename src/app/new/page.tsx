import NewNotePage from "@/components/NewNotePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New Public Note",
};

export default function NewPublicNotePage() {
  return <NewNotePage apiEndpoint="http://localhost:3000/api/mknote" />;
}
