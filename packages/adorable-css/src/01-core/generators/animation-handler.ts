import { getAllKeyframes } from '../../05-plugins/animations/animations';

/**
 * Check if any of the class names use animations
 */
export const hasAnimations = (classNames: string[]): boolean => 
  classNames.some(className => 
    className.includes('fade-') || 
    className.includes('scale-') ||
    className.includes('slide-') ||
    className.includes('bounce-') ||
    className.includes('float') ||
    className.includes('animate(')
  );

/**
 * Get all keyframes CSS if animations are used
 */
export const getKeyframesCSS = (classNames: string[]): string => 
  hasAnimations(classNames) ? getAllKeyframes() : '';

/**
 * Prepend keyframes to CSS if needed
 */
export const prependKeyframesIfNeeded = (css: string, classNames: string[]): string => {
  const keyframes = getKeyframesCSS(classNames);
  return keyframes ? keyframes + "\n" + css : css;
};