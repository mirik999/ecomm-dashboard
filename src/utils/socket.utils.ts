import io from 'socket.io-client';

const socket = (ns: string) => {
  return io.connect(`http://localhost:4004/${ns}`);
};

export default socket;
