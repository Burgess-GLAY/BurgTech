'use client'
import { useState } from 'react'

interface ImageInputProps {
  value: string
  onChange: (url: string) => void
  label?: string
  placeholder?: string
  previewHeight?: string
}

export function ImageInput({ value, onChange, label, placeholder, previewHeight }: ImageInputProps) {
  const [inputValue, setInputValue] = useState(value)

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs text-white/50">{label}</label>
      )}

      {/* URL input */}
      <input
        type="text"
        value={inputValue}
        onChange={e => {
          setInputValue(e.target.value)
          onChange(e.target.value)
        }}
        placeholder={placeholder || "Paste image URL or leave blank for auto-generated cover"}
        className="input-base"
      />

      {/* Live preview */}
      <div className={`w-full ${previewHeight || 'h-40'} rounded-xl
                       overflow-hidden border border-white/[0.08]`}>
        {inputValue && inputValue.trim() !== '' ? (
          <img
            src={inputValue}
            alt="Cover preview"
            className="w-full h-full object-cover"
            onError={e => {
              // If URL is broken, show a fallback message
              (e.target as HTMLImageElement).style.display = 'none'
              const sibling = (e.target as HTMLImageElement).nextElementSibling as HTMLElement
              if (sibling) sibling.style.display = 'flex'
            }}
          />
        ) : null}
        
        <div className="w-full h-full flex items-center justify-center
                          bg-white/[0.03] text-white/30 text-sm text-center
                          px-4"
             style={{ display: (!inputValue || inputValue.trim() === '') ? 'flex' : 'none' }}>
          <div>
            <div className="text-2xl mb-2">🖼️</div>
            <p>No image URL — auto-generated cover will be used</p>
          </div>
        </div>
      </div>

      {/* Helper text */}
      <p className="text-xs text-white/30">
        Supported: any public image URL (jpg, png, webp).
        Leave blank to use the auto-generated category cover.
      </p>
    </div>
  )
}
