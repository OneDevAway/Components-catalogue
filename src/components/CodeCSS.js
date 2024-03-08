import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism'
const CodeCSS = ({ selectedCategory }) => {
  const code = `
   ${selectedCategory?.subcategoryDetails[0].codeSnippetCSS}
    `

  return (
    <div className="snippetContainer">
      <SyntaxHighlighter language="css" style={nightOwl} showLineNumbers={true}>
        {code}
      </SyntaxHighlighter>
    </div>
  )
}
export default CodeCSS
