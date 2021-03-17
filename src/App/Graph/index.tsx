import Graph from 'react-graph-vis';
import { Options } from 'vis';
import { GraphContainer } from './styled';
import { nanoid } from 'nanoid';
import { GraphType, HistoryType, PreparedEdges, PreparedNodes } from 'App/types';
import { findMinEdge, parsePreparedGraph, pathSearch, prepareGraphDataToAlgorithm } from 'utils';
import Results from 'App/Results';

const options: Options = {
  locale: 'ru',
  nodes: {
    color: {
      border: '#000000',
      background: '#ffffff',
    },
  },
  layout: {
    hierarchical: {
      enabled: false,
      direction: 'LR',
      sortMethod: 'directed',
    },
  },
  edges: {
    color: '#000000',
    width: 1.1,
  },
  physics: {
    minVelocity: 0.01,
  },
  interaction: {
    dragView: false,
    zoomView: false,
  },
};

type GraphPropsType = {
  graph: GraphType;
  countOfNodes: number;
};

const GraphComponent = ({ graph, countOfNodes }: GraphPropsType) => {
  const preparedGraph = prepareGraphDataToAlgorithm(graph);

  let paths: string[][] = [];
  const history: HistoryType[] = [];
  let nodes: PreparedNodes = preparedGraph.nodes;
  let edges: PreparedEdges = preparedGraph.edges;
  let summ = 0;
  let isPathSearchCompleted = false;
  while (!isPathSearchCompleted) {
    const pathSearchResult = pathSearch({
      nodes,
      edges,
      currentNode: preparedGraph.nodes[1],
      target: countOfNodes,
      trace: [],
    });

    if (pathSearchResult === false) isPathSearchCompleted = true;
    else {
      const { edges: newEdges, minPathFlow, minPath } = findMinEdge({ path: pathSearchResult.trace, edges });
      nodes = pathSearchResult.nodes;
      edges = newEdges;
      paths.push(pathSearchResult.trace);
      summ += minPathFlow;

      history.push({
        path: pathSearchResult.trace,
        minPath,
        minPathFlow,
      });
    }
  }

  return (
    <>
      <GraphContainer>
        <Graph key={nanoid()} graph={parsePreparedGraph(graph.nodes, { nodes, edges })} options={options} />
      </GraphContainer>
      <Results history={history} flowSumm={summ} />
    </>
  );
};

export default GraphComponent;
