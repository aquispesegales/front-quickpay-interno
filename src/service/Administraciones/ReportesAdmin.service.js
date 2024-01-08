import Api from "../api.services";
import moment from "moment";
import "moment/locale/es";
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


    findDeudasByParameterForReport(formBusqueda) {
        return Api().post(`api/ReportAdmin/findDeudasByParameter`, formBusqueda, this.headersConfig());
    },
    findDeudasByParameterForReportv2(formBusqueda) {
        return Api().post(`api/ReportAdmin/findDeudasByParameterv2`, formBusqueda, this.headersConfig());
    },
    getEstadoHistoricos() {
        return Api().get(
            `api/historicoDeuda/findEstadoHistorico`,
            this.headersConfig()
        );
    },
    getEntidades() {
        return Api().get(`api/entidades/findAllEntidad`, this.headersConfig());
    },
    getRecaudadora() {
        return Api().get(`api/recaudadores/findAllRecaudadora`, this.headersConfig());
    },
    // REPORTES PARA GRILLA
    findReporteCobroSocio(formBusqueda) {
        return Api().post(`api/ReportAdmin/findReporteCobroSocio`, formBusqueda, this.headersConfig());
    },
    findReporteCobroEmpresa(formBusqueda) {
        return Api().post(`api/ReportAdmin/findReporteCobroEmpresa`, formBusqueda, this.headersConfig());
    },
    // =================

    // REPORTES DESDE JASPER
    openModalGenerarReporte(formBusqueda) {
        return Api().post(`api/ReportAdmin/findDeudasByParameterForReport`, formBusqueda, {
            responseType: 'arraybuffer',
            headers: {
                'Accept': 'application/pdf',
                Authorization: `Bearer ` + localStorage.getItem("token")
            }
        });
    },
    openModalGenerarReporteSocioAdmin(formBusqueda) {
        return Api().post(`api/ReportAdmin/findCobrosByParameterForReportSocioAdmin`, formBusqueda, {
            responseType: 'arraybuffer',
            headers: {
                'Accept': 'application/pdf',
                Authorization: `Bearer ` + localStorage.getItem("token")
            }
        });
    },
    openModalGenerarReporteEmpresaAdmin(formBusqueda) {
        return Api().post(`api/ReportAdmin/findCobrosByParameterForReportEmpresaAdmin`, formBusqueda, {
            responseType: 'arraybuffer',
            headers: {
                'Accept': 'application/pdf',
                Authorization: `Bearer ` + localStorage.getItem("token")
            }
        });
    },
    // ===================
};
