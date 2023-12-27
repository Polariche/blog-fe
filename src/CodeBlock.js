import React, {Component} from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import commentRenderer from './CommentRenderer';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';


class CodeBlock extends Component {
    state = {
      code: {},
      comments: {},
    };
  
    async componentDidMount() {
      try {
        const res1 = await fetch(this.props.url+"/raw");
        const code = await res1.json();
        
        const res2 = await fetch(this.props.url+"/comment");
        const comments_raw = await res2.json();

        var comments = {}
        comments_raw.forEach(function (x, i, a) {if (!Object.keys(comments).includes(x.start)) {comments[x.start] = [];} comments[x.start].push(x)});
        this.setState({code, comments});
      } catch (e) {
        console.log(e);
      }
    }
  
    render () {
      return (
        <SyntaxHighlighter 
        language="cpp" 
        style={docco} 
        showLineNumbers={true} 
        wrapLines={true} 
        lineProps={lineNumber => {
            let style = { display: 'block' };
            if (Object.keys(this.state.comments).includes(`L${lineNumber}`)) {
              style.backgroundColor = '#dbffdb';
            }
            return { style };
          }}
        renderer={commentRenderer(this.state.comments)}
        >

          {this.state.code.content}
        </SyntaxHighlighter>
      );
    };
  
  }

  export default CodeBlock;