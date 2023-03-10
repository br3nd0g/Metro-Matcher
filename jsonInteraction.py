import json

#opens the leaderboard json and adds new data to it
def updateLdrbData(metroName, name, score):

    file = open("./json/leaderboard.json", "r")
    jsonData = json.load(file)
    file.close()

    log = {"name": name, "score": score}
    jsonData[metroName].append(log)

    with open('./json/leaderboard.json', 'w') as outfile:
      json.dump(jsonData, outfile)

#returns the json data of a specified file
def getJsonData(fileName):
    
  file = open(f"./json/{fileName}.json", "r")
  jsonData = json.load(file)
  file.close()

  return jsonData