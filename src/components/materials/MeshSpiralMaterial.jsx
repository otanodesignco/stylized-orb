import { useRef } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import { shaderMaterial, useTexture } from '@react-three/drei'
import vertex from '../../shaders/spiral/vertex.glsl'
import fragment from '../../shaders/spiral/fragment.glsl'
import { Color, DoubleSide, RepeatWrapping } from 'three'


/* 
/*  This material will create the outer spiral using voronoi noise and rendering different
/*  colors for for the front and the back of the material
/*  voronoi noise is a texture and not generated on the fly
*/

export default function MeshSpiralMaterial({ 
    frontColor = '#320564', // front color, should be darker
    backColor = '#ec22ff', // back color, should be lighter
    intensity = 1.5, // intensity of back color
    powerOffset = 4.0, // used to increase black of noise
    noiseCutOff = 0.32, // controls the step function for the noise cut off
    colorBoth = false, // decide if you color both sides
    },
    ...props ) 
{

    // reference to access material uniforms
    const self = useRef()

    // create color objects and load textures
    const fColor = new Color( frontColor )
    const bColor = new Color( backColor ).multiplyScalar( intensity )
    const noiseTexture = useTexture( './textures/noiseVoronoi.png' )
    noiseTexture.wrapS = RepeatWrapping
    noiseTexture.wrapT = RepeatWrapping

    // handle colorBoth
    if( typeof colorBoth !== 'boolean' )
    {
        colorBoth = false
    }

    // uniform object for material
    const uniforms = 
    {
        uTime: 0,
        uFrontColor: fColor,
        uBackColor: bColor,
        uNoise: noiseTexture,
        uPowerOffset: powerOffset,
        uNoiseCutOff: noiseCutOff,
        uColorBoth: colorBoth
    }

    // tap into animation frame 
    useFrame( (  state, delta ) => {

        // update time uniform
        self.current.uniforms.uTime.value += delta

    })

    // create shader material
    const MeshSpiralMaterial = shaderMaterial( uniforms, vertex, fragment )
    // extend object to work with r3f
    extend( { MeshSpiralMaterial } )

  return (
    <meshSpiralMaterial
        key={ MeshSpiralMaterial.key }
        ref={ self }
        { ...props }
        transparent = { true }
        side = { DoubleSide }
    />
  )
}

