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
      modeloVersion: 'T-CROSS TRENDLINE 170 TSI MEC'
    },
    {
      placa: 'CJV685',
      bastidor: '3VVHJ65N9PM070726',
      modeloVersion: 'TIGUAN ALLSPACE LIFE 250TSI 1.4L 2WD DSG'
    },
    {
      placa: 'BZS744',
      bastidor: '8AWDW22H8RA018678',
      modeloVersion: 'AMAROK COMFORTLINE 3.0 V6 TDI 4x4 - AT, 258 CV'
    },
    {
      placa: 'CMI475',
      bastidor: '3VVKP6B20RM084161',
      modeloVersion: 'TAOS TRENDLINE 250 TSI TIP'
    },
    {
      placa: 'CMI285',
      bastidor: '3VV9P6B23RM082452',
      modeloVersion: 'TAOS HIGHLINE 250 TSI TIP'
    },
    {
      placa: 'CMW434',
      bastidor: '9BWCH6CH0RP069033',
      modeloVersion: 'NIVUS COMFORTLINE 200 TSI TIP'
    },
    {
      placa: 'CNE452',
      bastidor: '3VV9P6B22RM083804',
      modeloVersion: 'TAOS HIGHLINE 250 TSI TIP'
    },
    {
      placa: 'CNE534',
      bastidor: '3VVRH65N5RM118354',
      modeloVersion: 'TIGUAN ALLSPACE R-LINE 240TSI 2.0L 4MOTION TIP'
    },
    {
      placa: 'CNE378',
      bastidor: '9BWCH6CH0RP068772',
      modeloVersion: 'NIVUS COMFORTLINE 200 TSI TIP'
    },
    {
      placa: 'CNK030',
      bastidor: 'WVGZZZCA1RC599567',
      modeloVersion: 'TERAMONT PREMIUM 2.0 TSI - AT'
    },
    {
      placa: 'CPN351',
      bastidor: '3VV9P6B21RM096835',
      modeloVersion: 'TAOS HIGHLINE 250 TSI TIP'
    },
    {
      placa: 'CNO024',
      bastidor: '9BWBH6BF6S4005419',
      modeloVersion: 'T-CROSS COMFORTLINE 200 TSI TIP'
    }
];

