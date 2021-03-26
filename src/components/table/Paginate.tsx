import React from 'react';
import styled from 'styled-components';
import ReactPagination from 'react-paginate';

type Props = {
  totalCount: number;
  pageRange: number;
  getPageChange: (val: any) => void;
};

const Paginate: React.FC<Props> = ({
  getPageChange,
  totalCount,
  pageRange,
}) => {
  return (
    <Container className="pagination-wrap">
      <ReactPagination
        onPageChange={getPageChange}
        pageRangeDisplayed={pageRange}
        pageCount={totalCount}
        marginPagesDisplayed={10}
        containerClassName="page-container"
        pageLinkClassName="page-link hoverable"
        previousLinkClassName="prev-link hoverable"
        nextLinkClassName="next-link hoverable"
        activeLinkClassName="active-link hoverable"
        previousLabel="prev"
        nextLabel="next"
      />
    </Container>
  );
};

export default Paginate;

Paginate.defaultProps = {
  totalCount: 0,
  pageRange: 0,
  getPageChange: () => false,
};

const Container = styled.div`
  .page-container {
    //flex justify-end items-center h-12
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 44px;
    grid-gap: 5px;
  }

  .page-link,
  .prev-link,
  .next-link {
    border-width: 2px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.success};
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.success};
    color: white;
    font-size: ${({ theme }) => theme.fontSize.sm + 'px'};
    padding: 7.6px;
    cursor: pointer;
  }

  .active-link {
    border-width: 2px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.success};
    background-color: ${({ theme }) => theme.colors.success};
    color: white;
  }
`;
