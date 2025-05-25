import React, { useState } from 'react';
import { Settings, Save } from 'lucide-react';

interface SettingsPanelProps {
  webhookUrl: string;
  setWebhookUrl: (url: string) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ webhookUrl, setWebhookUrl }) => {
  const [localWebhookUrl, setLocalWebhookUrl] = useState(webhookUrl);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setWebhookUrl(localWebhookUrl);
    localStorage.setItem('webhookUrl', localWebhookUrl);
    setIsSaved(true);
    
    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  };

  return (
    <div className="bg-[#111111] rounded-lg border border-[#222222] p-6">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="h-5 w-5 text-blue-500" />
        <h2 className="text-xl font-semibold text-white">Settings</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="webhookUrl" className="block text-sm font-medium text-gray-300 mb-1">
            Webhook URL
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              id="webhookUrl"
              value={localWebhookUrl}
              onChange={(e) => setLocalWebhookUrl(e.target.value)}
              placeholder="https://your-webhook-url.com"
              className="flex-1 block w-full rounded-md bg-[#1A1A1A] border-[#333333] text-white placeholder-gray-500 p-2 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
            />
            <button
              onClick={handleSave}
              className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                isSaved 
                  ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                  : 'bg-blue-500/10 text-blue-500 border border-blue-500/20 hover:bg-blue-500/20'
              }`}
            >
              {isSaved ? (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Saved
                </>
              ) : (
                'Save'
              )}
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            This URL will be stored locally and used for all content generation requests.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;