# django_app/predict.py

# Importe le modèle sauvegardé avec joblib
# Assure-toi que le modèle est bien sauvegardé dans un fichier joblib (ex: model.joblib)

# Importe les bibliothèques nécessaires
from joblib import load
import numpy as np
import pandas as pd
import os

# Chemin vers le modèle joblib
model_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), 'heart.joblib')

# Charge le modèle
saved_model = load(model_path)

# Fonction principale pour faire la prédiction
def make_prediction(data):
    
    col_name = ['age', 'sex', 'cp', 'trtbps', 'chol', 'fbs', 'restecg', 'thalachh', 'exng', 'oldpeak', 'slp', 'caa', 'thall' ]
    
    patient_data = np.array([
        [float(data.get('age', 0)),
         float(data.get('sex', 0)),
         float(data.get('cp', 0)),
         float(data.get('trtbps', 0)),
         float(data.get('chol', 0)),
         float(data.get('fbs', 0)),
         float(data.get('restecg', 0)),
         float(data.get('thalachh', 0)),
         float(data.get('exng', 0)),
         float(data.get('oldpeak', 0)),
         float(data.get('slp', 0)),
         float(data.get('caa', 0)),
         float(data.get('thall', 0))]
    ])

    print(patient_data)

    # Effectue la transformation PCA
    patient_data_df = pd.DataFrame(patient_data,columns=col_name)

    print(patient_data_df)

    # Effectue la prédiction avec le modèle
    prediction = 1 - saved_model.predict(patient_data_df)

    print(prediction)

    # Renvoie le résultat de la prédiction
    return prediction