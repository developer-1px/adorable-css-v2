import {makeValues, px} from './value-utils'
import {makeColor} from './makeColor'

// Functions now imported from value-utils
// Alias for backward compatibility
export const makeValue = makeValues

// Re-export commonly used functions for backward compatibility
export { makeColor } from './makeColor'
export { px } from './value-utils'

// All value transformation functions are now imported from specialized modules
// This module now serves as the main export point for backward compatibility
