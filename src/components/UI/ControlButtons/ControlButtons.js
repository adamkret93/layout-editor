import React from 'react';

import styles from './ControlButtons.module.css';

const controlButtons = (props) => {
    return (
        <div className={styles.buttonsWrapper}>
            <button className={styles.Save} onClick={props.saveClick} disabled={(props.saved || props.listLength === 0) ? true : false }>Zapisz</button>
            <button className={styles.Cancel} onClick={props.cancelClick}>Zamknij</button>
        </div>
    );
}

export default controlButtons;