// src/components/Form.jsx

import React, { useState } from 'react';
import axios from 'axios';

function Form() {
  const [formData, setFormData] = useState({
    // Ajoutez les champs de votre formulaire ici
    age: '',
    sex: '',
    cp: '',
    trtbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalachh: '',
    exng: '',
    oldpeak: '',
    slp: '',
    caa: '',
    thall: '',
  });

  const [prediction, setPrediction] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        'http://localhost:8000/api/predict/',
        JSON.stringify(formData),  // Convertissez formData en JSON
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Erreur lors de la prédiction :', error);
    }
  };
  
  return (
    <div>
      <h1>Interface de prédiction</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Age:
          <input type="text" name="age" value={formData.age} onChange={handleChange} />
        </label>
        <br />
        <label>
          Sexe (Masculin / Feminin):
          <input type="text" name="sex" value={formData.sex} onChange={handleChange} />
        </label>
        <br />
        <label>
          Douleur thoracique (angine de poitrine):
          <input type="text" name="cp" value={formData.cp} onChange={handleChange} />
        </label>
        <br />
        <label>
          Tension artérielle au repos:
          <input type="text" name="trtbps" value={formData.trtbps} onChange={handleChange} />
        </label>
        <br />
        <label>
          Cholesterol sérique:
          <input type="text" name="chol" value={formData.chol} onChange={handleChange} />
        </label>
        <br />
        <label>
          Taux de sucre dans le sang à jeun:
          <input type="text" name="fbs" value={formData.fbs} onChange={handleChange} />
        </label>
        <br />
        <label>
          Électrocardiogramme au repos:
          <input type="text" name="restecg" value={formData.restecg} onChange={handleChange} />
        </label>
        <br />
        <label>
          Fréquence cardiaque maximale atteinte:
          <input type="text" name="thalachh" value={formData.thalachh} onChange={handleChange} />
        </label>
        <br />
        <label>
          Angine provoquée par l'exercice:
          <input type="text" name="exng" value={formData.exng} onChange={handleChange} />
        </label>
        <br />
        <label>
          Dépression de l'onde ST induite par l'éxercice par rapport au repos:
          <input type="text" name="oldpeak" value={formData.oldpeak} onChange={handleChange} />
        </label>
        <br />
        <label>
          Pente du segment ST d'exercice:
          <input type="text" name="slp" value={formData.slp} onChange={handleChange} />
        </label>
        <br />
        <label>
          Nombre de vaisseaux principaux colorés par la fluoroscopie:
          <input type="text" name="caa" value={formData.caa} onChange={handleChange} />
        </label>
        <br />
        <label>
          Résultat du test de stress thallium:
          <input type="text" name="thall" value={formData.thall} onChange={handleChange} />
        </label>
        <br />
        <br />
        <button type="submit">Prédire</button>
      </form>
      {prediction && <p>Résultat de la prédiction : {prediction}</p>}
      <br />
      <hr />
      <br />
    </div>
  );
}

export default Form;
