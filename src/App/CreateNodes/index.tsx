import { InputNumber, Typography } from 'antd';
import { useState } from 'react';
import { InputContainer, Button } from './styled';

type CreateNodesPropsType = {
  onCreate: (count: number) => void;
};

const CreateNodes = ({ onCreate }: CreateNodesPropsType) => {
  const min = 1;
  const max = 20;
  const [value, setValue] = useState<number>(4);

  return (
    <>
      <InputContainer>
        <Typography.Text>Количество вершин:</Typography.Text>
        <InputNumber
          autoFocus
          min={min}
          max={max}
          onChange={(value) => setValue(value)}
          onKeyUp={(e) => (e.key === 'Enter' ? onCreate(Number(e.currentTarget.value)) : null)}
        />
      </InputContainer>
      <Button disabled={value < min || value > max} onClick={() => onCreate(value)}>
        Создать вершины
      </Button>
    </>
  );
};

export default CreateNodes;
