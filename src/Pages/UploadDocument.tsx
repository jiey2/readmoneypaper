import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Upload,
  Space,
  Breadcrumb,
  Typography,
} from "@arco-design/web-react";
import "../App.css";

const FormItem = Form.Item;
const BreadcrumbItem = Breadcrumb.Item;

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
        <Form {...formItemLayout} layout={"vertical"}>
          <FormItem label="Name" rules={[{ required: true }]}>
            <Input placeholder="Please enter the name you wanna call it..." />
          </FormItem>
          <FormItem label="Group">
            <Input placeholder="Please enter the group/cluster/type you that it would fit in..." />
          </FormItem>
          <FormItem label="Description">
            <Input placeholder="Please enter some descriptions..." />
          </FormItem>
          <FormItem label="Contents">
            <Upload
              drag
              accept="image/*"
              action="/"
              tip="Only pdf, png, jpg can be uploaded, and the size does not exceed 100MB"
            />
          </FormItem>
          <FormItem {...noLabelLayout}>
            <Space>
              <Button type="primary">Submit</Button>
              <Button onClick={() => navigate("/")}>Back</Button>
            </Space>
          </FormItem>
        </Form>
      </div>
    </div>
  );
}

export default UpLoadDocument;
