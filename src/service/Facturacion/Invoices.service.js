import Api from "../api.services";

export default {
  headersConfig() {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`
    };
    const configuracion = {
      headers
    };
    return configuracion;
  },

  postCodigoControl(codigoControlObj) {
    return Api().post(`api/facturas/codigoscontroles`, codigoControlObj, this.headersConfig());
  },
  postListFacturaFilter(facturaObj, entidadId, page) {
    if(entidadId != null) 
      return Api().post(`api/facturas/entidades/${entidadId}/filters/${page}`, facturaObj, this.headersConfig());
    else
      return Api().post(`api/facturas/filters/${page}`, facturaObj, this.headersConfig());
  },
  getReportFactura(entidadId, facturaId) {
    if(entidadId != null) {
      return Api().get(`api/facturas/entidades/${entidadId}/reportes/${facturaId}`, {
        responseType: 'arraybuffer',
        headers: {
          'Accept': 'application/pdf',
          Authorization: `Bearer `+localStorage.getItem("token")
        }});
      } else {
        return Api().get(`api/facturas/entidades/reportes/${facturaId}`, {
          responseType: 'arraybuffer',
          headers: {
            'Accept': 'application/pdf',
            Authorization: `Bearer `+localStorage.getItem("token")
          }});
      }
  },

  postAnulacionLst(entidadId,facturaLstObj) {
    if(entidadId != null) {
      return Api().post(`api/facturas/entidades/${entidadId}/anulaciones/listas`, facturaLstObj, this.headersConfig());
    } else {
      return Api().post(`api/facturas/anulaciones/listas`, facturaLstObj, this.headersConfig());
    }
  },

  /*postListFacturaAnulacionCargadoErroneo(entidadId, facturaLstObj) {
    if(entidadId != null) {
      return Api().post(`api/facturas/entidades/${entidadId}/anulaciones/listas/erroneos`, facturaLstObj, this.headersConfig());
    } else {
      return Api().post(`api/facturas/anulaciones/listas/erroneos`, facturaLstObj, this.headersConfig());
    }
  },*/

  postLibroVentasReport(facturaObj) {
    return Api().post(`api/facturas/librosventas`, facturaObj, {
      responseType: 'arraybuffer',
      headers: {
        'Accept': 'application/pdf',
        Authorization: `Bearer `+localStorage.getItem("token")
      }});
  },
  
};
