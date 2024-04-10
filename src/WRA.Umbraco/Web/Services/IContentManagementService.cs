using Umbraco.Cms.Core.Models.Entities;

namespace WRA.Umbraco.Web.Services;

public interface IContentManagementService
{
    public void CreateContent(IEntity content);

    public void UpdateContent(IEntity content)
    {
        throw new NotImplementedException();
    }

    public void DeleteContent(IEntity content)
    {
        throw new NotImplementedException();
    }
}