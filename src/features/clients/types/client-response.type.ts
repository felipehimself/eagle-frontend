export type TClientResponse = {
  id: number;
  nome: string;
  cnpj: string;
  regiaoBase: TRegionBaseReponse[];
};

type TRegionBaseReponse = {
  id: number;
  nome: string;
};
