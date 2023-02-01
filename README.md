# MemberManager

The MemberManager is a member management system made and used by Campus Consult e. V.


## Code
The application is a asp.net core web-api with an Angular frontend.

The projects architecture is based on the clean architecture solution template by Jason Tayler (https://jasontaylor.dev/clean-architecture-getting-started/)

The angular code is formatted using prettier, to apply this format use `npm run format:fix` in the frontend directory (src/WebUI/ClientApp)

## Configuration
This has to be added to the secret settings:
```
  "AzureAd": {
    "ClientId": "clientid for graph",
    "ClientSecret": "client secret for graph"
  },
  "DefaultAdminUser": "admin@admin.admin" // your email address, used at startup to give the user the admin role
```
You find your user secrets in:
- (Windows) %APPDATA%\microsoft\UserSecrets\<userSecretsId>\secrets.json 

    after you entered into console (make sure you are in dotnet project directory): 

    dotnet user-secrets set YourSecretName "YourSecretContent"

See as reference: https://stackoverflow.com/questions/42268265/how-to-get-manage-user-secrets-in-a-net-core-console-application

## Deployment
For all files related to the deployment, see the deployment directory

To deploy the Project to the server, the following steps have to be taken:

1. Build the Project for publishing in Production mode:

    cd src/WebUI

    dotnet publish -c Production

2. Upload the files to the server via ssh:

    cd deployment

    ./publish.sh

3. After logging in via ssh on the server, copy the files to their real destination

    cp -r /tmp/membermanager/publish /var/www/membermanager

4. Restart the service

    sudo service dotnet-membermanager restart

## Adding a migration
Execute this from the src directory, replace MigrationName with the actual name

    dotnet ef migrations add MigrationName -s WebUI -p Infrastructure

## Managing Member Connections in the past

Sometimes, you migrate data and then you realize you made a mistake, or maybe you were told something wrong. Either way, this needs to be corrected
and the member manager needs to be able to easily provide that functionality, with little to no potential for misuse. This is a powerful tool, but
the current workaround is to just delete the user, which really sucks

### Functions
#### Replace
startdata, enddate, connected id, essentially removes all the entries in the specified range and gets inserted then, extending along the barriers when they're from the same kind

This tools can do *almost* everything to completely rewrite history: It can't change the first entry
#### change startdate
Allows changing the startdate of an entry, 

## for ui

make sure to display "ALL" the necessary changes
