import React, { useState } from "react"
import { LuCopy, LuCheck, LuCode } from "react-icons/lu"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism"

export default function AiresponsePreview({ content }) {
    if (!content) return null
    return (
        <div>
            <div>
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        code({ node, className, children, ...props }) {
                            let language = "javascript";

                            const match = /language-(\w+)/.exec(className || '');
                            if (match) language = match[1];

                            const isInline = !className;

                            return !isInline ? (
                                <CodeBlock
                                    code={String(children).replace(/\n$/, '')}
                                    language={language}
                                />
                            ) : (
                                <code className="px-1 py-0.5 bg-gray-100 rounded text-sm" {...props}>
                                    {children}
                                </code>
                            )
                        },

                        p({ children }) {
                            return <p className="mb-4 leading-5">{children}</p>
                        },
                        strong({ children }) {
                            return <strong className="">{children}</strong>
                        },
                        ul({ children }) {
                            return <ul className="list-disc pl-6 space-y-2 my-4">{children}</ul>
                        },
                        em({ children }) {
                            return <em className="">{children}</em>
                        },
                        ol({ children }) {
                            return <ol className="list-decimal pl-6 space-y-2 my-4">{children}</ol>
                        },
                        blockquote({ children }) {
                            return <blockquote className="border boder-gray-200 pl-4 italic">{children}</blockquote>
                        },
                        li({ children }) {
                            return <li className="">{children}</li>
                        },
                        h1({ children }) {
                            return <h1 className="text-2xl font-bold mt-6 mb-4">{children}</h1>
                        },
                        h2({ children }) {
                            return <h2 className="text-xl font-bold mt-4 mb-3">{children}</h2>
                        },
                        h3({ children }) {
                            return <h3 className="text-lg font-bold mt-2 mb-1">{children}</h3>
                        },
                        h4({ children }) {
                            return <h4 className="">{children}</h4>
                        },
                        a({ children }) {
                            return <a className="text-blue-500 hover:underline">{children}</a>
                        },
                        table({ children }) {
                            return (
                                <div className="overflow-x-auto my-4">
                                    <table className="border border-gray-500">
                                        {children}
                                    </table>
                                </div>
                            )
                        },
                        thead({ children }) {
                            return <thead className="bg-gray-50">{children}</thead>
                        },
                        tbody({ children }) {
                            return <tbody className=" divide-y divide-gray-200">{children}</tbody>
                        },
                        tr({ children }) {
                            return <tr className="">{children}</tr>
                        },
                        th({ children }) {
                            return <th className="px-3 text-left text-xs font-medium text-gray-500">{children}</th>
                        },
                        td({ children }) {
                            return <td className="px-3 py-2 whitespace-nowrap text-sm">{children}</td>
                        },
                        hr() {
                            return <hr className="my-6 border-gray-200" />
                        },
                        img({ src, alt }) {
                            return <img src={src} alt={alt} className="my-4 max-w-full rounded-xl" />
                        },
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>
        </div>
    )
}

function CodeBlock({ code, language }) {
    const [copied, setCopied] = useState(false)

    const copyCode = () => {
        navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="relative my-4 border rounded-lg mb-5 overflow-hidden bg-gray-50">


            <div className="flex justify-between items-center px-3 py-2 bg-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                    <LuCode size={16} />
                    <span>{language}</span>
                </div>

                <button
                    onClick={copyCode}
                    className="flex items-center gap-1 text-sm hover:text-blue-500"
                >
                    {copied ? <LuCheck size={16} /> : <LuCopy size={16} />}
                    {copied && <span>Copied!</span>}
                </button>
            </div>


            <SyntaxHighlighter
                language={language}
                style={oneLight}
                customStyle={{
                    margin: 0,
                    padding: "1rem",
                    background: "transparent",
                    fontSize: 13,
                }}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    )
}

