using System.Reflection;

using FluentValidation.AspNetCore;

using MediatR;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

using Marketplace.Business.PipelineBehaviors;
using Marketplace.Business.CQRS.AccountDomain.Queries;

namespace Modilist.Business.Extensions
{
    public static class BusinessExtensions
    {
        public static IServiceCollection AddCQRS(this IServiceCollection services)
        {
            var assembly = Assembly.GetExecutingAssembly();
            services.AddMediatR(assembly);

            return services;
        }

        public static IMvcBuilder AddValidations(this IMvcBuilder mvcBuilder)
        {
            mvcBuilder.AddFluentValidation(fv =>
             {
                 fv.RegisterValidatorsFromAssemblyContaining<GetAccountValidator>(includeInternalTypes: true);
                 fv.AutomaticValidationEnabled = false;
                 fv.ImplicitlyValidateChildProperties = true;
             });

            return mvcBuilder;
        }

        public static IServiceCollection AddValidationBehavior(this IServiceCollection services)
        {
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

            return services;
        }

        public static IServiceCollection AddLoggingBehavior(this IServiceCollection services)
        {
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(LoggingBehavior<,>));

            return services;
        }

        public static IServiceCollection AddTransactionBehavior(this IServiceCollection services)
        {
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(TransactionBehavior<,>));

            return services;
        }
    }
}
