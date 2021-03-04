import styled from 'styled-components';

export const ControlsBlockContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const ControlContainer = styled.div`
  margin: 8px 16px;

  &:first-child {
    margin-top: 16px;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;
