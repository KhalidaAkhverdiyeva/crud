'use client'
import Image from 'next/image';
import { usePathname } from 'next/navigation'
import { useState } from 'react';
import AddCardModal from './addCardModal';
import { CiLogout } from "react-icons/ci";
import { CgDetailsLess } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import ViewDetailsModal from './userView';



const Navbar = () => {


    const pathname = usePathname()

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [isViewDetailsOpen, setIsViewDetailsOpen] = useState<boolean>(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false);

    const toggleDropdown = () => setIsDropdownOpen(prev => !prev);
    const closeDropdown = () => setIsDropdownOpen(false);

    const router = useRouter();

    const handleSignOut = () => {
    
      deleteCookie('token')
      router.push("/");
    };

    

      const handleViewDetails = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,userId: number) => {
        event.preventDefault()
        setSelectedUserId(userId);
        setIsViewDetailsOpen(true);
        closeDropdown();
    };

    const closeViewDetailsModal = () => {
        setIsViewDetailsOpen(false);
        setSelectedUserId(null);
    };
    

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

      <div className=" relative flex items-center space-x-[30px]">
        <button onClick={openModal} className="bg-[#E3411A] text-white px-4 py-2 rounded-md hover:bg-orange-600 transition">
          Create Card
        </button>
        {isModalOpen && <AddCardModal onClose={closeModal} />}
        <Image
          src="/ava.webp"
          alt="Profile"
          width={100}
          height={100}
          className="w-[50px] h-[50px] rounded-full object-cover border shadow cursor-pointer"
          onClick={toggleDropdown}
        />
         {isDropdownOpen && (
                    <div
                        className="absolute top-[60px] right-0 mt-2 w-48 bg-black border border-gray-300 rounded-lg shadow-lg z-50"
                        onClick={(e) => e.stopPropagation()} 
                    >
                        <ul className="py-2 text-white">
                            <li onClick={(e) => handleViewDetails(e, 1)}>
                                <a
                                    href="#"
                                    className="flex items-center gap-[10px] px-4"
                                >
                                    <CgDetailsLess />
                                    <span className='block py-2 text-white text-[14px]'>View Details</span>
                                </a>
                            </li>
                            <li onClick={handleSignOut}>
                                <a
                                    href="#"
                                    className="flex items-center gap-[10px] px-4"
                                >
                                    <CiLogout />
                                    <span className='block py-2 text-white text-[14px]'>Sign out</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                )}
                {isViewDetailsOpen && selectedUserId !== null && (
                    <ViewDetailsModal
                        userId={selectedUserId}
                        onClose={closeViewDetailsModal}
                    />
                )}
      </div>
    </nav>
  );
};

export default Navbar;