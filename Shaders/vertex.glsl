    uniform float uTime;
      uniform vec2 uMouse;
      uniform float uHover;
      
      varying vec2 vTexCoords;
      
      void main() {
          vec3 newPosition = position;
          
          // Modified cylindrical bend along z-axis
          float bendAmount = -0.09 ;
          float xOffset = position.x + 8.0;
          float zOffset = position.z + 1.0;  // Changed from x to z offset
          float yBend = -(xOffset * xOffset + zOffset * zOffset) * bendAmount;  // Apply bend to y-axis
          newPosition.y += yBend;  // Apply to y instead of z
          
          // Global wave effect when hovering
          float globalWave = sin(position.x * -0.5 + uTime * 2.0) * 0.5 * uHover;
          globalWave += sin(position.z * 1.0 + uTime * 1.5) * 0.1 * uHover;  // Changed from y to z
          
          // Add mouse interaction wave
          float distanceFromMouse = distance(newPosition.xz, uMouse * 5.0);  // Changed from xy to xz
          float mouseWave = sin(distanceFromMouse * 3.0 - uTime * 2.0) * 0.2;
          float mouseInfluence = smoothstep(2.0, 0.0, distanceFromMouse) * uHover;
          
          newPosition.y += globalWave + (mouseWave * mouseInfluence);  // Apply to y instead of z
          
          vTexCoords = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
      }