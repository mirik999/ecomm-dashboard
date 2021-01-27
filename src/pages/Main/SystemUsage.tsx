import React, {useState, useEffect} from 'react';
import { formatDistance } from 'date-fns';
//components
import LoadingCard from "./LoadingCard";
//types
import { SystemInfo } from '../../redux/types/systemInfo.type';
//utils
import io from '../../utils/socket.utils';
//hooks
import { useInterval } from "../../hooks/useInterval";
//socket connection
const socket = io('statistic');

type Props = {};


const SystemUsage: React.FC<Props> = (props) => {
  const [systemInfo, setSystemInfo] = useState<Partial<SystemInfo>>({});

  useEffect(() => {
    socket.connect();
    socket.on('sendSystemInfo', handleSystemInfo)
    return () => {
      socket.disconnect();
    }
  }, [socket]);

  useInterval(() => {
    socket.emit('getSystemInfo');
  }, 2000)

  if (!Object.keys(systemInfo).length) {
    return <LoadingCard ms={2000} />
  }

  function handleSystemInfo(data: SystemInfo): void {
    setSystemInfo(data);
  }

  function handleBackColor(percent: number = 0): string {
    return percent < 31 ? "green" : ( percent > 30 && percent < 61 ? "orange" : "tomato")
  }

  return (
    <div className="flex bg-white rounded shadow-md p-4 w-520 h-230 flex-1">
      <div className="relative h-full w-14 mr-4 flex flex-col-reverse">
        <div className="h-5 transition-all" style={{
          height: `${systemInfo.memUsage! * 100}%`,
          backgroundColor: handleBackColor(systemInfo.memUsage! * 100)
        }}>
          <div className="absolute top-0 left-3">
            <small>MEM</small>
          </div>
        </div>
      </div>
      <div className="flex-1">
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
              <strong className="w-28 black">CPU usage:</strong>
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
          <div className="absolute top-0 left-4">
            <small>CPU</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemUsage;
