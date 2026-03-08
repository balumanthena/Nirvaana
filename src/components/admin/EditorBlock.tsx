"use client";

import React, { useEffect, useRef } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';

interface EditorBlockProps {
    data?: string;
    onChange: (data: string) => void;
    holder: string;
}

export default function EditorBlock({ data, onChange, holder }: EditorBlockProps) {
    const ejInstance = useRef<EditorJS | null>(null);

    useEffect(() => {
        if (!ejInstance.current) {
            initEditor();
        }
        return () => {
            ejInstance.current?.destroy();
            ejInstance.current = null;
        };
    }, []);

    const initEditor = async () => {
        const Header = (await import('@editorjs/header')).default;
        const List = (await import('@editorjs/list')).default;
        const Image = (await import('@editorjs/image')).default;
        const Table = (await import('@editorjs/table')).default;
        const Quote = (await import('@editorjs/quote')).default;
        const Code = (await import('@editorjs/code')).default;
        const Checklist = (await import('@editorjs/checklist')).default;
        const Embed = (await import('@editorjs/embed')).default;
        const Delimiter = (await import('@editorjs/delimiter')).default;

        const editor = new EditorJS({
            holder: holder,
            data: data ? JSON.parse(data) : undefined,
            onReady: () => {
                ejInstance.current = editor;
            },
            onChange: async () => {
                const content = await editor.save();
                onChange(JSON.stringify(content));
            },
            tools: {
                header: {
                    class: Header as any,
                    inlineToolbar: ['link'],
                    config: {
                        placeholder: 'Enter a heading',
                        levels: [2, 3, 4],
                        defaultLevel: 2
                    }
                },
                list: {
                    class: List as any,
                    inlineToolbar: true,
                    config: {
                        defaultStyle: 'unordered'
                    }
                },
                image: {
                    class: Image as any,
                    config: {
                        // Internal image handling handled by the parent or a custom uploader
                        // For now, simple URL support or we can add a custom uploader later
                        uploader: {
                            uploadByFile(file: File) {
                                // This would ideally use the same firebase upload logic
                                // We'll pass a custom uploader if needed
                                return Promise.resolve({
                                    success: 1,
                                    file: {
                                        url: URL.createObjectURL(file), // Temporary
                                    }
                                });
                            }
                        }
                    }
                },
                table: Table,
                quote: Quote,
                code: Code,
                checklist: Checklist,
                embed: Embed,
                delimiter: Delimiter,
            },
        });
    };

    return <div id={holder} className="prose prose-slate max-w-none min-h-[400px] border rounded-md p-4 bg-white" />;
}
