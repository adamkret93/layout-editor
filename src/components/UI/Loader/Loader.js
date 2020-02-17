import React from 'react';

import styles from './Loader.module.css';
import Loader from '../../../assets/loader.gif';

const loader = (props) => {
    return (
        <div className={styles.Background}>
            <div className={styles.Loader}>
                <img src={Loader} alt='loader'/>
                {props.text}...
            </div>
        </div>
    );
}

export default loader;