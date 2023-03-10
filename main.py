#importing flask library, and other python files
from flask import Flask, render_template, request, redirect, url_for
import dataHandling as dh
import dataPrep as dp
import scoreCalculation as sc
import jsonInteraction as ji

#cities which are to be accepted in the url query
acceptedCities = ["newYork", "london", "singapore"]

#creating flask app and setting up url endpoints
app = Flask("Metro Matcher")
app.static_folder = 'static'

#url endpoint for the index/home page, returns the index.html page
@app.route('/')
def index():
    return render_template('index.html')

#url endpoint for the leaderboard page, gets the leaderboard info, sorts it and returns the leaderboard.html page, passing the leaderboard info through to it
@app.route('/leaderboard')
def leaderboard():

    leaderboardInfo = dh.getLeaderInfo()
    sortedLeaderboard = dh.sortLeaderboard(leaderboardInfo)
    readyLeaderInfo = dp.prepLeaderForJs(sortedLeaderboard)

    return render_template('leaderboard.html', leaderboardinfo=readyLeaderInfo)

#url endpoint for the game page, which gets the data for the chosen metro specified in the url query, and returns game.html passing through the relative info
@app.route('/game')
def game():
    city = request.args.get('city')
    if city not in acceptedCities: return redirect(url_for("index"))

    metroInfo = dh.getMetroInfo(city)
    metroInfo = dp.prepMetroForJs(metroInfo)

    return render_template('game.html', metroinfo=metroInfo, metroname=city)

#endpoing for sending a POST request to from JavaScript, to retrieve the user's submission, calculate score, add to the leaderboard and return the score to the front-end
@app.route('/score-calculation', methods=['POST'])
def scoreCalculation():

    if request.method == "POST":

        data = request.get_json()

        score = sc.calculateScore(data["solution"], data["metroName"])

        ji.updateLdrbData(data["metroName"], data["userName"], score)

        return {"score": score}

#running flask app
app.run(host='0.0.0.0', port=81, debug=True)