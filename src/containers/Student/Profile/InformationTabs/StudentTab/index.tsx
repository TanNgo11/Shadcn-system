import { StudentProfileResponse } from '@queries/Students/types';
import { Descriptions, Spin } from 'antd';
import { getProcessedStudentData } from './helpers';
import { useGetDepartmentList } from '@queries/Departments/useGetDepartmentList';

const UserInfo = (props: Prop) => {
  const { profile, isFetching } = props;
  const { departments } = useGetDepartmentList({ enabled: true });
  if (isFetching) return <Spin size="large" />;
  return (
    <Descriptions title="User Info" column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
      {getProcessedStudentData(profile, departments).map(({ label, value }) => (
        <Descriptions.Item key={label} label={label}>
          {value}
        </Descriptions.Item>
      ))}
    </Descriptions>
  );
};

type Prop = {
  profile: StudentProfileResponse;
  isFetching: boolean;
};

export default UserInfo;
