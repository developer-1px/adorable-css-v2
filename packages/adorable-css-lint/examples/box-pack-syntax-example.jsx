// Examples of box-pack-syntax rule

// ❌ Bad - Using center+middle instead of pack
function _BadExample() {
  return (
    <>
      <div className="hbox(pack)">Centered content</div>
      <div className="vbox(pack)">Centered content</div>
      <div className="hbox(pack+gap-lg)">With gap</div>
    </>
  );
}

// ✅ Good - Using pack syntax
function _GoodExample() {
  return (
    <>
      <div className="hbox(pack)">Centered content</div>
      <div className="vbox(pack)">Centered content</div>
      <div className="hbox(pack+gap-lg)">With gap</div>
      
      {/* center and middle can be used separately */}
      <div className="hbox(center)">Only horizontally centered</div>
      <div className="vbox(middle)">Only vertically centered</div>
    </>
  );
}

// The rule will automatically fix center+middle to pack:
// Before: hbox(center+middle)
// After:  hbox(pack)