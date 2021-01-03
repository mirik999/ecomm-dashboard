import React from 'react';
//components
import Layout from "../../components/common/Layout";

type Props = {};

const MainPage: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="">
        Hello i'm main page
      </div>
    </Layout>
  );
};

export default MainPage;
