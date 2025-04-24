import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Theme, themes } from '../themes';

interface SettingsSection {
  id: string;
  title: string;
  icon: string;
  description: string;
}

interface ConnectedApp {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  description: string;
}

// Type for import sources
type ImportSource = 'todoist' | 'asana' | 'trello' | 'microsoft' | 'google' | 'csv' | null;

const Settings: React.FC = () => {
  const { theme, setTheme, getThemeClasses } = useTheme();
  const [activeSection, setActiveSection] = useState('profile');
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [selectedImportSource, setSelectedImportSource] = useState<ImportSource>(null);
  const [userSettings, setUserSettings] = useState({
    profile: {
      username: '',
      avatar: '',
      birthdate: '',
      pronouns: '',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    },
    appearance: {
      theme: theme
    },
    dailyFlow: {
      morningCheckIn: '09:00',
      notifications: true,
      questSuggestions: 3,
      autoReset: true,
      weekendMode: 'normal'
    },
    assistant: {
      tone: 'neutral',
      emotionalIntelligence: true
    },
    advanced: {
      experimentalAgents: false,
      healthData: false,
      modelVersion: 'default'
    },
    accessibility: {
      highContrast: false,
      largerText: false,
      reducedMotion: false,
      screenReader: false,
      colorBlindMode: 'none'
    },
    privacy: {
      connectedApps: [] as string[],
      dataSaving: true
    }
  });

  const [connectedApps, setConnectedApps] = useState<ConnectedApp[]>([
    {
      id: 'lloyds',
      name: 'Lloyds Bank',
      icon: '🏦',
      connected: false,
      description: 'Connect your Lloyds Bank account for financial insights'
    },
    {
      id: 'fitbit',
      name: 'Fitbit',
      icon: '⌚',
      connected: false,
      description: 'Sync your Fitbit fitness data'
    },
    {
      id: 'samsung_health',
      name: 'Samsung Health',
      icon: '💙',
      connected: false,
      description: 'Connect to Samsung Health for activity and health data'
    },
    {
      id: 'apple_health',
      name: 'Apple Health',
      icon: '❤️',
      connected: false,
      description: 'Sync your Apple Health data'
    },
    {
      id: 'strava',
      name: 'Strava',
      icon: '🏃',
      connected: false,
      description: 'Connect to Strava for running and cycling data'
    },
    {
      id: 'headspace',
      name: 'Headspace',
      icon: '🧘',
      connected: false,
      description: 'Connect to Headspace for meditation and mindfulness data'
    },
    {
      id: 'garmin',
      name: 'Garmin',
      icon: '⌚',
      connected: false,
      description: 'Sync your Garmin fitness and activity data'
    },
    {
      id: 'google_calendar',
      name: 'Google Calendar',
      icon: '📅',
      connected: false,
      description: 'Sync your schedule and events from Google Calendar'
    },
    {
      id: 'microsoft_calendar',
      name: 'Microsoft Calendar',
      icon: '📆',
      connected: false,
      description: 'Connect to Microsoft Calendar for schedule integration'
    }
  ]);

  const sections: SettingsSection[] = [
    {
      id: 'profile',
      title: 'User Profile',
      icon: '🔧',
      description: 'Customize your personal information and preferences'
    },
    {
      id: 'appearance',
      title: 'Appearance',
      icon: '🎨',
      description: 'Customize the look and feel of the app'
    },
    {
      id: 'dailyFlow',
      title: 'Daily Flow Config',
      icon: '⏱️',
      description: 'Configure your daily routines and notifications'
    },
    {
      id: 'assistant',
      title: 'Assistant Behavior',
      icon: '🧠',
      description: 'Customize how your AI assistant interacts with you'
    },
    {
      id: 'accessibility',
      title: 'Accessibility',
      icon: '♿',
      description: 'Configure accessibility options for a better experience'
    },
    {
      id: 'advanced',
      title: 'Advanced Features',
      icon: '🧪',
      description: 'Experimental and beta features'
    },
    {
      id: 'privacy',
      title: 'Data & Privacy',
      icon: '🧹',
      description: 'Manage your data and privacy settings'
    }
  ];

  const commonTimezones = [
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'America/Phoenix',
    'America/Anchorage',
    'America/Honolulu',
    'America/Puerto_Rico',
    'America/Toronto',
    'America/Vancouver',
    'Europe/London',
    'Europe/Paris',
    'Europe/Berlin',
    'Europe/Rome',
    'Europe/Madrid',
    'Europe/Moscow',
    'Asia/Dubai',
    'Asia/Shanghai',
    'Asia/Tokyo',
    'Asia/Singapore',
    'Australia/Sydney',
    'Pacific/Auckland'
  ];

  const handleThemeChange = (newTheme: Theme) => {
    setUserSettings(prev => ({
      ...prev,
      appearance: { ...prev.appearance, theme: newTheme }
    }));
    setTheme(newTheme);
  };

  const toggleAppConnection = (appId: string) => {
    setConnectedApps(prevApps => 
      prevApps.map(app => 
        app.id === appId ? { ...app, connected: !app.connected } : app
      )
    );
    
    // Update the connected apps list in userSettings
    setUserSettings(prev => {
      const updatedConnectedApps = [...prev.privacy.connectedApps];
      const app = connectedApps.find(app => app.id === appId);
      
      if (app) {
        if (!app.connected) {
          // App is being connected, add to list
          updatedConnectedApps.push(appId);
        } else {
          // App is being disconnected, remove from list
          const index = updatedConnectedApps.indexOf(appId);
          if (index > -1) updatedConnectedApps.splice(index, 1);
        }
      }
      
      return {
        ...prev,
        privacy: {
          ...prev.privacy,
          connectedApps: updatedConnectedApps
        }
      };
    });
  };

  const handleImport = (source: ImportSource) => {
    setSelectedImportSource(source);
    setImportModalOpen(true);
  };

  const closeImportModal = () => {
    setImportModalOpen(false);
    setSelectedImportSource(null);
  };

  const renderProfileSection = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className={`block text-sm ${getThemeClasses('heading')} text-black`}>Username / Alias</label>
        <input
          type="text"
          className={`w-full ${getThemeClasses('surface')} border ${getThemeClasses('border')} rounded-lg px-4 py-2 text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-black`}
          placeholder="Enter username"
          value={userSettings.profile.username}
          onChange={(e) => setUserSettings({
            ...userSettings,
            profile: { ...userSettings.profile, username: e.target.value }
          })}
        />
      </div>

      <div className="space-y-2">
        <label className={`block text-sm ${getThemeClasses('heading')} text-black`}>Avatar</label>
        <div className="flex items-center space-x-4">
          <div className={`w-16 h-16 ${getThemeClasses('surface')} border ${getThemeClasses('border')} rounded-full flex items-center justify-center`}>
            {userSettings.profile.avatar || '👤'}
          </div>
          <button className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors`}>
            Change Avatar
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <label className={`block text-sm ${getThemeClasses('heading')} text-black`}>Birthdate</label>
        <input
          type="date"
          className={`w-full ${getThemeClasses('surface')} border ${getThemeClasses('border')} rounded-lg px-4 py-2 text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
          value={userSettings.profile.birthdate}
          onChange={(e) => setUserSettings({
            ...userSettings,
            profile: { ...userSettings.profile, birthdate: e.target.value }
          })}
        />
      </div>

      <div className="space-y-2">
        <label className={`block text-sm ${getThemeClasses('heading')} text-black`}>Preferred Pronouns</label>
        <select
          className={`w-full ${getThemeClasses('surface')} border ${getThemeClasses('border')} rounded-lg px-4 py-2 text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
          value={userSettings.profile.pronouns}
          onChange={(e) => setUserSettings({
            ...userSettings,
            profile: { ...userSettings.profile, pronouns: e.target.value }
          })}
        >
          <option value="">Select pronouns</option>
          <option value="he/him">He/Him</option>
          <option value="she/her">She/Her</option>
          <option value="they/them">They/Them</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className={`block text-sm ${getThemeClasses('heading')} text-black`}>Timezone</label>
        <select
          className={`w-full ${getThemeClasses('surface')} border ${getThemeClasses('border')} rounded-lg px-4 py-2 text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
          value={userSettings.profile.timezone}
          onChange={(e) => setUserSettings({
            ...userSettings,
            profile: { ...userSettings.profile, timezone: e.target.value }
          })}
        >
          {commonTimezones.map((tz: string) => (
            <option key={tz} value={tz}>{tz.replace('_', ' ')}</option>
          ))}
        </select>
      </div>
    </div>
  );

  const renderAppearanceSection = () => {
    return (
      <div className="space-y-6">
        <div>
          <p className={`text-sm ${getThemeClasses('heading')} text-black mb-4`}>
            Using the Lloyds Bank theme
          </p>
          
          {/* Theme Preview */}
          <div className="mt-4">
            <p className={`text-sm text-black mb-2`}>Preview:</p>
            <div className={`border ${getThemeClasses('border')} rounded-lg overflow-hidden`}>
              <div className={`${getThemeClasses('surface')} p-3 border-b ${getThemeClasses('border')}`}>
                <div className="flex items-center">
                  <span className="mr-2">🧬</span>
                  <span className={`${getThemeClasses('heading')} text-black`}>
                    Character Stats
                  </span>
                </div>
              </div>
              <div className={`${getThemeClasses('background')} p-3`}>
                <div className="flex space-x-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <span className="text-purple-400 text-sm">P</span>
                  </div>
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <span className="text-blue-400 text-sm">M</span>
                  </div>
                  <div className="w-8 h-8 bg-teal-500/20 rounded-full flex items-center justify-center">
                    <span className="text-teal-400 text-sm">E</span>
                  </div>
                  <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center">
                    <span className="text-amber-400 text-sm">S</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDailyFlowSection = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className={`block text-sm ${getThemeClasses('heading')} text-black`}>Morning Check-in Time</label>
        <input
          type="time"
          className={`w-full ${getThemeClasses('surface')} border ${getThemeClasses('border')} rounded-lg px-4 py-2 text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
          value={userSettings.dailyFlow.morningCheckIn}
          onChange={(e) => setUserSettings({
            ...userSettings,
            dailyFlow: { ...userSettings.dailyFlow, morningCheckIn: e.target.value }
          })}
        />
      </div>

      <div className="flex items-center justify-between">
        <label className={`text-sm text-black`}>Notifications</label>
        <div className={`relative inline-block w-12 h-6 rounded-full bg-slate-200`}>
          <input
            type="checkbox"
            className="sr-only"
            checked={userSettings.dailyFlow.notifications}
            onChange={(e) => setUserSettings({
              ...userSettings,
              dailyFlow: { ...userSettings.dailyFlow, notifications: e.target.checked }
            })}
          />
          <div
            className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform transform ${
              userSettings.dailyFlow.notifications ? 'translate-x-6 bg-green-600' : 'bg-slate-400'
            }`}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className={`block text-sm text-black`}>Quest Suggestions per Day</label>
        <input
          type="range"
          min="1"
          max="5"
          className="w-full"
          value={userSettings.dailyFlow.questSuggestions}
          onChange={(e) => setUserSettings({
            ...userSettings,
            dailyFlow: { ...userSettings.dailyFlow, questSuggestions: parseInt(e.target.value) }
          })}
        />
        <div className={`text-center text-sm text-black`}>
          {userSettings.dailyFlow.questSuggestions} quests
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className={`text-sm text-black`}>Auto-reset at Midnight</label>
        <div className={`relative inline-block w-12 h-6 rounded-full bg-slate-200`}>
          <input
            type="checkbox"
            className="sr-only"
            checked={userSettings.dailyFlow.autoReset}
            onChange={(e) => setUserSettings({
              ...userSettings,
              dailyFlow: { ...userSettings.dailyFlow, autoReset: e.target.checked }
            })}
          />
          <div
            className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform transform ${
              userSettings.dailyFlow.autoReset ? 'translate-x-6 bg-green-600' : 'bg-slate-400'
            }`}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className={`block text-sm text-black`}>Weekend Behavior</label>
        <select
          className={`w-full ${getThemeClasses('surface')} border ${getThemeClasses('border')} rounded-lg px-4 py-2 text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
          value={userSettings.dailyFlow.weekendMode}
          onChange={(e) => setUserSettings({
            ...userSettings,
            dailyFlow: { ...userSettings.dailyFlow, weekendMode: e.target.value }
          })}
        >
          <option value="normal">Normal Flow</option>
          <option value="rest">Rest + Review Only</option>
        </select>
      </div>
    </div>
  );

  const renderAssistantSection = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className={`block text-sm ${getThemeClasses('heading')} text-black`}>Tone Preference</label>
        <select
          className={`w-full ${getThemeClasses('surface')} border ${getThemeClasses('border')} rounded-lg px-4 py-2 text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
          value={userSettings.assistant.tone}
          onChange={(e) => setUserSettings({
            ...userSettings,
            assistant: { ...userSettings.assistant, tone: e.target.value }
          })}
        >
          <option value="neutral">Neutral</option>
          <option value="motivational">Motivational</option>
          <option value="chill">Chill / Empathic</option>
          <option value="drill-sergeant">Drill-sergeant (Hard Mode)</option>
        </select>
      </div>

      <div className="flex items-center justify-between">
        <label className={`text-sm text-black`}>Emotional Intelligence Mode</label>
        <div className={`relative inline-block w-12 h-6 rounded-full bg-slate-200`}>
          <input
            type="checkbox"
            className="sr-only"
            checked={userSettings.assistant.emotionalIntelligence}
            onChange={(e) => setUserSettings({
              ...userSettings,
              assistant: { ...userSettings.assistant, emotionalIntelligence: e.target.checked }
            })}
          />
          <div
            className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform transform ${
              userSettings.assistant.emotionalIntelligence ? 'translate-x-6 bg-green-600' : 'bg-slate-400'
            }`}
          />
        </div>
      </div>
    </div>
  );

  const renderAccessibilitySection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <label className={`text-sm text-black`}>High Contrast Mode</label>
        <div className={`relative inline-block w-12 h-6 rounded-full bg-slate-200`}>
          <input
            type="checkbox"
            className="sr-only"
            checked={userSettings.accessibility.highContrast}
            onChange={(e) => setUserSettings({
              ...userSettings,
              accessibility: { ...userSettings.accessibility, highContrast: e.target.checked }
            })}
          />
          <div
            className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform transform ${
              userSettings.accessibility.highContrast ? 'translate-x-6 bg-green-600' : 'bg-slate-400'
            }`}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className={`text-sm text-black`}>Larger Text</label>
        <div className={`relative inline-block w-12 h-6 rounded-full bg-slate-200`}>
          <input
            type="checkbox"
            className="sr-only"
            checked={userSettings.accessibility.largerText}
            onChange={(e) => setUserSettings({
              ...userSettings,
              accessibility: { ...userSettings.accessibility, largerText: e.target.checked }
            })}
          />
          <div
            className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform transform ${
              userSettings.accessibility.largerText ? 'translate-x-6 bg-green-600' : 'bg-slate-400'
            }`}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className={`text-sm text-black`}>Reduced Motion</label>
        <div className={`relative inline-block w-12 h-6 rounded-full bg-slate-200`}>
          <input
            type="checkbox"
            className="sr-only"
            checked={userSettings.accessibility.reducedMotion}
            onChange={(e) => setUserSettings({
              ...userSettings,
              accessibility: { ...userSettings.accessibility, reducedMotion: e.target.checked }
            })}
          />
          <div
            className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform transform ${
              userSettings.accessibility.reducedMotion ? 'translate-x-6 bg-green-600' : 'bg-slate-400'
            }`}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className={`text-sm text-black`}>Screen Reader Support</label>
        <div className={`relative inline-block w-12 h-6 rounded-full bg-slate-200`}>
          <input
            type="checkbox"
            className="sr-only"
            checked={userSettings.accessibility.screenReader}
            onChange={(e) => setUserSettings({
              ...userSettings,
              accessibility: { ...userSettings.accessibility, screenReader: e.target.checked }
            })}
          />
          <div
            className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform transform ${
              userSettings.accessibility.screenReader ? 'translate-x-6 bg-green-600' : 'bg-slate-400'
            }`}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className={`block text-sm ${getThemeClasses('heading')} text-black`}>Color Blind Mode</label>
        <select
          className={`w-full ${getThemeClasses('surface')} border ${getThemeClasses('border')} rounded-lg px-4 py-2 text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
          value={userSettings.accessibility.colorBlindMode}
          onChange={(e) => setUserSettings({
            ...userSettings,
            accessibility: { ...userSettings.accessibility, colorBlindMode: e.target.value }
          })}
        >
          <option value="none">None</option>
          <option value="protanopia">Protanopia (Red-Blind)</option>
          <option value="deuteranopia">Deuteranopia (Green-Blind)</option>
          <option value="tritanopia">Tritanopia (Blue-Blind)</option>
          <option value="achromatopsia">Achromatopsia (Complete Color Blindness)</option>
        </select>
      </div>
    </div>
  );

  const renderAdvancedSection = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className={`block text-sm ${getThemeClasses('heading')} text-black`}>Enable Experimental Agents</label>
        <div className="flex items-center justify-between">
          <div className={`relative inline-block w-12 h-6 rounded-full bg-slate-200`}>
            <input
              type="checkbox"
              className="sr-only"
              checked={userSettings.advanced.experimentalAgents}
              onChange={(e) => setUserSettings({
                ...userSettings,
                advanced: { ...userSettings.advanced, experimentalAgents: e.target.checked }
              })}
            />
            <div
              className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform transform ${
                userSettings.advanced.experimentalAgents ? 'translate-x-6 bg-green-600' : 'bg-slate-400'
              }`}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className={`block text-sm ${getThemeClasses('heading')} text-black`}>Health Data Integration</label>
        <div className="flex items-center justify-between">
          <div className={`relative inline-block w-12 h-6 rounded-full bg-slate-200`}>
            <input
              type="checkbox"
              className="sr-only"
              checked={userSettings.advanced.healthData}
              onChange={(e) => setUserSettings({
                ...userSettings,
                advanced: { ...userSettings.advanced, healthData: e.target.checked }
              })}
            />
            <div
              className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform transform ${
                userSettings.advanced.healthData ? 'translate-x-6 bg-green-600' : 'bg-slate-400'
              }`}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className={`block text-sm ${getThemeClasses('heading')} text-black`}>GPT Model Version</label>
        <select
          className={`w-full ${getThemeClasses('surface')} border ${getThemeClasses('border')} rounded-lg px-4 py-2 text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
          value={userSettings.advanced.modelVersion}
          onChange={(e) => setUserSettings({
            ...userSettings,
            advanced: { ...userSettings.advanced, modelVersion: e.target.value }
          })}
        >
          <option value="default">Default</option>
          <option value="gpt4">GPT-4 (Premium)</option>
          <option value="gpt3">GPT-3.5</option>
        </select>
      </div>
    </div>
  );

  const renderPrivacySection = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className={`block text-sm ${getThemeClasses('heading')} text-black`}>Data Privacy</label>
        <p className={`text-sm text-black mb-4`}>Control whether AI models save your data for model improvement.</p>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className={`${getThemeClasses('heading')} text-black font-medium`}>Prevent Data Saving</h4>
            <p className={`text-sm text-black`}>When enabled, your data will not be saved by AI models</p>
          </div>
          <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
            <input
              type="checkbox"
              id="dataSavingToggle"
              className="absolute w-0 h-0 opacity-0"
              checked={!userSettings.privacy.dataSaving}
              onChange={(e) => setUserSettings({
                ...userSettings,
                privacy: { ...userSettings.privacy, dataSaving: !e.target.checked }
              })}
            />
            <label
              htmlFor="dataSavingToggle"
              className={`block h-6 overflow-hidden cursor-pointer rounded-full ${
                !userSettings.privacy.dataSaving ? 'translate-x-6 bg-green-600' : 'bg-slate-400'
              }`}
            >
              <span
                className={`absolute block w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0 transition-transform duration-200 ease-in-out transform ${
                  !userSettings.privacy.dataSaving ? 'translate-x-6' : 'translate-x-0'
                }`}
              ></span>
            </label>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 my-6 pt-6"></div>

      <div className="space-y-2">
        <label className={`block text-sm ${getThemeClasses('heading')} text-black`}>Connected Apps</label>
        <p className={`text-sm text-black mb-4`}>Manage connections to third-party apps and services.</p>
        
        <div className="space-y-3">
          {connectedApps.map(app => (
            <div key={app.id} className={`p-4 border ${getThemeClasses('border')} rounded-lg`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{app.icon}</span>
                  <div>
                    <h4 className={`${getThemeClasses('heading')} text-black font-medium`}>{app.name}</h4>
                    <p className={`text-sm text-black`}>{app.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleAppConnection(app.id)}
                  className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${
                    app.connected 
                      ? 'bg-red-100 text-red-600 hover:bg-red-200'
                      : 'bg-green-100 text-green-600 hover:bg-green-200'
                  }`}
                >
                  {app.connected ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <div className="p-4 border border-dashed border-gray-300 rounded-lg">
            <div className="flex flex-col items-center text-center">
              <span className="text-2xl mb-2">🔄</span>
              <h4 className={`${getThemeClasses('heading')} text-black font-medium`}>Import Tasks</h4>
              <p className={`text-sm text-black mb-3`}>Import your tasks from other applications</p>
              
              <div className="flex flex-wrap justify-center gap-2">
                <button 
                  onClick={() => handleImport('todoist')}
                  className={`px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm`}
                >
                  Todoist
                </button>
                <button 
                  onClick={() => handleImport('asana')}
                  className={`px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm`}
                >
                  Asana
                </button>
                <button 
                  onClick={() => handleImport('trello')}
                  className={`px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm`}
                >
                  Trello
                </button>
                <button 
                  onClick={() => handleImport('microsoft')}
                  className={`px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm`}
                >
                  Microsoft To Do
                </button>
                <button 
                  onClick={() => handleImport('google')}
                  className={`px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm`}
                >
                  Google Tasks
                </button>
                <button 
                  onClick={() => handleImport('csv')}
                  className={`px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm`}
                >
                  CSV File
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="p-4 border border-dashed border-gray-300 rounded-lg">
            <div className="flex flex-col items-center text-center">
              <span className="text-2xl mb-2">📤</span>
              <h4 className={`${getThemeClasses('heading')} text-black font-medium`}>Export Your Data</h4>
              <p className={`text-sm text-black mb-3`}>Download your data in various formats</p>
              
              <div className="flex flex-wrap justify-center gap-2">
                <button className={`px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm`}>
                  JSON
                </button>
                <button className={`px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm`}>
                  CSV
                </button>
                <button className={`px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm`}>
                  PDF Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 my-6 pt-6"></div>

      <div className="space-y-2">
        <label className={`block text-sm ${getThemeClasses('heading')} text-black`}>Reset Assistant Memory</label>
        <p className={`text-sm text-black`}>Clear all conversation history and learned preferences. This cannot be undone.</p>
        <button className={`px-4 py-2 ${getThemeClasses('button')} bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition-colors`}>
          Reset Memory
        </button>
      </div>

      <div className="space-y-2">
        <label className={`block text-sm ${getThemeClasses('heading')} text-black`}>Danger Zone</label>
        <p className={`text-sm text-black`}>Delete all progress, including quests, achievements, and statistics. This action is permanent.</p>
        <button className={`px-4 py-2 ${getThemeClasses('button')} bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors`}>
          Delete All Progress
        </button>
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileSection();
      case 'appearance':
        return renderAppearanceSection();
      case 'dailyFlow':
        return renderDailyFlowSection();
      case 'assistant':
        return renderAssistantSection();
      case 'accessibility':
        return renderAccessibilitySection();
      case 'advanced':
        return renderAdvancedSection();
      case 'privacy':
        return renderPrivacySection();
      default:
        return null;
    }
  };

  return (
    <div className={`flex flex-col min-h-screen ${getThemeClasses('background')} text-black pb-navigation`}>
      {/* Header */}
      <header className={`${getThemeClasses('surface')} p-4 border-b ${getThemeClasses('border')}`}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className={`text-black ${getThemeClasses('heading')} text-xl`}>Settings</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-4 max-w-4xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="space-y-2">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  activeSection === section.id
                    ? `${getThemeClasses('surface')} border ${getThemeClasses('border')}`
                    : `hover:${getThemeClasses('surface')} hover:opacity-80`
                }`}
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{section.icon}</span>
                  <div>
                    <h3 className={`${getThemeClasses('heading')} text-black font-medium`}>
                      {section.title}
                    </h3>
                    <p className={`text-sm text-black`}>{section.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className={`md:col-span-3 ${getThemeClasses('surface')} rounded-lg p-6 border ${getThemeClasses('border')}`}>
            <h2 className={`${getThemeClasses('heading')} text-black text-2xl mb-6`}>
              {sections.find(s => s.id === activeSection)?.title}
            </h2>
            {renderActiveSection()}
          </div>
        </div>
      </div>

      {/* Import Modal */}
      {importModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`${getThemeClasses('surface')} max-w-md w-full rounded-lg p-6 shadow-xl`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`${getThemeClasses('heading')} text-black text-xl`}>
                Import from {selectedImportSource && selectedImportSource.charAt(0).toUpperCase() + selectedImportSource.slice(1)}
              </h3>
              <button 
                onClick={closeImportModal}
                className="text-gray-400 hover:text-gray-500"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              {selectedImportSource === 'csv' ? (
                <div>
                  <p className="text-sm text-black mb-3">Upload a CSV file with your tasks</p>
                  <label className="block w-full cursor-pointer">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                      <span className="text-3xl block mb-2">📄</span>
                      <span className="text-sm text-gray-600">Click to upload CSV file</span>
                      <input type="file" accept=".csv" className="hidden" />
                    </div>
                  </label>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-black mb-3">
                    You'll be redirected to authorize access to your {selectedImportSource} account
                  </p>
                  <button className={`w-full py-2 ${getThemeClasses('button')} bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors`}>
                    Continue to {selectedImportSource}
                  </button>
                </div>
              )}
              
              <div className="flex justify-end mt-6">
                <button 
                  onClick={closeImportModal}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
