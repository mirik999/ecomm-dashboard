import React, { useState, useEffect } from 'react';
import { formatDistance } from 'date-fns';
import styled from 'styled-components';
//components
import LoadingCard from './LoadingCard';
//types
import { SystemInfo } from '../../redux/types/systemInfo.type';
//utils
import io from '../../utils/socket.utils';
//hooks
import { useInterval } from '../../hooks/useInterval';
import Flexbox from '../../components/common/layout/Flexbox';
//socket connection
const socket = io('statistic');

type Props = {};

const SystemUsage: React.FC<Props> = (props) => {
  const [systemInfo, setSystemInfo] = useState<Partial<SystemInfo>>({});

  useEffect(() => {
    socket.connect();
    socket.on('sendSystemInfo', handleSystemInfo);
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useInterval(() => {
    socket.emit('getSystemInfo');
  }, 2000);

  if (!Object.keys(systemInfo).length) {
    return <LoadingCard ms={2000} />;
  }

  function handleSystemInfo(data: SystemInfo): void {
    setSystemInfo(data);
  }

  function handleBackColor(percent: number = 0): string {
    return percent < 31
      ? 'green'
      : percent > 30 && percent < 61
      ? 'orange'
      : 'tomato';
  }

  return (
    <Container align="stretch">
      <Flexbox cls="left-col" flex="column-reverse" >
        <div
          style={{
            height: `${systemInfo.memUsage! * 100}%`,
            backgroundColor: handleBackColor(systemInfo.memUsage! * 100),
          }}
        />
      </Flexbox>
      <Flexbox cls="middle-col" flex="column" col="5" align="start">
        <ul>
          <li>
            <strong>OS type:</strong>
            <span>{systemInfo.type}</span>
          </li>
          <li>
            <strong>OS uptime:</strong>
            <span>
              {formatDistance(
                new Date(new Date().getTime() - systemInfo.upTime! * 1000),
                new Date(),
              )}
            </span>
          </li>
          <li>
            <strong>CPU name:</strong>
            <span>{systemInfo.cpuModel}</span>
          </li>
        </ul>
        <ul>
          <li>
            <strong>Memory usage:</strong>
            <span>{systemInfo.memUsage! * 100}%</span>
          </li>
          <li>
            <strong>Memory free:</strong>
            <span>
                {Math.round(((systemInfo.freeMem! / 1073741824) * 100) / 100)}GB
              </span>
          </li>
          <li>
            <strong>Memory total:</strong>
            <span>
                {Math.round(((systemInfo.totalMem! / 1073741824) * 100) / 100)}
              GB
              </span>
          </li>
        </ul>
        <ul>
          <li>
            <strong>CPU cores:</strong>
            <span>{systemInfo.cpuCores}</span>
          </li>
          <li>
            <strong>CPU speed:</strong>
            <span>{systemInfo.cpuSpeed! / 1000}GHz</span>
          </li>
          <li>
            <strong>CPU usage:</strong>
            <span>{systemInfo.cpuLoad}%</span>
          </li>
        </ul>
      </Flexbox>
      <Flexbox cls="right-col" flex="column-reverse">
        <div
          style={{
            height: `${systemInfo.cpuLoad}%`,
            backgroundColor: handleBackColor(systemInfo.cpuLoad),
          }}
        />
      </Flexbox>
    </Container>
  );
};

export default SystemUsage;

const Container = styled(Flexbox)`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 5px;
  box-shadow: ${({ theme }) => `0 3px 10px ${theme.colors.shadow}`};
  padding: 10px;
  min-width: 410px;
  width: 100%;
  max-width: 410px;
  height: 230px;

  .middle-col {
    h3 {
      text-align: center;
      margin-bottom: 10px;
      font-size: ${({ theme }) => theme.fontSize.sm + 'px'};
    }

    strong {
      display: block;
      font-size: ${({ theme }) => theme.fontSize.xs + 'px'};
    }

    span {
      font-size: ${({ theme }) => theme.fontSize.xs + 'px'};
    }

    ul {
      flex: 1;
      margin: 4px 10px 4px 0;

      li {
        display: flex;
      }
    }
  }

  .left-col,
  .right-col {
    position: relative;
    min-height: 100%;
    width: 26px;
    padding: 0;

    & > div {
      width: 100%;
      height: 20px;
      transition: all 0.3s ease;
    }
  }

  @media screen and (max-width: 750px) {
    min-width: 250px !important;
    max-width: 250px !important;
    padding: 10px 0;
    .left-col, .right-col {
      display: none;
    }
    .middle-col {
      padding: 0;
    }
  }
`;
