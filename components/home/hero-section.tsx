"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { products } from '@/lib/data'

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-advance every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const currentProduct = products[currentIndex]

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-foreground">
      {/* Product slides */}
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

      {/* Product info overlay */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end pb-24 md:pb-32 px-8 md:px-16">
        <Link href={`/products/${currentProduct.category}/${currentProduct.slug}`} className="group">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-background/60 mb-3">
            {currentProduct.category.replace(/-/g, ' ')}
          </p>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-background mb-4 tracking-wide">
            {currentProduct.name}
          </h2>
          <span className="inline-flex items-center gap-3 font-sans text-[10px] tracking-[0.25em] uppercase text-background/80 group-hover:text-background transition-colors">
            Découvrir
            <span className="w-8 h-px bg-current transition-all group-hover:w-12" />
          </span>
        </Link>
      </div>

      {/* Progress indicators */}
      <div className="absolute bottom-8 md:bottom-12 right-8 md:right-16 z-20 flex items-center gap-3">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-8 h-px transition-all duration-500 ${
              index === currentIndex ? 'bg-background w-12' : 'bg-background/40'
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Current slide number */}
      <div className="absolute bottom-8 md:bottom-12 left-8 md:left-16 z-20">
        <span className="font-sans text-[10px] tracking-[0.2em] text-background/60">
          {String(currentIndex + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  )
}
