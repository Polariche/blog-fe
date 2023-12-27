import { createElement } from 'react-syntax-highlighter';
import React, {useState, forwardRef, useRef, useEffect, useImperativeHandle} from 'react';


const Comment = forwardRef((props, ref) => {
  const [focused, setFocused] = useState(false);
  const [maxLength, setMaxLength] = useState(-1);

  const myRef = useRef(null);

  useImperativeHandle(ref, () => ({
    handleFocus(val) {
      setFocused(val);
    }
  }))

  useEffect(() => {if(focused) {myRef.current.focus()}}, [focused])

  if (props.children != null || focused)
  {
    const outerStyle = {
      overflow: 'visible', 
      width: 0, 
      height: 0, 
      position: 'relative', 
      left: 500,
      userSelect: 'none'
    }

    const innerStyle = {
      backgroundColor: 'rgb(0,0,0)',
      color: 'green'
    }

    return (
      <div style={outerStyle}>
        <div style={innerStyle} contentEditable={focused} ref={myRef}  onClick={() => {setFocused(true)}}>
          {props.children}
        </div>
      </div>
    );

  } else {
    return (<></>)
  }

});

export default function commentRenderer(comments={}) {

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
            node.properties['onFocus'] = () => {ref.current.handleFocus(true);}
            //node.properties['onBlur'] = () => {ref.current.handleFocus(false);}
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