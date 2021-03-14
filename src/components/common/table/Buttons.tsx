import React from 'react';
import styled from 'styled-components';
//components
import Button from '../Button';
import Flexbox from '../layout/Flexbox';

const buttons = [
  {
    id: 1,
    name: 'create',
    type: 'link',
    disable: 'never',
    roles: ['admin', 'sudo'],
  },
  {
    id: 2,
    name: 'update',
    type: 'link',
    disable: 'non-multiple',
    roles: ['admin', 'sudo'],
  },
  {
    id: 3,
    name: 'disable',
    type: 'action',
    disable: 'non-zero',
    roles: ['admin', 'sudo'],
  },
  {
    id: 4,
    name: 'activate',
    type: 'action',
    disable: 'non-zero',
    roles: ['admin', 'sudo'],
  },
  {
    id: 5,
    name: 'properties',
    type: 'action',
    disable: 'non-zero',
    roles: ['admin', 'sudo'],
  },
  {
    id: 6,
    name: 'delete',
    type: 'action',
    disable: 'non-zero',
    roles: ['sudo'],
  },
];

type Props = {
  selected: any[];
  roles: string[];
  getIds: (id: string[], action: string) => void;
  onRouteChange: (route: string) => void;
};

const Buttons: React.FC<Props> = ({
  selected,
  getIds,
  roles,
  onRouteChange,
}) => {
  function handleDisabling(btn: any): boolean {
    return btn.disable === 'non-multiple'
      ? selected.length !== 1
      : btn.disable === 'non-zero'
      ? selected.length === 0
      : false;
  }

  return (
    <Container>
      {buttons
        .filter((btn) => btn.roles.some((b) => roles.includes(b)))
        .map((btn, i) => {
          return (
            <Button
              type="success"
              key={i}
              label={btn.name}
              onAction={() => {
                btn.type === 'link'
                  ? onRouteChange(btn.name)
                  : getIds(
                      selected.map((s) => s.id),
                      btn.name,
                    );
              }}
              disabled={handleDisabling(btn)}
            />
          );
        })}
    </Container>
  );
};

Buttons.defaultProps = {
  selected: [],
};

export default Buttons;

const Container = styled(Flexbox)`
  padding: 8px 0;
  grid-gap: 10px;

  @media screen and (max-width: 501px) {
    div {
      width: 100% !important;
      button {
        width: 100% !important;
      }
    }
  }
`;
