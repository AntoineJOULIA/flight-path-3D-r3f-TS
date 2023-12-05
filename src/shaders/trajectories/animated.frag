varying vec2 vUv;

uniform float uTime;
uniform vec3 uColor;
uniform float uStartX;
uniform float uEndX;

void main() {
	float alpha = (vUv.x / (uStartX - uEndX)) - (uEndX / (uStartX - uEndX));
	if (vUv.x < mod(uEndX, 1.)) {
		alpha = 0.0;
	} else if (vUv.x > mod(uStartX, 1.)) {
		alpha = 0.0;
	}
	vec4 color = vec4(uColor, alpha);
	
	gl_FragColor = color;
}
