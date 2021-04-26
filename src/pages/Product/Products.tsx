import React, { memo, useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import styled from 'styled-components';
//components
import Flexbox from '../../components/hoc/Flexbox';
//request
import { GET_PRODUCTS_BY_CATEGORY_ID } from '../../redux/requests/product.request';
//types
import { ProductType } from '../../redux/types/product.type';

type Props = {
  id: string;
};

const Products: React.FC<Props> = memo(({ id }) => {
  //requests
  const [GetProductsByCategoryId, productsResponse] = useLazyQuery(
    GET_PRODUCTS_BY_CATEGORY_ID,
  );
  //state
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    (async function () {
      await getProductsByCategoryId();
    })();
  }, []);

  useEffect(() => {
    if (productsResponse.data) {
      const payload = productsResponse.data.getProductsByCategoryId;
      setProducts(payload);
    }
  }, [productsResponse]);

  async function getProductsByCategoryId(): Promise<void> {
    try {
      await GetProductsByCategoryId({
        variables: {
          id,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container flex="column" align="start">
      <Flexbox cls="header np" justify="between">
        <h3>Products</h3>
        <Flexbox cls="np count-wrap" justify="end">
          <small>{products.length}</small>
        </Flexbox>
      </Flexbox>
      {products.length ? (
        <table>
          <thead>
            <tr>
              <th>Product name</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <tr key={i}>
                <td>{product.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <span className="no-data">No products added</span>
      )}
    </Container>
  );
});

Products.defaultProps = {
  id: '',
};

export default Products;

const Container = styled(Flexbox)`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 6px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.lightBorder};
  padding: 10px;
  min-width: 300px;
  flex: 1;

  .header {
    min-height: 40px !important;
    border-width: 0 0 1px 0;
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
        background-color: ${({ theme }) => theme.colors.warning};
        color: white;
        border-radius: 5px;
        width: 20px;
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
      border-color: transparent;
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
