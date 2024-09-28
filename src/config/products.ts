export const PRODUCT_PRICES = {
  model: {  
    small: 12_00,   
    medium: 14_00,  
    large: 18_00,   
  },
  material: {
    cotton: 0,     
    linen: 0,     
  },
  finish: {
    normal: 0,       
    glossy: 2_00,   
  },
} as const;

export const BASE_PRICE = PRODUCT_PRICES.model.small; 
