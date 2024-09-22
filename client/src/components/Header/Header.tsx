import { Button, Layout, Space, Typography } from 'antd';
import styles from './Header.module.css';
import { LoginOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { CustomButton } from '../CustomButton/CustomButton';
import { Link, useNavigate } from 'react-router-dom';
import { Paths } from '../../paths';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../features/auth/authSlice';

export const Header = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Layout.Header style={{ backgroundColor: 'transparent' }} className={styles.header}>
      <Space style={{ display: 'flex', alignItems: 'center' }}>
        <TeamOutlined className={styles.teamIcon} />
        <Link to={Paths.home}>
          <CustomButton clearDefaultMargin type="link">
            <Typography.Title style={{ marginTop: 9 }} level={2}>
              Сотрудники
            </Typography.Title>
          </CustomButton>
        </Link>
      </Space>
      {user ? (
        <CustomButton
          clearDefaultMargin
          type="link"
          icon={<LoginOutlined />}
          onClick={onLogoutClick}>
          Выйти
        </CustomButton>
      ) : (
        <Space>
          <Link to={Paths.register}>
            <CustomButton icon={<UserOutlined />} clearDefaultMargin type="link">
              Зарегистрироваться
            </CustomButton>
          </Link>
          <Link to={Paths.login}>
            <CustomButton icon={<LoginOutlined />} clearDefaultMargin type="link">
              Войти
            </CustomButton>
          </Link>
        </Space>
      )}
    </Layout.Header>
  );
};

export default Header;
