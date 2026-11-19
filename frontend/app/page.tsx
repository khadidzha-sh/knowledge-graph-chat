
"use client";

import { useState } from "react";

import Chat from "../components/chat";
import PaperUpload from "../components/paperUpload";
import PaperSidebar from "../components/PaperSidebar";

import type { UploadedPaper } from "../lib/api";

export default function Home() {
  const [uploadedPaper, setUploadedPaper] =
    useState<UploadedPaper | null>(null);

  return (
    <main className="flex h-screen flex-col bg-white text-gray-900">

      {/* Header */}
      <header className="shrink-0 border-b border-gray-200 p-5">
        <h1 className="text-2xl font-semibold">
          Medical Research Assistant
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Explore biomedical research papers
        </p>
      </header>

      {/* Main layout */}
      <div className="flex min-h-0 flex-1 flex-col md:flex-row">

        {/* Left sidebar */}
        <div className="h-64 shrink-0 border-b border-gray-200 md:h-full md:w-80 md:border-b-0 md:border-r">

          {/* Upload XML */}
          <div className="border-b border-gray-200">
            <PaperUpload onUploaded={setUploadedPaper} />
          </div>

          {/* Extracted information */}
          <div className="h-[calc(100%-110px)] overflow-y-auto">
            <PaperSidebar paper={uploadedPaper} />
          </div>

        </div>

        {/* Chatbot */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <Chat
            key={uploadedPaper?.paper_id ?? "no-paper"}
            paperId={uploadedPaper?.paper_id ?? null}
          />
        </div>

      </div>
    </main>
  );
}
