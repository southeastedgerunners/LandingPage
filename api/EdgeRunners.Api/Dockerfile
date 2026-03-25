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

# Listen on port 80 and use environment config
ENV ASPNETCORE_URLS=http://+:80
EXPOSE 80

ENTRYPOINT ["dotnet", "EdgeRunners.Api.dll"]
