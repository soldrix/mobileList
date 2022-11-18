<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="ion-text-start ion-padding-start ion-padding-end">Mes listes <a @click="logOff" class="ion-float-end btnLogOff">Déconnexion</a></ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div id="container">
        <ion-accordion-group expand="inset" id="listContainer">

        </ion-accordion-group>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
/* eslint-disable */
import { defineComponent } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonCol,
  IonItem,
  IonButton,
  IonRow,
  IonLabel,
  IonInput,
  IonAccordionGroup,
  IonAccordion,
  IonCheckbox,
  actionSheetController,
  toastController
} from '@ionic/vue';
import axios from "axios";
export default  defineComponent({
  name: 'Tab1Page',
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonRow,
    IonGrid,
    IonCol,
    IonItem,
    IonButton,
    IonLabel,
    IonInput,
    IonAccordionGroup,
    IonAccordion,
    IonCheckbox,
    actionSheetController,
    toastController
  },
  setup(){
    let id_user =(window.location.search.split('?')[1] !== undefined) ? window.location.search.split('?')[1]  : null;
    if(id_user !== null && isNaN(atob(id_user)) === false){
      async function presentToast(msg) {//draw popup with message
        let toast = await toastController.create({
          message: msg,
          duration: 1500,
          position: 'middle'
        });
        await toast.present();
      }
      function deleteList(id){ //delete list with id
        axios.post('http://localhost:8000/delList',{'id': id,"id_user": id_user})
            .then((response)=>{
              if(response.data === false){
                window.location.href = '/login';
              }else{
                document.getElementById('containerList'+id).remove();
                presentToast('La liste été supprimé')
              }
            })
      }
      function deleteProduct(id){ //delete product with id
        axios.post('http://localhost:8000/delProduct',{'id': id,"id_user": id_user})
            .then((response)=>{
              if(response.data === false){
                window.location.href = '/login';
              }else{
                document.getElementById('product'+id).remove();
                presentToast('Le produit été supprimé')
              }
            })
      }

      async function presentActionSheet(id,name,type){ // popup verif suppresion cancel or supp
        let actionSheet = await actionSheetController.create({
          header: name,
          buttons: [
            {
              text: 'Delete',
              handler: () => {
                if(type === 'list'){
                  deleteList(id);
                }
                if(type === 'product'){
                  deleteProduct(id);
                }
              }
            },
            {
              text: 'Cancel',
              role: 'cancel',
              data: {
                action: 'cancel',
              },
            },
          ],
        });
        await actionSheet.present();
      }
      function addProduct(id) {//ajout product with list id
        let blockProduct = document.getElementById('list' + id);
        let inputList = (document.getElementById('input' + id).value !== '') ? document.getElementById('input' + id).value : 'produit';
        axios.post('http://localhost:8000/addProduct', {"id_user": id_user, "id_list": id, "name": inputList})
            .then((datas) => {
              if(datas.data === false){
                var goLogin =window.location.href = '/login';
              }
              blockProduct.insertAdjacentHTML('beforeend', `<ion-item id="product` + datas.data.id + `"  className="ion-margin-top">
              <ion-checkbox slot="start" checked="false" id="checkbox`+datas.data.id+`"></ion-checkbox>
                <ion-label>` + inputList + `</ion-label>
                <ion-button class="delProduct" id="delP`+datas.data.id+`">
                    <ion-img src="assets/img/trash.png" class="imgDelete"></ion-img>
                </ion-button>
              </ion-item>`);//darw product in list
              document.getElementById('checkbox'+datas.data.id).addEventListener('click',function () {
                updateProduct(datas.data.id)
              })
              document.getElementById('delP'+datas.data.id).addEventListener('click',function () {
                presentActionSheet(datas.data.id,'Supprimer le produit: '+datas.data.name,'product')
              })
            })
      }

      function updateProduct(id){//update product status with id
        let valCheckbox = (document.getElementById('checkbox'+id).checked === false) ? 'true' : 'false';
        axios.post('http://localhost:8000/updateProduct', {"id_user": id_user, "id": id, "status": valCheckbox})
            .then((response)=>{
              if(response.data === false){
                goLogin;
              }
            })
            .catch((e)=>{
              alert(e)
            })
      }

      axios.post('http://localhost:8000/getlist',{'id_user':id_user})//load all list
          .then((datas)=> {
            if(datas.data !== false && datas.data !== ''){
              if(datas.data !== null){
                let blocklist = document.querySelector('#listContainer');
                datas.data.forEach(response=>{
                  blocklist.insertAdjacentHTML('beforeend', `
                    <ion-accordion class="position-relative" id="containerList`+response.id+`">
                        <ion-item slot="header" color="light">
                          <ion-label>`+response.name+`</ion-label>
                        </ion-item>
                        <div class="produitlist" slot="content" id="list`+response.id+`">
                          <ion-col class="colDel">
                            <ion-img src="assets/img/trash.png" color="danger" class="imgDelete" id="delList`+response.id+`"></ion-img>
                          </ion-col>
                          <ion-grid class="ion-margin-bottom">
                            <ion-row class="ion-padding-start ion-padding-end">
                              <ion-col>
                                <ion-item>
                                  <ion-label position="floating">Nom du produit</ion-label>
                                  <ion-input type="text" v-model="txtname" placeholder="Nom" class="inputPrenom" id="input`+response.id+`"></ion-input>
                                </ion-item>
                              </ion-col>
                              <ion-col class="colBtn">
                                <ion-button shape="round" expand="full" class="ion-align-self-end" id="addProduct`+response.id+`">Ajouter</ion-button>
                              </ion-col>
                            </ion-row>
                          </ion-grid>
                        </div>
                      </ion-accordion>
                  `);//draw list
                  document.getElementById('delList'+response.id).addEventListener('click',function () {
                    presentActionSheet(response.id,'Supprimer la liste: '+response.name, 'list')
                  })
                  axios.post('http://localhost:8000/getProduct',{'id':response.id,'id_user':id_user})//get all product with list id
                      .then((datas)=>{
                        if(datas.data === false){
                          goLogin;
                        }
                        datas.data.forEach(item =>{
                          let checkVal = (item.status === 'true') ? 'checked' : 'false';
                          document.getElementById('list'+response.id).insertAdjacentHTML('beforeend',`
                            <ion-item id="product`+ item.id +`"  className="ion-margin-top">
                              <ion-checkbox slot="start" checked="`+checkVal+`" id="checkbox`+item.id+`"></ion-checkbox>
                              <ion-label>` + item.name + `</ion-label>
                              <ion-button class="delProduct" color="danger" id="delP`+item.id+`">
                                  <ion-img src="assets/img/trash.png" ></ion-img>
                              </ion-button>
                            </ion-item>
                          `);//draw product in list
                          document.getElementById('checkbox'+item.id).addEventListener('click',function () {
                            updateProduct(item.id)
                          })
                          document.getElementById('delP'+item.id).addEventListener('click',function () {
                            presentActionSheet(item.id,'Supprimer le produit: '+item.name, 'product')
                          })
                        })
                      }).catch((e)=>{
                        alert(e)
                  })
                  document.getElementById('addProduct'+response.id).addEventListener('click',function () {
                    addProduct(response.id)
                  })
                })
              }else{
                //draw error
                console.log('une erreur est survenu')
              }
            }else{
              goLogin;//return login
            }
          })
          .catch((e)=>{
            alert(e)
          })
    }else{
      goLogin;
    }
  },methods:{
    logOff(){
      let id_user = window.location.search.split('?')[1];
      axios.post('http://localhost:8000/logOff',{"id_user":id_user})
          .then(()=>{
        window.location.href = '/login';
      })
    }
  }

});

</script>
<style>
.colBtn{
  display: flex;
  width: fit-content;
  max-width: fit-content;
}
#container{
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 0 .75rem;
}
.position-relative{
  position: relative;
}
.colDel{
  width: 100%;
  display: flex;
  justify-content: end;
  padding-top: 1rem;
}
.imgDelete{
  height: 35px;
  width: 35px;
  border-radius: 100%;
  background: #ff4961;
  padding: 5px;
}
.delProduct ion-img{
  height: 100%;
}
.btnLogOff{
  color: white !important;
  text-decoration: none;
}
</style>