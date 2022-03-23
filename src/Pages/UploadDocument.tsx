/* eslint-disable */
// @ts-nocheck
/* @ts-ignore */
import { ReactElement, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Space,
  Breadcrumb,
  Typography,
  Modal,
  Message,
} from "@arco-design/web-react";
import { v4 as uuidv4 } from "uuid";
import { handleMetadataCopy } from "../utils/handleMetadataCopy";
import UploadSubmitButton from "./UploadSubmitButton";
import "../App.css";

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

function UpLoadDocument(): ReactElement {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // states
  const [fileName, setFileName] = useState();

  const [modal, contextHolder] = Modal.useModal();
  const ConfigContext = createContext({});

  const config = {
    title: 'Profile',
    content: <ConfigContext.Consumer>{(fileName) => `Current user: ${fileName.file}`}</ConfigContext.Consumer>,
  };

  // methods

  const handleSubmit = async (values) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const generatedFileName = fileName?.replace(
      /^([^.]*)\.(.*)$/,
      `d1t6xzqj7kfktr.cloudfront.net/${fid}.$2`
    );
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
      "https://vcsrnm6hf9.execute-api.ap-southeast-1.amazonaws.com/edge/database?operation=INSERT",
      requestOptions
    )
      .then(() => {
        // Message.success("Uploaded!");
        setTimeout(() => {}, 1500);
        console.log("raw", raw);
        Modal.success({
          title: "上传成功",
          onOk: () => window.location.reload()
        });
      })
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
            <UploadSubmitButton
              fid={fid}
              setFileName={setFileName}
            />
          </FormItem>
          <ConfigContext.Provider value='PJY'>
          {contextHolder}
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
          </ConfigContext.Provider>
        </Form>
      </div>
    </div>
  );
}

export default UpLoadDocument;
