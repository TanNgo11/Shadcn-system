import { Table, Typography } from 'antd';
import './styles.scss';
const columns = [
  {
    title: 'CLO',
    dataIndex: 'clo',
    key: 'clo',
    width: '20%',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    width: '60%',
  },
  {
    title: 'Implementation',
    dataIndex: 'implementation',
    key: 'implementation',
    width: '20%',
  },
];

const data = [
  {
    key: '1',
    clo: 'CLO1',
    description:
      'Apply concepts and principles of user interface handling and navigation methods on mobile application platforms to design and implement user interfaces.',
    implementation: 'PLO1.1',
  },
  {
    key: '2',
    clo: 'CLO2',
    description:
      'Apply knowledge of local and remote database connectivity through services (REST API) to develop mobile applications with data interaction capabilities.',
    implementation: 'PLO1.1, PLO2',
  },
  {
    key: '3',
    clo: 'CLO3',
    description:
      'Develop a complete mobile application, including designing and implementing features that use data from the database.',
    implementation: 'PLO4',
  },
  {
    key: '4',
    clo: 'CLO4',
    description:
      'Contribute effectively in workgroups, demonstrating the ability to work as both a member and a leader when necessary to achieve the common goals of the project.',
    implementation: 'PLO7',
  },
  {
    key: '5',
    clo: 'CLO5',
    description:
      'Demonstrate serious behavior and professional working attitude in all learning and practice activities.',
    implementation: 'PLO9',
  },
];
const LearningMaterialsTab = () => {
  return (
    <div className="learning-materials-tab-container">
      <div className="learning-materials-tab-container__learning">
        <Typography.Title level={4}>LEARNING MATERIALS</Typography.Title>
        <div className="learning-materials-tab-container__learning--subtitle">
          <Typography.Title level={5}>Books and Teaching Materials</Typography.Title>
          <p className="learning-materials-tab-container__learning--description">
            [1] Meta Platforms, Inc. 2024, React Native, access 18/07/2023,
            https://reactnative.dev/docs/getting-started
          </p>
        </div>
        <div className="learning-materials-tab-container__learning--subtitle">
          <Typography.Title level={5}>References</Typography.Title>
          <p className="learning-materials-tab-container__learning--description">
            [2] Sufyan bin Uzayr (2023), Mastering React Native : A Beginner's Guide, Published by
            Ed.: First edition. Boca Raton : CRC Press. ISBNs: 9781032314723.
          </p>
          <p className="learning-materials-tab-container__learning--description">
            [3] Alexander Benedikt Kuttig(2023), Professional React Native: Expert techniques and
            solutions for building high-quality, cross-platform, production-ready apps, Published by
            Packt Publishing.
          </p>
        </div>
      </div>
      <div className="learning-materials-tab-container__outcome">
        <Typography.Title level={4}>COURSE LEARNING OUTCOMES (CLOs)</Typography.Title>
        <Table columns={columns} dataSource={data} pagination={false} bordered />
      </div>
    </div>
  );
};

export default LearningMaterialsTab;
