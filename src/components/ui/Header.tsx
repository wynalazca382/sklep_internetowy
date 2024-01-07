import { FiShoppingCart } from "react-icons/fi";
import { useCartStore } from "../../stores/useCartStore";
import useFromStore from "@/hooks/useFromStore";
import Login from "../login/Login";
import { useUser, useSession } from '@clerk/clerk-react';
import AdminPanel from '../login//AdminPanel';
import Link from 'next/link';
import { useRouter } from 'next/router';
interface Props {
  onCartIconClick: () => void;
}

export default function Header({ onCartIconClick }: Props) {
  const { session } = useSession();
  let organizationMemberships = 0; // Przeniesione tutaj

  if (
    session &&
    session.user &&
    session.user.organizationMemberships &&
    session.user.organizationMemberships.length > 0
  ) {
    organizationMemberships = session.user.organizationMemberships.length;
  }

  const router = useRouter();
  const cart = useFromStore(useCartStore, (state) => state.cart);
  let totalitems = 0;

  if (cart) {
    totalitems = cart.reduce((acc, product) => acc + (product.quantity as number), 0);
  }

  const handleAdminPanelClick = () => {
    // Sprawdź, czy użytkownik jest adminem, a następnie przekieruj go do Panelu Admina
    if (organizationMemberships > 0) {
      router.push('/admin');
    }
  };

  return (
    <header className='bg-gray-900 text-white py-4 flex items-center justify-between h-14 sticky top-0 z-10'>
      <nav className='container mx-auto md:w-10/12 px-4 flex justify-between items-center'>
        <Link href='/'>
          My E-commerce
        </Link>
      
        <div className='flex items-center space-x-4'>
        <Link href='/orders'>Orders</Link>
          <button
            type='button'
            title='Mini Cart'
            className='text-white text-xl flex items-center'
            onClick={onCartIconClick}
          >
            <FiShoppingCart />
            <div className='text-white rounded-full bg-blue-700 w-5 h-5 text-sm -ml-1'>{totalitems}</div>
          </button>
          <Login />
          {organizationMemberships > 0 && (
            <button type='button' onClick={handleAdminPanelClick}>
              Panel Admina
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
