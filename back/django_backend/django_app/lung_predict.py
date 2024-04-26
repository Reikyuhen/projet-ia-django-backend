from PIL import Image
import numpy as np
from tensorflow.keras.models import load_model
import os

# Charger le modèle une seule fois lors de l'initialisation
model_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), 'poumon.h5')
model = load_model(model_path)

def lung_prediction(file):
    try:
        # Étape 1 : Lire le fichier image
        image = Image.open(file)
        
        # Vérifier que l'image est en niveaux de gris
        if image.mode != 'L':
            raise ValueError("L'image doit être en niveaux de gris.")
        
        # Étape 2 : Prétraiter l'image
        image = image.resize((220, 220))
        image = np.array(image) / 255.0
        image = np.expand_dims(image, axis=-1)
        image = np.repeat(image, 3, axis=-1)
        image = np.expand_dims(image, axis=0)

        # Étape 3 : Faire une prédiction
        prediction = model.predict(image)

        prediction = prediction.tolist()

        print(prediction)

        # Ici, vous pouvez traiter la prédiction comme vous le souhaitez.
        return prediction

    except Exception as e:
        print(f"Une erreur s'est produite : {e}")
        return None
