import React, { memo, useEffect, useState } from 'react';
import { useLazyQuery } from "@apollo/client";
import { useLocation } from 'react-router-dom';
//request
import {GET_BRANDS_BY_CATEGORY_ID} from "../../redux/requests/brand.request";
//types
import { BrandType } from "../../redux/types/brand.type";

type Props = {
  id: string
}

const Brands: React.FC<Props> = memo(({ id }) => {
  const location = useLocation();
  //requests
  const [GetBrandsByCategoryId, brandsResponse] = useLazyQuery(GET_BRANDS_BY_CATEGORY_ID);
  //state
  const [brands, setBrands] = useState<BrandType[]>([]);

  useEffect(() => {
    (async function() {
      await getBrandsByCategoryId();
    })()
  }, [])

  useEffect(() => {
    if (brandsResponse.data) {
      const payload = brandsResponse.data.getBrandsByCategoryId;
      setBrands(payload)
    }
  }, [brandsResponse])

  async function getBrandsByCategoryId(): Promise<void> {
    try {
      await GetBrandsByCategoryId({
        variables: {
          id
        }
      })
    } catch(err) {
      console.log(err)
    }
  }

  console.log(brands)

  return (
    <div
      className="flex-col bg-white rounded shadow-md p-4 w-96 m-4"
    >
      <div className="flex justify-center">
        <h3 className="font-bold">Brands</h3>
      </div>
      <ul>
        {
          brands.map((brand, i) => (
            <li key={i} className="flex-col">
              <strong>{brand.name}</strong>
              <ul className="transform translate-x-4 my-2">
                <li>
                  <small className="text-gray-500">categories</small>
                </li>
                {
                  brand.category.map((cat: any, idx) => (
                    <li key={idx}>
                      {cat.name}
                    </li>
                  ))
                }
              </ul>
            </li>
          ))
        }
      </ul>

    </div>
  );
})

Brands.defaultProps = {}

export default Brands;
