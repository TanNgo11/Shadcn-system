import { useGetStudentById } from '@/queries/Students/useGetStudentById';
import { Col, Form, Input, Row, Card, Select, DatePicker } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { useForm } from 'react-hook-form';

const CreateEditStudent = () => {
  const { id } = useParams();
  const studentId = id || '';
  const { student } = useGetStudentById({ id: studentId });
  // const {
  //   control,
  //   handleSubmit,
  //   reset,
  //   formState: { errors, isDirty },
  // } = useForm<StudentResisterForm>({
  //   mode: 'onChange',
  //   reValidateMode: 'onChange',
  //   defaultValues: studentRegisterInitialState,
  //   resolver: zodResolver(studentRegisterFormSchema),
  // });

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
            <Form.Item label="Middle Name">
              <Input placeholder="input placeholder" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Last Name">
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
            <Form.Item label="Gender">
              <Select placeholder="Select gender">
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
                <Select.Option value="other">Other</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Enrolment Date">
              <DatePicker placeholder="Select date" style={{ width: '100%' }} format="DD-MM-YYYY" />
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
            <Form.Item label="Faculty">
              <Input placeholder="input placeholder" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Major">
              <Input placeholder="input placeholder" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="School Year">
              <Select placeholder="Select academic year">
                {generateAcademicYears().map((year) => (
                  <Select.Option key={year} value={year}>
                    {year}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Guardian Name">
              <Input placeholder="input placeholder" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Guardian Phone Number">
              <Input placeholder="input placeholder" />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Form>
  );
};

export default CreateEditStudent;
