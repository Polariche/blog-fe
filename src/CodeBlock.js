import React, {Component} from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
//import commentRenderer from './CommentRenderer';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

class CodeBlock extends Component {
    state = {
      code: {},
      comments: [],
      comment_starts: [],
    };
  
    async componentDidMount() {
      try {
        const res1 = await fetch(this.props.url+"/raw");
        const code = await res1.json();
        
        const res2 = await fetch(this.props.url+"/comment");
        const comments = await res2.json();

        var comment_starts = []
        comments.forEach(function (x, i, a) {comment_starts.push(x.start)});
        this.setState({code, comments, comment_starts});
      } catch (e) {
        console.log(e);
      }
    }
  
    render () {
      return (
        <SyntaxHighlighter 
        language="javascript" 
        style={docco} 
        showLineNumbers={true} 
        wrapLines={true} 
        lineProps={lineNumber => {
            let style = { display: 'block' };
            if (this.state.comment_starts.includes(`L${lineNumber}`)) {
              style.backgroundColor = '#dbffdb';
            }
            return { style };
          }}
        > 
          {this.state.code.content}
        </SyntaxHighlighter>
      );
    };
  
  }

  export default CodeBlock;