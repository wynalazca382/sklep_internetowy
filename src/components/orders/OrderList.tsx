import OrderCard from "./OrderCard"
import { Order } from "@/types.d"


interface Props {
  orders: Order[];
}

export default function OrderList({ orders}: Props) {
  
  return (
    <>
    <div>

    </div>
    <div className="realtive border rounder-md">
       
          {orders.map((order) => (
            <div key={order.id} className="relative">
              <OrderCard order={order} />
         
            </div>
          ))}
        
        </div>
    </>
  );
}
