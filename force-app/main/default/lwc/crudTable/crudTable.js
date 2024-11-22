import { LightningElement, track, wire } from 'lwc';
import { getListInfoByName } from "lightning/uiListsApi";   
import ACCOUNT_OBJECT from "@salesforce/schema/Account";
import { deleteRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

const columns = [
    {label:'Account',
     fieldName:'Name'
    },
    {label:'Account Industry',
        fieldName:'Industry'
    },
    {
    label:'Delete',
    type: 'button-icon',
    typeAttributes: {
        iconName: 'utility:delete',
        name: 'delete button',
        title: 'Delete', 
        variant: 'border-filled',
        alternativeText: 'Delete'
    }
}
    
]
export default class CrudTable extends LightningElement {
    @track columns = columns;
    dataForTable = []
    resultFromApex = [];
    
    @wire(getAccounts)
    wiredAccounts(result){
        if(result){
            this.resultFromApex = result;
                if(result.data){
                    // Sometime even console statement can give error
                    console.log('OUTPUT : data', result.data);
                    this.dataForTable = result.data;
                }
                if(result.error){
                    console.log('OUTPUT : error',result.error);
                }
            
        }
    }
    

    async handleRowAction(event){
        console.log('OUTPUT : Handle Row Action clicked ', event.detail.action.name);
        // This event.detail.action.name is Button Name 
        //that we passed in the typeAttributes as Name
        try{        if(event.detail.action.name === 'delete button'){
            console.log('OUTPUT : event.detail.row',event.detail.row);
            let recordId = event.detail.row.Id;
            console.log('OUTPUT :recordId',recordId);
            await deleteRecord(recordId);
            await refreshApex(this.resultFromApex);
        }
        
        }
        catch(error){
            console.log('OUTPUT : error  ', error);


    }
}
    handleClick(){
        console.log('OUTPUT : Handle Add clicked ');
        let obj = {
            Name:'',
            Industry:''
        }
        //this.dataForTable.push(obj);
        this.dataForTable = [...this.dataForTable,obj];
        console.log('OUTPUT :dataForTable ', this.dataForTable);
        //refreshApex(this.resultFromApex);
    }
}