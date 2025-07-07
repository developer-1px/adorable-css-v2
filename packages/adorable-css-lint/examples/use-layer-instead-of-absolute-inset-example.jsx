// Examples for use-layer-instead-of-absolute-inset rule

// ❌ Bad - These will trigger the ESLint rule
const _BadExamples = () => {
  return (
    <>
      {/* Direct usage */}
      <div className="layer" />
      
      {/* With other classes */}
      <div className="bg(black.5) layer z(10)" />
      
      {/* Reversed order */}
      <div className="layer" />
      
      {/* In a string variable */}
      {(() => {
        const overlayClass = "layer bg(white.8)";
        return <div className={overlayClass} />;
      })()}
    </>
  );
};

// ✅ Good - These follow the recommended pattern
const _GoodExamples = () => {
  return (
    <>
      {/* Use layer instead */}
      <div className="layer" />
      
      {/* Layer with other classes */}
      <div className="bg(black.5) layer z(10)" />
      
      {/* Other absolute positioning (not inset(0)) */}
      <div className="absolute top(0) left(0)" />
      <div className="absolute inset(10)" />
      
      {/* Other positioning contexts */}
      <div className="relative inset(0)" />
      <div className="fixed inset(0)" />
      
      {/* In a string variable */}
      {(() => {
        const overlayClass = "layer bg(white.8)";
        return <div className={overlayClass} />;
      })()}
    </>
  );
};

// The rule will automatically fix "absolute inset(0)" to "layer"
// This makes the code more concise and follows AdorableCSS best practices