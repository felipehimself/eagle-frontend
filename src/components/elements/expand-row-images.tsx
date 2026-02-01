import { TCloudinaryFile } from '@/types';
import { DeleteForever } from '@mui/icons-material';
import { Box, CardMedia, Grid, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { PhotoView } from 'react-photo-view';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from './expand-rows-utils';

type TExpandRowProps = {
  title: string;
  content: TCloudinaryFile[];
  onDelete: (img: TCloudinaryFile) => void;
  disabled: boolean;
};

export const ExpandRowImages = (props: TExpandRowProps) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const handleDelete = (img: TCloudinaryFile) => {
    props.onDelete(img);
  };

  return (
    <Accordion
      key={props.title}
      expanded={expanded === 'panel1'}
      onChange={handleChange('panel1')}
    >
      <AccordionSummary
        aria-controls='panel1d-content'
        id='panel1d-header'
        sx={{
          '.MuiAccordionSummary-content': {
            margin: '0px !important',
          },
        }}
      >
        <Typography
          component='span'
          sx={{
            color: (theme) => theme.palette.gray[500],
            marginLeft: '5px',
            fontSize: (theme) => theme.typography.pxToRem(14),
          }}
        >
          {props.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ overflowY: 'auto', maxHeight: '50vh' }}>
        <Grid container spacing={2}>
          {props.content
            .filter((img) => !img.hidden)
            .map((img) => {
              return (
                // triggers={['onDoubleClick']}
                <PhotoView key={img.secureUrl} src={img.secureUrl}>
                  <Grid size={{ xs: 6, md: 2 }} sx={{ position: 'relative' }}>
                    <CardMedia
                      sx={{
                        objectFit: 'cover',
                        borderRadius: 1,
                        height: 140,
                        width: '100%',
                        cursor: 'pointer',
                        filter: 'brightness(0.8)',
                        transition: 'filter 0.3s ease-in-out',
                        '&:hover': {
                          filter: 'brightness(1)',
                        },
                      }}
                      image={img.secureUrl}
                    />
                    <Box
                      onClick={(e) => e.stopPropagation()}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        borderBottomLeftRadius: 1,
                        height: '1.4rem',
                        background: (theme) => theme.palette.background.paper,
                      }}
                    >
                      <Tooltip title={props.disabled ? '' : 'Remover'}>
                        <DeleteForever
                          onChange={(e) => e.stopPropagation()}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (props.disabled) return;
                            handleDelete(img);
                          }}
                          sx={{ p: 0, cursor: 'pointer' }}
                          fontSize='small'
                          color={props.disabled ? 'disabled' : 'error'}
                        />
                      </Tooltip>
                    </Box>
                  </Grid>
                </PhotoView>
              );
            })}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
