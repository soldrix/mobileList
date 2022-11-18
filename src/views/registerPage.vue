<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="ion-text-start ion-padding-start">Inscription</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div id="container">
        <ion-avatar class="avatar ion-padding-top">
          <ion-img src="https://www.kindpng.com/picc/m/33-338711_circle-user-icon-blue-hd-png-download.png"></ion-img>
        </ion-avatar>
        <ion-item>
          <ion-label position="floating">Prenom</ion-label>
          <ion-input type="text" v-model="txtPrenom" placeholder="Prenom" class="inputPrenom"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Nom</ion-label>
          <ion-input type="text" v-model="txtNom" placeholder="Nom" class="inputNom"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Email</ion-label>
          <ion-input type="email" v-model="txtEmail" placeholder="Email" class="inputEmail"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Mot de passe</ion-label>
          <ion-input type="password" v-model="txtPassword" placeholder="Mot de passe" class="inputPassword"></ion-input>
        </ion-item>
        <ion-button shape="round" expand="full" class="btnInscription ion-margin-bottom" @click="saveUser">S'inscrire</ion-button>
        <ion-button shape="round" expand="full" color="medium" fill="outline" href="/login">Connexion</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent,IonLabel,IonItem,IonInput,IonButton,IonAvatar,IonImg } from '@ionic/vue';
import axios from "axios";
export default  defineComponent({
  name: 'Tab1Page',
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonLabel,
    IonItem,
    IonInput,
    IonButton,
    IonAvatar,
    IonImg
  },data(){
    return{
      txtPrenom:"",
      txtNom:"",
      txtEmail:"",
      txtPassword:""
    }
  },methods:{
    saveUser(){
      /* eslint-disable */
      let nom =document.querySelector('.inputNom').parentElement;
      let prenom =document.querySelector('.inputPrenom').parentElement;
      let email =document.querySelector('.inputEmail').parentElement;
      let password =document.querySelector('.inputPassword').parentElement;
      let valNom = this.txtNom;
      let valPrenom = this.txtPrenom;
      let valPassword = this.txtPassword;
      let valEmail = this.txtEmail;

      const regexMail = new RegExp('(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])', 'g')
      const regexPassword = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$','g')

      if (valPrenom !== '' && valNom !== '' && valEmail !== '' && valEmail.match(regexMail) && valPassword !== '' && valPassword.match(regexPassword)){
        axios.post('http://localhost:8000/verifEmail',{"email":this.txtEmail})
            .then((response) => {
              if(response.data === false){
                axios.post('http://localhost:8000/register',{"prenom":valPrenom,"nom":valNom,"email":valEmail,"password":valPassword})
                    .then(() => {
                        let inputval =  document.querySelectorAll('input');
                        for (let i = 0; i < inputval.length; i++) {
                          inputval[i].value = "";
                          inputval[i].parentElement.classList.remove('active');
                        }
                        window.location.href = '/login';

                    })
                    .catch( (error) => {
                      alert(error);
                    });
              }else {
                if(email.classList.contains('active') !== true) {//draw error email
                  email.classList = email.classList + ' active';
                  email.insertAdjacentHTML('afterend', `
                    <p class="textRed">L'adresse mail existe déjà ou est incorrect.</p>
                  `)
                }
              }

            }).catch( (e) =>{
              alert(e)
        })
      }
      else{//draw error
        if(valNom === ''){
          if (nom.classList.contains('active') !== true){
            nom.classList = nom.classList+' active';
            nom.insertAdjacentHTML('afterend',`
            <p class="textRed">Entrer un nom valide.</p>
          `)
          }
        }
        if(valPrenom === ''){
          if (prenom.classList.contains('active') !== true){
            prenom.classList = prenom.classList+' active';
            prenom.insertAdjacentHTML('afterend',`
            <p class="textRed">Entrer un prenom valide.</p>
          `)
          }
        }
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
.btnInscription{
  margin-top: 3rem;
}
.active{
  border-bottom:2px solid red;
  color: red;
}

</style>