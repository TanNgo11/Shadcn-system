import { useNavigate } from 'react-router-dom';
import { Card, Col, Grid, Progress, Row } from 'antd';
import { BookOutlined, DollarOutlined, TrophyOutlined, UserOutlined } from '@ant-design/icons';
import { Line } from '@ant-design/charts';

export default function HomePage() {
  const navigate = useNavigate();

  // Line chart data for "Teacher Performance"
  const teacherPerformanceData = [
    { month: 'Jan', performance: 10 },
    { month: 'Feb', performance: 15 },
    { month: 'Mar', performance: 20 },
    { month: 'Apr', performance: 35 },
    { month: 'May', performance: 30 },
    { month: 'Jun', performance: 25 },
    { month: 'Jul', performance: 40 },
  ];

  const config = {
    data: teacherPerformanceData,
    xField: 'month',
    yField: 'performance',
    smooth: true,
    color: ['#7b61ff', '#a1a1a1'],
    autoFit: true,
    style: { height: 200 },
  };
  return (
    <div style={{ padding: '20px' }}>
      {/* Top Stats Row */}
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card title="Total Students" bordered={false} style={{ textAlign: 'center' }}>
            <BookOutlined style={{ fontSize: '30px', color: '#1890ff' }} />
            <h2>2347</h2>
            <p style={{ color: '#52c41a' }}>18% Higher Than Last Month</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Total Teachers" bordered={false} style={{ textAlign: 'center' }}>
            <UserOutlined style={{ fontSize: '30px', color: '#52c41a' }} />
            <h2>258</h2>
            <p style={{ color: '#52c41a' }}>21% Higher Than Last Month</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Awards" bordered={false} style={{ textAlign: 'center' }}>
            <TrophyOutlined style={{ fontSize: '30px', color: '#faad14' }} />
            <h2>27</h2>
            <p style={{ color: '#faad14' }}>37% Higher Than Last Month</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Total Earning" bordered={false} style={{ textAlign: 'center' }}>
            <DollarOutlined style={{ fontSize: '30px', color: '#f5222d' }} />
            <h2>$25,698</h2>
            <p style={{ color: '#f5222d' }}>10% Higher Than Last Month</p>
          </Card>
        </Col>
      </Row>

      {/* Fees Collection and Admission Reports */}
      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        <Col span={12}>
          <Card title="Fees Collection Report" bordered={false}>
            <Row>
              <Col span={8}>
                <p>Today</p>
                <h3>105</h3>
              </Col>
              <Col span={8}>
                <p>This Week</p>
                <h3>825</h3>
              </Col>
              <Col span={8}>
                <p>This Month</p>
                <h3>22067</h3>
              </Col>
            </Row>
            <Progress percent={74} strokeColor="#faad14" />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="New Admission Report" bordered={false}>
            <Row>
              <Col span={8}>
                <p>Today</p>
                <h3>107</h3>
              </Col>
              <Col span={8}>
                <p>This Week</p>
                <h3>268</h3>
              </Col>
              <Col span={8}>
                <p>This Month</p>
                <h3>847</h3>
              </Col>
            </Row>
            <Progress percent={74} strokeColor="#52c41a" />
          </Card>
        </Col>
      </Row>

      {/* Teacher Performance Chart */}
      <Row style={{ marginTop: '20px' }}>
        <Col span={24}>
          <Card title="Teacher Performance" bordered={false}>
            <Line {...config} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
