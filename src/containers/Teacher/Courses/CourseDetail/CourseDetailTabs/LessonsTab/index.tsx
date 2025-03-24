import { Collapse, Space } from 'antd';
import useLessonsTab from './useLessonsTab';
import './styles.scss';


const WeekCollapse = () => {
  const {
    states: { lessons, lessonItems },
  } = useLessonsTab();

  return (
    <Space direction="vertical" style={{ width: '100%' }} className='lessons-tab-container'>
      {lessonItems.map((lesson) => (
        <Collapse style={{ marginBottom: '10px' }} key={lesson?.id} items={[lesson]} />
      ))}
    </Space>
  );
};

export default WeekCollapse;
