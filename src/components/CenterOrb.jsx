import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import MeshNoiseMaterial from './materials/MeshNoiseMaterial.jsx'

export default function CenterOrb(props) 
{
    const self = useRef()

    useFrame( ( state, delta ) =>
    {
        self.current.rotation.y += delta * 1.6
        self.current.rotation.z += delta * 1.4
    })


    return (
        <group {...props} dispose={null}>
            <mesh ref={ self }>
                <icosahedronGeometry args={[ 1.1, 5, 5 ]} />

                <MeshNoiseMaterial
                    baseColor='#ff821c'
                    colorIntensity={ 2.98 }
                />
            </mesh>
        </group>
    )
}