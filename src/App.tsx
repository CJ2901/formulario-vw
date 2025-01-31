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
    conductorEsClienteFinal: false,
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
  }, [formData])

  // Alertar al cerrar la pestaña si no ha terminado
  useEffect(() => {
    const beforeUnloadListener = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = 'Si sales, se cerrará la sesión.'
      return 'Si sales, se cerrará la sesión.'
    }

    window.addEventListener('beforeunload', beforeUnloadListener)
    return () => {
      window.removeEventListener('beforeunload', beforeUnloadListener)
    }
  }, [])

  const handleNext = () => setStep(2)

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
      conductorEsClienteFinal: false,
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
        />
      )}
      {step === 3 && (
        <Confirmation />
      )}
    </div>
  )
}

export default App
