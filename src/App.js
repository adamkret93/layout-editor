import React from 'react';

import Editor from './containers/Editor/Editor';
import styles from './App.module.css';

function App() {
  return (
    <div id='App' className={styles.app}>
      <header className={styles.header}>
        <p>
          Edytor motywu
        </p>
      </header>
      <Editor/>
    </div>
  );
}

export default App;
