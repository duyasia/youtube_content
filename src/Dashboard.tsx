import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import ContentForm, { ContentFormRef } from "./components/ContentForm";
import ResponseDisplay from "./components/ResponseDisplay";
import LogDisplay, { LogEntry } from "./components/LogDisplay";
import CustomTone from "./components/CustomTone";
import { Send } from "lucide-react";

const Dashboard: React.FC = () => {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [customTone, setCustomTone] = useState("");
  const formRef = useRef<ContentFormRef>(null);

  useEffect(() => {
    const savedWebhookUrl = localStorage.getItem("webhookUrl");
    const defaultWebhookUrl = import.meta.env.VITE_DEFAULT_WEBHOOK;
    if (savedWebhookUrl && savedWebhookUrl.trim() !== "") {
      setWebhookUrl(savedWebhookUrl);
    } else if (defaultWebhookUrl && defaultWebhookUrl.trim() !== "") {
      setWebhookUrl(defaultWebhookUrl);
    } else {
      setWebhookUrl("");
    }
  }, []);

  const addLog = (log: LogEntry) => {
    setLogs((prevLogs) => [...prevLogs, log]);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-rows-[auto_280px_400px] grid-cols-[30%_70%] gap-6">
          {/* Hàng 1: Header */}
          <div className="row-start-1 row-end-2 col-span-2 w-full rounded-2xl border border-[#222222] bg-[#111111] p-4 flex items-center">
            <Header webhookUrl={webhookUrl} setWebhookUrl={setWebhookUrl} />
          </div>
          {/* Hàng 2: Content Input + Custom Tone */}
          <div className="row-start-2 row-end-3 col-start-1 col-end-2 h-[280px] flex flex-col">
            <ContentForm
              ref={formRef}
              webhookUrl={webhookUrl}
              onResponseReceived={setResponse}
              setIsLoading={setIsLoading}
              addLog={addLog}
              customTone={customTone}
              setCustomTone={setCustomTone}
            />
          </div>
          <div className="row-start-2 row-end-3 col-start-2 col-end-3 h-[280px] flex flex-col">
            <CustomTone value={customTone} onChange={setCustomTone} />
          </div>
          {/* Hàng 3: Log + Nút (trái), Generated Content (phải) */}
          <div className="row-start-3 row-end-4 col-start-1 col-end-2 h-[400px] flex flex-col">
            <button
              onClick={() => formRef.current?.submit()}
              className="w-full inline-flex justify-center items-center gap-2 px-4 py-3 rounded-2xl text-sm font-medium text-white bg-[#ff0034] hover:bg-[#e6002c] transition-colors duration-200 mb-4"
              disabled={isLoading}
            >
              <Send className="h-4 w-4" />
              Generate Content
            </button>
            <div className="flex-1 h-full bg-[#111111] rounded-2xl overflow-auto">
              <LogDisplay logs={logs} />
            </div>
          </div>
          <div className="row-start-3 row-end-4 col-start-2 col-end-3 h-[400px] flex flex-col">
            <div className="h-full bg-[#111111] rounded-2xl p-6 border border-[#222222]">
              <ResponseDisplay response={response} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
