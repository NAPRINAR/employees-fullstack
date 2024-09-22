import { Button, Form } from 'antd';

type Props = {
  children: React.ReactNode;
  htmlType?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
  type?: 'link' | 'text' | 'default' | 'primary' | 'dashed' | undefined;
  danger?: boolean;
  loading?: boolean;
  shape?: 'default' | 'circle' | 'round' | undefined;
  icon?: React.ReactNode;
  clearDefaultMargin?: boolean;
};

export const CustomButton = ({
  children,
  htmlType = 'button',
  danger,
  loading,
  type,
  shape,
  icon,
  onClick,
  clearDefaultMargin,
}: Props) => {
  return (
    <Form.Item style={clearDefaultMargin ? { marginBottom: 4 } : {}}>
      <Button
        style={{ color: '#fff' }}
        type={type}
        htmlType={htmlType}
        danger={danger}
        shape={shape}
        icon={icon}
        loading={loading}
        onClick={onClick}>
        {children}
      </Button>
    </Form.Item>
  );
};
