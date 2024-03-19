import { useContext } from "react"
import { methodsPayment } from "../utils/constants"
import { CartContext, OpenModalContext, TotalOrderContext } from "../utils/contexts"
import { CurrentMethodPaymentContext} from "../utils/contexts";
import writable from "@/utils/writable";


export default function ContentModePaymentModal() {
    const {totalOrder} = useContext(TotalOrderContext)
    const {currentMethodPayment} = useContext(CurrentMethodPaymentContext)
    const {_, setModalOpened} = useContext(OpenModalContext)
    const {cart, setCart} = useContext(CartContext)

    async function transaction() {

        async function postTransaction() {
            const orders = writable.getItem('cart').map((order) => {
                return {
                    item_id: order.ID,
                    quantity_sold: order.qty,
                    note: ""
                }
            });
            
            const response = await fetch('/api/transaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({orders})
            })

            const responseData = await response.json();
            return responseData;
        }

        const result = await postTransaction()

        if (!result.error){
            //clear cart
            writable.removeItem('cart')
            setCart([])
        }
        
        //refresh page
        setModalOpened(false)
    }

    return (
        <>
            {
                currentMethodPayment === methodsPayment.cash && 
                    <>
                        <div className="bg-black/40 p-4 rounded-md">
                        <span className="text-2xl">Total: Rp. {totalOrder}</span>
                        </div>
                        <div onClick={transaction} className="bg-white p-2 rounded-lg text-black text-center font-bold hover:opacity-60 transition">
                            Confirm
                        </div>
                    </>       
            }
            {
                currentMethodPayment === methodsPayment.card && 
                    <>
                        <div className="grid grid-cols-4 bg-black/40 p-4 rounded-md gap-6">
                            <div className="col-span-4">
                                <label htmlFor="number-card" className="text-stone-400">Card number</label>
                                <input id="number-card" type="text" className="bg-white/10 text-white p-2 rounded-md focus:outline-none w-full mt-2" />
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="number-card" className="text-stone-400">Expiry date</label>
                                <input id="number-card" type="text" className="bg-white/10 text-white p-2 rounded-md focus:outline-none w-full mt-2" placeholder="MM/YY" />
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="number-card" className="text-stone-400">Security code</label>
                                <input id="number-card" type="text" className="bg-white/10 text-white p-2 rounded-md focus:outline-none w-full mt-2" />
                            </div>
                            <div className="col-span-4">
                                <label htmlFor="number-card" className="text-stone-400">ZIP/Postal code</label>
                                <input id="number-card" type="text" className="bg-white/10 text-white p-2 rounded-md focus:outline-none w-full mt-2" />
                            </div>
                        </div>
                        <div className="bg-white p-2 rounded-lg text-black text-center font-bold hover:opacity-60 transition">
                           <span className="mr-2">Pay</span> 
                           <span className="font-bold">${totalOrder}</span>
                        </div>
                    </>       
            }
             {
                currentMethodPayment === methodsPayment.wallet && 
                    <>
                        <div className="flex flex-col space-y-4 bg-black/40 p-4 rounded-md">
                          <div className="flex flex-col space-y-1 self-center">
                                <span className="font-bold text-5xl">Payment</span>
                                <span className="tracking-[8px]">Accepted Here</span>
                          </div>
                           <div className="self-center text-center">
                                <img src="/qr-code.png" className="w-40 h-40 rounded-lg" alt="qr-code" />
                                <div className="text-[12px] mt-2">Scan code to instantly pay</div>
                           </div>
                        </div>
                    </>       
            }
        </>
    )
}