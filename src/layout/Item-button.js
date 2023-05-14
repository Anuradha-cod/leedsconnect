import React from 'react'
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify'
import { addCartData } from "../components/reduxSlice/product.js";

const ItemButton = ({ text, getAllProducts, data }) => {
  const dispatch = useDispatch()

  const handleIncrement = (newCart) => {
    dispatch(addCartData(getAllProducts?.map((item) =>
      newCart === item.id ? { ...item, producQuantity: item.producQuantity + 1 } : item
    )))
    toast.info("products have been added")
  }

  const handleDecrement = (newCart) => {
    dispatch(addCartData(getAllProducts?.map((item) =>
      newCart === item.id ? { ...item, producQuantity: item.producQuantity - 1 } : item
    )))
    toast.info("Product removed from Cart")
  }
  return (
    <div className="button_div d-flex align-item-center justify-content-center">
      {data?.producQuantity === 0 ? (
        <button type="button" className="btn btn-primary"
          onClick={() => { handleIncrement(data.id) }}
          style={{ width: "20vw", }}
        >{text}</button>
      ) : (
        <div style={{
          width: "20vw",
          display: "flex",
          justifyContent: "space-between",
          marginLeft: " -10px",
        }}>
          <button type="button" class="btn btn-outline-secondary"
            onClick={() => handleDecrement((data?.id))}
          >
            -
          </button><span className="spanCount">{data?.producQuantity}</span>
          <button type="button" className="btn btn-primary"
            onClick={() => { handleIncrement(data.id) }}
          >
            +
          </button>
        </div>
      )}

    </div>
  )
}

export default ItemButton
