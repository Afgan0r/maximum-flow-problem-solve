import { Container, FormContainer } from './styled';
import Graph from './Graph';
import { StoreType } from './types';
import ControlsBlock from './ControlsBlock';
import { useState } from 'react';
import { Modal, Steps } from 'antd';
import CreateNodes from './CreateNodes';
import CreateEdges from './CreateEdges';
import { initializeNodes } from 'utils';

const App = () => {
  const [store, setStore] = useState<StoreType>({
    counter: 0,
    nodes: [],
    edges: [],
  });
  const [step, setStep] = useState<number>(0);
  const [isSetupCompleted, setIsSetupCompleted] = useState<Boolean>(false);

  const CreateNodesComponent = (
    <CreateNodes
      onCreate={(count) => {
        setStep(1);
        setStore(initializeNodes(count));
      }}
    />
  );

  const CreateEdgesComponent = (
    <CreateEdges
      nodes={store.nodes}
      onCreate={(edges) => {
        setIsSetupCompleted(true);
        setStore({
          ...store,
          edges,
        });
      }}
    />
  );

  console.log(store);

  const componentByStep = [CreateNodesComponent, CreateEdgesComponent];

  return !isSetupCompleted ? (
    <Modal title='Создание графа' visible footer={null} closable={false} centered>
      <Steps size='small' current={step}>
        <Steps.Step title='Создание вершин' />
        <Steps.Step title='Создание ребер' />
      </Steps>
      <FormContainer>{componentByStep[step]}</FormContainer>
    </Modal>
  ) : (
    <Container>
      <Graph graph={{ nodes: store.nodes, edges: store.edges }} />
      <ControlsBlock store={store} setStore={setStore} />
    </Container>
  );
};

export default App;
