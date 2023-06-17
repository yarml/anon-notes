import { mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import { Note } from "@prisma/client";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Public Notes",
};

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/notes", {
    cache: "no-store",
  });

  const notes: Note[] = await res.json();

  if (notes.length == 0) {
    return (
      <main>
        <h1 className="text-center text-9xl mb-4 w-full relative top-1/4">
          (˚Δ˚)b
        </h1>
        <p className="text-center w-full mb-4">There are no notes yet.</p>
        <Link href="/new">
          <button className="relative left-1/2 -translate-x-1/2">
            Create a Note
          </button>
        </Link>
      </main>
    );
  }

  return (
    <main className="flex flex-col top-0 m-2">
      <header className="flex justify-between">
        <h1 className="text-3xl">Public Notes</h1>
      </header>
      {notes.map((note) => (
        <div key={note.id} className="card group">
          <header className="mb-2">
            <h1 className="text-lg card-text">{note.title}</h1>
          </header>
          <div className="relative left-3">
            <p className="group-hover:text-white transition-all duration-300">
              {note.content}
            </p>
          </div>
        </div>
      ))}
    </main>
  );
}
