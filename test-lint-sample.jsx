// Test AdorableCSS lint rules in JSX
function TestComponent() {
  return (
    <div className="mb(lg) mt(xl)">
      {/* This should trigger no-margin rule error */}
      <h1 className="scale(105) opacity(80)">
        {/* This should trigger css-native-syntax rule error */}
        Hello World
      </h1>
      
      <p className="bg(white/50) c(black/80)">
        {/* This should trigger opacity-dot-syntax rule error */}
        This is a test paragraph with incorrect AdorableCSS syntax.
      </p>
      
      {/* Correct usage examples */}
      <div className="vbox gap(lg)">
        <span className="scale(1.05) opacity(0.8)">Correct scale and opacity</span>
        <span className="bg(white.5) c(black.8)">Correct opacity syntax</span>
      </div>
      
      {/* More error cases */}
      <button className="scale-110 rotate-45">
        {/* Transform hyphen syntax errors */}
        Click me
      </button>
    </div>
  );
}