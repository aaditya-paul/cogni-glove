from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
import requests

backend_url = "http://192.168.131.96:3001/api/data"
app = Flask(__name__)

# Load the models once when the server starts
keras_model = load_model("model.h5")
interpreter = tf.lite.Interpreter(model_path="model.tflite")
interpreter.allocate_tensors()

def get_gesture_name_from_id(id) -> str:
    ret = "up"
    if id == 1:
        ret = "i"
    if id == 2:
        ret = "heart"
    if id == 3:
        ret = "s"
    if id == 4:
        ret = "c"
    if id == 5:
        ret = "1"
    if id == 6:
        ret = "right"
    if id == 7:
        ret = "left"
    if id == 8:
        ret = "ok"
    return ret

def predict_with_keras_model(model, input_data):
    """
    Perform inference using a Keras model.
    """
    predictions = model.predict(input_data)
    predicted_classes = np.argmax(predictions, axis=-1)
    return predicted_classes


def predict_with_tflite_model(interpreter, input_data):
    """
    Perform inference using a TensorFlow Lite model.
    """
    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()

    interpreter.set_tensor(input_details[0]["index"], input_data)
    interpreter.invoke()
    predictions = interpreter.get_tensor(output_details[0]["index"])
    predicted_classes = np.argmax(predictions, axis=-1)
    return predicted_classes

from flask import Flask, request

app = Flask(__name__)


@app.route("/api/csv", methods=["POST"])
def api_endpoint():
    # Print the input payload to the console
    features = request.json["csv"].split(",")
    # print(features)
    for i, x in enumerate(features):
        try:
            features[i] = np.float32(x.strip())
        except:
            pass
    print(features)
    input_data = np.array(features[0:-1])
    predictions = predict_with_tflite_model(interpreter, [input_data])
    print(predictions)

    # params = {"gesture_name": get_gesture_name_from_id(predictions)}

    # Make the POST request
    response = requests.post(backend_url, json={"gesture": get_gesture_name_from_id(predictions)})
    print("backend response: ", response.text)

    # Send a response back to the client
    return "Payload received", 200


if __name__ == "__main__":
    # Start the server
    app.run(host="0.0.0.0", port=3000)
