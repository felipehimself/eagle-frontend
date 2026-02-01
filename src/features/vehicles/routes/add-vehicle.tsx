import { PageHeader } from '@/components/elements/page-header';
import { Formatter } from '@/utils';
import { Stack } from '@mui/material';
import { useState } from 'react';
import { usePostVehicle } from '../api/post-vehicle';
import { VehicleFormComponent } from '../components/vehicle-form-component';
import { TVehicleSchema } from '../types/vehicle.type';

const f = new Formatter();

export const AddVehicle = () => {
  const [formKey, setFormKey] = useState(0);

  const { mutateAsync: postVehicleAsync, isLoading: isPostingVehicleLoading } =
    usePostVehicle({});

  const handleSubmit = async (data: TVehicleSchema) => {
    console.log('data', data);

    const formData = new FormData();

    formData.append('RegiaoBaseId', String(data.regiaoBaseId));

    formData.append('ClienteId', String(data.clienteId));

    if (data.locadoraId) {
      formData.append('LocadoraId', String(data.locadoraId));
    }

    formData.append('Ativo', String(data.ativo));

    formData.append('FabricanteId', String(data.fabricanteId));

    formData.append('TipoVeiculoId', String(data.tipoVeiculoId));

    if (data.categoriaMeliId) {
      formData.append('CategoriaMeliId', String(data.categoriaMeliId));
    }

    formData.append('TipoVinculoId', String(data.tipoVinculoId));

    formData.append('DataInicioOperacao', data.dataInicioOperacao);

    if (data.dataFimOperacao) {
      formData.append('DataFimOperacao', data.dataFimOperacao);
    }

    if (data.valorImplemento) {
      formData.append('ValorImplemento', String(data.valorImplemento));
    }

    if (data?.cnpj?.trim()) {
      formData.append('Pessoa.CNPJ', data.cnpj);
    }

    if (data?.cpf?.trim()) {
      formData.append('Pessoa.CPF', data.cpf);
    }

    if (data?.observacoes?.trim()) {
      formData.append('Observacoes', data.observacoes);
    }

    if (data.dataEmissaoGR) {
      formData.append('Documento.DtEmissaoGR', data.dataEmissaoGR);
    }
    if (data.dataVencimentoGR) {
      formData.append('Documento.DtVencimentoGR', data.dataVencimentoGR);
    }

    formData.append('ExercicioCrlv', String(data.exercicioCrlv));

    if (data.vencimentoCrlv) {
      formData.append('VencimentoCrlv', data.vencimentoCrlv);
    }

    formData.append('Placa', f.removeNonAlphanumeric(data.placa));

    formData.append('Renavam', data.renavam);

    if (data.motorId) {
      formData.append('MotorId', String(data.motorId));
    }

    if (data.localidadeVeiculo) {
      formData.append('LocalidadeVeiculo', String(data.localidadeVeiculo));
    }

    if (data.ufDetran) {
      formData.append('UfDetran', String(data.ufDetran));
    }

    formData.append('Chassi', data.chassi);
    formData.append('Gravame', String(data.gravame));

    formData.append('AnoVeiculo', String(data.anoVeiculo));

    formData.append('AnoFabricacao', String(data.anoFabricacao));

    formData.append('Modelo', data.modelo ?? '');

    if (data.cor) {
      formData.append('Cor', data.cor ?? '');
    }

    if (data.valorVeiculo) {
      formData.append('ValorVeiculo', String(data.valorVeiculo));
    }

    if (data.dataGarantia) {
      formData.append('DataGarantia', data.dataGarantia);
    }

    formData.append('Pessoa.Nome', data.nome);

    formData.append('Pessoa.Id', data.pessoaId?.toString() ?? '0');

    if (data.fotosVeiculo) {
      data?.fotosVeiculo.forEach((file) => {
        formData.append('FotosVeiculo', file as File);
      });
    }

    if (data.imagemCrlv) {
      data?.imagemCrlv.forEach((file) => {
        formData.append('ImagemCrlv', file as File);
      });
    }

    try {
      await postVehicleAsync({ data: formData });
      setFormKey((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack spacing={6}>
      <PageHeader
        showBackButton
        title='Veículos / Placas'
        subtitle='Cadastrar'
      />
      <VehicleFormComponent
        key={formKey}
        initialData={undefined}
        isLoading={false}
        onSubmit={handleSubmit}
        shouldDisable={false}
        isSubmitting={isPostingVehicleLoading}
      />
    </Stack>
  );
};
