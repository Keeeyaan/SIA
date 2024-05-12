from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer

from keras.utils import pad_sequences

import tensorflow as tf
import numpy as np
import random
import string

from os import environ, makedirs, listdir
from os.path import abspath, join, dirname, exists, splitext

from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk import download

from re import compile, sub, IGNORECASE

environ['TF_ENABLE_ONEDNN_OPTS']
download('stopwords')
download('punkt')


def out_of_scope_detector(inquiry: str, data: dict, threshold: float = 0.6):
    # Combine patterns into a single list
    pattern_texts = []

    for intent in data.get('intents'):
        for lines in intent.patterns:
            pattern_texts.append(lines)

    # Vectorize patterns and input query
    vectorizer = TfidfVectorizer()
    pattern_vectors = vectorizer.fit_transform(pattern_texts)
    query_vector = vectorizer.transform([inquiry])

    # Calculate cosine similarity between query and patterns
    similarities = cosine_similarity(query_vector, pattern_vectors)

    # Check if maximum similarity is below threshold
    if np.max(similarities) < threshold:
        return True
    else:
        return False


def remove_stop_words(inquiry: str) -> str:
    words = word_tokenize(inquiry)

    stop_words = set(stopwords.words('english'))

    filtered_words = [word for word in words if word.lower() not in stop_words]

    return " ".join(filtered_words)


def load_model(version: str):
    bot_models_directory = abspath(join(
        dirname(dirname(__file__)), "..", "bot_models"))

    return tf.keras.models.load_model(f"{bot_models_directory}/version_{version}.keras")


def chatbot_respond(inquiry: str, model, tokenizer, input_shape, le, responses, intents):
    regex_pattern = compile(r'\b(?:University of Cebu)\b', flags=IGNORECASE)

    new_inquiry = sub(regex_pattern, 'uc', inquiry)

    if out_of_scope_detector(remove_stop_words(new_inquiry), intents) == True:
        return {"response": "I apologize, but it seems that your question falls outside the scope of my current capabilities. Could you rephrase your question or provide more details so I can better assist you?", "tag": "oos"}

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
    bot_models_directory = abspath(join(dirname(
        dirname(dirname(__file__))), "bot_models"))

    if not exists(bot_models_directory):
        makedirs(bot_models_directory)

    models = []

    if len(listdir(bot_models_directory)) > 0:
        for file in listdir(bot_models_directory):
            if file.endswith('.keras'):
                filename, _ = splitext(file)
                models.append(filename)

    return models
