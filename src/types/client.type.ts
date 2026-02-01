import { TRegioesBase } from '.';

export type TClient = {
  id?: number;
  isFlex: boolean;
  pessoa: {
    nome: string | null;
    email: string | null;
    telefone: string | null;
    dataNascimento: null;
    ativo: boolean;
    cnpj: string | null;
    cpf: string | null;
  };
  regioesBaseId: number[];
  endereco: TClientEndereco | null;
};

export type TClientEndereco = {
  logradouro: string | null;
  numero: string | null;
  complemento: string | null;
  bairro: string | null;
  cidade: string | null;
  uf: string | null;
  cep: string | null;
};

export type TClientResponse = Omit<
  TClient,
  'endereco' | 'pessoa' | 'regioesBaseId'
> & {
  // enderecos: TClientEndereco[];
  pessoaTipo: {
    id: number;
    pessoaId: number;
    tipoCategoriaPessoaId: number;
    ativo: boolean;
    pessoa: {
      id: number;
      nome: string;
      email: string;
      telefone: string;
      dataNascimento: string;
      ativo: boolean;
      enderecos: TClientEndereco[];
      cnpj: string | null;
      cpf: string | null;
    };
  };
  regioesBase: TRegioesBase[];
};

export type TClientResponseGrid = {
  id: number;
  cnpj: string;
  flex: boolean;
  nome: string;
  bairro: string | undefined;
  cep: string;
  complemento: string | undefined;
  email: string | undefined;
  logradouro: string | undefined;
  municipio: string | undefined;
  numero: string | undefined;
  telefone: string;
  uf: string | undefined;
  regioesBase: TRegioesBase[];
};
