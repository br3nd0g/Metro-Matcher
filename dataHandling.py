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
