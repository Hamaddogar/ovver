'use client';

import { Draggable } from '@hello-pangea/dnd';

// @mui
import { Box, Grid, Stack, Paper, Tooltip } from '@mui/material';
import { ReactNode } from 'react';
// components
import Iconify from 'src/components/iconify/iconify';
import { useLocales } from 'src/locales';

type Props = {
  children: ReactNode;
  actions?: ReactNode;
  index: number;
  id?: string;
};

export default function DraggablePaper({ index, id, children, actions }: Props) {
  const { t } = useLocales();

  return (
    <>
      <Draggable index={index} draggableId={id || index.toString()}>
        {(provided) => (
          <Grid {...provided.draggableProps} ref={provided.innerRef} item xs={12}>
            <Paper
              elevation={4}
              sx={{
                borderRadius: '16px',
                border: `2px solid`,
                borderColor: 'background.paper',
                '&:hover': {
                  borderColor: 'primary.main',
                },
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                rowGap={3}
                sx={{ px: 3, py: { xs: 1.5 } }}
              >
                <Stack
                  direction="row"
                  content="center"
                  sx={{ width: '100%' }}
                  alignItems="center"
                  gap={2}
                >
                  <Tooltip title={t('common.move')} leaveDelay={0}>
                    <Box
                      sx={{
                        cursor: 'grab',
                        color: 'text.secondary',
                        alignSelf: 'stretch',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      {...provided.dragHandleProps}
                    >
                      <Iconify icon="ci:drag-vertical" width={30} />
                    </Box>
                  </Tooltip>
                  {children}
                </Stack>
                {actions && <Stack direction="row">{actions}</Stack>}
              </Stack>
            </Paper>
          </Grid>
        )}
      </Draggable>
    </>
  );
}
