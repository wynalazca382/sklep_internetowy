import Link from 'next/link';
import React from 'react';
import { useCartStore } from "../stores/useCartStore"
useCartStore.getState().clearCart();
const Success: React.FC = () => {
  return (
    <div className='h-screen grid place-items-center'>

      <div className='text-center'>

        <h1 className='text-8xl font-bold'>Thank You</h1>
        <p className='text-center text-2xl'>Order Placed Successfully</p>

        <Link href="/">
          <p className=' bg-blue-500 text-white py-4 px-12 mt-4mx-auto rounded hover:bg-blue-600 cursor-pointer'>Continue Shopping</p>
        </Link>

      </div>

    </div>
  );
};

export default Success;
