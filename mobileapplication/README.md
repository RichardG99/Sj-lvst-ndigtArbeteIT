# Mobile Application

### HOW TO:
1. npm install expo-cli --global
2. npm install
3. create file src/shared/serverIP.js with the current code snippet in it, Where "yourIP" should be replace with the IP address of the server running the Dreamscape parse server:
```Javascript
const serverIP = "yourIP"
export default serverIP;
```
4. npm start
This will start the metro bundler and launch a page where you can access the mobile application either via your mobile device, browser or simulator.
5. Install Expo CLI on the device you want to run the application on (except if you're running it via a web browser) after that scan the QR code on the page.

### Dev notes:
* Speech to text is not available currently on the parse server side and thus will not be supported in the mobile application either. The recordings are sent to the parse server but never handled, see [parse server README.md](../parse-server/README.md) for more details.
* A log in screen was not implemented on the mobile application, therefor the user log in credentials are hardcoded inside [Home.js](./src/shared/components/Home.js). Since access to the original database will not be available for use other valid credentials must be provided.
