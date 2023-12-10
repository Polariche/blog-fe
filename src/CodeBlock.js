import React, {Component} from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

class CodeBlock extends Component {
    state = {
      code: {}
    };
  
    async componentDidMount() {
      try {
        const res1 = await fetch(this.props.url+"/raw");
        const code = await res1.json();
        
        //const res2 = await fetch(this.props.url+"/comment");
        //const comment = await res2.json();
  
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

  export default CodeBlock;