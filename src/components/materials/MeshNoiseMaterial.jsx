import { extend, useFrame } from "@react-three/fiber"
import { shaderMaterial, useTexture } from "@react-three/drei"
import { Color, DoubleSide, RepeatWrapping, Vector2 } from "three"
import { useRef } from "react"
import vertex from '../../shaders/noise/vertex.glsl'
import fragment from '../../shaders/noise/fragment.glsl'

export default function MeshNoiseMaterial( {
    baseColor = '#42a6ff',
    colorIntensity = 3.1, // intensity of the noise
    darkPower = 3.5, // controls the power in the hsader to adjust darkness
    alphaThreshold = 0.7,
    timedOffset = new Vector2( 1.0, 1.0 ),
},
...props ) 
{
    const self = useRef()
    const noisePerlin = useTexture('./textures/noiseValue_albedo.png')
    noisePerlin.wrapS = RepeatWrapping
    noisePerlin.wrapT = RepeatWrapping

    const colorBase = new Color( baseColor ).multiplyScalar( colorIntensity )


    timedOffset = ( timedOffset instanceof Vector2 ) ? timedOffset : new Vector2( 1.0, 1.0 )
    
    const uniforms = 
    {
        uTime: 0,
        uNoise: noisePerlin,
        uColor: colorBase,
        uDarkPower: darkPower,
        uAlphaThreshold: alphaThreshold,
        uTimeOffset: timedOffset,
    }

    useFrame( ( state, delta) => {

        self.current.uniforms.uTime.value += delta

    } ) 

    const MeshNoiseMaterial = shaderMaterial( uniforms, vertex, fragment )

    extend( { MeshNoiseMaterial } )

    return (
        <meshNoiseMaterial
            key={ MeshNoiseMaterial.key }
            ref={ self }
            transparent={ true }
            side={ DoubleSide }
            { ...props }
        />
    )

}
