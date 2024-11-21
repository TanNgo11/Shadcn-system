import { useGetTeacherById } from '@/queries/Teacher/useGetTeacherById';
import { useParams } from 'react-router-dom';
import { Col, Form, Input, Row, Card, Select, DatePicker } from 'antd';

const CreateEditTeacher = () => {
  const { id } = useParams();
  const teacherId = id || '';
  const { teacher } = useGetTeacherById({ id: teacherId });

  const generateAcademicYears = () => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - (currentYear % 4);
    const years = [];
    for (let i = startYear; i >= 2000; i -= 4) {
      years.push(`${i}-${i + 4}`);
    }
    return years;
  };

  return (
    <Form layout="vertical">
      <Card title="Account Information" bordered={false}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Username">
              <Input placeholder="input placeholder" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Email">
              <Input placeholder="input placeholder" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Password">
              <Input type="password" placeholder="input placeholder" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Confirmation Password">
              <Input type="password" placeholder="input placeholder" />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      <Card title="Profile Information" bordered={false} style={{ marginTop: 16 }}>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="First Name">
              <Input placeholder="input placeholder" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Last Name">
              <Input placeholder="input placeholder" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Gender">
              <Select placeholder="Select gender">
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
                <Select.Option value="other">Other</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Nationality">
              <Input placeholder="input placeholder" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Nation">
              <Input placeholder="input placeholder" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Citizen Id">
              <Input placeholder="input placeholder" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Phone Number">
              <Input placeholder="input placeholder" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Employment Date">
              <DatePicker placeholder="Select date" style={{ width: '100%' }} format="DD-MM-YYYY" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Faculty">
              <Input placeholder="input placeholder" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}></Row>
      </Card>
    </Form>
  );
};

export default CreateEditTeacher;
