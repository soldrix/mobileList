<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>
      <div id="container">
        <ion-item>
          <ion-input type="text" placeholder="Prenom"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input type="text" placeholder="Nom"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input type="text" placeholder="Mot de passe"></ion-input>
        </ion-item>
        <ion-button>Connexion</ion-button>
      </div>
      <ExploreContainer name="Tab 1 page" />
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';

export default  defineComponent({
  name: 'Tab1Page',
  components: { ExploreContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage }

});

</script>
