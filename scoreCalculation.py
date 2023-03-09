import base64
import cv2
import numpy as np
from skimage.metrics import structural_similarity as ssim

def calculateScore(userSolution, metroName):
    
    img = readb64(userSolution)
    img = resizeImage(img)
    comparisonImg = getComparisonImage(metroName)

    simScore = ssim(img, comparisonImg, win_size=393, channel_axis=2)

    score = adjustToPercentage(simScore)

    return score

def readb64(uri):
   
   encoded_data = uri.split(',')[1]
   nparr = np.fromstring(base64.b64decode(encoded_data), np.uint8)
   img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

   return img

def getComparisonImage(mName):

    img = cv2.imread(f"solutionImages/{mName}.png")
    return img

def resizeImage(image):

    #images must be same dimensions, solution image is 700x394, so it is resized to that
    image = cv2.resize(image, (700, 394))

    return image

def adjustToPercentage(ssimScore):
    
    stringScore = str(ssimScore)
    percentageString = stringScore[0:4].replace(".","")
    percentage = int(percentageString)
    
    if percentage < 11:
        percentage *= 10
    elif percentage < 21:
        percentage *= 5
    else:
        percentage *= 2.2

    return percentage