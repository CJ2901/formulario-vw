import React, { useState } from 'react'
import searchIcon from '../assets/search_icon.svg';

interface StepOneFormProps {
  formData: any
  setFormData: (data: any) => void
  onNext: () => void
  onReset: () => void
}

const fakePlacasData = [
  {
    placa: 'ABC123',
    bastidor: '9BWJ14S6P023622',
    modeloVersion: 'TRENDLINE 170 TSI MEC'
  },
  {
    placa: 'XYZ999',
    bastidor: '1HGG2219S3422AA',
    modeloVersion: 'HIGHLINE 200 TSI AUT'
  },
  // Agrega más registros si deseas...
]

const StepOneForm: React.FC<StepOneFormProps> = ({
  formData,
  setFormData,
  onNext,
  onReset
}) => {

  // Manejo de estado para overlay de carga y “noMatch”
  const [loading, setLoading] = useState(false)
  const [noMatch, setNoMatch] = useState(false)
  

  // Manejo de cambio en los inputs/selects
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.toUpperCase()
    })
  }

  // Manejo del checkbox "conductorEsClienteFinal"
  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked
    })
  }

  // Función para buscar la placa en el array local
  const handleSearchPlaca = () => {
    // Validamos que la placa tenga 6 caracteres
    if (formData.placa.length !== 6) {
      alert('La placa debe tener exactamente 6 caracteres.')
      return
    }

    // Mostramos overlay de carga
    setLoading(true)
    setNoMatch(false)

    // Simulamos retardo de búsqueda (1.5s)
    setTimeout(() => {
      setLoading(false)

      // Buscamos la placa (ignorando mayúsculas/minúsculas)
      const match = fakePlacasData.find(
        (item) => item.placa.toUpperCase() === formData.placa.toUpperCase()
      )

      if (match) {
        // Si encontramos coincidencia, deshabilitamos los campos
        setFormData({
          ...formData,
          bastidor: match.bastidor,
          modeloVersion: match.modeloVersion
        })
      } else {
        // Si no hubo coincidencia, borramos bastidor/modelo y señalamos “no match”
        setFormData({
          ...formData,
          bastidor: '',
          modeloVersion: ''
        })
        setNoMatch(true)
      }
    }, 500)
  }

  return (
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

          <h1 className="main-title">Formulario Test Drive VW</h1>
        </div>

      </div>

      {/* Tarjeta blanca con los campos del formulario */}
      <div className="step-container">

        {/* Concesionario y Tipo Demo en la misma línea */}
        <div className="form-group-inline">
          {/* Concesionario */}
          <div className="floating-group concesionario">
            <div className='select-wrapper'>
              <select 
                id="concesionario"
                name="concesionario"
                value={formData.concesionario}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona</option>
                <option value="MANNUCCI DIESEL S.A.C.">MANNUCCI DIESEL S.A.C.</option>
                <option value="MANNUCCI 2">MANNUCCI 2</option>
                <option value="MANNUCCI 3">MANNUCCI 3</option>
              </select>
              <label htmlFor="concesionario">Concesionario</label>
            </div>
          </div>

          {/* Tipo Demo */}
          <div className="floating-group tipo-demo">
            <div className='select-wrapper'>
              <select
                id="tipoDemo"
                name="tipoDemo"
                value={formData.tipoDemo}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona</option>
                <option value="EMSA">EMSA</option>
                <option value="DEALER">DEALER</option>
              </select>
              <label htmlFor="tipoDemo">Tipo Demo</label>
              </div>
            </div>
        </div>

        {/* Campos Placa (con buscar) y Bastidor en la misma línea */}
        <h3>VEHÍCULO</h3>
        <div className="form-group-inline">
          <div className="form-group">
            <div className="search-container">
              <div className="floating-group div-placa">
                <input
                  name="placa"
                  value={formData.placa}
                  onChange={handleChange}
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                      handleSearchPlaca();
                    }
                  }}
                  type="text"
                  maxLength={6}
                  className="input-placa"
                  placeholder=" "
                />
                <label htmlFor="placa">Placa</label>
              </div>
              <button
                type="button"
                className="search-button"
                onClick={handleSearchPlaca}
                title="Buscar placa"
              >
                <img src={searchIcon} alt="Buscar" />
              </button>

            </div>
            {noMatch && !Boolean(formData.bastidor) && (
              <span className="question-mark" title="No se encontró la placa">
                No se encontró la placa
              </span>
            )
            }

          </div>

          {/* Bastidor (deshabilitado si se encontró coincidencia) */}
          <div className="form-group">
            <div className='floating-group bastidor'>

              <input
                name="bastidor"
                placeholder=" "
                value={formData.bastidor}
                onChange={handleChange}
                type="text"
                maxLength={17}
                disabled={Boolean(formData.bastidor) && !noMatch}
              />
              <label htmlFor="bastidor">Bastidor</label>
            </div>
          </div>
        </div>

        {/* Campo Modelo Versión, debajo */}
        <div className="form-group">
          <div className="floating-group modeloVersion">
            <select
              name="modeloVersion"
              value={formData.modeloVersion}
              onChange={handleChange}
              disabled={Boolean(formData.modeloVersion) && !noMatch}
            >
              <option value="">Selecciona</option>
              <option value="TRENDLINE 170 TSI MEC">TRENDLINE 170 TSI MEC</option>
              <option value="HIGHLINE 200 TSI AUT">HIGHLINE 200 TSI AUT</option>
              <option value="Opción 2">Opción 2</option>
            </select>
            <label htmlFor="modeloVersion">Modelo Versión</label>
          </div>
        </div>

        <hr />

        {/* CLIENTE CONDUCTOR */}
        <h3>CLIENTE CONDUCTOR</h3>
        <div className="form-group-inline">


          {/* Tipo Documento */}
          <div className="floating-group tipo-doc">
            <div className='select-wrapper'>
              <select
                id="tipoDocConductor"
                name="tipoDocConductor"
                value={formData.tipoDocConductor}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona</option>
                <option value="DNI">DNI</option>
                <option value="CE">CE</option>
                <option value="RUC">RUC</option>
              </select>
              <label htmlFor="tipoDocConductor">Tipo Documento</label>
            </div>
          </div>




          {/* Bastidor (deshabilitado si se encontró coincidencia) */}
          <div className="form-group">
            <div className='floating-group documento'>

              <input
                name="docConductor"
                placeholder=" "
                value={formData.docConductor}
                onChange={handleChange}
                type="text"
                maxLength={formData.tipoDocConductor === "DNI" ? 8 : formData.tipoDocConductor === "RUC" ? 11 : 20} 
              />
              <label htmlFor="documento">Documento</label>
            </div>
          </div>

          {/* Licencia */}
          <div className="form-group">
            <div className='floating-group documento'>

              <input
                name="licencia"
                placeholder=" "
                value={formData.licencia}
                onChange={handleChange}
                type="text"
              />
              <label htmlFor="licencia">Licencia</label>
            </div>
          </div>


        </div>

        <div className="form-group">

        <div className='floating-group nombreConductor'>
          <input
            name="nombreConductor"
            placeholder=" "
            value={formData.nombreConductor}
            onChange={handleChange}
            type="text"
          />
          <label htmlFor="nombreConductor">Conductor</label>
        </div>

        </div>

        <div className="form-group">
          <div className='checkbox'>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="conductorEsClienteFinal"
                checked={formData.conductorEsClienteFinal}
                onChange={handleCheckbox}
              />
              <span className="checkbox-text">Cliente conductor es el cliente final</span>
            </label>
          </div>
        </div>

        {/* CLIENTE FINAL (SI NO ES EL MISMO) */}
        {!formData.conductorEsClienteFinal && (
          <>
            <hr />
            <h3>CLIENTE FINAL</h3>
            <div className="form-group-inline">
              <div>
                <label>Tipo de Documento</label>
                <select
                  name="tipoDocClienteFinal"
                  value={formData.tipoDocClienteFinal}
                  onChange={handleChange}
                >
                  <option value="">Selecciona</option>
                  <option value="DNI">DNI</option>
                  <option value="RUC">RUC</option>
                </select>
              </div>
              <div>
                <label>Documento</label>
                <input
                  name="docClienteFinal"
                  value={formData.docClienteFinal}
                  onChange={handleChange}
                  type="text"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Cliente Final</label>
              <input
                name="nombreClienteFinal"
                value={formData.nombreClienteFinal}
                onChange={handleChange}
                type="text"
              />
            </div>
          </>
        )}

        <hr />

        {/* ENTREGA DEL VEHÍCULO */}
        <h3>ENTREGA DEL VEHÍCULO</h3>

        <div className="form-group-inline">
          <div className="floating-group">
            <select
              name="asesorEntrega"
              value={formData.asesorEntrega}
              onChange={handleChange}
            >
              <option value="">Selecciona</option>
              <option value="JOSE SAAVEDRA PEREZ">JOSE SAAVEDRA PEREZ</option>
              <option value="Otro Asesor">Otro Asesor</option>
            </select>
            <label htmlFor="asesorEntrega">Asesor</label>
          </div>
          <div className="floating-group">
            <input
              name="kilometrajeEntrega"
              value={formData.kilometrajeEntrega}
              onChange={handleChange}
              type="number"
              placeholder=" "
            />
            <label htmlFor="kilometrajeEntrega">Kilometraje</label>
          </div>
          <div className="floating-group">
            <input
              name="fechaHoraEntrega"
              type="datetime-local"
              value={formData.fechaHoraEntrega}
              onChange={handleChange}
              placeholder=" "
            />
            <label htmlFor="fechaHoraEntrega">Fecha y hora</label>
          </div>
        </div>

        <hr />

        {/* RECEPCIÓN DEL VEHÍCULO */}
        <h3>RECEPCIÓN DEL VEHÍCULO</h3>

        <div className="form-group-inline">
          <div className="floating-group">
            <select
              name="asesorRecepcion"
              value={formData.asesorRecepcion}
              onChange={handleChange}
            >
              <option value="">Selecciona</option>
              <option value="JOSE SAAVEDRA PEREZ">JOSE SAAVEDRA PEREZ</option>
              <option value="Otro Asesor">Otro Asesor</option>
            </select>
            <label htmlFor="asesorRecepcion">Asesor</label>
          </div>
          <div className="floating-group">
            <input
              name="kilometrajeRecepcion"
              value={formData.kilometrajeRecepcion}
              onChange={handleChange}
              type="number"
              placeholder=" "
            />
            <label htmlFor="kilometrajeRecepcion">Kilometraje</label>
          </div>
          <div className="floating-group">
            <input
              name="fechaHoraRecepcion"
              type="datetime-local"
              value={formData.fechaHoraRecepcion}
              onChange={handleChange}
              placeholder=" "
            />
            <label htmlFor="fechaHoraRecepcion">Fecha y hora</label>
          </div>
        </div>




        <hr />
        {/* BOTONES */}
        <div className="button-group">
          <button type="button" onClick={onReset}>Limpiar</button>
          <button type="button" onClick={onNext}>Siguiente</button>
        </div>
      </div>

      {/* Overlay para mostrar que estamos “cargando” */}
      {loading && (
        <div className="overlay">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  )
}

export default StepOneForm
