import { createElement } from 'react-syntax-highlighter';
import React, {useState, forwardRef, useRef, useEffect, useImperativeHandle} from 'react';
import Markdown from 'react-markdown'

const Comment = forwardRef((props, ref) => {
  const [content, setContent] = useState("");
  const [focused, setFocused] = useState(false);
  
  const myRef = useRef(null);

  if (props.children && !content)
    setContent(props.children)

  useImperativeHandle(ref, () => ({
    defocus() {
      if (myRef.current) {
        if (myRef.current.innerText.length > 0)
          setContent(myRef.current.innerText)
        else
          setContent(null)
      }
      setFocused(false);
    },
    focus() {
      setFocused(true);
    }
  }))

  useEffect(() => {if(focused) {
                      myRef.current.focus()
                    }
                  }, [focused])

  if (content || focused)
  {
    const outerStyle = {
      overflow: 'visible', 
      width: 0, 
      height: 0, 
      position: 'relative', 
      left: 500,
      userSelect: 'none',
    }

    const innerStyle = {
      backgroundColor: 'rgb(0,0,0)',
      color: 'green',
    }

    if (!focused) {
      return (
        <div style={outerStyle}>
          <div style={innerStyle} ref={myRef} onClick={() => {setFocused(true)}}>
            <Markdown components={{p: 'span'}}>
              {content}
            </Markdown>
          </div>
        </div>
      );
      
    } else {
      return (
        <div style={outerStyle}>
          <div style={innerStyle} contentEditable={true} ref={myRef}>
            {content}
          </div>
        </div>
      );
    }
    

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
              if (currentRef)
                currentRef.current.defocus()

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