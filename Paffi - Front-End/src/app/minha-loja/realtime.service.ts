import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RealtimeService {

  constructor(
    private fire: AngularFirestore,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  public realtime: any;
  public subscription: Subscription;
  public iniciado = false;

  iniciaRealTime(idloja) {
    console.log('iniciando real-time');
    if (!this.iniciado || !idloja) {
      this.iniciado = true;
      let pedidos = 0;
      this.realtime = this.fire.collection('Lojas').doc(idloja.toString()).snapshotChanges();
      this.subscription = this.realtime.subscribe(dado => {
        if (pedidos !== 0) {
          this.confirmationService.confirm({
            header: 'Novo pedido.',
            message: 'Um novo pedido chegou! Deseja conferir?',
            accept: () => {

            }
          });
        }
        pedidos++;
      });
    }

  }
}
