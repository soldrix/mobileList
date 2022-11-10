<template>
  <ion-page>
    <ion-header :translucent = "true">
      <ion-toolbar>
        <ion-title class="ion-text-start ion-padding-start">Connexion</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div id="container">
        <ion-avatar class="avatar ion-padding-top">
          <img src="https://www.kindpng.com/picc/m/33-338711_circle-user-icon-blue-hd-png-download.png">
        </ion-avatar>

        <ion-item>
          <ion-icon :src = "person"></ion-icon>
          <ion-input type="text" placeholder="Email"></ion-input>
        </ion-item>

        <ion-item>
          <ion-icon :src = "lockClosed"></ion-icon>
          <ion-input type="password" placeholder="Mot de passe"></ion-input>
        </ion-item>

        <ion-button shape="round" expand="full">Connexion</ion-button>
        <ion-button shape="round" expand="full" color="medium" fill="outline" href="/register">Inscription</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import {person,lockClosed} from 'ionicons/icons';
export default  defineComponent({
  name: 'HomePage',
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage
  },setup(){
    return{
      person,
      lockClosed
    }
  }

});

</script>
<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
.avatar{
  margin: auto;
  height: 100px;
  width: 100px;
}
</style>