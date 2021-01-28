import React from 'react';
import { useHistory } from 'react-router-dom';

type Props = {};

const NotFoundPage: React.FC<Props> = (props) => {
  const history = useHistory();

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <h2>This page not found</h2>
        <h3>or You dont have permission</h3>
        <h4 className="cursor-pointer" onClick={() => history.goBack()}>Go Back</h4>
      </div>
    </div>
  );
};

export default NotFoundPage;
