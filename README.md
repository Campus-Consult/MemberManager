# MemberManager

## Deployment

appsettings.Production.json:

```json
{
  "UseInMemoryDatabase": false,
  "ConnectionStrings": {
    "DefaultConnection": "server=localhost;port=3306;database=membermanager;user=membermanager;password=insertpasswordhere"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Debug",
      "System": "Information",
      "Microsoft": "Information"
    }
  },
  "IdentityServer": {
    "Key": {
      "Type": "Development"
    }
  },
  "Urls": "http://localhost:5002"
}
```