using System.ComponentModel.DataAnnotations;

namespace Celeste.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}