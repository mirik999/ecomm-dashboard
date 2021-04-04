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

export const HeaderPanel = styled(Flexbox)`
  padding: 8px 0;
  grid-gap: 10px;
  margin: 0 0 10px 0;
`;

export const TableContainer = styled.div`
  height: calc(100vh - 320px);
  overflow: auto;
`;

export const CustomTable = styled.table`
  width: 100%;
  border-collapse: separate;
  background-color: ${({ theme }) => theme.colors.shadow};
  overflow: auto;
  white-space: nowrap;
  border-radius: 3px;

  th,
  td {
    border-radius: 3px;
  }

  th:first-child {
    border-width: 1px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.border};
    background-color: ${({ theme }) => theme.colors.thirdBackground};
    color: ${({ theme }) => theme.colors.color};
    width: 34px;
  }

  th:not(:first-child) {
    font-size: ${({ theme }) => theme.fontSize.sm + 'px'};
    border-width: 1px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.border};
    background-color: ${({ theme }) => theme.colors.thirdBackground};
    color: ${({ theme }) => theme.colors.color};
    padding: 10px 8px;
    white-space: nowrap;
  }

  tr {
    background-color: ${({ theme }) => theme.colors.thirdBackground};
  }

  td:first-child {
    border-width: 1px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.border};
    padding: 3px;

    input {
      zoom: 1.9;
    }
  }

  td:not(:first-child) {
    font-size: ${({ theme }) => theme.fontSize.md + 'px'};
    border-width: 1px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.color};
    padding: 8px;
  }
`;

export const FooterPanel = styled(Flexbox)`
  padding: 0;

  @media screen and (max-width: 800px) {
    flex-direction: column;
    align-items: flex-start;

    .pagination-wrap {
      order: -1;
    }
  }
`;
