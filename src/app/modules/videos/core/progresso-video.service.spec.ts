import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, afterEach, vi, Mocked } from 'vitest';
import { ProgressoService } from './progresso-video.service';
import { VideoService } from './videos.service';

describe('ProgressoService', () => {
  let progresso: ProgressoService;
  let videosMock: Mocked<VideoService>;

  beforeEach(() => {
    videosMock = {
      obterVideosPorTrilha: vi.fn()
    } as unknown as Mocked<VideoService>;

    TestBed.configureTestingModule({
      providers: [
        ProgressoService,
        { provide: VideoService, useValue: videosMock }
      ]
    });

    localStorage.clear();
    progresso = TestBed.inject(ProgressoService);
  });

  afterEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('começa com 0% em todas as trilhas', () => {
    videosMock.obterVideosPorTrilha.mockReturnValue([]);

    const percentual = progresso.percentualDaTrilha('qualquer-trilha');

    expect(percentual).toBe(0);
  });

  it('marca um vídeo como assistido', () => {
    const idMock = 'video-1';

    progresso.marcarComoAssistido(idMock);

    expect(progresso.foiAssistido(idMock)).toBe(true);
  });

  it('1 de 3 vídeos assistidos dá 33%', () => {
    videosMock.obterVideosPorTrilha.mockReturnValue([
      { id: 'v1' }, { id: 'v2' }, { id: 'v3' }
    ] as any);

    progresso.marcarComoAssistido('v1');

    expect(progresso.percentualDaTrilha('trilha-teste')).toBe(33);
  });

  it('todos os vídeos assistidos dá 100%', () => {
    const trilhaMock = 'seguranca-dados';
    videosMock.obterVideosPorTrilha.mockReturnValue([{ id: 'v1' }, { id: 'v2' }] as any);

    progresso.marcarComoAssistido('v1');
    progresso.marcarComoAssistido('v2');

    expect(progresso.percentualDaTrilha(trilhaMock)).toBe(100);
  });

  it('marcar o mesmo vídeo duas vezes não conta em dobro', () => {
    videosMock.obterVideosPorTrilha.mockReturnValue([{ id: 'v1' }, { id: 'v2' }, { id: 'v3' }] as any);

    progresso.marcarComoAssistido('v1');
    progresso.marcarComoAssistido('v1');

    expect(progresso.percentualDaTrilha('trilha-teste')).toBe(33);
  });

  it('o progresso de uma trilha não afeta as outras', () => {
    videosMock.obterVideosPorTrilha.mockImplementation((trilha: string) => {
      if (trilha === 'trilha-a') return [{ id: 'v1' }] as any;
      if (trilha === 'trilha-b') return [{ id: 'v2' }] as any;
      return [];
    });

    progresso.marcarComoAssistido('v1');

    expect(progresso.percentualDaTrilha('trilha-b')).toBe(0);
  });

  it('limpar zera o progresso', () => {
    const idMock = 'v1';
    progresso.marcarComoAssistido(idMock);

    progresso.limpar();

    expect(progresso.foiAssistido(idMock)).toBe(false);
  });
});
