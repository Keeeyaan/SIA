from keras.layers import Embedding, LSTM, Dense, Bidirectional
from keras.preprocessing.text import Tokenizer
from keras.callbacks import EarlyStopping
from keras.optimizers import Adam
from keras.utils import pad_sequences
from keras.models import Sequential

from sklearn.preprocessing import LabelEncoder

import pandas as pd
import os

def init(data: object):
    # Creating the Model
    # getting all the data to lists
    tags = []
    inputs = []
    responses={}

    for intent in data['intents']:
      responses[intent.tag] = intent.responses

      for lines in intent.patterns:
        inputs.append(lines)
        tags.append(intent.tag)
        
    # converting to dataframe
    data = pd.DataFrame({"inputs":inputs, "tags":tags})

    tokenizer = Tokenizer(num_words=2000)
    tokenizer.fit_on_texts(data['inputs'])
    train = tokenizer.texts_to_sequences(data['inputs'])

    x_train = pad_sequences(train)

    le = LabelEncoder()
    y_train = le.fit_transform(data['tags'])

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
    # Create the model
    model = Sequential()
    model.add(Embedding(vocabulary_size + 1, 128, input_length=input_shape))
    model.add(Bidirectional(LSTM(64, return_sequences=True)))
    model.add(Bidirectional(LSTM(64)))
    model.add(Dense(output_length, activation='softmax'))
    
    model.compile(loss="sparse_categorical_crossentropy", optimizer=Adam(lr=0.001), metrics=['accuracy'])
    
    model.summary()

    return model
  

def fit_model(model, x_train, y_train):
    early_stopping = EarlyStopping(monitor="loss", patience=10, restore_best_weights=True)
    model.fit(x_train, y_train, epochs=1000, verbose=1, callbacks=[early_stopping])

    return model


def save_model(model, filename, extension):
  current_working_directory = os.path.dirname(os.path.abspath(__file__))

  model.save(f"{current_working_directory}/versions/{filename}.{extension}")