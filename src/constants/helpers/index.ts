export const TIPO_DOCUMENTO = ['CNPJ', 'CPF'] as const;
export const CNPJ_LENGTH = 14;
export const CPF_LENGTH = 11;
export const CEP_LENGTH_COM_SEPARADOR = 9;

// export const SITUACOES_ANTT = ['Ativo', 'Inativo', 'Pendente'];
export const TRUE_OU_FALSE = [
  { nome: 'Sim', value: true },
  { nome: 'Não', value: false },
];
export const ATIVO_INATIVO = ['Ativo', 'Inativo'];
export const TIPOS_DE_CADASTRO = ['Motorista', 'Ajudante', 'Ambos'];
export const TIPOS_CHAVE_PIX = [
  'CPF',
  'CNPJ',
  'E-mail',
  'Telefone',
  'Aleatória',
];
export const TIPOS_VIAGEM_TARIFARIO = [
  {
    nome: 'Last Mile',
    id: 1,
  },
  {
    nome: 'First Mile',
    id: 2,
  },
  {
    nome: 'Reversa',
    id: 3,
  },
  {
    nome: 'Line Haul',
    id: 4,
  },
  {
    nome: 'XPT',
    id: 5,
  },
];
export const TIPOS_OPERACAO_TARIFARIO = [
  ...TIPOS_VIAGEM_TARIFARIO,
  { nome: 'Qualquer', id: 6 },
];

export const CATEGORIAS_CNH = ['A', 'B', 'C', 'D', 'E'];

export const TIPOS_CONTA_BANCARIA = ['Corrente', 'Poupança', 'Salário'];

export const SITUACOES_CADASTRAIS = ['Regular', 'Irregular', 'Pendente'];

export const TIPOS_VEICULO_POR_CLIENTE = {
  flex: ['Veículo de Passeio', 'Carro', 'Moto'],
  srlog: ['Vuc'],
  kangu: ['Utilitário', 'Van'],
  hawktransportes: ['Vuc', 'Carreta'],
};

export const STATUS_DO_VEICULO = [
  { nome: 'Sim', status: true },
  { nome: 'Não', status: false },
] as const;

export const TIPOS_TARIFARIO = [
  { nome: 'Repasse', id: 1 },
  { nome: 'Recebível', id: 2 },
];

export const PERIODO_TARIFARIO = [
  { periodo: 'Antes Meio-dia', id: 1 },
  { periodo: 'Após Meio-dia', id: 2 },
  { periodo: 'Dia todo', id: 3 },
];

export const TIPOS_MOTOR = [
  { nome: 'Combustão', id: 1 },
  { nome: 'Elétrico', id: 2 },
  { nome: 'Hibrido', id: 3 },
] as const;

export const CIDADES_TARIFARIO = [
  { id: 1, nome: 'Angra dos Reis' },
  { id: 2, nome: 'Aperibe/Itaocara' },
  { id: 3, nome: 'Araruama' },
  { id: 4, nome: 'Arraial do Cabo' },
  { id: 5, nome: 'Barra do Piraí' },
  { id: 6, nome: 'Barra Mansa' },
  { id: 7, nome: 'Bom Jardim' },
  { id: 8, nome: 'Bom Jesus de Itabapoana' },
  { id: 9, nome: 'Cabo Frio' },
  { id: 10, nome: 'Cachoeiras de Macacu' },
  { id: 11, nome: 'Cambuci' },
  { id: 12, nome: 'Campos dos Goytacazes' },
  { id: 13, nome: 'Guapimirim' },
  { id: 14, nome: 'Itaboraí' },
  { id: 15, nome: 'Itaboraí e Maricá' },
  { id: 16, nome: 'Itacuruça' },
  { id: 17, nome: 'Itaguaí' },
  { id: 18, nome: 'Italva' },
  { id: 19, nome: 'Itaocara' },
  { id: 20, nome: 'Itaperuna' },
  { id: 21, nome: 'Japeri' },
  { id: 22, nome: 'Juiz de Fora' },
  { id: 23, nome: 'Macaé' },
  { id: 24, nome: 'Magé' },
  { id: 25, nome: 'Mangaratiba' },
  { id: 26, nome: 'Maricá' },
  { id: 27, nome: 'Miguel Pereira' },
  { id: 28, nome: 'Miracema' },
  { id: 29, nome: 'Muriqui' },
  { id: 30, nome: 'N. Friburgo/Teresopólis/Petrópolis' },
  { id: 31, nome: 'Natividade' },
  { id: 32, nome: 'Paracambi' },
  { id: 33, nome: 'Paraíba do Sul' },
  { id: 34, nome: 'Paraty' },
  { id: 35, nome: 'Patropólis/Itaipava' },
  { id: 36, nome: 'Paty do Alferes' },
  { id: 37, nome: 'Petropólis e Teresopólis' },
  { id: 38, nome: 'Piraí' },
  { id: 39, nome: 'Porcúncula' },
  { id: 40, nome: 'Resende' },
  { id: 41, nome: 'Rio Bonito' },
  { id: 42, nome: 'Rio das Ostras' },
  { id: 43, nome: 'S. Pedro da Aldeia' },
  { id: 44, nome: 'Santo Antonio de Pádua' },
  { id: 45, nome: 'São Fidelis' },
  { id: 46, nome: 'São Francisco de Itabapoana' },
  { id: 47, nome: 'São José do Vale do Rio Preto' },
  { id: 48, nome: 'Saquerema' },
  { id: 49, nome: 'Tanguá' },
  { id: 50, nome: 'Três Rios' },
  { id: 51, nome: 'Varre-Sai' },
  { id: 52, nome: 'Volta Redonda' },
  {
    id: 53,
    nome: 'Bairros das Zonas Oeste, Norte, Sul, Suldoeste e Baixada Fluminense',
  },
];

export const SEMPRE_FROTA = ['srlog', 'hawktransportes'];
export const POSSUI_REGRA_CIDADE = ['srlog'];

export const TARIFARIO_KM = [
  { value: '0-100', id: 1 },
  { value: '101-150', id: 2 },
  { value: '151-200', id: 3 },
  { value: '201-300', id: 4 },
  { value: '>300', id: 5 },
];

export const TIPO_CATEGORIA = [
  { categoria: 'Cliente', id: 1 },
  { categoria: 'Flex', id: 2 },
];

export const ZONAS = [
  { id: 1, zona: 'Centro' },
  { id: 2, zona: 'Ilha' },
  { id: 3, zona: 'Norte' },
  { id: 4, zona: 'Oeste' },
  { id: 5, zona: 'Sul' },
];
