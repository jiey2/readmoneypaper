/* eslint-disable */
// @ts-nocheck
/* @ts-ignore */
import { Table, Breadcrumb, Link, Button } from "@arco-design/web-react";
import { IconCopy } from "@arco-design/web-react/icon";
import { getDocumentsList } from "../services";
import useRequest from "../utils/useRequest";
import ArcoConfetti from "arco-confetti";
import "../App.css";

const BreadcrumbItem = Breadcrumb.Item;
const ButtonGroup = Button.Group;

export default function () {
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

  const copy = (text?: string): void => {
    if (!text) {
      return;
    }
    if (typeof text !== "string") {
      throw new TypeError(`param should be string, but receive ${typeof text}`);
    }

    function handler(e: ClipboardEvent): void {
      if (e.clipboardData) {
        try {
          e.clipboardData.setData("text/plain", text as string);
          e.preventDefault();
          window.document.removeEventListener("copy", handler, true);
        } catch (err) {
          throw new Error("Copy Error");
        }
      }
    }

    window.document.addEventListener("copy", handler, true);
    setTimeout(() => window.document.execCommand("copy"), 500);
  };

  const handleDocumentString = (item: Record<string, any>): string => {
    console.log(item);
    return `【${item?.DocName}】【${item?.DocGroup}】【${item?.DocDescription}】${item?.BucketUrl}`;
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "DocName",
    },
    {
      title: "Group",
      dataIndex: "DocGroup",
    },
    {
      title: "Description",
      dataIndex: "DocDescription",
      width: 480,
    },
    {
      title: "Create Time",
      dataIndex: "CreateTime",
      width: 240,
      render: (timestamp) => {
        return (new Date(timestamp)).toString();
      }
    },
    {
      title: "Action",
      dataIndex: "BucketUrl",
      width: 160,
      render: (col: any, item: any) => {
        return (
          <ButtonGroup>
            <Link href={`https://${col}`} target="_blank" icon>
              {"Link"}
            </Link>
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
          </ButtonGroup>
        );
      },
    },
  ];
  return (
    <div className="Container">
      <Breadcrumb>
        <BreadcrumbItem>
          <a href="#">Home</a>
        </BreadcrumbItem>
        <BreadcrumbItem>List</BreadcrumbItem>
      </Breadcrumb>
      <Table
        loading={getDocumentsLoading}
        style={{ marginTop: 10 }}
        columns={columns}
        data={documentList?.data}
        pagination={{ showTotal: true, sizeCanChange: true }}
      />
    </div>
  );
}
