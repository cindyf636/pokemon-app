using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using PokemonApp.Models;

namespace PokemonApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PokemonController : ControllerBase
    {
        private readonly List<Pokemon> _pokemon;

        public PokemonController()
        {
            try
            {
                string jsonPath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "pokemon.json");
                string json = System.IO.File.ReadAllText(jsonPath);
                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                };
                _pokemon = JsonSerializer.Deserialize<List<Pokemon>>(json, options) ?? new List<Pokemon>();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error loading Pokémon data: {ex.Message}");
                _pokemon = new List<Pokemon>();
            }
        }

        // GET: api/pokemon
        [HttpGet]
        public ActionResult<IEnumerable<object>> GetAll(
    [FromQuery] int page = 1,
    [FromQuery] int pageSize = 25,
    [FromQuery] bool all = false)
        {
            var query = _pokemon.AsEnumerable();

            if (!all)
            {
                query = query.Skip((page - 1) * pageSize).Take(pageSize);
            }

            var result = query.Select(p => new
            {
                p.Number,
                p.Name,
                p.Generation,
                p.Height,
                p.Weight,
                type1 = p.Types?.FirstOrDefault(),
                type2 = p.Types?.Skip(1).FirstOrDefault(),
                imageUrl = p.Image,
                moves = p.Moves
            });

            return Ok(result);
        }



        // GET: api/pokemon/{number}
        [HttpGet("{number}")]
        public ActionResult GetByNumber(int number)
        {
            var match = _pokemon.FirstOrDefault(p => p.Number == number);
            if (match == null) return NotFound();

            // Resolve evolution numbers by name
            int? evolvesFrom = null;
            int? evolvesTo = null;

            if (!string.IsNullOrEmpty(match.Evolution?.From))
            {
                evolvesFrom = _pokemon.FirstOrDefault(p =>
                    string.Equals(p.Name, match.Evolution.From, StringComparison.OrdinalIgnoreCase)
                )?.Number;
            }

            if (match.Evolution?.To != null && match.Evolution.To.Any())
            {
                evolvesTo = _pokemon.FirstOrDefault(p =>
                    string.Equals(p.Name, match.Evolution.To.First(), StringComparison.OrdinalIgnoreCase)
                )?.Number;
            }

            return Ok(new
            {
                match.Number,
                match.Name,
                match.Generation,
                match.Height,
                match.Weight,
                type1 = match.Types?.FirstOrDefault(),
                type2 = match.Types?.Skip(1).FirstOrDefault(),
                imageUrl = match.Image,
                match.Moves,
                evolvesFrom,
                evolvesTo
            });
        }


        // GET: api/summary
        [HttpGet("/api/summary")]
        public ActionResult GetSummary()
        {
            var countsByGeneration = _pokemon
                .GroupBy(p => p.Generation ?? "Unknown")
                .ToDictionary(g => g.Key, g => g.Count());

            var countsByType = _pokemon
                .SelectMany(p => p.Types ?? new List<string>())
                .GroupBy(t => t)
                .ToDictionary(g => g.Key, g => g.Count());

            var summary = new
            {
                totalSpecies = _pokemon.Count,
                countsByGeneration,
                countsByType
            };

            return Ok(summary);
        }
    }
}
