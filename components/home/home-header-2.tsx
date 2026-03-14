"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { products } from '@/lib/data'

export default function HomeHeader2() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const currentProduct = products[currentIndex]

  return (
    <section className="w-full relative h-screen min-h-[600px] overflow-hidden bg-foreground">
      {/* Full-height slides */}
      {products.map((product, index) => (
        <div
          key={product.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover object-center"
            priority={index === 0}
            loading={index === 0 ? 'eager' : 'lazy'}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-foreground/20" />
        </div>
      ))}

      {/* Product info — bottom left */}
      <div className="absolute bottom-16 md:bottom-20 left-8 md:left-12 z-20">
        <Link href={`/products/${currentProduct.category}/${currentProduct.slug}`} className="group block">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-background/60 mb-2">
            {currentProduct.category.replace(/-/g, ' ')}
          </p>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-background mb-4 tracking-wide">
            {currentProduct.name}
          </h2>
          <span className="inline-flex items-center gap-3 font-sans text-[10px] tracking-[0.25em] uppercase text-background/80 group-hover:text-background transition-colors">
            {"\u0044\u00E9couvrir"}
            <span className="w-8 h-px bg-current transition-all group-hover:w-12" />
          </span>
        </Link>
      </div>

      {/* Progress indicators — bottom right */}
      <div className="absolute bottom-6 right-8 md:right-12 z-20 flex items-center gap-3">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-px transition-all duration-500 ${
              index === currentIndex ? 'bg-background w-10' : 'bg-background/40 w-6'
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide counter — bottom left */}
      <div className="absolute bottom-6 left-8 md:left-12 z-20">
        <span className="font-sans text-[10px] tracking-[0.2em] text-background/60">
          {String(currentIndex + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  )
}
