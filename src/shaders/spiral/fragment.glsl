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

    vec2 timeOffset = vec2( uTime * 0.6, 0.0 );

    //vec2 uvTiled =  mod( ( uv * 1.0 ) + timeOffset, 1.0 );

    // noise from texture sampled at r channel
    vec3 noiseVoronoi = texture( uNoise, uv ).rgb;

    // create a cutoff threshold using pow to increase dark
    float noiseCutOff = pow( noiseVoronoi.r, uPowerOffset );

    float uvCutOff = uv.y;
    uvCutOff = smoothstep( 0.1, 0.3, uvCutOff );
    float uvCutOff2 = smoothstep( 0.9, 0.65, uv.y );

    //noiseCutOff = step( uNoiseCutOff, noiseCutOff );

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

    gl_FragColor = vec4( colorFinal, noiseCutOff * uvCutOff * uvCutOff2 );
    //gl_FragColor = vec4( vec3( uvCutOff2 ), 1.0 );

    #include <tonemapping_fragment>
    #include <colorspace_fragment>

}