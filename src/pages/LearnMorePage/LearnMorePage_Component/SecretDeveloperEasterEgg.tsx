import React, { useState, useEffect, useRef } from "react";
import {
  Code,
  Zap,
  Bug,
  Terminal,
  Keyboard,
  Key,
  Cpu,
  Settings,
  GitBranch,
  GitPullRequest,
  FileCode,
  TerminalSquare,
  Server,
  Globe,
  Search,
} from "lucide-react";

interface DevTool {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  command: string;
  active: boolean;
}

interface DevStat {
  label: string;
  value: string | number;
  change: string;
  trend: "up" | "down" | "neutral";
}

interface DevNote {
  id: number;
  author: string;
  date: string;
  content: string;
  tags: string[];
}

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const SecretDeveloperEasterEgg: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [currentInput, setCurrentInput] = useState<string>("");
  const [secretPhrase, setSecretPhrase] = useState<string>("devmode");
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [konami, setKonami] = useState<string[]>([]);
  const [devStats, setDevStats] = useState<DevStat[]>([
    { label: "API Response Time", value: "42ms", change: "12%", trend: "down" },
    { label: "Translation Speed", value: 156, change: "8%", trend: "up" },
    { label: "Memory Usage", value: "28MB", change: "3%", trend: "up" },
    { label: "Cache Hit Rate", value: "94%", change: "2%", trend: "up" },
    { label: "Active Sessions", value: 1289, change: "15%", trend: "up" },
    { label: "Error Rate", value: "0.02%", change: "50%", trend: "down" },
  ]);
  const [devNotes, setDevNotes] = useState<DevNote[]>([
    {
      id: 1,
      author: "Sarah",
      date: "2023-05-12",
      content:
        "Implemented the new neural translation model. Improved speed by 35% for common language pairs.",
      tags: ["model", "performance"],
    },
    {
      id: 2,
      author: "Miguel",
      date: "2023-06-03",
      content:
        "Fixed edge case in Arabic right-to-left rendering when mixed with embedded English content.",
      tags: ["bugfix", "rtl-support"],
    },
    {
      id: 3,
      author: "Akira",
      date: "2023-06-18",
      content:
        "Added experimental support for Swahili dialect variations. Need more training data.",
      tags: ["languages", "experimental"],
    },
  ]);
  const [devTools, setDevTools] = useState<DevTool[]>([
    {
      id: "perf",
      title: "Performance Analyzer",
      description: "Analyze the rendering performance of the application",
      icon: <Zap size={18} />,
      command: "perf",
      active: false,
    },
    {
      id: "debug",
      title: "Debug Mode",
      description: "Show detailed debug information in console",
      icon: <Bug size={18} />,
      command: "debug",
      active: false,
    },
    {
      id: "inspect",
      title: "Translation Inspector",
      description: "Inspect translation pipeline process step by step",
      icon: <Search size={18} />,
      command: "inspect",
      active: false,
    },
    {
      id: "api",
      title: "API Explorer",
      description: "Access raw API endpoints and response data",
      icon: <Server size={18} />,
      command: "api",
      active: false,
    },
    {
      id: "mocklang",
      title: "Mock Languages",
      description: "Generate development test data for new languages",
      icon: <Globe size={18} />,
      command: "mocklang",
      active: false,
    },
  ]);
  const [newNoteContent, setNewNoteContent] = useState<string>("");
  const [newNoteTags, setNewNoteTags] = useState<string>("");
  const [showHint, setShowHint] = useState<boolean>(true);
  const [showKonamiHint, setShowKonamiHint] = useState<boolean>(false);
  const [revealedEasterEggs, setRevealedEasterEggs] = useState<string[]>([]);

  const easterEggContainerRef = useRef<HTMLDivElement>(null);
  const konamiSequence = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Track Konami code sequence
      if (konamiSequence.includes(e.key)) {
        const newKonami = [...konami, e.key];
        setKonami(newKonami);

        // Check if konami sequence is complete
        const sequenceLength = Math.min(
          newKonami.length,
          konamiSequence.length
        );
        const currentSequence = newKonami.slice(
          newKonami.length - sequenceLength
        );

        if (
          sequenceLength === konamiSequence.length &&
          currentSequence.every((key, i) => key === konamiSequence[i])
        ) {
          setIsVisible(true);
          setActiveTab("konami");
          setRevealedEasterEggs((prev) => [...prev, "konami"]);
          setKonami([]);
        }
      }

      // Track regular typing for the secret phrase
      if (e.key.length === 1 && /[a-zA-Z0-9]/.test(e.key)) {
        setCurrentInput((prev) => {
          const newInput = (prev + e.key).slice(-secretPhrase.length);

          // Check if secret phrase is typed
          if (newInput.toLowerCase() === secretPhrase.toLowerCase()) {
            setIsVisible(true);
            setRevealedEasterEggs((prev) => [...prev, "devmode"]);
            return "";
          }

          return newInput;
        });
      } else if (e.key === "Escape") {
        setIsVisible(false);
      } else if (e.key === "?") {
        setShowHint((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [konami, secretPhrase]);

  // Show Konami hint after 30 seconds of page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowKonamiHint(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  // Toggle developer tools
  const toggleDevTool = (id: string) => {
    setDevTools((tools) =>
      tools.map((tool) =>
        tool.id === id ? { ...tool, active: !tool.active } : tool
      )
    );

    // Mock console output when activating tools
    if (!devTools.find((tool) => tool.id === id)?.active) {
      console.log(`[DEV] Activated ${id} tool`);

      if (id === "debug") {
        console.log("[DEBUG] Debug mode initialized");
        console.log("[DEBUG] Environment:", process.env.NODE_ENV);
        console.log("[DEBUG] React version:", React.version);
      }

      if (id === "perf") {
        console.log("[PERF] Starting performance measurement...");
        console.time("performanceAnalysis");
        setTimeout(() => {
          console.timeEnd("performanceAnalysis");
          console.log("[PERF] Component render time: 24.8ms");
          console.log("[PERF] API call overhead: 112ms");
          console.log("[PERF] Translation processing: 38.2ms/request");
        }, 500);
      }
    }
  };

  // Add secret phrase tracking
  useEffect(() => {
    if (currentInput === secretPhrase) {
      setIsVisible(true);
      setSecretPhrase(""); // Reset after successful entry
    }
  }, [currentInput, secretPhrase]);

  // Add dynamic stats updates
  useEffect(() => {
    const updateInterval = setInterval(() => {
      setDevStats((prevStats) =>
        prevStats.map((stat) => {
          // Randomly update some stats
          if (Math.random() > 0.7) {
            const change = Math.floor(Math.random() * 10);
            const newValue =
              typeof stat.value === "number" ? stat.value + change : stat.value;

            return {
              ...stat,
              value: newValue,
              change: `${change}%`,
              trend: Math.random() > 0.5 ? "up" : "down",
            };
          }
          return stat;
        })
      );
    }, 5000); // Update every 5 seconds

    return () => clearInterval(updateInterval);
  }, []);

  // Add secret phrase customization
  const updateSecretPhrase = (newPhrase: string) => {
    if (newPhrase && newPhrase.length >= 4) {
      setSecretPhrase(newPhrase);
      console.log("Secret phrase updated!");
    }
  };

  // Add new developer note
  const addDevNote = () => {
    if (newNoteContent.trim()) {
      const newNote: DevNote = {
        id: Date.now(),
        author: "You",
        date: new Date().toISOString().split("T")[0],
        content: newNoteContent,
        tags: newNoteTags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      };

      setDevNotes((prev) => [newNote, ...prev]);
      setNewNoteContent("");
      setNewNoteTags("");
    }
  };

  // Format the trend indicator
  const renderTrend = (trend: "up" | "down" | "neutral", change: string) => {
    const colors = {
      up: "text-green-500",
      down:
        trend === "down" && change.includes("Error")
          ? "text-red-500"
          : "text-green-500",
      neutral: "text-gray-500",
    };

    return (
      <span className={`inline-flex items-center ${colors[trend]}`}>
        {trend === "up" && "↑"}
        {trend === "down" && "↓"}
        {trend === "neutral" && "→"}
        <span className="ml-1">{change}</span>
      </span>
    );
  };

  // Create tabs array with conditional konami tab
  const getTabs = (): TabItem[] => {
    const baseTabs: TabItem[] = [
      { id: "dashboard", label: "Dashboard", icon: <Cpu size={14} /> },
      { id: "tools", label: "Dev Tools", icon: <Settings size={14} /> },
      { id: "notes", label: "Dev Notes", icon: <FileCode size={14} /> },
      { id: "terminal", label: "Terminal", icon: <Terminal size={14} /> },
    ];

    // Add the konami tab conditionally
    if (activeTab === "konami") {
      baseTabs.push({
        id: "konami",
        label: "⭐ Konami Reward",
        icon: <Zap size={14} />,
      });
    }

    return baseTabs;
  };

  // If the easter egg isn't triggered, render a subtle indicator
  if (!isVisible) {
    return (
      <div className="relative">
        {showHint && (
          <div className="fixed bottom-4 right-4 p-2 bg-white/90 rounded-lg shadow-lg border border-gray-200 text-sm text-gray-600 max-w-xs animate-fadeIn z-50">
            <p className="flex items-center">
              <Keyboard className="w-4 h-4 mr-2 text-gray-500" />
              <span>
                Psst! Type{" "}
                <code className="bg-gray-100 px-1 py-0.5 rounded text-blue-600 font-mono">
                  devmode
                </code>{" "}
                anywhere on this page for developer tools.
              </span>
            </p>
            {showKonamiHint && (
              <p className="mt-2 text-xs text-gray-500 italic">
                There might be another secret combination too...
              </p>
            )}
            <button
              title="Close hint"
              className="absolute top-1 right-1 text-gray-400 hover:text-gray-600"
              onClick={() => setShowHint(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      ref={easterEggContainerRef}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={(e) => {
        if (e.target === easterEggContainerRef.current) {
          setIsVisible(false);
        }
      }}
    >
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-xl shadow-2xl flex flex-col">
        {/* Header bar */}
        <div className="bg-gray-800 text-white p-3 flex items-center justify-between">
          <div className="flex items-center">
            <Code className="mr-2" />
            <h2 className="font-mono text-sm sm:text-base">
              Translation Platform Developer Console v1.3.7
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
              CONNECTED
            </span>
            <button
              title="Close developer console"
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="bg-gray-100 border-b border-gray-200 overflow-x-auto">
          <div className="flex whitespace-nowrap">
            {getTabs().map((tab) => (
              <button
                key={tab.id}
                className={`px-3 py-2 flex items-center text-xs sm:text-sm font-medium ${
                  activeTab === tab.id
                    ? "border-b-2 border-blue-500 bg-white text-blue-600"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="mr-1.5">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-800">
                  Developer Dashboard
                </h3>
                <div className="text-xs text-gray-500">
                  {new Date().toLocaleString()}
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {devStats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="text-sm text-gray-500">{stat.label}</div>
                    <div className="mt-1 flex items-end justify-between">
                      <div className="text-2xl font-semibold text-gray-800">
                        {stat.value}
                      </div>
                      <div className="text-xs">
                        {renderTrend(stat.trend, stat.change)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Translation status */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Supported Languages Status
                </h4>
                <div className="h-16 relative bg-gray-100 rounded-lg overflow-hidden">
                  <div
                    className="absolute bottom-0 left-0 h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-l-lg"
                    style={{ width: "65%" }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-semibold">65 / 100 Languages</span>
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <div>
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                    Active: 52
                  </div>
                  <div>
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1"></span>
                    Beta: 13
                  </div>
                  <div>
                    <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-1"></span>
                    In Development: 22
                  </div>
                  <div>
                    <span className="inline-block w-2 h-2 rounded-full bg-gray-500 mr-1"></span>
                    Planned: 13
                  </div>
                </div>
              </div>

              {/* Version control info */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <GitBranch size={16} className="mr-1.5" />
                  Version Control
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center py-1 border-b border-gray-100">
                    <div className="flex items-center text-gray-700">
                      <span className="font-mono">Branch:</span>
                    </div>
                    <code className="bg-gray-100 px-2 py-0.5 rounded text-gray-800 font-mono">
                      main
                    </code>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-100">
                    <div className="flex items-center text-gray-700">
                      <span className="font-mono">Latest commit:</span>
                    </div>
                    <code className="bg-gray-100 px-2 py-0.5 rounded text-gray-800 font-mono">
                      8f4e2a7
                    </code>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-100">
                    <div className="flex items-center text-gray-700">
                      <span className="font-mono">Pull requests:</span>
                    </div>
                    <div className="flex items-center">
                      <GitPullRequest
                        size={14}
                        className="mr-1.5 text-purple-500"
                      />
                      <span className="text-purple-500 font-medium">
                        3 open
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "tools" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-1">
                  Developer Tools
                </h3>
                <p className="text-sm text-gray-600">
                  Activate tools for debugging and performance analysis
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {devTools.map((tool) => (
                  <div
                    key={tool.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      tool.active
                        ? "border-blue-500 bg-blue-50 shadow-sm"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                    onClick={() => toggleDevTool(tool.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div
                          className={`p-2 rounded-md mr-3 ${
                            tool.active
                              ? "bg-blue-100 text-blue-600"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {tool.icon}
                        </div>
                        <div>
                          <h4 className="font-medium">{tool.title}</h4>
                          <p className="text-sm text-gray-600 mt-0.5">
                            {tool.description}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full flex-shrink-0 ${
                          tool.active ? "bg-blue-500" : "bg-gray-200"
                        }`}
                      ></div>
                    </div>

                    <div
                      className={`mt-3 pt-3 border-t border-gray-100 ${
                        tool.active ? "" : "hidden"
                      }`}
                    >
                      <div className="text-xs bg-gray-800 text-green-400 font-mono p-2 rounded">
                        &gt; {tool.command} --initialized
                      </div>
                      {tool.id === "debug" && tool.active && (
                        <div className="mt-2 text-xs text-gray-600">
                          Check your browser console (F12) for debug output
                        </div>
                      )}
                      {tool.id === "perf" && tool.active && (
                        <div className="mt-2 text-xs font-medium text-blue-600">
                          Performance analysis complete. Check console.
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="p-2 bg-amber-100 text-amber-600 rounded-md mr-3">
                    <Key size={18} />
                  </div>
                  <div>
                    <h4 className="font-medium text-amber-800">
                      Command Shortcuts
                    </h4>
                    <div className="mt-2 space-y-1 text-sm text-amber-700">
                      <p>
                        <code className="bg-amber-100 px-1.5 py-0.5 rounded">
                          Esc
                        </code>{" "}
                        - Close developer tools
                      </p>
                      <p>
                        <code className="bg-amber-100 px-1.5 py-0.5 rounded">
                          ?
                        </code>{" "}
                        - Toggle hint visibility
                      </p>
                      {revealedEasterEggs.includes("konami") && (
                        <p>
                          <code className="bg-amber-100 px-1.5 py-0.5 rounded">
                            ↑↑↓↓←→←→ba
                          </code>{" "}
                          - Konami code activated!
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notes" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-1">
                  Developer Notes
                </h3>
                <p className="text-sm text-gray-600">
                  Internal notes from the development team
                </p>
              </div>

              {/* Add new note form */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Add New Note
                </h4>
                <div className="space-y-3">
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    rows={3}
                    placeholder="Write your developer note here..."
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                  ></textarea>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <input
                      type="text"
                      className="flex-1 px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="Tags (comma separated)"
                      value={newNoteTags}
                      onChange={(e) => setNewNoteTags(e.target.value)}
                    />
                    <button
                      className="px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
                      onClick={addDevNote}
                    >
                      Add Note
                    </button>
                  </div>
                </div>
              </div>

              {/* Notes list */}
              <div className="space-y-4">
                {devNotes.map((note) => (
                  <div
                    key={note.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
                          {note.author.charAt(0)}
                        </div>
                        <div className="ml-2">
                          <div className="font-medium text-gray-800">
                            {note.author}
                          </div>
                          <div className="text-xs text-gray-500">
                            {note.date}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 text-gray-600">{note.content}</div>
                    {note.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {note.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "terminal" && (
            <div className="flex flex-col h-full">
              <div className="font-mono text-sm flex-1 bg-gray-900 text-green-400 p-3 rounded-lg overflow-y-auto">
                <div className="text-white mb-2">
                  Translation Platform Terminal v1.3.7
                </div>
                <div className="text-gray-400 mb-2">
                  Type 'help' for a list of commands
                </div>
                <div>&gt; _</div>
              </div>
              <div className="text-xs text-gray-500 mt-2">
                The terminal is currently in demo mode. Interactive commands
                coming soon.
              </div>
            </div>
          )}

          {activeTab === "konami" && (
            <div className="text-center py-8">
              <div className="inline-block p-4 bg-yellow-100 text-yellow-800 rounded-full mb-4 animate-pulse">
                <Zap size={48} />
              </div>
              <h3 className="text-xl font-bold mb-2">
                You've found the Konami code easter egg!
              </h3>
              <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                As a reward, here's a secret: we're planning to add AI-powered
                dialect detection in the next release.
              </p>
              <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-4 rounded-lg inline-block font-mono">
                Bonus feature unlocked: Try typing "gpt" mode now!
              </div>
            </div>
          )}
        </div>

        {/* Add secret phrase configuration */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <Key size={16} className="mr-1.5" />
            Secret Phrase Configuration
          </h4>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="New secret phrase"
              className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateSecretPhrase(e.currentTarget.value);
                  e.currentTarget.value = "";
                }
              }}
            />
            <div className="text-xs text-gray-500 flex items-center">
              Current: {secretPhrase}
            </div>
          </div>
        </div>

        {/* Previous stats grid with live updates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {devStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="text-sm text-gray-500">{stat.label}</div>
              <div className="mt-1 flex items-end justify-between">
                <div className="text-2xl font-semibold text-gray-800">
                  {stat.value}
                </div>
                <div className="text-xs">
                  {renderTrend(stat.trend, stat.change)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-200 p-3 text-xs text-gray-500 flex justify-between items-center">
          <div>Translation Platform • Developer Build</div>
          <div className="flex items-center">
            <span className="flex items-center mr-3">
              <Terminal size={12} className="mr-1" />
              v1.3.7-dev
            </span>
            <span className="flex items-center">
              <TerminalSquare size={12} className="mr-1" />
              Node {process.versions.node || "16.x"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecretDeveloperEasterEgg;
