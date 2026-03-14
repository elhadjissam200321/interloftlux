"use client"

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { collections } from '@/lib/data'

interface MobileCollectionsMenuProps {
  onLinkClick: () => void
}

export default function MobileCollectionsMenu({ onLinkClick }: MobileCollectionsMenuProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={handleToggle}
        className="font-serif text-3xl font-light tracking-widest uppercase text-foreground hover:opacity-50 transition-opacity flex items-center gap-3 cursor-pointer"
      >
        Collections
        <ChevronDown 
          size={20} 
          strokeWidth={1}
          className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Expandable collections */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-out ${
          isExpanded ? 'max-h-[500px] opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'
        }`}
      >
        <nav className="flex flex-col items-center gap-4">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={collection.href}
              onClick={onLinkClick}
              className="text-sm tracking-[0.2em] uppercase text-foreground/60 hover:text-foreground transition-colors"
            >
              {collection.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
