import { useGetVehicleById } from '@/api/get-vehicle-by-id';
import { PageHeader } from '@/components/elements/page-header';
import { TFormRef } from '@/types';
import { Formatter } from '@/utils';
import { Stack } from '@mui/material';
import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePutVehicle } from '../api/put-vehicle';
import { VehicleFormComponent } from '../components/vehicle-form-component';
import { TVehicleSchema } from '../types/vehicle.type';

const f = new Formatter();

export const EditVehicle = () => {
  const { id } = useParams();

  const [shouldDisable, setShouldDisable] = useState(true);
  const formRef = useRef<TFormRef>(null);

  const { data: vehicleData, isLoading: isLoadingVehicle } = useGetVehicleById({
    config: {
      enabled: Boolean(id),
    },
    id: String(id),
  });

  const { mutate: putVehicle, isLoading: isLoadingPut } = usePutVehicle({});

  const handleSubmit = async (data: TVehicleSchema) => {
    console.log('data', data);
    // return;
    setShouldDisable(true);

    const formData = new FormData();

    formData.append('Id', String(id));

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

    if (data.fotosVeiculo && data.fotosVeiculo?.length > 0) {
      data?.fotosVeiculo.forEach((file) => {
        formData.append('FotosVeiculo', file as File);
      });
    }

    if (data?.editarFotosVeiculo && data?.editarFotosVeiculo?.length > 0) {
      const edits = data.editarFotosVeiculo.map(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ({ file, hidden, ...rest }) => ({ ...rest }),
      );
      formData.append('EdicaoFotosVeiculo', JSON.stringify(edits));
    }

    if (data.imagemCrlv && data.imagemCrlv?.length > 0) {
      data?.imagemCrlv.forEach((file) => {
        formData.append('ImagemCrlv', file as File);
      });
    }

    if (data?.editarCrlvsVeiculo && data?.editarCrlvsVeiculo?.length > 0) {
      const edits = data.editarCrlvsVeiculo.map(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ({ file, hidden, ...rest }) => ({ ...rest }),
      );

      formData.append('EdicaoImagemCrlv', JSON.stringify(edits));
    }

    formData.append(
      'Documento.DocumentoId',
      String(data.documentos![0]!.documentoOutros.documentoId),
    );

    putVehicle({ data: formData, id: id! });
  };

  const handleToggleEditBtn = () => {
    setShouldDisable((prev) => {
      const next = !prev;

      if (prev === false && next === true) {
        formRef.current?.resetForm();
      }

      return next;
    });
  };

  return (
    <Stack spacing={6}>
      <PageHeader
        handleEdit={handleToggleEditBtn}
        subtitle={shouldDisable ? 'Dados do cadastro' : 'Editando cadastro'}
        title='Veículos / Placas'
        showBackButton
        disableBackButton={isLoadingPut}
        disableEditButton={isLoadingVehicle || isLoadingPut}
      />

      <VehicleFormComponent
        ref={formRef}
        isLoading={isLoadingVehicle}
        onSubmit={handleSubmit}
        shouldDisable={shouldDisable}
        initialData={vehicleData}
        isSubmitting={isLoadingPut}
      />
    </Stack>
  );
};
