import React from "react";
import { History, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";

export interface LogEntry {
  timestamp: Date;
  type: "request" | "response";
  status: "success" | "error";
  content: string;
}

interface LogDisplayProps {
  logs: LogEntry[];
}

const LogDisplay: React.FC<LogDisplayProps> = ({ logs }) => {
  return (
    <div className="bg-[#111111] rounded-2xl border border-[#222222] p-6 h-full overflow-auto">
      <div className="flex items-center gap-2 mb-4">
        <History className="h-5 w-5 text-[#ff0034]" />
        <h2 className="text-xl font-semibold text-white">Request Log</h2>
      </div>

      {logs.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No requests logged yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {logs.map((log, index) => (
            <div
              key={index}
              className={`p-4 rounded-2xl border flex items-center justify-between ${
                log.status === "success"
                  ? "bg-[#22c55e]/10 border-[#22c55e]/30"
                  : "bg-red-500/5 border-red-500/20"
              }`}
            >
              <div className="flex items-center gap-2">
                {log.status === "success" ? (
                  <CheckCircle className="h-5 w-5 text-[#22c55e]" />
                ) : (
                  <XCircle className="h-5 w-5 text-[#ff0034]" />
                )}
                <span className="font-medium text-gray-300">
                  {log.type === "request"
                    ? "Request Sent"
                    : "Response Received"}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                {format(log.timestamp, "HH:mm:ss dd/MM/yyyy")}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LogDisplay;
