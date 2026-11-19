"use client";

import PaperUpload from "@/components/paperUpload";
import { useState } from "react";
import type {UploadedPaper} from "@/lib/api";
import PaperDetails from "../components/paperDetails";

import {
  AssistantRuntimeProvider,
  useLocalRuntime,
  ThreadPrimitive,
  MessagePrimitive,
  ComposerPrimitive,
  type ChatModelAdapter,
} from "@assistant-ui/react";

// placeholder chatbot response
const demoAdapter: ChatModelAdapter = {
  async run() {
    return {
      content: [
        {
          type: "text",
          text: "Hello! This is your research assistant. Once the backend is connected, you'll be able to upload questions and ask me questions about them.",
        },
      ],
    };
  },
};

export default function Home() {
  const runtime = useLocalRuntime(demoAdapter);
  const [uploadedPaper, setUploadedPaper] = useState<UploadedPaper | null>(null);

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <main className="flex min-h-screen flex-col bg-white text-gray-900">
        {/* header */}
        <header className="border-b border-gray-200 p-5 text-center">
          <h1 className="text-2xl font-semibold">
            Research Assistant
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Ask me questions about research papers
          </p>
        </header>
        
        {/* paper upload */}
        <div className="border-b border-gray-200">
          <PaperUpload onUploaded={setUploadedPaper} />
          
          {uploadedPaper && (
            <div className="mx-auto w-full max-w-3xl space-y-4 p-4">
              <p className="text-center text-sm font-medium text-green-700">
                {uploadedPaper.message}
              </p>

              <PaperDetails article={uploadedPaper.article} />
            </div>
          )}
        </div>

        {/* chat thread */}
        <ThreadPrimitive.Root className="mx-auto flex w-full max-w-3xl min-h-0 flex-1 flex-col">
          {/* messages area */}
          <ThreadPrimitive.Viewport className="min-h-0 flex-1 overflow-y-auto p-6">
            <ThreadPrimitive.Messages>
              {({ message }) =>
                message.role === "user" ? (
                  <MessagePrimitive.Root className="mb-4 flex justify-end">
                    <div className="max-w-[80%] rounded 2x1 bg-blue-600 px-4 py3 text-white">
                      <MessagePrimitive.Parts/>
                    </div>
                  </MessagePrimitive.Root>
                ) : (
                  <MessagePrimitive.Root className="mb-4 flex justify-start">
                    <div className="max-w-[80%] rounded 2x1 bg-gray-100 px-4 py3 text-gray-900">
                      <MessagePrimitive.Parts/>
                    </div>
                  </MessagePrimitive.Root>
                )}
            </ThreadPrimitive.Messages>
          </ThreadPrimitive.Viewport>
          {/* message input */}
          <div className="border-t border-gray-200 p-4">
            <ComposerPrimitive.Root className="flex items-end gap-3 rouned-xl border border-gray-300 bg-white p-3">
              <ComposerPrimitive.Input 
              placeholder="Ask a question about the paper..." 
              className="max-h-40 min-h-10 flex-1 resize-none bg-transparent p-2 outline-none"
              />

              <ComposerPrimitive.Send className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 disabled:opacity-50">
                Send
              </ComposerPrimitive.Send>
            </ComposerPrimitive.Root>
          </div>

        </ThreadPrimitive.Root>
      </main>
    </AssistantRuntimeProvider>
  );
}