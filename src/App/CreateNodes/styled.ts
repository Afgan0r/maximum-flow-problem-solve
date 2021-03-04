import styled from 'styled-components';
import { Button as AntButton } from 'antd';

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 16px 0;

  > span {
    margin-right: 8px;
  }
`;

export const Button = styled(AntButton)`
  width: 175px;
  align-self: end;
`;
