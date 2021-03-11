import styled from 'styled-components';
//components
import Flexbox from '../layout/Flexbox';

export const Container = styled.div``;

export const HeaderPanel = styled(Flexbox)`
  padding: 8px 0;
  grid-gap: 10px;
  margin: 10px 0;
`;

export const TableContainer = styled.div`
  height: calc(100vh - 300px);
  overflow: auto;
  max-width: 100%;
  margin-bottom: 10px;
`;

export const CustomTable = styled.table`
  width: 100%;
  border-collapse: separate;
  background-color: ${({ theme }) => theme.colors.shadow};
  overflow: auto;
  white-space: nowrap;

  th:first-child {
    border-width: 1px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.border};
    background-color: ${({ theme }) => theme.colors.main};
    color: ${({ theme }) => theme.colors.white};
    width: 34px;
  }

  th:not(:first-child) {
    font-size: ${({ theme }) => theme.fontSize.xs + 'px'};
    border-width: 1px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.border};
    background-color: ${({ theme }) => theme.colors.main};
    color: ${({ theme }) => theme.colors.white};
    padding: 10px 8px;
    white-space: nowrap;
  }

  tr {
    background-color: ${({ theme }) => theme.colors.background};

    &:nth-child(even) {
      background-color: ${({ theme }) => theme.colors.white};
    }
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
    font-size: ${({ theme }) => theme.fontSize.xs + 'px'};
    border-width: 1px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.border};
    padding: 8px;
  }
`;

export const FooterPanel = styled(Flexbox)``;
