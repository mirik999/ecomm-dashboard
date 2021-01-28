import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { HiMenuAlt1 } from 'react-icons/hi';
//types
import {RootState} from "../../redux/store";
import {NavType} from "../../redux/types/nav.type";

type Props = {};

const Navigation: React.FC<Props> = (props) => {
  const { nav, user } = useSelector((state: RootState) => state);
  return (
    <div
      className="min-w-min w-60 h-full bg-gradient-to-b from-blue-800 to-blue-700 border-blue-900
        border-r-4"
    >
     <div className="p-4 flex justify-between items-center">
       <div className="uppercase text-white tracking-wider font-bold">
         <h3 className="text-xl leading-5">Electroshop</h3>
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
          {
            nav.map((n: NavType, i: number) => {
              if (n.visible && n.accessRoles.some((acr, i) => user.roles.includes(acr))) {
                return (
                  <li
                    key={i}
                    className="cursor-pointer transition-all hover:opacity-75"
                  >
                    <Link to={n.path} className="block p-4">{n.name}</Link>
                  </li>
                )
              }
            })
          }
        </ul>
      </nav>
    </div>
  );
};

Navigation.defaultProps = {};

export default Navigation;
