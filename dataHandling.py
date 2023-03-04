import jsonInteraction as ji

class leaderboardLog:
    def __init__(self, name, score):
        self.name = name
        self.score = score

class lineInfo:
    def __init__(self, colour, name, stops):
        self.colour = colour
        self.name = name
        self.stops = stops

class metroInfo:
    def __init__(self, name):
        self.name = name
        self.lines = []

def getMetroInfo(metroName):
    
    metrosJson = ji.getJsonData("metros")
    chosenMetroJson = metrosJson[metroName]

    metro = metroInfo(metroName)

    for line in chosenMetroJson:
        
        lineRecord = lineInfo(line["colour"], line["name"], line["stops"])
        metro.lines.append(lineRecord)

    return metro

def getLeaderInfo():

    leaderboards = {}

    leaderJson = ji.getJsonData("leaderboard")

    for city in leaderJson:
        leaderboards[city] = []


        for data in leaderJson[city]:

            log = leaderboardLog(data["name"], data["score"])
            leaderboards[city].append(log)

    return leaderboards

def sortLeaderboard(leaderboardDict):

    for city in leaderboardDict:



        for outer in range (len(leaderboardDict[city])-1,0,-1):
            for inner in range(outer):

                if leaderboardDict[city][inner].score > leaderboardDict[city][inner+1].score:

                    temp = leaderboardDict[city][inner]

                    leaderboardDict[city][inner] = leaderboardDict[city][inner+1]
                    leaderboardDict[city][inner+1] = temp

        leaderboardDict[city] = leaderboardDict[city][::-1]

        if len(leaderboardDict[city]) > 25:
            leaderboardDict[city] = leaderboardDict[city][0:25]
    
    return leaderboardDict