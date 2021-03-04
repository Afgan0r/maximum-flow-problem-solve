import { useCallback } from 'react';
import { ControlsBlockContainer, ControlContainer } from './styled';
import { StoreType } from '../types';
import { Button } from 'antd';

type ControlsBlockType = {
  store: StoreType;
  setStore: (store: StoreType) => void;
};

const ControlsBlock = ({ store, setStore }: ControlsBlockType) => {
  const addEdge = useCallback(() => {
    const newCounter = store.counter + 1;
    const newStore: StoreType = {
      ...store,
      counter: newCounter,
      nodes: [
        ...store.nodes,
        {
          id: newCounter,
          label: `${newCounter}`,
          shape: 'circle',
          margin: {
            left: 10,
            right: 10,
          },
        },
      ],
    };

    setStore(newStore);
  }, [store, setStore]);

  return (
    <ControlsBlockContainer>
      <ControlContainer>
        <Button onClick={addEdge}>Добавить вершину</Button>
      </ControlContainer>
    </ControlsBlockContainer>
  );
};

export default ControlsBlock;
