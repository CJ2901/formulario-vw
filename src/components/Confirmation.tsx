import React from 'react'

interface ConfirmationProps {
  onRestart: () => void
}


const Confirmation: React.FC<ConfirmationProps> = ({ onRestart }) => {  return (

    <div className="app-container">
      {/* Contenedor de cabecera */}
      <div className="header-container">
        {/* Logo + título principal en una sola línea */}
        <div className="logo-and-title">
          <svg
            role="img"
            aria-label="Volkswagen"
            xmlns="http://www.w3.org/2000/svg"
            width="70"
            height="70"
            viewBox="0 -2 25 30"
            fill="currentColor"
          >
            <title>Volkswagen</title>
            <path d="M12 22.586c-5.786 0-10.543-4.8-10.543-10.586 0-1.2.214-2.357.6-3.471l6.172 12c.085.171.171.3.385.3.215 0 .3-.129.386-.3l2.871-6.386q.064-.129.129-.129c.086 0 .086.086.129.129l2.914 6.386c.086.171.171.3.386.3.214 0 .3-.129.385-.3l6.172-12c.385 1.071.6 2.228.6 3.471-.043 5.786-4.8 10.586-10.586 10.586m0-13.329c-.086 0-.086-.086-.129-.128l-3.3-7.115a10.12 10.12 0 0 1 6.858 0l-3.3 7.115c-.043.042-.043.128-.129.128m-3.471 7.714c-.086 0-.086-.085-.129-.128L3 6.47c.943-1.542 2.314-2.828 3.9-3.728l3.814 8.228c.086.172.172.215.3.215h1.972c.128 0 .214-.043.3-.215l3.771-8.228c1.586.9 2.957 2.186 3.9 3.728L15.6 16.843q-.065.128-.129.128c-.085 0-.085-.085-.128-.128L13.286 12.3c-.086-.171-.172-.214-.3-.214h-1.972c-.128 0-.214.043-.3.214l-2.057 4.543c-.043.043-.043.128-.128.128M12 24c6.643 0 12-5.357 12-12S18.643 0 12 0 0 5.357 0 12s5.357 12 12 12"></path>
          </svg>

          <h1 className="main-title">Test Drive</h1>
        </div>
        

      </div>

      <div className="step-container">
        <h2>Enviado correctamente</h2>
        <p>¡Gracias por tu tiempo!</p>
        <div className="button-group">
          <button type="button" onClick={onRestart}>Terminar</button>
        </div>
      </div>


    </div>
  )
}

export default Confirmation
