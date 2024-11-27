import { Button } from 'antd';




const ButtonComponent: React.FC<Props> = ({ content }) => {
  return <Button>{content}</Button>;
};

export interface Props {
  content?: string;
  type?: string;
}

export default ButtonComponent;
