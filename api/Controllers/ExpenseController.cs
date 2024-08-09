using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExpenseController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ExpenseController(AppDbContext context)
        {
            _context = context;
        }
        
        [HttpGet]
        public async Task<IEnumerable<Expense>> GetExpense()
        {
            var expenses = await _context.Expenses.AsNoTracking().ToListAsync();
            return expenses;
        }

        
    }
}