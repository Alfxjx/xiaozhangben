import React from 'react';
import styles from './index.less';
import Button from '@material-ui/core/Button';

export default () => {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Button variant="contained">Default</Button>
    </div>
  );
}
