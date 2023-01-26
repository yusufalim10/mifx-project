import {useState, useEffect, useRef} from 'react'
import { productModel } from '../models/productModel';
import imagePlaceholder from '../../assets/image-placeholder.png'
import {FaCaretSquareLeft, FaCaretSquareRight} from 'react-icons/fa'


const Image = ({product}: {product: productModel}) => {

    const [currentIndex, setCurrentIndex] = useState(0)
    const slideRef = useRef<any>()


  return (
    <div className='images'>
        <div className='imageContainer'>
            
            <div className='imageSlider' ref={slideRef} >
                
                {product.images.map((productImage, productIndex) => (
                    <div className='productImage'>
                        <img key={product.name} src={productImage} onError={(e: any) => {
                            e.currentTarget.src = imagePlaceholder;
                            e.currentTarget.onerror = null
                        }} alt={product.name} width={300} />
                    </div>
                ))}
            
            </div>


            <p className='imageIndex'>{currentIndex + 1}/{product.images.length}</p>

            <div className='nextPrev'>

                <i 
                    onClick=
                    {() => {
                        if(currentIndex === 0) {
                            setCurrentIndex(0)
                        } else {
                            setCurrentIndex(currentIndex - 1)
                            slideRef.current.className = `imageSlider slideleft${currentIndex - 1}`
                        }
                    }} 
                >
                    <FaCaretSquareLeft />
                </i>

                <i 
                    onClick=
                    {() => {
                        if(currentIndex === product.images.length - 1) {
                            setCurrentIndex(product.images.length - 1)
                        } else {
                            setCurrentIndex(currentIndex + 1)
                            slideRef.current.className = `imageSlider slideright${currentIndex + 1}`
                        }
                    }}
                
                >
                    <FaCaretSquareRight />
                </i>
            </div>

        </div>

        <div className='imagePreview'>
            {product.images.map((productImage, productIndex) => (

                <div 
                    className={productIndex === currentIndex? "productImages focused" : "productImages"} 
                    key={productIndex}
                    onClick={() => {
                        setCurrentIndex(productIndex)
                        if(currentIndex + 1 === productIndex) {
                            slideRef.current.className = `imageSlider slideright${currentIndex + 1}`
                        } else if (currentIndex - 1 === productIndex) {
                            slideRef.current.className = `imageSlider slideright${currentIndex - 1}`
                        } else if(productIndex > currentIndex) {
                            slideRef.current.className = `imageSlider slideright${currentIndex + productIndex}`
                        } else if(productIndex < currentIndex) {
                            slideRef.current.className = `imageSlider slideleft${productIndex - currentIndex}`
                        }
                    }}
                    >

                    <img src={productImage} onError={(e: any) => {
                        e.currentTarget.src = imagePlaceholder;
                        e.currentTarget.onerror = null
                    }} alt={product.name} width={50} height={50} />

                </div>

            ))}
        </div>

    </div>
  )
}

export default Image