import { LightningElement } from 'lwc';

export default class GetterCountdown extends LightningElement {
    timer=30;
    interval=null;

    startCountdown() {
        this.interval=setInterval(() => {
            this.timer--;
            if (this.timer==0) {
                clearInterval(this.interval);
            }
        }, 1000);
    }

    get countdown() {
        let result='Timer expired';
        if (null==this.interval) {
            result='Timer not started';
        }
        else if (this.timer>0) {
            result=this.timer + ' seconds to go!';
        }

        return result;
    }

    get countdownClass() {
        let result='expired';
        if (null==this.interval) {
            result='dormant';
        }
        else if (this.timer>0) {
            result='ticking';
        }

        return result;
    }

    get timerStarted() {
        return null!==this.interval;
    }

    timerChanged(event) {
        this.timer=event.detail.value;
    }
}