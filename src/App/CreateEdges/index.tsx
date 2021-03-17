import { Typography, Checkbox, Button, Space, InputNumber } from 'antd';
import { Node, Edge, IdType } from '../types';
import { useCallback, useState } from 'react';
import { Container, RowContainer } from './styled';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { parseCheckedNodesToEdges } from 'utils';

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
  const handleCheckBoxCheck = useCallback(
    (e: CheckboxChangeEvent, nodeId: number, capacity: number) => {
      const state = e.target.checked;

      if (state) {
        const newValue = {
          id: nodeId,
          edgeCapacity: capacity,
        };
        setCheckedNodes([...checkedNodes, newValue]);
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
        {nodes.map((node) => {
          const index = checkedNodes.findIndex((checkedNode) => checkedNode.id === node.id);
          const isDisabled = isLastStep || step + 1 === node.id || node.id === 1 || edges.findIndex((edge) => edge.from === node.id && edge.to === step + 1) > -1;
          const checked = checkedNodes.findIndex((checkedNode) => checkedNode.id === node.id) >= 0;

          return (
            <RowContainer>
              <Checkbox
                autoFocus
                disabled={isDisabled}
                checked={checked}
                onChange={(e) => handleCheckBoxCheck(e, node.id, 0)}>{`Вершина ${node.label}`}</Checkbox>
              <InputNumber
                disabled={isDisabled || !checked}
                min={0}
                defaultValue={0}
                value={index < 0 ? 0 : checkedNodes[index].edgeCapacity}
                onChange={(value) => {
                  const newCheckedNodes = checkedNodes.map((checkedNode) => ({
                    id: checkedNode.id,
                    edgeCapacity: node.id === checkedNode.id ? value : checkedNode.edgeCapacity,
                  }));
                  setCheckedNodes(newCheckedNodes);
                }}
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
            }}>
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
