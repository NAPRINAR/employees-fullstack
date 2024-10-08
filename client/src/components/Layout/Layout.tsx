import React from 'react';
import styles from './Layout.module.css';
import { Layout as AntLayout } from 'antd';
import Header from '../Header/Header';

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <div className={styles.main}>
      <Header />
      <AntLayout.Content style={{ height: '100%' }}>{children}</AntLayout.Content>
    </div>
  );
};

export default Layout;
