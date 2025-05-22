import { NO_DATA } from '@/utils';
import { HomeTwoTone, MailTwoTone, PhoneTwoTone, WechatOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Button, Col, Divider, Image, Row, Typography } from 'antd';
import InformationTabs from './InformationTabs';
import './styles.scss';
import { useProfile } from './useProfile';

const TeacherProfile = () => {
  const {
    states: { teacher, isShowingMessageButton },
    handlers: { handleViewChat },
  } = useProfile();

  return (
    <Row justify="center" className="profile-container" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col
        xs={{
          span: 24,
        }}
        md={{
          span: 8,
        }}
      >
        <ProCard
          className="profile-container__short-information"
          colSpan={{ xs: 24, md: 8 }}
          layout="center"
          direction="column"
          bordered
        >
          <Image
            className="profile-container__image"
            width={100}
            src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
          />
          <Typography.Title className="profile-container__title" level={3}>
            {teacher?.username}
          </Typography.Title>
          <Typography.Title className="profile-container__subtitle" level={4}>
            {teacher?.firstName || NO_DATA} {teacher?.middleName || NO_DATA}{' '}
            {teacher?.lastName || NO_DATA}
          </Typography.Title>
          {isShowingMessageButton && (
            <Button
              icon={<WechatOutlined />}
              style={{ marginTop: '12px' }}
              color="primary"
              variant="outlined"
              onClick={handleViewChat}
            >
              Message
            </Button>
          )}
          <ProCard layout="default">
            <div className="profile-container__info">
              <Typography.Text>
                <MailTwoTone />
              </Typography.Text>
              <Typography.Text
                className="profile-container__info--text"
                copyable
                ellipsis={{ tooltip: true }}
                style={{ width: '80%' }}
              >
                {teacher?.email}
              </Typography.Text>
            </div>
            <div className="profile-container__info">
              <Typography.Text>
                <PhoneTwoTone />
              </Typography.Text>
              <Typography.Text
                className="profile-container__info--text"
                copyable
                ellipsis={{ tooltip: true }}
                style={{ width: '80%' }}
              >
                {teacher?.phoneNumber}
              </Typography.Text>
            </div>
            <div className="profile-container__info">
              <Typography.Text>
                <HomeTwoTone />
              </Typography.Text>
              <Typography.Text
                className="profile-container__info--text"
                copyable
                ellipsis={{ tooltip: true }}
                style={{ width: '80%' }}
              >
                {teacher?.address}
              </Typography.Text>
            </div>
          </ProCard>
          <Divider dashed />
        </ProCard>
      </Col>
      <Col
        xs={{
          span: 24,
        }}
        md={{
          span: 16,
        }}
      >
        <ProCard
          className="profile-container__information-tabs"
          colSpan={{ xs: 24, md: 16 }}
          bordered
        >
          <InformationTabs />
        </ProCard>
      </Col>
    </Row>
  );
};

export default TeacherProfile;
