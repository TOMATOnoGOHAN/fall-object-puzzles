import { useRef } from 'react'
import { IRefPhaserGame, PhaserGame } from './game/PhaserGame'

// Reactのメインコンポーネント
// PhaserGameコンポーネントを利用してゲームを描画
function App() {
  const phaserRef = useRef<IRefPhaserGame | null>(null)

  return (
    <div id="app">
      <PhaserGame ref={phaserRef} />
    </div>
  )
}

export default App
