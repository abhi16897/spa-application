import React from 'react';
import Menu from './SPA/menu/menu';


class App extends React.Component {
  state = {}
  render() {
    return (
      <div>
        <h3>SPA in React</h3>
        <div>
          <Menu></Menu>
        </div>
      </div>
    );
  }
}

export default App;
