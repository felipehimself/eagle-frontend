import { useGetClients } from '@/api/get-clients';
import { useGetRegions } from '@/api/get-regions';
import { useGetTiposVeiculo } from '@/api/get-tipos-veiculos';
import { CustomTabPanel } from '@/components/elements/custom-tab-panel';
import { CustomTabs } from '@/components/elements/custom-tabs';
import { FormButtons } from '@/components/elements/form/form-buttons';
import { TabsLoading } from '@/components/elements/tabs-loading';
import { TRUE_OU_FALSE } from '@/constants';
import { Formatter } from '@/utils/common';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Skeleton,
  Stack,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TAB_VALUES_ROUTES } from '../constants';
import { routeSchema, TRouteSchema } from '../types/route.type'; // DriverFormErrors

type TRouteComponentProps = {
  onSubmit: (data: TRouteSchema) => void;
  initialData?: TRouteSchema | undefined;
  shouldDisable?: boolean;
  isLoading: boolean;
  isSubmitting?: boolean;
};
const f = new Formatter();

export const RouteFormComponent = (props: TRouteComponentProps) => {
  const { shouldDisable = false } = props;
  const navigate = useNavigate();

  const [tabValue, setTabValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const { data: REGIOES_BASE, isLoading: isRegioesBaseLoading } =
    useGetRegions();
  const { data: CLIENTS, isLoading: isLoadingClients } = useGetClients({});

  const { data: tiposVeiculo, isLoading: isLoadingTiposVeiculo } =
    useGetTiposVeiculo({
      config: {
        select: (data) => {
          return data.sort((a, b) => a.nome.localeCompare(b.nome));
        },
      },
    });

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
    getValues,
    setError,
    clearErrors,
    reset,
  } = useForm<TRouteSchema>({
    resolver: zodResolver(routeSchema),
    defaultValues: props.initialData || {},
  });

  const onSubmit = (data: TRouteSchema) => {
    // e.preventDefault();

    props.onSubmit(data);
  };

  useEffect(() => {
    if (props.initialData) {
      reset(props.initialData);
    }
  }, [props.initialData, reset]);

  if (props.isLoading) {
    return <TabsLoading />;
  }

  console.log({ errors });

  return (
    <Stack spacing={6}>
      <Paper
        component='form'
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ py: 2, pb: 2 }}
      >
        <CustomTabs
          value={tabValue}
          handleChange={handleChange}
          tabLabels={TAB_VALUES_ROUTES}
        />

        {/* DADOS ROTA */}
        <CustomTabPanel value={tabValue} index={0}>
          <Grid container p={2} spacing={6}>
            <Grid size={{ xs: 12, md: 4 }}>
              {isLoadingClients ? (
                <Skeleton />
              ) : (
                <FormControl fullWidth error={!!errors?.cliente}>
                  <InputLabel
                  // shrink={Boolean(control._formValues.cliente?.length)}
                  >
                    Cliente
                  </InputLabel>
                  <Controller
                    name='cliente'
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        value={field.value || ''}
                        label='Clientes'
                      >
                        {CLIENTS?.map(({ id, nome }) => (
                          <MenuItem key={id} value={id}>
                            {nome}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              )}
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              {/* TODO: VAI VIR DA API */}
              {false ? (
                <Skeleton />
              ) : (
                <FormControl fullWidth error={!!errors?.motorista}>
                  <InputLabel
                  // shrink={Boolean(control._formValues.motorista?.length)}
                  >
                    Motorista
                  </InputLabel>
                  <Controller
                    name='motorista'
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        value={field.value || []}
                        label='Motorista'
                      >
                        {['Joao', 'Maria'].map((nome) => (
                          <MenuItem key={nome} value={nome}>
                            {nome}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              )}
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth error={!!errors?.tipoVeiculo}>
                <InputLabel
                // shrink={Boolean(control._formValues.tipoVeiculo?.length)}
                >
                  Tipo Veículo
                </InputLabel>
                <Controller
                  name='tipoVeiculo'
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value || []}
                      label='Tipo Veículo'
                    >
                      {tiposVeiculo?.map(({ nome, id }) => (
                        <MenuItem key={nome} value={id}>
                          {nome}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Controller
                name='placa'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Placa'
                    error={!!errors?.placa}
                    slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
                    onChange={(e) => {
                      const formatted = f.formatLicensePlate(e.target.value);
                      setValue('placa', formatted);
                    }}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth error={!!errors?.tipoServico}>
                <InputLabel
                // shrink={Boolean(control._formValues.tipoServico?.length)}
                >
                  Tipo de Serviço o que seria
                </InputLabel>
                <Controller
                  name='tipoServico'
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value || []}
                      label='Tipo de Serviço o que seria'
                    >
                      {['Opcoes'].map((nome) => (
                        <MenuItem key={nome} value={nome}>
                          {nome}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              {isRegioesBaseLoading ? (
                <Skeleton />
              ) : (
                <FormControl fullWidth error={!!errors?.regiaoBase}>
                  <InputLabel
                  // shrink={Boolean(control._formValues.regiaoBase?.length)}
                  >
                    Região Base
                  </InputLabel>
                  <Controller
                    name='regiaoBase'
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        value={field.value || ''}
                        label='Região Base'
                      >
                        {REGIOES_BASE?.map(({ nome, id }) => (
                          <MenuItem key={nome} value={id}>
                            {nome}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              )}
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Controller
                name='cidade'
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    disabled={shouldDisable}
                    required
                    fullWidth
                    label='Cidade'
                    error={!!fieldState.error}
                    // helperText={fieldState.error?.message}
                    slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Controller
                name='ajudante'
                control={control}
                render={({ field, fieldState }) => (
                  <FormControl
                    disabled={shouldDisable}
                    fullWidth
                    error={!!fieldState.error}
                  >
                    <InputLabel>Ajudante</InputLabel>
                    <Select
                      {...field}
                      disabled={shouldDisable}
                      label='Ajudante'
                    >
                      {[
                        { nome: 'Ajudante 1', id: 1 },
                        { nome: 'Ajudante 2', id: 2 },
                      ].map((tipo) => (
                        <MenuItem key={tipo.id} value={tipo.id}>
                          {tipo.nome}
                        </MenuItem>
                      ))}
                    </Select>
                    {/* <FormHelperText>{fieldState.error?.message}</FormHelperText> */}
                  </FormControl>
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Controller
                name='paradas'
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    disabled={shouldDisable}
                    // required
                    fullWidth
                    label='Paradas'
                    error={!!fieldState.error}
                    // helperText={fieldState.error?.message}
                    slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
                    onChange={(e) => {
                      const formatted = f.formatOnlyNumber(e.target.value);
                      setValue('paradas', formatted); // FIXME: vou tratar como numero?
                    }}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Controller
                name='pacotes'
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    disabled={shouldDisable}
                    required
                    fullWidth
                    label='Pacotes'
                    error={!!fieldState.error}
                    // helperText={fieldState.error?.message}
                    slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
                    onChange={(e) => {
                      const formatted = f.formatOnlyNumber(e.target.value);
                      setValue('pacotes', formatted); // FIXME: vou tratar como numero?
                    }}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Controller
                name='pontos'
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    disabled={shouldDisable}
                    required
                    fullWidth
                    label='Pontos'
                    error={!!fieldState.error}
                    // helperText={fieldState.error?.message}
                    slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
                    onChange={(e) => {
                      const formatted = f.formatOnlyNumber(e.target.value);
                      setValue('pontos', formatted); // FIXME: vou tratar como numero?
                    }}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Controller
                name='qtdKm'
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    disabled={shouldDisable}
                    required
                    fullWidth
                    label='Quantidade KM'
                    error={!!fieldState.error}
                    // helperText={fieldState.error?.message}
                    slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
                    onChange={(e) => {
                      const formatted = f.formatOnlyNumber(e.target.value);
                      setValue('qtdKm', formatted); // FIXME: vou tratar como numero?
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </CustomTabPanel>

        {/* FINANCEIRO */}

        <CustomTabPanel value={tabValue} index={1}>
          <Grid container p={2} spacing={6}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Controller
                name='valorDiaria'
                control={control}
                render={({ field, fieldState }) => (
                  <FormControl
                    fullWidth
                    //
                    error={!!fieldState.error}
                  >
                    <InputLabel
                      htmlFor='outlined-adornment-amount'
                      // shrink={Boolean(field.value)}
                    >
                      Diária
                    </InputLabel>
                    <OutlinedInput
                      {...field}
                      // disabled={shouldDisable}
                      disabled
                      id='outlined-adornment-amount'
                      startAdornment={
                        <InputAdornment position='start'>R$</InputAdornment>
                      }
                      label='Diária'
                      onChange={(e) => {
                        const formatted = f.formatMoney(e.target.value);
                        setValue('valorDiaria', formatted);
                      }}
                    />
                    {/* {fieldState.error && (
                      <FormHelperText error>
                        {fieldState.error.message}
                      </FormHelperText>
                    )} */}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Controller
                name='valorBonusParada'
                control={control}
                render={({ field, fieldState }) => (
                  <FormControl fullWidth error={!!fieldState.error}>
                    <InputLabel
                      htmlFor='outlined-adornment-amount'
                      // shrink={Boolean(field.value)}
                    >
                      Bônus por Parada
                    </InputLabel>
                    <OutlinedInput
                      {...field}
                      // disabled={shouldDisable}
                      disabled
                      id='outlined-adornment-amount'
                      startAdornment={
                        <InputAdornment position='start'>R$</InputAdornment>
                      }
                      label='Bônus por Parada'
                      onChange={(e) => {
                        const formatted = f.formatMoney(e.target.value);
                        setValue('valorBonusParada', formatted);
                      }}
                    />
                    {/* {fieldState.error && (
                      <FormHelperText error>
                        {fieldState.error.message}
                      </FormHelperText>
                    )} */}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Controller
                name='valorBonusPorKm'
                control={control}
                render={({ field, fieldState }) => (
                  <FormControl fullWidth error={!!fieldState.error}>
                    <InputLabel
                      htmlFor='outlined-adornment-amount'
                      // shrink={Boolean(field.value)}
                    >
                      Bônus por KM
                    </InputLabel>
                    <OutlinedInput
                      {...field}
                      // disabled={shouldDisable}
                      disabled
                      id='outlined-adornment-amount'
                      startAdornment={
                        <InputAdornment position='start'>R$</InputAdornment>
                      }
                      label='Bônus por KM'
                      onChange={(e) => {
                        const formatted = f.formatMoney(e.target.value);
                        setValue('valorBonusPorKm', formatted);
                      }}
                    />
                    {/* {fieldState.error && (
                      <FormHelperText error>
                        {fieldState.error.message}
                      </FormHelperText>
                    )} */}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Controller
                name='valorAdicionalDomingoFeriado'
                control={control}
                render={({ field, fieldState }) => (
                  <FormControl fullWidth error={!!fieldState.error}>
                    <InputLabel
                      htmlFor='outlined-adornment-amount'
                      // shrink={Boolean(field.value)}
                    >
                      Adicional Domingos e Feriados
                    </InputLabel>
                    <OutlinedInput
                      {...field}
                      // disabled={shouldDisable}
                      disabled
                      id='outlined-adornment-amount'
                      startAdornment={
                        <InputAdornment position='start'>R$</InputAdornment>
                      }
                      label='Adicional Domingos e Feriados'
                      onChange={(e) => {
                        const formatted = f.formatMoney(e.target.value);
                        setValue('valorAdicionalDomingoFeriado', formatted);
                      }}
                    />
                    {/* {fieldState.error && (
                      <FormHelperText error>
                        {fieldState.error.message}
                      </FormHelperText>
                    )} */}
                  </FormControl>
                )}
              />
            </Grid>
            {/* TODO: VALIDAR SE TEVE AJUDANTE */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Controller
                name='valorAjudante'
                control={control}
                render={({ field, fieldState }) => (
                  <FormControl fullWidth error={!!fieldState.error}>
                    <InputLabel
                      htmlFor='outlined-adornment-amount'
                      // shrink={Boolean(field.value)}
                    >
                      Adicional Ajudante
                    </InputLabel>
                    <OutlinedInput
                      {...field}
                      // disabled={shouldDisable}
                      disabled
                      id='outlined-adornment-amount'
                      startAdornment={
                        <InputAdornment position='start'>R$</InputAdornment>
                      }
                      label='Adicional Ajudante'
                      onChange={(e) => {
                        const formatted = f.formatMoney(e.target.value);
                        setValue('valorAjudante', formatted);
                      }}
                    />
                    {/* {fieldState.error && (
                      <FormHelperText error>
                        {fieldState.error.message}
                      </FormHelperText>
                    )} */}
                  </FormControl>
                )}
              />
            </Grid>

            {/* TODO: cria ruse memo para definir valor no form */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Controller
                name='valorTotal'
                control={control}
                render={({ field, fieldState }) => (
                  <FormControl fullWidth error={!!fieldState.error}>
                    <InputLabel
                      htmlFor='outlined-adornment-amount'
                      // shrink={Boolean(field.value)}
                    >
                      Valor Total
                    </InputLabel>
                    <OutlinedInput
                      {...field}
                      disabled
                      id='outlined-adornment-amount'
                      startAdornment={
                        <InputAdornment position='start'>R$</InputAdornment>
                      }
                      label='Valor Total'
                    />
                    {/* {fieldState.error && (
                      <FormHelperText error>
                        {fieldState.error.message}
                      </FormHelperText>
                    )} */}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid size={12}>
              <Controller
                name='observacao'
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Observação'
                    multiline
                    rows={3}
                    error={!!fieldState.error}
                    // helperText={fieldState.error?.message}
                    slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </CustomTabPanel>

        {/* APOIO */}
        <CustomTabPanel value={tabValue} index={2}>
          <Grid container p={2} spacing={6}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Controller
                name='apoioMotorista'
                control={control}
                render={({ field, fieldState }) => (
                  <FormControl
                    disabled={shouldDisable}
                    fullWidth
                    error={!!fieldState.error}
                  >
                    <InputLabel
                      required
                      // shrink={Boolean(field.value)}
                    >
                      Apoio Motorista
                    </InputLabel>
                    <Select
                      {...field}
                      disabled={shouldDisable}
                      label='Apoio Motorista'
                    >
                      {[{ id: 1, nome: 'Joao' }].map(({ id, nome }) => (
                        <MenuItem key={id} value={id}>
                          {nome}
                        </MenuItem>
                      ))}
                    </Select>
                    {/* <FormHelperText>{fieldState.error?.message}</FormHelperText> */}
                  </FormControl>
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Controller
                name='apoioPlaca'
                control={control}
                render={({ field, fieldState }) => (
                  <FormControl
                    disabled={shouldDisable}
                    fullWidth
                    error={!!fieldState.error}
                  >
                    <InputLabel
                      required
                      // shrink={Boolean(field.value)}
                    >
                      Apoio Placa
                    </InputLabel>
                    <Select
                      {...field}
                      disabled={shouldDisable}
                      label='Apoio Placa'
                    >
                      {[{ id: 1, placa: 'LLJ-3445' }].map(({ id, placa }) => (
                        <MenuItem key={id} value={id}>
                          {placa}
                        </MenuItem>
                      ))}
                    </Select>
                    {/* <FormHelperText>{fieldState.error?.message}</FormHelperText> */}
                  </FormControl>
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Controller
                name='apoioTipoVeiculo'
                control={control}
                render={({ field, fieldState }) => (
                  <FormControl
                    disabled={shouldDisable}
                    fullWidth
                    error={!!fieldState.error}
                  >
                    <InputLabel
                    // shrink={Boolean(field.value)}
                    >
                      Apoio Tipo Veículo
                    </InputLabel>
                    <Select
                      {...field}
                      disabled={shouldDisable}
                      label='Apoio Tipo Veículo'
                    >
                      {tiposVeiculo?.map(({ id, nome }) => (
                        <MenuItem key={nome} value={id}>
                          {nome}
                        </MenuItem>
                      ))}
                    </Select>
                    {/* <FormHelperText>{fieldState.error?.message}</FormHelperText> */}
                  </FormControl>
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Controller
                name='apoioPacotes'
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    disabled={shouldDisable}
                    required
                    fullWidth
                    label='Apoio Pacotes'
                    error={!!fieldState.error}
                    // helperText={fieldState.error?.message}
                    slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
                    onChange={(e) => {
                      const formatted = f.formatOnlyNumber(e.target.value);
                      setValue('apoioPacotes', formatted); // FIXME: vou tratar como numero?
                    }}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Controller
                name='valorApoioDiaria'
                control={control}
                render={({ field, fieldState }) => (
                  <FormControl fullWidth error={!!fieldState.error}>
                    <InputLabel
                      htmlFor='outlined-adornment-amount'
                      // shrink={Boolean(field.value)}
                    >
                      Valor Apoio Diária
                    </InputLabel>
                    <OutlinedInput
                      {...field}
                      disabled={shouldDisable}
                      id='outlined-adornment-amount'
                      startAdornment={
                        <InputAdornment position='start'>R$</InputAdornment>
                      }
                      label='Valor Apoio Diária'
                      onChange={(e) => {
                        const formatted = f.formatMoney(e.target.value);
                        setValue('valorApoioDiaria', formatted);
                      }}
                    />
                    {/* {fieldState.error && (
                      <FormHelperText error>
                        {fieldState.error.message}
                      </FormHelperText>
                    )} */}
                  </FormControl>
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Controller
                name='descontarMotoristaPrincipal'
                control={control}
                render={({ field, fieldState }) => (
                  <FormControl fullWidth error={!!fieldState.error}>
                    <InputLabel
                      required
                      // shrink={Boolean(field.value)}
                    >
                      Descontar Motorista Principal
                    </InputLabel>
                    <Select
                      {...field}
                      disabled={shouldDisable}
                      label='Descontar Motorista Principal'
                    >
                      {TRUE_OU_FALSE.map(({ nome, value }) => (
                        <MenuItem key={nome} value={String(value)}>
                          {nome}
                        </MenuItem>
                      ))}
                    </Select>
                    {/* <FormHelperText>{fieldState.error?.message}</FormHelperText> */}
                  </FormControl>
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Controller
                name='valorDescontoMotorista'
                control={control}
                render={({ field, fieldState }) => (
                  <FormControl fullWidth error={!!fieldState.error}>
                    <InputLabel
                      htmlFor='outlined-adornment-amount'
                      // shrink={Boolean(field.value)}
                    >
                      Valor Desconto Motorista
                    </InputLabel>
                    <OutlinedInput
                      {...field}
                      disabled={
                        shouldDisable ||
                        watch('descontarMotoristaPrincipal') == false
                      }
                      id='outlined-adornment-amount'
                      startAdornment={
                        <InputAdornment position='start'>R$</InputAdornment>
                      }
                      label='Valor Desconto Motorista'
                    />
                    {/* {fieldState.error && (
                      <FormHelperText error>
                        {fieldState.error.message}
                      </FormHelperText>
                    )} */}
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
        </CustomTabPanel>

        {tabValue === TAB_VALUES_ROUTES.length - 1 && (
          <FormButtons shouldDisable={shouldDisable} />
        )}
      </Paper>
    </Stack>
  );
};
