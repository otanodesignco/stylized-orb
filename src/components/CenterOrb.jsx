import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import MeshNoiseMaterial from './materials/MeshNoiseMaterial.jsx'
import { Vector2 } from 'three'

export default function CenterOrb(props) 
{
    const self = useRef()

    useFrame( ( state, delta ) =>
    {
        const time = state.clock.getElapsedTime() * 5
        const scale = 0.15 * Math.sin(time) + 0.85

        // self.current.rotation.z += delta * 1.4
        self.current.scale.set( scale, scale, scale )
    })


    return (
        <group {...props} dispose={null}>
            <mesh ref={ self }>
                <icosahedronGeometry args={[ 1.1, 5, 5 ]} />

                <MeshNoiseMaterial
                    baseColor='#0E0EC0'
                    colorIntensity={ 2 }
                    darkPower={ 0.35 }
                    timedOffset={ new Vector2( 0.8, 0.8 ) }
                />
            </mesh>
        </group>
    )
}