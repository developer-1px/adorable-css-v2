/**
 * Modern CSS Reset
 * Provides a clean slate for styling with sensible defaults
 */

export const resetCSS = `
/* Box sizing and reset */
:where(*,::before,::after){box-sizing:border-box;margin:0;padding:0;border:0 solid;font:inherit;color:inherit;min-width:0;min-height:0;}

/* Root element defaults */
:where(:root){line-height:1;overflow-wrap:break-word;-webkit-tap-highlight-color:transparent;-webkit-text-size-adjust:100%;text-size-adjust:100%;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;}

/* Full height for html and body */
:where(html,body){height:100%;}

/* Media elements */
:where(img,picture,video,canvas,svg){display:block;max-width:100%;height:auto;}

/* Form elements */
:where(button,input,textarea,select){background:none;appearance:none;-webkit-appearance:none;text-align:inherit;}

/* Interactive elements */
:where(a,button,input[type=submit],input[type=button],input[type=reset]){cursor:pointer;}

/* Links */
:where(a){text-decoration:none;}

/* Lists */
:where(ul,ol){list-style:none;}

/* Tables */
:where(table){border-collapse:collapse;border-spacing:0;}
`.trim();

/**
 * Get reset CSS wrapped in @layer base
 */
export function getResetCSS(): string {
  return `@layer base {\n${resetCSS}\n}`;
}