import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import styled from 'styled-components';
//components
import Flexbox from '../hoc/Flexbox';
//templates
import { templates } from './templates';
//utils
import { imageUploadAndGetUrl } from '../../utils/cloudinary.utils';
import { getFromLocalStorage } from '../../utils/storage.utils';

type Props = {
  label: string;
  value: string;
  getValue: (val: string) => void;
  cls?: string;
};

const TinyEditor: React.FC<Props> = ({ label, value, getValue, cls }) => {
  function handleEditorChange(content: any, editor: any) {
    getValue(content);
  }

  async function imagePicker(
    blob: any,
    success: any,
    fail: any,
    progress: any,
  ) {
    const file = blob.blob();
    const types = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];

    if (file.size > 524000) {
      fail('Maximum image size 500KB');
      return false;
    }

    if (!types.includes(file.type)) {
      fail('We accept only images');
      return false;
    }

    await imageUploadAndGetUrl(
      file,
      'description_images',
      (percent, error, file) => {
        if (percent) {
          progress(percent);
        }
        if (error) {
          fail(error);
        }
        if (file) {
          success(file.data.secure_url);
        }
      },
    );
  }

  const isDark = getFromLocalStorage('theme') === 'dark';

  return (
    <Container cls={cls} flex="column" justify="start" align="start">
      <span>{label}</span>
      <Editor
        apiKey="ujhxkgc5qcu6syhl2b7qv1n2ydnqwtl1vwyy8ndwnl650f0t"
        initialValue={value}
        init={{
          skin: isDark ? 'oxide-dark' : '',
          content_css: isDark ? 'dark' : '',
          height: 500,
          menubar: true,
          file_picker_types: 'image',
          images_upload_handler: imagePicker,
          templates: templates,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen hr imagetools',
            'insertdatetime media table paste code help wordcount quickbars',
            'importcss autosave save template searchreplace emoticons',
          ],
          toolbar: `undo redo | fontsizeselect backcolor | alignleft aligncenter alignright alignjustify
            | bullist numlist outdent indent | template restoredraft | help`,
          autosave_interval: '10s',
          quickbars_insert_toolbar: 'template',
          autosave_prefix: 'tinymce-autosave',
        }}
        onEditorChange={handleEditorChange}
      />
    </Container>
  );
};

TinyEditor.defaultProps = {
  label: 'Some label',
  value: '',
  getValue: () => false,
};

export default TinyEditor;

const Container = styled(Flexbox)`
  padding: 0;

  & > span {
    font-size: ${({ theme }) => theme.fontSize.sm + 'px'};
    color: ${({ theme }) => theme.colors.color};
    font-weight: bold;
    margin-bottom: 5px;
  }

  & > div {
    width: 100%;
    border: none;
  }
`;
