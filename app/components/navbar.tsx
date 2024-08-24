'use client'
import Image from 'next/image';
import { usePathname } from 'next/navigation'

const Navbar = () => {

    const pathname = usePathname()
    console.log(pathname,'heeeeyo')

  return (
    <nav className="bg-white shadow-md py-4 px-[50px] flex justify-between items-center">
   
      <div className="flex items-center gap-[100px]">
      <img src="./trimmed.png" alt="/"  className="h-[50px]"/>
        <ul className="flex gap-[50px] font-[400] text-[16px]">
          <li><a href="/home" className={` hover:text-[#E3411A] transition-colors duration-400 ${ pathname === '/home' ? 'text-[#E3411A]' : 'text-black'}`}>Blog</a></li>
          <li><a href="/products" className={` hover:text-[#E3411A] transition-colors duration-400 ${pathname === '/products' ? 'text-[#E3411A]' : 'text-black'}`}>Products</a></li>
          <li><a href="/contact" className={` hover:text-[#E3411A] transition-colors duration-400 ${pathname === '/contact' ? 'text-[#E3411A]' : 'text-black'}`}>Contact</a></li>
          <li><a href="/about" className={` hover:text-[#E3411A] transition-colors duration-400 ${pathname === '/about' ? 'text-[#E3411A]' : 'text-black'}`}>About</a></li>
          <li><a href="/services" className={` hover:text-[#E3411A] transition-colors duration-400 ${pathname === '/services' ? 'text-[#E3411A]' : 'text-black'}`}>Services</a></li>
        </ul>
      </div>

      <div className="flex items-center space-x-[30px]">
        <button className="bg-[#E3411A] text-white px-4 py-2 rounded-md hover:bg-orange-600 transition">
          Create Card
        </button>
        <Image
          src="/ava.webp"
          alt="Profile"
          width={100}
          height={100}
          className="w-[50px] h-[50px] rounded-full object-cover border shadow cursor-pointer"
        />
      </div>
    </nav>
  );
};

export default Navbar;