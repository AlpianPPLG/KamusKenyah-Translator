
import React, { useState } from 'react';
import {
  Sun,
  Globe,
  Lock,
  Mail,
  Shield,
  Eye,
  ChevronRight,
  Languages,
  Palette,
  Volume2,
  Type
} from 'lucide-react';

interface Setting {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  options?: string[];
  value?: string | boolean;
  type: 'toggle' | 'select' | 'link';
}

interface SettingGroup {
  id: string;
  title: string;
  description: string;
  settings: Setting[];
}

const Settings = () => {
  const [activeTab, setActiveTab] = useState('appearance');
  const [settings, setSettings] = useState<SettingGroup[]>([
    {
      id: 'appearance',
      title: 'Appearance',
      description: 'Customize how the application looks and feels',
      settings: [
        {
          id: 'theme',
          title: 'Theme',
          description: 'Choose your preferred color theme',
          icon: <Palette className="w-5 h-5" />,
          type: 'select',
          options: ['Light', 'Dark', 'System'],
          value: 'System'
        },
        {
          id: 'textSize',
          title: 'Text Size',
          description: 'Adjust the size of text throughout the app',
          icon: <Type className="w-5 h-5" />,
          type: 'select',
          options: ['Small', 'Medium', 'Large'],
          value: 'Medium'
        }
      ]
    },
    {
      id: 'language',
      title: 'Language & Region',
      description: 'Manage your language and regional preferences',
      settings: [
        {
          id: 'appLanguage',
          title: 'App Language',
          description: 'Select your preferred language',
          icon: <Languages className="w-5 h-5" />,
          type: 'select',
          options: ['English', 'Indonesian', 'Japanese', 'Korean'],
          value: 'English'
        },
        {
          id: 'translateTo',
          title: 'Default Translation Language',
          description: 'Set your default translation target language',
          icon: <Globe className="w-5 h-5" />,
          type: 'select',
          options: ['English', 'Indonesian', 'Japanese', 'Korean'],
          value: 'Indonesian'
        }
      ]
    },
    {
      id: 'accessibility',
      title: 'Accessibility',
      description: 'Customize your accessibility preferences',
      settings: [
        {
          id: 'screenReader',
          title: 'Screen Reader',
          description: 'Enable or disable screen reader support',
          icon: <Eye className="w-5 h-5" />,
          type: 'toggle',
          value: false
        },
        {
          id: 'highContrast',
          title: 'High Contrast',
          description: 'Increase contrast for better visibility',
          icon: <Sun className="w-5 h-5" />,
          type: 'toggle',
          value: false
        }
      ]
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Manage your notification preferences',
      settings: [
        {
          id: 'emailNotifs',
          title: 'Email Notifications',
          description: 'Receive updates and alerts via email',
          icon: <Mail className="w-5 h-5" />,
          type: 'toggle',
          value: true
        },
        {
          id: 'soundNotifs',
          title: 'Sound Notifications',
          description: 'Play sounds for important events',
          icon: <Volume2 className="w-5 h-5" />,
          type: 'toggle',
          value: true
        }
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      description: 'Manage your security preferences and data',
      settings: [
        {
          id: 'twoFactor',
          title: 'Two-Factor Authentication',
          description: 'Add an extra layer of security',
          icon: <Shield className="w-5 h-5" />,
          type: 'link',
        },
        {
          id: 'dataCollection',
          title: 'Data Collection',
          description: 'Manage how we collect and use your data',
          icon: <Lock className="w-5 h-5" />,
          type: 'link',
        }
      ]
    }
  ]);

  const handleSettingChange = (groupId: string, settingId: string, newValue: string | boolean) => {
    setSettings(prevSettings => 
      prevSettings.map(group => 
        group.id === groupId
          ? {
              ...group,
              settings: group.settings.map(setting =>
                setting.id === settingId
                  ? { ...setting, value: newValue }
                  : setting
              )
            }
          : group
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-sm text-gray-600">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <nav className="space-y-1 lg:col-span-1">
          {settings.map((group) => (
            <button
              key={group.id}
              onClick={() => setActiveTab(group.id)}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                activeTab === group.id
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-900 hover:bg-gray-50'
              }`}
            >
              <span className="mr-3 flex-shrink-0">{group.title}</span>
              <ChevronRight
                className={`ml-auto h-5 w-5 transform transition-transform ${
                  activeTab === group.id ? 'rotate-90' : ''
                }`}
              />
            </button>
          ))}
        </nav>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {settings.map((group) => (
            <div
              key={group.id}
              className={`space-y-6 ${activeTab === group.id ? '' : 'hidden'}`}
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{group.title}</h2>
                <p className="mt-1 text-sm text-gray-500">{group.description}</p>
              </div>

              <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
                {group.settings.map((setting) => (
                  <div key={setting.id} className="p-4 sm:p-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <span className="p-2 bg-blue-50 rounded-lg text-blue-700">
                          {setting.icon}
                        </span>
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-base font-medium text-gray-900">
                          {setting.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {setting.description}
                        </p>
                      </div>
                      <div className="ml-4">
                        {setting.type === 'toggle' && (
                          <button
                            title={`Toggle ${setting.title}`}
                            aria-label={`Toggle ${setting.title}`}
                            onClick={() => handleSettingChange(group.id, setting.id, !setting.value)}
                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                              setting.value ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                setting.value ? 'translate-x-5' : 'translate-x-0'
                              }`}
                            />
                          </button>
                        )}
                        {setting.type === 'select' && setting.options && (
                          <select
                            title={`Select ${setting.title}`}
                            aria-label={`Select ${setting.title}`}
                            value={setting.value as string}
                            onChange={(e) => handleSettingChange(group.id, setting.id, e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                          >
                            {setting.options.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        )}
                        {setting.type === 'link' && (
                          <button
                            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                            onClick={() => {/* Handle navigation */}}
                          >
                            Configure
                            <ChevronRight className="inline-block w-4 h-4 ml-1" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
