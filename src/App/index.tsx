import { Container, FormContainer } from './styled';
import Graph from './Graph';
import { StoreType } from './types';
import { useState } from 'react';
import { Modal, Steps } from 'antd';
import CreateNodes from './CreateNodes';
import CreateEdges from './CreateEdges';
import { initializeNodes } from 'utils';

const data: StoreType = {
  counter: 7,
  nodes: [
    {
      id: 1,
      label: '1',
      shape: 'circle',
      margin: {
        left: 10,
        right: 10,
      },
    },
    {
      id: 2,
      label: '2',
      shape: 'circle',
      margin: {
        left: 10,
        right: 10,
      },
    },
    {
      id: 3,
      label: '3',
      shape: 'circle',
      margin: {
        left: 10,
        right: 10,
      },
    },
    {
      id: 4,
      label: '4',
      shape: 'circle',
      margin: {
        left: 10,
        right: 10,
      },
    },
    {
      id: 5,
      label: '5',
      shape: 'circle',
      margin: {
        left: 10,
        right: 10,
      },
    },
    {
      id: 6,
      label: '6',
      shape: 'circle',
      margin: {
        left: 10,
        right: 10,
      },
    },
    {
      id: 7,
      label: '7',
      shape: 'circle',
      margin: {
        left: 10,
        right: 10,
      },
    },
  ],
  edges: [
    {
      id: '1-2',
      from: 1,
      to: 2,
      label: '10',
      font: {
        align: 'top',
      },
      capacity: 10,
      flowValue: 0,
    },
    {
      id: '1-4',
      from: 1,
      to: 4,
      label: '2',
      font: {
        align: 'top',
      },
      capacity: 2,
      flowValue: 0,
    },
    {
      id: '1-5',
      from: 1,
      to: 5,
      label: '4',
      font: {
        align: 'top',
      },
      capacity: 4,
      flowValue: 0,
    },
    {
      id: '2-3',
      from: 2,
      to: 3,
      label: '5',
      font: {
        align: 'top',
      },
      capacity: 5,
      flowValue: 0,
    },
    {
      id: '2-4',
      from: 2,
      to: 4,
      label: '7',
      font: {
        align: 'top',
      },
      capacity: 7,
      flowValue: 0,
    },
    {
      id: '3-7',
      from: 3,
      to: 7,
      label: '8',
      font: {
        align: 'top',
      },
      capacity: 8,
      flowValue: 0,
    },
    {
      id: '4-3',
      from: 4,
      to: 3,
      label: '6',
      font: {
        align: 'top',
      },
      capacity: 6,
      flowValue: 0,
    },
    {
      id: '4-7',
      from: 4,
      to: 7,
      label: '2',
      font: {
        align: 'top',
      },
      capacity: 2,
      flowValue: 0,
    },
    {
      id: '5-6',
      from: 5,
      to: 6,
      label: '10',
      font: {
        align: 'top',
      },
      capacity: 10,
      flowValue: 0,
    },
    {
      id: '6-7',
      from: 6,
      to: 7,
      label: '13',
      font: {
        align: 'top',
      },
      capacity: 13,
      flowValue: 0,
    },
  ],
};

const App = () => {
  // const [store, setStore] = useState<StoreType>({
  //   counter: 0,
  //   nodes: [],
  //   edges: [],
  // });
  const [store, setStore] = useState<StoreType>(data);
  const [step, setStep] = useState<number>(0);
  // const [isSetupCompleted, setIsSetupCompleted] = useState<Boolean>(false);
  const [isSetupCompleted, setIsSetupCompleted] = useState<Boolean>(true);

  console.log(store);

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
      <Graph graph={{ nodes: store.nodes, edges: store.edges }} countOfNodes={store.counter} />
    </Container>
  );
};

export default App;
