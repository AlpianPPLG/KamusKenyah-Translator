import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Languages,
  ArrowRight,
  ArrowLeftRight,
  Copy,
  Volume2,
  History,
  Check,
  Star,
  Clock,
  X,
} from "lucide-react";
import { fetchTranslationData } from "../../api/translatorApi"; // Import API
import VoiceInput from "./VoiceInput";

interface Translation {
  id: number;
  from: string;
  to: string;
  text: string;
  translatedText: string;
  timestamp: Date;
}

const Hero: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isSwapped, setIsSwapped] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("ID"); // Default language is Indonesian
  const [recentTranslations, setRecentTranslations] = useState<Translation[]>([
    {
      id: 1,
      from: "Indonesia",
      to: "Dayak Kenyah",
      text: "Saya Suka Ngopi",
      translatedText: "Ake Uba Ngopi",
      timestamp: new Date(),
    },
    {
      id: 2,
      from: "Indonesia",
      to: "Dayak Kenyah",
      text: "Saya Makan",
      translatedText: "Ake Uman",
      timestamp: new Date(),
    },
  ]);

  useEffect(() => {
    if (inputText.length > 500) {
      alert("Karakter melebihi batas!");
      setInputText(inputText.slice(0, 500));
    }
  }, [inputText]);

  interface RecordType {
    [key: string]: string;
  }

  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);

    try {
      const response = await fetchTranslationData();
      console.log("API Response:", response); // Log the response for debugging
      console.log("Using selected language:", selectedLanguage); // Log the selected language

      if (response && response.record) {
        const words = inputText.toLowerCase().split(/\s+/); // Split input text into words
        const translations = words.map((word: string) => {
          if (isSwapped) {
            // Translate from Dayak Kenyah to Indonesian
            const entry = Object.entries(response.record).find(([, value]) =>
              (value as string).includes(word)
            );
            if (entry) {
              const [key, value] = entry;
              console.log(
                `Translating "${word}" from Dayak Kenyah to Indonesian using key "${key}" with value "${value}" (${selectedLanguage})`
              );
              return key; // Return the Indonesian word
            } else {
              console.log(`No exact match found for "${word}"`);
              // Attempt to find the closest match
              const closestMatch = findClosestMatch(
                word,
                Object.fromEntries(
                  Object.entries(response.record).map(([key, value]) => [
                    value,
                    key,
                  ])
                ) as RecordType
              );
              console.log(`Closest match for "${word}": "${closestMatch}"`);
              return closestMatch || word;
            }
          } else {
            // Translate from Indonesian to Dayak Kenyah
            const entry = Object.entries(response.record).find(([, value]) =>
              (value as string).includes(word)
            );
            if (entry) {
              const [key, value] = entry;
              console.log(
                `Translating "${word}" from Indonesian to Dayak Kenyah using key "${key}" with value "${value}" (${selectedLanguage})`
              );
              return value;
            } else {
              // Find the closest match if the word is not found
              const closestMatch = findClosestMatch(
                word,
                response.record as RecordType
              );
              console.log(
                `No exact match found for "${word}". Closest match: "${closestMatch}"`
              );
              return closestMatch || word; // Return the original word if no match is found
            }
          }
        });

        const translatedSentence = translations.join(" ");
        setTranslatedText(translatedSentence);

        const newTranslation: Translation = {
          id: Date.now(),
          from: isSwapped ? "Dayak Kenyah" : "Indonesia",
          to: isSwapped ? "Indonesia" : "Dayak Kenyah",
          text: inputText,
          translatedText: translatedSentence,
          timestamp: new Date(),
        };

        setRecentTranslations((prev) => [newTranslation, ...prev.slice(0, 4)]);
      } else {
        setTranslatedText("Gagal mengambil data terjemahan.");
      }
    } catch (error) {
      console.error("Error during translation:", error);
      setTranslatedText("Terjadi kesalahan dalam menerjemahkan.");
    } finally {
      setIsLoading(false);
    }
  };

  const findClosestMatch = (word: string, record: RecordType) => {
    let closestWord = null;
    let maxSimilarity = 0;

    for (const key in record) {
      const similarity = calculateSimilarity(word, key);
      if (similarity > maxSimilarity) {
        maxSimilarity = similarity;
        closestWord = record[key];
      }
    }

    return closestWord;
  };

  const calculateSimilarity = (word1: string, word2: string) => {
    // Simple similarity calculation based on common prefix and length
    const minLength = Math.min(word1.length, word2.length);
    let commonPrefixLength = 0;

    for (let i = 0; i < minLength; i++) {
      if (word1[i] === word2[i]) {
        commonPrefixLength++;
      } else {
        break;
      }
    }

    // Adjust the similarity calculation to consider the length of the words
    const lengthFactor =
      Math.min(word1.length, word2.length) /
      Math.max(word1.length, word2.length);
    return (commonPrefixLength / minLength) * lengthFactor;
  };

  const handleCopy = async () => {
    if (!translatedText) return;
    await navigator.clipboard.writeText(translatedText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSwapLanguages = () => {
    setIsSwapped(!isSwapped);
    setInputText(translatedText);
    setTranslatedText(inputText);
    // Update the selected language when swapping
    setSelectedLanguage(selectedLanguage === "ID" ? "DY" : "ID");
  };

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    // Reset text fields when changing language
    setInputText("");
    setTranslatedText("");
  };

  const characterLimit = 500;

  // Handle voice input transcript
  const handleVoiceInput = (transcript: string) => {
    setInputText(transcript);
  };

  // Function to speak text using SpeechSynthesis with Indonesian accent
  const handleSpeak = () => {
    if (translatedText) {
      // Clear any existing speech queue
      window.speechSynthesis.cancel();

      // Create new utterance
      const utterance = new SpeechSynthesisUtterance(translatedText);

      // Set language based on the target language (when not swapped, target is Dayak Kenyah)
      // When swapped, target is Indonesian
      utterance.lang = isSwapped ? "id-ID" : "id-ID"; // Use Indonesian for both since Dayak Kenyah isn't supported

      // Adjust speech rate and pitch for more natural speaking
      utterance.rate = 0.9; // Slightly slower than default (1.0)
      utterance.pitch = 1.1; // Slightly higher than default (1.0)

      // Get available voices
      const voices = window.speechSynthesis.getVoices();

      // Try to find Indonesian voice if available
      const indonesianVoice = voices.find(
        (voice) =>
          voice.lang.includes("id") || voice.name.includes("Indonesian")
      );

      // Use Indonesian voice if found
      if (indonesianVoice) {
        utterance.voice = indonesianVoice;
      }

      // Start speaking
      window.speechSynthesis.speak(utterance);

      // Log for debugging
      console.log("Speaking with voice:", utterance.voice?.name);
      console.log("Language:", utterance.lang);
      console.log("Selected language setting:", selectedLanguage);
    }
  };

  // Ensure voices list is loaded
  useEffect(() => {
    // Function to load voices
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };

    // Call once when component loads
    loadVoices();

    // Add event listener for voices changed
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    // Cleanup
    return () => {
      window.speechSynthesis.cancel();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  return (
    <section className="relative min-h-screen pt-20 overflow-hidden bg-gradient-to-b from-white to-blue-50">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Terjemahkan Bahasa{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Dayak Kenyah
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Platform terjemahan modern untuk melestarikan dan mempelajari
              bahasa Dayak Kenyah dengan mudah dan akurat
            </p>
            {/* New Buttons */}
            <div className="flex justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300 flex items-center gap-2"
              >
                Get Started
                <ArrowRight className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-300"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Language Selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-gray-100 rounded-lg">
            <button
              onClick={() => handleLanguageChange("ID")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedLanguage === "ID"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Bahasa Indonesia
            </button>
            <button
              onClick={() => handleLanguageChange("DY")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedLanguage === "DY"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Bahasa Dayak Kenyah
            </button>
          </div>
        </div>

        {/* Translation Box */}
        <motion.div
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button
            onClick={handleSwapLanguages}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <ArrowLeftRight className="h-6 w-6 text-blue-600 group-hover:rotate-180 transition-transform duration-300" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
            {/* Input Section */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Languages className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {isSwapped ? "Dayak Kenyah" : "Indonesia"} (
                    {selectedLanguage})
                  </span>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Deteksi Bahasa
                </button>
              </div>
              <div className="relative">
                <textarea
                  value={inputText}
                  onChange={(e) => {
                    if (e.target.value.length <= characterLimit) {
                      setInputText(e.target.value);
                    }
                  }}
                  placeholder={`Ketik atau tempel teks ${
                    isSwapped ? "Dayak Kenyah" : "Indonesia"
                  } di sini...`}
                  className="w-full h-40 resize-none border-0 focus:ring-0 text-gray-900 placeholder-gray-400 text-lg"
                />
                <div className="absolute bottom-2 right-2 text-sm text-gray-400">
                  {inputText.length}/{characterLimit}
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex space-x-4">
                  {/* Using VoiceInput component here */}
                  <VoiceInput
                    onTranscript={handleVoiceInput}
                    isDisabled={isLoading}
                  />
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative group"
                  >
                    <History className="h-5 w-5 text-gray-600" />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      History
                    </span>
                  </button>
                </div>
                <button
                  onClick={handleTranslate}
                  disabled={isLoading || !inputText.trim()}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isLoading || !inputText.trim()
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  <span>{isLoading ? "Menerjemahkan..." : "Terjemahkan"}</span>
                  <ArrowRight
                    className={`h-4 w-4 ${isLoading ? "animate-pulse" : ""}`}
                  />
                </button>
              </div>
            </div>

            {/* Output Section */}
            <div className="p-6 bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Languages className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {isSwapped ? "Indonesia" : "Dayak Kenyah"} (
                    {isSwapped
                      ? selectedLanguage === "DY"
                        ? "ID"
                        : "DY"
                      : selectedLanguage === "ID"
                      ? "DY"
                      : "ID"}
                    )
                  </span>
                </div>
                <div className="flex space-x-2">
                  <motion.button
                    onClick={handleSpeak}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors relative group"
                  >
                    <Volume2 className="h-5 w-5 text-gray-600" />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      Play Audio
                    </span>
                  </motion.button>
                  <button
                    onClick={handleCopy}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors relative group"
                  >
                    {isCopied ? (
                      <Check className="h-5 w-5 text-green-600" />
                    ) : (
                      <Copy className="h-5 w-5 text-gray-600" />
                    )}
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {isCopied ? "Copied!" : "Copy"}
                    </span>
                  </button>
                </div>
              </div>
              <div className="h-40 text-lg text-gray-600 relative">
                {translatedText || "Terjemahan akan muncul di sini..."}
                {isLoading && (
                  <div className="absolute inset-0 bg-gray-50 bg-opacity-90 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Translations Popup */}
        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-full max-w-2xl bg-white rounded-xl shadow-2xl p-4 z-20"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Translations
                </h3>
                <button
                  onClick={() => setShowHistory(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <div className="space-y-3">
                {recentTranslations.map((translation) => (
                  <motion.div
                    key={translation.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>
                          {new Date(translation.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500 mr-2">
                          Mode: {translation.from === "Indonesia" ? "ID" : "DY"}{" "}
                          → {translation.to === "Indonesia" ? "ID" : "DY"}
                        </span>
                        <button className="p-1 hover:bg-white rounded-full transition-colors">
                          <Star className="h-4 w-4 text-gray-400 hover:text-yellow-400" />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">
                          {translation.from}
                        </p>
                        <p className="text-sm text-gray-900">
                          {translation.text}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">
                          {translation.to}
                        </p>
                        <p className="text-sm text-gray-900">
                          {translation.translatedText}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Akurat & Cepat",
              description: `Terjemahan ${
                selectedLanguage === "ID"
                  ? "Indonesia ke Dayak Kenyah"
                  : "Dayak Kenyah ke Indonesia"
              } yang akurat dengan teknologi AI modern`,
              icon: "🎯",
            },
            {
              title: "Mudah Digunakan",
              description: "Antarmuka yang intuitif untuk semua pengguna",
              icon: "✨",
            },
            {
              title: "Pelestarian Budaya",
              description: "Membantu melestarikan bahasa Dayak Kenyah",
              icon: "🏺",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              className="text-center p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
