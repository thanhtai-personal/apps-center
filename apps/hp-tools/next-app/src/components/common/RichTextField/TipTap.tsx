import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle, { TextStyleOptions } from "@tiptap/extension-text-style";
import Image from "@tiptap/extension-image";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Flex from "../Flex";
import { forwardRef, useEffect, useRef, useState } from "react";
import { AppModalInstance, NotiStackInstance } from "pages/_app";
import UploadButton from "../UploadButton";
import { useGlobalStyle } from "src/styles";
import Text from "../Text";
import { getImage, uploadImage } from "libs/firebase";
import { createImage } from "src/actions/image.actions";
import { Button, TextField } from "@material-ui/core";

const ModalSelectImage = (props: any) => {
  const globalClasses = useGlobalStyle(props);
  const { setGlobalEditor, onChange, editable } = props;
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const handleUpload = async (e: any) => {
    try {
      const file = e.target.files[0];
      const firebaseImage: any = await uploadImage(file, `images/${file.name}`);
      const downloadUrl: string = await getImage(
        firebaseImage.metadata.fullPath
      );

      if (downloadUrl) {
        const uploadedImage = await createImage({
          url: downloadUrl,
          alt_name: file.name,
        });
        uploadedImage &&
          window.editor &&
          window.editor
            .chain()
            .focus()
            .setImage({ src: uploadedImage.url })
            .run();
        AppModalInstance.close();
      }
    } catch (error) {
      NotiStackInstance.push({
        children: "Upload image error!",
        variant: "error",
      });
    }
  };

  const handleAddImageUrl = async () => {
    const uploadedImage = await createImage({
      url: url,
      alt_name: name,
    });
    uploadedImage &&
      window.editor &&
      window.editor.chain().focus().setImage({ src: uploadedImage.url }).run();
    AppModalInstance.close();
  };

  return (
    <Flex width={"100%"} height={"100%"} column>
      <Flex column center>
        <UploadButton handleUpload={handleUpload} />
        <Text className={globalClasses.labelText}>Upload</Text>
      </Flex>

      <Flex
        position={"relative"}
        center
        borderBottom={"solid 1px black"}
        my={4}
      >
        <Text
          className={globalClasses.text}
          style={{
            transform: "translateY(14px)",
            background: "#FFF",
            paddingLeft: "8px",
            paddingRight: "8px",
          }}
        >
          OR
        </Text>
      </Flex>

      <Flex column width={"100%"}>
        <Text className={globalClasses.labelText}>URL:</Text>
        <TextField
          onChange={(e) => setUrl(e.target.value)}
          variant={"standard"}
          style={{
            border: "solid 1px rgba(0,0,0, 0.25)",
            borderRadius: ".5rem",
          }}
          InputProps={{
            disableUnderline: true,
          }}
        />
      </Flex>
      <Flex column width={"100%"} mt={1}>
        <Text className={globalClasses.labelText}>Name:</Text>
        <TextField
          onChange={(e) => setName(e.target.value)}
          variant={"standard"}
          style={{
            border: "solid 1px rgba(0,0,0, 0.25)",
            borderRadius: ".5rem",
          }}
          InputProps={{
            disableUnderline: true,
          }}
        />
      </Flex>
      <Flex width={"100%"} justifyContent={"flex-end"} mt={2}>
        <Button
          className={globalClasses.buttonText}
          variant="contained"
          onClick={handleAddImageUrl}
        >
          Save Image
        </Button>
      </Flex>
      <Flex></Flex>
    </Flex>
  );
};

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  useEffect(() => {
    AppModalInstance.replaceChildren(ModalSelectImage);
    AppModalInstance.updateModalProps({
      maxWidth: "sm",
    });
  }, []);

  const addImage = () => {
    AppModalInstance.open();
  };

  return (
    <Flex column p={1}>
      <button onClick={addImage}>Image</button>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "is-active" : ""}
      >
        code
      </button>
      <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </button>
      <button onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "is-active" : ""}
      >
        paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive("heading", { level: 5 }) ? "is-active" : ""}
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive("heading", { level: 6 }) ? "is-active" : ""}
      >
        h6
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
      >
        code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        blockquote
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        horizontal rule
      </button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        redo
      </button>
      <button
        onClick={() => editor.chain().focus().setColor("#958DF1").run()}
        className={
          editor.isActive("textStyle", { color: "#958DF1" }) ? "is-active" : ""
        }
      >
        purple
      </button>
    </Flex>
  );
};

export default forwardRef((props: any, ref: any) => {
  const {
    editable = true,
    onChange,
    content,
    setGlobalEditor,
    defaultValue,
  } = props;

  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({}),
      // TextStyle.configure({ types: [ListItem.name] }),
      Image,
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
    ],
    content: content || ``,
    // onChange: () => {
    //   onChange && onChange(editor.getHTML());
    // },
  });

  useEffect(() => {
    if (editor) {
      setGlobalEditor(editor);
    }
  }, [editor]);

  useEffect(() => {
    if (defaultValue && editor) editor.commands.setContent(defaultValue);
  }, [defaultValue, editor]);

  return (
    <Flex width={"100%"} bgcolor={"gray"}>
      <MenuBar editor={editor} />
      <Flex
        width={"100%"}
        border={"solid 1px rgba(0,0,0, 0.25)"}
        bgcolor={"#fff"}
      >
        <EditorContent editor={editor} />
        {/* <EditorContent editable={editable} editor={editor} /> */}
      </Flex>
    </Flex>
  );
});
