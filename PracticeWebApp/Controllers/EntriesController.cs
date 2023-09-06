using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PracticeWebApp.Common;
using PracticeWebApp.Dtos.Entries;
using PracticeWebApp.Dtos.Roles;

namespace PracticeWebApp.Controllers
{
    [ApiController]
    [Route("api/Entries/")]
    public class EntriesController : ControllerBase
    {
        private readonly DataContext.DataContext _dataContext;
        private readonly IMapper _mapper;
        private readonly ILogger<EntriesController> _logger;

        public EntriesController(ILogger<EntriesController> logger, DataContext.DataContext dataContext, IMapper mapper)
        {
            _logger = logger;
            _dataContext = dataContext;
            _mapper = mapper;
        }

        [Authorize(Roles = RoleConstants.User)]
        [HttpPost("create")]
        public async Task<ActionResult<Entry>> Create(EntryCreateDto request)
        {
            var entity = _mapper.Map<Entry>(request);

            _dataContext.Add(entity);
            await _dataContext.SaveChangesAsync();

            return Ok(request);
        }

        [Authorize]
        [HttpGet("get-all/{userId}")]
        public async Task<ActionResult<Response<IEnumerable<EntryDetailDto>>>> GetAll([FromRoute] int userId)
        {
            var entities = await _dataContext.Set<Entry>()
                .Where(x => x.CreatedByUserId == userId)
                .OrderByDescending(x => x.Date)
                .ToListAsync();

            var dtos = new List<EntryDetailDto>();

            foreach(var entity in entities)
            {
                dtos.Add(_mapper.Map<EntryDetailDto>(entity));
            }

            var response = new Response<IEnumerable<EntryDetailDto>>(dtos);

            return Ok(response);
        }

        [Authorize(Roles = RoleConstants.User)]
        [HttpGet("get-by-id/{id}")]
        public async Task<ActionResult<Entry>> GetById([FromRoute] int id)
        {
            var response = await _dataContext.Set<Entry>()
                .SingleAsync(x => x.Id == id);

            _logger.LogInformation(response.ToString());

            return Ok(response);
        }

        [Authorize(Roles = RoleConstants.User)]
        [HttpPut("update/{id}")]
        public async Task<ActionResult<EntryDetailDto>> Update([FromRoute] int id, EntryUpdateDto request)
        {
            var entity = await _dataContext
                .Set<Entry>()
                .SingleAsync(x => x.Id == id);

            entity.Title = request.Title;
            entity.Description= request.Description;
            entity.LastUpdatedDate = request.LastUpdatedDate;

            _dataContext.Update(entity);

            await _dataContext.SaveChangesAsync();

            return Ok(request);
        }

        [Authorize(Roles = RoleConstants.User)]
        [HttpDelete("delete/{id}")]
        public async Task<ActionResult> Delete([FromRoute] int id)
        {
            var entity = await _dataContext.Set<Entry>()
                .SingleAsync(x => x.Id == id);

            _dataContext.Remove(entity);

            _dataContext.SaveChanges();

            return Ok();
        }

        [Authorize(Roles = RoleConstants.User)]
        [HttpGet("get-by-description")]
        public async Task<ActionResult> GetByDescription(string description)
        {
            var entities = await _dataContext.Set<Entry>()
                .Where(x => 
                x.Description != null 
                && x.Description.Equals(description)).ToListAsync();

            var mappedEntries = new List<EntrySummaryDto>();

            entities.ForEach(x => mappedEntries.Add(_mapper.Map<EntrySummaryDto>(x)));

            return Ok(mappedEntries);
        }

        [Authorize(Roles = RoleConstants.User)]
        [HttpGet("search-entries/{userId}")]
        public async Task<ActionResult<Response<IEnumerable<EntryDetailDto>>>> SearchEntries([FromRoute] int userId, [FromQuery] string query)
        {
            var entities = await _dataContext.Set<Entry>()
                .Where(x => 
                x.CreatedByUserId == userId
                && (x.Title.Contains(query) || x.Description.Contains(query)))
                .ToListAsync();

            List<EntryDetailDto> dtos = new();

            foreach (var entity in entities)
            {
                dtos.Add(_mapper.Map<EntryDetailDto>(entity));
            }

            var response = new Response<IEnumerable<EntryDetailDto>>(dtos);

            return Ok(response);
        }
    }
}