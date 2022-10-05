from flask import Flask, render_template, request, redirect

app = Flask("Metro Matcher")
app.static_folder = 'static'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/leaderboard')
def leaderboard():
    return render_template('index.html')

@app.route('/game')
def game():
    city = request.args.get('city')
    if city == None: return redirect(url_for("index"))

    return render_template('index.html')


app.run(host='0.0.0.0', port=81, debug=True)