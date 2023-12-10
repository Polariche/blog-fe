import { createElement, SyntaxHighlighter } from 'react-syntax-highlighter';
import React from 'react';

export default function commentRenderer(comments={}) {

    return ({ rows, stylesheet, useInlineStyles }) => {
        // edit rows to contain comments
        return rows.map(function(node, i) {
            var k = `L${i+1}`;
            if (Object.keys(comments).includes(k)) {
                // do stuff

                // this is a proof-of-concept; find a more react-ish way
                var children = [{type:"text", value: comments[k][0].content}].map((x,i)=>x)
                var com = Object.getPrototypeOf(node.children[0]);
                com.children = children;
                com.type = "element"
                com.tagName = "span"
                com.properties = Object.getPrototypeOf(node.children[0].properties);
                com.properties.className = [].map((x,i)=>x)
                node.children = [...node.children.slice(0, 1),  ...node.children.slice(1), com]
            }

            return (
                createElement({
                    node,
                    stylesheet,
                    useInlineStyles,
                    key: `code-segement${i}`
                })
            );
            
            }
        );
    }
}