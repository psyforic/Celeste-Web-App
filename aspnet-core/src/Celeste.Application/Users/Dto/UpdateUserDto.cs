using System;
using System.Collections.Generic;
using System.Text;

namespace Celeste.Users.Dto
{
    public class UpdateUserDto
    {
        public string UserName { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string EmailAddress { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public string Suburb { get; set; }
        public string PostalCode { get; set; }
        public string CellphoneNumber { get; set; }
        public bool IsActive { get; set; }
        public string FullName { get; set; }

        public DateTime? LastLoginTime { get; set; }

        public DateTime CreationTime { get; set; }
    }
}
