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
    findDashboardTodos() {
        return Api().get(`api/dashboard/todos`, this.headersConfig());
    }
};