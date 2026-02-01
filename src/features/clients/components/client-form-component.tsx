import { useGetLogradouroPorCEP } from '@/api/get-logradouro-por-cep';
import { useGetRegions } from '@/api/get-regions';
import { useGetUFs } from '@/api/get-ufs';
import { AutocompleteArrayShowNamesGetIds } from '@/components/elements';
import { CustomTabPanel } from '@/components/elements/custom-tab-panel';
import { CustomTabs } from '@/components/elements/custom-tabs';
import { TabsLoading } from '@/components/elements/tabs-loading';
import { CEP_LENGTH_COM_SEPARADOR, TRUE_OU_FALSE } from '@/constants';
import { TRegionSchema } from '@/features/regions/types/regions.type';
import { TFormComponent } from '@/types';
import { Formatter, initialValueTrueOrFalseField } from '@/utils/common';
import { zodResolver } from '@hookform/resolvers/zod';
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
  useState,
} from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { clientSchema, TClientSchema } from '../types/client.type';

const TABS_VALUES = ['Cliente'];

const f = new Formatter();

export const ClientFormComponent = forwardRef(
  (props: TFormComponent<TClientSchema>, ref) => {
    const [tabValue, setTabValue] = useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
      setTabValue(newValue);
    };

    const {
      handleSubmit,
      formState: { errors },
      control,
      watch,
      setValue,
      reset,
    } = useForm<TClientSchema>({
      resolver: zodResolver(clientSchema),
      defaultValues: props.initialData || {},
    });

    useImperativeHandle(ref, () => ({
      resetForm: () => {
        reset(props.initialData);
      },
    }));

    useEffect(() => {
      if (props.initialData) {
        reset(props.initialData);
      }
    }, [props.initialData, reset]);

    const { data: regions, isLoading: isLoadingRegions } = useGetRegions({
      config: {
        select: (data) =>
          data
            .sort((a, b) => a.nome.localeCompare(b.nome))
            .filter((r) => r.ativo),
      },
    });

    const { data: UFS_RESP } = useGetUFs({});

    const navigate = useNavigate();

    const onSubmit = (data: TClientSchema) => {
      props.onSubmit(data);
    };

    const enderecoCEP = watch('cep');

    const { isLoading: isLoadingLogradouroData } = useGetLogradouroPorCEP({
      config: {
        enabled:
          Boolean(enderecoCEP) &&
          enderecoCEP?.length === CEP_LENGTH_COM_SEPARADOR,
        onSuccess: (data) => {
          setValue('logradouro', data.logradouro);
          setValue('complemento', data.complemento);
          setValue('uf', data.uf);
          setValue('bairro', data.bairro);
          setValue('municipio', data.localidade);
        },
      },
      cep: enderecoCEP ? enderecoCEP.replace('-', '') : '',
    });

    const renderLocationFields = useCallback(() => {
      const flex = watch('flex') as unknown as string;

      if (flex === undefined) return <></>;

      if (!JSON.parse(flex))
        return (
          <>
            <Grid size={{ xs: 12, md: 6 }}>
              {isLoadingRegions ? (
                <Skeleton />
              ) : (
                <AutocompleteArrayShowNamesGetIds
                  control={control}
                  data={(regions as Required<TRegionSchema>[]) || []}
                  label='Região'
                  name='regioesBaseId'
                  disabled={props.isSubmitting || props.shouldDisable}
                />
              )}
            </Grid>
          </>
        );

      return (
        <>
          <Grid size={{ xs: 12, md: 2 }}>
            <Controller
              name='cep'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label='CEP'
                  error={!!errors?.cep || !!errors?.endereco}
                  value={field.value || ''}
                  slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
                  disabled={props.isSubmitting || props.shouldDisable}
                  onChange={(e) => {
                    const formatted = f.formatCEP(e.target.value);
                    setValue('cep', formatted);
                  }}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Controller
              name='logradouro'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Logradouro'
                  fullWidth
                  disabled={
                    isLoadingLogradouroData ||
                    props.isSubmitting ||
                    props.shouldDisable
                  }
                  value={field.value || ''}
                  error={!!errors?.logradouro || !!errors?.endereco}
                  slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Controller
              name='numero'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label='Número'
                  error={!!errors?.numero || !!errors?.endereco}
                  slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
                  disabled={props.isSubmitting || props.shouldDisable}
                  value={field.value || ''}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Controller
              name='complemento'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Complemento'
                  fullWidth
                  disabled={
                    isLoadingLogradouroData ||
                    props.isSubmitting ||
                    props.shouldDisable
                  }
                  value={field.value || ''}
                  error={!!errors?.complemento}
                  slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth error={!!errors?.uf || !!errors?.endereco}>
              <InputLabel>UF</InputLabel>
              <Controller
                name='uf'
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value || ''}
                    label='UF'
                    disabled={
                      isLoadingLogradouroData ||
                      props.isSubmitting ||
                      props.shouldDisable
                    }
                  >
                    {UFS_RESP?.map(({ sigla }) => (
                      <MenuItem key={sigla} value={sigla}>
                        {sigla}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Controller
              name='bairro'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Bairro'
                  fullWidth
                  disabled={
                    isLoadingLogradouroData ||
                    props.isSubmitting ||
                    props.shouldDisable
                  }
                  value={field.value || ''}
                  error={!!errors?.bairro || !!errors?.endereco}
                  slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name='municipio'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Município'
                  fullWidth
                  disabled={
                    isLoadingLogradouroData ||
                    props.isSubmitting ||
                    props.shouldDisable
                  }
                  value={field.value || ''}
                  error={!!errors?.municipio || !!errors?.endereco}
                  slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
                />
              )}
            />
          </Grid>
        </>
      );
    }, [
      watch,
      regions,
      control,
      // errors?.regioesBaseId,
      isLoadingRegions,
      UFS_RESP,
      props.shouldDisable,
      props.isSubmitting,
      errors?.bairro,
      errors?.cep,
      errors?.complemento,
      errors?.logradouro,
      errors?.municipio,
      errors?.numero,
      errors?.uf,
      errors?.endereco,
      isLoadingLogradouroData,
      setValue,
    ]);

    if (props.isLoading) {
      return <TabsLoading />;
    }

    return (
      <Paper
        component='form'
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ py: 2, pb: 2 }}
      >
        <CustomTabs
          fullWidth='standard'
          value={tabValue}
          handleChange={handleChange}
          tabLabels={TABS_VALUES}
        />

        <CustomTabPanel value={tabValue} index={0}>
          <Grid container p={2} spacing={6}>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth error={!!errors?.flex}>
                <InputLabel>Flex</InputLabel>
                <Controller
                  name='flex'
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={initialValueTrueOrFalseField(field.value)}
                      label='Flex'
                      disabled={props.isSubmitting || props.shouldDisable}
                      onChange={(e) => {
                        setValue('flex', JSON.parse(e.target.value as string));
                        setValue('regioesBaseId', undefined);
                        setValue('cep', undefined);
                        setValue('logradouro', undefined);
                        setValue('bairro', undefined);
                        setValue('municipio', undefined);
                        setValue('uf', undefined);
                        setValue('numero', undefined);
                        setValue('complemento', undefined);
                      }}
                    >
                      {TRUE_OU_FALSE.map(({ nome, value }) => (
                        <MenuItem key={nome} value={String(value)}>
                          {nome}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name='nome'
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label='Nome'
                    value={field.value || ''}
                    fullWidth={true}
                    disabled={props.isSubmitting || props.shouldDisable}
                    error={!!fieldState.error}
                    onChange={(e) =>
                      field.onChange(e.target.value.toUpperCase())
                    }
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name='cnpj'
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    disabled={props.isSubmitting || props.shouldDisable}
                    fullWidth
                    label='CNPJ'
                    placeholder='XX.XXX.XXX/XXXX-XX'
                    error={!!fieldState.error}
                    value={field.value || ''}
                    // helperText={fieldState.error?.message}
                    onChange={(e) => {
                      const value = e.target.value;
                      const formattedValue = f.formatCNPJ(value);
                      setValue('cnpj', formattedValue);
                    }}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name='email'
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    disabled={props.isSubmitting || props.shouldDisable}
                    fullWidth
                    label='Email'
                    error={!!fieldState.error}
                    value={field.value || ''}
                    // helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name='telefone'
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    disabled={props.isSubmitting || props.shouldDisable}
                    fullWidth
                    label='Telefone'
                    placeholder='(XX) XXXXX-XXXX'
                    error={!!fieldState.error}
                    value={field.value || ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      const formattedValue = f.formatPhone(value);
                      setValue('telefone', formattedValue);
                    }}
                    // helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <>{renderLocationFields()}</>
          </Grid>
        </CustomTabPanel>

        {tabValue === TABS_VALUES.length - 1 && (
          <Stack
            direction='row'
            spacing={2}
            justifyContent='flex-end'
            pr={6}
            pt={1}
            pb={2}
          >
            <Button
              variant='contained'
              color='error'
              type='button'
              onClick={() => navigate(-1)}
              disabled={props.isSubmitting || props.shouldDisable}
            >
              Cancelar
            </Button>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              disabled={props.isSubmitting || props.shouldDisable}
            >
              Salvar
            </Button>
          </Stack>
        )}
      </Paper>
    );
  },
);
