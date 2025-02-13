import { useNotification } from '@/containers/StartupContainers/ToastContainer';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, Col, DatePicker, Form, Row, Typography } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import {
  AcademicYearPayload,
  academicYearRegisterFormSchema,
  initAcademicYearValue,
} from './helper';
import dayjs from 'dayjs';
import { useCreateAcademicYear } from '@/queries/AcademicYear/useCreateAcademicYear';
import { useUpdateAcademicYear } from '@/queries/AcademicYear/useUpdateAcademicYear';
import { error } from 'console';

const CreateEditViewAcademicYear = () => {
  const toast = useNotification();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AcademicYearPayload>({
    resolver: zodResolver(academicYearRegisterFormSchema),
    defaultValues: initAcademicYearValue,
  });

  const { onCreateAcademicYear } = useCreateAcademicYear({
    onSuccess: () => {
      toast.success({ message: 'Academic year created successfully' });
      navigate(-1);
    },
  });

  const { onUpdateAcademicYear } = useUpdateAcademicYear({
    onSuccess: () => {
      toast.success({ message: 'Academic year updated successfully' });
      navigate(-1);
    },
    onError: (error) => {
      toast.error({ message: 'Academic year update failed' });
      console.log(error);
    },
  });

  const onSubmit = (data: AcademicYearPayload) => {
    // Convert year strings to ISO date format (YYYY-MM-DD)
    const formattedData = {
      startYear: `${data.startYear}`,
      endYear: `${data.endYear}`,
    };

    if (!id) {
      onCreateAcademicYear(formattedData);
    } else {
      onUpdateAcademicYear({ id: Number(id), data: formattedData });
    }
  };

  return (
    <Form onFinish={handleSubmit(onSubmit)}>
      <Card title={id ? 'Edit Academic Year' : 'Create Academic Year'}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Start Year"
              validateStatus={errors.startYear ? 'error' : undefined}
              help={errors.startYear?.message}
            >
              <Controller
                name="startYear"
                control={control}
                render={({ field }) => (
                  <>
                    <DatePicker
                      {...field}
                      placeholder="Select date"
                      style={{ width: '100%' }}
                      format="DD-MM-YYYY"
                      value={field.value ? dayjs(field.value, 'DD-MM-YYYY') : null}
                      onChange={(_date: any, dateString: any) => field.onChange(dateString)}
                    />
                    {errors.startYear && (
                      <Typography.Text type="danger">{errors.startYear.message}</Typography.Text>
                    )}
                  </>
                )}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="End Year">
              <Controller
                name="endYear"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    placeholder="Select date"
                    style={{ width: '100%' }}
                    format="DD-MM-YYYY"
                    value={field.value ? dayjs(field.value, 'DD-MM-YYYY') : null}
                    onChange={(_date: any, dateString: any) => field.onChange(dateString)}
                  />
                )}
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

export default CreateEditViewAcademicYear;
