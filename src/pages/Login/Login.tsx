import { Card, Form, Row, Space, Typography } from 'antd';
import Layout from '../../components/Layout/Layout';
import { CustomInput } from '../../components/CustomInput/CustomInput';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import { CustomButton } from '../../components/CustomButton/CustomButton';
import { Link, useNavigate } from 'react-router-dom';
import { Paths } from '../../paths';
import { useLoginMutation, UserData } from '../../app/services/auth';
import { isErrorWithMessage } from '../../utils/is-error-with-message';
import { useEffect, useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';

export const Login = () => {
  const navigate = useNavigate();
  const [loginUser, loginUserResult] = useLoginMutation();
  const [error, setError] = useState('');
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, []);

  const handleLogin = async (data: UserData) => {
    try {
      await loginUser(data).unwrap();
      navigate('/');
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError('Неизвестная ошибка');
      }
    }
  };
  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Вход" style={{ width: '30rem' }}>
          <Form onFinish={handleLogin}>
            <CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Пароль" />
            <CustomButton type="primary" htmlType="submit">
              Войти
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Нет аккаунта? <Link to={Paths.register}>Зарегистрируйтесь</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};

export default Login;
