export const PRODUCT_PRICES = {
  model: {  // Added pricing for different tote sizes
    small: 14_00,   // Price for Small Tote
    medium: 18_00,  // Price for Medium Tote
    large: 22_00,   // Price for Large Tote
  },
  material: {
    cotton: 0,       // No additional cost for Cotton
    linen: 2_00,     // Additional cost for Linen
  },
  finish: {
    normal: 0,       // No additional cost for Normal Finish
    glossy: 2_00,    // Additional cost for Glossy Finish
  },
} as const;

export const BASE_PRICE = PRODUCT_PRICES.model.small; // Use Small Tote as the base price
