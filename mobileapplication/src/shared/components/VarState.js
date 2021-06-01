
import StepCounter from '../sensors/StepCounter';
import * as SecureStore from "expo-secure-store";

/**
 * A note on variable naming.
 * Unlike other languages, it is perfectly legal for a variable name to begin with a digit,
 * as long as it also contains non-numerical characters (isNaN will return true).
 * There are no reserved variable names, instead system variables will be identified by
 * beginning with @ or % (hence, other variables cannot begin with those two characters).
 * Variables starting with % are so called 'lvalues', that is, they can receive a new value.
 * This is used to set a default sensor value if that sensor is not available.
 * Variables starting with @ are read-only, and return the value of that system variable
 * at that point in time.
 */
class VarState {
    //A constant ID that is added onto local stmorage elements. Not unique, only used to differentiate VarState's storage from any potential other storage
    static STORAGE_ID = "VarStateStorage"

    constructor() {
        this.cVars = { __dummy: '' };
        this.steps = new StepCounter();
        SecureStore.isAvailableAsync().then((yesno) => {
            console.log("Secure store: ", yesno);
        })
    }
    
    /**
     * Stores data to local storage. The storage can be accessed by passing in the same user+story key pair to loadData()
     * @param userID ID of the user attempting to save data
     * @param storyID ID of the story whose data is to be saved
     */
    saveData(userID, storyID) {
        //console.log(userID+storyID+VarState.STORAGE_ID);
        //console.log(JSON.stringify(this.cVars));
        SecureStore.setItemAsync(userID+storyID+VarState.STORAGE_ID, JSON.stringify(this.cVars)).then((value) => {
            //Do nothing: the attempt was succesful
        }, (err) => { 
            console.error("Something went wrong when saving local data: "+err);
        });
    }
    
    /**
     * Loads data from the local storage, depending on which story+user ID we insert
     * @param userID ID of the user attempting to load data
     * @param storyID ID of the story whose data is to be read
     */
    loadData(userID, storyID) {
        SecureStore.getItemAsync(userID+storyID+VarState.STORAGE_ID).then((value)=>{
            if (value === null) {
                console.log("Attempted to access VarState data for a user+story combination without any data")
            } else {
                this.cVars = value;
            }
        }, (err)=>{ 
            console.error("Something went wrong when loading local data: "+err);
        });
    }

    /**
     * Splits a string into two substrings at the first instance of a token
     * EXAMPLE: If str="he+ho+ha", and tok="+", the result would be "he", "ho+ha"
     * 
     * The reason we wrote this is that the limit parameter of the builtin split()
     * does not work as it does in Java. In Java, the last element contains all of
     * the string that did not fit the limit (which is what we do here, except that
     * limit is hardcoded to 2); in JavaScript, only the first n elements are
     * returned - the rest are discarded.
     * 
     * @param str Input string
     * @param tok Token to split the string with
     * @returns The resultant substrings stored in a list
     */
    splitFirst(str, tok) {
        var nextString = "";
        var tokInd = 0;
        for (var i = 0; i < str.length; i++){
            if (str[i] === tok[tokInd]) {
                tokInd++;
                if(tokInd == tok.length) {
                    return [nextString, str.substring(i+1)];
                }
            } else {
                // If we mispredicted, add the tokens we did find
                for(var j = 0; j < tokInd; j++)
                    nextString = nextString + tok[j];
                nextString = nextString + str[i];
            }
        }
    }

    /**
     * Evaluates a given command or condition string, performing all of its operations and returning its result
     * @param str the command or condition string to evaluate
     * @returns The result of the evaluated string, or 0 if the string does not evaluate to a value
     */
    eval(str) {
        //console.log("Eval: " + str);
        const lines = str.split('\n');
        let retVal = 0;
        lines.forEach((line) => {
            //console.log("line=" + line);
            if(line.indexOf(':=') > -1) {
                const ops = this.splitFirst(line,':=');
                //console.log("assign " + ops[0] + "<=" + ops[1]);
                // Dont assign to read-only system variables
                if(!ops[0].startsWith('@')) {
                    if(ops[0].startsWith('%')) {
                        // unless of course this system variable can take a new value
                        retVal = this.setSysVar(ops[0].substring(1), ops[1])
                    } else {
                        retVal = this.assign(ops[0],ops[1]);
                        //retVal = this.cVars[ops[0]];
                    }
                }
            }
            
            else if(line.indexOf('+') > -1) {
                const ops = this.splitFirst(line,'+');
                //console.log("sum " + ops[0] + "+" + ops[1]);
                retVal = this.sum(ops[0], ops[1]);
            }

            else if(line.indexOf('<') > -1) {
                const ops = this.splitFirst(line,'<');
                //console.log("compare " + ops[0] + "<" + ops[1]);
                retVal = parseInt(this.eval(ops[0])) < parseInt(this.eval(ops[1]));
            }

            else if(line.indexOf('>') > -1) {
                const ops = this.splitFirst(line,'>');
                //console.log("compare " + ops[0] + ">" + ops[1]);
                retVal = parseInt(this.eval(ops[0])) > parseInt(this.eval(ops[1]));
            }

            else if(line.indexOf('==') > -1) {
                const ops = this.splitFirst(line,'==');
                //console.log("compare " + ops[0] + "==" + ops[1]);
                retVal = this.eval(ops[0]) === this.eval(ops[1]);
            }

            else if(line.startsWith('@')) {
                //console.log("getSysVal " + line.substring(1));
                retVal = this.getSysVar(line.substring(1));
            }

            else {
                /* default case: get value of a variable */
                //console.log("getVal " + line);
                if(isNaN(line))
                    retVal = this.cVars[line];
                else
                    retVal = line;
            }
        });
        //console.log("Result: " + retVal);
        return retVal;
    }

    sum(left, right) {
        return parseInt(this.eval(left))+parseInt(this.eval(right));
    }

    assign(to, from) {
        this.cVars[to] = this.eval(from);
        return this.cVars[to];
    }

    getSysVar(str) {
        if(str === "time") {
            const now = new Date();
            return now.getHours() * 60 + now.getMinutes();
        }
        else if(str === "step") {
            return this.steps.get();
        }
    }

    setSysVar(name, val) {
        val = eval(val);
        if(name === "step") {
            this.steps.setSysDefault(val);
        }
        return val;
    }
}

/* Uncomment these to run tests in a shell
new VarState().eval("a:=5\nb:=c:=3\nsum:=a+b+c");
console.log("----------------");
new VarState().eval("a:=@time");
console.log("----------------");
new VarState().eval("a:=5\nb:=6\nc:=a<b\nc:=a>b\na==b"); */
export default VarState;