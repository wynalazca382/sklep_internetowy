// import Link from 'next/link';
// import React, { useEffect } from 'react';
// import { useRouter } from 'next/router';
// import useFromStore from "../hooks/useFromStore"
// import { useCartStore } from "../stores/useCartStore";

// const Success: React.FC = () => {
//   const router = useRouter();
//   const cart = useFromStore(useCartStore, state => state.cart)
//   //const clearCart = useCartStore(state => state.clearCart); // Accessing the clearCart action from the store
//  // const items: Product[] = cart;
//   //useEffect(() => {
//   //  const { session_id } = router.query;
// //console.log(session_id)
// //const session_id = localStorage.getItem('stripeCheckoutSessionId');

//     // const fetchPaymentDetails = async (sessionId: string) => {
//     //   try {
//     //     const response = await fetch('/api/paymentDetails', {
//     //       method: 'POST',
//     //       headers: {
//     //         'Content-Type': 'application/json',
//     //       },
//     //       body: JSON.stringify({ sessionId }),
//     //     });

//     //     if (response.ok) {
//     //       const data = await response.json();
//     //       console.log('Payment details:', data);
//     //       // Handle the payment details as needed

//     //       // Clear the cart after handling the payment details
//     //       clearCart();
//     //     } else {
//     //       console.error('Failed to fetch payment details');
//     //     }
//     //   } catch (error) {
//     //     console.error('Error fetching payment details:', error);
//     //   }
//     // };

//   ///if (session_id) {
//     //  fetchPaymentDetails(session_id as string);
//   // }
//  // }, [router.query.session_id, clearCart]); // Adding clearCart to the dependency array

//   return (
//     <div className='h-screen grid place-items-center'>
//       <div className='text-center'>
//         <h1 className='text-8xl font-bold'>Thank You</h1>
//         <p className='text-center text-2xl'>Order Placed Successfully</p>
//         <Link href="/">
//           <p className=' bg-blue-500 text-white py-4 px-12 mt-4mx-auto rounded hover:bg-blue-600 cursor-pointer'>Continue Shopping</p>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Success;
