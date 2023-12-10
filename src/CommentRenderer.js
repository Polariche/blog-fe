import { createElement } from 'react-syntax-highlighter';


export default function commentRenderer({comments}) {

    return ({ rows, stylesheet, useInlineStyles }) => {
        // edit rows to contain comments
        console.log(rows)
        return rows.map((node, i) =>
            createElement({
                node,
                stylesheet,
                useInlineStyles,
                key: `code-segement${i}`
            })
        );
    }
}