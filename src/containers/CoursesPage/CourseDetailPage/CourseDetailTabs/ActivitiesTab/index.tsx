import { List } from 'antd';
import { FaFilePdf, FaFolderOpen } from 'react-icons/fa6';
import { IoIosPeople } from 'react-icons/io';
import { MdAnnouncement, MdForum } from 'react-icons/md';
import './styles.scss';
const data = [
  {
    title: (
      <div className="course-detail-page-container__activities-tab--icon__announcement">
        Announcements
      </div>
    ),
    icon: (
      <MdAnnouncement className="course-detail-page-container__activities-tab--icon course-detail-page-container__activities-tab--icon__announcement" />
    ),
  },
  {
    title: (
      <div className="course-detail-page-container__activities-tab--icon__attendance">
        Attendance
      </div>
    ),
    icon: (
      <IoIosPeople className="course-detail-page-container__activities-tab--icon course-detail-page-container__activities-tab--icon__attendance" />
    ),
  },
  {
    title: (
      <div className="course-detail-page-container__activities-tab--icon__forum">
        Forum for discussion2
      </div>
    ),
    icon: (
      <MdForum className="course-detail-page-container__activities-tab--icon course-detail-page-container__activities-tab--icon__forum" />
    ),
  },
  {
    title: (
      <div className="course-detail-page-container__activities-tab--icon__lessons">
        Lessons Resources
      </div>
    ),
    icon: (
      <FaFolderOpen className="course-detail-page-container__activities-tab--icon course-detail-page-container__activities-tab--icon__lessons" />
    ),
  },
  {
    title: (
      <div className="course-detail-page-container__activities-tab--icon__syllabus">Syllabus</div>
    ),
    icon: (
      <FaFilePdf className="course-detail-page-container__activities-tab--icon course-detail-page-container__activities-tab--icon__syllabus" />
    ),
  },
];
const ActivitiesTab = () => {
  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 2,
        xl: 2,
        xxl: 2,
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ border: '1px solid #e8e8e8', borderRadius: '4px', padding: '16px' }}>
          <List.Item.Meta
            avatar={item.icon}
            title={<a href="https://ant.design">{item.title}</a>}
          />
        </List.Item>
      )}
    />
  );
};

export default ActivitiesTab;
