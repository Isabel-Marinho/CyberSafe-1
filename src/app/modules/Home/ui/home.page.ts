import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';

import { DadosTrilha } from '../../trilhas/core/models/dados-trilha.interface';
import { SeletorDeTrilhasService } from '../../trilhas/core/seletor-trilha.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonTitle,
    IonToolbar,
  ],
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>CyberSafe</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <h2>Aprenda a se proteger online</h2>
      <p>Escolha uma trilha de vídeos ou informe sua idade para receber uma sugestão.</p>

      <ion-input
        type="number"
        inputmode="numeric"
        label="Sua idade"
        labelPlacement="floating"
        fill="outline"
        (ionInput)="aoDigitarIdade($event)"
      ></ion-input>

      @if (sugerida(); as trilha) {
        <ion-card class="ion-margin-top">
          <ion-card-header>
            <ion-card-subtitle>Trilha sugerida para você</ion-card-subtitle>
            <ion-card-title>{{ trilha.nome }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-button size="small" [routerLink]="['/trilha', trilha.id]">Abrir trilha</ion-button>
          </ion-card-content>
        </ion-card>
      }

      <ion-list class="ion-margin-top">
        @for (trilha of trilhas; track trilha.id) {
          <ion-item button detail [routerLink]="['/trilha', trilha.id]">
            <ion-label>
              <h3>{{ trilha.nome }}</h3>
              <p>{{ trilha.faixa }}</p>
            </ion-label>
          </ion-item>
        }
      </ion-list>
    </ion-content>
  `,
})
export class HomePage {

  private readonly seletorService = inject(SeletorDeTrilhasService);

  readonly sugerida = signal<DadosTrilha | null>(null);

  readonly trilhas: DadosTrilha[] = this.seletorService.listarTodas();

  aoDigitarIdade(evento: Event): void {
    const valor = (evento.target as HTMLIonInputElement).value;

    if (valor === '' || valor === null || valor === undefined) {
      this.sugerida.set(null);
      return;
    }

    const idadeNum = Number(valor);

    const resultado = this.seletorService.selecionarTrilha({ idade: idadeNum });

    this.sugerida.set(resultado);
  }
}
