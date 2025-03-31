import { List, Select } from 'antd';
import { CourseCard } from './components';
import useListCourses from './useListCourses';

const ListCourses = () => {
  const {
    states: { semestersOptions, selectedSemester, courses },
    handlers: { setSelectedSemester },
  } = useListCourses();
  return (
    <>
      <Select
        size={'large'}
        onChange={setSelectedSemester}
        style={{ width: 200 }}
        options={semestersOptions}
        value={selectedSemester}
      />

      <List
        style={{ marginTop: 24 }}
        rowKey={(item) => item.id}
        grid={{ gutter: 24, xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        dataSource={courses}
        renderItem={(course) => (
          <List.Item>
            <CourseCard
              name={course?.name || ''}
              startDate={course?.startDate}
              avatar={course?.imageUri || ''}
              courseId={course?.id}
              courseCode={course?.code}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default ListCourses;
