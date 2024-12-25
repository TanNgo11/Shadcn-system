import { useGetCurrentStudentInfo } from '@/queries/Students/useGetCurrentStudentInfo';
import { Descriptions } from 'antd';

const UserInfo = () => {
  const { student } = useGetCurrentStudentInfo();
  return (
    <Descriptions
      title="User Info"
      column={{
        xs: 1,
        sm: 1,
        md: 2,
        lg: 2,
        xl: 2,
      }}
    >
      <Descriptions.Item label="Full Name">
        {`${student?.firstName} ${student?.lastName}`}
      </Descriptions.Item>
      <Descriptions.Item label="Username">{student?.username}</Descriptions.Item>
      <Descriptions.Item label="Phone Number">{student?.phoneNumber}</Descriptions.Item>
      <Descriptions.Item label="Date of Birth">{student?.dateOfBirth}</Descriptions.Item>
      <Descriptions.Item label="Address">{student?.address}</Descriptions.Item>
      <Descriptions.Item label="Email">{student?.email}</Descriptions.Item>
      <Descriptions.Item label="Gender">{student?.gender}</Descriptions.Item>
      <Descriptions.Item label="Student? ID">{student?.studentId}</Descriptions.Item>
      <Descriptions.Item label="Major">{student?.major || 'N/A'}</Descriptions.Item>
      <Descriptions.Item label="Guardian Name">{student?.guardianName || 'N/A'}</Descriptions.Item>
      <Descriptions.Item label="Guardian Phone Number">
        {student?.guardianPhoneNumber || 'N/A'}
      </Descriptions.Item>
      <Descriptions.Item label="Nationality">{student?.nation || 'N/A'}</Descriptions.Item>
      <Descriptions.Item label="Religion">{student?.religion || 'N/A'}</Descriptions.Item>
      <Descriptions.Item label="Citizen ID">{student?.citizenId || 'N/A'}</Descriptions.Item>
      <Descriptions.Item label="Faculty">{student?.faculty || 'N/A'}</Descriptions.Item>
      <Descriptions.Item label="Degree Level">{student?.degreeLevel || 'N/A'}</Descriptions.Item>
      <Descriptions.Item label="School Year">{student?.schoolYear || 'N/A'}</Descriptions.Item>
      <Descriptions.Item label="Enrollment Date">
        {student?.enrollmentDate || 'N/A'}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default UserInfo;
