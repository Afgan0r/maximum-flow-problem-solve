import { Typography, Button, Space, InputNumber } from 'antd';
import { Node, Edge, IdType } from '../types';
import { useCallback, useState } from 'react';
import { Container, RowContainer } from './styled';
import { generateInputKeys, parseCheckedNodesToEdges } from 'utils';

type CreateEdgesPropsType = {
  nodes: Node[];
  onCreate: (edges: Edge[]) => void;
};
export type CheckedNodeType = {
  id: IdType;
  edgeCapacity: number;
};

const CreateEdgesComponent = ({ nodes, onCreate }: CreateEdgesPropsType) => {
  const [step, setStep] = useState<number>(0);
  const [checkedNodes, setCheckedNodes] = useState<CheckedNodeType[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [inputKeys, setInputKeys] = useState(generateInputKeys(edges.length));
  const isLastStep = step === nodes.length - 1;

  const deleteFromCheckedNodes = useCallback(
    (nodeId: number) => {
      const index = checkedNodes.findIndex((checkedNode) => checkedNode.id === nodeId);
      const newCheckedNodes = checkedNodes.slice();
      newCheckedNodes.splice(index, 1);

      setCheckedNodes(newCheckedNodes);
    },
    [checkedNodes]
  );
  const handleInputChange = useCallback(
    (nodeId: number, capacity: number) => {
      const state = capacity > 0;

      if (state) {
        let newCheckedNodes = [...checkedNodes];
        const checkedNodeIndex = checkedNodes.findIndex((checkedNode) => checkedNode.id === nodeId);
        if (checkedNodeIndex > -1) {
          newCheckedNodes[checkedNodeIndex].edgeCapacity = capacity;
        } else {
          const newValue = {
            id: nodeId,
            edgeCapacity: capacity,
          };
          newCheckedNodes = [...newCheckedNodes, newValue];
        }

        setCheckedNodes(newCheckedNodes);
      } else {
        deleteFromCheckedNodes(nodeId);
      }
    },
    [checkedNodes, deleteFromCheckedNodes]
  );

  return (
    <Container>
      <Space direction='vertical'>
        <Typography.Text>
          Создание ребер для <b>вершины {step + 1}</b>:
        </Typography.Text>
        {nodes.map((node, i) => {
          const index = checkedNodes.findIndex((checkedNode) => checkedNode.id === node.id);
          const isDisabled =
            isLastStep ||
            step + 1 === node.id ||
            node.id === 1 ||
            edges.findIndex((edge) => edge.from === node.id && edge.to === step + 1) > -1;
          const value = index < 0 || isDisabled ? 0 : checkedNodes[index].edgeCapacity;

          return (
            <RowContainer key={inputKeys[i]}>
              <Typography>Вершина {node.label}: </Typography>
              <InputNumber
                value={value}
                disabled={isDisabled}
                min={0}
                defaultValue={0}
                onChange={(value) => {
                  handleInputChange(node.id, value);
                }}
                tabIndex={isDisabled ? -1 : 0}
              />
            </RowContainer>
          );
        })}
        {!isLastStep ? (
          <Button
            type='primary'
            onClick={() => {
              setStep(step + 1);
              setEdges([...edges, ...parseCheckedNodesToEdges(checkedNodes, step + 1)]);
              setCheckedNodes([]);
              setInputKeys(generateInputKeys(nodes.length));
            }}
            >
            Далее
          </Button>
        ) : (
          <Button type='primary' onClick={() => onCreate([...edges, ...parseCheckedNodesToEdges(checkedNodes, step + 1)])}>
            Закончить
          </Button>
        )}
      </Space>
    </Container>
  );
};

export default CreateEdgesComponent;
