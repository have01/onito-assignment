declare module '@editorjs/warning';
import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import Code from '@editorjs/code';
import Table from '@editorjs/table';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import InlineCode from '@editorjs/inline-code';
import Delimiter from '@editorjs/delimiter';
import Warning from '@editorjs/warning';

interface EditorComponentProps { }

const DEFAULT_INITIAL_DATA = {
    "time": new Date().getTime(),
    "blocks": [
        {
            "type": "header",
            "data": {
                "text": "Hello start typing here!",
                "level": 1
            }
        },
    ]
}

const EditorComponent: React.FC<EditorComponentProps> = () => {
    const ejInstance = useRef<EditorJS | null>(null);

    const initEditor = () => {
        const editor = new EditorJS({
            holder: 'editorjs',
            onReady: () => {
                ejInstance.current = editor;
            },
            data: DEFAULT_INITIAL_DATA,
            autofocus: true,
            onChange: async () => {
                if (ejInstance.current) {
                    const content = await ejInstance.current.saver.save();
                    console.log(content)
                }
            },
            tools: {
                header: Header,
                list: List,
                embed: Embed,
                code: Code,
                table: Table,
                quote: Quote,
                marker: Marker,
                inlineCode: InlineCode,
                delimiter: Delimiter,
                warning: Warning,
            },
        });
    };

    const handleSubmit = async () => {
        if (ejInstance.current) {
            const contentData = await ejInstance.current.saver.save();
            console.log(contentData);
        }
    };

    useEffect(() => {
        console.log("hello")
        if (!ejInstance.current) {
            initEditor();
        }

        return () => {
            ejInstance.current?.destroy();
            ejInstance.current = null;
        };
    }, []);

    return (
        <>
            <div className="w-full  h-screen flex flex-col items-center justify-center">
                <div id='editorjs' className="w-4/5 mx-auto my-8 p-4 shadow-lg rounded-md" />
                <div className=" flex justify-end">
                    <button className="px-2 py-1 bg-green-500 text-white" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        </>

    );
}

export default EditorComponent;
