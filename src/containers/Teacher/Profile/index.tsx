import { HomeTwoTone, MailTwoTone, PhoneTwoTone } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Avatar, Col, Divider, Flex, Image, Row, Tag, Typography } from 'antd';
import './styles.scss';
import InformationTabs from '@/containers/Profile/InformationTabs';

const Profile = () => {
  return (
    <>
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
              Serati Ma
            </Typography.Title>
            <Typography.Title className="profile-container__subtitle" level={4}>
              Serati Ma sub
            </Typography.Title>
            <ProCard layout="default">
              <div className="profile-container__info">
                <Typography.Text>
                  <MailTwoTone />
                </Typography.Text>
                <Typography.Text className="profile-container__info--text" copyable>
                  tan.ngo.cit20@eiu.edu.vn
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
                  <HomeTwoTone />
                </Typography.Text>
                <Typography.Text className="profile-container__info--text" copyable>
                  Bến Cát-Chánh Phú Hòa - Việt Nam
                </Typography.Text>
              </div>
            </ProCard>
            <Divider dashed />
            <ProCard title={'Links'} layout="default">
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12} className="profile-container__links">
                  <Avatar
                    size="default"
                    src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
                  />
                  <Typography.Text className="profile-container__info--text">
                    description
                  </Typography.Text>
                </Col>
                <Col span={12} className="profile-container__links">
                  <Avatar
                    size="default"
                    src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
                  />
                  <Typography.Text className="profile-container__info--text">
                    description
                  </Typography.Text>
                </Col>
                <Col span={12} className="profile-container__links">
                  <Avatar
                    size="default"
                    src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
                  />
                  <Typography.Text className="profile-container__info--text">
                    description
                  </Typography.Text>
                </Col>
                <Col span={12} className="profile-container__links">
                  <Avatar
                    size="default"
                    src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
                  />
                  <Typography.Text className="profile-container__info--text">
                    description
                  </Typography.Text>
                </Col>
              </Row>
            </ProCard>
            <ProCard title={'Course Hobbies'} layout="default">
              <Flex gap="4px 0" wrap>
                <Tag>ReactJS</Tag>
                <Tag>NodeJS</Tag>
                <Tag>VueJS</Tag>
                <Tag>Angular</Tag>
                <Tag>Laravel</Tag>
                <Tag>Java</Tag>
                <Tag>Python</Tag>
                <Tag>C#</Tag>
                <Tag>C++</Tag>
                <Tag>Ruby</Tag>
                <Tag>PHP</Tag>
              </Flex>
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
    </>
  );
};

export default Profile;
