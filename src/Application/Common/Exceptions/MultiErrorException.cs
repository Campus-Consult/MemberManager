using System;
using System.Collections.Generic;

namespace MemberManager.Application.Common.Exceptions
{
    public class MultiErrorException : Exception
    {
        public MultiErrorException(IList<string> errors)
            : base("One or more errors have occurred.")
        {
            this.Errors = errors;
        }


        public IList<string> Errors { get; }
    }
}
