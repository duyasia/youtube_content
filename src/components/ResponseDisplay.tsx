import React, { useState } from "react";
import { ClipboardCopy, CheckCircle2 } from "lucide-react";

interface ResponseDisplayProps {
  response: string;
  isLoading: boolean;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({
  response,
  isLoading,
}) => {
  const [copied, setCopied] = useState(false);

  const formatResponse = (response: string) => {
    try {
      const parsedResponse = JSON.parse(response);
      if (Array.isArray(parsedResponse) && parsedResponse.length > 0) {
        const content = parsedResponse[0].content;
        return content
          .replace(
            /### (.*?)\n/g,
            '<h3 class="text-2xl font-bold my-4 text-white">$1</h3>'
          )
          .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
          .replace(/(#\w+)/g, '<span class="text-orange-500">$1</span>')
          .replace(
            /(https?:\/\/[^\s]+)/g,
            '<a href="$1" class="text-orange-500 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>'
          )
          .replace(/\n/g, "<br>");
      }
      return response;
    } catch (e) {
      return response;
    }
  };

  const copyToClipboard = async () => {
    if (!response) return;

    try {
      const rawContent = JSON.parse(response)[0].content;
      await navigator.clipboard.writeText(rawContent);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-[#111111] rounded-lg border border-[#222222] p-6 h-full">
        <h2 className="text-xl font-semibold text-white mb-4">
          Generated Content
        </h2>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  const formattedResponse = response ? formatResponse(response) : "";

  return (
    <div className="bg-[#111111] rounded-lg border border-[#222222] p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Generated Content</h2>

        {response && (
          <button
            onClick={copyToClipboard}
            className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
              copied
                ? "bg-green-500/10 text-green-500 border border-green-500/20"
                : "bg-[#1A1A1A] text-gray-300 border border-[#333333] hover:bg-[#222222]"
            }`}
          >
            {copied ? (
              <>
                <CheckCircle2 className="h-4 w-4 mr-1" />
                Copied
              </>
            ) : (
              <>
                <ClipboardCopy className="h-4 w-4 mr-1" />
                Copy
              </>
            )}
          </button>
        )}
      </div>

      {formattedResponse ? (
        <div className="prose prose-invert max-w-none">
          <div
            className="bg-[#1A1A1A] rounded-md p-4 border border-[#333333] leading-relaxed text-gray-300"
            dangerouslySetInnerHTML={{ __html: formattedResponse }}
          />
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p>Generated content will appear here.</p>
        </div>
      )}
    </div>
  );
};

export default ResponseDisplay;
