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
    <Container align="start">
      <Flexbox cls="left-col" flex="column-reverse">
        <div
          style={{
            height: `${systemInfo.memUsage! * 100}%`,
            backgroundColor: handleBackColor(systemInfo.memUsage! * 100),
          }}
        >
          <div style={{ right: '24px' }}>
            <span>MEM</span>
          </div>
        </div>
      </Flexbox>
      <Flexbox cls="middle-col" flex="column" col="5">
        <h3>
          <strong>System Information</strong>
        </h3>
        <Flexbox cls="np" flex="column">
          <Flexbox>
            <strong>OS type:</strong>
            <span>{systemInfo.type}</span>
          </Flexbox>
          <Flexbox>
            <strong>OS uptime:</strong>
            <span>
              {formatDistance(
                new Date(new Date().getTime() - systemInfo.upTime! * 1000),
                new Date(),
              )}
            </span>
          </Flexbox>
          <Flexbox>
            <strong>CPU name:</strong>
            <span>{systemInfo.cpuModel}</span>
          </Flexbox>
        </Flexbox>
        <Flexbox>
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
      </Flexbox>
      <Flexbox cls="right-col" flex="column-reverse">
        <div
          style={{
            height: `${systemInfo.cpuLoad}%`,
            backgroundColor: handleBackColor(systemInfo.cpuLoad),
          }}
        >
          <div style={{ left: '24px' }}>
            <span>CPU</span>
          </div>
        </div>
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
  min-width: 250px;
  width: 100%;
  max-width: 420px;
  height: 130px;

  .middle-col {
    h3 {
      text-align: center;
      margin-bottom: 10px;
      font-size: ${({ theme }) => theme.fontSize.sm + 'px'};
    }

    strong {
      width: 72px;
      display: block;
      font-size: ${({ theme }) => theme.fontSize.xs + 'px'};
    }

    span {
      font-size: ${({ theme }) => theme.fontSize.xs + 'px'};
    }

    ul:first-child {
      margin: 4px 10px 4px 0;

      li {
        display: flex;
      }
    }

    ul:last-child {
      margin: 4px 0;

      li {
        display: flex;
      }
    }
  }

  .left-col,
  .right-col {
    position: relative;
    height: 100%;
    width: 26px;

    & > div {
      width: 100%;
      height: 20px;
      transition: all 0.3s ease;

      & > div {
        top: 0;
        position: absolute;

        span {
          font-size: ${({ theme }) => theme.fontSize.xs + 'px'};
        }
      }
    }
  }
`;
