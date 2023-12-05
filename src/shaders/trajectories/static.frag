varying vec2 vUv;
uniform float uTime;
uniform vec3 uColor;

void main() {
	float alpha = vUv.x;
	vec4 color = vec4(uColor, alpha);
	gl_FragColor = color;
}
