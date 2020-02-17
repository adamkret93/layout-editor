import React from 'react';

import styles from './Block.module.css'

const block = (props) => {
    return (
        <div className={styles.block}>
            {props.name}
        </div>
    );
};

export default block;