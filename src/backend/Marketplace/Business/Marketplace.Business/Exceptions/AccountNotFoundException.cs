﻿
using Marketplace.Infrastructure.Shared.Interfaces;

using Marketplace.Infrastructure.Shared;

namespace Marketplace.Business.Exceptions
{
    internal class AccountNotFoundException : Exception, IClientException
    {
        public AccountNotFoundException(Guid id)
            : base($"Account not found with Id: {id}")
        {
            Id = id;
        }

        public Guid Id { get; private set; }

        public int Code => 404;

        public int StatusCode => 404;
    }

    internal class AccountNotFoundInternalException : Exception
    {
        public AccountNotFoundInternalException(Guid id)
            : base($"Account not found with Id: {id}")
        {
            Id = id;
        }

        public Guid Id { get; private set; }
    }
}
