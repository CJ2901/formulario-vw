import { useEffect, useState } from 'react'
import StepOneForm from './components/StepOneForm'
import StepTwoForm from './components/StepTwoForm'
import Confirmation from './components/Confirmation'
import './App.css'

function App() {
  // Manejo de pasos: 1 (datos), 2 (feedback), 3 (enviado)
  const [step, setStep] = useState<number>(1)

  // Estado que contendrá todos los campos del formulario
  const [formData, setFormData] = useState<any>({
    concesionario: '',
    tipoDemo: '',
    placa: '',
    bastidor: '',
    modeloVersion: '',
    tipoDocConductor: '',
    docConductor: '',
    licencia: '',
    nombreConductor: '',
    conductorEsClienteFinal: true,
    tipoDocClienteFinal: '',
    docClienteFinal: '',
    nombreClienteFinal: '',
    asesorEntrega: '',
    fechaHoraEntrega: '',
    kilometrajeEntrega: '',
    asesorRecepcion: '',
    fechaHoraRecepcion: '',
    kilometrajeRecepcion: '',
    // Feedback
    carroPerfecto: '',
    personalizacion: '',
    expectativas: '',
    rutaTiempo: '',
    caracteristicaFavorita: '',
  })

  // Cargar datos de sessionStorage al montar
  useEffect(() => {
    const savedData = sessionStorage.getItem('formDataTestDrive')
    if (savedData) {
      setFormData(JSON.parse(savedData))
    }
  }, [])

  // Guardar en sessionStorage cuando cambie formData
  useEffect(() => {
    sessionStorage.setItem('formDataTestDrive', JSON.stringify(formData))
  }, [formData]);


  // Manejar el botón "Atrás" del navegador o celular
  useEffect(() => {
    const handleBackButton = (event: PopStateEvent) => {
      event.preventDefault(); // Evita que la página retroceda en la navegación
      if (step === 2) {
        setStep(1); // Si está en el segundo formulario, vuelve al primero
      } else if (step === 1) {
        window.history.pushState(null, '', window.location.href); // Evita salir de la app
      }
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [step]);

  const handleNext = () => {
    setStep(2);
    window.history.pushState(null, '', window.location.href);
  };

  const handleBack = () => {
    setStep(1);
    window.history.pushState(null, '', window.location.href);
  };


  const handleSubmitFinal = () => {
    // Aquí enviarías los datos a tu backend si hace falta
    setStep(3)
    sessionStorage.removeItem('formDataTestDrive')
  }

  const handleReset = () => {
    setFormData({
      concesionario: '',
      tipoDemo: '',
      placa: '',
      bastidor: '',
      modeloVersion: '',
      tipoDocConductor: '',
      docConductor: '',
      licencia: '',
      nombreConductor: '',
      conductorEsClienteFinal: true,
      tipoDocClienteFinal: '',
      docClienteFinal: '',
      nombreClienteFinal: '',
      asesorEntrega: '',
      fechaHoraEntrega: '',
      kilometrajeEntrega: '',
      asesorRecepcion: '',
      fechaHoraRecepcion: '',
      kilometrajeRecepcion: '',
      carroPerfecto: '',
      personalizacion: '',
      expectativas: '',
      rutaTiempo: '',
      caracteristicaFavorita: '',
    })
    sessionStorage.removeItem('formDataTestDrive')
  }

  const handleRestart = () => {
    handleReset();
    setStep(1);
  }

  return (
    <div className="app-container">
      {step === 1 && (
        <StepOneForm
          formData={formData}
          setFormData={setFormData}
          onNext={handleNext}
          onReset={handleReset}
        />
      )}
      {step === 2 && (
        <StepTwoForm
          formData={formData}
          setFormData={setFormData}
          onSubmitFinal={handleSubmitFinal}
          onReset={handleReset}
          onBack={handleBack}
        />
      )}
      {step === 3 && (
        <Confirmation onRestart={handleRestart} />
      )}
    </div>
  )
}

export default App
