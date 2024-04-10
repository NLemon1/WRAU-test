# WRA.Umbraco.Contracts


## Overview
The WRA.Umbraco.Contracts package facilitates seamless integration and messaging between Umbraco CMS and Azure Service Bus, designed specifically for the real estate domain. This package acts as a foundational layer for applications, enabling robust, cloud-based messaging solutions that leverage Azure Service Bus for communication and integration purposes.

## Features
Simplifies the configuration and management of messages between Umbraco CMS and our Integration API using MassTransit with Azure Service Bus, ensuring scalable and reliable communication infrastructure.


## Configuration Guide
To use the WRA.Umbraco.Contracts package effectively, you'll need to configure your NuGet package feeds to include the wirealtors private feed, in addition to the standard NuGet.org feed.

### NuGet.Config Setup
Ensure your NuGet.Config file is correctly set up as follows to include both NuGet.org and the wirealtors private GitHub package feed:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <add key="nuget.org" value="https://api.nuget.org/v3/index.json" />
    <add key="github" value="https://nuget.pkg.github.com/wirealtors/index.json" />
  </packageSources>
  <packageSourceCredentials>
    <github>
      <add key="Username" value="wirealtors" />
      <add key="ClearTextPassword" value="%GITHUB_NUGET_PACKAGE_TOKEN%" />
    </github>
  </packageSourceCredentials>
  <activePackageSource>
    <add key="All" value="(Aggregate source)" />
  </activePackageSource>
</configuration>
```

To automate the replacement of the %GITHUB_NUGET_PACKAGE_TOKEN% with the actual GitHub secret in your GitHub Actions workflow, incorporate the following step before executing the dotnet restore command:

```yaml
- name: Replace NuGet token placeholder
  run: |
    $configPath = "./Nuget.Config"
    $configContent = Get-Content $configPath -Raw
    $newConfigContent = $configContent -replace "%GITHUB_NUGET_PACKAGE_TOKEN%", "${{ secrets.NUGET_GITHUB_PACKAGE_TOKEN }}"
    Set-Content $configPath -Value $newConfigContent
  shell: pwsh
```

## Version History
- **v8.0.3**: Added EventId to entity event.
- **v8.0.2**: Update readme for accurate version 
- **v8.0.1**: Small update to fix NuGet package release automation 
- **v8.0.0**: Initial release, featuring core functionalities for Azure Service Bus messaging integration with Umbraco CMS.