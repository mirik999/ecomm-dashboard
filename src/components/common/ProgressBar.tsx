import React, { useEffect } from 'react';
import NProgress from 'nprogress';

type Props = {};

const ProgressBar: React.FC<Props> = (props): any => {
  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  });

  return '';
};

ProgressBar.defaultProps = {};

export default ProgressBar;
