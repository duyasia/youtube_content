import React, { useState, useImperativeHandle, forwardRef } from "react";
import { FileVideo } from "lucide-react";
import type { LogEntry } from "./LogDisplay";

export interface ContentFormRef {
  submit: () => void;
}

interface ContentFormProps {
  webhookUrl: string;
  onResponseReceived: (response: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  addLog: (log: LogEntry) => void;
  customTone: string;
  setCustomTone: (v: string) => void;
}

const contentTypes = [
  { id: "summarize", label: "Summarize" },
  { id: "blog", label: "Blog" },
  { id: "facebook", label: "Facebook" },
];

const ContentForm = forwardRef<ContentFormRef, ContentFormProps>(
  (
    {
      webhookUrl,
      onResponseReceived,
      setIsLoading,
      addLog,
      customTone,
      setCustomTone,
    },
    ref
  ) => {
    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [contentType, setContentType] = useState("summarize");
    const [error, setError] = useState<string | null>(null);

    const handleFormSubmit = async (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      setError(null);
      if (!webhookUrl) {
        setError("Please set a webhook URL in Settings first");
        return;
      }
      const trimmedUrl = youtubeUrl.trim();
      if (
        !trimmedUrl.includes("youtube.com") &&
        !trimmedUrl.includes("youtu.be")
      ) {
        setError("Please enter a valid YouTube URL");
        return;
      }
      const payload = {
        youtube_url: trimmedUrl,
        content_type:
          contentType.charAt(0).toUpperCase() + contentType.slice(1),
        custom_tone: customTone || undefined,
      };
      try {
        setIsLoading(true);
        addLog({
          timestamp: new Date(),
          type: "request",
          status: "success",
          content: JSON.stringify(payload, null, 2),
        });
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const responseText = await response.text();
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        addLog({
          timestamp: new Date(),
          type: "response",
          status: "success",
          content: responseText,
        });
        onResponseReceived(responseText);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        addLog({
          timestamp: new Date(),
          type: "response",
          status: "error",
          content: errorMessage,
        });
        setError(`Failed to send request: ${errorMessage}`);
        onResponseReceived("");
      } finally {
        setIsLoading(false);
      }
    };

    useImperativeHandle(ref, () => ({
      submit: handleFormSubmit,
    }));

    return (
      <div className="bg-[#111111] rounded-lg border border-[#222222] p-6 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-6">
          <FileVideo className="h-5 w-5 text-[#ff0034]" />
          <h2 className="text-xl font-semibold text-white">Content Input</h2>
        </div>
        <form
          onSubmit={handleFormSubmit}
          className="space-y-6 flex-1 flex flex-col"
        >
          <div>
            <label
              htmlFor="youtubeUrl"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              YouTube Video URL
            </label>
            <input
              type="url"
              id="youtubeUrl"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="block w-full rounded-md bg-[#1A1A1A] border-[#333333] text-white placeholder-gray-500 p-3 focus:border-[#ff0034] focus:ring focus:ring-[#ff0034]/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Content Type
            </label>
            <div className="flex flex-wrap gap-3">
              {contentTypes.map((type) => (
                <label
                  key={type.id}
                  className={`flex items-center px-4 py-2 rounded-md cursor-pointer transition-all duration-200 ${
                    contentType === type.id
                      ? "bg-[#ff0034]/10 border-[#ff0034]/20 text-[#ff0034] border"
                      : "bg-[#1A1A1A] border-[#333333] text-gray-300 border hover:bg-[#222222]"
                  }`}
                >
                  <input
                    type="radio"
                    name="contentType"
                    value={type.id}
                    checked={contentType === type.id}
                    onChange={() => setContentType(type.id)}
                    className="sr-only"
                  />
                  {type.label}
                </label>
              ))}
            </div>
          </div>
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-md">
              {error}
            </div>
          )}
        </form>
      </div>
    );
  }
);

export default ContentForm;
