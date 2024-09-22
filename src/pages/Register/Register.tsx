import { Card, Form, Row, Space, Typography } from 'antd';
import Layout from '../../components/Layout/Layout';
import { CustomInput } from '../../components/CustomInput/CustomInput';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import { CustomButton } from '../../components/CustomButton/CustomButton';
import { Link, useNavigate } from 'react-router-dom';
import { Paths } from '../../paths';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import { useRegisterMutation } from '../../app/services/auth';
import { User } from '@prisma/client';
import { isErrorWithMessage } from '../../utils/is-error-with-message';
import { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

export const Register = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState('');
  const [registerUser] = useRegisterMutation();

  type RegisterData = Omit<User, 'id'> & { confirmPassword: string };

  const handleRegister = async (data: RegisterData) => {
    try {
      await registerUser(data).unwrap();
      navigate('/');
    } catch (error) {
      const maybeError = isErrorWithMessage(error);
      if (maybeError) {
        setError(error.data.message);
      } else {
        setError('Неизвестная ошибка');
      }
    }
  };
  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Регистрация" style={{ width: '30rem' }}>
          <Form onFinish={handleRegister}>
            <CustomInput name="name" placeholder="Имя" />
            <CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Пароль" />
            <PasswordInput name="confirmPassword" placeholder="Повтроите пароль" />
            <CustomButton type="primary" htmlType="submit">
              Зарегистрироваться
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Уже зарегистрированы? <Link to={Paths.login}>Войдите</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};

export default Register;
