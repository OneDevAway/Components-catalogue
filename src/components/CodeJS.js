import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism'
const CodeJS = ({selectedCategory}) => {
    const code = `
   ${selectedCategory.subcategoryDetails[0].codeSnippetJS}
    `
  return (
    <div className="snippetContainer">
      <SyntaxHighlighter
        language="javascript"
        style={nightOwl}
        showLineNumbers={true}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}
export default CodeJS