import { StudentProfileResponse } from '@queries/Students/types';
import { Descriptions, Spin } from 'antd';
import { DescriptionsProps } from 'antd/lib';

const CourseTab = (prop: Prop) => {
  const { profile: student, isFetching } = prop;

  if (isFetching) return <Spin size="large" />;

  const items: DescriptionsProps['items'] = [
    { key: '1', label: 'UserName', children: student?.username || 'N/A' },
    { key: '2', label: 'Telephone', children: student?.phoneNumber || 'N/A' },
    { key: '3', label: 'Live', children: student?.address || 'N/A' },
    { key: '4', label: 'Remark', children: 'empty' },
    { key: '5', label: 'Address', children: student?.address || 'N/A' },
    { key: '6', label: 'Max SV', children: '30' },
    { key: '7', label: 'Phone Number', children: student?.phoneNumber || 'N/A' },
    { key: '8', label: 'ID Number', children: student?.citizenId || 'N/A' },
    { key: '9', label: 'Gender', children: student?.gender || 'N/A' },
    { key: '10', label: 'Date of Birth', children: student?.dateOfBirth || 'N/A' },
    { key: '11', label: 'Email', children: student?.email || 'N/A' },
    { key: '12', label: 'Nationality', children: student?.nationality || 'N/A' },
    { key: '13', label: 'Major', children: student?.major || 'N/A' },
    { key: '14', label: 'Enrollment Year', children: student?.enrollmentDate || 'N/A' },
    { key: '15', label: 'Graduation Year', children: '2014' },
  ];

  return <Descriptions title="Course" items={items} column={2} />;
};
type Prop = {
  profile: StudentProfileResponse;
  isFetching: boolean;
};

export default CourseTab;
