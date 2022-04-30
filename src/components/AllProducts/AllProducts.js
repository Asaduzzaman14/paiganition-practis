import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AllProducts = () => {

  const [products, setProducts] = useState([])
  const [page, setPage] = useState([])
  const [limit, setLimit] = useState(5)
  const [totalPage, setTotalPage] = useState(0)
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`http://localhost:5000/products?page=${page}&limit=${limit}`)
      console.log(data);

      if (!data.success) {
        setProducts([])
        return toast.error(data.message)
      }


      const totalpage = data.count / limit
      setTotalPage(totalpage)
      console.log('pageNuber', totalPage);
      setProducts(data.data)
    })()

  }, [page, limit])




  return (
    <div>
      Manage all products here {products.length}

      <div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg  mx-auto">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Product name
                </th>
                <th scope="col" class="px-6 py-3">
                  Color
                </th>
                <th scope="col" class="px-6 py-3">
                  Category
                </th>
                <th scope="col" class="px-6 py-3">
                  Price
                </th>
                <th scope="col" class="px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {
                products.length ? products?.map(product => {

                  return (
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        {product.name}
                      </th>
                      <td class="px-6 py-4">
                        {

                        }
                      </td>

                      <td class="px-6 py-4">
                        ${product.price}
                      </td>
                      <td class="px-6 py-4 w-32">
                        <img src={product.image} alt="" />
                      </td>
                      <td class="px-6 py-4 text-right">
                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                      </td>
                    </tr>
                  )
                }) : <h2 className='text-2xl text-red-600'>No data found</h2>
              }

            </tbody>
          </table>

        </div>
        <div className='flex m-4 p-4 border-gray-200 justify-center'>
          {
            [...Array(totalPage).keys()].map(number => <div onClick={() => setPage(number)} className={`m-2 border-2 border-gray-700 rounded p-3 cursor-pointer ${page === number ? 'bg-white' : ''}`}>{number + 1}</div>)
          }
          <select onChange={(e) => setLimit(e.target.value)}>
            <option value="2" >2</option>
            <option value="5" selected>5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>


        </div>
      </div>
    </div >
  );
};

export default AllProducts;

// https://i.ibb.co/z66fVwm/animal-Shelter.png
// https://i.ibb.co/5YqP5tT/babySit.png
// https://i.ibb.co/dgd4y21/bird-House.png
// https://i.ibb.co/mRfbjks/child-Support.png
// https://i.ibb.co/Fs7755W/clean-Water.png