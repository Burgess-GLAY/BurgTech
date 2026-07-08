'use client'

import { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Quote,
    Code,
    FileCode,
    Link as LinkIcon,
    Minus,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface RichTextEditorProps {
    value: string
    onChange: (html: string) => void
    placeholder?: string
    minHeight?: string
}

interface ToolbarButtonProps {
    onClick: () => void
    isActive?: boolean
    title: string
    children: React.ReactNode
}

function ToolbarButton({ onClick, isActive, title, children }: ToolbarButtonProps) {
    return (
        <button
            type="button"
            title={title}
            onClick={onClick}
            className={cn(
                'p-1.5 rounded-lg transition-colors',
                isActive
                    ? 'bg-bt-cyan/20 text-bt-cyan'
                    : 'text-white/40 hover:text-white hover:bg-white/5'
            )}
        >
            {children}
        </button>
    )
}

export function RichTextEditor({ value, onChange, placeholder, minHeight = '300px' }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({ openOnClick: false }),
            Underline,
        ],
        immediatelyRender: false,
        content: value,
        editorProps: {
            attributes: {
                class: 'prose prose-invert prose-sm max-w-none focus:outline-none px-5 py-4 text-white/80',
            },
        },
        onUpdate({ editor }) {
            onChange(editor.getHTML())
        },
    })

    // Sync external value changes (edit mode)
    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value)
        }
    }, [value, editor])

    const setLink = () => {
        const url = window.prompt('Enter URL')
        if (!url) return
        if (url === '') {
            editor?.chain().focus().extendMarkRange('link').unsetLink().run()
        } else {
            editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
        }
    }

    return (
        <div className="rounded-2xl border border-white/10 bg-slate-900 overflow-hidden">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-white/10 bg-slate-900/80">
                <ToolbarButton
                    title="Bold"
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    isActive={editor?.isActive('bold')}
                >
                    <Bold className="w-4 h-4" />
                </ToolbarButton>

                <ToolbarButton
                    title="Italic"
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    isActive={editor?.isActive('italic')}
                >
                    <Italic className="w-4 h-4" />
                </ToolbarButton>

                <ToolbarButton
                    title="Underline"
                    onClick={() => editor?.chain().focus().toggleUnderline().run()}
                    isActive={editor?.isActive('underline')}
                >
                    <UnderlineIcon className="w-4 h-4" />
                </ToolbarButton>

                <div className="w-px h-5 bg-white/10 mx-1" />

                <ToolbarButton
                    title="Heading 1"
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                    isActive={editor?.isActive('heading', { level: 1 })}
                >
                    <Heading1 className="w-4 h-4" />
                </ToolbarButton>

                <ToolbarButton
                    title="Heading 2"
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                    isActive={editor?.isActive('heading', { level: 2 })}
                >
                    <Heading2 className="w-4 h-4" />
                </ToolbarButton>

                <ToolbarButton
                    title="Heading 3"
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
                    isActive={editor?.isActive('heading', { level: 3 })}
                >
                    <Heading3 className="w-4 h-4" />
                </ToolbarButton>

                <div className="w-px h-5 bg-white/10 mx-1" />

                <ToolbarButton
                    title="Bullet List"
                    onClick={() => editor?.chain().focus().toggleBulletList().run()}
                    isActive={editor?.isActive('bulletList')}
                >
                    <List className="w-4 h-4" />
                </ToolbarButton>

                <ToolbarButton
                    title="Ordered List"
                    onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                    isActive={editor?.isActive('orderedList')}
                >
                    <ListOrdered className="w-4 h-4" />
                </ToolbarButton>

                <ToolbarButton
                    title="Blockquote"
                    onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                    isActive={editor?.isActive('blockquote')}
                >
                    <Quote className="w-4 h-4" />
                </ToolbarButton>

                <div className="w-px h-5 bg-white/10 mx-1" />

                <ToolbarButton
                    title="Inline Code"
                    onClick={() => editor?.chain().focus().toggleCode().run()}
                    isActive={editor?.isActive('code')}
                >
                    <Code className="w-4 h-4" />
                </ToolbarButton>

                <ToolbarButton
                    title="Code Block"
                    onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
                    isActive={editor?.isActive('codeBlock')}
                >
                    <FileCode className="w-4 h-4" />
                </ToolbarButton>

                <ToolbarButton
                    title="Link"
                    onClick={setLink}
                    isActive={editor?.isActive('link')}
                >
                    <LinkIcon className="w-4 h-4" />
                </ToolbarButton>

                <ToolbarButton
                    title="Horizontal Rule"
                    onClick={() => editor?.chain().focus().setHorizontalRule().run()}
                >
                    <Minus className="w-4 h-4" />
                </ToolbarButton>
            </div>

            {/* Editor area */}
            <EditorContent
                editor={editor}
                style={{ minHeight }}
                className="cursor-text"
                onClick={() => editor?.commands.focus()}
            />

            {/* Placeholder */}
            {editor && editor.isEmpty && placeholder && (
                <div className="absolute top-[52px] left-5 text-white/20 text-sm pointer-events-none select-none">
                    {placeholder}
                </div>
            )}
        </div>
    )
}
