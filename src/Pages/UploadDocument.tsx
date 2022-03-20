import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Upload, Space } from "@arco-design/web-react";
import "../App.css";


const FormItem = Form.Item;

// interface Props {
//   visible: boolean;
// }

function UpLoadDocument(): ReactElement {
  const navigate = useNavigate();
  // render
  return (
    <div className="App-header">
      <Form style={{ width: 600 }} size={"large"}>
        <FormItem label="Name" rules={[{ required: true }]}>
          <Input placeholder="please enter the name you wanna call it..." />
        </FormItem>
        <FormItem label="Group">
          <Input placeholder="please enter the group/cluster/type you that it would fit in..." />
        </FormItem>
        <FormItem label="Contents">
          <Upload
            drag
            accept="image/*"
            action="/"
            tip="Only pdf, png, jpg can be uploaded, and the size does not exceed 100MB"
          />
        </FormItem>
        <FormItem
          wrapperCol={{
            offset: 5,
          }}
        >
          <Space>
            <Button type="primary">Submit</Button>
            <Button onClick={() => navigate("/")}>Back</Button>
          </Space>
        </FormItem>
      </Form>
    </div>
  );
}

export default UpLoadDocument;
