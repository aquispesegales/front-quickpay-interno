<template>
  <div>
    <a-card style="width: 100%">
      <div class="card-head">
        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <h2>
            <b style="color: #08632d"> REPORTE GENERAL DE DEUDAS. </b>
          </h2>
        </a-col>
      </div>
      <a-divider orientation="left">Busqueda</a-divider>

      <a-form>
        <a-row :gutter="1">
          <a-col :span="5">
            Filtrar por Rango de Fechas :  <a-switch size="small" default-checked  v-model="formBusquedav2.filtroRangoFechas" />
          </a-col>
          <a-col :span="5" v-if="!formBusquedav2.filtroRangoFechas" >
            <a-form-item label="Anio Cobro :" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" class="a-item-form">
              <a-select v-model="formBusquedav2.anio">
                <a-select-option v-for="item in lstAnio " v-bind:value="item.anioId" v-bind:key="item.anioId">{{ item.anio
                }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="5" v-if="!formBusquedav2.filtroRangoFechas" >
            <a-form-item label="Mes Cobro :" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" class="a-item-form">
              <a-select v-model="formBusquedav2.mes">
                <a-select-option v-for="item in lstMes " v-bind:value="item.mesId" v-bind:key="item.mesId">{{ item.mes
                }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="5" v-if="!formBusquedav2.filtroRangoFechas">
            <a-form-item label="Dia Cobro :" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" class="a-item-form">
              <a-select v-model="formBusquedav2.dia">
                <a-select-option v-for="item in lstDias " v-bind:value="item.diaId" v-bind:key="item.diaId">{{ item.dia
                }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="7" v-if="formBusquedav2.filtroRangoFechas">
            <a-form-item label="Fecha Inicio Cobro :" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }"
              style="margin-bottom: 25px" class="a-item-form">
              <a-date-picker format="DD/MM/YYYY " v-model="formBusquedav2.fechaInicio" :locale="locale" />
            </a-form-item>
          </a-col>
          <a-col :span="7" v-if="formBusquedav2.filtroRangoFechas">
            <a-form-item label="Fecha Fin Cobro :" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" class="a-item-form">
              <a-date-picker format="DD/MM/YYYY" v-model="formBusquedav2.fechaFin" :locale="locale" />
            </a-form-item>
          </a-col>
          <a-col :span="5"></a-col>
        </a-row>
      </a-form>
      <a-form>
        <a-row :gutter="1">
          <a-col :span="2"></a-col>

          <!-- combo selecciona  empresa -->
          <!--<a-col :span="6">
            <a-form-item label="Empresas :" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" class="a-item-form">
              <a-select v-model="formBusqueda.entidadId" @change="onChangeRecaudadora()">
                <a-select-option value="All">
                  TODAS LAS ENTIDADES :
                </a-select-option>
                <a-select-option v-for="item in entidadesList" v-bind:value="item.entidadId"
                  v-bind:key="item.entidadId">{{ item.nombre }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>-->
          <!-- ===================== -->

          <!-- checkbok selecicona empresa -->

          <a-col :span="6">

            <a-form-item label="Empresa :" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" class="a-item-form">
              <a-select mode="tags" v-model="formBusquedav2.entidadIdArray" :disabled="false">
                <a-select-option v-for="item in entidadesList" v-bind:value="item.entidadId + ''"
                  v-bind:key="item.entidadId + ''">
                  {{ item.nombre }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <!-- combo selecciona socio-->
          <!--<a-col :span="7">
            <a-form-item
              label="Socios :"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
              class="a-item-form"
            >
              <a-select
                v-model="formBusqueda.recaudadorId"
                @change="onChangeRecaudadora()"
              >
                <a-select-option value="All">
                  TODAS LAS RECAUDADORES :
                </a-select-option>
                <a-select-option
                  v-for="item in recaudadorasList"
                  v-bind:value="item.recaudadorId"
                  v-bind:key="item.recaudadorId"
                  >{{ item.nombre }}</a-select-option
                >
              </a-select>
            </a-form-item>
          </a-col>-->
          <!-- ================ -->
          <!-- checkbok selecicona socio -->

          <a-col :span="6">

            <a-form-item label="Socio :" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" class="a-item-form">
              <a-select mode="tags" v-model="formBusquedav2.recaudadorIdArray" :disabled="false">
                <a-select-option v-for="item in recaudadorasList" v-bind:value="item.recaudadorId + ''"
                  v-bind:key="item.recaudadorId + ''">
                  {{ item.nombre }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <!-- =================== -->
          <!-- checkbok selecicona estado -->

          <a-col :span="6">
            <a-form-item label="Estado :" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" class="a-item-form">
              <a-select mode="tags" v-model="formBusquedav2.estadoArray" :disabled="disableEstado">
                <a-select-option v-for="item in estadoList" v-bind:value="item.value" v-bind:key="item.value">
                  {{ item.label }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <!-- =================== -->

          <a-col :span="3"></a-col>
        </a-row>
      </a-form>

      <br />
      <a-row type="flex" justify="center" align="top" :gutter="16">
        <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <a-button type="dashed" @click="limpiar()" block :style="{
            fontSize: '19px',
            height: '50px',
          }">
            <span :style="{ fontSize: '20px' }">
              <a-icon type="undo" /> Limpiar
            </span>
          </a-button>
        </a-col>
        <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <a-button type="danger" @click="findDeudasByParameterForReportv2(1)" block :style="{
            fontSize: '19px',
            height: '50px',
          }">
            <span> <a-icon type="search" /> Buscar </span>
          </a-button>
        </a-col>
        <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <a-button type="primary" icon="printer" @click="visibleModalTipoReporte = true" block :style="{
            fontSize: '19px',
            height: '50px',
          }">
            Generar Reporte
          </a-button>
        </a-col>
      </a-row>
    </a-card>
    <a-card style="width: 100%">
      <a-divider orientation="left">DATOS DE LAS DEUDAS</a-divider>
      <a-table :columns="columns" :data-source="data" :pagination="pagination" align="center"
        :loading="loadingTable"></a-table>
    </a-card>

    <a-modal v-model="visibleModalTipoReporte" title="Seleccione tipo de reporte" @ok="visibleModalTipoReporte = false">
      <a-row type="flex" justify="center" align="top">
        <a-col>
          <a-col>Seleccione un tipo de Reporte a generar.</a-col>
        </a-col>
      </a-row>
      <a-row type="flex" justify="center" align="top">
        <a-col>
          <a-radio-group button-style="solid" v-model="formBusquedav2.export">
            <a-radio-button value="pdf"> PDF </a-radio-button>
            <!--<a-radio-button value="msword"> WORD </a-radio-button>-->
            <a-radio-button value="msexcel"> EXCEL </a-radio-button>
          </a-radio-group>
        </a-col>
      </a-row>
      <template slot="footer">
        <a-button key="back" @click="openModalGenerarReporte()">
          Generar Reporte
        </a-button>
      </template>
    </a-modal>
    <a-modal v-model="visibleModalReporte" title="Reporte Generado" width="900px" height="400px"
      :dialog-style="{ top: '20px' }" @ok="visibleModalReporte = false">
      <a-row type="flex" justify="center">
        <a-spin size="large" tip="El reporte se esta cargando...." v-if="viewCargando">
        </a-spin>
        <iframe width="100%" height="400px" :src="this.link" frameborder="0">
        </iframe>
      </a-row>

      <template slot="footer">
        <a-button key="back" @click="visibleModalReporte = false">
          Cerrar
        </a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
import ReportesAdmin from "../../../service/Administraciones/ReportesAdmin.service";
import locale from "ant-design-vue/es/date-picker/locale/es_ES";
import moment from "moment";
import "moment/locale/es";

const columns = [
  {
    title: "Empresa",
    dataIndex: "nombre",
    key: "nombre",
    width: "10%",
    scopedSlots: { customRender: "nombre" },
  },
  {
    title: "Socio ",
    dataIndex: "nombreRecaudadora",
    key: "nombreRecaudadora",
    width: "10%",
    scopedSlots: { customRender: "nombreRecaudadora" },
  },
  {
    title: "Cliente Final",
    dataIndex: "nombreCliente",
    key: "nombreCliente",
    width: "10%",
    scopedSlots: { customRender: "nombreCliente" },
  },

  {
    title: "Tipo Servicio",
    dataIndex: "tipoServicio",
    key: "tipoServicio",
    width: "12%",
  },
  /*{
    title: "Servicio",
    dataIndex: "servicio",
    key: "servicio",
    width: "10%",
    scopedSlots: { customRender: "servicio" },
  },*/

  {
    title: "Periodo",
    dataIndex: "periodo",
    key: "periodo",
    width: "8%",
  },
  {
    title: "Cód. Cliente",
    dataIndex: "codigoCliente",
    key: "codigoCliente",
    width: "10%",
    align: "center",
  },

  /*{
    title: "Nombre Recaudadora",
    dataIndex: "nombreRecaudadora",
    key: "nombreRecaudadora",
    width: "20%",
  },*/
  {
    title: "Fecha Cobro",
    dataIndex: "fechaCreacion",
    key: "fechaCreacion",
    width: "15%",
  },
  {
    title: "Monto",
    dataIndex: "total",
    key: "total",
    width: "10%",
  },
  /*{
    title: "Comision",
    dataIndex: "comision",
    key: "comision",
    width: "10%",
  },*/
  {
    title: "Estado",
    key: "estado",
    dataIndex: "estado",
    width: "10%",
    scopedSlots: { customRender: "estado" },
  },
];
export default {
  data() {
    return {
      locale,
      formBusqueda: {
        fechaInicio: null,
        fechaFin: null,
        entidadId: "All",
        recaudadorId: "All",
        estado: "All",
        export: "pdf",
      },
      formBusquedav2: {
        filtroRangoFechas:true,
        mes:null,
        dia:null,
        anio:null,
        fechaInicio: null,
        fechaFin: null,
        entidadIdArray: [],
        recaudadorIdArray: [],
        estadoArray: []
      },
      columns,
      data: [],
      pagination: {},
      page: 1,
      total: 0,
      recaudadorasList: [],
      entidadesList: [],
      estadoList: [],
      visibleModalTipoReporte: false,
      visibleModalReporte: false,
      link: null,
      viewCargando: false,
      disableEstado: false,
      loadingTable: false,
      checkedListEstado: [],

      // nuevo
      checkedListEmpresas: [],
      checkedListSocios: [],
 
  lstAnio: [
        {
          anioId: "2021",
          anio: "2021"
        },
        {
          anioId: "2022",
          anio: "2022"
        },
        {
          anioId: "2023",
          anio: "2023"
        }
      ],
      //vFiltroRangoFechas:true,
      lstMes: [
        {
          mesId: "01",
          mes: "ENERO"
        },
        {
          mesId: "02",
          mes: "FEBRERO"
        },
        {
          mesId: "03",
          mes: "MARZO"
        },
        {
          mesId: "04",
          mes: "ABRIL"
        },
        {
          mesId: "05",
          mes: "MAYO"
        },
        {
          mesId: "06",
          mes: "JUNIO"
        },
        {
          mesId: "07",
          mes: "JULIO"
        },
        {
          mesId: "08",
          mes: "AGOSTO"
        },
        {
          mesId: "09",
          mes: "SEPTIEMBRE"
        },
        {
          mesId: "10",
          mes: "OCTUBRE"
        },
        {
          mesId: "11",
          mes: "NOVIEMBRE"
        },
        {
          mesId: "12",
          mes: "DICIEMBRE"
        }

      ],

      

    };
  },
  created() {
    //this.findDeudasByParameterForReport(1);
    this.getEstadoHistoricos();
    this.getRecaudadora();
    this.getEntidades();
    this.pagination = {
      total: this.total,
      onChange: (page) => {
        console.log("paginas: "+page)
        //this.findDeudasByParameterForReport(page);
        this.findDeudasByParameterForReportv2(page);
      },
    };
  },
  computed: {
    // a computed getter
    lstDias: function () {
      if(this.formBusquedav2.anio=='' || this.formBusquedav2.anio==null){
        return [];
      }
      if(this.formBusquedav2.mes=='' || this.formBusquedav2.mes==null){
        return [];
      }
      //var año = new Date().getFullYear();
      var diasMes = new Date(this.formBusquedav2.anio, this.formBusquedav2.mes, 0).getDate();
      var diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      this.lst=[];
      for (var dia = 1; dia <= diasMes; dia++) {
        // Ojo, hay que restarle 1 para obtener el mes correcto
        var indice = new Date(this.formBusquedav2.anio, this.formBusquedav2.mes - 1, dia).getDay();
        if((dia+"").length==1){
          dia = "0"+dia;
        }else{
          dia = dia+"";
        }
        this.lst.push(
          {
            diaId:dia,
            dia:`${dia} = ${diasSemana[indice]}` 
          }
        );
        //console.log(`El día número ${dia} del mes ${mes} del año ${año} es ${diasSemana[indice]}`);
      }
      return this.lst;
    }
  },
  methods: {
    /*findDeudasByParameterForReport(page) {
      this.loadingTable = true;
      this.formBusqueda.paginacion = page;
      this.formBusqueda.estadoArray = this.checkedListEstado;
      ReportesAdmin.findDeudasByParameterForReport(this.formBusqueda)
        .then((response) => {
          this.data = response.data.data.content;
          this.pagination.pageSize = response.data.data.numberOfElements;
          this.pagination.total = response.data.data.totalElements;
          this.loadingTable = false;
        })
        .catch((error) => {
          this.data = [];
          this.loadingTable = false;
        });
    },*/
    findDeudasByParameterForReportv2(page) {
      //console.log(this.vFiltroRangoFechas)
      if(!this.formBusquedav2.filtroRangoFechas){
        //console.log("false")
        if(this.formBusquedav2.mes==null || this.formBusquedav2.dia==null){
          //console.log("jaajjaj")
          this.$notification.error(
              "Cuando el filtro es por mes y dia, debe seleccionar estos parametros."
            );
            return;
        }
      }
      if(this.formBusquedav2.filtroRangoFechas){
        if(this.formBusquedav2.fechaInicio==null || this.formBusquedav2.fechaFin==null){
          this.$notification.error(
              "Cuando el filtro es por rango de fechas, debe seleccionar estos parametros."
            );
            return;
        }
      }
      if(this.formBusquedav2.entidadIdArray.length==0 && this.formBusquedav2.recaudadorIdArray.length==0 && this.formBusquedav2.estadoArray.length==0){
        this.$notification.error(
              "Debe seleccionar Entidad, Socio y Estado."
            );
            return;
      }

      this.loadingTable = true;
      this.formBusquedav2.paginacion = page;
      //this.formBusqueda.estadoArray = this.checkedListEstado;
      ReportesAdmin.findDeudasByParameterForReportv2(this.formBusquedav2)
        .then((response) => {
          this.data = response.data.data.content;
          this.pagination.pageSize = response.data.data.numberOfElements;
          this.pagination.total = response.data.data.totalElements;
          this.loadingTable = false;
        })
        .catch((error) => {
          this.data = [];
          this.loadingTable = false;
        });
    },
    getEstadoHistoricos() {
      ReportesAdmin.getEstadoHistoricos()
        .then((response) => {
          this.estadoList = response.data.data;
          this.estadoList.push({ "label": "TODOS", "value": "0" });
        })
        .catch((error) => {
          this.estadoList = [];
        });
    },
    getEntidades() {
      ReportesAdmin.getEntidades()
        .then((response) => {
          this.entidadesList = response.data.data;
          this.entidadesList.push({ "entidadId": 0, "nombre": "TODOS" })
        })
        .catch((error) => {
          this.entidadesList = [];
        });
    },
    getRecaudadora() {
      ReportesAdmin.getRecaudadora()
        .then((response) => {
          this.recaudadorasList = response.data.data;
          this.recaudadorasList.push({ "recaudadorId": 0, "nombre": "TODOS" })
        })
        .catch((error) => {
          this.recaudadorasList = [];
        });
    },
    openModalGenerarReporte() {
      this.link = null;
      this.viewCargando = true;
      //this.formBusqueda.estadoArray = this.checkedListEstado;
      ReportesAdmin.openModalGenerarReporte(this.formBusquedav2)
        .then((response) => {
          if (response.status == 200) {
            if (this.formBusqueda.export == "pdf") {
              this.viewFileDownload(response);
            } else {
              this.forceFileDownload(response, "reporte");
            }
          } else {
            this.viewCargando = false;
            this.$notification.warning(
              "No hay datos para mostrar en el reporte."
            );
          }
        })
        .catch((error) => {
          this.link = null;
          this.viewCargando = false;
          this.visibleModalReporte = true;
        });

      this.visibleModalTipoReporte = false;
      this.visibleModalReporte = true;
    },
    forceFileDownload(response, fileName) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      if (this.formBusqueda.export == "msword") {
        link.setAttribute("download", `${fileName}.doc`);
      } else {
        link.setAttribute("download", `${fileName}.xlsx`);
      }
      document.body.appendChild(link);
      link.click();
      this.visibleModalReporte = false;
      this.viewCargando = false;
    },
    viewFileDownload(response) {
      var file = new Blob([response.data], {
        type: "application/" + this.formBusqueda.export,
      });
      this.link = URL.createObjectURL(file);
      this.viewCargando = false;
    },
    /*onChangeRecaudadora() {
      if (this.formBusqueda.recaudadorId != "All") {
        this.formBusqueda.estado = "COBRADO";
        this.disableEstado = false;
      } else {
        this.disableEstado = false;
      }
    },*/
    limpiar() {
      this.formBusquedav2.fechaInicio = null;
      this.formBusquedav2.fechaFin = null;
      this.formBusquedav2.entidadIdArray = [];
      this.formBusquedav2.recaudadorIdArray = [];
      this.formBusquedav2.estadoArray = [];
    },
  


  },
};
</script>
<style scoped>
@import "../../../../public/plantilla.css";

.a-item-form {
  margin: 0px;
}
</style>