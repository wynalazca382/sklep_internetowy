import { Order } from "@/types.d";
import moment from "moment";
interface Props {
  order: Order;
}

export default function OrderCard({ order }: Props) {
  const date = moment.unix(order.timestamp.seconds).format("DD MMM YYYY");
  return (
 <>
    <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
      <div>
        <p className="font-bold text-xs">ORDER PLACED</p>  
        <p>{date.toString()}</p>
      </div>
      <div>
        <p className="text-sx font-bold">TOTAL</p>
        <p>${order.amount}</p>
      </div>
      <div>
        <p className="text-sx font-bold">Shipping</p>
        <p>{order.amount_shipping === 0 ? 'Free' : `${order.amount_shipping}`}</p>
      </div>
      <div>
        <p className="text-sx font-bold">Status</p>
        <p>{order.orderStatus.toUpperCase()}</p>
      </div>
        <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap">ORDER # {order.id}</p>
        <p className="text-sm whitespace-nowrap sm:text-lx self-end flex-1 text-right text-blue-500">{order.items.data.length} items</p>

    </div> 
    <div className="p-5 sm:p-10">
    <div className="flex space-x-6 overflow-x-auto">
    {order.images.map((image, index) => (
        <img
        key={index}
        src={image}
        alt={`Image ${index + 1}`}
        width={120}
        height={120}
        className='object-contain sm:h-32' 
        />
    ))}
    </div>
</div>
</>
    
  );
}
