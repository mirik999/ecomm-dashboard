import React from 'react';
//components
import Layout from "../../components/common/Layout";
import SystemUsage from "./SystemUsage";


type Props = {};


const MainPage: React.FC<Props> = (props) => {


  return (
    <Layout>
      <h2 className="font-medium uppercase mx-4">
        Common Statistics
      </h2>
      <div className="flex m-4">
        <SystemUsage />
      </div>
    </Layout>
  );
};

export default MainPage;
