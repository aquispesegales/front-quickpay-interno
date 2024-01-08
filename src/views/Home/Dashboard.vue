<template>
  <div>


  <div class="contenedor">
    <div class="hijo">
      <picture>
       <!--<img src="../../../public/exacta.png"   />-->
      </picture>
    </div>

  </div>
<br>
  <DashboardComponent></DashboardComponent>
  </div>
</template>
<script>
import DashboardComponent from "@/components/Home/DashboardComponent.vue";
export default {
  components: {
    DashboardComponent
  },
};
</script>

<style>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.contenedor{
  background:#ffffff;
}

.hijo {


	line-height:400px;
	margin:0px auto;
	text-align:center;

}
</style>
