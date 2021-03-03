import React, { memo, useEffect, useState } from 'react';
import { useLazyQuery } from "@apollo/client";
//request
import { GET_PRODUCTS_BY_CATEGORY_ID } from "../../redux/requests/product.request";
//types
import {ProductType} from "../../redux/types/product.type";

type Props = {
  id: string
}

const Products: React.FC<Props> = memo(({ id }) => {
  //requests
  const [GetProductsByCategoryId, productsResponse] = useLazyQuery(GET_PRODUCTS_BY_CATEGORY_ID);
  //state
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    (async function() {
      await getProductsByCategoryId();
    })()
  }, [])

  useEffect(() => {
    if (productsResponse.data) {
      const payload = productsResponse.data.getProductsByCategoryId;
      setProducts(payload)
    }
  }, [productsResponse])

  async function getProductsByCategoryId(): Promise<void> {
    try {
      await GetProductsByCategoryId({
        variables: {
          id
        }
      })
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div
      className="flex-col flex-auto bg-white rounded shadow-md p-4 min-w-96 m-4"
    >
      <div className="flex justify-center">
        <h3 className="font-bold mb-3">Products</h3>
        <div
          className="bg-red-500 text-white flex justify-center items-center rounded-full w-8 h-5 ml-3
          transform translate-y-0.5 text-center"
        >
          <small className="font-bold text-xs mr-0.5 mb-0.5">{products.length}</small>
        </div>
      </div>
      <ul className="flex flex-wrap gap-5">
        {
          products.map((product, i) => (
            <li key={i} className="flex-col flex-1">
              <strong className="whitespace-nowrap">{product.name}</strong>
              <ul className="my-1">
                <li>
                  <p className="text-xs text-gray-500">brand</p>
                  <small>{product?.brand?.name}</small>
                </li>
              </ul>
            </li>
          ))
        }
      </ul>

    </div>
  );
})

Products.defaultProps = {
  id: ''
}

export default Products;
