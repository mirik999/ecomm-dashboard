import React, { memo, useEffect, useState } from 'react';
import { useLazyQuery } from "@apollo/client";
//request
import {GET_BRANDS_BY_CATEGORY_ID} from "../../redux/requests/brand.request";
//types
import { BrandType } from "../../redux/types/brand.type";

type Props = {
  id: string
}

const Brands: React.FC<Props> = memo(({ id }) => {
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

  return (
    <div
      className="flex-col bg-white rounded shadow-md p-4 w-96 m-4"
    >
      <div className="flex justify-center">
        <h3 className="font-bold mb-3">Brands</h3>
        <div
          className="bg-red-500 text-white flex justify-center items-center rounded-full w-8 h-5 ml-3
          transform translate-y-0.5 text-center"
        >
          <small className="font-bold text-xs mr-0.5 mb-0.5">{brands.length}</small>
        </div>
      </div>
      <ul className="flex flex-wrap gap-5">
        {
          brands.map((brand, i) => (
            <li key={i} className="flex-col flex-1">
              <strong className="">{brand.name}</strong>
              <ul className="my-1">
                <li>
                  <p className="text-xs text-gray-500 whitespace-nowrap">other categories</p>
                </li>
                {
                  brand.category.map((cat: any, idx) => {
                    if (cat.id !== id) {
                      return (
                        <li key={idx}>
                          <small>{cat.name}</small>
                        </li>
                      )
                    }
                    return '';
                  })
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
