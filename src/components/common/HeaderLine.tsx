import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
//components
import BorderedBox from '../hoc/BorderedBox';
import Flexbox from '../hoc/Flexbox';

type Props = {
  label: string;
  goBack?: boolean;
};

const HeaderLine: React.FC<Props> = ({ label, goBack }) => {
  const history = useHistory();

  return (
    <BorderedBox>
      <HeaderPanel justify="between">
        <h2>{label}</h2>
        {goBack ? (
          <h2 onClick={() => history.goBack()} className="hoverable">
            Go Back
          </h2>
        ) : (
          <h2 />
        )}
      </HeaderPanel>
    </BorderedBox>
  );
};

export default HeaderLine;

HeaderLine.defaultProps = {
  label: 'Section',
  goBack: false,
};

const HeaderPanel = styled(Flexbox)`
  padding: 0;

  h2 {
    font-size: ${({ theme }) => theme.fontSize.md + 'px'};
    color: ${({ theme }) => theme.colors.warning};
    text-transform: uppercase;
  }

  h2:last-child {
    cursor: pointer;
  }
`;
