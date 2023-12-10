import React, {Component} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';


class CodeBlock extends Component {
  state = {
    code: {}
  };
  async componentDidMount() {
    try {
      const res = await fetch('http://127.0.0.1:8000/code/usaco/Ch1/beads/raw');
      const code = await res.json();
      this.setState({code});
    } catch (e) {
      console.log(e);
    }
  }

  render () {
    return (
      <SyntaxHighlighter language="javascript" style={docco} showLineNumbers={true}>
        {this.state.code.content}
      </SyntaxHighlighter>
    );
  };

}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <CodeBlock />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
