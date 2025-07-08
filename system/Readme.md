Create an User : 

   - Base User - Inherited by Other Users
   - SuperAdmin - Can Do Anythings
   - Admin - Can Do Anything With His Organization (Can Create Multiple Organization)
   - Staff - Can DO Anything With is permission Role Provided By Its Org. Admin (Can Be from only One Organization);
   - User - 



Permissions = [{admins : tables [ {
    {Staff,6}
    {GeneralUser,6}
    {Books,6}
    {Organization,6}
}] }]

Tables :
==================
BaseUser
SuperUser
Admin
Staff
GeneralUser



Organization 
Book
Transaction




PERMISSIONS = [
    ORG_ID,
    PERMISSION_ON : [{NAME: TABLE}, ]   {000} 1 2 -> Read, Write , 1 , 2 
    Books, Users
]

BASE USER : {
    NAME,
    USERNAME, // PRIMARY KEY
    EMAIL_ID,
    PASSWORD,
    PROFILE,
}

GENERAL USER : {
    TRANSACTIONS 
}

