# See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

# This stage is used when running from VS in fast mode (Default for Debug configuration)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081


# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
ARG ASPNETCORE_URLS
ARG ConnectionStrings__DefaultConnection
ARG JwtSettings__SecretKey
ARG JwtSettings__TokenExpiry
ARG SSOGoogle__ClientId
ARG SSOGoogle__ClientSecret
ARG SSOGoogle__RedirectUri
ARG AllowCORS

# Use ENV to persist arguments into runtime environment
ENV ASPNETCORE_URLS=${ASPNETCORE_URLS}
ENV ConnectionStrings__DefaultConnection=${ConnectionStrings__DefaultConnection}
ENV JwtSettings__SecretKey=${JWT_SECRET}
ENV JwtSettings__TokenExpiry=${JWT_TOKEN_EXPIRY}
ENV SSOGoogle__ClientId=${GOOGLE_CLIENT_ID}
ENV SSOGoogle__ClientSecret=${GOOGLE_CLIENT_SECRET}
ENV SSOGoogle__RedirectUri=${GOOGLE_REDIRECT_URI}
ENV AllowCORS=${ALLOW_CORS}

WORKDIR /src
COPY ["ProjectPRN22_Backend.csproj", "."]
RUN dotnet restore "./ProjectPRN22_Backend.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "./ProjectPRN22_Backend.csproj" -c $BUILD_CONFIGURATION -o /app/build

# This stage is used to publish the service project to be copied to the final stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./ProjectPRN22_Backend.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# This stage is used in production or when running from VS in regular mode (Default when not using the Debug configuration)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ProjectPRN22_Backend.dll"]