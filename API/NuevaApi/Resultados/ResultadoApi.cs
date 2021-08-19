using System;

namespace Resultado{
    public class ResultadoApi{
        public Boolean ok { get; set; }
        public string error { get; set; }
        public int codigoError { get; set; }
        public string infoAdicional { get; set; }
        public Object Return { get; set; }
    }
}