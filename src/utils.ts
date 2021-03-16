import {
  StoreType,
  Edge,
  PreparedGraph,
  PreparedNodes,
  GraphType,
  PreparedEdges,
  PreparedEdge,
  PathSearchPropsType,
  PathSearchReturnType,
  FindMinEdgePropsType,
} from './App/types';
import { CheckedNodeType } from './App/CreateEdges';
import keyBy from 'lodash/keyBy';
import dropRight from 'lodash/dropRight';
import map from 'lodash/map';

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
    capacity: checkedNode.edgeCapacity,
    flowValue: 0,
  }));

export const prepareGraphDataToAlgorithm = ({ edges, nodes }: GraphType): PreparedGraph => {
  const preparedNodes: PreparedNodes = keyBy(
    nodes.map((node) => {
      const outgoingEdges = edges.filter((edge) => edge.from === node.id);
      const neighbors = outgoingEdges.map((edge) => String(edge.to));

      return {
        id: node.id,
        isDeadEnd: false,
        neighbors,
      };
    }),
    'id'
  );
  const preparedEdges: PreparedEdges = keyBy(
    edges.map((edge) => ({
      id: edge.id,
      from: edge.from,
      to: edge.to,
      initialCapacity: edge.capacity,
      currentCapacity: edge.capacity,
      flowValue: edge.flowValue,
    })),
    'id'
  );

  const result: PreparedGraph = {
    nodes: preparedNodes,
    edges: preparedEdges,
  };

  return result;
};

export const pathSearch = ({ edges, nodes, currentNode, target, trace }: PathSearchPropsType): PathSearchReturnType => {
  if (currentNode.id === target) {
    return {
      trace: [...trace, String(currentNode.id)],
      nodes,
    };
  }

  const neighbors = map(currentNode.neighbors, (neighbor) => nodes[neighbor]);
  const notBlockedNeighbor = neighbors.find((neighbor) => {
    const edgeId = `${currentNode.id}-${neighbor.id}`;

    if (edges[edgeId].currentCapacity > 0 && !neighbor.isDeadEnd) return true;
  });

  if (notBlockedNeighbor === undefined && currentNode.id === 1) {
    return false;
  }
  if (notBlockedNeighbor === undefined) {
    return pathSearch({
      edges,
      nodes: {
        ...nodes,
        [currentNode.id]: {
          ...nodes[currentNode.id],
          isDeadEnd: true,
        },
      },
      currentNode: nodes[trace[trace.length - 1]],
      target,
      trace: dropRight(trace, 1),
    });
  }

  return pathSearch({
    edges,
    nodes,
    currentNode: notBlockedNeighbor,
    target,
    trace: [...trace, String(currentNode.id)],
  });
};

export const findMinEdge = ({ path, edges }: FindMinEdgePropsType): { edges: PreparedEdges; minPath: string; minPathFlow: number } => {
  const edgesByPath: PreparedEdge[] = [];

  path.map((nodeId, index) => {
    const nextNodeId = path[index + 1];
    const edgeId = `${nodeId}-${nextNodeId}`;

    if (!nextNodeId) return [];

    return edgesByPath.push(edges[edgeId]);
  });

  let minimalEdge = edgesByPath[0];
  edgesByPath.map((edge) => {
    if (edge.currentCapacity < minimalEdge.currentCapacity) minimalEdge = edge;
  });

  const edgesWithIncreasedFlow = edgesByPath.map((edge) => {
    const newCapacity = edge.currentCapacity - minimalEdge.currentCapacity;
    const flowValue = newCapacity ? edge.currentCapacity - minimalEdge.currentCapacity : 0;
    return {
      ...edge,
      currentCapacity: newCapacity,
      flowValue: flowValue,
    };
  });
  const newEdges = {
    ...edges,
    ...keyBy(edgesWithIncreasedFlow, 'id'),
  };

  return {
    edges: newEdges,
    minPath: minimalEdge.id,
    minPathFlow: minimalEdge.currentCapacity,
  };
};
