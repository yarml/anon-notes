"use client";

import { mdiLogin, mdiLogout, mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default async function PrivPageContent() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <main className="flex flex-col">
        <p className="text-center">You are currently not signed in.</p>
        <button
          className="w-fit relative left-1/2 -translate-x-1/2 flex"
          onClick={() => signIn()}
        >
          <Icon path={mdiLogin} size="24px" />
          <p>Sign in</p>
        </button>
      </main>
    );
  }

  const res = await fetch("http://localhost:3000/api/priv/notes");

  const { notes }: { notes: { id: string; title: string; content: string }[] } =
    await res.json();

  return (
    <>
      <main className="m-2">
        <header className="flex justify-between">
          <h1 className="text-3xl">Private Notes</h1>
          <div className="flex items-center">
            <h1>Signed in as {session.user?.name}</h1>
            <button
              className="ms-2 flex items-center"
              onClick={() => signOut()}
            >
              <Icon path={mdiLogout} size="24px" />
              <p>Sign out</p>
            </button>
          </div>
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
      <div className="fixed right-0 bottom-0 m-2">
        <Link href="/new">
          <div className="sidebar-icon group">
            <span className="fab-tooltip">Create Private Note</span>
            <Icon path={mdiPlus} size="32px" />
          </div>
        </Link>
      </div>
    </>
  );
}
