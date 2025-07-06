/**
 * Semantic Color System Module
 * Dynamically generates color shades based on a base color family
 */

export interface SemanticColorFamily {
  baseColor: string;  // e.g., 'indigo-600'
  shades?: string[];  // Optional custom shades, defaults to standard scale
}

export interface SemanticColorSystemConfig {
  primary: string | SemanticColorFamily;
  secondary: string | SemanticColorFamily;
  accent: string | SemanticColorFamily;
  mute: string | SemanticColorFamily;
  surface: string | SemanticColorFamily;
  success: string | SemanticColorFamily;
  warning: string | SemanticColorFamily;
  error: string | SemanticColorFamily;
  info: string | SemanticColorFamily;
  brand?: string;  // Optional gradient definition
}

// Standard shade scale
const DEFAULT_SHADES = ['25', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

// Extract color family and shade from a color string (e.g., 'indigo-600' -> ['indigo', '600'])
function parseColorString(color: string): [string, string] | null {
  const match = color.match(/^(\w+)-(\d+)$/);
  if (!match) return null;
  return [match[1], match[2]];
}

// Generate shade mapping for a semantic color
function generateColorShades(
  semanticName: string, 
  config: string | SemanticColorFamily
): Record<string, string> {
  const shades: Record<string, string> = {};
  
  // Normalize config to SemanticColorFamily
  const colorFamily: SemanticColorFamily = typeof config === 'string' 
    ? { baseColor: config }
    : config;
  
  const parsed = parseColorString(colorFamily.baseColor);
  if (!parsed) {
    // If not a standard color format, just return the base mapping
    shades[semanticName] = colorFamily.baseColor;
    return shades;
  }
  
  const [family] = parsed;
  const shadesToGenerate = colorFamily.shades || DEFAULT_SHADES;
  
  // Set the base semantic color (e.g., 'primary' -> 'indigo-600')
  shades[semanticName] = colorFamily.baseColor;
  
  // Generate all shade variations
  for (const shade of shadesToGenerate) {
    shades[`${semanticName}-${shade}`] = `${family}-${shade}`;
  }
  
  return shades;
}

// Generate CSS variable mappings for semantic colors
export function generateSemanticColorVariables(
  config: SemanticColorSystemConfig,
  options?: {
    includeAliases?: boolean;
    includeSurfaceColors?: boolean;
    includeTextColors?: boolean;
    includeBorderColors?: boolean;
  }
): string {
  const cssLines: string[] = [];
  const {
    includeAliases = true,
    includeSurfaceColors = true,
    includeTextColors = true,
    includeBorderColors = true
  } = options || {};
  
  // Process each semantic color
  const semanticColors = ['primary', 'secondary', 'accent', 'mute', 'surface', 'success', 'warning', 'error', 'info'] as const;
  
  for (const colorName of semanticColors) {
    const colorConfig = config[colorName];
    if (!colorConfig) continue;
    
    const shades = generateColorShades(colorName, colorConfig);
    
    // Generate CSS variables for each shade
    for (const [shadeName, colorValue] of Object.entries(shades)) {
      const parsed = parseColorString(colorValue);
      if (parsed) {
        const [family, shade] = parsed;
        cssLines.push(`  --${shadeName}: var(--${family}-${shade});`);
      } else {
        cssLines.push(`  --${shadeName}: ${colorValue};`);
      }
    }
  }
  
  // Handle brand gradient if specified
  if (config.brand) {
    if (config.brand.includes('..')) {
      const [start, end] = config.brand.split('..');
      cssLines.push(`  --brand-start: var(--${start});`);
      cssLines.push(`  --brand-end: var(--${end});`);
      cssLines.push(`  --brand-gradient: linear-gradient(135deg, var(--brand-start), var(--brand-end));`);
      cssLines.push(`  --brand-gradient-hover: linear-gradient(135deg, var(--${start.replace(/(\d+)$/, (m) => String(Number(m) + 100))}), var(--${end.replace(/(\d+)$/, (m) => String(Number(m) + 100))}));`);
      cssLines.push(`  --brand-gradient-text: linear-gradient(90deg, var(--brand-start), var(--brand-end));`);
    }
  }
  
  // Generate surface colors
  if (includeSurfaceColors) {
    cssLines.push('\n  /* Surface colors */');
    cssLines.push('  --surface-base: var(--white);');
    cssLines.push('  --surface-subtle: var(--surface-50);');
    cssLines.push('  --surface-accent: var(--primary-50);');
    cssLines.push('  --surface-inverse: var(--mute-900);');
  }
  
  // Generate text colors
  if (includeTextColors) {
    cssLines.push('\n  /* Text colors */');
    cssLines.push('  --text-primary: var(--mute-900);');
    cssLines.push('  --text-secondary: var(--mute-600);');
    cssLines.push('  --text-subtle: var(--mute-500);');
    cssLines.push('  --text-accent: var(--primary-600);');
    cssLines.push('  --text-inverse: var(--white);');
  }
  
  // Generate border colors
  if (includeBorderColors) {
    cssLines.push('\n  /* Border colors */');
    cssLines.push('  --border-default: var(--mute-200);');
    cssLines.push('  --border-accent: var(--primary-200);');
    cssLines.push('  --border-subtle: var(--mute-100);');
  }
  
  // Generate neutral aliases (for backward compatibility)
  if (includeAliases && config.mute) {
    cssLines.push('\n  /* Neutral colors (alias for mute) */');
    const shades = DEFAULT_SHADES.filter(s => s !== '25'); // neutral doesn't have 25
    for (const shade of shades) {
      cssLines.push(`  --neutral-${shade}: var(--mute-${shade});`);
    }
  }
  
  return cssLines.join('\n');
}

// Generate semantic color configuration object
export function buildSemanticColorConfig(
  config: SemanticColorSystemConfig
): Record<string, string> {
  const result: Record<string, string> = {};
  
  const semanticColors = ['primary', 'secondary', 'accent', 'mute', 'surface', 'success', 'warning', 'error', 'info'] as const;
  
  for (const colorName of semanticColors) {
    const colorConfig = config[colorName];
    if (!colorConfig) continue;
    
    const shades = generateColorShades(colorName, colorConfig);
    Object.assign(result, shades);
  }
  
  // Handle brand
  if (config.brand) {
    result.brand = config.brand;
  }
  
  return result;
}

// Preset color schemes
export const COLOR_SCHEMES = {
  // Default Indigo-based scheme
  default: {
    primary: 'indigo-600',
    secondary: 'slate-600',
    accent: 'violet-500',
    mute: 'gray-500',
    surface: 'gray-100',
    success: 'emerald-600',
    warning: 'amber-500',
    error: 'red-600',
    info: 'sky-500',
    brand: 'indigo-600..violet-500'
  },
  
  // Blue-based professional scheme
  professional: {
    primary: 'blue-600',
    secondary: 'slate-600',
    accent: 'cyan-500',
    mute: 'gray-500',
    surface: 'slate-100',
    success: 'green-600',
    warning: 'yellow-500',
    error: 'red-600',
    info: 'blue-500',
    brand: 'blue-600..cyan-500'
  },
  
  // Purple-based creative scheme
  creative: {
    primary: 'purple-600',
    secondary: 'pink-600',
    accent: 'fuchsia-500',
    mute: 'gray-500',
    surface: 'purple-50',
    success: 'teal-600',
    warning: 'orange-500',
    error: 'rose-600',
    info: 'indigo-500',
    brand: 'purple-600..pink-500'
  },
  
  // Green-based nature scheme
  nature: {
    primary: 'green-600',
    secondary: 'teal-600',
    accent: 'lime-500',
    mute: 'stone-500',
    surface: 'green-50',
    success: 'emerald-600',
    warning: 'yellow-600',
    error: 'red-600',
    info: 'cyan-500',
    brand: 'green-600..teal-500'
  },
  
  // Monochrome scheme
  monochrome: {
    primary: 'gray-900',
    secondary: 'gray-700',
    accent: 'gray-600',
    mute: 'gray-400',
    surface: 'gray-100',
    success: 'gray-700',
    warning: 'gray-600',
    error: 'gray-800',
    info: 'gray-600',
    brand: 'gray-900..gray-600'
  }
} as const;

// Helper to get a color scheme
export function getColorScheme(schemeName: keyof typeof COLOR_SCHEMES): SemanticColorSystemConfig {
  return COLOR_SCHEMES[schemeName];
}

// Create semantic color system from a primary color
export function createFromPrimaryColor(
  primaryColor: string,
  options?: {
    secondaryFamily?: string;
    accentFamily?: string;
  }
): SemanticColorSystemConfig {
  const parsed = parseColorString(primaryColor);
  if (!parsed) {
    throw new Error(`Invalid color format: ${primaryColor}. Expected format: 'family-shade' (e.g., 'indigo-600')`);
  }
  
  const [primaryFamily] = parsed;
  
  // Auto-generate complementary colors based on primary
  const colorFamilies = ['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'];
  const primaryIndex = colorFamilies.indexOf(primaryFamily);
  
  // Calculate complementary colors
  const secondaryFamily = options?.secondaryFamily || 'slate';
  const accentIndex = (primaryIndex + 4) % colorFamilies.length;
  const accentFamily = options?.accentFamily || colorFamilies[accentIndex];
  
  return {
    primary: primaryColor,
    secondary: `${secondaryFamily}-600`,
    accent: `${accentFamily}-500`,
    mute: 'gray-500',
    surface: 'gray-100',
    success: 'emerald-600',
    warning: 'amber-500',
    error: 'red-600',
    info: 'sky-500',
    brand: `${primaryColor}..${accentFamily}-500`
  };
}