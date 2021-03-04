import { Container } from './styled';
import Graph from './Graph';
import { StoreType } from './types';
import ControlsBlock from './ControlsBlock';
import { useState } from 'react';

const App = () => {
  const [store, setStore] = useState<StoreType>({
    counter: 0,
    nodes: [],
    edges: [],
  });

  return (
    <Container>
      <Graph graph={{ nodes: store.nodes, edges: store.edges }} />
      <ControlsBlock store={store} setStore={setStore} />
    </Container>
  );
};

export default App;
