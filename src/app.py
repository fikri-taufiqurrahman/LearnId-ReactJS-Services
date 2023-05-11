from flask import Flask, request, jsonify
from flask_cors import CORS
from googletrans import Translator

app = Flask(__name__)
CORS(app, supports_credentials=True)

@app.route('/translate', methods=['POST'])
def translate():
    translator = Translator()
    data = request.get_json()
    text = data['text']
    translated_text = translator.translate(text, src='en', dest='id').text
    response = {
        'text': translated_text,
    }
    # Lakukan sesuatu dengan data yang diterima
    return jsonify(response)

if __name__ == '__main__':
    app.run(port=8080, debug=True)
