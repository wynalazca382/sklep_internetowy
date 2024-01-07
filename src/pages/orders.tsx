
import { useEffect, useState } from "react";
import Cart from "@/components/minicart/Cart";
import Header from "@/components/ui/Header";
import Drawer from "@/components/ui/Drawer";
import { useSession, useUser } from "@clerk/clerk-react";
import OrderList from "@/components/orders/OrderList"

import { useOrdersStore } from "@/stores/useOrdersStore"
export default function Orders( ) {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
   const { session } = useSession();
   const { user } = useUser();
   const { orders, isLoading, error, fetchData } = useOrdersStore();
	useEffect(() => {
        if(session &&user){
            fetchData(user.id)
        }
	
	}, [session, user,fetchData])

	const handleCartIconClick = () => {
		setIsDrawerOpen(!isDrawerOpen)
	}

return (
    <>
        <Header onCartIconClick={handleCartIconClick} />
        <Drawer isOpen={isDrawerOpen} onCartIconClick={handleCartIconClick}>
            <Cart />
        </Drawer>
        <main className='container mx-auto md:w-10/12 py-8 px-4'>
            <h1 className="text-3xl border-b mb-2 pb-1 border-blue-400">Your Orders</h1>
     
         <h2>Orders: {orders.length}</h2>
        {isLoading ? <div className='text-center text-lg'>Loading...</div> : <OrderList orders={orders} />}
        </main>
    </>
)
	
};
