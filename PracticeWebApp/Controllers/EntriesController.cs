using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PracticeWebApp.Common;

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

        [HttpPost("create")]
        public async Task<ActionResult<Entry>> Create(EntryCreateDto request)
        {
            var entity = _mapper.Map<Entry>(request);

            _dataContext.Add(entity);
            await _dataContext.SaveChangesAsync();

            return Ok(request);
        }

        [HttpGet("get-all")]
        public async Task<IEnumerable<EntryDetailDto>> GetAll()
        {
            var entities = await _dataContext.Set<Entry>().ToListAsync();

            var response = new List<EntryDetailDto>();

            foreach (var item in entities)
            {
                response.Add(_mapper.Map<EntryDetailDto>(item));
            }

            return response;
        }

        [HttpGet("get-by-id/{id}")]
        public async Task<ActionResult<Entry>> GetById([FromRoute] int id)
        {
            var response = await _dataContext.Set<Entry>()
                .SingleAsync(x => x.Id == id);

            _logger.LogInformation(response.ToString());

            return Ok(response);
        }

        [HttpPut("udpate/{id}")]
        public async Task<ActionResult<EntryDetailDto>> Update([FromRoute] int id, EntryCreateDto request)
        {
            var entity = await _dataContext
                .Set<Entry>()
                .SingleAsync(x => x.Id == id);

            entity.Description= request.Description;

            _dataContext.Update(entity);

            await _dataContext.SaveChangesAsync();

            return Ok(request);
        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult> Delete([FromRoute] int id)
        {
            var entity = await _dataContext.Set<Entry>()
                .SingleAsync(x => x.Id == id);

            _dataContext.Remove(entity);

            _dataContext.SaveChanges();

            return Ok();
        } 
    }
}