import { useEffect, useRef } from 'react'
import FlashSpiral from './components/FlashSpiral.jsx'
import MiddleOrb from './components/MiddleOrb.jsx'
import CenterOrb from './components/CenterOrb.jsx'
import { useFrame } from '@react-three/fiber'
import { useProgress } from '@react-three/drei'
import { damp3 } from 'maath/easing'
import { Perf } from 'r3f-perf'

export default function Experience()
{
    const self = useRef()

    const progress = useProgress()

    useFrame( ( state, delta ) =>{

       if( progress.progress === 100 )
       {
            damp3( self.current.scale, 0.85, 0.15, delta)
       }
            
    })

    return(
       
        <group ref={ self } scale={0}>
            <FlashSpiral scale={ 2 } />
            <MiddleOrb scale={ 1.3 } />
            <CenterOrb scale={ 1.25 } />
        </group>
    )
}