import React, { useState, useRef, useEffect } from 'react';
import io from "socket.io-client";
import { formatDistance } from 'date-fns';
//types
import { SystemInfo } from '../../redux/types/systemInfo.type'

type Props = {};


const SystemUsage: React.FC<Props> = (props) => {
  const [systemInfo, setSystemInfo] = useState<Partial<SystemInfo>>({
    upTime: 0
  });
  const socket = useRef(io.connect('http://localhost:4004/statistic')).current;

  useEffect(() => {
    const interval = setInterval(() => {
      socket.emit('getSystemInfo');
    }, 5000);
    socket.on('sendSystemInfo', handleSystemInfo)

    return () => {
      clearInterval(interval);
    }
  }, []);

  function handleSystemInfo(data: SystemInfo): void {
    setSystemInfo(data);
  }

  function handleBackColor(percent: number = 0): string {
    return percent < 31 ? "green" : ( percent > 30 && percent < 61 ? "orange" : "tomato")
  }

  return (
    <div className="flex bg-white rounded shadow-md p-4">
      <div className="relative h-full w-14 mr-4 flex flex-col-reverse">
        <div className="h-5 transition-all" style={{
          height: `${systemInfo.memUsage! * 100}%`,
          backgroundColor: handleBackColor(systemInfo.memUsage! * 100)
        }}>
          <div className="absolute top-2 left-2">
            MEM
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-center mb-4">
          <strong>System Information</strong>
        </h3>
        <div className="flex flex-col">
          <div className="flex">
            <strong className="w-28 block">OS type:</strong>
            <span>{ systemInfo.type }</span>
          </div>
          <div className="flex">
            <strong className="w-28 block">OS uptime:</strong>
            <span>{ formatDistance(new Date(new Date().getTime() - systemInfo.upTime! * 1000), new Date()) }</span>
          </div>
          <div className="flex">
            <strong className="w-28 block">CPU name:</strong>
            <span>{ systemInfo.cpuModel }</span>
          </div>
        </div>
        <div className="flex">
          <ul className="mr-4 my-2">
            <li className="flex">
              <strong className="w-32 block">Memory usage:</strong>
              <span>{ systemInfo.memUsage! * 100 }%</span>
            </li>
            <li className="flex">
              <strong className="w-32 block">Memory free:</strong>
              <span>{ Math.round((systemInfo.freeMem! / 1073741824 * 100) / 100) }GB</span>
            </li>
            <li className="flex">
              <strong className="w-32 block">Memory total:</strong>
              <span>{ Math.round((systemInfo.totalMem!  / 1073741824 *100) / 100) }GB</span>
            </li>
          </ul>
          <ul className="my-2">
            <li className="flex">
              <strong className="w-28 black">CPU cores:</strong>
              <span>{ systemInfo.cpuCores }</span>
            </li>
            <li className="flex">
              <strong className="w-28 black">CPU speed:</strong>
              <span>{ systemInfo.cpuSpeed! / 1000 }GHz</span>
            </li>
            <li className="flex">
              <strong className="w-28 black">CPU load:</strong>
              <span>{ systemInfo.cpuLoad }%</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="relative h-full w-14 ml-4 flex flex-col-reverse">
        <div className="h-5 transition-all" style={{
          height: `${systemInfo.cpuLoad}%`,
          backgroundColor: handleBackColor(systemInfo.cpuLoad)
        }}>
          <div className="absolute top-2 left-3">
            CPU
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemUsage;
