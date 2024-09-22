import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import { Row } from 'antd';
import { EmployeeForm } from '../../components/EmployeeForm/EmployeeForm';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import { useAddEmployeeMutation } from '../../app/services/employees';
import { Employee } from '@prisma/client';
import { Paths } from '../../paths';
import { isErrorWithMessage } from '../../utils/is-error-with-message';

const AddEmployee = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [addEmployee] = useAddEmployeeMutation();

  const handleAddEmployee = async (data: Employee) => {
    console.log(data);

    try {
      await addEmployee(data).unwrap();
      navigate(`${Paths.status}/created`);
    } catch (error) {
      const maybeError = isErrorWithMessage(error);
      if (maybeError) {
        setError(error.data.message);
      } else {
        console.log(error);

        setError('Неизвестная ошибка');
      }
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, []);
  return (
    <Layout>
      <Row align="middle" justify="center">
        <EmployeeForm
          title="Добавить сотрудника"
          btnText="Добавить"
          onFinish={handleAddEmployee}
          error={error}
        />
      </Row>
    </Layout>
  );
};

export default AddEmployee;
