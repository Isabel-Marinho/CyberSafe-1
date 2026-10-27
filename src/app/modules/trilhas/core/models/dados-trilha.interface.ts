export interface DadosEntradaTrilha {
  idade?: number
  op?: number
}

export type TrilhaId = 'jogos-digitais' | 'seguranca-dados' | 'golpes-financeiros';

export interface DadosTrilha {
  id: TrilhaId;
  nome: string;
  faixa: string;
  descricao: string;
}

