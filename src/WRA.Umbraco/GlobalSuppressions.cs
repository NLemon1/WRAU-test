// This file is used by Code Analysis to maintain SuppressMessage
// attributes that are applied to this project.
// Project-level suppressions either have no target or are given
// a specific target and scoped to a namespace, type, member, etc.

using System.Diagnostics.CodeAnalysis;

[assembly: SuppressMessage("Minor Code Smell", "S6667:Logging in a catch clause should pass the caught exception as a parameter.", Justification = "Logged a more contextual error in this case.", Scope = "member", Target = "~M:WRA.Umbraco.Composers.ContentPublishedCacheNotificationHandler.Handle(Umbraco.Cms.Core.Notifications.ContentPublishedNotification)")]
[assembly: SuppressMessage("Minor Code Smell", "S6667:Logging in a catch clause should pass the caught exception as a parameter.", Justification = "Logged a more contextual error in this case.", Scope = "member", Target = "~M:WRA.Umbraco.Composers.MemberSavedCacheNotificationHandler.Handle(Umbraco.Cms.Core.Notifications.MemberSavedNotification)")]
[assembly: SuppressMessage("Minor Code Smell", "S6667:Logging in a catch clause should pass the caught exception as a parameter.", Justification = "Logged a more contextual error in this case.", Scope = "member", Target = "~M:WRA.Umbraco.Composers.MemberSavedServiceBusPublisher.Handle(Umbraco.Cms.Core.Notifications.MemberSavedNotification)")]
[assembly: SuppressMessage("StyleCop.CSharp.NamingRules", "SA1312:Variable names should begin with lower-case letter", Justification = "Variable Name cannot be lower case throw away variable", Scope = "member", Target = "~M:WRA.Umbraco.Composers.Jobs.ManipulateContent(Hangfire.Server.PerformContext)")]
[assembly: SuppressMessage("Major Code Smell", "S2139:Exceptions should be either logged or rethrown but not both", Justification = "Incorrectly triggering", Scope = "module")]
[assembly: SuppressMessage("Major Code Smell", "S125:Sections of code should not be commented out", Justification = "format preference / duplicating", Scope = "module")]
