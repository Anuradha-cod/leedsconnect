import React, { useEffect, useMemo, useState } from "react";
import "./style.css"
import { addCartData } from "./reduxSlice/product";
import ItemButton from "../layout/Item-button";
import PaginationComponent from "../pagination";
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'



const Dashboard = () => {
  const [getAllProducts, setGetAllProducts] = useState();
  const getUpdatedData = useSelector((state) => state.getProductData.getProductDetails)
  const searchData = useSelector((state) => state.getProductData.searchData)
  const dispatch = useDispatch()

  const getProductData= async()=>{
    try {
      const response = await axios.get('https://fakestoreapi.com/products')
      let data = response.data.map((ele)=>{
        return {...ele, isChecked:false,producQuantity:0 }
      })
      setGetAllProducts(data)
    } catch (error) {
      console.log(error)
    }
  }
  // pagination feature added //
  let PageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const checkLastPage = useMemo(() => {
    let frstPgae = (currentPage - 1) * PageSize;
    let lastPage = frstPgae + PageSize;
    return getAllProducts?.slice(frstPgae, lastPage);
  }, [currentPage, getAllProducts, PageSize]);

  useEffect(()=>{
    getProductData()
  },[])
  useEffect(() => {
    if (getUpdatedData?.length > 0) {
      setGetAllProducts(getUpdatedData)
    }
  }, [getUpdatedData])

  const getWishList = (newCart) => {
    let updatedArray = getAllProducts.map((item) => {
      return (newCart === item.id ? { ...item, isChecked: !item.isChecked } : item);
    });
    dispatch(addCartData(updatedArray))
  }

  let filterData = checkLastPage?.filter((item) => {
    if (item?.title?.toLowerCase()
      .includes(searchData.toLowerCase())) { return item; }
  })
  return (
    <>
      <div className="container mt-3">
        <h2 className="text-center">Products </h2>
      </div>
      <div className="row d-flex justify-content-center align-item-center">
        {filterData?.length > 0 ? (<>
          {filterData?.map((data, index) => {
            return (
              <>
                <Card className="card" style={{ width: '18rem', margin: "5px" }} >
                  <img className="card-img-top" style={{marginTop:"5px"}} src={data.image}
                    height="150"
                    width="150"
                    alt="Card image cap" />
                  <div className="card-body">
                    <h6 className="card-title">{data?.title?.slice(0,28)}</h6>
                    <p className="card-text">Price: ₹ {data.price}</p>
                    <i
                      class="fa-solid fa-heart"
                      style={data?.isChecked ? { fontSize: "25px", cursor: "pointer", color: "red" } : { fontSize: "25px", cursor: "pointer", }}
                      onClick={() => {
                        getWishList(data.id, index)
                      }}
                    ></i>
                    <ItemButton text={'Add to Cart'}
                      getAllProducts={getAllProducts}
                      data={data}

                    />
                  </div>
                </Card>
              </>
            );
          })
          }

        </>) : (<>No Data Found </>)}

      </div>
      < div style={{
        display: "flex",
        justifyContent: 'end'
      }}>
        {filterData?.length > 0 &&
          <PaginationComponent
            total={getAllProducts.length}
            itemsPerPage={PageSize}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        }
      </div>
    </>
  );
};

export default Dashboard;
