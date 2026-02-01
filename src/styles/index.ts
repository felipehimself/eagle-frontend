import React from 'react';

export const tableHeadRowStyle = {
  borderTop: '2px solid rgba(0, 0, 0, 0.12)',
  borderRight: '2px solid rgba(0, 0, 0, 0.12)',
  borderRadius: '2px',
  borderWidth: '2px',
};

export const tableHeadCellStyle = {
  borderRight: '2px solid rgba(0, 0, 0, 0.05)',
  borderRadius: '2px',
  borderWidth: '2px',
};

export const truncCell: React.CSSProperties = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
};
