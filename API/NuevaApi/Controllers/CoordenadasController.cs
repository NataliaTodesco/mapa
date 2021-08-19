using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Resultado;
using Models;

namespace NuevaApi.Controllers
{
    [ApiController]
    [EnableCors("Prog3")]
    public class CoordenadasController : ControllerBase
    {
        private readonly ILogger<CoordenadasController> _logger;
        Coordenada aux = new Coordenada();

        public CoordenadasController(ILogger<CoordenadasController> logger)
        {
            _logger = logger;

            aux.latitud = "-31.3687523";
            aux.longitud = "-64.2403843";
        }
        

        [HttpGet]
        [Route("Coordenada/GetConPunto")]
        public ActionResult<ResultadoApi> Get()
        {
            ResultadoApi resultado = new ResultadoApi();
            try
            {
                resultado.ok = true;
                resultado.Return = aux;
                return resultado;
            }
            catch (Exception ex)
            {
                resultado.ok = false;
                resultado.codigoError = 1;
                resultado.error = "Error" + ex.Message;

                return resultado;
            }

        }
    }
}
