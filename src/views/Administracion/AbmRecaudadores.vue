<template>
  <div>
    <div v-if="!displayForm" style="
          border: 2px solid #21618c;
          border-radius: 5px;
          height: 100%;
          width: 100%;
          padding: 1%;
          color: #21618c;
        ">
      <a-row type="flex" justify="space-around" align="middle"><a-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
          <h2><b style="color: #21618c"> Administración de Registro de Socios Estratégicos  </b></h2>
        </a-col>
        <a-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14" align="right">
          <a-row type="flex" justify="end">
            <a-col :xs="24" :sm="24" :md="24" :lg="20" :xl="20" align="right">
              <a-input-search v-model="search" placeholder="Buscar por nombre..." @search="filterTable"
                enter-button=" Buscar " :maxLength="50" />
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </div>

    <a-card v-if="!displayForm" style="width: 100%">
      <template slot="actions" class="ant-card-actions">
        <b>{{ filter }}</b>
        <a-button-group>
          <a-button v-for="(item, i) in lstOpciones" :key="i" @click="seleccionarOpcion(item.transaccion)" type="primary">
            {{ item.etiqueta }}
          </a-button>
        </a-button-group>
      </template>
    </a-card>
    <a-card v-if="!displayForm" style="width: 100%">
      <!--LISTADO DE RECAUDADORES-->
      <a-table :row-selection="rowSelection" :columns="columns" :data-source="lstFilter" rowKey="recaudadorId"
        :pagination="pagination" :loading="loading" :scroll="{ x: 1000 }">
        <template slot="param" slot-scope="text, record">
          <a-row type="flex">
            <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="10" class="labelTittle">
              Metodos Cobro:
            </a-col>
            <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="14" class="labelValue">
              {{ record.metodoCobroLstJoin }}
            </a-col>
          </a-row>
        </template>
        <template slot="estado" slot-scope="text, record">
          <div v-if="record.estado == 'ACTIVO'" align="center">
            <a-tag color="green">
              <a-icon type="caret-up" :style="{ fontSize: '20px' }" />
              {{ record.estado }}
            </a-tag>
          </div>
          <div v-if="record.estado == 'INACTIVO'" align="center">
            <a-tag color="red">
              <a-icon type="caret-down" :style="{ fontSize: '20px' }" />
              {{ record.estado }}
            </a-tag>
          </div>
          <div v-if="record.estado == 'CREADO'" align="center">
            <a-tag color="blue">
              {{ record.estado }}
            </a-tag>
          </div>
        </template>
        <template slot="opciones" slot-scope="text, record" v-if="record.estado == 'ACTIVO' || record.estado == 'CREADO'">
          <a href="javascript:;" @click="mostrarSucursal(record.recaudadorId, record.nombre)">Sucursales</a>
          <br />
          <a href="javascript:;" @click="openModal(record.recaudadorId)">Empresas</a>

          <br />
          <a href="javascript:;" @click="openModalComision(record.recaudadorId)">
            Comisión </a><br />
        </template>
        <template slot="datosGenerales" slot-scope="text, record">
          <a-row type="flex">
            <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="10" class="labelTittle">
              Nombre
            </a-col>
            <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="14" class="labelValue">
              <a-tooltip v-if="record.nombre.length > 30" :key="record.nombre" :title="record.nombre">
                <a-tag :key="record.nombre" color="blue">
                  {{ `${record.nombre.slice(0, 30)}...` }}
                </a-tag>
              </a-tooltip>
              <a-tag v-else color="blue">
                {{ record.nombre }}
              </a-tag>
            </a-col>
          </a-row>
          <a-row type="flex">
            <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="10" class="labelTittle">
              Tipo de Socios Estratégicos
            </a-col>
            <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="14" class="labelValue">
              {{ record.tipoRecaudadorDescripcion }}
            </a-col>
          </a-row>
          <a-row type="flex">
            <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="10" class="labelTittle">
              Dirección
            </a-col>
            <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="14" class="labelValue">
              {{ record.direccion }}
            </a-col>
          </a-row>
          <a-row type="flex">
            <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="10" class="labelTittle">
              Teléfono
            </a-col>
            <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="14" class="labelValue">
              {{ record.telefono }}
            </a-col>
          </a-row>
        </template>
      </a-table>
    </a-card>
    <div v-if="displayForm" style="
          border: 2px solid #21618c;
          border-radius: 5px;
          height: 100%;
          width: 100%;
          padding: 1%;
          color: #21618c;
        ">
      <a-row type="flex" justify="space-around" align="middle"><a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <h2><b style="color: #21618c"><a-icon type="arrow-left" @click="volverListado" /> Administración de Socios
              Estratégicos: {{ subTitle }} </b></h2>
        </a-col>
      </a-row>
    </div>
    <a-card v-if="displayForm">
      <!--LISTADO DE RECAUDADORES-->
      <a-form-model ref="ruleForm" :model="recaudadorObj" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol"
        size="small">
        <a-divider orientation="left">Información General</a-divider>
        <a-form-model-item ref="nombre" label="Nombre Socios Estratégicos" prop="nombre">
          <a-input v-model="recaudadorObj.nombre" @blur="() => {
              $refs.nombre.onFieldBlur();
            }
            " :maxLength="250" />
        </a-form-model-item>
        <a-form-model-item label="Tipo Socios Estratégicos" prop="tipoRecaudadorId">
          <a-select v-model="recaudadorObj.tipoRecaudadorId" placeholder="Seleccione Tipo Socios Estratégicos">
            <a-select-option v-for="(item, i) in lstTipoRecaudadores" :key="i" :value="item.dominioId">
              {{ item.descripcion }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item ref="direccion" label="Dirección" prop="direccion">
          <a-input v-model="recaudadorObj.direccion" @blur="() => {
              $refs.direccion.onFieldBlur();
            }
            " :maxLength="250" />
        </a-form-model-item>
        <a-form-model-item ref="telefono" label="Teléfono" prop="telefono">
          <a-input v-model="recaudadorObj.telefono" @blur="() => {
              $refs.telefono.onFieldBlur();
            }
            " :maxLength="10" />
        </a-form-model-item>
        <a-divider orientation="left" v-if="recaudadorObj.recaudadorId == null">Parametrización</a-divider>
        <a-form-model-item label="Métodos Cobro">
          <a-select mode="multiple" v-model="recaudadorObj.metodoCobroIdLst" placeholder="Seleccione los métodos cobro"
            style="width: 100%">
            <a-select-option v-for="item in lstMetodosCobros" :key="item.dominioId">
              {{ item.descripcion }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-divider orientation="left" v-if="recaudadorObj.recaudadorId == null">Empresas donde serán
          habilitadas</a-divider>
        <a-form-model-item label="Empresas" v-if="recaudadorObj.recaudadorId == null">
          <EntidadLst :recaudadorObj="recaudadorObj" />
        </a-form-model-item>

        <!-- comision-->
        <a-divider orientation="left" v-if="recaudadorObj.recaudadorId == null">Comisión</a-divider>
        <a-form-model-item ref="tipoComisionId" label="Tipo Comision" prop="tipoComisionId" v-if="recaudadorObj.recaudadorId == null">
          <a-select style="width: 100%" v-model="recaudadorComisionObj.tipoComisionId"
            placeholder="Seleccione Tipo Comision">
            <a-select-option v-for="(item, i) in lstTipoComisiones" :key="i" :value="item.dominioId">
              {{ item.descripcion }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item ref="comision" label="Comisión" prop="comision" v-if="recaudadorObj.recaudadorId == null">
          <money v-model="recaudadorComisionObj.comision" v-bind="money" class="ant-input" @blur="() => {
              $refs.comision.onFieldBlur();
            }
            "></money>
        </a-form-model-item>
        <!--*************-->

      </a-form-model>
      
      <template slot="actions" class="ant-card-actions">
        <a-button type="link" @click="onSubmit" style="color:white; background-color:#339966;border:0px"><a-icon
            type="form" /> Registrar </a-button>
        <a-button type="primary" ghost @click="resetForm"><a-icon type="reload" /> Limpiar </a-button>
      </template>
    </a-card>

    <!--mODAL-->
    <a-modal v-model="displayModal" title="Empresas Asociadas" ok-text="Registrar" cancel-text="Cancelar"
      @ok="closeModal()" width="60%" :centered="true" :closable="false" :maskClosable="false"
      :okButtonProps="{ style: { color: 'white', background: '#339966', border: '0px' } }"
      :cancelButtonProps="{ style: { color: 'white', background: 'red', border: '0px' } }">
      <EntidadLst :recaudadorObj="recaudadorObj" />
    </a-modal>

    <!--MODAL COMISION---------------------------------------------------->
    <a-modal v-model="displayModalComision" title="Comisión Por Recaudadora" ok-text="OK" cancel-text="Cancelar"
      @ok="closeModalComision()" width="800px" :centered="true" :destroyOnClose="true" :footer="null">
      <RecaudadoresComisiones :recaudadorId="recaudadorId" />
    </a-modal>
  </div>
</template>
<script>
import Dominios from "../../service/Administraciones/Dominio.service";
import Recaudadores from "../../service/Administraciones/Recaudador.service";
import EntidadLst from "../../components/Administracion/EntidadesLst.vue";
import RecaudadoresComisiones from "../../components/Administracion/RecaudadoresComisiones.vue";
import RecaudadorComisionService from "../../service/Administraciones/RecaudadorComision.service";
import Sidebar from "../../service/Home/Sidebar.service";
import { Money } from "v-money";
const sorter = (data) => {
  return data.slice().sort((a, b) => b.recaudadorId - a.recaudadorId)
};

const columns = [
  {
    title: "Datos Generales",
    dataIndex: "nombre",
    scopedSlots: { customRender: "datosGenerales" },
    width: "40%"
  },
  {
    title: "Parametrización",
    scopedSlots: { customRender: "param" },
    width: "25%"
  },
  {
    title: "Estado",
    dataIndex: "estado",
    scopedSlots: { customRender: "estado" },
    width: "15%",
  },
  {
    title: "Opciones",
    dataIndex: "",
    scopedSlots: { customRender: "opciones" },
    width: "20%",
  },
];

export default {
  components: {
    EntidadLst,
    RecaudadoresComisiones,
    Money
  },
  data() {
    return {
      /*******LISTADO DE RECAUDADORES********* */
      /*Datos*/
      lstRecaudadores: [],
      recaudadorId: null,
      /*Tabla*/
      columns,
      selectedRowKeys: [],
      pagination: {
        pageSize: 5,
      },
      loading: false,
      /*menu*/
      lstOpciones: [],
      /**Otros */
      current: null,
      displayModal: false,

      /*******FORMULARIO RECAUDADORES********* */
      /*Datos*/
      recaudadorObj: {},
      /*Formulario*/
      subTitle: "",
      displayForm: false,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      rules: {
        nombre: [
          {
            required: true,
            message: "Debe registrar el nombre",
            trigger: "blur",
          },
          {
            min: 2,
            message: "Mínimante el nombre debe tener 2 caracteres",
            trigger: "blur",
          },
        ],
        tipoRecaudadorId: [
          {
            required: true,
            message: "Debe seleccionar un Tipo de Socio Estratégico",
            trigger: "change",
          },
        ],
        direccion: [
          {
            required: true,
            message: "Debe registrar la dirección",
            trigger: "blur",
          },
          {
            min: 5,
            message: "Mínimante la dirección debe tener 5 caracteres",
            trigger: "blur",
          },
        ],
        telefono: [
          {
            required: true,
            message: "Debe registrar el teléfono",
            trigger: "blur",
          },
          {
            min: 7,
            max: 10,
            message:
              "El teléfono debe contener al menos 7 caracteres y máximo 10",
            trigger: "blur",
          },
        ],
      },

      /*Dominios*/
      lstTipoRecaudadores: [],
      lstMetodosCobros: [],

      /**Modal Comision */
      displayModalComision: false,

      /**Filter */
      search: '',
      lstFilter: [],
      filter: 'Registros: 0/0',

      /*comisiópn*/
      recaudadorComisionObj: {},

      lstTipoComisiones: [],
      money: {
        decimal: ".",
        thousands: ",",
        //prefix: "Bs",
        precision: 2,
        masked: false,
        maxlength: 17,
      },
    };
  },
  computed: {
    /*Tabla*/
    rowSelection() {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          /*console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
          );*/
          this.selectedRowKeys = selectedRowKeys;

          //Opciones
          const mismoEstado = [...new Set(selectedRows.map(i => i.estado))];
          if (mismoEstado.length > 1) {
            this.$notification.warning("Debe seleccionar registros del mismo ESTADO para realizar operaciones múltiples.");
            this.cargarOpcionesByEstado("INICIAL");
          } else {
            if (selectedRows.length > 0)
              this.cargarOpcionesByEstado(selectedRows[0].estado)
            else
              this.cargarOpcionesByEstado(null);
          }
        },
      };
    },
  },
  mounted() {
    this.cargarRecaudadores();
    this.cargarTipoRecaudadora();
    this.cargarMetodosCobros();
    this.cargarOpcionesByEstado(null);
    this.cargarTipoComisiones();
  },

  methods: {
    /*****LISTADO DE RECAUDADORES*** */
    /**Menú */
    cargarOpcionesByEstado(estadoInicial) {
      Sidebar.getOpcionesByEstado("RECAUDADORES", estadoInicial).then((r) => {
        this.lstOpciones = r.data.data;
      });
    },
    seleccionarOpcion(opcion) {
      switch (opcion) {
        case "CREAR": //CREAR
          this.recaudadorObj = {};
          this.recaudadorComisionObj={};
          this.displayForm = true;
          this.subTitle = "Registro Nuevo";
          break;
        case "MODIFICAR": //Modiicar
          if (this.selectedRowKeys.length === 1) {
            this.cargarRecaudador(this.selectedRowKeys);
            //this.cargarComisionActiva(this.selectedRowKeys);
            this.displayForm = true;
            this.subTitle = "Modificación de Registro";

          } else {
            this.$notification.warning(
              "Debe seleccionar un solo registro para MODIFICAR"
            );
          }
          break;
        case "ELIMINAR": //ELIMINAR
          if (this.selectedRowKeys.length > 0) {
            this.$confirm({
              title:
                "¿Está seguro de ELIMINAR el(los) registro(s) seleccionado(s)?",
              content:
                "Considere que el(los) registro(s) ya no podrá(n) ser visualizado(s).",
              okText: "Aceptar",
              okType: "danger",
              cancelText: "Cancelar",
              onOk: () => {
                this.actualizaListaRecaudadoresTransaccion(
                  this.selectedRowKeys,
                  "ELIMINAR"
                );

              },
              onCancel() {
              },
              class: "test",
            });
          } else {
            this.$notification.warning(
              "Debe seleccionar al menos un registro para ELIMINAR"
            );
          }
          break;
        case "ACTIVAR": //ALTA
          if (this.selectedRowKeys.length > 0) {
            this.$confirm({
              title:
                "¿Está seguro de DAR ALTA el(los) registro(s) seleccionado(s)?",
              content:
                "Considere que el(los) registro(s) ingresará(n) en transacciones en el Sistema.",
              okText: "Aceptar",
              cancelText: "Cancelar",
              onOk: () => {
                this.actualizaListaRecaudadoresTransaccion(
                  this.selectedRowKeys,
                  "ACTIVAR"
                );
              },
              onCancel() {
              },
              class: "test",
            });
          } else {
            this.$notification.warning(
              "Debe seleccionar al menos un registro para DAR ALTA"
            );
          }
          break;
        case "INACTIVAR": //BAJAR
          if (this.selectedRowKeys.length > 0) {
            this.$confirm({
              title:
                "¿Está seguro de DAR BAJA el(los) registro(s) seleccionado(s)?",
              content:
                "Considere que el registro ya no podrá realizar transacciones en el Sistema.",
              okText: "Aceptar",
              okType: "danger",
              cancelText: "Cancelar",
              onOk: () => {
                this.actualizaListaRecaudadoresTransaccion(
                  this.selectedRowKeys,
                  "INACTIVAR"
                );
              },
              onCancel() {
              },
              class: "test",
            });
          } else {
            this.$notification.warning(
              "Debe seleccionar al menos un registro para DAR BAJA"
            );
          }
          break;
      }
    },
    /**Opeaciones */
    cargarRecaudadores() {
      this.loading = true;
      Recaudadores.getLstRecaudadores()
        .then((r) => {
          if (r.status === 204) {
            this.lstRecaudadores = [];
            this.lstFilter = [];
            this.$notification.warning(
              "No se ha encontrado ninguna Recaudador registrada"
            );
            this.loading = false;
            return;
          }
          this.lstRecaudadores = r.data.result;
          this.lstFilter = sorter(this.lstRecaudadores);
          this.countRows();
          this.loading = false;
        })
        .catch((error) => {
          this.lstRecaudadores = [];
          this.lstFilter = [];
          this.$notification.error(
            error.response.data.message,
            error.response.data.code
          );
          this.loading = false;
        });
    },
    actualizaRecaudadorTransaccion(recaudadorId, transaccion) {
      //Solo se usara el listado
      this.$Progress.start();
      Recaudadores.putRecaudadorTransaccion(recaudadorId, transaccion)
        .then((r) => {
          this.cargarRecaudadores();


          this.$notification.success(r.data.message);
          this.$Progress.finish();
        })
        .catch((error) => {
          this.$notification.error(
            error.response.data.message,
            error.response.data.code
          );
          this.$Progress.fail();
        });
    },

    actualizaListaRecaudadoresTransaccion(recaudadorIdLst, transaccion) {
      Recaudadores.putLstRecaudadorTransaccion(recaudadorIdLst, transaccion)
        .then((r) => {
          this.$Progress.start();
          this.cargarRecaudadores();

          this.selectedRowKeys = [];

          this.$notification.success(r.data.message);
          this.$Progress.finish();
        })
        .catch((error) => {
          this.$notification.error(
            error.response.data.message,
            error.response.data.code
          );
          this.$Progress.fail();
        });
    },
    /**Visualizaciones */
    mostrarSucursal(recaudadorId, nombre) {
      this.$router.push({
        name: "AbmSucursales",
        params: { recaudadorId: recaudadorId, nombre: nombre },
      });
    },

    /****FORMULARIO**** */
    /*Control de campos*/
    volverListado() {
      this.displayForm = !this.displayForm;
      this.recaudadorObj = {};
      this.selectedRowKeys = [];
    },

    /*Lista de Dominio*/
    cargarTipoRecaudadora() {
      Dominios.getListDominos("tipo_recaudador_id")
        .then((r) => {
          if (r.status === 204) {
            this.lstTipoRecaudadores = [];
            this.$notification.warning(
              "La parametrización de dominios no esta completa."
            );
            return;
          }

          this.lstTipoRecaudadores = r.data.result;
        })
        .catch((error) => {
          this.lstTipoRecaudadores = [];
          this.$notification.error(
            error.response.data.message,
            error.response.data.code
          );
        });
    },
    cargarTipoComisiones() {
      Dominios.getListDominos("tipo_comision_id").then((r) => {
        if (r.status === 204) {
          this.lstTipoComisiones = [];
          this.$notification.warning(
            "La parametrización de dominios no esta completa."
          );
          return;
        }
        this.lstTipoComisiones = r.data.result;
      })
        .catch((error) => {
          this.lstTipoComisiones = [];
          this.$notification.error(
            error.response.data.message,
            error.response.data.code
          );
        });
    },
    cargarMetodosCobros() {
      Dominios.getListDominos("metodo_cobro_id")
        .then((r) => {
          if (r.status === 204) {
            this.lstMetodosCobros = [];
            this.$notification.warning(
              "La parametrización de dominios no esta completa."
            );
            return;
          }

          this.lstMetodosCobros = r.data.result;
        })
        .catch((error) => {
          this.lstMetodosCobros = [];
          this.$notification.error(
            error.response.data.message,
            error.response.data.code
          );
        });
    },
    /*Operaciones*/
    cargarRecaudador(recaudadorId) {
      Recaudadores.getRecaudador(recaudadorId).then((r) => {
        this.recaudadorObj = r.data.result;
      });
    },
    /*cargarComisionActiva(recaudadorId) {
      RecaudadorComisionService.getRecaudadoresComisionesActivoByRecaudadorId(recaudadorId).then((r) => {
        this.recaudadorComisionObj = r.data.result;
      });
    },*/

     guardarRecaudador() {
      this.$Progress.start();
      Recaudadores.postRecaudador(this.recaudadorObj)
        .then((r) => {
          //aqui
          this.recaudadorComisionObj.recaudadorId = r.data.result.recaudadorId;
          if(this.recaudadorObj.recaudadorId==null){
            this.guardarComision();
          }
          
          this.cargarRecaudadores();
          this.displayForm = false;
          this.$notification.success(r.data.message);
          this.$Progress.finish();
        })
        .catch((error) => {
          this.$notification.error(
            error.response.data.message,
            error.response.data.code
          );
          this.$Progress.fail();
        });
    },
    async guardarComision() {
      console.log('almacenar comisión')
      this.recaudadorComisionObj.recaudadorComisionId = null;
      this.recaudadorComisionObj.fechaCreacion = null;
      this.recaudadorComisionObj.fechaModificacion = null;
      try {
        let r = await RecaudadorComisionService.postRecaudadorComision(this.recaudadorComisionObj);
        this.$notification.success(r.data.message);
      } catch (error) {
        this.$notification.error(error.response.data.message, error.response.data.code);
      }
    },
    /*Acciones de Formulario*/
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.recaudadorObj.metodoCobroIdLst.length > 0) {
            this.guardarRecaudador();
            this.selectedRowKeys = [];
            
          } else {
            this.$notification.warning("Debe seleccionar por lo menos un método de cobro");
          }
        } else {
          this.$notification.warning(
            "Debe resolver las validaciones del formulario."
          );
          return false;
        }
      });
    },
    resetForm() {
      this.recaudadorObj = {};
      this.$refs.ruleForm.resetFields();
    },


    /**Modal */
    openModal(recaudadorId) {
      this.cargarRecaudador(recaudadorId);
      this.displayModal = true;
    },
    closeModal() {
      this.guardarEntidades();
      this.displayModal = false;
    },
    abrirEntidad() {
      this.$confirm({
        title: "¿Está seguro de ingresar a Registro de Entidades?",
        content: "Considere que los datos se perderán.",
        okText: "Aceptar",
        cancelText: "Cancelar",
        onOk: () => {
          this.$router.push({
            name: "AbmEntidades",
          });
        },
        onCancel() {
        },
        class: "test",
      });
    },

    guardarEntidades() {
      this.$Progress.start();
      Recaudadores.postEntidadRecaudador(
        this.recaudadorObj.entidadIdLst,
        this.recaudadorObj.recaudadorId
      )
        .then((r) => {
          this.$notification.success(r.data.message);
          this.$Progress.finish();
        })
        .catch((error) => {
          this.lstRecaudadores = [];
          this.$notification.error(
            error.response.data.message,
            error.response.data.code
          );
          this.$Progress.fail();
        });
    },


    /**RECAUDADORES COMISIONES***************************************** */
    /**Modal Comision */
    openModalComision(recaudadorId) {
      this.recaudadorId = recaudadorId;
      this.displayModalComision = true;
    },
    closeModalComision() {
      this.recaudadorId = null;
      this.displayModalComision = false;
    },

    /**Filtrado */
    filterTable() {
      this.lstFilter = this.lstRecaudadores.filter((s) => {
        if (this.search != null || this.search != '') {
          return s.nombre.toLowerCase().includes(this.search.toLowerCase());
        }
      });
      this.countRows();
    },
    countRows() {
      let rowFilter = this.lstFilter.length;
      let rowTotal = this.lstRecaudadores.length;
      this.filter = "Registros: " + rowFilter + "/" + rowTotal;
    },


  },
};
</script>
<style scoped>
.labelTittle {
  background-color: #FAFAFA;
  font-weight: bold;
  padding-right: 5px;
  height: 100%;
}

.labelValue {
  border-width: 0.1px;
  border-color: #FAFAFA;
  border-style: solid;
}
</style>
