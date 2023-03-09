from flask import Flask, render_template, request, redirect, url_for
import dataHandling as dh
import dataPrep as dp
import scoreCalculation as sc
import jsonInteraction as ji

acceptedCities = ["newYork", "london", "singapore"]

#creating flask app and setting up url endpoints

app = Flask("Metro Matcher")
app.static_folder = 'static'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/leaderboard')
def leaderboard():

    leaderboardInfo = dh.getLeaderInfo()
    sortedLeaderboard = dh.sortLeaderboard(leaderboardInfo)
    readyLeaderInfo = dp.prepLeaderForJs(sortedLeaderboard)

    return render_template('leaderboard.html', leaderboardinfo=readyLeaderInfo)

@app.route('/game')
def game():
    city = request.args.get('city')
    if city not in acceptedCities: return redirect(url_for("index"))

    metroInfo = dh.getMetroInfo(city)
    metroInfo = dp.prepMetroForJs(metroInfo)

    return render_template('game.html', metroinfo=metroInfo, metroname=city)

@app.route('/score-calculation', methods=['POST'])
def scoreCalculation():

    if request.method == "POST":

        data = request.get_json()

        score = sc.calculateScore(data["solution"], data["metroName"])

        ji.updateLdrbData(data["metroName"], data["userName"], score)

        return {"score": score}

#running flask app
app.run(host='0.0.0.0', port=81, debug=True)