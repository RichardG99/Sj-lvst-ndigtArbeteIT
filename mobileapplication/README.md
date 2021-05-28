# Mobile Application

### CONFIGURATION:
In src/shared/settings.js, insert the correct server address and settings. Specific instructions are listed in that file. Also ensure that your backend (see [parse server README.md](../parse-server/README.md)) is up and running correctly, or the mobile application will refuse to work.

### HOW TO:
1. npm install expo-cli --global
2. npm install
4. npm start
This will start the metro bundler and launch a page where you can access the mobile application either via your mobile device, browser or simulator.
5. Install Expo GO on the device you want to run the application on (except if you're running it via a web browser) after that scan the QR code on the page.

### Dev notes:
* Speech to text is not currently available locally on the mobile device. The recordings are instead sent to the parse server for handling, so for the system to work ensure that the backend has been properly configured (see [parse server README.md](../parse-server/README.md) for more details).
