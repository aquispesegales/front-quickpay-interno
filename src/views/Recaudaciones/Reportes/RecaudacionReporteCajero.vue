<template>
  <div>
    <a-card style="width: 100%">
      <div class="card-head">
        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <h2>
            <b style="color: #08632d"> REPORTE DE CIERRE DIARIO DE CAJA. </b>
          </h2>
        </a-col>
      </div>
    </a-card>
    <a-card style="width: 100%">
      <a-row>
        <!-- <a-col :span="8">
          <div
            :style="{
              width: '300px',
              border: '1px solid #d9d9d9',
              borderRadius: '4px',
            }"
          >
            <a-calendar
              :fullscreen="false"
              @panelChange="onPanelChange"
              :locale="locale"
              @select="onSelect"
            />
          </div>
        </a-col> -->

        <a-col :span="16">
          <a-alert description="Reporte del cierre de día." type="info"
            :message="`FECHA : ${selectedValue && selectedValue.format('DD/MMMM/YYYY')}`">
          </a-alert>
          <a-col :span="24">

            <a-form-item label="Seleccione Empresas :" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }"
              class="a-item-form">
              <a-select mode="tags" v-model="lstIdEntidad" style="width: 100%">
                <a-select-option v-for="item in entidadesList" v-bind:value="item.value + ''"
                  v-bind:key="item.value + ''">
                  {{ item.label }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <!--<a-col :span="24">
            <a-form-item label="Seleccione Empresa :" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
              <a-select v-model="idEntidad" style="width: 100%">
                <a-select-option v-for="item in entidadesList" v-bind:value="item.value" v-bind:key="item.value">{{
                  item.label }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>-->
          <a-col :span="24" style="margin: 2px">
            <a-button type="danger" block @click="generarReporte()">
              Generar Reporte
            </a-button>
          </a-col>
        </a-col>
      </a-row>
    </a-card>
    <!--<a-card style="width: 100%">
      <a-divider orientation="left" class="a-divider"
        >COBRADOS EN EL DIA</a-divider
      >
      <a-table
        :columns="headerCobradosDia"
        :data-source="data"
        :pagination="pagination"
        align="center"
        :loading="loadingTable"
      ></a-table>
    </a-card>-->
    <a-modal v-model="visibleModalReporte" title="Reporte Generado" width="800px" :dialog-style="{ top: '20px' }"
      @ok="visibleModalReporte = false">
      <a-row type="flex" justify="center">
        <a-spin size="large" tip="El reporte se esta cargando...." v-if="viewCargando">
        </a-spin>
      </a-row>

      <a-row type="flex" justify="center" v-if="!viewCargando">
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
import ReportesRecaudacion from "../../../service/Recaudaciones/ReportesRecaudacion.service";
import locale from "ant-design-vue/es/date-picker/locale/es_ES";
import moment from "moment";
import "moment/locale/es";


/*const headerCobradosDia = [
  {
    title: "Empresa",
    dataIndex: "nombre",
    key: "nombre",
    width: "10%",
  },
  {
    title: "Tipo Servicio",
    dataIndex: "tipoServicio",
    key: "tipoServicio",
    width: "12%",
  },
  {
    title: "Servicio",
    dataIndex: "servicio",
    key: "servicio",
    width: "10%",
    scopedSlots: { customRender: "servicio" },
  }];*/

export default {
  data() {
    return {
      locale,
      value: moment(new Date()),
      selectedValue: moment(new Date()),
      value1: moment(new Date()),
      link: null,
      visibleModalReporte: false,
      viewCargando: false,
      entidadesList: [],
      idEntidad: null,
      lstIdEntidad: [],
    };
  },
  created() {
    this.getEntidadesByRecaudadora();
  },
  methods: {
    onPanelChange(value, mode) {
      //console.log(value, mode);
    },
    onSelect(value) {
      this.value = value;
      this.selectedValue = value;
    },
    generarReporte() {

      if (this.lstIdEntidad == null || this.lstIdEntidad.length == 0) {
        this.$notification.error("Debe seleccionar Entidad");
        return;
      }


      this.visibleModalReporte = true;
      this.viewCargando = true;
      let parametros = {};
      parametros.fechaSeleccionada = this.selectedValue;
      //parametros.idEntidad = this.idEntidad;
      parametros.lstEntidadId = this.lstIdEntidad;

      ReportesRecaudacion.reporteCierreCajaDiarioJasper(parametros)
        .then((response) => {
          if (response.status == 200) {
            this.viewFileDownload(response);
            this.viewCargando = false;
            this.$notification.success(
              "El reporte se genero con exito."
            );
          } else {
            this.viewCargando = false;
            this.visibleModalReporte = false;
            this.$notification.warning(
              "No hay datos para mostrar en el reporte."
            );
          }
        })
        .catch((error) => {
          this.viewCargando = false;
          this.visibleModalReporte = false;
        });
    },
    viewFileDownload(response) {
      this.link = null;
      var file = null;
      file = new Blob([response.data], {
        type: "application/pdf",
      });
      this.link = URL.createObjectURL(file);
      this.viewCargando = false;
    },
    getEntidadesByRecaudadora() {
      this.entidadesList = [];
      ReportesRecaudacion.getEntidadesByRecaudadora()
        .then((response) => {
          this.entidadesList = response.data.data;
          this.entidadesList.push({ "label": "TODOS", "value": "0" });
        })
        .catch((error) => {
          this.entidadesList = [];
        });
    },
  },
};
</script>