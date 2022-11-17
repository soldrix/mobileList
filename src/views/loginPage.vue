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
          <ion-img src="https://www.kindpng.com/picc/m/33-338711_circle-user-icon-blue-hd-png-download.png" alt="User icon"></ion-img>
        </ion-avatar>

        <ion-item>
          <ion-icon :src = "person"></ion-icon>
          <ion-input type="text" placeholder="Email" v-model="txtEmail" class="inputEmail"></ion-input>
        </ion-item>

        <ion-item>
          <ion-icon :src = "lockClosed"></ion-icon>
          <ion-input type="password" placeholder="Mot de passe" v-model="txtPassword" class="inputPassword"></ion-input>
        </ion-item>

        <ion-button shape="round" expand="full" @click="loginUser">Connexion</ion-button>
        <ion-button shape="round" expand="full" color="medium" fill="outline" href="/register">Inscription</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent,IonIcon,IonInput,IonButton,IonItem,IonAvatar,IonImg } from '@ionic/vue';
import {person,lockClosed} from 'ionicons/icons';
import axios from "axios";
export default  defineComponent({
  name: 'HomePage',
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonIcon,
    IonInput,
    IonButton,
    IonItem,
    IonAvatar,
    IonImg
  },data(){
    return{
      txtEmail:"",
      txtPassword:"",
      person,
      lockClosed
    }
  },methods:{
    loginUser(){
      /* eslint-disable */
      function drawError() {
        if(!valEmail.match(regexMail) || valEmail === ''){
          if(email.classList.contains('active') !== true){
            email.classList = email.classList+' active';
            email.insertAdjacentHTML('afterend',`
            <p class="textRed">Entrer une addresse mail valide.</p>
          `)
          }
        }
        if(!valPassword.match(regexPassword) || valPassword === ''){
          if(password.classList.contains('active') !== true){
            password.classList = password.classList+' active';
            password.insertAdjacentHTML('afterend',`
              <p class="textRed">Entrer un mot de passe valide qui doit contenir: <br/> au moins 8 caractères, une majuscule, <br/> une minuscule, un chiffre et un caractère spéciale.</p>
            `)
          }
        }
      }
      let email =document.querySelector('.inputEmail').parentElement;
      let password =document.querySelector('.inputPassword').parentElement;
      let valPassword = this.txtPassword;
      let valEmail = this.txtEmail;

      const regexMail = new RegExp('(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])', 'g');
      const regexPassword = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$','g');

      if (valEmail !== '' && valEmail.match(regexMail) && valPassword !== '' && valPassword.match(regexPassword)){
        axios.post('http://localhost:8000/login',{"email":this.txtEmail,"password":this.txtPassword})
            .then((response) => {
              if(response.data !== false){
                let inputval =  document.querySelectorAll('input');
                for (let i = 0; i < inputval.length; i++) {
                  inputval[i].value = "";
                  inputval[i].parentElement.classList.remove('active');
                }
                window.location.href = '/home?'+response.data;
              }else {
                drawError();
              }

            }).catch( (e) =>{
              alert(e);
            })
      }else{
        drawError();
      }
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
.active{
  border-bottom:2px solid red;
  color: red;
}

</style>