from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from .predict import make_prediction 
from .lung_predict import lung_prediction

import json
import logging

logger = logging.getLogger(__name__)

@csrf_exempt
@require_POST
def prediction_view(request):
    try:
        # Utilisez `request.body` pour récupérer les données brutes de la requête POST
        data = json.loads(request.body)
        print(data)
        
        # Assumez que les données sont envoyées en tant que dictionnaire
        prediction = make_prediction(data)

        # Convertissez les résultats en un format JSON sérialisable
        prediction_list = prediction.tolist() if hasattr(prediction, 'tolist') else prediction

        return JsonResponse({'prediction': prediction_list})
    except Exception as e:
        logger.error(f"An error occurred: {str(e)}")
        return JsonResponse({'error': 'Internal Server Error'}, status=500)
    
@csrf_exempt
def lung_view(request):
    if request.method == 'POST':
        # Vérifiez si le fichier a été envoyé dans la requête
        if 'file' not in request.FILES:
            return JsonResponse({'error': 'No file uploaded'}, status=400)

        # Récupérez le fichier de la requête
        file = request.FILES['file']

        try:
            # Utilisez votre fonction de prédiction pour obtenir une prédiction
            prediction = lung_prediction(file)
        except Exception as e:
            return JsonResponse({'error': 'Prediction failed: {}'.format(e)}, status=500)

        # Renvoyez la prédiction dans la réponse
        return JsonResponse({'prediction': prediction})

    else:
        return JsonResponse({'error': 'Invalid request'}, status=400)
