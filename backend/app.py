from flask import Flask, jsonify, request
from flask_cors import CORS
from predict import predict
import dill

app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return 'Server Works!!!'


@app.route('/score', methods=['POST'])
def score():
    # try:
    json_to_score = request.get_json(force=True)
    prediction = predict(json_to_score, score_df)
    print(prediction)
    # except BaseException:
    #     prediction = {
    #         'y_true': 112000,
    #         'y_predict': 107917
    #     }
    return jsonify(prediction)


if __name__ == '__main__':
    dill._dill._reverse_typemap['ClassType'] = type
    with open('scored.dill', 'rb') as score_stream:
        score_df = dill.loads(score_stream.read()).reset_index()
    print(score_df.head(1))
    app.run(host='0.0', debug=True)
