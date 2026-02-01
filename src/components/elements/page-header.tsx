import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { Box, Button, Stack, Typography } from '@mui/material';
import { GoBack } from './go-back';

interface IPageHeaderProps {
  title: string;
  subtitle: string;
  showBackButton?: boolean;
  handleAdd?: () => void;
  handleEdit?: () => void;
  handleDrawer?: () => void;
  disableEditButton?: boolean;
  disableBackButton?: boolean;
}

export const PageHeader = (props: IPageHeaderProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Stack>
        <Typography
          sx={{
            color: (theme) => theme.palette.gray[500],
            fontSize: (theme) => theme.typography.pxToRem(18),
          }}
          variant='h4'
        >
          {props.title}
        </Typography>
        <Typography
          variant='body2'
          sx={{ color: (theme) => theme.palette.gray[500] }}
        >
          {props.subtitle}
        </Typography>
      </Stack>
      <Stack direction='row' spacing={4}>
        {props.showBackButton ? (
          <GoBack disabled={props.disableBackButton} />
        ) : (
          <></>
        )}

        {props.handleEdit ? (
          <Button
            onClick={props.handleEdit}
            variant='contained'
            color='warning'
            startIcon={<EditIcon fontSize='small' />}
            disabled={props.disableEditButton}
          >
            Editar
          </Button>
        ) : (
          <></>
        )}
        {props.handleAdd ? (
          <Button
            onClick={props.handleAdd}
            variant='contained'
            startIcon={<AddIcon fontSize='small' />}
          >
            Cadastrar
          </Button>
        ) : (
          <></>
        )}
        {props.handleDrawer ? (
          <Button
            onClick={props.handleDrawer}
            variant='contained'
            startIcon={<ManageSearchIcon fontSize='small' />}
          >
            Filtros
          </Button>
        ) : (
          <></>
        )}
      </Stack>
    </Box>
  );
};
