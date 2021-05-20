# Parse Server

### HOW TO:
1. npm install
2. Open up two different terminals
3. In the first terminal run: npm run build
4. In the second terminal run: npm run start in the other
5. The web service can now be accessed at localhost:1337

When setting up the server for the first time, you need to connect it to your MongoDB by adding the connection string in index.js as your databaseURI. 

You also need to configure the S3 file adapter by adding the S3 Keys and name of your S3 bucket. A guide on how to set it up can be found here: https://docs.parseplatform.org/parse-server/guide/#configuring-s3adapter


### FILE/ COMPONENT STRUCTURE:

The web application is made out of components that you can find inside src/shared. Each page on the application is a separate component that can be found inside the pages folder. The pages have several child components that can be found in their respective folder inside the Components folder. 

### Dev notes:
* Speech to text API - During the development of Augmented Audio google speech-to-text was used to transcribe voice commands for the mobile application. The requests for transcription are still being sent from the mobile application, however the API credentials are inactive and have been removed. To be able to use speech-to-text again you may either sign up for the [google speech to text service](https://cloud.google.com/speech-to-text) and add the API credentials in the cloud function called speechToText in the [cloud code definitions](./src/cloud/main.js). The fields required are private_key, client_email and project_id.

