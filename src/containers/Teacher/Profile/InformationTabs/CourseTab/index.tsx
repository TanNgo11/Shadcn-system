import { Descriptions } from 'antd';
import { DescriptionsProps } from 'antd/lib';

const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'UserName',
    children: 'Zhou Maomao',
  },
  {
    key: '2',
    label: 'Telephone',
    children: '1810000000',
  },
  {
    key: '3',
    label: 'Live',
    children: 'Hangzhou, Zhejiang',
  },
  {
    key: '4',
    label: 'Remark',
    children: 'empty',
  },
  {
    key: '5',
    label: 'Address',
    children: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
  },
  {
    key: '6',
    label: 'Max SV',
    children: '123456789',
  },
  {
    key: '7',
    label: 'Phone Number',
    children: '0987654321',
  },
  {
    key: '8',
    label: 'ID Number',
    children: 'A123456789',
  },
  {
    key: '9',
    label: 'Gender',
    children: 'Male',
  },
  {
    key: '10',
    label: 'Date of Birth',
    children: '1990-01-01',
  },
  {
    key: '11',
    label: 'Email',
    children: 'zhou.maomao@example.com',
  },
  {
    key: '12',
    label: 'Nationality',
    children: 'Chinese',
  },
  {
    key: '13',
    label: 'Major',
    children: 'Computer Science',
  },
  {
    key: '14',
    label: 'Enrollment Year',
    children: '2010',
  },
  {
    key: '15',
    label: 'Graduation Year',
    children: '2014',
  },
];

const CourseTab = () => {
  return <Descriptions title="Course" items={items} column={2} />;
};

export default CourseTab;
