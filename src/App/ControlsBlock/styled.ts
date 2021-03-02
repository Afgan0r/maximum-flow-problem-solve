import styled from 'styled-components';

export const ControlsBlockContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

export const ControlContainer = styled.div`
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;
