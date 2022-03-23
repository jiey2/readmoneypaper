/* eslint-disable */
// @ts-nocheck
/* @ts-ignore */
import {
  Table,
  Breadcrumb,
  Button,
  Typography,
  Input,
  Grid,
  Message,
} from "@arco-design/web-react";
import { IconCopy, IconLink, IconDelete } from "@arco-design/web-react/icon";
import * as dayjs from "dayjs";
import { getDocumentsList, deleteRecord } from "../services";
import useRequest from "../utils/useRequest";
import ArcoConfetti from "arco-confetti";
import "../App.css";

const BreadcrumbItem = Breadcrumb.Item;
const ButtonGroup = Button.Group;
const Row = Grid.Row;
const Col = Grid.Col;

export default function () {
  // states
  // const [deleteRecordLoading, setDeleteRecordLoading] = useState(false);

  // services
  const { loading: getDocumentsLoading, result: documentList } =
    useRequest(getDocumentsList);

  // methods
  function copyToClipboard(string: string) {
    let textarea;
    let result;

    try {
      textarea = document.createElement("textarea");
      textarea.setAttribute("readonly", true);
      textarea.setAttribute("contenteditable", true);
      textarea.style.position = "fixed";
      textarea.value = string;

      document.body.appendChild(textarea);

      textarea.focus();
      textarea.select();

      const range = document.createRange();
      range.selectNodeContents(textarea);

      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);

      textarea.setSelectionRange(0, textarea.value.length);
      result = document.execCommand("copy");
    } catch (err) {
      console.error(err);
      result = null;
    } finally {
      document.body.removeChild(textarea);
    }

    // manual copy fallback using prompt
    if (!result) {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const copyHotkey = isMac ? "⌘C" : "CTRL+C";
      result = prompt(`Press ${copyHotkey}`, string); // eslint-disable-line no-alert
      if (!result) {
        return false;
      }
    }
    return true;
  }

  const handleDocumentString = (item: Record<string, any>): string => {
    console.log(item);
    return `【${item?.DocName}】【${item?.DocGroup}】【${item?.DocDescription}】${item?.BucketUrl}`;
  };

  const columns = [
    {
      title: "名称",
      dataIndex: "DocName",
      width: "15%",
      sorter: (a, b) => a.DocName - b.DocName,
    },
    {
      title: "分组",
      dataIndex: "DocGroup",
      width: "15%",
    },
    {
      title: "描述",
      dataIndex: "DocDescription",
      sorter: (a, b) => a.DocDescription.length - b.DocDescription.length,
      // width: "40%",
    },
    {
      title: "创建时间",
      dataIndex: "CreateTime",
      width: "20%",
      sorter: (a, b) => a.CreateTime - b.CreateTime,
      render: (timestamp) => {
        return dayjs.unix(timestamp).format("YYYY-MM-DD HH:mm");
      },
    },
    {
      title: "",
      dataIndex: "BucketUrl",
      width: "10%",
      render: (col: any, item: any) => {
        return (
          <ButtonGroup>
            {/* <Space direction='vertical'> */}
            <Button
              type="text"
              size="mini"
              icon={<IconLink />}
              onClick={() => {
                window.open(`https://${col}`, "_blank");
              }}
            >
              Link
            </Button>
            <ArcoConfetti>
              <Button
                type="text"
                size="mini"
                icon={<IconCopy />}
                onClick={() => {
                  copyToClipboard(handleDocumentString(item));
                }}
              >
                Copy
              </Button>
            </ArcoConfetti>
            <Button
              type="text"
              size="mini"
              status="danger"
              icon={<IconDelete />}
              onClick={async () => {
                Message.info("处理中");
                await deleteRecord(item?.DID);
              }}
            >
              Delete
            </Button>
            {/* </Space> */}
          </ButtonGroup>
        );
      },
    },
  ];
  return (
    <div className="Container">
      <div style={{ maxWidth: 1000, margin: "auto" }}>
        <Breadcrumb>
          <BreadcrumbItem>
            <a href="#">Home</a>
          </BreadcrumbItem>
          <BreadcrumbItem>List</BreadcrumbItem>
        </Breadcrumb>
        <Row>
          <Col span={12} style={{ margin: "auto" }}>
            <Typography>
              <Typography.Title heading={3} style={{ marginTop: 0 }}>
                Documents List
              </Typography.Title>
            </Typography>
          </Col>
          <Col span={12} style={{ margin: "auto" }}>
            <Input.Search
              allowClear
              placeholder="Enter keyword to search"
              style={{ width: "80%", float: "right", textAlign: "center" }}
            />
          </Col>
        </Row>
        <Table
          loading={getDocumentsLoading}
          style={{ marginTop: 0 }}
          columns={columns}
          data={documentList?.data}
          pagination={{ showTotal: true, sizeCanChange: true }}
        />
      </div>
    </div>
  );
}
