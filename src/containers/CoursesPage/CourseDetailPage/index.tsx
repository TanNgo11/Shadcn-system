import { HomeTwoTone, InfoCircleTwoTone, MailTwoTone, PhoneTwoTone } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Avatar, Col, Divider, Flex, Image, Row, Tag, Typography } from 'antd';
import InformationTabs from './InformationTabs';

const CourseDetailPage = () => {
  return (
    <div className="course-detail-page-container">
      <Typography.Title level={3}>Welcome to Mobile Programming (3,1)</Typography.Title>

      <Row
        justify="center"
        className="profile-container"
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
      >
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
              Trần Văn Tài
            </Typography.Title>
            <Typography.Title className="profile-container__subtitle" level={4}>
              COURSE INSTRUCTOR
            </Typography.Title>
            <ProCard layout="default">
              <div className="profile-container__info">
                <Typography.Text>
                  <MailTwoTone />
                </Typography.Text>
                <Typography.Text className="profile-container__info--text" copyable>
                  tai.tran@eiu.edu.vn
                </Typography.Text>
              </div>
              <div className="profile-container__info">
                <Typography.Text>
                  <PhoneTwoTone />
                </Typography.Text>
                <Typography.Text className="profile-container__info--text" copyable>
                  0929234798
                </Typography.Text>
              </div>

              <div className="profile-container__info">
                <Typography.Text>
                  <InfoCircleTwoTone />
                </Typography.Text>
                <Typography.Text className="profile-container__info--text">
                  Working hours: 7h30 – 11h30 and 12h30-16h30 (Mon – Fri)
                </Typography.Text>
              </div>
              <div className="profile-container__info">
                <Typography.Text>
                  <InfoCircleTwoTone />
                </Typography.Text>
                <Typography.Text className="profile-container__info--text">
                  Zalo: https://zalo.me/g/kcfcxs188
                </Typography.Text>
              </div>
            </ProCard>
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
    </div>
  );
};

export default CourseDetailPage;
