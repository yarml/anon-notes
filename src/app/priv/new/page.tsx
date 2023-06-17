import NewNotePage from "@/components/NewNotePage";

export function PrivPageContent() {
  return <NewNotePage apiEndpoint="http://localhost:3000/api/priv/mknote" />
}
