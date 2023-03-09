import json

def updateLdrbData(metroName, name, score):

    file = open("./json/leaderboard.json", "r")
    jsonData = json.load(file)
    file.close()

    log = {"name": name, "score": score}
    jsonData[metroName].append(log)

    with open('./json/leaderboard.json', 'w') as outfile:
      json.dump(jsonData, outfile)

def getJsonData(fileName):
    
  file = open(f"./json/{fileName}.json", "r")
  jsonData = json.load(file)
  file.close()

  return jsonData