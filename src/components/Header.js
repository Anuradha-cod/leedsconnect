import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addsearch } from './reduxSlice/product'
import CartData from "../layout/cart";
const Header = () => {
  const getUpdatedData = useSelector((state) => state.getProductData.getProductDetails)
  const [getData, setGetData] = useState()
  const [getWishList, setGetWishList] = useState()
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(false);
  const [anchorElWishList, setAnchorElWishList] = useState(false);

  useEffect(() => {
    if (getUpdatedData) {
      setGetData(getUpdatedData?.filter((data) => data.producQuantity > 0))
      setGetWishList(getUpdatedData.filter((data) => data.isChecked === true))
    }
  }, [getUpdatedData])
  return (
    <>
      <div>
      </div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link to="/" className="text-decoration-none text-light">
              E-Commerce
            </Nav.Link>
            <Nav.Link to="/" className="text-decoration-none text-light">
              <input
                placeholder='Search...'
                onChange={(e) => dispatch(addsearch(e.target.value))}
              />
            </Nav.Link>
          </Nav>
            {/********************************************************Showing  wishlist Cart ******************************************************************/}
          <div style={{ position: "relative" }}>
              <div >
              {getWishList?.length >0 &&
                <p style={{position:"absolute" , background:"#0d6efd", borderRadius:"50%", width:"20px", height:"20px", top:"-10px", right:"-6px", textAlign:"center"}}>{getWishList?.length}</p>
              }
                <i
              onClick={() => setAnchorElWishList(true)}
                  class="fa-solid fa-heart text-light"
                  style={{ fontSize: "25px", cursor: "pointer", }}
                ></i>
              </div>
            {anchorElWishList &&
              <CartData
              anchorElWishList={anchorElWishList}
                setAnchorEl={setAnchorElWishList}
                getData={getWishList}
              />
            }
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;
           {/********************************************************Showing  Add to cart ******************************************************************/}
          <div style={{ position: "relative" }}>
              <div >
              {getData?.length >0 &&
                <p style={{position:"absolute" , background:"#0d6efd", borderRadius:"50%", width:"20px", height:"20px", top:"-10px", right:"-6px", textAlign:"center"}}>{getData?.length}</p>
              }
                <i
                  class="fa-solid fa-cart-shopping text-light"
              onClick={() => setAnchorEl(true)}
                  style={{ fontSize: "25px", cursor: "pointer", }}
                ></i>
              </div>
           
            {anchorEl &&
              <CartData
                setAnchorEl={setAnchorEl}
                getData={getData}
              />
            }
          </div>
        </Container>

      </Navbar>
    </>
  );
};

export default Header;
