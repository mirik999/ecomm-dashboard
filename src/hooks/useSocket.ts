import { useEffect, useRef } from 'react';
import io from 'socket.io-client';

function useSocket(ns: string | null = '/') {
  const socket = useRef(io.connect(`http://localhost:4004/${ns}`)).current;
  const nsList = useRef<string[]>([]);

  useEffect(() => {
    const nsInList = nsList.current.includes(ns!);
    if (!nsInList) {
      nsList.current.push(ns!);
      socket.connect();
    }
  }, [ns]);

  return socket;
}

export default useSocket;
