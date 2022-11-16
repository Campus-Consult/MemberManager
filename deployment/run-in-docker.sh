podman run --rm -ti -u $(id -u) --tmpfs /app/obj -v `pwd`/appsettings.Production.json:/app/appsettings.Production.json:ro --network host ghcr.io/campus-consult/membermanager:docker-deploy
