import { FiShoppingCart } from "react-icons/fi";
import { useCartStore } from "../../stores/useCartStore";
import useFromStore from "@/hooks/useFromStore";
import Login from "../login/Login";

interface Props {
  onCartIconClick: () => void;
}

const Header = ({ onCartIconClick }: Props) => {
  const cart = useFromStore(useCartStore, (state) => state.cart);

  return (
    <header className='bg-gray-900 text-white py-4 flex items-center justify-between h-14 sticky top-0 z-10'>
      <nav className='container mx-auto md:w-10/12 px-4 flex justify-between items-center'>
        <span className='text-lg font-semibold'>My E-commerce</span>
        <div className='flex items-center space-x-4'>
          <button
            type='button'
            title='Mini Cart'
            className='text-white text-xl flex items-center'
            onClick={onCartIconClick}
          >
            <FiShoppingCart />
            <div className='text-white rounded-full bg-blue-700 w-5 h-5 text-sm -ml-1'>
              {cart?.length}
            </div>
          </button>
          <Login />
        </div>
      </nav>
    </header>
  );
};

export default Header;
