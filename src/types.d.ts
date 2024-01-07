interface Product {
	id: string;
	title: string;
	description: string;
	price: number;
	discountPercentage: number;
	rating: number;
	stock: number;
	brand: string;
	category: string;
	thumbnail: string;
	images: string[];
	quantity: number;
  }

  interface Order{
        id: string;
        amount: string;
        amountShipping: string;
		name: string;
		address:string[];
        images: string[];
		items: [];
		orderStatus: string;
		paymentStatus: string;
        timeStamp: number;
		
  }
 