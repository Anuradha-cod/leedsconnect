import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    getProductDetails : [],
    searchData:""

}
export const allProductDetailsSlice = createSlice({
    name : "getProductData",
    initialState,
    reducers : {
    addCartData : (state,action)=>{
           state.getProductDetails=action.payload
        
    },
    deleteCard : (state,action)=>{
        state.getProductDetails.slice(1)
     
 },
 addsearch : (state,action)=>{
    state.searchData=action.payload
 
},
   

    }

})

export const {addCartData,deleteCard,addsearch}= allProductDetailsSlice.actions

export default allProductDetailsSlice.reducer