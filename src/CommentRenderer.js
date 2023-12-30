import { createElement } from 'react-syntax-highlighter';
import React, {useState, forwardRef, useRef, useEffect, useImperativeHandle} from 'react';
import Markdown from 'react-markdown'

const Comment = forwardRef((props, ref) => {
  const [state, setState] = useState({content: props.children, focused: false});
  
  const myRef = useRef(null);
  
  const outerStyle = {
    overflow: 'visible', 
    width: 0, 
    height: 0, 
    position: 'relative', 
    left: 500,
    userSelect: 'none',
  }

  useImperativeHandle(ref, () => ({
    defocus() {
      setState({...state, focused: false});
    },
    focus() {
      setState({...state, focused: true});
    }
  }))

  useEffect(() => {if(state.focused) {
                      myRef.current.focus()
                    }
                  }, [state])

  if (state.focused || state.content){
    const finalContent = state.focused ? state.content : (
      <Markdown components={{p: 'span'}}>
        {state.content}
      </Markdown>
    )
    
    return (
      <div style={outerStyle}>
        <div contentEditable={state.focused} 
              ref={myRef} 
              onClick={() => {setState({content: state.content, focused: true})}}
              onBlur={e => {setState({content: e.currentTarget.textContent, focused: false}); myRef.current.innerText = ''}}
              suppressContentEditableWarning>
          {finalContent}
        </div>
      </div>
    );

  } else {
    return (<></>)
  }

});

export default function commentRenderer(comments={}) {
    var currentRef = null;

    return ({ rows, stylesheet, useInlineStyles }) => {
        // edit rows to contain comments
        return rows.map(function(node, i) {
            var ref = useRef(null);
            const content = Object.keys(comments).includes(`L${i+1}`) ? comments[`L${i+1}`][0].content : null
            const comment = (
              <Comment ref={ref}>
                  {content}
              </Comment>
            )

            node.properties['onFocus'] = () => {
              currentRef = ref;
              currentRef.current.focus();
            }

            node.properties['tabIndex'] = -1

            var element = createElement({
                node,
                stylesheet,
                useInlineStyles,
                key: `code-segement${i}`
            });

            return (
              <>
                {comment}
                {element}
              </>
            );
            
            }
        );
    }
}