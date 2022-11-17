<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="ion-text-start ion-padding-start">Ajouter une liste</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
          <ion-grid>
            <ion-col>
              <ion-item>
                <ion-label position="floating">Nom de la liste</ion-label>
                <ion-input v-model="txtname" placeholder="Nom de la liste" type="text"></ion-input>
              </ion-item>
              <ion-button @click="addlist" expand="full" fill="outline" shape="round" class="ion-margin-top">Ajouter une liste</ion-button>
            </ion-col>
          </ion-grid>

    </ion-content>
  </ion-page>
</template>

<script>
/* eslint-disable */
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent,IonButton,IonGrid,IonLabel,IonItem,IonCol,IonInput,toastController  } from '@ionic/vue';
import axios from "axios";
export default defineComponent({
  name: 'Tab2Page',
  components: {  IonHeader, IonToolbar, IonTitle, IonContent,IonButton, IonPage,IonGrid,IonLabel,IonItem,IonCol,IonInput},
 setup(){
   return{
     txtname:""
   }
 },methods:{
        async presentToast(name) {
          const toast = await toastController.create({
            message: 'La liste '+name+' a été ajouté.',
            duration: 1500,
            position: 'middle'
          });

          await toast.present();
        },
        addlist(){
          let namelist = (this.txtname !== '') ? this.txtname : 'Liste' ;
          let id_user = window.location.search.split('?')[1];
          axios.post('http://localhost:8000/addList',{"name":namelist,"id_user":id_user})
              .then((datas)=>{
                if(datas.data !== false && datas.data !== null){
                  this.presentToast(datas.data.name);
                }else if (datas.data !== null){
                  alert('valeur vide');
                }else{
                  window.location.href='/login';
                }

              })
              .catch((e)=>{
                alert(e)
              })
          document.querySelector('input').value ='';
          this.txtname = '';
        }
      }
}
);
</script>
