'use client'

import { useState, useEffect, useRef } from 'react'
import { Pipette, X, ChevronRight, RotateCcw } from 'lucide-react'

// Convert HEX to oklch-compatible CSS string via RGB intermediate
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace('#', '')
  if (clean.length !== 6) return null
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  }
}

function rgbToRelative(c: number) {
  const s = c / 255
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
}

// Returns a rough lightness value (0–1) from hex
function hexLightness(hex: string): number {
  const rgb = hexToRgb(hex)
  if (!rgb) return 0.5
  const r = rgbToRelative(rgb.r)
  const g = rgbToRelative(rgb.g)
  const b = rgbToRelative(rgb.b)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

// Darken hex by a factor (0–1)
function darkenHex(hex: string, factor: number): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return hex
  const r = Math.round(rgb.r * (1 - factor))
  const g = Math.round(rgb.g * (1 - factor))
  const b = Math.round(rgb.b * (1 - factor))
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

// Lighten hex by a factor
function lightenHex(hex: string, factor: number): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return hex
  const r = Math.round(rgb.r + (255 - rgb.r) * factor)
  const g = Math.round(rgb.g + (255 - rgb.g) * factor)
  const b = Math.round(rgb.b + (255 - rgb.b) * factor)
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

interface ColorPreset {
  name: string
  hex: string
}

const greigePresets: ColorPreset[] = [
  { name: 'Ivoire Pur',       hex: '#F8F5F0' },
  { name: 'Crème Douce',      hex: '#F2EDE4' },
  { name: 'Greige Clair',     hex: '#E8E0D5' },
  { name: 'Greige Standard',  hex: '#D9CFBF' },
  { name: 'Greige Chaud',     hex: '#C8BAA6' },
  { name: 'Sable',            hex: '#B8A898' },
  { name: 'Taupe Clair',      hex: '#A49080' },
  { name: 'Taupe Profond',    hex: '#8C7B6B' },
  { name: 'Moka Doux',        hex: '#6E5D50' },
  { name: 'Terre Sombre',     hex: '#4A3C32' },
]

const DEFAULT_HEX = '#D9CFBF' // Greige Standard

function applyColorTheme(backgroundHex: string) {
  const root = document.documentElement
  // Only change the background color, keep everything else the same
  root.style.setProperty('--background', `color-mix(in srgb, ${backgroundHex} 100%, transparent)`)
}

function resetColorTheme() {
  document.documentElement.style.removeProperty('--background')
}

function isValidHex(hex: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(hex)
}

const STORAGE_KEY = 'interloft-bg-color'

export default function ColorSwitcher() {
  const [open, setOpen] = useState(false)
  const [activeHex, setActiveHex] = useState<string>(DEFAULT_HEX)
  const [hexInput, setHexInput] = useState<string>(DEFAULT_HEX)
  const [hexError, setHexError] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  // Load persisted colour on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && isValidHex(saved)) {
      setActiveHex(saved)
      setHexInput(saved)
      applyColorTheme(saved)
    }
  }, [])

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  function selectColor(hex: string) {
    setActiveHex(hex)
    setHexInput(hex)
    setHexError(false)
    applyColorTheme(hex)
    localStorage.setItem(STORAGE_KEY, hex)
  }

  function handleHexChange(value: string) {
    // Auto-prepend # if missing
    const v = value.startsWith('#') ? value : `#${value}`
    setHexInput(v)
    if (isValidHex(v)) {
      setHexError(false)
      selectColor(v)
    } else {
      setHexError(true)
    }
  }

  function handleReset() {
    resetColorTheme()
    setActiveHex(DEFAULT_HEX)
    setHexInput(DEFAULT_HEX)
    setHexError(false)
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <div ref={panelRef} className="fixed bottom-8 right-8 z-[9999] flex flex-col items-end gap-3">
      {/* Panel */}
      {open && (
        <div
          className="w-72 rounded-none shadow-2xl border border-border overflow-hidden"
          style={{ background: 'color-mix(in srgb, var(--background) 97%, transparent)', backdropFilter: 'blur(12px)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <span className="text-[10px] tracking-[0.2em] uppercase font-sans text-foreground font-medium">
              Thème couleur
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                title="Réinitialiser"
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <RotateCcw size={13} strokeWidth={1.5} />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <X size={14} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Greige presets */}
          <div className="px-4 pt-4 pb-2">
            <p className="label-text mb-3">Palette Greige</p>
            <div className="grid grid-cols-5 gap-2">
              {greigePresets.map((preset) => (
                <button
                  key={preset.hex}
                  onClick={() => selectColor(preset.hex)}
                  title={preset.name}
                  className="group relative"
                >
                  <div
                    className="w-full aspect-square rounded-none border transition-all"
                    style={{
                      backgroundColor: preset.hex,
                      borderColor: activeHex === preset.hex ? '#1A1510' : 'rgba(0,0,0,0.12)',
                      boxShadow: activeHex === preset.hex ? `0 0 0 2px ${preset.hex}, 0 0 0 3px #1A1510` : 'none',
                      transform: activeHex === preset.hex ? 'scale(1.12)' : 'scale(1)',
                    }}
                  />
                  {/* Tooltip */}
                  <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 bg-foreground text-background text-[9px] tracking-wide px-2 py-0.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {preset.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Gradient bar */}
          <div className="px-4 py-3">
            <div
              className="w-full h-5 rounded-none cursor-crosshair border border-border"
              style={{
                background: `linear-gradient(to right, ${greigePresets.map(p => p.hex).join(', ')})`
              }}
            />
          </div>

          {/* Hex input */}
          <div className="px-4 pb-4">
            <p className="label-text mb-2">Code hexadécimal</p>
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 flex-shrink-0 border border-border"
                style={{ backgroundColor: isValidHex(hexInput) ? hexInput : activeHex }}
              />
              <input
                type="text"
                value={hexInput}
                onChange={(e) => handleHexChange(e.target.value)}
                maxLength={7}
                placeholder="#D9CFBF"
                className={`flex-1 h-8 px-3 text-xs font-mono tracking-wider border bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors ${
                  hexError ? 'border-red-400' : 'border-border focus:border-foreground'
                }`}
              />
              {/* Native colour picker as helper */}
              <label title="Sélecteur de couleur" className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
                <Pipette size={15} strokeWidth={1.5} />
                <input
                  type="color"
                  className="sr-only"
                  value={isValidHex(hexInput) ? hexInput : activeHex}
                  onChange={(e) => handleHexChange(e.target.value)}
                />
              </label>
            </div>
            {hexError && (
              <p className="text-[10px] text-red-400 mt-1 font-sans">Format invalide — ex: #D9CFBF</p>
            )}
          </div>

          {/* Active colour preview */}
          <div
            className="px-4 py-3 border-t border-border flex items-center gap-3"
          >
            <div className="w-4 h-4 border border-border" style={{ backgroundColor: activeHex }} />
            <span className="text-[10px] font-mono tracking-wider text-muted-foreground">{activeHex.toUpperCase()}</span>
            <span className="text-[10px] tracking-wide text-muted-foreground ml-auto font-sans">
              {greigePresets.find(p => p.hex === activeHex)?.name ?? 'Personnalisé'}
            </span>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2.5 border border-border shadow-lg text-[10px] tracking-[0.15em] uppercase font-sans transition-all hover:shadow-xl cursor-pointer"
        style={{ 
          backgroundColor: activeHex, 
          color: hexLightness(activeHex) < 0.25 ? '#F8F5F0' : '#1A1510',
          borderColor: hexLightness(activeHex) < 0.25 ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'
        }}
        title="Changer la couleur du thème"
      >
        <div className="w-3 h-3 rounded-full border" style={{ 
          backgroundColor: activeHex,
          borderColor: hexLightness(activeHex) < 0.25 ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)'
        }} />
        Couleur
        <ChevronRight size={11} strokeWidth={2} className={`transition-transform ${open ? 'rotate-90' : ''}`} />
      </button>
    </div>
  )
}
