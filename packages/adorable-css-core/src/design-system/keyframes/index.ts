// CSS 키프레임 정의들
export const keyframes = `
/* Glow Effects */
@keyframes glow-pulse {
  0% { filter: brightness(1) saturate(1); }
  100% { filter: brightness(1.2) saturate(1.3); }
}

/* Float Animations */
@keyframes float-10 {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes float-20 {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

/* Neon Flicker */
@keyframes neon-flicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

/* Loading Spinner */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Skeleton Loading */
@keyframes skeleton-loading {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Fade Animations */
@keyframes fade {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Bounce Animation */
@keyframes bounce {
  0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
  40%, 43% { transform: translate3d(0,-10px,0); }
  70% { transform: translate3d(0,-5px,0); }
  90% { transform: translate3d(0,-2px,0); }
}

/* Scale Animations */
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
}

/* Slide Animations */
@keyframes slide-in-up {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes slide-in-down {
  from { transform: translateY(-100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes slide-in-left {
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes slide-in-right {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

/* Zoom Animations */
@keyframes zoom-in {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@keyframes zoom-out {
  from { transform: scale(1.2); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
`;

// 키프레임을 CSS에 주입하는 함수
export function injectKeyframes() {
  if (typeof document !== 'undefined') {
    const existingStyle = document.getElementById('adorable-css-keyframes');
    if (!existingStyle) {
      const style = document.createElement('style');
      style.id = 'adorable-css-keyframes';
      style.textContent = keyframes;
      document.head.appendChild(style);
    }
  }
}