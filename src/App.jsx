import './App.css'

function App() {
  return (
    <>
      <header className="page-header">
        <h1>The Apple Catcher Game</h1>
      </header>
      <main className="game-container">
        <iframe
          className="game-frame"
          src={`${import.meta.env.BASE_URL}game/index.html`}
          title="Apple Catcher Game"
          allow="autoplay; fullscreen; gamepad"
        />
      </main>
    </>
  )
}

export default App
