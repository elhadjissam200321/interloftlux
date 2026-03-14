'use client'

import { useState, useEffect, useRef } from 'react'
import { Pipette, X, ChevronRight, RotateCcw, ChevronDown } from 'lucide-react'

// ─── Color utilities ───────────────────────────────────────────────────────────

function hexToRgb(hex: string) {
  const c = hex.replace('#', '')
  if (c.length !== 6) return null
  return {
    r: parseInt(c.slice(0, 2), 16),
    g: parseInt(c.slice(2, 4), 16),
    b: parseInt(c.slice(4, 6), 16),
  }
}

function isValidHex(hex: string) {
  return /^#[0-9A-Fa-f]{6}$/.test(hex)
}

// ─── CSS variable map ──────────────────────────────────────────────────────────

export type SlotKey =
  | 'bg-page'
  | 'bg-navbar'
  | 'bg-mobile-menu'
  | 'bg-footer'
  | 'color-primary'
  | 'color-secondary'

const SLOT_VARS: Record<SlotKey, string> = {
  'bg-page':         '--background',
  'bg-navbar':       '--color-navbar',
  'bg-mobile-menu':  '--color-mobile-menu',
  'bg-footer':       '--color-footer-bg',
  'color-primary':   '--foreground',
  'color-secondary': '--muted-foreground',
}

const SLOT_LABELS: Record<SlotKey, string> = {
  'bg-page':         'Page',
  'bg-navbar':       'Navigation',
  'bg-mobile-menu':  'Menu mobile',
  'bg-footer':       'Footer',
  'color-primary':   'Texte principal',
  'color-secondary': 'Texte secondaire',
}

const SLOT_DEFAULTS: Record<SlotKey, string> = {
  'bg-page':         '#F8F5F0',
  'bg-navbar':       '#F8F5F0',
  'bg-mobile-menu':  '#F8F5F0',
  'bg-footer':       '#F8F5F0',
  'color-primary':   '#1A1510',
  'color-secondary': '#7A6E65',
}

const STORAGE_KEY = 'interloft-colors-v2'

// ─── Palettes ──────────────────────────────────────────────────────────────────

const BG_PALETTE = [
  { name: 'Ivoire',    hex: '#F8F5F0' },
  { name: 'Crème',     hex: '#F2EDE4' },
  { name: 'Lin',       hex: '#E8E0D5' },
  { name: 'Greige',    hex: '#D9CFBF' },
  { name: 'Sable',     hex: '#C8BAA6' },
  { name: 'Taupe',     hex: '#A49080' },
  { name: 'Moka',      hex: '#6E5D50' },
  { name: 'Nuit',      hex: '#1A1510' },
  { name: 'Anthracite',hex: '#2C2C2C' },
  { name: 'Blanc',     hex: '#FFFFFF' },
]

const TEXT_PALETTE = [
  { name: 'Noir',       hex: '#1A1510' },
  { name: 'Charbon',    hex: '#2C2A28' },
  { name: 'Graphite',   hex: '#4A4540' },
  { name: 'Taupe',      hex: '#6E6460' },
  { name: 'Gris',       hex: '#8C8680' },
  { name: 'Clair',      hex: '#B0A89E' },
  { name: 'Sable',      hex: '#C8BAA6' },
  { name: 'Ivoire',     hex: '#F2EDE4' },
  { name: 'Blanc',      hex: '#F8F5F0' },
  { name: 'Pur',        hex: '#FFFFFF' },
]

const BG_SLOTS: SlotKey[]   = ['bg-page', 'bg-navbar', 'bg-mobile-menu', 'bg-footer']
const TEXT_SLOTS: SlotKey[] = ['color-primary', 'color-secondary']

// ─── Apply / reset helpers ─────────────────────────────────────────────────────

function applySlot(slot: SlotKey, hex: string) {
  document.documentElement.style.setProperty(SLOT_VARS[slot], hex)
}

function resetAllSlots() {
  for (const slot of Object.keys(SLOT_VARS) as SlotKey[]) {
    document.documentElement.style.removeProperty(SLOT_VARS[slot])
  }
}

// ─── Sub-component: one color row ─────────────────────────────────────────────

interface SlotRowProps {
  slot: SlotKey
  value: string
  palette: { name: string; hex: string }[]
  onChange: (slot: SlotKey, hex: string) => void
}

