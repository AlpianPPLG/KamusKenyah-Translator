import { useState, useEffect, useCallback } from "react";

interface UseSpeechRecognitionProps {
  onResult: (transcript: string) => void;
  onError: (error: string) => void;
}

interface UseSpeechRecognitionReturn {
  startListening: () => Promise<void>;
  stopListening: () => void;
  hasPermission: boolean;
  isInitializing: boolean;
}

export function useSpeechRecognition({
  onResult,
  onError,
}: UseSpeechRecognitionProps): UseSpeechRecognitionReturn {
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );
  const [hasPermission, setHasPermission] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializeSpeechRecognition = async () => {
      try {
        // Check if browser supports speech recognition
        if (
          !("webkitSpeechRecognition" in window) &&
          !("SpeechRecognition" in window)
        ) {
          throw new Error(
            "Speech recognition is not supported in this browser"
          );
        }

        // Check microphone permission
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setHasPermission(true);

        // Initialize speech recognition
        const SpeechRecognition =
          window.webkitSpeechRecognition || window.SpeechRecognition;
        const recognitionInstance = new SpeechRecognition();

        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = "id-ID"; // Set to Indonesian

        recognitionInstance.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map((result) => result[0].transcript)
            .join(" ");

          if (event.results[0].isFinal) {
            onResult(transcript);
          }
        };

        recognitionInstance.onerror = (event) => {
          const errorMessage = `Speech recognition error: ${event.error}`;
          onError(errorMessage);
        };

        setRecognition(recognitionInstance);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to initialize speech recognition";
        onError(errorMessage);
      } finally {
        setIsInitializing(false);
      }
    };

    initializeSpeechRecognition();

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [onResult, onError]);

  const startListening = useCallback(async () => {
    if (!recognition) {
      onError("Speech recognition not initialized");
      return;
    }

    try {
      await recognition.start();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to start speech recognition";
      onError(errorMessage);
    }
  }, [recognition, onError]);

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
    }
  }, [recognition]);

  return {
    startListening,
    stopListening,
    hasPermission,
    isInitializing,
  };
}

// Add TypeScript declarations for WebkitSpeechRecognition
declare global {
  interface Window {
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

export default useSpeechRecognition;
