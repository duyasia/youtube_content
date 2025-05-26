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
      <div className="mx-auto p-2 sm:p-4 md:p-6 min-w-[1208px] max-w-7xl">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="w-full rounded-2xl border border-[#222222] bg-[#111111] p-4 flex items-center">
            <Header webhookUrl={webhookUrl} setWebhookUrl={setWebhookUrl} />
          </div>

          {/* Grid cho tablet trở lên */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Content Input + Nút Generate */}
            <div className="flex flex-col gap-4">
              <ContentForm
                ref={formRef}
                webhookUrl={webhookUrl}
                onResponseReceived={setResponse}
                setIsLoading={setIsLoading}
                addLog={addLog}
                customTone={customTone}
                setCustomTone={setCustomTone}
              />
              <button
                onClick={() => formRef.current?.submit()}
                className="w-full inline-flex justify-center items-center gap-2 px-4 py-3 rounded-2xl text-sm font-medium text-white bg-[#ff0034] hover:bg-[#e6002c] transition-colors duration-200"
                disabled={isLoading}
              >
                <Send className="h-4 w-4" />
                Generate Content
              </button>
            </div>
            {/* Custom Tone */}
            <CustomTone value={customTone} onChange={setCustomTone} />
          </div>

          {/* Hàng dưới: Request Log 30% - Generated Content 70% */}
          <div className="flex flex-col md:flex-row gap-4 mt-2">
            <div className="md:w-[30%] w-full">
              <LogDisplay logs={logs} />
            </div>
            <div className="md:w-[70%] w-full">
              <ResponseDisplay response={response} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
