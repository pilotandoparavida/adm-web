import React from 'react';
import {
    Table,
  } from '@devexpress/dx-react-grid-material-ui';

const EstadoCellBase = ({ value, style, ...restProps }) => (
  <Table.Cell
    {...restProps}
  >
    <span
      style={{
        color: value === "CONFIRMADO" ? 'green' : 
                (
                    value === "INSCRITO" ? 'blue' : 'red'
                ),
      }}
    >
      {value}
    </span>
  </Table.Cell>
);

export const EstadoCell = EstadoCellBase;