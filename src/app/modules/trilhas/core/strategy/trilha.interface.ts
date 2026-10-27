import { DadosEntradaTrilha, DadosTrilha, TrilhaId } from "../models/dados-trilha.interface";

export interface EstrategiaTrilha {
  idTrilha: TrilhaId;
  detalhes: DadosTrilha;
  verificarValidade(dados: DadosEntradaTrilha): boolean;
}
