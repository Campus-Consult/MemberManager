﻿namespace MemberManager.Application.Common.Interfaces
{
    public interface ICurrentUserService
    {
        string UserId { get; }
        string GetEmailAssociate();
    }
}
