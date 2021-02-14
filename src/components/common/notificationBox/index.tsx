import React, { memo, useRef } from 'react';
//components
import ErrorBox from "./ErrorBox";
import ProcessBox from "./ProcessBox";

type Props = {
  list: any
}

const NotificationBox: React.FC<Props> = memo(({ list }) => {
  const prevErrorState = useRef('');

  return (
    <div>
      {
        list.map((l: any, i: number) => {
          if (l.loading) return <ProcessBox key={i} />
          if (prevErrorState.current === l?.error?.message) {
            return null;
          }
          prevErrorState.current = l.error?.message;
          if (l.error) return (
            <ErrorBox
              key={i}
              message={l.error.message}
              details={l.error?.graphQLErrors}
            />
          )
        })
      }
    </div>
  )
})

NotificationBox.defaultProps = {
  list: []
}

export default NotificationBox;
