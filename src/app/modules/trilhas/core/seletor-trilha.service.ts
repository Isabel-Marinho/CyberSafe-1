import { inject, Injectable } from "@angular/core";
import { DadosEntradaTrilha, DadosTrilha } from "./models/dados-trilha.interface";
import { TrilhaGolpes } from "./strategy/trilha-golpes.strategy";
import { TrilhaJogos } from "./strategy/trilha-jogos.strategy";
import { TrilhaSeguranca } from "./strategy/trilha-seguranca.strategy";
import { EstrategiaTrilha } from "./strategy/trilha.interface";


@Injectable({providedIn: 'root' })
export class SeletorDeTrilhasService {

  private readonly trilha1 = inject(TrilhaJogos);
  private readonly trilha2 = inject(TrilhaSeguranca);
  private readonly trilha3 = inject(TrilhaGolpes);

  private readonly estrategias: EstrategiaTrilha[] = [
    this.trilha1,
    this.trilha2,
    this.trilha3
  ];

  selecionarTrilha(dados: DadosEntradaTrilha): DadosTrilha | null {

    if(dados.idade === undefined && dados.op  === undefined){
      return null;
    }

    if(dados.idade !== undefined && (dados.idade < 0 || !Number.isInteger(dados.idade))){
      return null;
    }

    const trilhaEncontrada = this.estrategias.find(estrategia =>
      estrategia.verificarValidade(dados)
    );

    return trilhaEncontrada ? trilhaEncontrada.detalhes : null;
  }

  listarTodas(): DadosTrilha[] {
    return this.estrategias.map(estrategia => estrategia.detalhes);
  }

  buscarPorId(id: string): DadosTrilha | undefined {
  const estrategiaEncontrada = this.estrategias.find(
    estrategia => estrategia.detalhes.id === id
  );

  return estrategiaEncontrada ? estrategiaEncontrada.detalhes : undefined;
}
}
