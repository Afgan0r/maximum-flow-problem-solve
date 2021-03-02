import Graph from 'react-graph-vis';
import { useState } from 'react';
import { Text } from './styled';
import { Options } from 'vis';
import { graphData } from 'react-graph-vis';

const options: Options = {
  locale: 'ru',
  layout: {
    hierarchical: {
      enabled: false,
      direction: 'LR',
      sortMethod: 'directed',
    },
  },
  edges: {
    color: '#000000',
    // smooth: {
    //   enabled: true,
    //   type: 'horizontal',
    //   roundness: 0.5,
    // }
  },
  physics: {
    minVelocity: 0.01,
  },
};

const GraphComponent = () => {
  const [graph] = useState<graphData>({
    nodes: [
      {
        id: 1,
        label: '1',
        shape: 'circle',
        margin: {
          left: 10,
          right: 10,
        },
        color: '#7be041',
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
        color: '#e04141',
      },
    ],
    edges: [
      { from: 1, to: 2, label: 'oof' },
      { from: 1, to: 5, label: 'oof' },
      { from: 1, to: 4 },
      { from: 1, to: 3 },
      { from: 3, to: 5 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
    ],
  });

  return (
    <div>
      <Text>Тестовый текст</Text>
      <Graph graph={graph} options={options} style={{ height: 500 }} />
    </div>
  );
};

export default GraphComponent;
