import { useGetCardBrands } from '@/api/get-car-brands';
import { useGetCategoriasMeli } from '@/api/get-categorias-meli';
import { useGetClients } from '@/api/get-clients';
import { useGetLocadoras } from '@/api/get-locadoras';
import { useGetRegions } from '@/api/get-regions';
import { useGetTiposVeiculo } from '@/api/get-tipos-veiculos.ts';
import { useGetTiposVinculo } from '@/api/get-tipos-vinculo';
import { useGetUFs } from '@/api/get-ufs';
import { getVehicleOwner } from '@/api/get-vehicle-owner';
import {
  AutocompleteShowNameGetId,
  CNPJInput,
  DateInput,
  ExpandRowImages,
  ExpandRowPDFS,
  MoneyInput,
  VisuallyHiddenInput,
  YearInput,
} from '@/components/elements';
import { CustomTabPanel } from '@/components/elements/custom-tab-panel';
import { CustomTabs } from '@/components/elements/custom-tabs';
import { CPFInput } from '@/components/elements/form/cpf-input';
import { FormButtons } from '@/components/elements/form/form-buttons';
import { TabsLoading } from '@/components/elements/tabs-loading';
import {
  CNPJ_LENGTH,
  CPF_LENGTH,
  STATUS_DO_VEICULO,
  TIPO_DOCUMENTO,
  TIPOS_MOTOR,
  TRUE_OU_FALSE,
} from '@/constants';
import { TRegionSchema } from '@/features/regions/types/regions.type';
import { useNotification } from '@/hooks/use-notification';
import { TCloudinaryFile, TFormComponent } from '@/types';
import { validateImgSizes, validateImgTypes } from '@/utils';
import {
  Formatter,
  hasSomeTruthy,
  initialValueTrueOrFalseField,
} from '@/utils/common';
import { zodResolver } from '@hookform/resolvers/zod';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  Stack,
  TextField,
} from '@mui/material';
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TABS_VALUES_VEHICLE } from '../constants';
import { TVehicleSchema, vehicleSchema } from '../types/vehicle.type';

const f = new Formatter();

