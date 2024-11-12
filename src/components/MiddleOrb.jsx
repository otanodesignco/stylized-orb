import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import MeshNoiseMaterial from './materials/MeshNoiseMaterial.jsx'

export default function MiddleOrb(props) 
{
    const self = useRef()

    useFrame( ( state, delta ) =>
    {
        self.current.rotation.x -= delta * 2.4
    })


    return (
        <group {...props} dispose={null}>
            <mesh ref={ self }>
                <icosahedronGeometry args={[ 1.1, 5, 5 ]} />

                <MeshNoiseMaterial
                    baseColor='#3df5ff'
                    colorIntensity={ 1.1 }
                    darkPower={ 8 }
                />
            </mesh>
        </group>
    )
}