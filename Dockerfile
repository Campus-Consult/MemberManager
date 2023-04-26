FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine3.17 AS dotnet-builder

COPY src/Domain/Domain.csproj /app/Domain/
COPY src/Application/Application.csproj /app/Application/
COPY src/Infrastructure/Infrastructure.csproj /app/Infrastructure/
COPY src/WebUI/WebUI.csproj /app/WebUI/
RUN dotnet restore /app/WebUI

COPY src/Domain/ /app/Domain/
COPY src/Application/ /app/Application/
COPY src/Infrastructure/ /app/Infrastructure/
COPY src/WebUI/ /app/WebUI/
RUN dotnet publish /app/WebUI --no-restore --configuration Release -o out

FROM node:20.0.0-alpine AS node-builder

WORKDIR /app/WebUI/ClientApp
COPY src/WebUI/ClientApp/package*.json /app/WebUI/ClientApp/
RUN npm ci
COPY --from=dotnet-builder /app/WebUI/ClientApp/ /app/WebUI/ClientApp/
RUN npm run build

FROM mcr.microsoft.com/dotnet/aspnet:6.0-alpine3.17
WORKDIR /app
COPY --from=dotnet-builder /out/ .
COPY --from=node-builder /app/WebUI/ClientApp/dist ClientApp/dist
ENTRYPOINT ["dotnet", "MemberManager.WebUI.dll"]

