import { Table } from 'antd';

const columns = [
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    width: '20%',
    render: (text: any, record: any) => (
      <div>
        {text} <span>{record.subType}</span>
      </div>
    ),
  },
  {
    title: 'Content',
    dataIndex: 'content',
    key: 'content',
  },
  {
    title: 'Method',
    dataIndex: 'method',
    key: 'method',
  },
  {
    title: 'CLO',
    dataIndex: 'clo',
    key: 'clo',
  },
  {
    title: 'Weights',
    dataIndex: 'weights',
    key: 'weights',
  },
];

const data = [
  {
    key: '1',
    type: 'Regular',
    subType: '(1)',
    content: 'Analyze, design, and build applications on mobile platforms.',
    method: 'Labs',
    clo: 'CLO1,2,3',
    weights: '20%',
  },
  {
    key: '2',
    type: 'Regular',
    subType: '(2)',
    content: 'Attendance',
    method: 'Attendance',
    clo: 'CLO5',
    weights: '5%',
  },
  {
    key: '3',
    type: 'Regular',
    subType: '(3)',
    content: 'The skill of building an application on a mobile platform by yourself.',
    method: 'Project',
    clo: 'CLO1,2,3,4',
    weights: '35%',
  },
  {
    key: '4',
    type: 'Summary',
    subType: '(4)',
    content: 'Design and write source code for mobile application screens.',
    method: 'Practice on a computer',
    clo: 'CLO1,2,3',
    weights: '40%',
  },
];

const AssessmentPlanTab = () => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      bordered
      summary={() => (
        <Table.Summary.Row>
          <Table.Summary.Cell index={0} colSpan={4}>
            SUM
          </Table.Summary.Cell>
          <Table.Summary.Cell index={4}>100%</Table.Summary.Cell>
        </Table.Summary.Row>
      )}
    />
  );
};

export default AssessmentPlanTab;
