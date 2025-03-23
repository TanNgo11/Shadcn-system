import { Tabs } from 'antd';
import { listTabs } from './helpers';

const CourseDetailTabs = () => {
  return <Tabs defaultActiveKey="1" items={listTabs} />;
};

export default CourseDetailTabs;
