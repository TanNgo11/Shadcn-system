import { Avatar, Card, Typography } from 'antd';
import { Link } from 'react-router-dom';
import './styles.scss';
import { AntDesignOutlined } from '@ant-design/icons';
import { useMemo } from 'react';
import { useCourseStore } from '@/hooks/useCourseStore';

interface CourseCardProps {
  name: string | undefined;
  description: string | undefined;
  avatar: string | undefined;
  studentId: string | undefined;
  courseId: string | undefined;
  courseCode: string | undefined;
}

const CourseCard = ({
  name,
  description,
  avatar,
  studentId,
  courseId,
  courseCode,
}: CourseCardProps) => {
  const setCourseDetail = useCourseStore((state) => state.setCourseDetail);

  const handleClick = () => {
    setCourseDetail({ name, description, avatar, studentId, courseId, courseCode });
  };

  return (
    <Link to={`/student/courses/${courseId}`} onClick={handleClick}>
      <Card className="course-card-container" hoverable cover={<img alt={name} src={avatar} />}>
        <Card.Meta
          title={
            <Link className="course-card-container__title" to={`/student/courses/${courseId}`}>
              {courseCode?.toUpperCase()}
            </Link>
          }
          description={
            <Typography.Paragraph ellipsis={{ rows: 3, expanded: false }}>
              {description}
            </Typography.Paragraph>
          }
        />
        <div className="course-card-container__footer">
          <span className="course-card-container__date">11-11-2023</span>
          <Avatar.Group>
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
            <a href="https://ant.design">
              <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
            </a>
            <Avatar style={{ backgroundColor: '#1677ff' }} icon={<AntDesignOutlined />} />
          </Avatar.Group>
        </div>
      </Card>
    </Link>
  );
};

export default CourseCard;
