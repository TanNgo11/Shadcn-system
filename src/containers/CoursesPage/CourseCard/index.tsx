import { Avatar, Card, Typography } from 'antd';
import { Link } from 'react-router-dom';
import './styles.scss';
import { AntDesignOutlined } from '@ant-design/icons';

type CourseCardProps = {
  title: string;
  description: string;
  avatar: string;
};

const CourseCard = ({ title, description, avatar }: CourseCardProps) => {
  return (
    <Link to={'/course/1'}>
      <Card className="course-card-container " hoverable cover={<img alt={title} src={avatar} />}>
        <Card.Meta
          title={
            <Link className="course-card-container__title" to={'/course/1'}>
              {title}
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
