import { TCloudinaryFile } from '@/types';
import { normalizeStr } from '@/utils';
import { DeleteForever, PictureAsPdf } from '@mui/icons-material';
import { Stack, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from './expand-rows-utils';

type TExpandPDFsProps = {
  title: string;
  content: TCloudinaryFile[];
  onDelete: (pdf: TCloudinaryFile) => void;
  disabled: boolean;
};

export const ExpandRowPDFS = (props: TExpandPDFsProps) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const handleDelete = (pdf: TCloudinaryFile) => {
    props.onDelete(pdf);
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
        <Stack spacing={2} alignItems='flex-start'>
          {props.content
            .filter((pdf) => !pdf.hidden)
            .map((item) => (
              <Stack
                direction='row'
                key={item.secureUrl}
                sx={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: 1,
                  padding: 1,
                  paddingRight: 4,
                  backgroundColor: '#f5f5f5',
                  display: 'flex',
                  gap: 2,
                }}
              >
                <Typography
                  component='a'
                  href={item.secureUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  sx={{
                    textDecoration: 'none',
                    color: '#1a1a1a',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <PictureAsPdf fontSize='small' />
                  <Tooltip title={normalizeStr(item.secureUrl, 'blob:')}>
                    <span>
                      PDF -{' '}
                      {normalizeStr(item.secureUrl, 'blob:')?.slice(0, 80) +
                        '...'}
                    </span>
                  </Tooltip>
                </Typography>
                <Tooltip title={props.disabled ? '' : 'Remover'}>
                  <DeleteForever
                    onChange={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (props.disabled) return;
                      handleDelete(item);
                    }}
                    sx={{ p: 0, cursor: 'pointer' }}
                    fontSize='small'
                    color={props.disabled ? 'disabled' : 'error'}
                  />
                </Tooltip>
              </Stack>
            ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};
