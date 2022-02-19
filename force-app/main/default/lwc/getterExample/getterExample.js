import { LightningElement } from 'lwc';

export default class GetterExample extends LightningElement {
    title='';
    firstname='';
    lastname='';

    get fullname() {
        return this.title + ' ' + this.firstname + ' ' + this.lastname;
    }

    titleChanged(event) {
        this.title=event.detail.value;
    }

    firstnameChanged(event) {
        this.firstname=event.detail.value;
    }

    lastnameChanged(event) {
        this.lastname=event.detail.value;
    }

    get sentence() {
        return this.fullname + ' built a lightning component';
    } 
}