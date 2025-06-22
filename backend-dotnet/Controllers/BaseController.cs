using Microsoft.AspNetCore.Mvc;
using NewCanadel.Constants;
using NewCanadel.Exceptions;

namespace NewCanadel.Controllers
{
  public abstract class BaseController : ControllerBase
  {
    protected async Task<ActionResult<T>> ExecuteAction<T>(Func<Task<T>> action)
    {
      try
      {
        var result = await action();
        return Ok(result);
      }
      catch (BusinessException e)
      {
        return BadRequest(e.Message);
      }
      catch (Exception)
      {
        return StatusCode(500, ExceptionMessages.SOMETHING_WENT_WRONG);
      }
    }
  }
}
