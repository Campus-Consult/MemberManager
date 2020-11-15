# MemberManager

The MemberManager is a member management system made and used by Campus Consult e. V.


## Code
The application is a asp.net core web-api with an Angular frontend.

The projects architecture is based on the clean architecture solution template by Jason Tayler (https://jasontaylor.dev/clean-architecture-getting-started/)

## Configuration
This has to be added to the secret settings:
```
  "AzureAd": {
    "ClientId": "clientid for graph",
    "ClientSecret": "client secret for graph"
  },
```

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
