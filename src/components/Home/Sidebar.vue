<template>

  <a-layout-sider v-model="collapsed" collapsible style="width: 256px" theme="dark">
    <!-- solo para qas-->
    <!--<img src="@/assets/images/no_valid.jpg" alt="no valido" width="200" height="50">-->
    <!-- =============== -->
    <br />
    <a-row type="flex" justify="space-around" align="middle">
      <a-col>
        <br />
        <br />
        <br />
        <!--logo_quickpay-->
        <div @click="navegar('index')">
          <img src="../../../public/logo_quickpay.jpg" v-if="!collapsed" style="padding-bottom: 5px" width="180"
            height="100" />
        </div>
        <!--<hr />-->
        <div style="height: 100px" v-if="collapsed"></div>
      </a-col>
    </a-row>
    <br />

    <div v-if="!collapsed && datos.nombreEntidad != 'ADMINISTRADOR'" class="entiades">
      {{ datos.nombreEntidad }}
    </div>
    <a-divider v-if="!collapsed" style="color: #fff; font-size: 10px;">
      {{ datos.modulo }}
    </a-divider>

    <a-menu theme="dark" breakpoint="xl" :default-selected-keys="['0']" mode="inline" collapsedWidth="150">
      <!--<a-menu-item >
        <a-icon type='home' @click="navegar('index')" />
        <span @click="navegar('index')">
          Inicio
        </span>
      </a-menu-item>-->
      <a-menu-item v-for="menu in menuList" :key="menu.privilegiosId">
        <a-icon :type="menu.icono" @click="navegar(menu.link)" />
        <span @click="navegar(menu.link)">
          {{ menu.descripcion }}
        </span>
      </a-menu-item>
      <a-sub-menu v-for="men in subMenuList" :key="men.privilegiosId">
        <span slot="title"><a-icon :type="men.icono" /><span> {{ men.descripcion }}</span></span>
        <a-menu-item v-for="subMenu in men.segPrivilegioEntityList" :key="subMenu.privilegiosId">
          <span @click="navegar(subMenu.link)">
            {{ subMenu.descripcion }}
          </span>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import Sidebar from "@/service/Home/Sidebar.service";
export default {
  data() {
    return {
      collapsed: true,
      menuList: [],
      subMenuList: [],
      datos: {
        nombreUsuario: null,
        correo: null,
        nombreEntidad: null,
        path: null,
      },
    };
  },
  created() {
    this.getMenu();
    this.getSubMenu();
    this.getDatosLogin();
  },
  methods: {
    getDatosLogin() {
      Sidebar.getDatosLogin()
        .then((response) => {
          this.datos = response.data.data;
        })
        .catch((error) => {
          //console.log("Error");
          this.datos = [];
        });
    },
    getMenu() {
      Sidebar.getMenu()
        .then((response) => {
          this.menuList = response.data.data;
        })
        .catch((error) => {
          this.menuList = [];
        });
    },
    getSubMenu() {
      Sidebar.getSubMenu()
        .then((response) => {
          this.subMenuList = response.data.data;
        })
        .catch((error) => {
          this.subMenuList;
        });
    },
    navegar(link) {
      this.$router.replace({
        name: link,
      });
    },
  },
};
</script>
<style scoped>
.entiades {
  color: #f5962a;
  width: 190px;
  text-align: center;
  border: 1px dotted #000;
  padding: 8px;
  border-style: double;
  border-color: #f5962a;
}

#components-layout-demo-responsive .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
