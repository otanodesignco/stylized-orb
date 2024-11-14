uniform float uTime;
uniform sampler2D uNoise;
uniform vec3 uColor;
uniform float uDarkPower;
uniform float uAlphaThreshold;

in vec2 vUv;

#include ../util/clip.glsl
#include ../uv/twirl.glsl
#include ../uv/tileOffset.glsl

void main()
{

    vec2 uv = vUv;
    float time = uTime * 0.6;

    // vec2 timeOffset = vec2(  0.0, uTime * 0.8 );
    // vec2 uvTiled =  tileOffset( uv, vec2( 1.0 ), timeOffset );

    vec3 noisePerlin = texture( uNoise, uv ).rbg;

    float noiseCutOff = pow( noisePerlin.r, uDarkPower );

    //noiseCutOff = step( 0.03, noiseCutOff );

    vec3 colorFinal = uColor;
    colorFinal *= noiseCutOff;

    clip( noiseCutOff, uAlphaThreshold, 0 );

    gl_FragColor = vec4( colorFinal, noiseCutOff );
    #include <tonemapping_fragment>
    #include <colorspace_fragment>

}