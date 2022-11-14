import React, { memo } from 'react';
import styles from './index.module.less';

const Button: React.FC = memo(props => {

  const test = () => {
    console.log(`button click`,);
  };

  return (
    <button className={styles['btn']} onClick={test}>按钮</button>
  );
});

export default Button;