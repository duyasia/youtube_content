import React from "react";
import { Feather } from "lucide-react";

interface CustomToneProps {
  value: string;
  onChange: (value: string) => void;
}

const CustomTone: React.FC<CustomToneProps> = ({ value, onChange }) => {
  return (
    <div className="bg-[#111111] rounded-2xl border border-[#ff0034] p-6 pb-8 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Feather className="h-5 w-5 text-white" />
        <h2 className="text-xl font-semibold text-white">Custom Tone</h2>
      </div>
      <p className="text-sm text-white mb-2">
        Provide a sample text to guide the AI's tone. If empty, a generic
        default tone will be used.
      </p>
      <textarea
        className="block w-full rounded-md bg-[#ff0034] border border-[#ff0034] text-white placeholder-white/80 p-3 focus:border-[#ff0034] focus:ring focus:ring-[#ff0034]/20 min-h-[100px] max-h-[160px] overflow-auto resize-y h-full"
        placeholder="e.g., Write in a formal and informative style, targeting professionals..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default CustomTone;
