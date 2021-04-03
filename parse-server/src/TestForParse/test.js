function testHTMLRAW() {
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Parse Server Example</title>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/pure/0.6.0/grids-min.css" rel="stylesheet">
        <link href="/public/assets/css/style.css" rel="stylesheet">
      </head>
    
      <body>
        <div class="container">
          <div class="align-center">
            <img id="parse-logo" src="/public/assets/images/parse-logo.png">
          </div>
    
          <div class="advice">
            <p><strong>Hi</strong>! We've prepared a small 3-steps page to assist you testing your local Parse server.</p>
            <p>These first steps will help you run and test the Parse server locally and were referrenced by the <a href="https://github.com/ParsePlatform/parse-server/wiki/Migrating-an-Existing-Parse-App">migration guide</a> provided by <a href="https://github.com/ParsePlatform/">Parse Platform</a>.</p>
          </div>
    
          <p class="up-and-running">Looks like our local Parse Serve is running under <span id="parse-url">...</span>. Let’s test it?
</p>
    
          <p>We'll use an app id of "myAppId" to connect to Parse Server.  Or, you can 
            <a href="javascript: var newAppId = prompt('What app id should we use to talk to Parse Server?');  if (newAppId) { $('#appId').val(newAppId); }">change it</a>.
    
          <p>We have an express server with Parse server running on top of it connected to a MongoDB.</p>
    
          <p>The following steps will try to save some data on parse server and then fetch it back. Hey ho?</p>
    
          <div id="step-1" class="pure-g step--container">
            <div class="pure-u-1-5 align-center">
              <span class="step--number">1</span>
            </div>
            <div class="pure-u-4-5">
              <p class="step--info">Post data to local parse server:</p>
              <div class="pure-g">
                <div class="pure-u-1-5">
                  <a href="#" id="step-1-btn" class="step--action-btn">Post</a>
                </div>
                <div class="pure-u-4-5">
                  <!-- <div class="code-label " title="Output">Output</div> -->
                  <pre id="step-1-output" class="step--pre hidden">...</pre>
                </div>
              </div>
            </div>
            <div id="step-1-error" class="hidden pure-u-4-5 step--error"></div>
          </div>
    
          <div id="step-2" class="pure-g step--container step--disabled">
            <div class="pure-u-1-5  align-center">
              <span class="step--number">2</span>
            </div>
            <div class="pure-u-4-5">
              <p class="step--info">Fetch data from local parse server:</p>
              <div class="pure-g">
                <div class="pure-u-1-5">
                  <a href="#" id="step-2-btn" class="step--action-btn">Fetch</a>
                </div>
                <div class="pure-u-4-5">
                  <pre id="step-2-output" class="step--pre hidden">...</pre>
                </div>
              </div>
            </div>
            <div id="step-2-error" class="hidden pure-u-4-5 step--error"></div>
          </div>
    
          <div id="step-3" class="pure-g step--container step--disabled">
            <div class="pure-u-1-5  align-center">
              <span class="step--number">3</span>
            </div>
            <div class="pure-u-4-5">
              <p class="step--info">Test Cloud Code function from ./cloud/main.js:</p>
              <div class="pure-g">
                <div class="pure-u-1-5">
                  <a href="#" id="step-3-btn" class="step--action-btn">TEST</a>
                </div>
                <div class="pure-u-4-5">
                  <pre id="step-3-output" class="step--pre hidden">...</pre>
                </div>
              </div>
            </div>
            <div id="step-3-error" class="hidden pure-u-4-5 step--error"></div>
          </div>
    
           <div id="step-4" class="pure-g step--container hidden">
            <div class="pure-u-1-5  align-center">
              <span class="step--number">✓</span>
            </div>
            <div class="pure-u-4-5">
              <p id="local-parse-working">
              Congrats! Our local Parse server is working. :)
              </p>
            </div>
          </div>
    
          <footer id="footer" class="align-center">
            <ul>
              <li><a href="https://parse.com" target="_blank">Parse.com</a></li>
              <li><a href="https://parse.com/docs" target="_blank">Docs</a></li>
              <li><a href="https://github.com/ParsePlatform/parse-server-example" target="_blank">Github</a></li>
            </ul>
          </footer>
    
        </div>
        <script src="https://code.jquery.com/jquery-2.2.0.min.js"></script>
        <script>
        
var Steps = {};

Steps.init = function() {
  this.buildParseUrl();
  this.bindBtn('#step-1-btn', function(e){
    ParseRequest.postData();
    e.preventDefault();
  })
}

