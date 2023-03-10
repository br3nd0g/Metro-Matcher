import jsonInteraction as ji

#class for each place on the leaderboard
class leaderboardLog:
    def __init__(self, name, score):
        self.name = name
        self.score = score

#class for each metro line's info
class lineInfo:
    def __init__(self, colour, name, stops):
        self.colour = colour
        self.name = name
        self.stops = stops

#class for a metro's info
class metroInfo:
    def __init__(self, name):
        self.name = name
        self.lines = []

#gets the info of a metro and adds it to a class
def getMetroInfo(metroName):
    
    #calls a function which reads the json and returns a python dictionary, then selects the wanted metro with its name
    metrosJson = ji.getJsonData("metros")
    chosenMetroJson = metrosJson[metroName]

    #creates a metroInfo class
    metro = metroInfo(metroName)

    #for every line in the dictionary, it creates a lineInfo class and appends it to the metro object's lines attribute
    for line in chosenMetroJson:
        
        lineRecord = lineInfo(line["colour"], line["name"], line["stops"])
        metro.lines.append(lineRecord)

    return metro

def getLeaderInfo():


    leaderboards = {}

    #returns json leaderboard as python dictionary
    leaderJson = ji.getJsonData("leaderboard")

    #filling the leaderboards dictionary with the metros' respective leaderboard data as leaderboardLog classes
    for city in leaderJson:
        leaderboards[city] = []


        for data in leaderJson[city]:

            log = leaderboardLog(data["name"], data["score"])
            leaderboards[city].append(log)

    return leaderboards

def sortLeaderboard(leaderboardDict):

    #sorts leaderboard info with a bubble sort
    for city in leaderboardDict:
        for outer in range (len(leaderboardDict[city])-1,0,-1):
            for inner in range(outer):

                if leaderboardDict[city][inner].score > leaderboardDict[city][inner+1].score:

                    temp = leaderboardDict[city][inner]

                    leaderboardDict[city][inner] = leaderboardDict[city][inner+1]
                    leaderboardDict[city][inner+1] = temp

        leaderboardDict[city] = leaderboardDict[city][::-1]

        #limits the length of the leaderboard to 25 logs if it is greater than 25, as specified by design
        if len(leaderboardDict[city]) > 25:
            leaderboardDict[city] = leaderboardDict[city][0:25]
    
    return leaderboardDict