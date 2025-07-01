import { getAllKeyframes } from '../../extensions/animations/animations';

/**
 * Animation and keyframes handling
 */
export class AnimationHandler {
  /**
   * Check if any of the class names use animations
   */
  static hasAnimations(classNames: string[]): boolean {
    return classNames.some(className => 
      className.includes('fade-') || 
      className.includes('scale-') ||
      className.includes('slide-') ||
      className.includes('bounce-') ||
      className.includes('float') ||
      className.includes('animate(')
    );
  }

  /**
   * Get all keyframes CSS if animations are used
   */
  static getKeyframesCSS(classNames: string[]): string {
    if (this.hasAnimations(classNames)) {
      return getAllKeyframes();
    }
    return '';
  }

  /**
   * Prepend keyframes to CSS if needed
   */
  static prependKeyframesIfNeeded(css: string, classNames: string[]): string {
    const keyframes = this.getKeyframesCSS(classNames);
    if (keyframes) {
      return keyframes + "\n" + css;
    }
    return css;
  }
}