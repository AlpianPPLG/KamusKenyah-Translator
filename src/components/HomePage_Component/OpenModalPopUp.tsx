"use client"

import type React from "react"
import { Clock } from "lucide-react"
import useHistoryModal, { type Translation } from "../../hooks/useHistoryModal"
import HistoryModalPopUp from "./HistoryModalPopUp"

interface OpenModalPopUpProps {
  initialTranslations?: Translation[]
  onReuseTranslation?: (text: string, translatedText: string, from: string, to: string) => void
  className?: string
}

const OpenModalPopUp: React.FC<OpenModalPopUpProps> = ({
  initialTranslations = [],
  onReuseTranslation,
  className = "",
}) => {
  const {
    isHistoryModalOpen,
    openHistoryModal,
    closeHistoryModal,
    translations,
    deleteTranslation,
    reuseTranslation,
    clearAllHistory,
    favoriteTranslation,
    favoritedTranslations,
  } = useHistoryModal(initialTranslations, onReuseTranslation)

  return (
    <>
      <button
        onClick={openHistoryModal}
        className={`p-2 hover:bg-gray-100 rounded-lg transition-colors relative group ${className}`}
        aria-label="View translation history"
      >
        <Clock className="h-5 w-5 text-gray-600" />
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
          History
        </span>
        {translations.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            {translations.length > 9 ? "9+" : translations.length}
          </span>
        )}
      </button>

      <HistoryModalPopUp
        isOpen={isHistoryModalOpen}
        onClose={closeHistoryModal}
        translations={translations}
        onDelete={deleteTranslation}
        onReuse={reuseTranslation}
        onClearAll={clearAllHistory}
        onFavorite={favoriteTranslation}
        favoritedTranslations={favoritedTranslations}
      />
    </>
  )
}

export default OpenModalPopUp

