import { useNotification } from '@/containers/StartupContainers/ToastContainer';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Typography } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { baseCourseCreationSchema, initBaseCourseValue } from './helper';
import useCreateBaseCourse from '@/queries/Courses/useCreateBaseCourse';
import { useGetAllCourse } from '@/queries/Courses/useGetAllCourses';
import { BaseCoursePayload } from '../helpers';

const CreateEditBaseCourse = () => {
  const toast = useNotification();
  const navigate = useNavigate();
  const { id } = useParams();
  const { courses, setParams, handleInvalidateCoursesList } = useGetAllCourse({
    tableParams: {
      current: 1,
      pageSize: 100,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BaseCoursePayload>({
    resolver: zodResolver(baseCourseCreationSchema),
    defaultValues: initBaseCourseValue,
  });

  const { onCreateBaseCourse } = useCreateBaseCourse({
    onSuccess: () => {
      toast.success({
        message: 'Create base course successfully',
      });
      handleInvalidateCoursesList({});
      navigate(-1);
    },
    onError: (error) => {
      toast.error({
        message: 'Create base course failed',
        description: error.message,
      });
    },
  });

  const {
    reset,
    formState: { isDirty },
  } = useForm<BaseCoursePayload>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: initBaseCourseValue,
    resolver: zodResolver(baseCourseCreationSchema),
  });

  const onSubmit = (data: any) => {
    // if (!id) {
    // } else {
    //   //onUpdateAdmin({ id: Number(adminId), data });
    // }
    onCreateBaseCourse(data);
  };

  return (
    <Form onFinish={handleSubmit(onSubmit)}>
      <Card title={id ? 'Edit Course ' : 'Create Course'}>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Code">
              <Controller
                name="code"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Enter code" />}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Course Name">
              <Controller
                name="name"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Enter course name" />}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Description">
              <Controller
                name="description"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Enter description" />}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Credit">
              <Controller
                name="credit"
                control={control}
                render={({ field }) => (
                  <Select {...field} placeholder="Select credit">
                    <Select.Option value="1">1</Select.Option>
                    <Select.Option value="2">2</Select.Option>
                    <Select.Option value="3">3</Select.Option>
                    <Select.Option value="4">4</Select.Option>
                    <Select.Option value="5">5</Select.Option>
                    <Select.Option value="6">6</Select.Option>
                    <Select.Option value="7">7</Select.Option>
                  </Select>
                )}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Status">
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select {...field} placeholder="Select status">
                    <Select.Option value="ACTIVE">ACTIVE</Select.Option>
                    <Select.Option value="INACTIVE">INACTIVE</Select.Option>
                    <Select.Option value="FREZZ">FREZZ</Select.Option>
                  </Select>
                )}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Image">
              <Controller
                name="imageUri"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Enter image uri" />}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end">
          <Button type="primary" htmlType="submit">
            {id ? 'Update' : 'Create'}
          </Button>
        </Row>
      </Card>
    </Form>
  );
};

export default CreateEditBaseCourse;
