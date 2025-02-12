from nltk.sentiment.vader import SentimentIntensityAnalyzer
from nltk import download

from os.path import abspath, join, dirname, exists
from os import makedirs

from sklearn.preprocessing import LabelEncoder

from keras.layers import Embedding, LSTM, Dense, Bidirectional
from keras.callbacks import EarlyStopping
from keras.optimizers import Adam
from keras.utils import pad_sequences
from keras.models import Sequential

from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.layers import Dropout

download('vader_lexicon')

def init(data: dict) -> dict:
    tags = []
    inputs = []
    responses = {}

    for intent in data['intents']:
        responses[intent.tag] = intent.responses

        for lines in intent.patterns:
            inputs.append(lines)
            tags.append(intent.tag)

    tokenizer = Tokenizer(num_words=5000)
    tokenizer.fit_on_texts(inputs)
    train = tokenizer.texts_to_sequences(inputs)

    x_train = pad_sequences(train)

    le = LabelEncoder()
    y_train = le.fit_transform(tags)

    input_shape = x_train.shape[1]
    vocabulary_size = len(tokenizer.word_index)
    output_length = le.classes_.shape[0]

    return {
        "input_shape": input_shape,
        "responses": responses,
        "vocabulary_size": vocabulary_size,
        "output_length": output_length,
        "x_train": x_train,
        "y_train": y_train,
        "tokenizer": tokenizer,
        "label_encoder": le,
    }


def create_model(vocabulary_size, input_shape, output_length):
    # model = Sequential()
    # model.add(Embedding(vocabulary_size + 1, 200, input_length=input_shape))
    # model.add(Bidirectional(LSTM(64, return_sequences=True)))
    # model.add(Bidirectional(LSTM(64)))
    # model.add(Dense(output_length, activation='softmax'))

    # model.compile(loss="sparse_categorical_crossentropy", optimizer=Adam(learning_rate=0.001), metrics=['accuracy'])

    # model.summary()

    model = Sequential()
    model.add(Embedding(vocabulary_size + 1, 200, input_length=input_shape))
    model.add(Bidirectional(LSTM(32, return_sequences=True)))
    model.add(Dropout(0.2))
    model.add(Bidirectional(LSTM(32)))
    model.add(Dropout(0.2))
    model.add(Dense(output_length, activation='softmax'))

    model.compile(loss="sparse_categorical_crossentropy",
                  optimizer=Adam(learning_rate=0.001), metrics=['accuracy'])

    model.summary()
    return model


def fit_model(model, x_train, y_train):
    early_stopping = EarlyStopping(
        monitor="accuracy", patience=3, restore_best_weights=True)

    model.fit(x_train, y_train, epochs=100,
              verbose=1, callbacks=[early_stopping])

    return model


def save_model(model, filename, extension):
    bot_models_directory = abspath(join(
        dirname(dirname(__file__)), "..", "bot_models"))

    if not exists(bot_models_directory):
        makedirs(bot_models_directory)

    model.save(
        f"{bot_models_directory}/{filename}.{extension}")


def analyze_sentiment(text: str):
    sid = SentimentIntensityAnalyzer()

    scores = sid.polarity_scores(text)

    if scores['compound'] >= 0.05:
        sentiment = 'Positive'
    elif scores['compound'] <= -0.05:
        sentiment = 'Negative'
    else:
        sentiment = 'Neutral'

    return sentiment
