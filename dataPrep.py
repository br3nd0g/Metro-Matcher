import json

def prepForJs(metroRecord):

    metroJson = []

    for line in metroRecord.lines:

        lineDict = {}
        lineDict["name"] = line.name
        lineDict["colour"] = line.colour
        lineDict["stops"] = line.stops

        metroJson.append(lineDict)

    metroJson = json.dumps(metroJson)

    return metroJson