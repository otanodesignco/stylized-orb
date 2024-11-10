uniform float uTime;
uniform sampler2D uNoise;
uniform vec3 uColor;
uniform float uDarkPower;
uniform float uAlphaThreshold;

in vec2 vUv;

#include ../util/clip.glsl
#include ../uv/twirl.glsl

void main()
{

    vec2 uv = vUv;
    float time = uTime * 0.6;

    vec3 noisePerlin = texture( uNoise, uv ).rbg;

    float noiseCutOff = pow( noisePerlin.r, uDarkPower );

    noiseCutOff = step( 0.03, noiseCutOff );

    vec3 colorFinal = uColor;
    colorFinal *= noiseCutOff;

    clip( noiseCutOff, uAlphaThreshold, 0 );

    gl_FragColor = vec4( colorFinal, noiseCutOff );

}