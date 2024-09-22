import { useCurrentQuery } from '../../app/services/auth';

const IsAuth = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useCurrentQuery();
  if (isLoading) {
    return <span>Загрузка...</span>;
  }
  return children;
};

export default IsAuth;
