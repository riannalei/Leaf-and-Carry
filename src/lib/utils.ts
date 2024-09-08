import { Metadata } from 'next'
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPrice = (price: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  })

  return formatter.format(price)
}

export function constructMetadata({
  title = 'Leaf&Carry - custom eco-friendly tote bags',
  description = 'Create custom high-quality tote bags in seconds',
  image = 'cactuspointy.svg',
  icons = '/favicon.ico',
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@riannalei',
    },
    icons,
    metadataBase: new URL("https://leaf-and-carry.vercel.app/")
  }
}