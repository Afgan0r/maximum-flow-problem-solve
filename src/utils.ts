import { StoreType, Edge } from './App/types';
import { CheckedNodeType } from './App/CreateEdges';

export const initializeNodes = (count: number): StoreType => {
  const result: StoreType = {
    counter: count,
    nodes: [],
    edges: [],
  };

  for (let i = 1; i <= count; i++) {
    result.nodes.push({
      id: i,
      label: `${i}`,
      shape: 'circle',
      margin: {
        left: 10,
        right: 10,
      },
    });
  }

  return result;
};

export const parseCheckedNodesToEdges = (checkedNodes: CheckedNodeType[], nodeId: number): Edge[] =>
  checkedNodes.map((checkedNode) => ({
    id: `${nodeId}-${checkedNode.id}`,
    from: nodeId,
    to: checkedNode.id,
    label: String(checkedNode.edgeCapacity),
    font: {
      align: 'top',
    },
    initialCapacity: checkedNode.edgeCapacity,
    currentCapacity: checkedNode.edgeCapacity,
    flowValue: 0,
  }));
