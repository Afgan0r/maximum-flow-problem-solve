import Graph from 'react-graph-vis';
import { Options } from 'vis';
import { GraphData } from 'react-graph-vis';
import { GraphContainer } from './styled';
import { nanoid } from 'nanoid';

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
  graph: GraphData;
};

const GraphComponent = ({
  graph,
}: GraphPropsType) => {
  return (
    <GraphContainer>
      <Graph key={nanoid()} graph={graph} options={options} />
    </GraphContainer>
  );
};

export default GraphComponent;
