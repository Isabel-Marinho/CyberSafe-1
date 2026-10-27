import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  IonBackButton, IonBadge, IonButtons, IonContent, IonHeader,
  IonItem, IonLabel, IonList, IonProgressBar, IonTitle, IonToolbar,
} from '@ionic/angular';

import { SeletorDeTrilhasService } from '../core/seletor-trilha.service';
import { VideoService } from '../../videos/core/videos.service';
import { ProgressoService } from '../../videos/core/progresso-video.service';

@Component({
  selector: 'app-trilha',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    IonBackButton, IonBadge, IonButtons, IonContent, IonHeader,
    IonItem, IonLabel, IonList, IonProgressBar, IonTitle, IonToolbar,
  ],
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/home"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ trilha ? trilha.nome : 'Trilha' }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      @if (trilha) {
        <p>{{ trilha.descricao }}</p>

        <p>Progresso: {{ percentual() }}%</p>
        <ion-progress-bar [value]="percentual() / 100"></ion-progress-bar>

        <ion-list>
          @for (video of videos; track video.id) {
            <ion-item button detail [routerLink]="['/video', video.id]">
              <ion-label>
                <h3>{{ video.titulo }}</h3>
                <p>{{ video.descricao }}</p>
              </ion-label>
              @if (assistidos().includes(video.id)) {
                <ion-badge color="success" slot="end">Assistido</ion-badge>
              }
            </ion-item>
          }
        </ion-list>
      } @else {
        <p>Trilha não encontrada.</p>
      }
    </ion-content>
  `,
})
export class TrilhaPage {
  private readonly rota = inject(ActivatedRoute);
  private readonly seletorService = inject(SeletorDeTrilhasService);
  private readonly videoService = inject(VideoService);
  private readonly progressoService = inject(ProgressoService);

  // Requer que você crie o método buscarPorId() no SeletorDeTrilhasService
  readonly trilha = this.seletorService.buscarPorId(this.rota.snapshot.paramMap.get('id') ?? '');
  readonly videos = this.trilha ? this.videoService.obterVideosPorTrilha(this.trilha.id) : [];

  readonly percentual = signal(0);
  readonly assistidos = signal<string[]>([]);

  ionViewWillEnter(): void {
    this.atualizarProgresso();
  }

  private atualizarProgresso(): void {
    if (!this.trilha) return;

    this.percentual.set(this.progressoService.percentualDaTrilha(this.trilha.id));
    this.assistidos.set(
      this.videos.filter(video => this.progressoService.foiAssistido(video.id)).map(video => video.id)
    );
  }
}
