
Sample application demonstrating how to build a sentiment analysis app usind Node.js and a couple modules.  
The application analyze iPhone6 hastag, connects to Twitter to get a stream of matching tweets, 
and runs those tweets through a sentiment-analysis module to produce a sentiment score.

You can play with an instance of the application running at http://sentimentanalysis-53d2d369-ee82-49bc-8158-2586b2912916.mybluemix.net



### Running the application on your desktop

Download the source of the application by selecting the SimpleSentimentAnalysis folder and selecting
"Export as zip" from the Actions menu

Unzip the application in a working directory.

Use npm to get the required modules:

    npm install

Run the application with node:

    node app.js



### Running the application using a Cloud Foundry PaaS runtime

If you have access to a Cloud Foundry-based runtime, like the Pivotal Cloud Foundry offering or IBM's BlueMix,
you can also run the application in those environments.


###Reference
We do not claim this project to be ours. We have used the Sentiment Analysis Twiiter application in sample project and made some changes to it for iPhone6.
