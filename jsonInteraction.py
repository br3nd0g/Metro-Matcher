import json

def updateLdrbData(name, score):

    file = open("/json/leaderboard.json", "r")
    jsonData = json.load(file)
    file.close()

    post = {"name": name, "score": score}
    jsonData["scores"].append(post)

    with open('/json/leaderboard.json', 'w') as outfile:
      json.dump(jsonData, outfile)

def getJsonData(fileName):
    
  file = open(f"/json/{fileName}.json", "r")
  jsonData = json.load(file)
  jsonData = json.dumps(jsonData)
  file.close()

  return jsonData