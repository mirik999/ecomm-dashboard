import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//components
import ErrorBox from './ErrorBox';
import Flexbox from '../hoc/Flexbox';
//types
import { RootState } from '../../redux/store';
//actions
import { removeNetStatus } from '../../redux/slices/net-status.slice';

type Props = {};

const NotificationBox: React.FC<Props> = memo(
  () => {
    const dispatch = useDispatch();
    const { netStatus } = useSelector((state: RootState) => state);

    if (!netStatus.isOpen) {
      return null;
    }

    function _onCloseNetStatus(): void {
      dispatch(removeNetStatus());
    }

    return (
      <Flexbox justify="between">
        <ErrorBox
          message={netStatus?.message}
          details={netStatus}
          getEvent={_onCloseNetStatus}
        />
      </Flexbox>
    );
  },
  () => true,
);

NotificationBox.defaultProps = {};

export default NotificationBox;
