varying vec2 vUv;

uniform float time;
uniform vec3 color;

void main() {
	float alpha = 1. - vUv.y;
	vec4 fragColor = vec4(color, alpha);
	gl_FragColor = fragColor;
}