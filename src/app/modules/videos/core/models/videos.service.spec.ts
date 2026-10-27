import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { TRILHAS } from '../../../trilhas/core/models/trilhas.data';
import { VIDEOS } from '../models/video.data';
import { DadosVideo } from '../models/dados-video.interface';
import { VideoService, VIDEOS_BASE_PATH } from '../videos.service';

describe('VideoService', () => {
  let service: VideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VideoService]
    });
    service = TestBed.inject(VideoService);
  });

  describe('Validação do Catálogo Estático (Banco de Dados)', () => {

    it('cada trilha tem exatamente 3 vídeos na versão beta', () => {
      for (const trilha of TRILHAS) {
        const videosDaTrilha = VIDEOS.filter((v) => v.idTrilha === trilha.id);
        expect(videosDaTrilha).toHaveLength(3);
      }
    });

    it('os ids dos vídeos são únicos', () => {
      const ids = VIDEOS.map((video) => video.id);
      const idsUnicos = new Set(ids);
      expect(idsUnicos.size).toBe(ids.length);
    });

    it('todo vídeo pertence a uma trilha que existe', () => {
      const idsDasTrilhas = TRILHAS.map((trilha) => trilha.id);

      VIDEOS.forEach((video) => {
        expect(idsDasTrilhas).toContain(video.idTrilha);
      });
    });

    it('todo vídeo aponta para um arquivo .mp4', () => {
      VIDEOS.forEach((video) => {
        expect(video.path).toMatch(/\.mp4$/);
      });
    });
  });

  describe('Lógica de Busca e Transformação', () => {

    it('obterVideosPorTrilha devolve só vídeos da trilha pedida', () => {
      const videos = service.obterVideosPorTrilha('seguranca-dados');

      expect(videos.length).toBeGreaterThan(0);
      videos.forEach((video) => {
        expect(video.idTrilha).toBe('seguranca-dados');
      });
    });

    it('busca um vídeo pelo id', () => {
      const video = service.buscarPorId('gf-02');

      expect(video).toBeDefined();
      expect(video?.titulo).toBe('Golpes com Pix');
    });

    it('retorna undefined ao buscar um id inexistente', () => {
      const video = service.buscarPorId('id-inexistente-123');
      expect(video).toBeUndefined();
    });

    it('monta a URL do vídeo com a pasta da trilha', () => {
      const videoMock = {
        id: 'teste-01',
        titulo: 'Vídeo Teste',
        idTrilha: 'jogos-digitais',
        path: 'video-1.mp4'
      } as Partial<DadosVideo> as DadosVideo;

      const url = service.urlDoVideo(videoMock);

      expect(url).toBe(`${VIDEOS_BASE_PATH}/jogos-digitais/video-1.mp4`);
    });
  });
});
