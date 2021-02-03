import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

type Props = {}

const TinyEditor: React.FC<Props> = (props) => {

  function handleEditorChange(content: any, editor: any) {
    console.log('Content was updated:', content);
  }
  return (
    <div>
      <Editor
        apiKey="ujhxkgc5qcu6syhl2b7qv1n2ydnqwtl1vwyy8ndwnl650f0t"
        initialValue="<p>This is the initial content of the editor</p>"
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar:
            `undo redo | formatselect | bold italic backcolor |
            alignleft aligncenter alignright alignjustify |
            bullist numlist outdent indent | removeformat | help`
        }}
        onEditorChange={handleEditorChange}
      />
    </div>
  );
}

export default TinyEditor;
