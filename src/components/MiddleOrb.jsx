import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import MeshNoiseMaterial from './materials/MeshNoiseMaterial.jsx'

export default function MiddleOrb(props) 
{
    const self = useRef()

    useFrame( ( state, delta ) =>
    {
        const time = state.clock.getElapsedTime() * 5
        const scale = 0.15 * Math.sin(time) + 0.85

        // self.current.rotation.x += delta * 2.4
        self.current.scale.set( scale, scale, scale )
    })


    return (
        <group {...props} dispose={null}>
            <mesh ref={ self }>
                <icosahedronGeometry args={[ 1.1, 5, 5 ]} />

                <MeshNoiseMaterial
                    baseColor='#3DF5FF'
                    colorIntensity={ 1.5 }
                    darkPower={ 0.56 }
                />
            </mesh>
        </group>
    )
}