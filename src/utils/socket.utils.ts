import io from 'socket.io-client';

let socketAdapter: ReturnType<typeof io>;

const socket = (ns: string) => {
  return io.connect(`http://localhost:4004/${ns}`);
};

export default socket;
