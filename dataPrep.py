import json

#takes the metro class and transforms it (back) in to json format, so that javascript can read it
def prepMetroForJs(metroRecord):

    metroJson = []

    for line in metroRecord.lines:

        lineDict = {}
        lineDict["name"] = line.name
        lineDict["colour"] = line.colour
        lineDict["stops"] = line.stops

        metroJson.append(lineDict)

    metroJson = json.dumps(metroJson)

    return metroJson

#takes the leaderboard dictoonary full of leaderboardLog classes and transforms it (back) in to json format, so that javascript can read it
def prepLeaderForJs(leaderboardDict):

    dataForJs = {}

    for city in leaderboardDict:
        dataForJs[city] = []

    for city in leaderboardDict:

        for leaderLog in leaderboardDict[city]:
            dataForJs[city].append({"name": leaderLog.name, "score": leaderLog.score})

    dataForJs = json.dumps(dataForJs)

    return dataForJs