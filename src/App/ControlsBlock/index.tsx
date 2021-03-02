import { Text } from 'styles/styled';
import { ControlsBlockContainer, ControlContainer } from './styled';

const ControlsBlock = () => (
  <ControlsBlockContainer>
    <ControlContainer>
      <Text>Добавить вершину:</Text>
    </ControlContainer>
    <ControlContainer>
      <Text>Добавить ребро:</Text>
    </ControlContainer>
  </ControlsBlockContainer>
);

export default ControlsBlock;
