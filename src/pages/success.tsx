import Link from 'next/link';
import { useCartStore } from "../stores/useCartStore";
import React, {useState } from "react"
import Header from "@/components/ui/Header"
import Drawer from "@/components/ui/Drawer"
import Cart from "@/components/minicart/Cart"

useCartStore.getState().clearCart();
const Success: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

 
  const handleCartIconClick = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }
 return (
   <>
      <Header onCartIconClick={handleCartIconClick} />
          <Drawer isOpen={isDrawerOpen} onCartIconClick={handleCartIconClick}>
            <Cart />
          </Drawer>
    <main>
   <div className='h-screen grid place-items-center'>

     <div className='text-center'>

       <h1 className='text-8xl font-bold'>Thank You</h1>
       <p className='text-center text-2xl'>Order Placed Successfully</p>

       <Link href="/">
         <p className=' bg-blue-500 text-white py-4 px-12 mt-4mx-auto rounded hover:bg-blue-600 cursor-pointer'>Continue Shopping</p>
       </Link>

     </div>

   </div>
   </main>
//     </>
 );
};

export default Success;