import { Injectable } from "@angular/core";
import { DadosEntradaTrilha, DadosTrilha, TrilhaId } from "../models/dados-trilha.interface";
import { EstrategiaTrilha } from "./trilha.interface";

@Injectable({providedIn: 'root'})
export class TrilhaSeguranca implements EstrategiaTrilha {

  idTrilha: TrilhaId = "seguranca-dados"

  detalhes: DadosTrilha = {
    id: this.idTrilha,
    nome: "Segurança na Internet",
    faixa: "Entre 18 e 50 anos",
    descricao: "Aprenda a se proteger no mundo dos digital"
  };

  verificarValidade(dados: DadosEntradaTrilha): boolean {
    if(dados.op === 2){
      return true;
    }

    return dados.idade !== undefined && dados.idade >= 18 && dados.idade <= 50;
  }
}
