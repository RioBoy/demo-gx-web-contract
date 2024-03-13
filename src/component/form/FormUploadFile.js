import { useRef, useId } from 'react';
import * as _ from 'lodash';
import { eventUploadFile } from '@/helper/actionEventHelper';

const FormUploadFile = (props) => {
  const refInputFile = useRef(null);

  const {
    label = '',
    id = 'signature',
    required = false,
    accept = 'image/*',
    placeholder = '',
    previewFiles = [],
    maxSize = 10240000,
    actions = {
      onChange: () => {},
      handleSetDataPreview: () => {},
    },
  } = props;

  const idInput = id + '-input-file-' + useId();

  const _handleChange = (files = []) => {
    actions.onChange(props.name, files[0]);
  };

  const _handleConvertToFile = (files = []) => {
    const max = 1;

    let containerNewFiles = [];

    for (let i = 0; i < max; i++) {
      let reader = new FileReader();
      reader.onload = (e) => {
        const dataFile = {
          url: e.target.result,
          name: files[i].name,
          size: files[i].size || '',
        };

        containerNewFiles.push(dataFile);

        actions.handleSetDataPreview([dataFile]);
      };

      reader.readAsDataURL(files[i]);
    }
  };

  const _handleUploadFile = async (event) => {
    const { files = [] } = await eventUploadFile(event, maxSize);

    await _handleConvertToFile(files);
    await _handleChange(files);
  };

  return (
    <div className={'form-group ' + (props.extraClass || '')}>
      {label ? (
        <label htmlFor={idInput} className="form-label">
          {label}
          <span className="text-danger-200 fs-16">{required ? '*' : ''}</span>
        </label>
      ) : null}

      <input
        accept={accept}
        ref={refInputFile}
        id={idInput}
        type="file"
        name={props.name}
        onChange={_handleUploadFile}
        className="d-none"
        value=""
      />

      <div className="wp-btn-upload">
        <button
          className="btn btn-transparent fs-16 text-blue-300 text-decoration-underline p-0"
          type="button"
          onClick={() => refInputFile.current.click()}
        >
          {props.title || 'Upload'}
        </button>
      </div>
    </div>
  );
};

export default FormUploadFile;
