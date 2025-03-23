import { NO_DATA } from '@/config/constants';
import { formatFullNameWithFields } from '@/utils/format';
import { EditTwoTone, InfoCircleTwoTone, MailTwoTone, PhoneTwoTone } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Button, Flex, Form, Image, Input, Typography } from 'antd';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import '../styles.scss';
import useTeacherInformation from './useTeacherInformation';

type TeacherInformationProps = {
  id: number;
  teacherId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  avatarPath: string;
  contactLink: string;
  officeLocation: string;
  officeHours: string;
  otherInformation: string;
};

const TeacherInformation = ({
  id,
  firstName,
  middleName,
  lastName,
  email,
  phoneNumber,
  avatarPath,
  officeLocation,
  otherInformation,
  contactLink,
  officeHours,
}: TeacherInformationProps) => {
  const fullName = formatFullNameWithFields(firstName, middleName, lastName);
  const {
    states: { control, isLoading, isEdit },
    handlers: { onSubmit, setIsEdit },
  } = useTeacherInformation({
    id,
    contactLink,
    officeLocation,
    officeHours,
    otherInformation,
  });

  const defaultAvatar =
    'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png';

  return (
    <form onSubmit={onSubmit}>
      <ProCard
        className="course-detail-page-container__short-information"
        colSpan={{ xs: 24, md: 8 }}
        layout="center"
        direction="column"
        bordered
      >
        <Flex
          justify="end"
          align="center"
          vertical={false}
          style={{ width: '100%', marginBottom: '20px' }}
          gap={'small'}
        >
          {isEdit ? (
            <>
              <Button type="default" onClick={() => setIsEdit(false)} loading={isLoading}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Save
              </Button>
            </>
          ) : (
            <Button icon={<EditTwoTone />} type="text" onClick={() => setIsEdit(true)} />
          )}
        </Flex>
        <Image
          className="course-detail-page-container__image"
          width={100}
          src={avatarPath || defaultAvatar}
        />
        <Typography.Title className="course-detail-page-container__title" level={3}>
          {fullName}
        </Typography.Title>
        <Typography.Title className="course-detail-page-container__subtitle" level={4}>
          COURSE INSTRUCTOR
        </Typography.Title>
        <ProCard layout="default">
          <div className="course-detail-page-container__info">
            <Typography.Text>
              <MailTwoTone />
            </Typography.Text>
            <Typography.Text className="course-detail-page-container__info--text" copyable>
              {email}
            </Typography.Text>
          </div>
          <div className="course-detail-page-container__info">
            <Typography.Text>
              <PhoneTwoTone />
            </Typography.Text>
            <Typography.Text className="course-detail-page-container__info--text" copyable>
              {phoneNumber}
            </Typography.Text>
          </div>
          <Typography.Title level={5} style={{ marginTop: '12px' }}>
            Office schedule for Students' appointments
          </Typography.Title>
          {!isEdit ? (
            <div className="course-detail-page-container__info">
              <Typography.Text>
                <InfoCircleTwoTone />
              </Typography.Text>

              <Typography.Text className="course-detail-page-container__info--text">
                <>Office Location: {officeLocation ?? NO_DATA}</>
              </Typography.Text>
            </div>
          ) : (
            <Form.Item
              layout="vertical"
              name="officeLocation"
              label="Office Location"
              rules={[{ required: true, message: 'Office Location is required' }]}
            >
              <Controller
                name="officeLocation"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </Form.Item>
          )}
          {!isEdit ? (
            <div className="course-detail-page-container__info">
              <Typography.Text>
                <InfoCircleTwoTone />
              </Typography.Text>
              <Typography.Text className="course-detail-page-container__info--text">
                <>Office hours: {officeHours ?? NO_DATA}</>
              </Typography.Text>
            </div>
          ) : (
            <Form.Item
              layout="vertical"
              name="officeHours"
              label="Office Hours"
              rules={[{ required: true, message: 'Office Hours is required' }]}
            >
              <Controller
                name="officeHours"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </Form.Item>
          )}

          {!isEdit ? (
            <div className="course-detail-page-container__info">
              <Typography.Text>
                <InfoCircleTwoTone />
              </Typography.Text>
              <Typography.Text className="course-detail-page-container__info--text">
                <>Contact links: {contactLink ?? NO_DATA}</>
              </Typography.Text>
            </div>
          ) : (
            <Form.Item
              layout="vertical"
              name="contactLink"
              label="Contact Links"
              rules={[{ required: true, message: 'Contact Links is required' }]}
            >
              <Controller
                name="contactLink"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </Form.Item>
          )}

          {!isEdit ? (
            <div className="course-detail-page-container__info">
              <Typography.Text>
                <InfoCircleTwoTone />
              </Typography.Text>
              <Typography.Text className="course-detail-page-container__info--text">
                <>Other Information: {otherInformation ?? NO_DATA}</>
              </Typography.Text>
            </div>
          ) : (
            <Form.Item
              layout="vertical"
              name="otherInformation"
              label="Other Information"
              rules={[{ required: true, message: 'Other Information is required' }]}
            >
              <Controller
                name="otherInformation"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </Form.Item>
          )}
        </ProCard>
      </ProCard>
    </form>
  );
};

export default React.memo(TeacherInformation);