Steps.buildParseUrl = function() {
  var url = Config.getUrl();
  $('#parse-url').html(url + '/parse');
}

Steps.bindBtn = function(id, callback) {
  $(id).click(callback);
}

Steps.closeStep = function(id) {
  $(id).addClass('step--disabled');
}

Steps.openStep  = function(id) {
  $(id).removeClass('step--disabled');
}

Steps.fillStepOutput  = function(id, data) {
  $(id).html('Output: ' + data).slideDown();
}

Steps.fillStepError  = function(id, errorMsg) {
  $(id).html(errorMsg).slideDown();
}


Steps.fillBtn  = function(id, message) {
  $(id).addClass('success').html('✓  ' + message);
}

Steps.showWorkingMessage = function() {
  $('#step-4').delay(500).slideDown();
}


/**
 *  Parse requests handler
 */

var ParseRequest = {};

ParseRequest.postData = function() {
  XHR.setCallback(function(data){
    // store objectID
    Store.objectId = JSON.parse(data).objectId;
    // close first step
    Steps.closeStep('#step-1');
    Steps.fillStepOutput('#step-1-output', data);
    Steps.fillBtn('#step-1-btn', 'Posted');
    // open second step
    Steps.openStep('#step-2');
    Steps.bindBtn('#step-2-btn', function(e){
      ParseRequest.getData();
      e.preventDefault();
    });
  },
  function(error) {
       Steps.fillStepError('#step-1-error', 'There was a failure: ' + error);
   });
  XHR.POST('/parse/classes/GameScore');
};

ParseRequest.getData = function() {
  XHR.setCallback(function(data){
    // close second step
    Steps.closeStep('#step-2');
    Steps.fillStepOutput('#step-2-output', data);
    Steps.fillBtn('#step-2-btn', 'Fetched');
    // open third step
    Steps.openStep('#step-3');
    Steps.bindBtn('#step-3-btn', function(e){
      ParseRequest.postCloudCodeData();
      e.preventDefault();
      });
    },
    function(error) {
      Steps.fillStepError('#step-2-error', 'There was a failure: ' + error);
    }
  );  
  XHR.GET('/parse/classes/GameScore');
};

ParseRequest.postCloudCodeData = function() {
  XHR.setCallback(function(data){
    // close second step
    Steps.closeStep('#step-3');
    Steps.fillStepOutput('#step-3-output', data);
    Steps.fillBtn('#step-3-btn', 'Tested');
    // open third step
    Steps.showWorkingMessage();
    },
    function(error) {
      Steps.fillStepError('#step-3-error', 'There was a failure: ' + error);
    }
  );  
  XHR.POST('/parse/functions/hello');
}


/**
 * Store objectId and other references
 */

var Store = {
  objectId: ""
};

var Config = {};

Config.getUrl = function() {
  if (url) return url;
  var port = window.location.port;
  var url = window.location.protocol + '//' + window.location.hostname;
  if (port) url = url + ':' + port;
  return url;
}


/**
 * XHR object
 */

var XHR = {};

XHR.setCallback = function(callback, failureCallback) {
  this.xhttp = new XMLHttpRequest();
  var _self = this;
  this.xhttp.onreadystatechange = function() {
    if (_self.xhttp.readyState == 4) {
      if (_self.xhttp.status >= 200 && _self.xhttp.status <= 299) {
        callback(_self.xhttp.responseText);
      } else {
        failureCallback(_self.xhttp.responseText);
      }
    }
  };
}

XHR.POST = function(path, callback) {
  var seed = {"score":1337,"playerName":"Sean Plott","cheatMode":false}
  this.xhttp.open("POST", Config.getUrl() + path, true);
  this.xhttp.setRequestHeader("X-Parse-Application-Id", $('#appId').val());
  this.xhttp.setRequestHeader("Content-type", "application/json");
  this.xhttp.send(JSON.stringify(seed));
}

XHR.GET = function(path, callback) {
  this.xhttp.open("GET", Config.getUrl() + path + '/' + Store.objectId, true);
  this.xhttp.setRequestHeader("X-Parse-Application-Id", $('#appId').val());
  this.xhttp.setRequestHeader("Content-type", "application/json");
  this.xhttp.send(null);
}


/**
 *  Boot
 */

Steps.init();

        </script>
        <input type="hidden" id="appId" value="myAppId" />
      </body>
    </html>
    `;
}

export default testHTMLRAW;
