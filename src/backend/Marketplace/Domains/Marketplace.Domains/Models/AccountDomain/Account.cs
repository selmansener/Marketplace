using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

using Marketplace.Domains.Base;
using Marketplace.Infrastructure.Shared.Enums;

namespace Marketplace.Domains.Models.AccountDomain
{
    public class Account : BaseEntity
    {
        public Account(Guid id, string? email, string? firstName, string? lastName, DateTime? birthDate, Gender gender, string? phone)
        {
            Id = id;
            Email = email;
            FirstName = firstName;
            LastName = lastName;
            BirthDate = birthDate;
            Gender = gender;
            Phone = phone;
        }

        public new Guid Id { get; private set; }
        
        public string? Email { get; private set; }

        public string? FirstName { get; private set; }

        public string? LastName { get; private set; }

        public DateTime? BirthDate { get; private set; }
        
        public Gender Gender { get; private set; }
        
        public string? Phone { get; private set; }

        public AccountState State { get; private set; }

        public DateTime? ActivatedAt { get; private set; }

        public DateTime? DeactivatedAt { get; private set; }

        public DateTime? BlockedAt { get; private set; }

        public DateTime? VerifiedAt { get; private set; }

        public bool IsVerified { get; private set; }

        public void Update(string firstName,
                       string lastName,
                       DateTime? birthDate,
                       Gender gender,
                       string phone)
        {
            FirstName = firstName;
            LastName = lastName;
            BirthDate = birthDate;
            Gender = gender;
            Phone = phone;
        }

        public void Activate()
        {
            if (State == AccountState.Active)
            {
                throw new InvalidOperationException("Account is already Active");
            }

            State = AccountState.Active;
            ActivatedAt = DateTime.UtcNow;
        }

        public void Verify()
        {
            IsVerified = true;
            VerifiedAt = DateTime.UtcNow;
        }
    }
}
