import React from 'react';
import { Link } from 'react-router-dom';
import { HiMenuAlt1 } from 'react-icons/hi';

type Props = {};

const SideMenu: React.FC<Props> = (props) => {
  return (
    <div
      className="min-w w-80 h-full bg-gradient-to-b from-blue-800 to-blue-700 border-blue-900 border-r-4"
    >
     <div className="p-4 flex justify-between items-center">
       <div className="uppercase text-white tracking-wider font-bold">
         <h3 className="text-3xl leading-5">Electroshop</h3>
         <span className="leading-3 text-xs">Dashboard v. 0.7.2</span>
       </div>
       <div>
        <HiMenuAlt1
          size={32}
          color="white"
          className="cursor-pointer transition-all hover:opacity-75"
        />
       </div>
     </div>
      <nav className="mt-5">
        <ul className="text-white">
          <li
            className="cursor-pointer
              transition-all hover:opacity-75"
          >
            <Link to="/" className="block p-4">Main</Link>
          </li>
          <li
            className="cursor-pointer
              transition-all hover:opacity-75"
          >
            <Link to="/category" className="block p-4">Categories</Link>
          </li>
          <li
            className="cursor-pointer
              transition-all hover:opacity-75"
          >
            <Link to="/product" className="block p-4">Products</Link>
          </li>
          <li
            className="cursor-pointer
              transition-all hover:opacity-75"
          >
            <Link to="/" className="block p-4">Users</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

SideMenu.defaultProps = {};

export default SideMenu;
