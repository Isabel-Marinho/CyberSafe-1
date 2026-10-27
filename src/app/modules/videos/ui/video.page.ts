import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonBackButton, IonButton, IonButtons, IonChip, IonContent,
  IonHeader, IonLabel, IonTitle, IonToolbar,
} from '@ionic/angular';

import { VideoService } from '../core/videos.service';
import { ProgressoService } from '../core/progresso-video.service';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [
    CommonModule,
    IonBackButton, IonButton, IonButtons, IonChip, IonContent,
    IonHeader, IonLabel, IonTitle, IonToolbar,
  ],
  styles: [`
    video { width: 60%; border-radius: 12px; background: #000; }
    .video-container { display: flex; justify-content: center; margin-bottom: 16px; }
  `],
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button [defaultHref]="video ? '/trilha/' + video.idTrilha : '/home'"></ion-back-button>
        </ion-buttons>
        <ion-title>Vídeo</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      @if (video) {
        <div class="video-container">
          <video controls playsinline preload="metadata" [src]="videoUrl" (ended)="concluir()"></video>
        </div>

        <h2>{{ video.titulo }}</h2>
        <p>{{ video.descricao }}</p>

        @if (assistido()) {
          <ion-chip color="success"><ion-label>Assistido</ion-label></ion-chip>
        } @else {
          <ion-button fill="outline" (click)="concluir()">Marcar como assistido</ion-button>
        }
      } @else {
        <p>Vídeo não encontrado.</p>
      }
    </ion-content>
  `,
})
export class VideoPage {
  private readonly rota = inject(ActivatedRoute);
  private readonly videoService = inject(VideoService);
  private readonly progressoService = inject(ProgressoService);

  readonly video = this.videoService.buscarPorId(this.rota.snapshot.paramMap.get('id') ?? '');

  readonly videoUrl = this.video ? this.videoService.urlDoVideo(this.video) : '';

  readonly assistido = signal(this.video ? this.progressoService.foiAssistido(this.video.id) : false);

  concluir(): void {
    if (this.video) {
      this.progressoService.marcarComoAssistido(this.video.id);
      this.assistido.set(true);
    }
  }
}
