import base64
import cv2
import numpy as np
from skimage.metrics import structural_similarity as ssim

#master function that calls all related functions for comparing two images
def calculateScore(userSolution, metroName):
    
    img = readb64(userSolution)
    img = resizeImage(img)
    comparisonImg = getComparisonImage(metroName)

    #a function that uses the Structural Similarity Index to determine the difference/similarity between the two images
    simScore = ssim(img, comparisonImg, win_size=393, channel_axis=2)

    score = adjustToPercentage(simScore)

    return score

#function that decodes the user's solution which is in base64, and returns a opencv2 image object
def readb64(uri):
   
   encoded_data = uri.split(',')[1]
   nparr = np.fromstring(base64.b64decode(encoded_data), np.uint8)
   img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

   return img

#a function which opens the solution image with opencv2
def getComparisonImage(mName):

    img = cv2.imread(f"solutionImages/{mName}.png")
    return img

#a function that resizes the user's solution to the correct dimensions, so images can be compared
def resizeImage(image):

    #images must be same dimensions, solution image is 700x394, so it is resized to that
    image = cv2.resize(image, (700, 394))

    return image

#a function that adjusts the results of the SSIM calculation to a percentage from 0-100
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