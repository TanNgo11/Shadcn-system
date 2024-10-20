import { Flex, Image, List, Typography } from 'antd';
import './styles.scss';

const data = [
  'Understand the basic concepts of mobile programming, including application architecture, user interface handling, graphics, navigation methods, and data connectivity.',
  'Build complete mobile applications with the capability to access both local and remote databases through REST API.',
  'Apply development and deployment skills on mobile platforms.',
];
const CourseDescriptionTab = () => {
  return (
    <div className="course-description-tab-container">
      <Flex justify="center" align="center">
        <Image
          src="https://th.bing.com/th/id/OIP.X0lQPk0QnmYgT_T9yW64NwHaEK?w=304&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          width={400}
        />
      </Flex>
      <Typography.Title className="course-description-tab-container__title" level={4}>
        COURSE DESCRIPTION
      </Typography.Title>
      <div>
        This course provides students with foundational knowledge in mobile programming, including
        application architecture, user interface handling, graphics, navigation methods, and data
        connectivity. Students will learn how to build complete mobile applications with the
        capability to access both local and remote databases through REST API, while also applying
        development and deployment skills on mobile platforms.
      </div>

      <Typography.Title className="course-description-tab-container__title" level={4}>
        COURSE OBJECTIVES
      </Typography.Title>
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta description={item} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default CourseDescriptionTab;
