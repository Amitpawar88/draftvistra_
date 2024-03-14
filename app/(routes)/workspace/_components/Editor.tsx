"use client";
import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
// @ts-expect-error
import Header from "@editorjs/header";
// @ts-expect-error
import List from "@editorjs/list";
// @ts-expect-error
import Checklist from "@editorjs/checklist";
// @ts-expect-error
import Marker from "@editorjs/marker";
// @ts-expect-error
import CodeTool from "@editorjs/code";
// @ts-expect-error
import Paragraph from "@editorjs/paragraph";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { FILE } from "../../dashboard/_components/FileList";


const rawDocument = {
    "time" : 1550476186479,
    "blocks" : [{
        data: {
            text: 'Document Name',
            level: 2
        },
        id: '123',
        type: 'header',
    },
    {
        data: {
            level: 4
        },
        id: '1234',
        type: 'header',
    }],
    "version" : "2.8.1"
}

function Editor({onSaveTrigger, fileId, fileData}:{onSaveTrigger:any, fileId: any, fileData: FILE}) {

  const ref = useRef<EditorJS>();
  const updateDocument = useMutation(api.files.updateDocument);
  const [document, setDocument] = useState(rawDocument);
  useEffect(() => {
    fileData&&initEditor();
  }, [fileData]);

  useEffect(() => {
    console.log("trigger value: ", onSaveTrigger);
    onSaveTrigger&&onSaveDocument();
  }, [onSaveTrigger])

  const initEditor = () => {
    const editor = new EditorJS({
      tools: {
        header: {
          class: Header,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+H",
          config: {
            placeholder: "Enter a header",
          },
        },
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
        code: CodeTool,
        Marker: {
          class: Marker,
          shortcut: "CMD+SHIFT+M",
        },
      },

      holder: "editorjs",
      data: fileData?.document ? JSON.parse(fileData.document) : rawDocument
    });
    ref.current = editor;
  };

  const onSaveDocument = () => {
    if (ref.current) {
      ref.current.save().then((outputData) => {
        console.log('Article data: ', outputData)
        updateDocument({
          _id: fileId,
          document: JSON.stringify(outputData)
        }).then(resp => {
            toast('Document Updated!')
        }, (e) => {
          toast('Server Error!')
        })
      }).catch((error) => {
        console.log('Saving failed: ', error)
      });
    }
  }

  return (
    <div>
      <div id="editorjs" className="ml-20"></div>
    </div>
  );
}

export default Editor;
