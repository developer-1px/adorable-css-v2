/**
 * CSS Minification utility
 */
export class CSSMinifier {
  /**
   * Minify CSS by removing unnecessary whitespace
   */
  static minify(css: string): string {
    return css
      .replace(/\s*{\s*/g, '{')
      .replace(/;\s*/g, ';')
      .replace(/\s*}\s*/g, '}')
      .replace(/:\s*/g, ':')
      .replace(/\n/g, '');
  }
}