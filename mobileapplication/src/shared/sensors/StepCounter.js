/* 
 * Code skeleton from 
 * https://docs.expo.io/versions/latest/sdk/pedometer/
 */

import { Pedometer } from 'expo-sensors';

export default class StepCounter {
    constructor() {
        this.state = {
            isPedometerAvailable: 'checking',
            sysDefaultValue: null,
            lastCheck: null,
        };

        // Request permission to access the step counter
        Pedometer.requestPermissionsAsync().then((result) => {
            if(result.granted) {
                this.state.isPedometerAvailable = 'yes';
                this.state.lastCheck = new Date();
                //this.state.
                //this.setState( { isPedometerAvailable: 'yes',
                                    //lastCheck: new Date() });
            } else {
                this.state.isPedometerAvailable = 'no';
            }
        });
    }

    setSysDefault(val) {
        if(this.state.isPedometerAvailable === 'yes') {
            // Do nothing, we can read actual data
        } else {
            // Set a return value that will override the built-in default
            this.state.sysDefaultValue = `${val}`;
        }
    }

    getSysDefault() {
        if(this.state.sysDefaultValue !== null) {
            // Return the user provided default value, if we have one. Otherwise, return system default
            return this.state.sysDefaultValue;
        } else {
            return 0;
        }
    }

    get() {
        if(this.state.isPedometerAvailable === 'yes') {
            const end = new Date();
            await Pedometer.getStepCountAsync(this.state.lastCheck, end).then(
                (result) => {
                    this.state.lastCheck = end;
                    return result.steps;
                },
                (error) => {
                    return this.getSysDefault();
                });
        } else {
            return this.getSysDefault();
        }
    }

}