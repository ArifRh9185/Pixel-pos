// ProductList.jsx
import { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { categories, sampleProducts } from '../data/SampleData';
import BillDetails from './BillDetails';
import { auth } from '../firebase';
import bgProduct from '../assets/bg-product.jpeg';
import Swal from 'sweetalert2';

const ProductList = ({cart,setCart, onProcess}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const sizes = ['S', 'M', 'L'];
  const sizeMap = { S: 'small', M: 'medium', L: 'large' };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const filteredProducts = sampleProducts.filter((p) =>
    (selectedCategory === 'all' || p.category === selectedCategory) &&
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categoriesWithAll = [{ id: 'all', name: 'All' }, ...categories.filter(cat => cat.id !== 'all')];

  const handleAddToCart = (product) => {
    const selected = selectedOptions[product.id];
    if (!selected?.cupSize || !selected?.iceLevel || !selected?.sugarLevel) {
      return Swal.fire({
        title: 'Select Varian!',
        text: 'Lengkapi Pilihan varian produk terlebih dahulu',
        icon: 'error',
        confirmButtonText: 'oke'
      });
    }

    const selectedSizeKey = sizeMap[selected.cupSize];
    const priceForSize = Number(product.price?.[selectedSizeKey]) || 0;

    const existingIndex = cart.findIndex(
      (item) =>
        item.id === product.id &&
        item.cupSize === selected.cupSize &&
        item.iceLevel === selected.iceLevel &&
        item.sugarLevel === selected.sugarLevel
    );

    if (existingIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].qty += 1;
      setCart(updatedCart);
    } else {
      setCart([
        ...cart,
        {
          ...product,
          cupSize: selected.cupSize,
          iceLevel: selected.iceLevel,
          sugarLevel: selected.sugarLevel,
          price: priceForSize,
          qty: 1,
        }
      ]);
    }
  };

  const handleOptionChange = (productId, optionName, value) => {
    setSelectedOptions(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [optionName]: value,
      }
    }));
  };

  return (
    <div className='w-full scrollbar-hide flex mx-auto'>
     <div className="w-full flex flex-col border-2 border-neutral-200/20">
        <div className="w-full bg-white flex justify-between items-center gap-4 px-5 py-7 border-b border-neutral-200">
          <div className="flex items-center shadow-sm border border-neutral-300 px-4 py-2 rounded-xl w-2/3">
            <FiSearch className="text-gray-800 mr-2" />
            <input
              type="text"
              placeholder="Search menu"
              className="w-full focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {user && (
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600 text-right">
                <p className="font-semibold hidden md:block">Yth. {user.displayName || 'Guest'}</p>
                <p className="text-xs">{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              <img src={user.photoURL} className="w-10 h-10 rounded-full border md:hidden lg:block" alt="User" />
            </div>
          )}
        </div>

        <h2 className='text-lg text-neutral-800 font-semibold mt-5 px-5'>Categories</h2>
        <div className="flex flex-wrap gap-3 my-3 overflow-x-auto px-5">
          {categoriesWithAll.map((cat) => (
            <button
              key={`cat-${cat.id}`}
              className={`px-4 py-2 text-sm hover:border-green-500 font-semibold rounded-2xl border-2 w-[72px] h-[72px] ${
                selectedCategory === cat.id
                  ? 'bg-green-100 text-green-700 border-green-400/50'
                  : 'text-gray-700 border-neutral-100'
              }`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <h2 className='text-lg text-neutral-800 font-semibold px-5 mt-2'>Select Menu</h2>
        <div className="grid w-full lg:grid-cols-2 gap-6 px-5 my-5">
          {filteredProducts.map((product) => {
            const selected = selectedOptions[product.id] || {};
            const selectedSizeKey = sizeMap[selected.cupSize] || 'small';
            const currentPrice = Number(product.price?.[selectedSizeKey]) || 0;
            return (
              <div key={product.id} className={`border border-neutral-100 bg-white p-3 rounded-2xl shadow-sm ${product.stock === 0 ? 'opacity-50' : ''}`}>
                <div className="flex gap-3">
                  <img src={bgProduct} alt={product.name} className="w-[72px] h-[72px] rounded-2xl object-cover" />
                  <div className='flex flex-col justify-between'>
                    <h3 className="font-bold text-neutral-700 text-sm">{product.name}</h3>
                    <p className="text-xs text-gray-500">{product.available} Available • {product.sold} Sold</p>
                    <p className="text-md font-semibold text-neutral-800"><span className='text-green-600 font-bold'>Rp.</span>{currentPrice.toLocaleString('id-ID')}k</p>
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-4 text-neutral-800 my-3'>
                  {[
                    { label: 'Cup Size', name: 'cupSize' },
                    { label: 'Ice Level', name: 'iceLevel' },
                    { label: 'Sugar Level', name: 'sugarLevel' },
                  ].map(({ label, name }) => (
                    <div key={name} className="flex flex-col gap-2">
                      <label className='text-sm font-semibold'>{label}</label>
                      <div className="flex gap-2">
                        {sizes.map((s) => (
                          <label key={s} className="cursor-pointer">
                            <input
                              type="radio"
                              name={`${name}-${product.id}`}
                              value={s}
                              className="peer sr-only"
                              onChange={(e) => handleOptionChange(product.id, name, e.target.value)}
                            />
                            <span className="flex text-xs h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-neutral-500 font-bold peer-checked:bg-green-100 peer-checked:text-green-800">
                              {s}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  className="w-full py-2 hover:bg-green-700 hover:cursor-pointer mt-2 rounded-full bg-green-600 text-white text-sm disabled:opacity-50"
                  disabled={product.stock === 0}
                  onClick={() => handleAddToCart(product)}
                >
                  Add To Cart
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <BillDetails cart={cart} setCart={setCart} onProcess={onProcess}/>
    </div>
  );
};

export default ProductList;
