using AutoMapper;

namespace PracticeWebApp
{
    public class Entry : EntryGetDto
    {
        public int Id { get; set; }
    }

    public class EntryGetDto : EntryDto
    {
    }

    public class EntryDto
    {
        public string? Description { get; set; }
        public DateTimeOffset Date { get; set; }
    }

    public class EntryDetailDto : EntryGetDto
    {
        public int Id { get; set; }
    }

    public class EntrySummaryDto
    {
        public string? Description { get; set; }
        public DateTimeOffset? Date { get; set; }   
    }

    public class EntryCreateDto
    {
        public string? Description { get; set; }
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
        }
    }
}