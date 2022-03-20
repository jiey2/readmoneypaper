import { Table, Breadcrumb, Link } from "@arco-design/web-react";
import { getDocumentsList } from "../services";
import useRequest from '../utils/useRequest'
import "../App.css";

const BreadcrumbItem = Breadcrumb.Item;

export default function () {

  // services
  const {loading: getDocumentsLoading, result: documentList} =  useRequest(getDocumentsList)

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
    },
    {
      title: "Link",
      dataIndex: "BucketUrl",
      render: (col: any, item: any, index: number) => {
        console.log(col, item, index);
        return (
          <Link href={`https://${col}`} target="_blank" icon>
            {col}
          </Link>
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
      />
    </div>
  );
}
