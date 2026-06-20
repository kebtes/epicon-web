import { Outlet } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import Grainient from '../Grainient'

export default function RootLayout() {
  return (
    <div className="bg-black min-h-screen flex flex-col relative">
      <Grainient
        color1="#000000"
        color2="#4e4e4e"
        color3="#000000"
        timeSpeed={1}
        colorBalance={0}
        warpStrength={1}
        warpFrequency={5}
        warpSpeed={2}
        warpAmplitude={50}
        blendAngle={0}
        blendSoftness={0.5}
        rotationAmount={500}
        noiseScale={2}
        grainAmount={0.05}
        grainScale={5}
        grainAnimated={false}
        contrast={1.5}
        gamma={1}
        saturation={1}
        centerX={0}
        centerY={0}
        zoom={0.9}
        className="fixed inset-0 z-0"
      />
      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="fixed top-0 left-0 right-0 z-50">
          <Header />
        </div>
        <main className="flex-1 flex flex-col pt-14 pb-12">
          <Outlet />
        </main>
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <Footer />
        </div>
      </div>
    </div>
  );
}
