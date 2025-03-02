import React, { useState, useCallback } from "react";
import { Mic, Loader2, X } from "lucide-react";
import { motion } from "framer-motion";
import { useSpeechRecognition } from "../../hooks/useSpeechRecognition";

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  isDisabled?: boolean;
}

const VoiceInput: React.FC<VoiceInputProps> = ({
  onTranscript,
  isDisabled,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "error" | "info";
  } | null>(null);

  const showToast = (message: string, type: "error" | "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const onResult = useCallback(
    (transcript: string) => {
      onTranscript(transcript);
      setIsRecording(false);
    },
    [onTranscript]
  );

  const onError = useCallback((error: string) => {
    showToast(error, "error");
    setIsRecording(false);
  }, []);

  const { startListening, stopListening, hasPermission, isInitializing } =
    useSpeechRecognition({
      onResult,
      onError,
    });

  const handleToggleRecording = async () => {
    if (isRecording) {
      stopListening();
      setIsRecording(false);
    } else {
      if (!hasPermission) {
        showToast(
          "Please enable microphone access to use voice input.",
          "error"
        );
        return;
      }
      await startListening();
      setIsRecording(true);
    }
  };

  return (
    <div className="relative">
      {/* Tombol Voice Input */}
      <button
        disabled={isDisabled || isInitializing}
        onClick={handleToggleRecording}
        className="relative p-2 rounded-lg transition-colors bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
      >
        {isInitializing ? (
          <Loader2 className="h-5 w-5 animate-spin text-gray-600" />
        ) : isRecording ? (
          <>
            <Mic className="h-5 w-5 text-red-500" />
            <motion.div
              className="absolute inset-0 rounded-lg border-2 border-red-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </>
        ) : (
          <Mic className="h-5 w-5 text-gray-600" />
        )}
        <span className="sr-only">
          {isRecording ? "Stop Recording" : "Start Recording"}
        </span>
      </button>

      {/* Toast Notification */}
      {toast && (
        <div
          className={`absolute top-12 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg text-white ${
            toast.type === "error" ? "bg-red-500" : "bg-blue-500"
          }`}
        >
          <div className="flex items-center">
            <span>{toast.message}</span>
            <button
              onClick={() => setToast(null)}
              className="ml-3 p-1 bg-white bg-opacity-20 rounded-full"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceInput;