function SlotRow({ slot, value, palette, onChange }: SlotRowProps) {
  const [input, setInput] = useState(value)
  const [err, setErr] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => { setInput(value) }, [value])

  function handleInput(raw: string) {
    const v = raw.startsWith('#') ? raw : `#${raw}`
    setInput(v)
    if (isValidHex(v)) { setErr(false); onChange(slot, v) }
    else setErr(true)
  }

  return (
    <div className="border-b border-border last:border-0">
      {/* Row header */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-foreground/[0.03] transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-4 h-4 border border-border/60 flex-shrink-0"
            style={{ backgroundColor: value }}
          />
          <span className="text-[10px] tracking-[0.18em] uppercase font-sans text-foreground">
            {SLOT_LABELS[slot]}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-mono text-muted-foreground">{value.toUpperCase()}</span>
          <ChevronDown
            size={11}
            strokeWidth={1.5}
            className={`text-muted-foreground transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {/* Expanded picker */}
      {expanded && (
        <div className="px-4 pb-4">
          {/* Swatches */}
          <div className="grid grid-cols-10 gap-1 mb-3">
            {palette.map(p => (
              <button
                key={p.hex}
                onClick={() => onChange(slot, p.hex)}
                title={p.name}
                className="group relative"
              >
                <div
                  className="w-full aspect-square border transition-transform"
                  style={{
                    backgroundColor: p.hex,
                    borderColor: value === p.hex ? '#1A1510' : 'rgba(0,0,0,0.10)',
                    transform: value === p.hex ? 'scale(1.15)' : 'scale(1)',
                    boxShadow: value === p.hex ? `0 0 0 1.5px ${p.hex}, 0 0 0 2.5px #1A1510` : 'none',
                  }}
                />
                <span className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 bg-foreground text-background text-[8px] px-1.5 py-0.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  {p.name}
                </span>
              </button>
            ))}
          </div>

          {/* Hex input */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 border border-border flex-shrink-0" style={{ backgroundColor: isValidHex(input) ? input : value }} />
            <input
              type="text"
              value={input}
              onChange={e => handleInput(e.target.value)}
              maxLength={7}
              placeholder="#F8F5F0"
              className={`flex-1 h-6 px-2 text-[10px] font-mono tracking-wider border bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors ${
                err ? 'border-red-400' : 'border-border focus:border-foreground/60'
              }`}
            />
            <label title="Pipette" className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
              <Pipette size={13} strokeWidth={1.5} />
              <input
                type="color"
                className="sr-only"
                value={isValidHex(input) ? input : value}
                onChange={e => handleInput(e.target.value)}
              />
            </label>
          </div>
          {err && <p className="text-[9px] text-red-400 mt-1">Format invalide — ex: #F8F5F0</p>}
        </div>
      )}
    </div>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function ColorSwitcher() {
  const [open, setOpen] = useState(false)
  const [colors, setColors] = useState<Record<SlotKey, string>>(SLOT_DEFAULTS)
  const panelRef = useRef<HTMLDivElement>(null)

  // Load persisted colours
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<Record<SlotKey, string>>
        const merged = { ...SLOT_DEFAULTS, ...parsed }
        setColors(merged as Record<SlotKey, string>)
        for (const [slot, hex] of Object.entries(merged)) {
          if (isValidHex(hex)) applySlot(slot as SlotKey, hex)
        }
      }
    } catch {}
  }, [])

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  function handleChange(slot: SlotKey, hex: string) {
    if (!isValidHex(hex)) return
    const next = { ...colors, [slot]: hex }
    setColors(next)
    applySlot(slot, hex)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  function handleReset() {
    resetAllSlots()
    setColors(SLOT_DEFAULTS)
    localStorage.removeItem(STORAGE_KEY)
  }

  const activePreview = colors['bg-page']

  return (
    <div ref={panelRef} className="fixed bottom-8 right-8 z-[9999] flex flex-col items-end gap-3">
      {open && (
        <div className="w-80 shadow-2xl border border-border bg-background text-foreground overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <span className="text-[10px] tracking-[0.22em] uppercase font-sans font-medium text-foreground">
              Couleurs du site
            </span>
            <div className="flex items-center gap-2">
              <button onClick={handleReset} title="Réinitialiser tout" className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                <RotateCcw size={12} strokeWidth={1.5} />
              </button>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                <X size={13} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Backgrounds section */}
          <div>
            <p className="px-4 pt-3 pb-2 text-[9px] tracking-[0.3em] uppercase font-sans text-muted-foreground">
              Arrière-plans
            </p>
            {BG_SLOTS.map(slot => (
              <SlotRow
                key={slot}
                slot={slot}
                value={colors[slot]}
                palette={BG_PALETTE}
                onChange={handleChange}
              />
            ))}
          </div>

          {/* Text colors section */}
          <div className="border-t border-border">
            <p className="px-4 pt-3 pb-2 text-[9px] tracking-[0.3em] uppercase font-sans text-muted-foreground">
              Couleurs de texte
            </p>
            {TEXT_SLOTS.map(slot => (
              <SlotRow
                key={slot}
                slot={slot}
                value={colors[slot]}
                palette={TEXT_PALETTE}
                onChange={handleChange}
              />
            ))}
          </div>

          {/* Footer hint */}
          <div className="px-4 py-2.5 border-t border-border">
            <p className="text-[9px] font-sans text-muted-foreground tracking-wide">
              Les couleurs sont sauvegardées automatiquement.
            </p>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 px-4 py-2.5 border border-border shadow-lg text-[10px] tracking-[0.15em] uppercase font-sans hover:shadow-xl transition-all cursor-pointer bg-background text-foreground"
      >
        <div className="flex gap-1">
          {BG_SLOTS.map(slot => (
            <div
              key={slot}
              className="w-2.5 h-2.5 border border-border/40"
              style={{ backgroundColor: colors[slot] }}
            />
          ))}
        </div>
        Couleurs
        <ChevronRight size={11} strokeWidth={2} className={`transition-transform ${open ? 'rotate-90' : ''}`} />
      </button>
    </div>
  )
}
