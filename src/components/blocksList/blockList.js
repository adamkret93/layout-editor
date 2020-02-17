import React from "react";
import { ReactSortable} from "react-sortablejs";

import styles from './blockList.module.css';
import Happy from '../../assets/happy.svg';
import Sad from '../../assets/sad.svg';


const blockList = (props) => {

    let infoText = null;

    if (props.list.length === 0){
        switch (props.typeList) {
            case 'enabled':
                infoText = (
                    <p className = {styles.infoText}>
                        <img src={Sad} alt=''/>
                        Twój sklep nie będzie wyglądał zbyt dobrze. <br/> Dodaj co najmniej jeden blok do strony głównej.
                    </p>
                ); 
                break;
            case 'disabled':
                infoText = (
                    <p className = {styles.infoText}>
                        <img src={Happy} alt=''/>
                        Świetnie !!! Wszystkie dostępne bloki zostały wykorzystane.
                    </p>
                );
                break;
            default:
                infoText = null;
                break;
        }   
    }

    return (
        <div className={`${styles.blockWrapper} ${props.typeList === 'enabled' ? styles.colLeft : styles.colRight}`}>
            {props.typeList === 'disabled' ? <p className={styles.header}>Baza dostępnych bloków:</p> : null }
            { infoText }
            <ReactSortable 
                list={props.list} 
                setList={ (newState) => props.change(newState, props.typeList) }
                className = {styles.sortWrapper}
                group="shared-group-blocks"
                animation = {300}
                sort={props.typeList === 'disabled' ? false : true }
                >
                    {props.list.map(block => (
                            <div key={block.id} className={styles.block}>{block.name}</div>
                        )
                    )}
            </ReactSortable>
        </div>
    );
}

export default blockList;