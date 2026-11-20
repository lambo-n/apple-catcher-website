import './App.css'

function App() {
  return (
    <>
      <header className="page-header">
        <h1>The Apple Catcher Game</h1>
      </header>
      <main className="game-container">
        <a className="play-link" href={`${import.meta.env.BASE_URL}game/game.html`}>
          Play the Game
        </a>
      </main>
    </>
  )
}

export default App
