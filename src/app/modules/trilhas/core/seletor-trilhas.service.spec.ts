import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { SeletorDeTrilhasService } from './seletor-trilha.service';
import { TrilhaJogos } from './strategy/trilha-jogos.strategy';
import { TrilhaSeguranca } from './strategy/trilha-seguranca.strategy';
import { TrilhaGolpes } from './strategy/trilha-golpes.strategy';
import { DadosTrilha } from './models/dados-trilha.interface';

describe('SeletorDeTrilhasService', () => {
  let service: SeletorDeTrilhasService;

  // Dummies/Mocks das estratégias para isolar o serviço
  const mockTrilhaJogos = {
    detalhes: { id: 'jogos-digitais', nome: 'Jogos' } as DadosTrilha,
    verificarValidade: vi.fn(),
  };

  const mockTrilhaSeguranca = {
    detalhes: { id: 'seguranca-dados', nome: 'Segurança' } as DadosTrilha,
    verificarValidade: vi.fn(),
  };

  const mockTrilhaGolpes = {
    detalhes: { id: 'golpes-financeiros', nome: 'Golpes' } as DadosTrilha,
    verificarValidade: vi.fn(),
  };

  beforeEach(() => {
    vi.resetAllMocks();

    TestBed.configureTestingModule({
      providers: [
        SeletorDeTrilhasService,
        { provide: TrilhaJogos, useValue: mockTrilhaJogos },
        { provide: TrilhaSeguranca, useValue: mockTrilhaSeguranca },
        { provide: TrilhaGolpes, useValue: mockTrilhaGolpes },
      ],
    });

    service = TestBed.inject(SeletorDeTrilhasService);
  });

  describe('Cláusulas de Guarda / Validação de Entrada', () => {
    it('retorna null se idade e op forem undefined', () => {
      const resultado = service.selecionarTrilha({});
      expect(resultado).toBeNull();
    });

    it('retorna null se a idade for negativa', () => {
      const resultado = service.selecionarTrilha({ idade: -5 });
      expect(resultado).toBeNull();

      expect(mockTrilhaJogos.verificarValidade).not.toHaveBeenCalled();
    });

    it('retorna null se a idade for um número decimal (não inteiro)', () => {
      const resultado = service.selecionarTrilha({ idade: 12.5 });
      expect(resultado).toBeNull();
    });
  });

  describe('Seleção da Estratégia (Strategy Pattern)', () => {
    it('retorna os detalhes da estratégia que validar a entrada', () => {
      mockTrilhaJogos.verificarValidade.mockReturnValue(false);
      mockTrilhaSeguranca.verificarValidade.mockReturnValue(true);
      mockTrilhaGolpes.verificarValidade.mockReturnValue(false);

      const resultado = service.selecionarTrilha({ idade: 25 });

      expect(resultado).toEqual(mockTrilhaSeguranca.detalhes);
      expect(mockTrilhaJogos.verificarValidade).toHaveBeenCalledWith({ idade: 25 });
      expect(mockTrilhaSeguranca.verificarValidade).toHaveBeenCalledWith({ idade: 25 });
    });

    it('retorna null se nenhuma estratégia for válida para a entrada', () => {
      mockTrilhaJogos.verificarValidade.mockReturnValue(false);
      mockTrilhaSeguranca.verificarValidade.mockReturnValue(false);
      mockTrilhaGolpes.verificarValidade.mockReturnValue(false);


      const resultado = service.selecionarTrilha({ idade: 99 });
      expect(resultado).toBeNull();
    });
  });

  describe('Métodos de Consulta', () => {
    it('listarTodas deve retornar os detalhes de todas as estratégias registradas', () => {
      const todas = service.listarTodas();

      expect(todas).toHaveLength(3);
      expect(todas).toEqual([
        mockTrilhaJogos.detalhes,
        mockTrilhaSeguranca.detalhes,
        mockTrilhaGolpes.detalhes,
      ]);
    });

    it('buscarPorId deve retornar a trilha correspondente se o ID existir', () => {
      const trilha = service.buscarPorId('seguranca-dados');
      expect(trilha).toEqual(mockTrilhaSeguranca.detalhes);
    });

    it('buscarPorId deve retornar undefined se o ID não existir', () => {
      const trilha = service.buscarPorId('id-inexistente');
      expect(trilha).toBeUndefined();
    });
  });
});
