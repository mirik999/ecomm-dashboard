import React, { useState, useEffect } from 'react';
import { formatDistance } from 'date-fns';
import styled from 'styled-components';
//components
import LoadingCard from './LoadingCard';
import Flexbox from '../../components/hoc/Flexbox';
//types
import { SystemInfo } from '../../redux/types/systemInfo.type';
//utils
import io from '../../utils/socket.utils';
//hooks
import { useInterval } from '../../hooks/useInterval';
//socket
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
      <Flexbox col="1">
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
      <Flexbox col="1">
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
      </Flexbox>
      <Flexbox col="1" align="end">
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
      </Flexbox>
      <Flexbox cls="animated" align="stretch">
        <Flexbox col="1" flex="column-reverse" align="stretch">
          <div
            style={{
              height: `${systemInfo.memUsage! * 100}%`,
              backgroundColor: handleBackColor(systemInfo.memUsage! * 100),
            }}
          />
        </Flexbox>
        <Flexbox col="1" flex="column-reverse" align="stretch">
          <div
            style={{
              height: `${systemInfo.cpuLoad}%`,
              backgroundColor: handleBackColor(systemInfo.cpuLoad),
            }}
          />
        </Flexbox>
      </Flexbox>
    </Container>
  );
};

export default SystemUsage;

const Container = styled(Flexbox)`
  background-color: ${({ theme }) => theme.colors.thirdBackground};
  border-radius: 5px;
  padding: 10px;
  min-width: 370px;
  width: 100%;
  max-width: 370px;
  height: 230px;

  div {
    min-width: 50%;

    span,
    strong {
      font-size: ${({ theme }) => theme.fontSize.sm + 'px'};
    }

    strong {
      display: inline-block;
      margin-right: 5px;
    }
  }

  .animated {
    div {
      padding: 0;
      &:first-child {
        padding-right: 10px;
      }
      div {
        transition: all 0.3s ease;
      }
    }
  }

  span,
  strong {
    color: ${({ theme }) => theme.colors.color};
  }

  @media screen and (max-width: 839px) {
    min-width: 100% !important;
    max-width: 100% !important;
    padding: 10px 0;
  }
`;