// Puedes colocarlo fuera del componente o en un archivo aparte
const asesoresPorConcesionario: Record<string, string[]> = {
  "EUROSHOP LA MOLINA": [
    "MARÍA PATRICIA, AREU EYZAGUIRRE",
    "PEDRO, SALAZAR MILLA",
    "MARIANELA BACA",
    "PAUL ORAN",
    "LUIS JOEL LA CRUZ VARGAS",
    "OMAR ANTONIO ÁLVAREZ HERNANDEZ"
  ],
  "AUTOSHOP CAJAMARCA": [
    "RONALD GUILLERMO INFANTE CARRANZA"
  ],
  "AUTOSHOP TRUJILLO": [
    "JEFFERSON JOEY, GUZMAN BACILIO",
    "JAMES JHORDAN AGREDA LI",
    "AARÓN SEBASTIÁN, LESCANO LEÓN",
    "NELSON ALBERTO ARMAS MELENDEZ"
  ],
  "CARPIO": [
    "CARLOS LUIS CALLE ROALCABA",
    "ROXANA CAMPOS MERA",
    "CESAR VASQUEZ"
  ],
  "EUROSHOP SURQUILLO": [
    "FRANZ PAUL ZAVALETA MOTTA",
    "JOSE RODRIGUEZ",
    "MARIANELLA ROJAS",
    "SANDRA MARISELA, DIAZ SOTELO",
    "RICARDO MIGUEL, ARTETA LUJAN",
    "CARMEN VIRGINIA, RENDON ARBULÚ",
    "NATHALIE ALESSANDRA, PACORA VALDIVIA"
  ],
  "GNECCO Y CIA": [
    "MARCO ANTONIO, RIVERA LAZO",
    "RODRIGO, VIZCARRA DELGADO"
  ],
  "INTERAMERICANA CHICLAYO": [
    "BRUNO CUEVA",
    "CLEIDY WEN LAY DÍAZ GAMONAL"
  ],
  "INTERAMERICANA PIURA": [
    "GABRIELA LUCIA DIOSES GAMBINI",
    "STEPHANY GARCÍA TIMANA"
  ],
  "IWAGEN": [
    "BRYAN, LANTOS BENDEZU",
    "ALAN HUMBERTO, CUETO SEMINARIO"
  ],
  "LIMAWAGEN CHORRILLOS": [
    "NIKE SANCHEZ TELLO",
    "IVAN, PAJUELO AYALA",
    "RODOLFO GONZALES",
    "ROBERTO MATOS CALDAS"
  ],
  "MANNUCCI DIESEL SAC": [
    "ANTHONY QUINTANA VILLAFRANCA",
    "JOSÉ ALEX VIGO PEREZ",
    "MARITA REYES VALDIVIEZO",
    "JUSSEF MORALES RUIZ"
  ],
  "PERUMOTOR": [
    "JULIO ALEJANDRO, BARRIOS CASTILLO",
    "PAULO QUIROZ LLERENA"
  ],
  "EUROSHOP SAN MIGUEL": [
    "KARLA JESÚS, MENDOZA LEON",
    "RICARDO BENIGNO, ARTETA HERNANDEZ",
    "DIANA KATHERIN, CHAVEZ SORIA",
    "LEANDRO ANTONIO, CATACORA LOMPARTE"
  ],
  "EUROSHOP PLAZA NORTE": [
    "RONIC SALAZAR BUSTAMANTE",
    "CESAR MANUEL YATACO WONG"
  ],
  "EUROSHOP SAN BORJA": [
    "ERIKA MALINA, BALDEON CALDAS",
    "LUIS ENRIQUE, ALVAREZ MOORE",
    "DAVID EDUARDO, MALAGA CESPEDES",
    "DENNIS RODRIGO, PAZ DEL CARPIO"
  ],
  "SURMOTORS AREQUIPA": [
    "DIDIER GIOVANNI, GOMEZ CARNERO",
    "ANDREA LUCIA, SALAZAR FERNANDEZ"
  ],
  "SURMOTORS ILO": [
    "ROXANA AMELIA, ECHANDIA PACHECO"
  ],
  "SURMOTORS JULIACA": [
    "KAREN LISBETH MAMANI ZAPANA"
  ],
  "WIGO MOTORS": [
    "ELENA BARDALES",
    "GIANCARLO HERRERA"
  ]
}


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

  // Obtenemos la lista de asesores según el concesionario
  const asesoresDisponibles = asesoresPorConcesionario[formData.concesionario] || []


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
                <option value="AUTOSHOP CAJAMARCA">AUTOSHOP CAJAMARCA</option>
                <option value="AUTOSHOP TRUJILLO">AUTOSHOP TRUJILLO</option>
                <option value="CARPIO">CARPIO</option>
                <option value="EUROSHOP LA MOLINA">EUROSHOP LA MOLINA</option>
                <option value="EUROSHOP PLAZA NORTE">EUROSHOP PLAZA NORTE</option>
                <option value="EUROSHOP SAN BORJA">EUROSHOP SAN BORJA</option>
                <option value="EUROSHOP SAN MIGUEL">EUROSHOP SAN MIGUEL</option>
                <option value="EUROSHOP SURQUILLO">EUROSHOP SURQUILLO</option>
                <option value="GNECCO Y CIA">GNECCO Y CIA</option>
                <option value="INTERAMERICANA CHICLAYO">INTERAMERICANA CHICLAYO</option>
                <option value="INTERAMERICANA PIURA">INTERAMERICANA PIURA</option>
                <option value="IWAGEN">IWAGEN</option>
                <option value="LIMAWAGEN CHORRILLOS">LIMAWAGEN CHORRILLOS</option>
                <option value="MANNUCCI DIESEL SAC">MANNUCCI DIESEL SAC</option>
                <option value="PERUMOTOR">PERUMOTOR</option>
                <option value="SURMOTORS AREQUIPA">SURMOTORS AREQUIPA</option>
                <option value="SURMOTORS ILO">SURMOTORS ILO</option>
                <option value="SURMOTORS JULIACA">SURMOTORS JULIACA</option>
                <option value="WIGO MOTORS">WIGO MOTORS</option>

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
                disabled={  
                  (formData.placa.trim().length > 0) && 
                  Boolean(formData.bastidor) && 
                  !noMatch}
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
              disabled={
                formData.placa.trim().length > 0 && // hay placa no vacía
                Boolean(formData.bastidor) && 
                !noMatch
              }
            >
              <option value="">Selecciona</option>
              <option value="T-CROSS TRENDLINE 170 TSI MEC">T-CROSS TRENDLINE 170 TSI MEC</option>
              <option value="TIGUAN ALLSPACE LIFE 250TSI 1.4L 2WD DSG">TIGUAN ALLSPACE LIFE 250TSI 1.4L 2WD DSG</option>
              <option value="AMAROK COMFORTLINE 3.0 V6 TDI 4x4 - AT, 258 CV">AMAROK COMFORTLINE 3.0 V6 TDI 4x4 - AT, 258 CV</option>
              <option value="TAOS TRENDLINE 250 TSI TIP">TAOS TRENDLINE 250 TSI TIP</option>
              <option value="TAOS HIGHLINE 250 TSI TIP">TAOS HIGHLINE 250 TSI TIP</option>
              <option value="NIVUS COMFORTLINE 200 TSI TIP">NIVUS COMFORTLINE 200 TSI TIP</option>
              <option value="TAOS HIGHLINE 250 TSI TIP">TAOS HIGHLINE 250 TSI TIP</option>
              <option value="TERAMONT PREMIUM 2.0 TSI - AT">TERAMONT PREMIUM 2.0 TSI - AT</option>
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

              {/* Tipo de Documento */}
              <div className="floating-group tipo-doc">
                <div className='select-wrapper'>
                  <select
                    id="tipoDocClienteFinal"
                    name="tipoDocClienteFinal"
                    value={formData.tipoDocClienteFinal}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona</option>
                    <option value="DNI">DNI</option>
                    <option value="RUC">RUC</option>
                  </select>
                  <label htmlFor="tipoDocClienteFinal">Tipo Documento</label>
                </div>
              </div>

              {/* Documento */}
              <div className="form-group">
                <div className='floating-group documento'>
                  <input
                    name="docClienteFinal"
                    placeholder=" "
                    value={formData.docClienteFinal}
                    onChange={handleChange}
                    type="text"
                    maxLength={formData.tipoDocClienteFinal === "DNI" ? 8 : formData.tipoDocClienteFinal === "RUC" ? 11 : 20} 
                  />
                  <label htmlFor="docClienteFinal">Documento</label>
                </div>
              </div>
            </div>

            {/* Nombre Cliente Final */}
            <div className="form-group">
              <div className='floating-group nombreClienteFinal'>
                <input
                  name="nombreClienteFinal"
                  placeholder=" "
                  value={formData.nombreClienteFinal}
                  onChange={handleChange}
                  type="text"
                />
                <label htmlFor="nombreClienteFinal">Cliente Final</label>
              </div>
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
              {asesoresDisponibles.map((asesor) => (
                <option key={asesor} value={asesor}>
                  {asesor}
                </option>
              ))}
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
              {asesoresDisponibles.map((asesor) => (
                <option key={asesor} value={asesor}>
                  {asesor}
                </option>
              ))}
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
