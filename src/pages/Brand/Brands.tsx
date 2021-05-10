import React, { memo, useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import styled from 'styled-components';
//components
import Flexbox from '../../components/hoc/Flexbox';
import TableForView from '../../components/common/table/TableForView';
//graphql
import { GET_BRANDS_BY_CATEGORY_ID } from '../../redux/requests/brand.request';
//types
import { BrandType } from '../../redux/types/brand.type';

type Props = {
  id: string;
};

const Brands: React.FC<Props> = memo(({ id }) => {
  //graphql
  const [GetBrandsByCategoryId, brandsResponse] = useLazyQuery(
    GET_BRANDS_BY_CATEGORY_ID,
  );
  //state
  const [brands, setBrands] = useState<BrandType[]>([]);

  useEffect(() => {
    (async function () {
      await getBrandsByCategoryId();
    })();
  }, []);

  useEffect(() => {
    if (brandsResponse.data) {
      const payload = brandsResponse.data.getBrandsByCategoryId;
      setBrands(payload);
    }
  }, [brandsResponse]);

  async function getBrandsByCategoryId(): Promise<void> {
    try {
      await GetBrandsByCategoryId({
        variables: {
          id,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container flex="column" justify="start">
      <Flexbox cls="header np" justify="between">
        <h3>Brands</h3>
        <Flexbox cls="np count-wrap" justify="end">
          <small>{brands.length}</small>
        </Flexbox>
      </Flexbox>
      <TableForView data={brands} allCount={brands.length} height={200} />
    </Container>
  );
});

Brands.defaultProps = {};

export default Brands;

const Container = styled(Flexbox)`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 4px;
  border-width: 2px 4px 2px 2px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.lightBorder};
  padding: 10px;
  min-width: 300px;
  max-width: 500px;

  .header {
    min-height: 40px !important;
    border-width: 0 0 2px 0;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.lightBorder};

    h3 {
      font-weight: bold;
      margin: 0;
    }

    .count-wrap {
      small {
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${({ theme }) => theme.colors.color};
        border-radius: 5px;
        width: 40px;
        height: 20px;
        text-align: center;
        font-weight: bold;
        font-size: ${({ theme }) => theme.fontSize.xs + 'px'};
      }
    }
  }

  table {
    width: 100%;
    border-collapse: separate;
    overflow: auto;
    white-space: nowrap;
    border-radius: 3px;

    th,
    td {
      text-align: left;
      border-width: 1px;
      border-style: solid;
      border-color: ${({ theme }) => theme.colors.lightBorder};
      padding: 3px;
    }
  }

  .no-data {
    display: block;
    margin-top: 10px;
  }

  @media (max-width: 789px) {
    max-width: 100%;
  }
`;
