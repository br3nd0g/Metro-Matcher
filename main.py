from flask import Flask, render_template, request, redirect, url_for
import dataHandling as dh
import dataPrep as dp
import scoreCalculation as sc


#creating flask app and setting up url endpoints

app = Flask("Metro Matcher")
app.static_folder = 'static'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/leaderboard')
def leaderboard():
    return render_template('leaderboard.html')

@app.route('/game')
def game():
    city = request.args.get('city')
    if city == None: return redirect(url_for("index"))

    metroInfo = dh.getMetroInfo(city)
    metroInfo = dp.prepForJs(metroInfo)

    return render_template('game.html', metroinfo=metroInfo, metroname=city)

#running flask app
app.run(host='0.0.0.0', port=81, debug=True)