uniform float uTime;
uniform float uProgress;

varying vec3 vColor;
varying float vAlpha;

void main() {
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    
    // Soft circular falloff
    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
    alpha *= vAlpha;
    
    // Add subtle glow effect
    float glow = exp(-dist * 4.0) * 0.3;
    
    vec3 finalColor = vColor + glow;
    
    gl_FragColor = vec4(finalColor, alpha * uProgress);
}
