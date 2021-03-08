import React, { memo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { FaRegWindowClose }from 'react-icons/fa';
//components
import ErrorBox from "./ErrorBox";
import ProcessBox from "./ProcessBox";
import Flexbox from "../layout/Flexbox";
//types
import { RootState } from "../../../redux/store";
//utils
import { isEmpty } from "../../../utils/functions.utils";
//actions
import { removeNetStatus } from '../../../redux/slices/net-status.slice';

type Props = {}

const NotificationBox: React.FC<Props> = memo(() => {
  const dispatch = useDispatch();
  const { netStatus } = useSelector((state: RootState) => state)

  if (isEmpty(netStatus)) {
    return null;
  }

  function _onCloseNetStatus(): void {
    dispatch(removeNetStatus())
  }

  return (
    <Flexbox align="center" justify="between">
      <ErrorBox
        message={netStatus?.message}
        details={netStatus}
        getEvent={_onCloseNetStatus}
      />
    </Flexbox>
  )
}, () => true)

NotificationBox.defaultProps = {
  list: []
}

export default NotificationBox;
