import React, { FC } from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  flex?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  justify?: 'start' | 'end' | 'center' | 'between' | 'evenly' | 'around';
  align?: 'start' | 'end' | 'center' | 'stretch';
  wrap?: 'wrap' | 'no-wrap' | 'wrap-reverse';
  content?:
    | 'start'
    | 'end'
    | 'center'
    | 'between'
    | 'evenly'
    | 'around'
    | 'auto';
  col?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0';
  cls?: string;
  [key: string]: any;
}

const Flexbox: FC<Props> = ({
  children,
  flex,
  justify,
  align,
  wrap,
  content,
  col,
  cls,
  ...props
}) => {
  return (
    <Container
      className={cls}
      flex={flex}
      justify={justify}
      align={align}
      wrap={wrap}
      content={content}
      col={col}
      {...props}
    >
      {children}
    </Container>
  );
};

Flexbox.defaultProps = {
  flex: 'row',
  justify: 'start',
  align: 'center',
  cls: 'flex-wrap',
  wrap: 'wrap',
  content: 'auto',
  col: '1',
};

export default Flexbox;

const Container = styled.div`
  width: 100%;
  padding: 0 10px;
  display: flex;
  ${({ flex, justify, align, wrap, content, col }: Props) => {
    return `
      flex: ${col};
      flex-direction: ${flex};
      justify-content: ${handleAlignment(justify!)};
      align-items: ${handleAlignment(align!)};
      align-content: ${handleAlignment(content!)};
      flex-wrap: ${wrap};
    `;
  }}
`;

// handle flex commands
function handleAlignment(cmd: string) {
  switch (cmd) {
    case 'start':
      return 'flex-start';
    case 'end':
      return 'flex-end';
    case 'between':
      return 'space-between';
    case 'evenly':
      return 'space-evenly';
    case 'around':
      return 'space-around';
    case 'center':
      return 'center';
    default:
      return '';
  }
}
