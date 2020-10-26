# MemberManager

The MemberManager is a member management system made and used by Campus Consult e. V.


## Code
The application is a asp.net core web-api with an Angular frontend.

The projects architecture is based on the clean architecture solution template by Jason Tyler (https://jasontaylor.dev/clean-architecture-getting-started/)

## Configuration
This has to be added to the secret settings:
```
  "AzureAd": {
    "ClientId": "clientid for graph",
    "ClientSecret": "client secret for graph"
  },
```
