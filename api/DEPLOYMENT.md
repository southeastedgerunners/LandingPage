EdgeRunners.Api — Deployment notes (Azure)

This file explains how to containerize and deploy the backend to Azure (App Service for Containers or ACI/AKS).

Build locally (Docker)
1. From repository root (or api folder):
   docker build -f api\EdgeRunners.Api\Dockerfile -t edgerunners-api:latest .
2. Test locally:
   docker run -p 5240:80 -e "ASPNETCORE_ENVIRONMENT=Development" -e "N8N__BOOKINGWEBHOOKURL=https://..." edgerunners-api:latest
   Visit http://localhost:5240/

Publish image to Azure Container Registry (ACR)
1. Create a registry (example):
   az acr create --resource-group <rg> --name <registryName> --sku Standard
2. Log in and push:
   az acr login --name <registryName>
   docker tag edgerunners-api:latest <registryName>.azurecr.io/edgerunners-api:latest
   docker push <registryName>.azurecr.io/edgerunners-api:latest

Deploy to Azure Web App for Containers
1. Create an App Service plan + Web App (Linux):
   az appservice plan create --name ERPlan --resource-group <rg> --sku B1 --is-linux
   az webapp create --resource-group <rg> --plan ERPlan --name <appName> --deployment-container-image-name <registryName>.azurecr.io/edgerunners-api:latest
2. Configure container registry credentials and app settings in the Azure Portal or with az webapp config:
   - Set DOCKER_REGISTRY_SERVER_URL, DOCKER_REGISTRY_SERVER_USERNAME, DOCKER_REGISTRY_SERVER_PASSWORD if using ACR with admin disabled
   - Add app settings (Environment variables) used by the API:
     N8n__AvailabilityWebhookUrl  (full URL)
     N8n__BookingWebhookUrl       (full URL)
     Cors__AllowedOrigins         (JSON array or single origin)
     ASPNETCORE_ENVIRONMENT=Production
3. Restart the app and verify logs (Log stream) and / endpoint.

Alternative: Azure Container Instances (ACI)
- Use `az container create` with image, ports and environment variables, good for simple deployments/test.

Notes & env variables
- Keep secrets (Twilio, Google credentials) only in Azure Key Vault or App Settings — do not commit them.
- CORS: set allowed origins to your Netlify site URL (e.g., https://your-site.netlify.app) so browser requests from the frontend are permitted.
- The API expects the following configuration keys (see N8nOptions/BookingAvailabilityOptions in code):
  N8n:AvailabilityWebhookUrl (full absolute URL)
  N8n:BookingWebhookUrl
  Cors:AllowedOrigins (array/string)

If you want, I can also create an App Service Bicep/ARM template or a docker-compose for local testing.