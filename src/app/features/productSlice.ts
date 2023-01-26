import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { productModel, productState } from '../models/productModel'

// State where the products stored
const initialState: productState = {
    products: [],
    cart: [],
    cartView: false
}

// Check if the products fetched is the correct model type
const productTypeGuard = (object: unknown): object is productModel[] => {
    if(object !== null && typeof object === "object") {
        return "id" in object
    }

    return false
}

export const fetchProduct = createAsyncThunk("product/fetchProduct", async <T = productModel> (): Promise<T[]> => {
    const response = await axios.get("https://fe.dev.dxtr.asia/api/products").then(res => {
        return res.data
    }).catch(err => {
        if(err instanceof Error) {
            console.log(err.message)
        }
    })

    return response
})

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<productModel>) => {
            let newProduct = {
                ...action.payload,
                isFav: true
            }

            const theProduct = state.products.findIndex(product => product.id === newProduct.id)
            state.products[theProduct].isFav = true
            state.cart = state.cart.concat(newProduct) // Add Product to Cart
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            
            state.cart = state.cart.filter(product => product.id !== action.payload) // Delete Product from Cart

            const theProduct = state.products.findIndex(product => product.id === action.payload)
            state.products[theProduct].isFav = false

        },
        switchToCartView: (state, action: PayloadAction<boolean>) => {
            state.cartView = action.payload // Switch to cart View Mode
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchProduct.fulfilled, (state, action) => {

                action.payload.map(product => {
                    if(product.isFav) {
                        state.cart = state.cart.concat(product)
                    }
                })

                state.products = state.products.concat(action.payload)

            })
    }
})

export default productSlice.reducer

export const { addToCart, removeFromCart, switchToCartView } = productSlice.actions