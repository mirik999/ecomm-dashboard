import React, { useState } from 'react';
//components
import Login from "./Login";
import Register from "./Register";


type Props = {};

const AuthPage: React.FC<Props> = (props) => {
  const [type, setType] = useState<boolean>(false);

  function _onChangeType(): void {
    setType(!type);
  }

  return (
    <div className="min-h-full flex justify-center items-center bg-gray-50">
      <form
        className="w-96 relative"
      >
        <div
          className="absolute py-2 px-3 border-2 border-green-600 bg-green-400
            rounded-md text-white text-center cursor-pointer border-r-4
            delay-150 transform transition-all z-0 -top-4 right-0
            hover:-translate-y-5"
        >
          <span onClick={_onChangeType}>
            {
              type ? "Create an account" : "Already have an account?"
            }
          </span>
        </div>
        { type ? <Login /> : <Register /> }
      </form>
    </div>
  );
};

export default AuthPage;
