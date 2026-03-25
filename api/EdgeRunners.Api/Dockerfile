# Multi-stage Dockerfile for EdgeRunners.Api (build + runtime)
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy csproj and restore first for layer caching
COPY EdgeRunners.Api.csproj ./
RUN dotnet restore "EdgeRunners.Api.csproj"

# Copy the rest and publish
COPY . .
RUN dotnet publish "EdgeRunners.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

# Let the platform provide ASPNETCORE_URLS at runtime (do not hardcode a port)
# The App Platform injects PORT; set ASPNETCORE_URLS=http://0.0.0.0:$PORT in the component envs

ENTRYPOINT ["dotnet", "EdgeRunners.Api.dll"]
