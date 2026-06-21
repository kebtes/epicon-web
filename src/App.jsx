import { Routes, Route } from 'react-router-dom'
import RootLayout from './components/layout/RootLayout'
import DocsLayout from './components/layout/DocsLayout'
import Home from './components/pages/Home'
import GetStarted from './components/pages/docs/GetStarted'
import TraditionalML from './components/pages/docs/TraditionalML'
import NeuralNetworks from './components/pages/docs/NeuralNetworks'
import Preprocessing from './components/pages/docs/Preprocessing'
import Datasets from './components/pages/docs/Datasets'
import Metrics from './components/pages/docs/Metrics'
import Advanced from './components/pages/docs/Advanced'
import ApiReference from './components/pages/docs/ApiReference'
import VersionsLayout from './components/layout/VersionsLayout'
import Versions from './components/pages/Versions'

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<DocsLayout />}>
          <Route index element={<GetStarted />} />
          <Route path="traditional-ml" element={<TraditionalML />} />
          <Route path="neural-networks" element={<NeuralNetworks />} />
          <Route path="preprocessing" element={<Preprocessing />} />
          <Route path="datasets" element={<Datasets />} />
          <Route path="metrics" element={<Metrics />} />
          <Route path="advanced" element={<Advanced />} />
          <Route path="api" element={<ApiReference />} />
        </Route>
        <Route path="/versions" element={<VersionsLayout />}>
          <Route index element={<Versions />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
