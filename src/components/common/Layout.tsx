import React from 'react';
//components
import Header from "./Header";
import SideMenu from "./SideMenu";

type Props = {
  children: React.ReactNode
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="w-full h-full bg-gray-200 flex">
      <SideMenu />
      <div className="flex-col flex-1">
        <Header />
        <div
          className="bg-gray-100 h-content p-5 overflow-auto"
          style={{ maxWidth: 'calc(100vw - 238px)' }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

Layout.defaultProps = {};

export default Layout;
