import { LightningElement } from 'lwc';
import insertContact from '@salesforce/apex/ContactController.insertContact';
import {ShowToastEvent} from 'lightning/platformShowToastEvent'

export default class InsertConToastNotification extends LightningElement {
    contactLastName;
    handleInputLastName(event){
        this.contactLastName = event.target.value.trim();
        console.log('OUTPUT : ',this.contactLastName);
    }

    handleInsertRecord(){
        if(!this.contactLastName){
            this.showToast('Enter some value in LastName field','LastName field on contact cannnot be blank');
            //This return statement means exit this method here only don't execute below lines of this method;
            return;
        }

        const contactObjectToInsert = { 
            LastName: this.contactLastName
        }

        insertContact({conToInsert:contactObjectToInsert})
        .then(response =>{
            console.log('OUTPUT : Response ', response);
            this.showToast(`Contact Record Created', 'A contact record with ID ${response.Id} has been created`);
            this.contactLastName = '';
        })
        .catch(error =>{
            console.log('OUTPUT :error ',error);
            this.showToast('Error while Creating Contact', `Something went wrong with record ${error.body.pageErrors[0].message}`)
        })
    }

    showToast(title , message){
        const event = new ShowToastEvent({
        title : title,
        message : message,
        })

        this.dispatchEvent(event);
    }


}