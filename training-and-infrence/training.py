import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import numpy as np
import tensorflow as tf
import matplotlib.pyplot as plt
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense

def train(input_file):
    # Load the data
    data = pd.read_csv(input_file)
    
    X = data.iloc[:, :-1].values  # Features
    y = data.iloc[:, -1].values   # Label

    NUM_GESTURES = len(set(y))

    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

    # Standardize features
    scaler = StandardScaler()
    X_train = scaler.fit_transform(X_train)
    X_test = scaler.transform(X_test)

    # Define the model
    model = tf.keras.Sequential()
    model.add(Dense(128, input_dim=X_train.shape[1], activation='relu'))
    model.add(tf.keras.layers.Dense(64, activation='relu'))
    model.add(tf.keras.layers.Dense(NUM_GESTURES, activation='softmax')) 
    model.compile(optimizer='rmsprop', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
    history = model.fit(X_train, y_train, epochs=1000, batch_size=128, shuffle=True, validation_data=(X_test, y_test))

    # Increase the size of the graphs. The default size is (6,4).
    plt.rcParams["figure.figsize"] = (5,3)
    # Graph the loss
    loss = history.history['loss']
    val_loss = history.history['val_loss']
    epochs = range(1, len(loss) + 1)
    plt.plot(epochs, loss, 'g.', label='Training loss')
    plt.plot(epochs, val_loss, 'b', label='Validation loss')
    plt.title('Training and validation loss')
    plt.xlabel('Epochs')
    plt.ylabel('Loss')
    plt.legend()
    plt.show()

    # Convert predictions to class labels
    predictions = np.argmax(model.predict(X_test), axis=-1)
    
    print("input shape" , X_test.shape)
    print("pred shape" , predictions.shape)
    print("predictions =\n", predictions)

    print("actual =\n", y_test)
    a = np.abs(predictions - y_test)
    print(a)

    # Evaluate the model
    loss, accuracy = model.evaluate(X_test, y_test)
    print(f'Accuracy: {accuracy:.2f}')

    # Save the TensorFlow model
    model.save('model.h5')

    # Convert to TensorFlow Lite
    converter = tf.lite.TFLiteConverter.from_keras_model(model)
    converter.experimental_new_converter = True
    converter.target_spec.supported_ops = [tf.lite.OpsSet.TFLITE_BUILTINS]
    tflite_model = converter.convert()

    # Save the TensorFlow Lite model
    with open('model.tflite', 'wb') as f:
        f.write(tflite_model)

    return True

train("combined_output.csv")
