// bg-[#E6E3DC] border-[#C7C4B8]
// bg-[#F5F3E7] border-[#E8E6D4]
// bg-[#F7D6E0] border-[#F5B7C7]

import { PRODUCT_PRICES } from '@/config/products'

export const COLORS = [
  { label: 'Natural', value: 'natural', tw: { bg: 'bg-[#E6E3DC]', border: 'border-[#C7C4B8]' } },
  { label: 'Cream', value: 'cream', tw: { bg: 'bg-[#F5F3E7]', border: 'border-[#E8E6D4]' } },
  { label: 'Pink', value: 'pink', tw: { bg: 'bg-[#F7D6E0]', border: 'border-[#F5B7C7]' } },
] as const;


export const MODELS = {
  name: 'models',
  options: [
    {
      label: 'Small Tote',
      value: 'small',
    },
    {
      label: 'Medium Tote',
      value: 'medium',
    },
    {
      label: 'Large Tote',
      value: 'large',
    },
  ],
} as const

export const MATERIALS = {
  name: 'material',
  options: [
    {
      label: 'Cotton',
      value: 'cotton',
      description: 'Soft and natural fabric', 
      price: PRODUCT_PRICES.material.cotton, 
    },
    {
      label: 'Linen',
      value: 'linen',
      description: 'Durable and eco-friendly', 
      price: PRODUCT_PRICES.material.linen, 
    },
  ],
} as const

export const FINISHES = {
  name: 'finish',
  options: [
    {
      label: 'Normal Finish',
      value: 'normal',
      description: 'Matte and simple look', 
      price: PRODUCT_PRICES.finish.normal, 
    },
    {
      label: 'Glossy Finish',
      value: 'glossy',
      description: 'Shiny and polished appearance', 
      price: PRODUCT_PRICES.finish.glossy, 
    },
  ],
} as const
