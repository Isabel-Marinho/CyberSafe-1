import { DadosVideo } from '../../core/models/dados-video.interface';

export const VIDEOS: DadosVideo[] = [
  // Trilha: Segurança em Jogos Digitais
  {
    id: 'jd-01',
    idTrilha: 'jogos-digitais',
    titulo: 'Quem está do outro lado do chat?',
    descricao: 'Como lidar com desconhecidos em jogos online.',
    path: 'desconhecidos.mp4',
  },
  {
    id: 'jd-02',
    idTrilha: 'jogos-digitais',
    titulo: 'Uso ético do chat',
    descricao: 'Evitando promover discursos de ódio em conversas.',
    path: 'bullying.mp4',
  },
  {
    id: 'jd-03',
    idTrilha: 'jogos-digitais',
    titulo: 'Protegendo seu dispositivo',
    descricao: 'Cuidados para ao baixar jogos.',
    path: 'apps.mp4',
  },

  // Trilha: Segurança de Dados
  {
    id: 'sd-01',
    idTrilha: 'seguranca-dados',
    titulo: 'Senhas seguras',
    descricao: 'Qual o modelo de senha segura.',
    path: 'senhas.mp4',
  },
  {
    id: 'sd-02',
    idTrilha: 'seguranca-dados',
    titulo: 'Autenticação em dois fatores',
    descricao: 'Uma segunda camada de proteção para suas contas.',
    path: 'dois-fatores.mp4',
  },
  {
    id: 'sd-03',
    idTrilha: 'seguranca-dados',
    titulo: 'Mantenha os programas atualizados',
    descricao: 'A importância de atualizar aplicativos.',
    path: 'atualizacao.mp4',
  },

  // Trilha: Golpes Financeiros
  {
    id: 'gf-01',
    idTrilha: 'golpes-financeiros',
    titulo: 'Cuidado com compras online',
    descricao: 'Como identificar sites e aplicativos de compra legítimos.',
    path: 'compras.mp4',
  },
  {
    id: 'gf-02',
    idTrilha: 'golpes-financeiros',
    titulo: 'Golpes com Pix',
    descricao: 'Cuidados antes de fazer uma transferência.',
    path: 'pix.mp4',
  },
  {
    id: 'gf-03',
    idTrilha: 'golpes-financeiros',
    titulo: 'Não acredite em tudo',
    descricao: 'Evitando golpes por clicar em links suspeitos.',
    path: 'premios.mp4',
  },
];
