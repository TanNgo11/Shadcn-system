import { TeacherResponse } from '@queries/Teachers/types';
import { Descriptions } from 'antd';
import { DescriptionsProps } from 'antd/lib';

interface TeacherTabProps {
  teacherProfile: TeacherResponse;
}

const TeacherTab = ({ teacherProfile }: TeacherTabProps) => {
  const items: DescriptionsProps['items'] = [
    { key: '1', label: 'UserName', children: teacherProfile?.username ?? 'N/A' },
    { key: '2', label: 'Telephone', children: teacherProfile?.phoneNumber ?? 'N/A' },
    { key: '3', label: 'Address', children: teacherProfile?.address ?? 'N/A' },
    { key: '4', label: 'Max SV', children: '30'},
    // { key: '5', label: 'ID Number', children: teacherProfile?.idNumber ?? 'N/A' },
    { key: '6', label: 'Gender', children: teacherProfile?.gender ?? 'N/A' },
    { key: '7', label: 'Date of Birth', children: teacherProfile?.dateOfBirth ?? 'N/A' },
    { key: '8', label: 'Email', children: teacherProfile?.email ?? 'N/A' },
    { key: '9', label: 'Nationality', children: teacherProfile?.nationality ?? 'N/A' },
    { key: '10', label: 'Major', children: teacherProfile?.major ?? 'N/A' },
    { key: '11', label: 'Enrollment Year', children: teacherProfile?.enrollmentYear ?? 'N/A' },
    { key: '12', label: 'Graduation Year', children: teacherProfile?.graduationYear ?? 'N/A' },
  ];

  return <Descriptions title="Teacher Info" items={items} column={2} />;
};

export default TeacherTab;
