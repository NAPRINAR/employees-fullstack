import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditEmployeeMutation, useGetEmployeeQuery } from '../../app/services/employees';
import Layout from '../../components/Layout/Layout';
import { Row } from 'antd';
import { EmployeeForm } from '../../components/EmployeeForm/EmployeeForm';
import { Employee } from '@prisma/client';
import { Paths } from '../../paths';
import { isErrorWithMessage } from '../../utils/is-error-with-message';

const EditEmployee = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const [error, setError] = useState('');
  const { data, isLoading } = useGetEmployeeQuery(params.id || '');
  const [editEmployee] = useEditEmployeeMutation();
  const handleEditUser = async (employee: Employee) => {
    try {
      const editedEmployee = {
        ...data,
        ...employee,
      };

      await editEmployee(editedEmployee).unwrap();
      navigate(`${Paths.status}/updated`);
    } catch (error) {
      const maybeError = isErrorWithMessage(error);
      if (maybeError) {
        setError(error.data.message);
      } else {
        setError('Неизвестная ошибка');
      }
    }
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }
  return (
    <Layout>
      <Row align="middle" justify="center">
        <EmployeeForm
          title="Редактировать сотрудника"
          btnText="Редактировать"
          error={error}
          employee={data}
          onFinish={handleEditUser}
        />
      </Row>
    </Layout>
  );
};

export default EditEmployee;
