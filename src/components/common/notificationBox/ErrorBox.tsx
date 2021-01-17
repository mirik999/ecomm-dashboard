import React from 'react';

type Props = {
  message?: string
  details?: any
}

const ErrorBox: React.FC<Props> = ({message, details}) => {
  return (
    <div
      className="m-4 p-2 border-2 border-pink-500 bg-pink-200 text-red-700
        border-r-4 rounded-md"
    >
      <span>{message}</span>
      {
        details.map((d: any, i: number) => (
          <span key={i} className="ml-4">
            {
              typeof d.extensions.exception.response.message === "object" ?
              d.extensions.exception.response.message
                .map((dm: string, idx: number) => (
                  <strong key={i + idx} className="mr-3">[ {dm} ]</strong>
                )) : null
            }
          </span>
        ))
      }
    </div>
  );
}

ErrorBox.defaultProps = {
  message: 'Something went wrong',
  details: []
}

export default ErrorBox;
