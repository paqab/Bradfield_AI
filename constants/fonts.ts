// Font configuration for the app
export const FONT_FAMILY = {
  regular: 'Inter-Regular',
  medium: 'Inter-Medium',
  semiBold: 'Inter-SemiBold',
  bold: 'Inter-Bold',
};

// Default font family for consistent styling
export const DEFAULT_FONT = FONT_FAMILY.regular;

// Helper function to get font family based on fontWeight
export const getFontFamily = (fontWeight: string | number | undefined): string => {
  if (!fontWeight) return FONT_FAMILY.regular;
  
  const weight = typeof fontWeight === 'string' ? fontWeight : fontWeight.toString();
  
  switch (weight) {
    case '400':
    case 'normal':
      return FONT_FAMILY.regular;
    case '500':
      return FONT_FAMILY.medium;
    case '600':
      return FONT_FAMILY.semiBold;
    case '700':
    case 'bold':
      return FONT_FAMILY.bold;
    default:
      return FONT_FAMILY.regular;
  }
};

