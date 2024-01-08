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
 
  savePersonaSocioEmpresa(tipoUsuarioId,form) {
    return Api().post(`api/personasSocioEmpresa/savePersonaSocioEmpresa/${tipoUsuarioId}`, form, this.headersConfig());
  },
  updatePersonaSocioEmpresa(tipoUsuarioId,form) {
    return Api().post(`api/personasSocioEmpresa/updatePersonaSocioEmpresa/${tipoUsuarioId}`, form, this.headersConfig());
  },
  findPersonasByTipo(formBusqueda,pTipo) {
    return Api().post(`api/personasSocioEmpresa/findPersonasByTipo/${pTipo}`, formBusqueda, this.headersConfig());
  },


  
};