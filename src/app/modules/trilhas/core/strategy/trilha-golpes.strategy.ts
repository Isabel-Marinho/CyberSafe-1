import { Injectable } from "@angular/core";
import { DadosEntradaTrilha, DadosTrilha, TrilhaId } from "../models/dados-trilha.interface";
import { EstrategiaTrilha } from "./trilha.interface";

@Injectable({providedIn: 'root'})
export class TrilhaGolpes implements EstrategiaTrilha {
  idTrilha: TrilhaId = "golpes-financeiros";

  detalhes: DadosTrilha = {
    id: this.idTrilha,
    nome: "Segurança Financeira",
    faixa: "Maiores de 50 anos",
    descricao: "Aprenda a se proteger de golpes na Internet"
  };

  verificarValidade(dados: DadosEntradaTrilha): boolean {
    if(dados.op === 3){
      return true;
    }

    return dados.idade !== undefined && dados.idade > 50;
  }
}
