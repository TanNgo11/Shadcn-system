import { AntDesignOutlined } from '@ant-design/icons';
import { Avatar, Card, Typography } from 'antd';
import { Link } from 'react-router-dom';
import './styles.scss';
import { formatDate } from '@/utils';

interface CourseCardProps {
  name: string;
  startDate: string;
  avatar: string;
  courseId: string;
  courseCode: string;
}

const CourseCard = ({ name, startDate, avatar, courseId, courseCode }: CourseCardProps) => {
  return (
    <Link to={`/teacher/courses/${courseId}`}>
      <Card className="course-card-container" hoverable cover={<img alt={name} src={avatar} />}>
        <Card.Meta
          title={
            <Link className="course-card-container__title" to={`/teacher/courses/${courseId}`}>
              {courseCode?.toUpperCase()}
            </Link>
          }
          description={
            <Typography.Paragraph ellipsis={{ rows: 3, expanded: false }}>
              {name}
            </Typography.Paragraph>
          }
        />
        <div className="course-card-container__footer">
          <span className="course-card-container__date">{formatDate(startDate)}</span>
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
