<script lang="ts">
  import Code from '../Code.svelte';
  import { Sliders, Sparkles } from 'lucide-svelte';
  
  let blur = 10;
  let opacity = 30;
  let scale = 1.1;
  let rotate = 5;
  
  $: effects = `backdrop-blur(${blur}px) opacity(${opacity}) hover:scale(${scale}) hover:rotate(${rotate}deg) transition`;
</script>

<section class="effects-playground w(fill) py(5xl) bg(gray-900)">
  <div class="container(xl)">
    <!-- Section Header -->
    <div class="text(center) mb(4xl)">
      <h2 class="font(5xl) bold c(white) mb(lg)">
        Interactive Effects
      </h2>
      <p class="font(xl) c(gray-400) container(md/px:0)">
        Play with visual effects in real-time
      </p>
    </div>
    
    <!-- Playground -->
    <div class="playground-container grid grid-cols(2) gap(3xl)">
      <!-- Controls -->
      <div class="controls vbox gap(2xl)">
        <h3 class="font(2xl) bold c(white) mb(xl) hbox(middle) gap(sm)">
          <Sliders size="24" />
          Effect Controls
        </h3>
        
        <div class="control-group">
          <label class="font(sm) c(gray-300) mb(sm) block">
            Backdrop Blur: {blur}px
          </label>
          <input 
            type="range" 
            min="0" 
            max="20" 
            bind:value={blur}
            class="slider w(full)"
          />
        </div>
        
        <div class="control-group">
          <label class="font(sm) c(gray-300) mb(sm) block">
            Opacity: {opacity}%
          </label>
          <input 
            type="range" 
            min="0" 
            max="100" 
            bind:value={opacity}
            class="slider w(full)"
          />
        </div>
        
        <div class="control-group">
          <label class="font(sm) c(gray-300) mb(sm) block">
            Hover Scale: {scale}
          </label>
          <input 
            type="range" 
            min="0.8" 
            max="1.5" 
            step="0.05"
            bind:value={scale}
            class="slider w(full)"
          />
        </div>
        
        <div class="control-group">
          <label class="font(sm) c(gray-300) mb(sm) block">
            Hover Rotate: {rotate}deg
          </label>
          <input 
            type="range" 
            min="-45" 
            max="45" 
            bind:value={rotate}
            class="slider w(full)"
          />
        </div>
        
        <!-- Generated Code -->
        <div class="code-output mt(xl)">
          <h4 class="font(md) c(gray-300) mb(md)">Generated Code:</h4>
          <div class="p(lg) bg(gray-800) r(lg)">
            <Code code={effects} />
          </div>
        </div>
      </div>
      
      <!-- Preview -->
      <div class="preview vbox(pack)">
        <h3 class="font(2xl) bold c(white) mb(xl) text(center)">Live Preview</h3>
        
        <div class="preview-area relative h(400px) bg(gradient-to-br/purple-600/pink-600) r(xl) vbox(pack)">
          <div 
            class="effect-box w(300px) h(200px) bg(white/{opacity}%) {effects} r(xl) vbox(pack) cursor(pointer)"
            style="backdrop-filter: blur({blur}px); opacity: {opacity/100}"
          >
            <div class="text(center)">
              <Sparkles size="48" class="c(gray-800) mb(md)" />
              <p class="font(lg) bold c(gray-800)">Hover Me!</p>
              <p class="font(sm) c(gray-600)">See the effects in action</p>
            </div>
          </div>
        </div>
        
        <p class="font(sm) c(gray-400) text(center) mt(xl)">
          Hover over the box to see the transform effects
        </p>
      </div>
    </div>
  </div>
</section>

<style>
  .slider {
    -webkit-appearance: none;
    appearance: none;
    height: 6px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
    outline: none;
  }
  
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: #8b5cf6;
    border-radius: 50%;
    cursor: pointer;
  }
  
  .slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: #8b5cf6;
    border-radius: 50%;
    cursor: pointer;
    border: none;
  }
  
  .effect-box {
    transition: all 0.3s ease;
  }
</style>