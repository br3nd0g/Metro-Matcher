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
  #this converts it to a string (for js i think)
  #jsonData = json.dumps(jsonData)
  file.close()

  return jsonData