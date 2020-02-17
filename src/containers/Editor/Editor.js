import React, { Component } from 'react';

import BlockList from '../../components/blocksList/blockList';
import Block from '../../components/Block/Block';
import ControlButtons from '../../components/UI/ControlButtons/ControlButtons';
import Modal from '../../components/UI/Modal/Modal';
import styles from './Editor.module.css';

import Loader from '../../components/UI/Loader/Loader';
import Aux from '../../hoc/Auxiliary';

class Editor extends Component {
    state = {
        blocksEnabled: [],
        blocksDisabled: [],
        loading: false,
        loaderText: null,
        saved: true,
        error: false,
        modalShow: false
    }

    componentDidMount () {
        //console.log('did mount');
        this.setState({loading: true, loaderText: 'Ładowanie'});
        let blocksToSort = [
            { id: 'asd1', name: 'slider', position: 0, enabled: true },
            { id: 'vef2', name: 'promocje', position: 1, enabled: true },
            { id: 'asd3', name: 'banner', position: 2, enabled: true },
            { id: 'asd4', name: 'bestsellery', position: 3, enabled: true },
            { id: 'bgt5', name: 'nowosci', position: 4, enabled: true },
            { id: 'aon6', name: 'promocje w kategorii', position: 5, enabled: true },
            { id: 'pla7', name: 'newsletter', position: 6, enabled: true }
        ];
        
        const sortBlocks = new Promise( (resolve, reject) => {
            //console.log('Promise start');
            //Przy pobieraniu z serwera najpierw trzeba rozdzielić elementy na Enabled i Disabled, a nastepnie posortować każda tablice oddzielnie i ustawić state. 
            //(to wszystko w funkcji "then" - gdy pobieranie z bazy sie powiedzie)

            const blocksSorted = [...blocksToSort];
            blocksSorted.sort(this.compare);
           
            const blockEnabled = blocksSorted.filter(block => (block.enabled));
            const blockDisabled = blocksSorted.filter(block => !blockEnabled.includes(block));

            setTimeout(() => { 
                resolve({text: 'Sorted done!', dataEnabled: blockEnabled, dataDisabled: blockDisabled});
                //reject('Ładowanie nie powiodło się');
            }, 1500);
        });

        //console.log(blocksToSort); 

        sortBlocks.then( result => {
            console.log(result.dataEnabled);
            console.log(result.dataDisabled);
            this.setState({
                blocksEnabled: result.dataEnabled,
                blocksDisabled: result.dataDisabled,
                loading: false,
                saved: true
            });
        })
        .catch(error => {
            console.log(error);
            this.setState({
                loading: false,
                error: true
            });
        });
    }

    compare = (a,b) => {
        const blockPrev = a.position;
        const blockNext = b.position;
        
        let comparison = 0;
        if (blockPrev > blockNext) {
            comparison = 1;
        } else if (blockPrev < blockNext) {
            comparison = -1;
        }
        return comparison;
    }

    setListHandler = (newState, listType) => {
        switch (listType) {
            case 'enabled':
                let checkpos = false;
                newState.forEach((element, index) => {
                    if (element.position !== index) {
                        checkpos = true;
                        element.position = index;
                    }
                    if (!element.enabled) element.enabled = true;
                });
                if(newState.length !== this.state.blocksEnabled.length || checkpos) this.setState({blocksEnabled: newState, saved: false});
                break;
            case 'disabled':
                newState.forEach((element, index) => {
                    element.position = index;
                    if(element.enabled) element.enabled = false;
                });
                if(newState.length !== this.state.blocksDisabled.length) this.setState({blocksDisabled: newState});
                break;
            default:
                break;
        }
    }

    saveHandler = () => {
        if (!this.state.saved) {
            this.setState({loading: true, loaderText: 'Zapisywanie'});
            /*wysyłanie elementow do bazy - prawdopodobnie axios do pliku php*/
            let blocksEnabled = [...this.state.blocksEnabled];
            const blocksDisabled = [...this.state.blocksDisabled];
            const blocks = blocksEnabled.concat(blocksDisabled);
            console.log('Save:');
            console.log(blocks);
            setTimeout(() => {  // symulacja zapisu do bazy - to będzie obslugiwane przez axios
                this.setState({saved: true, loading: false});
            }, 1500);
        }
    }
    cancelHandler = () => {
        if (this.state.saved) {
            console.log('Closed');
            //this.props.history.push('/test'); // chyba potrzebny react-router
            alert('Tutaj przekierowanie na strone główną panelu');
        } else {
            this.setState({modalShow: true});
        }
    }
    closeHandler = () => {
        console.log('Closed');
        this.closeModalHandler();
        alert('Tutaj przekierowanie na strone główną panelu');
    }

    closeModalHandler = () => {
        this.setState({ modalShow: false });
    }

    render () {

        let loader = null;
        let editor = this.state.error ? <p>Ładowanie bloków nie powiodło się. Spróboj ponownie pózniej.</p> : null;

        if(this.state.blocksEnabled.length > 0 || this.state.blocksDisabled.length > 0) {
            editor = (
                <Aux>
                    <div className={styles.content}>
                        <div className={styles.colLeft}>
                            <Block name='nagłówek'/>
                            <BlockList 
                                typeList='enabled'
                                list={this.state.blocksEnabled}
                                change={this.setListHandler} />
                            <Block name='stopka'/>
                        </div>
                        <div className={styles.colRight}>
                            <BlockList 
                                typeList = "disabled"
                                list = {this.state.blocksDisabled}
                                change={this.setListHandler} />
                        </div>
                    </div>
                    
                </Aux>
            );
        }

        if ( this.state.loading ) {
            loader = <Loader text={this.state.loaderText}/>;
        }

        return (
            <Aux>
                {loader}
                {editor}
                <ControlButtons
                    saved={this.state.saved} 
                    listLength={this.state.blocksEnabled.length}
                    saveClick={this.saveHandler}
                    cancelClick={this.cancelHandler}/>
                <Modal show={this.state.modalShow} modalClosed={this.closeModalHandler}>
                    {"Chcesz zamknąć edytor bez zapisania zmian?"}
                    <div className={styles.buttonsWrapper}> 
                        <button onClick={this.closeHandler}>Tak</button>
                        <button onClick={this.closeModalHandler}>Nie</button>
                    </div>
                </Modal>
            </Aux>
        );
    }
}

export default Editor;

