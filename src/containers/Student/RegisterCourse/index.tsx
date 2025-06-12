import { useGetCurrentOpenSemester } from '@queries/Semester/useGetCurrentOpenSemester';
import StudentRegisterCourse from './OpeningCourseTable';
import RegisteredCourseTable from './RegisteredCourseTable';
import { InvalidRegistrationDatePage } from './InvalidRegistrationDate';

const RegisterCourse = () => {
  const { semester, isPending, isError } = useGetCurrentOpenSemester();

  if (isPending) return <p>Loading...</p>;
  if (isError || !semester) return <InvalidRegistrationDatePage />;

  return (
    <>
      {semester.registrationOpen ? (
        <>
          <StudentRegisterCourse />
          <RegisteredCourseTable />
        </>
      ) : (
        <InvalidRegistrationDatePage />
      )}
    </>
  );
};

export default RegisterCourse;
