"use client";

import { ReactNode, useState } from "react";

export default function NewNotePage({ apiEndpoint }: { apiEndpoint: string }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState("none");

  var footerNode: ReactNode;

  if (success === "none") {
    footerNode = <></>;
  } else {
    const className = `w-full text-center rounded-tr-md ${
      success === "fail" ? "bg-red-700" : "bg-green-800"
    }`;
    footerNode = <p className={className}>{status}</p>;
  }

  return (
    <>
      <main className="m-2">
        <header className="mb-8">
          <h1 className="text-3xl">Create a New Public Note</h1>
        </header>
        <input
          value={title}
          type="text"
          className="relative w-3/4 left-[12.5%] mb-4"
          placeholder="Note Title"
          onChange={(event) => setTitle(event.target.value)}
        />
        <textarea
          value={content}
          className="relative w-3/4 left-[12.5%] mb-4"
          placeholder="Note"
          onChange={(event) => setContent(event.target.value)}
        />
        <br />
        <button
          className="relative -translate-x-full left-[87.5%] mb-6"
          onClick={async (event) => {
            const res = await fetch(apiEndpoint, {
              method: "POST",
              body: JSON.stringify({ title, content }),
            });

            if (!res.ok) {
              setSuccess("fail");
              setStatus("Could not send note to server");
            } else {
              const {
                success: nSuccess,
                status: nStatus,
              }: { success: string; status: string } = await res.json();

              setStatus(nStatus);
              setSuccess(nSuccess);
            }

            setTitle("");
            setContent("");
          }}
        >
          Save Note
        </button>

        <footer className="fixed left-0 right-0 bottom-0 w-full">
          {footerNode}
        </footer>
      </main>
    </>
  );
}
