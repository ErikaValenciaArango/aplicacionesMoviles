import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { AuthService } from '../services/auth.service';
import { AvatarService } from '../services/avatar.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  notes = [];

  constructor( private avatarService: AvatarService, private authService: AuthService, private router: Router, private loadingController: LoadingController, private alertController: AlertController, private dataService: DataService, private alerCtrl: AlertController, private modaCtrl: ModalController) {
    this.dataService.getNotes().subscribe( res=> {
      console.log(res);
      this.notes = res;
    });
  }

  async openNote(note){
    const modal = await this.modaCtrl.create({
      component: ModalPage,
      componentProps: { id: note.id},
      breakpoints: [0, 0.7, 0.9],
      initialBreakpoint: 0.7
    });
    modal.present();   
  }

  async addNote(note){
    const alert = await this.alerCtrl.create({
      header: 'Agregar referencia bibliográfica',
      inputs: [
        {
          name: 'idreferencia',
          placeholder: 'Id referencia bibliográfica',
          type: 'number'
        },
        {
          name: 'titulopub',
          placeholder: 'Título de la publicación',
          type: 'text'  
        },
        {
          name: 'autores',
          placeholder: 'Autores',
          type: 'text'
        },
        {
          name: 'tipopub',
          placeholder: 'Tipo de publicación',
          type: 'number'
        },
        {
          name: 'eventorevista',
          placeholder: 'Evento o revista donde se publico',
          type: 'text'
        },
        {
          name: 'doi',
          placeholder: 'Código identificador de documento',
          type: 'text'
        },
        {
          name: 'anyopub',
          placeholder: 'Año de la publicación',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Agregar',
          handler: (res) => {
            this.dataService.addNote({idreferencia: res.idreferencia, 
              titulopub: res.titulopub, autores: res.autores, eventorevista: res.eventorevista, 
              doi: res.doi, anyopub: res.anyopub, tipopub: res.tipopub});
          }
        }
      ]
    });
    await alert.present();
  }

  async logout(){
    this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

}
