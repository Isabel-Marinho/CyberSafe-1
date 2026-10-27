import { Injectable } from '@angular/core';
import { DadosVideo } from '../core/models/dados-video.interface';

import { VIDEOS } from '../core/models/video.data';

export const VIDEOS_BASE_PATH = 'assets/videos';

@Injectable({ providedIn: 'root' })
export class VideoService {

  obterVideosPorTrilha(idTrilha: string): DadosVideo[] {
    return VIDEOS.filter((video) => video.idTrilha === idTrilha);
  }

  buscarPorId(id: string): DadosVideo | undefined {
    return VIDEOS.find((video) => video.id === id);
  }

  urlDoVideo(video: DadosVideo): string {
    return `${VIDEOS_BASE_PATH}/${video.idTrilha}/${video.path}`;
  }
}