export const VehicleFormComponent = forwardRef(
  (props: TFormComponent<TVehicleSchema>, ref) => {
    const toaster = useNotification();

    const [tabValue, setTabValue] = useState(0);
    const [veiculoImgsFile, setVeiculoImgsFile] = useState<TCloudinaryFile[]>(
      [],
    );
    const [crlvPDFFiles, setCrlvPDFFiles] = useState<TCloudinaryFile[]>([]);
    const [isLoadingOwner, setIsLoadingOwner] = useState(false);

    const {
      handleSubmit,
      control,
      setValue,
      setError,
      clearErrors,
      watch,
      reset,
      formState: { errors },
    } = useForm<TVehicleSchema>({
      resolver: zodResolver(vehicleSchema),
      defaultValues: props.initialData || {},
    });

    console.log(errors);

    useImperativeHandle(ref, () => ({
      resetForm: () => {
        reset(props.initialData);
      },
    }));

    useEffect(() => {
      if (props.initialData) {
        reset(props.initialData);
        if (
          props.initialData?.fotosVeiculo &&
          props.initialData?.fotosVeiculo.length > 0
        ) {
          setVeiculoImgsFile(
            props.initialData.fotosVeiculo as unknown as TCloudinaryFile[],
          );
        }
        if (
          props.initialData?.imagemCrlv &&
          props.initialData?.imagemCrlv.length > 0
        ) {
          setCrlvPDFFiles(
            props.initialData.imagemCrlv as unknown as TCloudinaryFile[],
          );
        }
      }
    }, [props.initialData, reset]);

    const { data: locadoras, isLoading: isLoadingLocadoras } = useGetLocadoras({
      config: {
        select: (data) => {
          const base = data.filter((l) => l.nome?.toUpperCase() != 'OUTROS');
          const outros = data.find((l) => l.nome?.toUpperCase() == 'OUTROS')!;
          const sorted = base.sort((a, b) => a.nome.localeCompare(b.nome));
          return sorted.concat(outros);
        },
      },
    });

    const { data: categoriasMeli, isLoading: isLoadingCategoriasMeli } =
      useGetCategoriasMeli({
        config: {
          select: (data) => {
            return data.sort((a, b) => a.nome.localeCompare(b.nome));
          },
        },
      });

    const { data: ufs, isLoading: isLoadingUFs } = useGetUFs({});
    const { data: fabricantesVeiculo, isLoading: isLoadingMarcasCarro } =
      useGetCardBrands({
        config: {
          select: (data) => {
            return data.sort((a, b) => a.nome.localeCompare(b.nome));
          },
        },
      });

    const { data: clientes, isLoading: isLoadingClientes } = useGetClients({});
    const { data: regioesBase, isLoading: isLoadingRegioesBase } =
      useGetRegions({});
    const { data: tiposVeiculo, isLoading: isLoadingTiposVeiculo } =
      useGetTiposVeiculo({
        config: {
          select: (data) => {
            return data.sort((a, b) => a.nome.localeCompare(b.nome));
          },
        },
      });

    const { data: tiposVinculo, isLoading: isLoadingTiposVinculo } =
      useGetTiposVinculo({
        config: {
          select: (data) => {
            return data.sort((a, b) => a.nome.localeCompare(b.nome));
          },
        },
      });

    const tipoDocumento = watch('tipoDocumento');
    const cnpj = watch('cnpj');
    const cpf = watch('cpf');

    const ownerLocalState = useMemo(() => {
      if (tipoDocumento === 'CNPJ') {
        return {
          cnpjCpf: cnpj,
          enabled: cnpj?.length == CNPJ_LENGTH,
        };
      }

      if (tipoDocumento === 'CPF') {
        return {
          cnpjCpf: cpf,
          enabled: cpf?.length == CPF_LENGTH,
        };
      }

      return {
        cnpjCpf: '',
        enabled: false,
      };
    }, [tipoDocumento, cnpj, cpf]);

    const cleanNomeAndPessoaId = useCallback(() => {
      setValue('nome', '', {
        shouldDirty: false,
        shouldTouch: false,
      });
      setValue('pessoaId', undefined);
    }, [setValue]);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
      setTabValue(newValue);
    };

    const onSubmit = (data: TVehicleSchema) => {
      const tipoDocumento = data.tipoDocumento;
      const isCNPJ = tipoDocumento == 'CNPJ';

      if (isCNPJ && data.cnpj?.length !== CNPJ_LENGTH) {
        setError('cnpj', {
          message: 'CNPJ inválido',
        });
        return;
      } else {
        clearErrors('cnpj');
      }

      if (!isCNPJ && data.cpf?.length !== CPF_LENGTH) {
        setError('cpf', {
          message: 'CPF inválido',
        });
        return;
      } else {
        clearErrors('cpf');
      }

      const imgsVeiculoPayload = veiculoImgsFile
        .filter((img) => img.newImage)
        .map((img) => img.file);

      data.fotosVeiculo = imgsVeiculoPayload;

      const novasImgsVeiculoPayload = veiculoImgsFile.filter(
        // (img) => !img.newImage && img.hidden,
        (img) => !img.newImage,
      );

      if (novasImgsVeiculoPayload?.length > 0) {
        data.editarFotosVeiculo = novasImgsVeiculoPayload;
      }

      const imagemCrlvPayload = crlvPDFFiles
        .filter((pdf) => pdf.newImage)
        .map((crlv) => crlv.file);
      data.imagemCrlv = imagemCrlvPayload;

      const novosCrlvsVeiculoPayload = crlvPDFFiles.filter(
        (img) => !img.newImage,
      );

      if (novosCrlvsVeiculoPayload?.length > 0) {
        data.editarCrlvsVeiculo = novosCrlvsVeiculoPayload;
      }

      props.onSubmit(data);
    };

    const showTabsLoading = hasSomeTruthy([
      props.isLoading,
      isLoadingUFs,
      isLoadingMarcasCarro,
      isLoadingClientes,
      isLoadingRegioesBase,
      isLoadingTiposVeiculo,
      isLoadingLocadoras,
      isLoadingCategoriasMeli,
      isLoadingTiposVinculo,
    ]);

    const shouldDisable = useMemo(
      () => props.isSubmitting || props.shouldDisable,
      [props.isSubmitting, props.shouldDisable],
    );

    const searchOwner = useCallback(async () => {
      if (!ownerLocalState.enabled) return;

      try {
        setIsLoadingOwner(true);

        const data = await getVehicleOwner(ownerLocalState.cnpjCpf || '');

        if (data.id && data.nome) {
          setValue('pessoaId', String(data.id));
          setValue('nome', data.nome);
        } else {
          setValue('pessoaId', undefined);
          setValue('nome', '');
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoadingOwner(false);
      }
    }, [
      ownerLocalState.enabled,
      ownerLocalState.cnpjCpf,
      setValue,
      setIsLoadingOwner,
    ]);

    const renderTipoDocumento = useCallback(() => {
      if (tipoDocumento === undefined)
        return <TextField placeholder='CNPJ ou CPF' disabled fullWidth />;

      if (tipoDocumento === 'CNPJ') {
        return (
          <CNPJInput
            name='cnpj'
            control={control}
            label='XX.XXX.XXX/XXXX-XX'
            disabled={shouldDisable}
            required
            clearField={cleanNomeAndPessoaId}
            onClickButton={searchOwner}
          />
        );
      }

      return (
        <CPFInput
          name='cpf'
          control={control}
          label='XXX.XXX.XXX-XX'
          disabled={shouldDisable}
          required
          clearField={cleanNomeAndPessoaId}
          onClickButton={searchOwner}
        />
      );
    }, [
      tipoDocumento,
      control,
      shouldDisable,
      cleanNomeAndPessoaId,
      searchOwner,
    ]);

    const onInvalid = () => {
      toaster.addNotification('Verifique os campos sinalizados em vermelho', {
        variant: 'error',
      });
    };

    const handleRemoveCrlv = (pdf: TCloudinaryFile) => {
      setCrlvPDFFiles((prev) => {
        const currentPDF = prev.find((img) => img.secureUrl === pdf.secureUrl);

        if (currentPDF?.newImage) {
          return prev.filter((img) => img.secureUrl !== pdf.secureUrl);
        }

        return prev.map((_pdf) => {
          if (currentPDF?.secureUrl == _pdf.secureUrl) {
            return { ..._pdf, ativo: false, hidden: true };
          }

          return _pdf;
        });
      });
    };

    const handleRemoveFotosVeiculo = (foto: TCloudinaryFile) => {
      setVeiculoImgsFile((prev) => {
        const currentImg = prev.find((img) => img.secureUrl === foto.secureUrl);

        if (currentImg?.newImage) {
          return prev.filter((img) => img.secureUrl !== foto.secureUrl);
        }

        return prev.map((img) => {
          if (currentImg?.secureUrl == img.secureUrl) {
            return { ...img, ativo: false, hidden: true };
          }

          return img;
        });
      });
    };

    if (showTabsLoading) return <TabsLoading />;

    // console.log('errors', errors);
    // console.log('values', getValues());

    return (
      <>
        <Stack spacing={6}>
          <Paper
            component='form'
            noValidate
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            sx={{ py: 2, pb: 2 }}
          >
            <CustomTabs
              value={tabValue}
              handleChange={handleChange}
              tabLabels={TABS_VALUES_VEHICLE}
            />

            {/* DADOS GERAIS */}
            <CustomTabPanel value={tabValue} index={0}>
              <Grid container p={2} spacing={6}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Controller
                    name='ativo'
                    control={control}
                    render={({ field, fieldState }) => (
                      <FormControl
                        disabled={shouldDisable}
                        fullWidth
                        error={!!fieldState.error}
                      >
                        <InputLabel>Ativo</InputLabel>
                        <Select
                          {...field}
                          value={initialValueTrueOrFalseField(field.value)}
                          disabled={shouldDisable}
                          label='Ativo'
                          onChange={(e) =>
                            field.onChange(e.target.value === 'true')
                          }
                        >
                          {STATUS_DO_VEICULO.map(({ nome, status }) => (
                            <MenuItem key={nome} value={String(status)}>
                              {nome}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Controller
                    name='tipoVinculoId'
                    control={control}
                    render={({ field, fieldState }) => (
                      <FormControl
                        disabled={shouldDisable}
                        fullWidth
                        error={!!fieldState.error}
                      >
                        <InputLabel>Vínculo</InputLabel>
                        <Select
                          {...field}
                          disabled={shouldDisable}
                          label='Vínculo'
                          required
                          value={field.value || ''}
                        >
                          {tiposVinculo?.map(({ id, nome }) => (
                            <MenuItem key={id + '-' + nome} value={id}>
                              {nome}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <DateInput
                    control={control}
                    label='Data Início Operação'
                    name='dataInicioOperacao'
                    disabled={shouldDisable}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <DateInput
                    control={control}
                    label='Data Fim Operação'
                    name='dataFimOperacao'
                    disabled={shouldDisable}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <AutocompleteShowNameGetId
                    control={control}
                    data={(regioesBase as Required<TRegionSchema>[]) || []}
                    label='Região Base'
                    name='regiaoBaseId'
                    disabled={shouldDisable}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Controller
                    name='clienteId'
                    control={control}
                    render={({ field, fieldState }) => (
                      <FormControl
                        disabled={shouldDisable}
                        fullWidth
                        error={!!fieldState.error}
                      >
                        <InputLabel>Cliente Base</InputLabel>
                        <Select
                          {...field}
                          disabled={shouldDisable}
                          value={field.value || ''}
                          label='Cliente Base'
                          required
                        >
                          {clientes?.map(({ id, nome }) => (
                            <MenuItem key={nome} value={id}>
                              {nome}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <Controller
                    name='locadoraId'
                    control={control}
                    render={({ field, fieldState }) => (
                      <FormControl
                        disabled={shouldDisable}
                        fullWidth
                        error={!!fieldState.error}
                      >
                        <InputLabel>Locadora</InputLabel>
                        <Select
                          {...field}
                          disabled={shouldDisable}
                          label='Locadora'
                          value={field.value ?? ''}
                        >
                          <MenuItem sx={{ paddingBlock: '1rem' }} value=''>
                            <em> </em>
                          </MenuItem>
                          {locadoras?.map(({ cnpj, id, nome }) => (
                            <MenuItem key={`${id}-${cnpj}-${nome}`} value={id}>
                              {nome}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <Controller
                    name='tipoVeiculoId'
                    control={control}
                    render={({ field, fieldState }) => (
                      <FormControl
                        disabled={shouldDisable}
                        fullWidth
                        error={!!fieldState.error}
                      >
                        <InputLabel>Tipo Veículo</InputLabel>
                        <Select
                          {...field}
                          disabled={shouldDisable}
                          label='Tipo Veículo'
                          value={field.value || ''}
                        >
                          {tiposVeiculo?.map(({ id, nome }) => (
                            <MenuItem key={nome} value={id}>
                              {nome}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <Controller
                    name='categoriaMeliId'
                    control={control}
                    render={({ field, fieldState }) => (
                      <FormControl
                        disabled={shouldDisable}
                        fullWidth
                        error={!!fieldState.error}
                      >
                        <InputLabel>Categoria Meli</InputLabel>
                        <Select
                          {...field}
                          disabled={shouldDisable}
                          value={field.value || ''}
                          label='Categoria Meli'
                        >
                          <MenuItem sx={{ paddingBlock: '1rem' }} value=''>
                            <em> </em>
                          </MenuItem>
                          {categoriasMeli?.map(({ id, nome }) => (
                            <MenuItem key={id + '-' + nome} value={id}>
                              {nome}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <MoneyInput
                    control={control}
                    label='Valor Implemento'
                    name='valorImplemento'
                    disabled={shouldDisable}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  {isLoadingUFs ? (
                    <Skeleton />
                  ) : (
                    <Controller
                      name='ufDetran'
                      control={control}
                      render={({ field, fieldState }) => (
                        <FormControl fullWidth error={!!fieldState.error}>
                          <InputLabel>UF Detran</InputLabel>
                          <Select
                            {...field}
                            disabled={shouldDisable}
                            label='UF Detran'
                            value={field.value || ''}
                          >
                            {ufs?.map(({ sigla, id }) => (
                              <MenuItem key={sigla + '-' + id} value={sigla}>
                                {sigla}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                  )}
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  {isLoadingUFs ? (
                    <Skeleton />
                  ) : (
                    <Controller
                      name='localidadeVeiculo'
                      control={control}
                      render={({ field, fieldState }) => (
                        <FormControl fullWidth error={!!fieldState.error}>
                          <InputLabel>Localidade Veículo</InputLabel>
                          <Select
                            {...field}
                            disabled={shouldDisable}
                            label='Localidade Veículo'
                            value={field.value || ''}
                          >
                            {ufs?.map(({ nome, id }) => (
                              <MenuItem key={nome + '-' + id} value={nome}>
                                {nome}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                  )}
                </Grid>

                <Grid size={12}>
                  <Controller
                    name='observacoes'
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        value={field.value || ''}
                        disabled={shouldDisable}
                        fullWidth
                        label='Observações'
                        multiline
                        rows={3}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        slotProps={{ inputLabel: { shrink: !!field.value } }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </CustomTabPanel>

            {/* DOCUMENTOS */}
            <CustomTabPanel value={tabValue} index={1}>
              <Grid container p={2} spacing={6}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Controller
                    name='tipoDocumento'
                    control={control}
                    render={({ field, fieldState }) => (
                      <FormControl
                        disabled={shouldDisable}
                        fullWidth
                        error={!!fieldState.error}
                      >
                        <InputLabel>Documento Proprietário</InputLabel>
                        <Select
                          {...field}
                          disabled={shouldDisable}
                          value={field.value || ''}
                          label='Documento Proprietário'
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            setValue('cnpj', undefined);
                            setValue('cpf', undefined);
                            setValue('nome', '');
                          }}
                        >
                          {TIPO_DOCUMENTO.map((tipo) => (
                            <MenuItem key={tipo} value={tipo}>
                              {tipo}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>{renderTipoDocumento()}</Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  {isLoadingOwner ? (
                    <Skeleton />
                  ) : (
                    <Controller
                      name='nome'
                      control={control}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          value={field.value || ''}
                          disabled={shouldDisable}
                          fullWidth
                          label='Nome Proprietário'
                          error={!!fieldState.error}
                          slotProps={{
                            inputLabel: { shrink: !!field.value },
                            htmlInput: {
                              style: { textTransform: 'uppercase' },
                            },
                          }}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                        />
                      )}
                    />
                  )}
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <DateInput
                    control={control}
                    label='Emissão GR'
                    name='dataEmissaoGR'
                    disabled={shouldDisable}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <DateInput
                    control={control}
                    label='Vencimento GR'
                    name='dataVencimentoGR'
                    disabled={shouldDisable}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <Controller
                    name='placa'
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        value={field.value || ''}
                        disabled={shouldDisable}
                        fullWidth
                        label='Placa'
                        error={!!fieldState.error}
                        slotProps={{ inputLabel: { shrink: !!field.value } }}
                        onChange={(e) => {
                          const value = e.target.value;
                          const formatted = f.formatLicensePlate(value);
                          setValue('placa', formatted);
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <YearInput
                    control={control}
                    label='Exercício CRLV'
                    name='exercicioCrlv'
                    disabled={shouldDisable}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <DateInput
                    control={control}
                    label='Vencimento CRLV'
                    name='vencimentoCrlv'
                    disabled={shouldDisable}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Controller
                    name='renavam'
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        value={field.value || ''}
                        disabled={shouldDisable}
                        fullWidth
                        label='Renavam'
                        error={!!fieldState.error}
                        slotProps={{ inputLabel: { shrink: !!field.value } }}
                        onChange={(e) => {
                          const value = e.target.value;
                          const formatted = f.formatRenavam(value);
                          setValue('renavam', formatted);
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Controller
                    name='chassi'
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        value={field.value || ''}
                        disabled={shouldDisable}
                        fullWidth
                        label='Chassi'
                        error={!!fieldState.error}
                        slotProps={{ inputLabel: { shrink: !!field.value } }}
                        onChange={(e) => {
                          const value = e.target.value;
                          const formatted = f.formatChassi(value);
                          setValue('chassi', formatted);
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <Button
                    component='label'
                    role={undefined}
                    variant='contained'
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    disabled={shouldDisable}
                    fullWidth
                  >
                    Upload Fotos Veículo
                    <VisuallyHiddenInput
                      type='file'
                      multiple
                      accept='image/jpg, image/jpeg'
                      onChange={(event) => {
                        const files = Array.from(event.target.files ?? []);
                        if (files.length === 0) return;

                        const areTypesValid = validateImgTypes(files);

                        if (!areTypesValid) {
                          toaster.addNotification(
                            'Somente imagens JPG ou JPEG são permitidas.',
                            {
                              variant: 'error',
                            },
                          );
                          return;
                        }

                        const areImgsSizeValid = validateImgSizes(files);

                        if (!areImgsSizeValid) {
                          toaster.addNotification(
                            'Cada imagem deve ter no máximo 2mb.',
                            {
                              variant: 'error',
                            },
                          );
                          return;
                        }

                        const mappedFiles = files.map((file) => ({
                          file,
                          secureUrl: URL.createObjectURL(file),
                          newImage: true,
                        }));

                        setVeiculoImgsFile((prev) => [...prev, ...mappedFiles]);
                      }}
                    />
                  </Button>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Button
                    component='label'
                    role={undefined}
                    variant='contained'
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    disabled={shouldDisable}
                    fullWidth
                  >
                    Upload CRLV
                    <VisuallyHiddenInput
                      type='file'
                      multiple
                      accept='application/pdf'
                      onChange={(event) => {
                        const files = Array.from(event.target.files ?? []);
                        if (files.length === 0) return;

                        const areTypesValid = files.every(
                          (file) => file.type === 'application/pdf',
                        );

                        if (!areTypesValid) {
                          toaster.addNotification(
                            'Somente arquivos PDF são permitidos.',
                            { variant: 'error' },
                          );
                          return;
                        }

                        const maxSizeInBytes = 5 * 1024 * 1024;
                        const areSizesValid = files.every(
                          (file) => file.size <= maxSizeInBytes,
                        );

                        if (!areSizesValid) {
                          toaster.addNotification(
                            'Cada PDF deve ter no máximo 5MB.',
                            { variant: 'error' },
                          );
                          return;
                        }

                        const mappedFiles = files.map((file) => ({
                          file,
                          secureUrl: URL.createObjectURL(file),
                          newImage: true,
                        }));

                        setCrlvPDFFiles((prev) => [...prev, ...mappedFiles]);
                      }}
                    />
                  </Button>
                </Grid>

                <Grid size={{ xs: 12, md: 12 }}>
                  <Grid container spacing={1}>
                    <Grid size={{ xs: 12 }}>
                      <ExpandRowImages
                        content={veiculoImgsFile}
                        title='Fotos do Veículo'
                        onDelete={handleRemoveFotosVeiculo}
                        disabled={shouldDisable}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <ExpandRowPDFS
                        title='CRLV'
                        content={crlvPDFFiles}
                        onDelete={handleRemoveCrlv}
                        disabled={shouldDisable}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CustomTabPanel>

            {/* VEÍCULO */}
            <CustomTabPanel value={tabValue} index={2}>
              <Grid container p={2} spacing={6}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Controller
                    name='motorId'
                    control={control}
                    render={({ field, fieldState }) => (
                      <FormControl
                        disabled={shouldDisable}
                        fullWidth
                        error={!!fieldState.error}
                      >
                        <InputLabel>Motor</InputLabel>
                        <Select
                          {...field}
                          disabled={shouldDisable}
                          label='Motor'
                          value={field.value || ''}
                        >
                          {TIPOS_MOTOR.map(({ id, nome }) => (
                            <MenuItem key={id + '-' + nome} value={id}>
                              {nome}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <YearInput
                    control={control}
                    label='Ano Fabricação'
                    name='anoFabricacao'
                    disabled={shouldDisable}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <YearInput
                    control={control}
                    label='Ano Veículo'
                    name='anoVeiculo'
                    disabled={shouldDisable}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  {isLoadingMarcasCarro ? (
                    <Skeleton />
                  ) : (
                    <AutocompleteShowNameGetId
                      control={control}
                      data={fabricantesVeiculo || []}
                      label='Fabricante'
                      name='fabricanteId'
                      disabled={shouldDisable}
                    />
                  )}
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <Controller
                    name='modelo'
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        value={field.value || ''}
                        disabled={shouldDisable}
                        fullWidth
                        label='Modelo'
                        error={!!fieldState.error}
                        slotProps={{
                          inputLabel: { shrink: !!field.value },
                          htmlInput: { style: { textTransform: 'uppercase' } },
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <Controller
                    name='gravame'
                    control={control}
                    render={({ field, fieldState }) => (
                      <FormControl fullWidth error={!!fieldState.error}>
                        <InputLabel>Gravame</InputLabel>
                        <Select
                          {...field}
                          value={initialValueTrueOrFalseField(field.value)}
                          disabled={shouldDisable}
                          label='Gravame'
                          onChange={(e) => {
                            setValue(
                              'gravame',
                              JSON.parse(e.target.value as string),
                            );
                          }}
                        >
                          {TRUE_OU_FALSE.map(({ nome, value }) => (
                            <MenuItem key={nome} value={String(value)}>
                              {nome}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Controller
                    name='cor'
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        value={field.value || ''}
                        disabled={shouldDisable}
                        fullWidth
                        label='Cor'
                        error={!!fieldState.error}
                        slotProps={{
                          htmlInput: { style: { textTransform: 'uppercase' } },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <DateInput
                    control={control}
                    label='Data Garantia'
                    name='dataGarantia'
                    disabled={shouldDisable}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <MoneyInput
                    control={control}
                    label='Valor Veículo'
                    name='valorVeiculo'
                    disabled={shouldDisable}
                  />
                </Grid>
              </Grid>
            </CustomTabPanel>

            {tabValue === TABS_VALUES_VEHICLE.length - 1 && (
              <FormButtons shouldDisable={shouldDisable} />
            )}
          </Paper>
        </Stack>
      </>
    );
  },
);
