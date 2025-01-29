uniform sampler2D uTexture;
      varying vec2 vTexCoords;

      void main() {
          vec4 texColor = texture(uTexture, vec2(vTexCoords.x, 1.0 - vTexCoords.y));
          gl_FragColor = texColor;
      }