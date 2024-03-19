import { useContext, useEffect, useState } from "react"
import { CartContext, ResetProductContext } from "../utils/contexts"
import writable from "@/utils/writable"

export default function ProductItem({productProps}) {
    const [showOverlay, setShowOverlay] = useState(false)
    const {cart, setCart} = useContext(CartContext)
    const {productToReset, setProductToReset} = useContext(ResetProductContext)
    const [qty, setQty] = useState(0)
    
   function handleIncreaseQtyProduct(productParam) {
        const nextQty = qty + 1
        setQty(nextQty)
        
        let newCart = [...cart]
        const producIndex = newCart.findIndex((product) => product.ID === productParam.ID)

        if (producIndex === -1) {
            productParam.qty = nextQty
            newCart = [productParam, ...newCart]
        } else {
            newCart[producIndex].qty = nextQty 
        }
        
        setCart(newCart)
        writable.setItem('cart', newCart)
    }  

    function handleDecreaseQtyProduct(productParam) {
        if (qty > 0) {
            const prevQty = qty - 1
            setQty(prevQty)
            const newCart = [...cart]

            const producIndex = newCart.findIndex((product) => product.ID === productParam.ID)
            // found product with qty 1
            if (qty === 1 && producIndex !== -1 ) {
                // remove product
                newCart.splice(producIndex, 1)
                
                writable.setItem('cart', newCart)
                return setCart(newCart)
            }

            newCart[producIndex].qty = prevQty

            setCart(newCart)
            writable.setItem('cart', newCart)
        }
    }

    useEffect(() => {
        //match product to rese
        if(productToReset && productProps.ID === productToReset.ID) {
            setQty(0)
            setProductToReset(null)
        }
        // force update  qty : util when product exist in cart  and you come from another tab (e.g.: noodles to Burger)
        if (cart.length) {
           cart.forEach((productInCart) => {
                if (productInCart.ID === productProps.ID) {
                    setQty(productInCart.qty)
                }
           })
        }
        
    }, [productToReset, cart,productProps,setProductToReset])

    return (
        <>
            <div onMouseEnter={() => setShowOverlay(true)} onMouseLeave={() => setShowOverlay(false)} className="flex flex-col space-y-2 col-span-1 bg-[#2d2d2d] p-2 rounded-lg relative">
                {productProps.ImageUrl.Valid ? 
                <div className="h-40 w-full bg-cover bg-center rounded-lg" style={{backgroundImage: `url(${productProps.ImageUrl.String})`}}  alt="burger-asiatique"></div> : <div className="h-40 w-full bg-cover bg-center rounded-lg text-7xl flex justify-center items-center" alt="burger-asiatique">{productProps.ShortName}</div>}
                
                <div className="flex items-center">
                    <span className="text-sm">{productProps.Name} |</span>
                    <span className="ml-2 text-stone-400 text-[10px]">{productProps.Description}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-bold">{`${productProps.Devise} ${productProps.Price}`} </span>
                </div>
                <div className={`flex flex-col space-y-8 bg-[#f05756]/90 absolute left-0 ${showOverlay ? 'h-4/5 opacity-100' : ' h-0 opacity-0 z-[-2]'} delay-500 duration-300 transition-all ease-in-out bottom-0 w-full rounded-lg p-2`}>
                    <span className="text-xl">{productProps.Name} </span>
                    <span className="font-bold text-2xl">{`${productProps.Devise} ${productProps.Price * qty}`}</span>
                    <div className="flex justify-center space-x-8 items-center">
                        <div onClick={() => handleDecreaseQtyProduct(productProps)} className="flex items-center justify-center h-10 w-10 rounded-xl border border-white bg-white text-stone-700 hover:opacity-60 transition">-</div>
                        <span className="text-4xl">{qty}</span>
                        <div onClick={() => handleIncreaseQtyProduct(productProps)} className="flex items-center justify-center h-10 w-10 rounded-xl border border-white bg-white text-stone-700 hover:opacity-60 transition">+</div>
                    </div>
                </div>
            </div>
        </>
    )
}