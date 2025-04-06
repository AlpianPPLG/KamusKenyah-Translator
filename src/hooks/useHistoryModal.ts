"use client";

import { useState } from "react";

export interface Translation {
  id: number;
  from: string;
  to: string;
  text: string;
  translatedText: string;
  timestamp: Date;
}

interface UseHistoryModalReturn {
  isHistoryModalOpen: boolean;
  openHistoryModal: () => void;
  closeHistoryModal: () => void;
  translations: Translation[];
  addTranslation: (translation: Omit<Translation, "id" | "timestamp">) => void;
  deleteTranslation: (id: number) => void;
  reuseTranslation: (translation: Translation) => void;
  clearAllHistory: () => void;
  favoriteTranslation: (id: number) => void;
  favoritedTranslations: number[];
}

const useHistoryModal = (
  initialTranslations: Translation[] = [],
  onReuseTranslation?: (
    text: string,
    translatedText: string,
    from: string,
    to: string
  ) => void
): UseHistoryModalReturn => {
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [translations, setTranslations] =
    useState<Translation[]>(initialTranslations);
  const [favoritedTranslations, setFavoritedTranslations] = useState<number[]>(
    []
  );

  const openHistoryModal = () => setIsHistoryModalOpen(true);
  const closeHistoryModal = () => setIsHistoryModalOpen(false);

  const addTranslation = (
    translation: Omit<Translation, "id" | "timestamp">
  ) => {
    const newTranslation: Translation = {
      ...translation,
      id: Date.now(),
      timestamp: new Date(),
    };
    setTranslations((prev) => [newTranslation, ...prev]);
  };

  const deleteTranslation = (id: number) => {
    setTranslations((prev) =>
      prev.filter((translation) => translation.id !== id)
    );
    // Also remove from favorites if it was favorited
    setFavoritedTranslations((prev) => prev.filter((favId) => favId !== id));
  };

  const reuseTranslation = (translation: Translation) => {
    if (onReuseTranslation) {
      onReuseTranslation(
        translation.text,
        translation.translatedText,
        translation.from,
        translation.to
      );
    }
    closeHistoryModal();
  };

  const clearAllHistory = () => {
    setTranslations([]);
    setFavoritedTranslations([]);
  };

  const favoriteTranslation = (id: number) => {
    setFavoritedTranslations((prev) => {
      if (prev.includes(id)) {
        return prev.filter((favId) => favId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return {
    isHistoryModalOpen,
    openHistoryModal,
    closeHistoryModal,
    translations,
    addTranslation,
    deleteTranslation,
    reuseTranslation,
    clearAllHistory,
    favoriteTranslation,
    favoritedTranslations,
  };
};

export default useHistoryModal;
