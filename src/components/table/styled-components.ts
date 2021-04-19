import styled from 'styled-components';
//components
import Flexbox from '../hoc/Flexbox';

export const Container = styled.div`
  overflow: auto;
  max-width: 100%;
  margin: 10px 0;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.secondBackground};
  border-radius: 4px;
  border-width: 2px 4px 2px 2px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.border};
`;

export const HeaderPanel = styled(Flexbox).attrs(() => ({
  className: 'gap',
}))`
  padding: 8px 0;
  margin: 0 0 10px 0;
`;

export const TableContainer = styled.div`
  height: calc(100vh - 320px);
  overflow: auto;
`;

export const FooterPanel = styled(Flexbox)`
  padding: 0;

  @media screen and (max-width: 1025px) {
    flex-direction: column;
    align-items: flex-start;

    .rs-table-pagination-toolbar {
      order: -1;
      padding-left: 0;
      padding-right: 0;
    }
  }
`;
