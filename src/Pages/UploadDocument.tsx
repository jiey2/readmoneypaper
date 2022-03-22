/* eslint-disable */
// @ts-nocheck
/* @ts-ignore */
import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Space,
  Breadcrumb,
  Typography,
  Message,
} from "@arco-design/web-react";
import UploadSubmitButton from "./UploadSubmitButton";
import "../App.css";
import { v4 as uuidv4 } from "uuid";

const FormItem = Form.Item;
const BreadcrumbItem = Breadcrumb.Item;

const fid = uuidv4();

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};
const noLabelLayout = {
  wrapperCol: {
    span: 18,
    offset: 0,
  },
};

// interface Props {
//   visible: boolean;
// }

function UpLoadDocument(): ReactElement {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // states
  const [fileName, setFileName] = useState();
  const [fileStatusOK, setFileStatusOK] = useState(false);

  // methods

  const handleSubmit = async (values) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const generatedFileName = fileName?.replace(
      /^([^.]*)\.(.*)$/,
      `d1t6xzqj7kfktr.cloudfront.net/${fid}.$2`
    );
    console.log("?",generatedFileName)
    let raw = JSON.stringify({
      did: fid,
      name: values?.name,
      group: values?.group,
      description: values?.description,
      contents: generatedFileName,
    });

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://vcsrnm6hf9.execute-api.ap-southeast-1.amazonaws.com/edge/database",
      requestOptions
    ).then(() => {
      Message.success("Uploaded!");
      setTimeout(() => {}, 1500);
      window.location.reload();
    });
  };

  const onSubmit = () => {
    console.log(fileName, fid);
    form.validate((errors, values) => {
      console.log(errors, values);
      if (errors) {
        Message.error("Fill in metadata!");
        throw new Error(JSON.stringify(errors));
      } else {
        console.log("Submit");
        handleSubmit(values);
      }
    });
  };

  const shouldDisableSubmit = () => {
    if (fileName) {
      return false;
    }
    return true;
  };

  // render
  return (
    <div className="Container">
      <div className="Codebox">
        <Breadcrumb style={{ margin: "auto" }}>
          <BreadcrumbItem>
            <a href="#">Home</a>
          </BreadcrumbItem>
          <BreadcrumbItem>Upload</BreadcrumbItem>
        </Breadcrumb>
        <Typography>
          <Typography.Title heading={3} style={{ marginTop: 0 }}>
            Upload a document
          </Typography.Title>
        </Typography>
        <Form {...formItemLayout} layout={"vertical"} form={form}>
          <FormItem
            label="Name"
            rules={[{ required: true, message: "Pls fill in." }]}
            field="name"
          >
            <Input placeholder="Please enter the name you wanna call it..." />
          </FormItem>
          <FormItem
            label="Group"
            rules={[{ required: true, message: "Pls fill in." }]}
            field="group"
          >
            <Input placeholder="Please enter the group/cluster/type you that it would fit in..." />
          </FormItem>
          <FormItem
            label="Description"
            rules={[{ required: true, message: "Pls fill in." }]}
            field="description"
          >
            <Input placeholder="Please enter some descriptions..." />
          </FormItem>
          <FormItem
            label="Contents"
            rules={[{ required: true, message: "Pls upload." }]}
          >
            {/* <Upload
              drag
              accept=".doc,.docx,.pdf,.png,.jpg"
              action="http://d1t6xzqj7kfktr.cloudfront.net/test.pdf"
              autoUpload={false}
              limit={1}
              tip="Only pdf, png, jpg, doc, docx can be uploaded, and the size does not exceed 100MB"
            /> */}
            <UploadSubmitButton
              fid={fid}
              setFileName={setFileName}
              setFileStatusOK={setFileStatusOK}
            />
          </FormItem>
          <FormItem {...noLabelLayout} shouldUpdate>
            {() => {
              return (
                <Space>
                  <Button
                    type="primary"
                    onClick={onSubmit}
                    disabled={shouldDisableSubmit()}
                  >
                    Submit
                  </Button>
                  <Button onClick={() => navigate("/")}>Back</Button>
                </Space>
              );
            }}
          </FormItem>
        </Form>
      </div>
    </div>
  );
}

export default UpLoadDocument;
