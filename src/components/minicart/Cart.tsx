import CartItem from "./CartItem"
import { useCartStore } from "../../stores/useCartStore"
import useFromStore from "../../hooks/useFromStore"
//import { loadStripe } from "@stripe/stripe-js"
import axios from "axios"
//const stripePromise = loadStripe(process.env.stripe_public_key  as string)

function Cart() {
	const cart = useFromStore(useCartStore, state => state.cart)

	let total = 0
	if (cart) {
		total = cart.reduce((acc, product) => acc + product.price * (product.quantity as number), 0)
	}

	const createCheckoutSession = async () => {
		//const stripe = await stripePromise;
		
        await axios.post('api/checkout_sessions', { cart})
           .then(res => {
                console.log(res)
                window.location = res.data.sessionURL
            }) 
            .catch(err => console.log(err))
	};
	
	return (
		<section>
			<h3 className='text-2xl font-bold mb-4'>Shopping Cart</h3>
		
			<ul>
				{cart?.map(product => (
					<CartItem key={product.id} product={product} />
				))}
			</ul>
			{(cart ?? []).length <= 0 && (<div className='flex justify-between items-center mt-4'>
				<span className='text-lg font-bold'>Cart is empty</span></div>)}
			 {(cart ?? []).length > 0 && (
				<>
			<div className='flex justify-between items-center mt-4'>
				<span className='text-lg font-bold'>Total:</span>
				<span className='text-xl font-bold'>${total.toFixed(2)}</span>
			</div>
			<button
			role='link'
                        className='text-right bg-blue-500 text-white py-4 px-12 mt-4 block mx-auto rounded hover:bg-blue-600' 
						onClick={createCheckoutSession}>Checkout</button>
						</>
			)}
		</section>
	)
}

export default Cart
