# Augmented Audio: Server

### CONFIGURATION:
In src/Settings.js, fill out the details of the server you are running on in the correct fields, and set whether this is intended to be the development server or the "live-deploy" server. By convention, we recommend that the live-deploy server only runs the "stable" branch at all times.

Note that the server URL is NOT the relative URL, but the "true" URL of the destination server. The database URI, however, is declared RELATIVE to the server, thus most likely being "mongodb://localhost" if running the database on the same computer as the server.

### STARTING THE SERVER:
1. npm install
2. Open up two different terminals
3. In the first terminal run: npm run build
4. In the second terminal run: npm run start
5. The web service can now be accessed at the address filled out in the configuration

### FILE/ COMPONENT STRUCTURE:

The web application is made out of components that you can find inside src/shared. Each page on the application is a separate component that can be found inside the pages folder. The pages have several child components that can be found in their respective folder inside the Components folder. 

src/server contains the Parse Server entry point code, and src/browser contains the website's entry point. src/cloud contains any code needed to handle speech-to-text services.

### Dev notes:
* Speech to text API - During the development of Augmented Audio IBM speech-to-text was used to transcribe voice commands for the mobile application. The credentials for this service may need to be reconfigured if this project is picked up again. This is configured in src/cloud/main.js: you will need to insert both an API key and a service URL for it to function as intended.

