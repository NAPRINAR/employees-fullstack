import React from 'react';
import { Form, Input } from 'antd';
import { NamePath } from 'antd/es/form/interface';

type Props = {
  name: string;
  placeholder: string;
  dependecies?: NamePath[];
};

const PasswordInput = ({ name, placeholder, dependecies }: Props) => {
  return (
    <Form.Item
      name={name}
      dependencies={dependecies}
      hasFeedback
      rules={[
        {
          required: true,
          message: 'Обязательное поле',
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            // console.log(value);

            if (!value) {
              return Promise.resolve();
            }
            if (!value || name === 'confirmPassword') {
              //   console.log(getFieldValue('password') === value);
              if (getFieldValue('password') === value) {
                console.log('ss');
                return Promise.resolve();
              }
              return Promise.reject(new Error('Пароли должны совпадать'));
            } else {
              if (value.length < 6) {
                return Promise.reject(new Error('Пароль должен иметь 6 или больше символов'));
              }
              return Promise.resolve();
            }
          },
        }),
      ]}>
      <Input.Password placeholder={placeholder} size="large" />
    </Form.Item>
  );
};

export default PasswordInput;
