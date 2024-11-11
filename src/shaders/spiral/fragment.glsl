uniform float uTime;
uniform vec3 uFrontColor;
uniform vec3 uBackColor;
uniform sampler2D uNoise;
uniform float uPowerOffset;
uniform float uNoiseCutOff;
uniform bool uColorBoth;

in vec2 vUv;

#include ../util/clip.glsl
#include ../uv/tileOffset.glsl

void main()
{
    vec2 uv = vUv;

    // noise from texture sampled at r channel
    vec3 noiseVoronoi = texture( uNoise, uv ).rgb;

    // create a cutoff threshold using pow to increase dark
    float noiseCutOff = pow( noiseVoronoi.r, uPowerOffset );

    noiseCutOff = step( uNoiseCutOff, noiseCutOff );

    // assign colors with noise
    vec3 colorFront = uFrontColor;
    colorFront *= noiseCutOff;

    vec3 colorBack = uBackColor;
    colorBack *= noiseCutOff;

    // assign color based on if that fragment is front or back
    vec3 colorFinal = colorFront;

    if( uColorBoth )
    {
        colorFinal = ( ( gl_FrontFacing ) ? colorFront : colorBack );
    }

    // clip based on noise cutoff
    clip( noiseCutOff, uNoiseCutOff, 0 );

    gl_FragColor = vec4( colorFinal, noiseCutOff );
    //gl_FragColor = vec4( uvTiled, 0.8, 1.0 );

    #include <tonemapping_fragment>
    #include <colorspace_fragment>

}