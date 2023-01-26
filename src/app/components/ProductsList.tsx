import { useAppDispatch, useAppSelector } from '../store'
import Rating from './Rating'
import Image from './Image'
import { GiShoppingCart } from 'react-icons/gi'
import { FaRegTrashAlt } from 'react-icons/fa'
import { addToCart, removeFromCart, switchToCartView } from '../features/productSlice'

const ProductsList = () => {

    const dispatch = useAppDispatch()
    const allProducts = useAppSelector((state) => state.product.products) // Select All Products
    const cartProducts = useAppSelector((state) => state.product.cart) // Select All Carted Products
    const cartView = useAppSelector((state) => state.product.cartView) // Access Cart View State

    const renderedProducts = allProducts.map(product => (
        <div key={product.id} className='productItem'>

            <Image product={product} />

            <div>
                {product.off? <h3 className='sale'>SALE</h3> : null}
                <h2>{product.name}</h2>
                <div>
                    <span><Rating rating={(product.rating)?.toFixed()} /></span>
                    <span>{product.reviewCount} Reviews</span>
                </div>
                <h1>
                    {
                        product.special? product.specialPrice :
                        product.off? <p><span className='actualPrice'>{product.price}</span><span>{`$${(parseInt(product.price.slice(1)) - parseInt(product.price.slice(1)) * parseInt(product.off.slice(0,2)) / 100).toString()}`}</span></p> :
                        product.price
                    }
                </h1>

                <div className='buttonContainer'>
                    <button onClick={() => dispatch(addToCart(product))}><i><GiShoppingCart /></i>Add to Cart</button>
                    <button>Buy Now</button>
                </div>

            </div>
        </div>
    ))

    const renderedCartProducts = cartProducts.map(product => (
        <div key={product.id} className='productItem'>

            <Image product={product} />

            <div>
                {product.off? <h3 className='sale'>SALE</h3> : null}
                <h2>{product.name}</h2>
                <div>
                    <span><Rating rating={(product.rating)?.toFixed()} /></span>
                    <span>{product.reviewCount} Reviews</span>
                </div>
                <h1>
                    {
                        product.special? product.specialPrice :
                        product.off? <p><span className='actualPrice'>{product.price}</span><span>{`$${(parseInt(product.price.slice(1)) - parseInt(product.price.slice(1)) * parseInt(product.off.slice(0,2)) / 100).toString()}`}</span></p> :
                        product.price
                    }
                </h1>

                <div className='buttonCartContainer'>
                    <button className='deleteBtn' onClick={() => dispatch(removeFromCart(product.id))}><i><FaRegTrashAlt /></i>Delete</button>
                    <button>Buy Now</button>
                </div>

            </div>
        </div>
    ))

  return (
    <div>
        <div className='navigation'>
            <h1 onClick={() => dispatch(switchToCartView(false))}>All Products</h1>
            <i onClick={() => dispatch(switchToCartView(true))}>
                <GiShoppingCart />
                <p>{cartProducts.length}</p>
            </i>
        </div>
        <div className='productContainer'>{cartView? renderedCartProducts : renderedProducts}</div>
    </div>
  )
}

export default ProductsList