using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PracticeWebApp.Dtos.Users;

namespace PracticeWebApp.Dtos.Entries
{
    public class Entry : EntryGetDto
    {
        public int Id { get; set; }
        public User? User { get; set; }
        public int? CreatedByUserId { get; set; }
        public List<Reference>? References { get; set; }
    }

    public class EntryGetDto : EntryDto
    {
    }

    public class EntryDto
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTimeOffset Date { get; set; } = DateTime.UtcNow;

        public DateTimeOffset? LastUpdatedDate { get; set; }
    }

    public class EntryDetailDto : EntryGetDto
    {
        public int Id { get; set; }
        public List<Reference>? References { get; set; }
    }

    public class EntrySummaryDto
    {
        public string? Description { get; set; }
        public DateTimeOffset? Date { get; set; } = DateTime.UtcNow;
    }

    public class EntryCreateDto
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int CreatedByUserid { get; set; }
    }

    public class EntryUpdateDto : EntryCreateDto
    {
        public DateTimeOffset LastUpdatedDate { get; set; }
    }

    public class MappingConfiguration : Profile
    {
        public MappingConfiguration()
        {
            CreateMap<EntryCreateDto, Entry>();

            CreateMap<Entry, EntryCreateDto>();
            CreateMap<Entry, EntryDto>();
            CreateMap<Entry, EntryGetDto>()
                .IncludeBase<Entry, EntryDto>();
            CreateMap<Entry, EntryDetailDto>()
                .IncludeBase<Entry, EntryGetDto>();
            CreateMap<Entry, EntrySummaryDto>();
            CreateMap<Entry, EntryUpdateDto>();
        }
    }
}