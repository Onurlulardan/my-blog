import { ChangeEventHandler, FC, useEffect, useState } from "react";
import { useEditor, EditorContent, getMarkRange, Range } from "@tiptap/react";
import Toolbar from "./toolbar";
import StarterKit from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Link } from "@tiptap/extension-link";
import { Youtube } from "@tiptap/extension-youtube";
import { Image } from "@tiptap/extension-image";
import EditLink from "./link/EditLink";
import GalleryModal, { ImageSelectionResult } from "./gallerymodal";
import axios from "axios";
import SeoForm, { SeoResult } from "./seoform";
import ActionButton from "../common/ActionButton";
import ThumbNailSelector from "./thumbnailselector";

export interface FinalPost extends SeoResult {
  id?: string;
  title: string;
  content: string;
  thumbnail?: File | string;
}

interface Props {
  initialValue?: FinalPost;
  btnTitle?: string;
  busy?: boolean;
  onSubmit(post: FinalPost): void;
}

const Editor: FC<Props> = ({
  initialValue,
  btnTitle = "Submit",
  busy = false,
  onSubmit,
}): JSX.Element => {
  const [selectionRange, setSelectionRange] = useState<Range>();
  const [showGallery, setShowGallery] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagesData, setImagesData] = useState<{ src: string }[]>([]);
  const [seoInitialValue, setSeoInitialValue] = useState<SeoResult>();
  const [post, setPost] = useState<FinalPost>({
    title: "",
    content: "",
    meta: "",
    tags: "",
    slug: "",
  });

  const getImages = async () => {
    const { data } = await axios("/api/image");
    setImagesData(data.images);
  };

  const hendleImageUpload = async (image: File) => {
    setUploadingImage(true);
    const formData = new FormData();
    formData.append("image", image);
    const { data } = await axios.post("/api/image", formData);
    setUploadingImage(false);
    setImagesData([data, ...imagesData]);
  };

  const handleSubmit = () => {
    if (!editor) return;
    onSubmit({ ...post, content: editor.getHTML() });
  };

  const updateTitle: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setPost({ ...post, title: target.value });
  };

  const updateSeoValue = (result: SeoResult) => {
    setPost({ ...post, ...result });
  };

  const updateThumbnail = (file: File) => {
    setPost({ ...post, thumbnail: file });
  };

  useEffect(() => {
    getImages();
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        autolink: false,
        linkOnPaste: false,
        openOnClick: false,
        HTMLAttributes: {
          target: "",
        },
      }),
      Placeholder.configure({
        placeholder: "Type something",
      }),
      Youtube.configure({
        width: 840,
        height: 472.5,
        HTMLAttributes: {
          class: "mx-auto rounded",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "mx-auto",
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-lg focus:outline-none dark:prose-invert max-w-full mx-auto h-full",
      },
      handleClick(view, pos, event) {
        const { state } = view;
        const selectionRange = getMarkRange(
          state.doc.resolve(pos),
          state.schema.marks.link
        );
        if (selectionRange) setSelectionRange(selectionRange);
      },
    },
  });

  useEffect(() => {
    if (initialValue) {
      setPost({ ...initialValue });
      editor?.commands.setContent(initialValue.content);

      const { meta, slug, tags } = initialValue;
      setSeoInitialValue({ meta, slug, tags });
    }
  }, [initialValue, editor]);

  useEffect(() => {
    if (editor && selectionRange) {
      editor.commands.setTextSelection(selectionRange);
    }
  }, [editor, selectionRange]);

  const handleImageSelection = (result: ImageSelectionResult) => {
    editor
      ?.chain()
      .focus()
      .setImage({ src: result.src, alt: result.altText })
      .run();
  };

  return (
    <>
      <div className="p-3  dark:bg-primary-dark bg-primary transition ">
        <div className="sticky top-0 z-10 dark:bg-primary-dark bg-primary">
          <div className="flex items-center justify-between mb-3">
            <ThumbNailSelector
              initialValue={post.thumbnail as string}
              onChange={updateThumbnail}
            />
            <div className="inline-block">
              <ActionButton
                busy={busy}
                title={btnTitle}
                onClick={handleSubmit}
              />
            </div>
          </div>

          <input
            className="bg-transparent w-full border-0 border-b-[1px] border-secondary-dark dark:border-secondary-light text-xl font-semibold italic text-primary-dark dark:text-primary mb-3 py-2 outline-none"
            placeholder="Title"
            onChange={updateTitle}
            value={post.title}
          />
          <Toolbar
            editor={editor}
            onOpenImageModal={() => setShowGallery(true)}
          />
          <div className="h-[1px] w-full bg-secondary-dark dark:bg-secondary-light my-3" />
        </div>

        {editor ? <EditLink editor={editor} /> : null}
        <EditorContent editor={editor} className="min-h-[300px]" />
        <div className="h-[1px] w-full bg-secondary-dark dark:bg-secondary-light my-3" />
        <SeoForm
          title={post.title}
          onChange={updateSeoValue}
          initialValue={seoInitialValue}
        />
      </div>

      <GalleryModal
        visible={showGallery}
        onClose={() => setShowGallery(false)}
        onSelect={handleImageSelection}
        images={imagesData}
        onFileSelect={hendleImageUpload}
        uploading={uploadingImage}
      />
    </>
  );
};

export default Editor;
