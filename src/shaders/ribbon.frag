uniform float uTime;
uniform float uProgress;
uniform float uHueShift;

varying vec2 vUv;
varying vec3 vPosition;

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
    // Base color progression
    vec3 color1 = vec3(0.1, 0.2, 0.8); // Deep blue
    vec3 color2 = vec3(0.8, 0.3, 0.6); // Pink
    vec3 color3 = vec3(0.2, 0.8, 0.9); // Cyan
    
    // Mix colors based on position and progress
    vec3 baseColor = mix(color1, color2, vUv.x);
    baseColor = mix(baseColor, color3, uProgress);
    
    // Add hue shift
    vec3 hsv = vec3(uHueShift + vUv.x * 0.3, 0.7, 0.9);
    vec3 shiftedColor = hsv2rgb(hsv);
    
    vec3 finalColor = mix(baseColor, shiftedColor, 0.5);
    
    // Add some gradient along the ribbon
    float gradient = smoothstep(0.0, 1.0, vUv.y);
    finalColor *= 0.5 + 0.5 * gradient;
    
    gl_FragColor = vec4(finalColor, 0.8);
}
