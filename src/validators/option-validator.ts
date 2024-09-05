import { PRODUCT_PRICES } from '@/config/products'

export const COLORS = [
    {
      label: 'Natural',  
      value: 'natural',  
      tw: {
        bg: 'bg-transparent',      // bg-transparent border-transparent for Natural
        border: 'border-transparent',
      },
    },
    {
      label: 'Cream',  // Changed from 'White' to 'Cream'
      value: 'cream',  // Updated value to 'cream'
      tw: {
        bg: 'bg-amber-50',        // bg-amber-100 border-amber-100 for Cream
        border: 'border-amber-50',
      },
    },
    {
      label: 'Pink',
      value: 'pink',
      tw: {
        bg: 'bg-pink-200',        // bg-pink-200 border-pink-200 for Light Pink
        border: 'border-pink-200',
      },
    },
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
