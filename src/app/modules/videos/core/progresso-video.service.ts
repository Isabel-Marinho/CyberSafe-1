import { Injectable, inject } from '@angular/core';
import { VideoService } from '../core/videos.service';

@Injectable({ providedIn: 'root' })
export class ProgressoService {
  private readonly chave = 'cybersafe:assistidos';
  private readonly videoService = inject(VideoService);

  marcarComoAssistido(videoId: string): void {
    const ids = this.ler();
    if (!ids.includes(videoId)) {
      ids.push(videoId);
      this.gravar(ids);
    }
  }

  foiAssistido(videoId: string): boolean {
    return this.ler().includes(videoId);
  }

  percentualDaTrilha(idTrilha: string): number {
    const videos = this.videoService.obterVideosPorTrilha(idTrilha);
    if (videos.length === 0) return 0;

    const assistidos = this.ler();
    const feitos = videos.filter(video => assistidos.includes(video.id)).length;

    return Math.round((feitos / videos.length) * 100);
  }

  limpar(): void {
    this.gravar([]);
  }

  private ler(): string[] {
    try {
      const bruto = localStorage.getItem(this.chave);
      const dados: unknown = bruto ? JSON.parse(bruto) : [];
      if (!Array.isArray(dados)) return [];
      return dados.filter((item): item is string => typeof item === 'string');
    } catch {
      return [];
    }
  }

  private gravar(ids: string[]): void {
    try {
      localStorage.setItem(this.chave, JSON.stringify(ids));
    } catch {
      // Falha silenciosa caso o armazenamento, não irá armazenar o progresso.
    }
  }
}
