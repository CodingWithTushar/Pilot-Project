public with sharing class ContactController {
    @AuraEnabled
    Public static contact insertContact(Contact conToInsert){
        if(conToInsert == null || String.isEmpty(conToInsert.LastName)){
            throw new AuraHandledException('Contact Record Details is not there');
        }
        System.debug('conToInsert' + conToInsert);
        Contact con = new Contact();
        con.LastName = conToInsert.LastName;
        System.debug('con' + con);
        try{
            insert con;
        }
        catch(Exception e){
            throw new AuraHandledException('Error while Inserting record' + e.getMessage());
            System.debug('Exception' + e.getMessage());
        }
        
        return con;
    }

    // Below code is production ready code 

  
        @AuraEnabled
        public static Contact insertContacts(Contact conToInsert) {
            if (conToInsert == null || String.isEmpty(conToInsert.LastName)) {
                throw new AuraHandledException('Last Name is required.');
            }
    
            System.debug('conToInsert: ' + conToInsert);
            Contact con = new Contact();
            con.LastName = conToInsert.LastName;
            System.debug('con: ' + con);
    
            try {
                insert con;
            } catch (DmlException e) {
                throw new AuraHandledException('Error inserting contact: ' + e.getMessage());
            }
    
            return con;
        }
    
}