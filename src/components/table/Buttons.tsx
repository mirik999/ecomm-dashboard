import React from 'react';
import styled from 'styled-components';
import { useLocation, useHistory } from 'react-router-dom';
//components
import Button from '../common/Button';
import Flexbox from '../hoc/Flexbox';

const buttons: any = [
  {
    id: 1,
    name: 'create',
    type: 'link',
    visible: true,
    disable: 'never',
    excludeFromPage: ['/users'],
  },
  {
    id: 2,
    name: 'update',
    type: 'link',
    disable: 'non-multiple',
    excludeFromPage: [],
  },
  {
    id: 3,
    name: 'disable',
    type: 'action',
    disable: 'non-zero',
    excludeFromPage: [],
  },
  {
    id: 4,
    name: 'activate',
    type: 'action',
    disable: 'non-zero',
    excludeFromPage: [],
  },
  {
    id: 5,
    name: 'properties',
    type: 'action',
    disable: 'non-zero',
    excludeFromPage: [],
  },
  {
    id: 6,
    name: 'delete',
    type: 'action',
    disable: 'non-zero',
    excludeFromPage: [],
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
  const location = useLocation();
  const history = useHistory();

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
        .filter(
          (btn: any) =>
            !btn.excludeFromPage.includes(location.pathname)
        )
        .map((btn: any, i: number) => {
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
