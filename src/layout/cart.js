import React from 'react'
import ItemButton from './Item-button';
import { useDispatch, useSelector } from "react-redux";
import { addCartData } from '../components/reduxSlice/product';
import Card from 'react-bootstrap/Card';

const CartData = ({ getData, setAnchorEl, anchorElWishList }) => {
    const dispatch = useDispatch()
    const getUpdatedData = useSelector((state) => state.getProductData.getProductDetails)

    // {/* total cart balance */ }
    let subtotal = 0;
    getData?.forEach((item) => {
        subtotal = subtotal + item.producQuantity * parseInt(item.price);
    });

    // {/* total cart quantity */ }
    let subQuantityTotal = 0;
    getData?.forEach((item) => {
        subQuantityTotal = subQuantityTotal + item.producQuantity;
    });

    const deleteWishListData = (newCart, index) => {
        let updatedArray = getUpdatedData.map((item) => {
            return (newCart === item.id ? { ...item, isChecked: !item.isChecked } : item);
        });
        setAnchorEl(false);
        dispatch(addCartData(updatedArray))
    }


    return (
        <Card className="card" style={{ position: "absolute", right: "0px", zIndex: "50", }}>
            {getData?.length ? (
                <div>
                    <div style={{ marginTop: "20px", overflowY: "scroll", height: "350px" }}>

                        {getData.map((data, index) => {
                            return (
                                <Card className="card" style={{ margin: "4px", }}>
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <div>
                                            <img style={{ width: "150px" }} src={data.image} alt="Card image cap" />
                                        </div>
                                        <div className="card-body">
                                            <h6 className="card-title">{data?.name}</h6>
                                            <p className="card-text">Price: ₹ {data.price}</p>
                                            {anchorElWishList &&
                                                <i className="fas fa-trash largetrash"
                                                    style={{ color: "red", marginRight: 15, cursor: "pointer" }}
                                                    onClick={() => {
                                                        deleteWishListData(data.id, index)
                                                    }} />}
                                            <ItemButton text={'Add to Cart'}
                                                getAllProducts={getUpdatedData}
                                                data={data}
                                            />
                                        </div>
                                    </div>
                                </Card>
                            )
                        })}

                    </div>
                    <h6>Total MRP Price ( {subQuantityTotal} items ): {subtotal} </h6>
                    {!anchorElWishList &&
                        <>
                            <h6>Discount: 100 </h6>
                            <h6>Total Amount: {subtotal + 100} </h6>
                            <p style={{ fontSize: "12px", color: "#7aba69" }}>FREEJERSEY promo code ( ₹0 off ) applied.
                            </p>
                        </>
                    }
                    <div>
                        <i class="fa fa-close samllclose "
                            onClick={() => setAnchorEl(false)}
                            style={{ position: "absolute", top: 2, right: 10, fontSize: 23, cursor: "pointer", }}
                        ></i></div>
                </div>
            ) : (
                <div style={{ position: "relative", width: "20vw", height: "10vh" }}>
                    <i class="fa fa-close samllclose "
                        onClick={() => setAnchorEl(false)}
                        style={{
                            position: "absolute",
                            top: 2,
                            right: 10,
                            fontSize: 23,
                            cursor: "pointer",
                        }}
                    ></i>
                    <p style={{ margin: "10px" }}>Cart is empty</p>
                </div>
            )
            }

        </Card>
    )
}

export default CartData
