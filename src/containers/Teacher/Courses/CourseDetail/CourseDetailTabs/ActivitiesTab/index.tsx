import { List } from 'antd';
import { useState } from 'react';
import { FaFilePdf, FaFolderOpen } from 'react-icons/fa6';
import { IoIosPeople } from 'react-icons/io';
import { MdAnnouncement, MdForum } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import AttendanceTableView from './AttendanceTableView';
import './styles.scss';

const ActivitiesTab = () => {
  const { courseId } = useParams();
  const [attendanceModalVisible, setAttendanceModalVisible] = useState(false);

  const handleAttendanceClick = () => {
    setAttendanceModalVisible(true);
  };

  const handleCloseAttendanceModal = () => {
    setAttendanceModalVisible(false);
  };

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
      onClick: () => {},
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
      onClick: handleAttendanceClick,
    },
    {
      title: (
        <div className="course-detail-page-container__activities-tab--icon__forum">
          Forum for discussion
        </div>
      ),
      icon: (
        <MdForum className="course-detail-page-container__activities-tab--icon course-detail-page-container__activities-tab--icon__forum" />
      ),
      onClick: () => {},
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
      onClick: () => {},
    },
    {
      title: (
        <div className="course-detail-page-container__activities-tab--icon__syllabus">Syllabus</div>
      ),
      icon: (
        <FaFilePdf className="course-detail-page-container__activities-tab--icon course-detail-page-container__activities-tab--icon__syllabus" />
      ),
      onClick: () => {},
    },
  ];

  return (
    <>
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
          <List.Item
            style={{
              border: '1px solid #e8e8e8',
              borderRadius: '4px',
              padding: '16px',
              cursor: 'pointer',
            }}
            onClick={item.onClick}
          >
            <List.Item.Meta avatar={item.icon} title={item.title} />
          </List.Item>
        )}
      />
      <AttendanceTableView
        courseId={courseId.toString()}
        visible={attendanceModalVisible}
        onClose={handleCloseAttendanceModal}
      />
    </>
  );
};

export default ActivitiesTab;
