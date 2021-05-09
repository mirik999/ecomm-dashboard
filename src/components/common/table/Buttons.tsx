import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { ButtonToolbar } from 'rsuite';
//components
import Flexbox from '../../hoc/Flexbox';
import Button from '../Button';

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
  getIds: (id: string[], action: string) => void;
  onRouteChange: (route: string) => void;
};

const Buttons: React.FC<Props> = ({ selected, getIds, onRouteChange }) => {
  const location = useLocation();

  function handleDisabling(btn: any): boolean {
    return btn.disable === 'non-multiple'
      ? selected.length !== 1
      : btn.disable === 'non-zero'
      ? selected.length === 0
      : false;
  }

  return (
    <Container>
      <ButtonToolbar>
        {buttons
          .filter(
            (btn: any) => !btn.excludeFromPage.includes(location.pathname),
          )
          .map((btn: any, i: number) => {
            return (
              <Button
                appearance="primary"
                key={i}
                label={btn.name}
                onAction={() => {
                  btn.type === 'link'
                    ? onRouteChange(btn.name)
                    : getIds(selected, btn.name);
                }}
                disabled={handleDisabling(btn)}
              />
            );
          })}
      </ButtonToolbar>
    </Container>
  );
};

Buttons.defaultProps = {
  selected: [],
};

export default Buttons;

const Container = styled(Flexbox)`
  padding: 8px 0;
  gap: 10px;

  @media screen and (max-width: 660px) {
    .rs-btn-toolbar {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;

      button {
        margin: 0 !important;
      }
    }
  }
`;
