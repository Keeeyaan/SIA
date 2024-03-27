from keras.utils import pad_sequences
import tensorflow as tf
import numpy as np
import random
import string
import os


os.environ['TF_ENABLE_ONEDNN_OPTS']


def load_model(version: str):
    current_working_directory = os.path.dirname(os.path.abspath(__file__))

    return tf.keras.models.load_model(f"{current_working_directory}/bot_models/version_{version}.keras")


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

    return random.choice(responses[response_tag])
