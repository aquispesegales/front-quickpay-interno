<template>
    <div>
        
    </div>
</template>
<script>
import Sidebar from "@/service/Home/Sidebar.service";
export default {
    data(){
        return {
            datos : {}
        }
    },
    mounted(){
        Sidebar.getDatosLogin().then((response) => {
          this.datos = response.data.data;
          if(this.datos.modulo=='ADMINISTRADOR'){
            this.$router.push('/Dashboard')
          }
          if(this.datos.modulo=='EMPRESA'){
            this.$router.push('/UploadFile')
          }
          if(this.datos.modulo=='SOCIO'){
            this.$router.push('/SearchEntidadesDebts')
          }

        })
        .catch((error) => {
          this.datos = {};
        });
    }
}
</script>