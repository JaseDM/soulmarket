import './App.css'

function App() {
  return (
    <div className="app-container">
      <div className="content">
        <h1 className="title">SoulMarket</h1>
        <h2 className="subtitle">Próximamente</h2>
        <p className="tagline">Estamos preparando algo increíble para ti.</p>
        <form className="notify-form" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Tu correo electrónico" 
            className="email-input" 
            aria-label="Email para notificaciones"
          />
          <button type="submit" className="notify-button">Notify Me</button>
        </form>
      </div>
    </div>
  )
}

export default App
