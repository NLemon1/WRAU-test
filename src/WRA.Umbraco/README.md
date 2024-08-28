# WRA.Umbraco (Core Project)

Umbraco Cloud Website Application consisting of two projects.


`WRA.Umbraco` - This is the core project with business logic, extensions, etc. Can be packaged for Web Projects. Build targets move files into correct place for Web project.
and .Core project.

`WRA.Umbraco.Web` - The Umbraco web project, left as vanilla as possible to facilitate easier versioning and testing.


## Project Structure

The .Core project is structured as follows:

- `App_Plugins`: Custom plugins, back office components, scripts, etc.
- `Assets`: uMarketingSuite Assets
- `Attributes`: Custom C# attributes
- `BackOffice`: WRA Customizations for the Umbraco back office (Get Moved to App_Plugins in the web project Build)
- `Commerce`: Umbraco Commerce extensions, providers (tax jar, discounts, etc..)
- `Composers`: Umbraco composers for dependency injection
- `Configuration`: Models for binding to appsettings configuration
- `Contracts`: Interfaces and contracts
- `CustomTables`: Custom table migrations for Umbraco. [Documentation](https://docs.umbraco.com/umbraco-cms/v/13.latest-lts/extending/database)
- `Events`: Event consumers, handlers, and publishers
- `Exceptions`: Custom exception classes
- `Extensions`: Static Extension methods
- `Filters`: Custom filters eg (ApiKeyAuthorzation) 
- `Helpers`: Constants, Utilities, and Helpers eg. (MemberHelper which sets properties on a member)
- `Licenses`: Licenses for the various packages used in the project.
- `Mapping`: Object mapping configurations using Umbracos built in mapper [Documentation](https://docs.umbraco.com/umbraco-cms/v/13.latest-lts/reference/mapping)
- `Models`: Custom and Generated content models, view models, page models etc..
- `OpenAPIs`: OpenAPI/Swagger specifications (Build configuration is in the csproj files.) [Documentation](https://github.com/RicoSuter/NSwag/wiki/NSwag.MSBuild)
- `PaymentProviders`: Umbraco Commerce payment providers
- `Repositories`: Mostly untyped repositories returning generic IContent, a couple strongly typed repositories.
- `Services`: Caching and Bridge API Services, possibly re-organize this with the Web Services.
- `ShippingProviders`: Shipping providers for Umbraco Commerce.
- `Tasks`: Background tasks that are constructed as lambda functions instead of just full IJobs. **Need to validate/test**
- `UmbracoExtensions`: Umbraco-specific extensions
- `Views`: Mostly Generated views from packages, but can also be views we want to store in core.
- `Web`: Web Related Services, Controllers, Dtos, ModelBinders, Servies, etc..
- `Webhooks`: Webhook handlers
- `Web\wwwroot`: Items to be published in the Web projects wwwroot folder at build time.
- `Forms`: Umbraco Forms Extensions, custom fields, and types.


## Umbraco Forms Field Templates

They are compiled into razor views within the dll's. They are not stored in the file system.


## Umbraco Forms Custom Types



F756E12A-B2F9-40E5-9D74-9EA20AD10CFA - HotlineCallDropdownField
F856E12A-B2F9-40E5-9D74-9EA20AD10CFA
F956E12A-B2F9-40E5-9D74-9EA20AD10CFA
FA56E12A-B2F9-40E5-9D74-9EA20AD10CFA
FB56E12A-B2F9-40E5-9D74-9EA20AD10CFA
FC56E12A-B2F9-40E5-9D74-9EA20AD10CFA
FD56E12A-B2F9-40E5-9D74-9EA20AD10CFA
FE56E12A-B2F9-40E5-9D74-9EA20AD10CFA
FF56E12A-B2F9-40E5-9D74-9EA20AD10CFA
0057E12A-B2F9-40E5-9D74-9EA20AD10CFA
0157E12A-B2F9-40E5-9D74-9EA20AD10CFA
0257E12A-B2F9-40E5-9D74-9EA20AD10CFA
0357E12A-B2F9-40E5-9D74-9EA20AD10CFA
0457E12A-B2F9-40E5-9D74-9EA20AD10CFA
0557E12A-B2F9-40E5-9D74-9EA20AD10CFA
0657E12A-B2F9-40E5-9D74-9EA20AD10CFA
0757E12A-B2F9-40E5-9D74-9EA20AD10CFA
0857E12A-B2F9-40E5-9D74-9EA20AD10CFA
0957E12A-B2F9-40E5-9D74-9EA20AD10CFA
0A57E12A-B2F9-40E5-9D74-9EA20AD10CFA