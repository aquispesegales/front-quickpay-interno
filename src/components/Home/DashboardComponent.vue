<template>
  <div>

    <a-row :gutter="[16,16]">
      <a-col :span="8">
        <a-card>
          <a-statistic title="Monto Recaudado en el día (actual)..." v-model="objDashboard.montoRecaudadoDia"  :precision="2" suffix="BOB"
            :value-style="{ color: '#15c923' }" style="margin-right: 50px">
            <!--<template #prefix>
              <a-icon type="dollar" />
            </template>-->
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card>
          <a-statistic title="Cantidad de Transacciones en el día (actual)" v-model="objDashboard.cantidadTransaccionDia" :precision="2" suffix=""
            class="demo-class" :value-style="{ color: '#3494ee' }">
                  <!--<template #prefix>
              <a-icon type="dollar" />
            </template>-->
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card>
          <a-statistic title="Monto recaudado en el mes (actual)" v-model="objDashboard.montoRecaudadoMes" :precision="2" suffix="BOB" class="demo-class"
            :value-style="{ color: '#15c923' }">
                 <!--<template #prefix>
              <a-icon type="dollar" />
            </template>-->
          </a-statistic>
        </a-card>
      </a-col>
     
    </a-row>
    <a-row :gutter="[16,16]">
      <a-col :span="8">
        <a-card>
          <a-statistic title="Cantidad de Transacciones en el mes (actual)" v-model="objDashboard.cantidadTransaccionMes" :precision="2" suffix=""
            class="demo-class" :value-style="{ color: '#3494ee' }">
                  <!--<template #prefix>
              <a-icon type="dollar" />
            </template>-->
          </a-statistic>
        </a-card>
      </a-col>
    </a-row>
    <br>
    <!-- <a-row :gutter="16">
      <a-col :span="6">
        <a-card>
          <a-statistic title="Monto recaudado por plataforma (cajero, web y móvil) " v-model="objDashboard.montoRecaudadoPlataforma" :precision="2"
            suffix="BOB" class="demo-class" :value-style="{ color: '#15c923' }">
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <a-statistic title="Cantidad de transacciones por plataforma (cajero, web y móvil)" v-model="objDashboard.cantidadTransaccionPlataforma" :precision="2"
            suffix="" class="demo-class" :value-style="{ color: '#3494ee' }">
          </a-statistic>
        </a-card>
      </a-col>
    </a-row> -->
  </div>
</template>
<script>
import DashboardService from "../../service/Administraciones/Dashboard.service";
import { obtenerPayload } from '../../lib/composable/token';
export default {
  data() {
    return {
      objDashboard:{},
      objPayload:{}
    }
  },
  mounted() {
    this.obtenerDashboardTodos();
  },
  methods: {
    async obtenerDashboardTodos(){
      this.objPayload = obtenerPayload();
      let r = await DashboardService.findDashboardTodos();
      this.objDashboard = r.data.result;
    }
  }
}
</script>
