import { HistoryType } from 'App/types';
import { Container } from './styled';
import { Space, Collapse, Typography } from 'antd';

type ResultsComponentPropsType = {
  history: HistoryType[];
  flowSumm: number;
};

const ResultsComponent = ({ history, flowSumm }: ResultsComponentPropsType) => (
  <Container>
    <Typography.Title level={4}>Результаты:</Typography.Title>
    <Typography>Количество всех возможных потоков в сети: {history.length}</Typography>
    <Collapse ghost>
      {history.map((value, i) => (
        <Collapse.Panel header={value.path.join(' - ')} key={i}>
          <Space direction='vertical' size='small'>
            <Typography>Минимальный путь: {value.minPath}</Typography>
            <Typography>Значение потока на этом пути: {value.minPathFlow}</Typography>
          </Space>
        </Collapse.Panel>
      ))}
    </Collapse>
    <Space direction='vertical' size='small'>
      <Typography.Title level={4}>Решение:</Typography.Title>
      <Typography>Максимальное значение потока: {flowSumm}</Typography>
    </Space>
  </Container>
);

export default ResultsComponent;
