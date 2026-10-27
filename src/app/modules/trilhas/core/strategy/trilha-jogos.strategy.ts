import { Injectable } from "@angular/core";
import { DadosEntradaTrilha, DadosTrilha, TrilhaId } from "../models/dados-trilha.interface";
import { EstrategiaTrilha } from "./trilha.interface";

@Injectable({providedIn: 'root'})
export class TrilhaJogos implements EstrategiaTrilha {
    idTrilha: TrilhaId = "jogos-digitais";

    detalhes: DadosTrilha = {
      id: this.idTrilha,
      nome: "Segurança em Jogos Digitais",
      faixa: "Até 17 anos",
      descricao: "Aprenda a se proteger no mundo dos jogos"
    };

  verificarValidade(dados: DadosEntradaTrilha): boolean {
    if(dados.op === 1){
      return true;
    }

    return dados.idade !== undefined && dados.idade <= 17;
  }
}
