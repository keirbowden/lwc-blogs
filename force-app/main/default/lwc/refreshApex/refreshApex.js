import { LightningElement, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import GetPage from '@salesforce/apex/PageController.GetPage'
import IncrementPageViews from '@salesforce/apex/PageController.IncrementPageViews'
import { reduceErrors } from 'c/ldsUtils';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class RefreshApex extends LightningElement {
    page={Name: 'loading', Views__c:'loading'};
    dataToRefresh;

    @wire(GetPage, {name: 'home'})
    gotPage(result) {
        if (result.data) {
            this.page=result.data;
            this.dataToRefresh=result;
        }
        else if (result.error) {
            let errors=reduceErrors(error).reduce((accumulator, currentValue) => accumulator.concat(', ', currentValue), '');
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error getting home page',
                    message: errors.substring(2),
                    variant: 'error'
                })
            );
        }
    }

    incViews() {
        IncrementPageViews({name: this.page.Name})
        .then(()=> {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Page Views Incremented',
                    variant: 'success'
                })
            );
            this.getLatest();
        })
        .catch((error) => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error Incrementing Page Views',
                    message: message,
                    variant: 'error'
                })
            );
        });
    }

    getLatest() {
        refreshApex(this.dataToRefresh)
        .then(()=> {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Refreshed Data',
                    variant: 'success'
                })
            );
        })
        .catch((error) => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error Refreshing Data',
                    message: message,
                    variant: 'error'
                })
            );
        });
    }
}