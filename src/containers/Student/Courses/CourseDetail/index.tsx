import { ProCard } from '@ant-design/pro-components';
import { Col, Row, Typography } from 'antd';
import CourseDetailTabs from './CourseDetailTabs';
import TeacherInformation from './TeacherInformation';
import './styles.scss';
import useGetCourseDetail from './useGetCourseDetail';

const CourseDetail = () => {
  const {
    states: { teacherInformation, courseTitle },
  } = useGetCourseDetail();

  return (
    <div className="course-detail-page-container ">
      <Typography.Title level={3}>Welcome to {courseTitle}</Typography.Title>

      <Row
        justify="center"
        className="course-detail-page-container"
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
      >
        <Col
          xs={{
            span: 24,
          }}
          md={{
            span: 8,
          }}
        >
          <TeacherInformation {...teacherInformation} id={Number(teacherInformation?.id)} />
        </Col>
        <Col
          xs={{
            span: 24,
          }}
          md={{
            span: 16,
          }}
        >
          <ProCard
            className="course-detail-page-container__information-tabs"
            colSpan={{ xs: 24, md: 16 }}
            bordered
          >
            <CourseDetailTabs />
          </ProCard>
        </Col>
      </Row>
    </div>
  );
};

export default CourseDetail;
