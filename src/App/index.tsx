import { Container, FormContainer } from './styled';
import Graph from './Graph';
import { StoreType } from './types';
import ControlsBlock from './ControlsBlock';
import { useState } from 'react';
import { Modal, Steps } from 'antd';
import CreateNodes from './CreateNodes';

const App = () => {
  const [isModalOpen] = useState(true);
  const [store, setStore] = useState<StoreType>({
    counter: 0,
    nodes: [],
    edges: [],
  });
  const [step, setStep] = useState<number>(0);

  return isModalOpen ? (
    <Modal title='Создание графа' visible={isModalOpen} footer={null} closable={false} centered>
        <Steps size='small' current={step}>
          <Steps.Step title='Создание вершин' />
          <Steps.Step title='Создание ребер' />
        </Steps>
        <FormContainer>
          <CreateNodes onCreate={() => setStep(1)} />
        </FormContainer>
    </Modal>
  ) : (
    <Container>
      <Graph graph={{ nodes: store.nodes, edges: store.edges }} />
      <ControlsBlock store={store} setStore={setStore} />
    </Container>
  );
};

export default App;
