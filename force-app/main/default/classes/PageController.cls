public with sharing class PageController 
{
    @AuraEnabled(cacheable=true)
    public static Page__c GetPage(String name)
    {
        Page__c page;
        try 
        {
            page=[select id, Name, Views__c
                  from Page__c
                  where Name=:name];
        } 
        catch (Exception e) 
        {
            throw new AuraHandledException(e.getMessage());
        }

        return page;
    }

    @AuraEnabled
    public static void IncrementPageViews(String name)
    {
        try 
        {
            Page__c page=[select id, Name, Views__c
                          from Page__c
                          where Name=:name];

            page.Views__c++;
            update page;
        } 
        catch (Exception e) 
        {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
