import React, { useState } from "react";
import axios from 'axios';

function Img() {

    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [fileURL, setFileURL] = useState(null);
    const [error, setError] = useState(null);
    const [prediction, setPrediction] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
        setFileURL(URL.createObjectURL(e.target.files[0]));
        e.target.value = null; // reset the value
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post('http://localhost:8000/api/lung/', formData);
            const result = response.data;
            console.log(result);
            if (result.prediction == null) {
                setError("Erreur de formatage, veuillez réessayer avec une autre photo.");
                setPrediction("");
            } else {
                if (result.prediction[0][0] < 0.5) {
                    setError("");
                    setPrediction(`Poumons sains avec un pourcentage de possible infection à ${((result.prediction[0][0])*100).toFixed(2)} %`);
                } else {
                    setError("");
                    setPrediction(`Poumons malades avec un pourcentage d'infection à ${((result.prediction[0][0])*100).toFixed(2)} %`);
                }
            }
        } catch (error) {
            console.error('Upload failed', error);
            setError("Une erreur s'est produite lors de l'envoi de l'image. Veuillez réessayer.");
            setPrediction("");
        }
    };

    return (
        <div className="img">
            <form onSubmit={handleSubmit}>
                <input 
                type="file"
                onChange={handleFileChange}
                />
                {fileName && <p>Fichier sélectionné : {fileName}</p>}
                {fileURL && <img src={fileURL} alt={fileName} style={{width: '30%'}} />}
                <br />
                <br />
                <button type="submit">Upload</button>
                <br />
                <hr />
            </form>
            {error && <p style={{color: 'red'}}>{error}</p>}
            {prediction && <p>Résultat de la prédiction : {prediction}</p>}
        </div>
    );
}

export default Img;
