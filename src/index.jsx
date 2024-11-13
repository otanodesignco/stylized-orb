import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import Overlay from './components/Overlay.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <div className='webgl-container'>

        <Overlay />

    <Canvas
        camera={ {
            fov: 45,
            near: 0.1,
            far: 200,
            position: [ 4, 2, 6 ]
        } }
    >
         <EffectComposer>
            <Bloom luminanceThreshold={ 0.9 } intensity={ 1 } luminanceSmoothing={0.025} mipmapBlur />
        </EffectComposer>

        <Experience />

    </Canvas>
    </div>
)