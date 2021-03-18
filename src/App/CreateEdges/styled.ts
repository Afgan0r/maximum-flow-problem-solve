import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
`;

export const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  > div {
    margin-left: 8px;
  }
`;
