import { DadosTrilha } from './dados-trilha.interface';

export const TRILHAS: DadosTrilha[] = [
  {
    id: 'jogos-digitais',
    nome: 'Segurança em Jogos Digitais',
    faixa: 'Crianças e adolescentes',
    descricao: 'Como jogar online com segurança, evitar golpes em jogos e proteger suas contas.',
  },
  {
    id: 'seguranca-dados',
    nome: 'Segurança de Dados',
    faixa: 'Adultos (18 a 50 anos)',
    descricao: 'Senhas, autenticação em dois fatores e cuidados com phishing no dia a dia.',
  },
  {
    id: 'golpes-financeiros',
    nome: 'Golpes Financeiros',
    faixa: 'Pessoas com mais de 50 anos',
    descricao: 'Como reconhecer e evitar os golpes mais comuns envolvendo dinheiro e bancos.',
  },
];
