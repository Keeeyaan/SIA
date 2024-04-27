from keras.utils import pad_sequences
import tensorflow as tf
import numpy as np
import random
import string
import os

os.environ['TF_ENABLE_ONEDNN_OPTS']


def load_model(version: str):
    bot_models_directory = os.path.abspath(os.path.join(
        os.path.dirname(os.path.dirname(__file__)), "..", "bot_models"))

    return tf.keras.models.load_model(f"{bot_models_directory}/version_{version}.keras")


def chatbot_respond(inquiry: str, model, tokenizer, input_shape, le, responses):
    texts_p = []
    prediction_input = inquiry

    # removing punctuation and converting to lowercase
    prediction_input = [letters.lower(
    ) for letters in prediction_input if letters not in string.punctuation]
    prediction_input = ''.join(prediction_input)
    texts_p.append(prediction_input)

    # tokenizing and padding
    prediction_input = tokenizer.texts_to_sequences(texts_p)
    prediction_input = np.array(prediction_input).reshape(-1)
    prediction_input = pad_sequences([prediction_input], input_shape)

    # #getting output from model
    output = model.predict(prediction_input, verbose=0)
    predicted_prob = output.max()
    predicted_index = output.argmax()

    # finding the right tag and predicting
    response_tag = le.inverse_transform([predicted_index])[0]

    return {"response": random.choice(responses[response_tag]), "tag": response_tag}


def get_models():
    bot_models_directory = os.path.abspath(os.path.join(os.path.dirname(
        os.path.dirname(os.path.dirname(__file__))), "bot_models"))

    if not os.path.exists(bot_models_directory):
        os.makedirs(bot_models_directory)

    models = []

    if len(os.listdir(bot_models_directory)) > 0:
        for file in os.listdir(bot_models_directory):
            if file.endswith('.keras'):
                filename, _ = os.path.splitext(file)
                models.append(filename)

    return models
