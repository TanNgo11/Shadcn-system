import { Collapse, Space } from 'antd';
import WeekLessonContent from './WeekLessonContent';

const weeks = Array.from({ length: 10 }, (_, i) => ({
  key: (i + 1).toString(),
  label: `Week ${i + 1}`,
  children: <WeekLessonContent />,
}));

const WeekCollapse = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    {weeks.map((week) => (
      <Collapse style={{ marginBottom: '10px' }} key={week.key} items={[week]} />
    ))}
  </Space>
);

export default WeekCollapse;
