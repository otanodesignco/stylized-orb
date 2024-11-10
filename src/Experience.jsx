import FlashSpiral from './components/FlashSpiral.jsx'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import MiddleOrb from './components/MiddleOrb.jsx'
import CenterOrb from './components/CenterOrb.jsx'

export default function Experience()
{
    return <>
        <EffectComposer>
            <Bloom luminanceThreshold={ 1.1 } mipmapBlur intensity={ 1.2 } />
        </EffectComposer>

        <FlashSpiral scale={ 2 } />
        <MiddleOrb scale={ 1.5 } />
        <CenterOrb scale={ 1.4 } />

    </>
}