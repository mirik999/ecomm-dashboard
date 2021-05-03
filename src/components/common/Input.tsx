import React, { forwardRef } from 'react';
import { Input as RsInput, InputGroup, Icon, Whisper, Tooltip } from 'rsuite';
import styled from 'styled-components';
//types
import { FieldError } from 'react-hook-form';

type Props = {
  errorMessage?: FieldError;
  [key: string]: any;
};

const Input: React.FC<Props> = forwardRef(({ errorMessage, ...props }, ref) => {
  return (
    <Container>
      <InputGroup inside>
        <RsInput {...props} ref={ref} autoComplete="off" />
        {errorMessage ? (
          <Whisper
            trigger="hover"
            speaker={<Tooltip>{errorMessage?.message}</Tooltip>}
            placement="topEnd"
          >
            <InputGroup.Addon>
              <Icon icon="exclamation" size="lg" />
            </InputGroup.Addon>
          </Whisper>
        ) : null}
      </InputGroup>
    </Container>
  );
});

Input.defaultProps = {};

export default Input;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 220px;
  flex: 1;

  span i {
    color: ${({ theme }) => theme.colors.error};
  }
`;
