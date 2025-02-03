import React, { useState } from 'react';
import starEmpty from '../assets/star_empty.svg';
import starComplete from '../assets/star_complete.svg';


interface StepTwoFormProps {
  formData: any
  setFormData: (data: any) => void
  onSubmitFinal: () => void
  onReset: () => void
  onBack: () => void
}

const StepTwoForm: React.FC<StepTwoFormProps> = ({
  formData, setFormData, onSubmitFinal, onReset, onBack
}) => {

  // Estado local para las estrellas de cada pregunta
  const [personalizationRating, setPersonalizationRating] = useState<number>(
    formData.personalizacion || 0
  );
  const [expectationRating, setExpectationRating] = useState<number>(
    formData.expectativas || 0
  );

  // Maneja el clic en las estrellas
  const handleStarClick = (question: string, value: number) => {
    if (question === 'personalizacion') {
      setPersonalizationRating(value);
      setFormData({ ...formData, personalizacion: value });
    } else if (question === 'expectativas') {
      setExpectationRating(value);
      setFormData({ ...formData, expectativas: value });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


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

          <h1 className="main-title">Feedback</h1>
        </div>

      </div>

      <div className="step-container">

        {/* Pregunta 1 */}
        <div className="form-group">
          <div className="question-box">
            <p>1.- El carro de demostración se encontraba en perfecto estado: limpio, con combustible y sin averías.</p>
          </div>
          <label>
            <input
              type="radio"
              name="carroPerfecto"
              value="Sí"
              checked={formData.carroPerfecto === "Sí"}
              onChange={handleChange}
            />
            Sí
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="carroPerfecto"
              value="No"
              checked={formData.carroPerfecto === "No"}
              onChange={handleChange}
            />
            No
          </label>
        </div>

        {/* Pregunta 2 (estrellas) */}
        <div className="form-group">
          <div className="question-box">
            <p>2.- ¿Qué tanto personalizó el asesor de ventas el Test Drive mostrándole las características o funcionalidades que se pueden probar en conducción, de acuerdo a sus necesidades?</p>
          </div>
          <div className="stars-group">
            <span>Nada</span>

            {[1, 2, 3, 4, 5].map((star) => (
              <label key={star} className="star-label">
                <input
                  type="radio"
                  name="personalizacion"
                  value={star}
                  checked={personalizationRating === star}
                  onChange={() => handleStarClick('personalizacion', star)}
                />
                <img
                  src={
                    personalizationRating >= star ? starComplete : starEmpty
                  }
                  alt={`Estrella ${star}`}
                  className="star-icon"
                />
              </label>
            ))}

            <span>Excelente</span> {/* Texto a la derecha */}

          </div>

        </div>

        {/* Pregunta 3 (estrellas) */}
        <div className="form-group">
          <div className="question-box">
            <p>3.- ¿Coincidieron las impresiones obtenidas de su experiencia durante el Test Drive con sus expectativas antes de la prueba?</p>
          </div>
          <div className="stars-group">
            <span>Nada</span>

            {[1, 2, 3, 4, 5].map((star) => (
              <label key={star} className="star-label">
                <input
                  type="radio"
                  name="expectativas"
                  value={star}
                  checked={expectationRating === star}
                  onChange={() => handleStarClick('expectativas', star)}
                />
                <img
                  src={expectationRating >= star ? starComplete : starEmpty}
                  alt={`Estrella ${star}`}
                  className="star-icon"
                />
              </label>
            ))}
            <span>Excelente</span> {/* Texto a la derecha */}

          </div>
        </div>


        {/* Pregunta 4 (opciones) */}
        <div className="form-group">
          <div className="question-box">
            <p>4.- ¿Qué le pareció la ruta y el tiempo tomado para probar el equipamiento más resaltante durante el Test Drive?</p>
          </div>
          <label>
            <input
              type="radio"
              name="rutaTiempo"
              value="Muy poco tiempo y ruta inadecuada"
              checked={formData.rutaTiempo === "Muy poco tiempo y ruta inadecuada"}
              onChange={handleChange}
            />
            Muy poco tiempo y ruta inadecuada
          </label>
          <label>
            <input
              type="radio"
              name="rutaTiempo"
              value="Tiempo aceptable pero ruta inadecuada"
              checked={formData.rutaTiempo === "Tiempo aceptable pero ruta inadecuada"}
              onChange={handleChange}
            />
            Tiempo aceptable pero ruta inadecuada
          </label>
          <label>
            <input
              type="radio"
              name="rutaTiempo"
              value="Ruta adecuada pero muy poco tiempo"
              checked={formData.rutaTiempo === "Ruta adecuada pero muy poco tiempo"}
              onChange={handleChange}
            />
            Ruta adecuada pero muy poco tiempo
          </label>
          <label>
            <input
              type="radio"
              name="rutaTiempo"
              value="Ruta adecuada pero mucho tiempo"
              checked={formData.rutaTiempo === "Ruta adecuada pero mucho tiempo"}
              onChange={handleChange}
            />
            Ruta adecuada pero mucho tiempo
          </label>
          <label>
            <input
              type="radio"
              name="rutaTiempo"
              value="Tiempo y ruta adecuada"
              checked={formData.rutaTiempo === "Tiempo y ruta adecuada"}
              onChange={handleChange}
            />
            Tiempo y ruta adecuada
          </label>
        </div>

        {/* Pregunta 5 (textarea) */}
        <div className="form-group">
          <div className="question-box">
            <p>5.- ¿Qué equipamiento o característica del vehículo fue lo que más le impresionó durante el Test Drive?</p>
          </div>
          <textarea
            name="caracteristicaFavorita"
            value={formData.caracteristicaFavorita}
            onChange={handleChange}
            rows={3}
          />
        </div>


        {/* BOTONES */}
        <div className="button-group">
          <button type="button" onClick={onBack}>Atrás</button>
          <button type="button" onClick={onReset}>Limpiar</button>
          <button type="button" onClick={onSubmitFinal}>Enviar</button>
        </div>
      </div>
    </div>
  )
}

export default StepTwoForm
