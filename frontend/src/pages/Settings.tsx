import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Theme, themes } from '../themes';

interface SettingsSection {
  id: string;
  title: string;
  icon: string;
  description: string;
}

const Settings: React.FC = () => {
  const { theme, setTheme, getThemeClasses } = useTheme();
  const [activeSection, setActiveSection] = useState('profile');
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
    }
  });

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
    const getThemePreviewClasses = (previewTheme: Theme) => {
      const previewConfig = themes[previewTheme];
      return {
        background: previewConfig.colors.background,
        surface: previewConfig.colors.surface,
        text: previewConfig.colors.text,
        primary: previewConfig.colors.primary,
        border: previewConfig.colors.border
      };
    };
    
    return (
      <div className="space-y-6">
        <div>
          <label className={`block text-sm ${getThemeClasses('heading')} text-black mb-2`}>
            Theme
          </label>
          <select
            value={userSettings.appearance.theme}
            onChange={(e) => handleThemeChange(e.target.value as Theme)}
            className={`w-full ${getThemeClasses('input')} text-black`}
          >
            <option value="System Blue">System Blue</option>
            <option value="rpg">RPG Style</option>
            <option value="Light Mode">Light Mode</option>
          </select>
          
          {/* Theme Preview */}
          <div className="mt-4">
            <p className={`text-sm text-black mb-2`}>Preview:</p>
            <div className={`border ${getThemeClasses('border')} rounded-lg overflow-hidden`}>
              <div className={`${getThemeClasses('surface')} p-3 border-b ${getThemeClasses('border')}`}>
                <div className="flex items-center">
                  <span className="mr-2">🧬</span>
                  <span className={`${getThemeClasses('heading')} text-black`}>
                    {userSettings.appearance.theme === 'rpg' ? 'Your Character Stats' : 'Character Stats'}
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
        <div className={`relative inline-block w-12 h-6 rounded-full ${userSettings.appearance.theme === 'Light Mode' ? 'bg-slate-200' : 'bg-gray-700'}`}>
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
              userSettings.dailyFlow.notifications ? 'translate-x-6 bg-blue-500' : userSettings.appearance.theme === 'Light Mode' ? 'bg-slate-400' : 'bg-gray-400'
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
        <div className={`relative inline-block w-12 h-6 rounded-full ${userSettings.appearance.theme === 'Light Mode' ? 'bg-slate-200' : 'bg-gray-700'}`}>
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
              userSettings.dailyFlow.autoReset ? 'translate-x-6 bg-blue-500' : userSettings.appearance.theme === 'Light Mode' ? 'bg-slate-400' : 'bg-gray-400'
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
        <div className={`relative inline-block w-12 h-6 rounded-full ${userSettings.appearance.theme === 'Light Mode' ? 'bg-slate-200' : 'bg-gray-700'}`}>
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
              userSettings.assistant.emotionalIntelligence ? 'translate-x-6 bg-blue-500' : userSettings.appearance.theme === 'Light Mode' ? 'bg-slate-400' : 'bg-gray-400'
            }`}
          />
        </div>
      </div>
    </div>
  );

  const renderAdvancedSection = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className={`block text-sm ${getThemeClasses('heading')} text-black`}>Enable Experimental Agents</label>
        <div className="flex items-center justify-between">
          <div className={`relative inline-block w-12 h-6 rounded-full ${userSettings.appearance.theme === 'Light Mode' ? 'bg-slate-200' : 'bg-gray-700'}`}>
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
                userSettings.advanced.experimentalAgents ? 'translate-x-6 bg-blue-500' : userSettings.appearance.theme === 'Light Mode' ? 'bg-slate-400' : 'bg-gray-400'
              }`}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className={`block text-sm ${getThemeClasses('heading')} text-black`}>Health Data Integration</label>
        <div className="flex items-center justify-between">
          <div className={`relative inline-block w-12 h-6 rounded-full ${userSettings.appearance.theme === 'Light Mode' ? 'bg-slate-200' : 'bg-gray-700'}`}>
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
                userSettings.advanced.healthData ? 'translate-x-6 bg-blue-500' : userSettings.appearance.theme === 'Light Mode' ? 'bg-slate-400' : 'bg-gray-400'
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
    </div>
  );
};

export default Settings;
