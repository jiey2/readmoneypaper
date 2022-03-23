/* eslint-disable */
// @ts-nocheck
/* @ts-ignore */

import { useState } from "react";
import { Upload } from "@arco-design/web-react";

interface Props {
  fid: string;
  setFileName: any;
}

function UploadSubmitButton(props: Props) {
  const { fid, setFileName } = props;
  const [fileList, setFileList] = useState([]);

  return (
    <>
      <Upload
        drag
        accept=".doc,.docx,.pdf,.png,.jpg"
        limit={1}
        tip="Only pdf, png, jpg, doc, docx can be uploaded, and the size does not exceed 100MB"
        fileList={fileList}
        autoUpload={true}
        onChange={(file) => {
          setFileList(file);
        }}
        customRequest={(option) => {
          const { onProgress, onError, onSuccess, file } = option;
          console.log("customOptions", file?.type);
          const xhr = new XMLHttpRequest();
          if (xhr.upload) {
            xhr.upload.onprogress = function (event) {
              let percent;
              if (event.total > 0) {
                percent = (event.loaded / event.total) * 100;
              }
              onProgress(parseInt(percent, 10), event);
            };
          }
          xhr.onerror = function error(e) {
            onError();
          };
          xhr.onload = function onload() {
            if (xhr.status < 200 || xhr.status >= 300) {
              return onError(xhr.responseText);
            }
            onSuccess(xhr.responseText, xhr);
          };

          const generatedFileName = file?.name?.replace(
            /^([^.]*)\.(.*)$/,
            `${fid}.$2`
          );
          setFileName(generatedFileName);
          const formData = new FormData();
          formData.append(name || "file", file);
          xhr.open(
            "put",
            `//d1t6xzqj7kfktr.cloudfront.net/${generatedFileName}`,
            true
          );
          xhr.setRequestHeader("Content-type", file?.type)
          xhr.send(formData);

          return {
            abort() {
              xhr.abort();
            },
          };
        }}
      />
    </>
  );
}

export default UploadSubmitButton;
