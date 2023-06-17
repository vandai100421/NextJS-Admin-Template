import { EditOutlined, LockOutlined, DeleteOutlined } from "@ant-design/icons";
import { useHookstate } from "@hookstate/core";
import { Typography, Badge, Space, Tooltip, Button } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import { Customer as CustomerType } from "constants/types/customer.type";
import customerStore from "pages/CustomerManager/store";
import { FC } from "react";

type Props = {
  onClickOpenEditCustomer: (customer: CustomerType) => void;
  onClickConfirmDeleteCustomer: (id: string) => void;
  onClickConfirmBlockCustomer: (id: string) => void;
};

const CustomerTable: FC<Props> = ({
  onClickConfirmBlockCustomer,
  onClickConfirmDeleteCustomer,
  onClickOpenEditCustomer,
}) => {
  const customerState = useHookstate(customerStore);

  const columns: ColumnsType<any> = [
    {
      title: "ID Khách hàng",
      dataIndex: "_id",
      render: (value) => (
        <Typography.Paragraph copyable>{value}</Typography.Paragraph>
      ),
    },
    {
      title: "Tên Khách hàng",
      render: (customer: CustomerType) => (
        <span>{[customer.first_name, customer.last_name].join(" ")}</span>
      ),
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "phone",
      render: (value) => (
        <Typography.Paragraph copyable>{value}</Typography.Paragraph>
      ),
    },
    {
      title: "Kiểu khách hàng",
      dataIndex: "type",
      render: (value) => <span>{value}</span>,
    },
    {
      title: "Ngày Tạo",
      dataIndex: "created_at",
      render: (value) => <span>{value}</span>,
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      render: (value) => <Badge status="success" text="Hoạt động" />,
    },
    {
      title: "Thao Tác",
      render: (customer: CustomerType) => (
        <Space>
          <Tooltip title="Chỉnh sửa">
            <Button
              size="small"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => onClickOpenEditCustomer(customer)}
            />
          </Tooltip>
          <Tooltip title="Tạm khóa">
            <Button
              size="small"
              shape="circle"
              icon={<LockOutlined />}
              onClick={() => onClickConfirmBlockCustomer(customer._id)}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              size="small"
              shape="circle"
              icon={<DeleteOutlined />}
              danger
              onClick={() => onClickConfirmDeleteCustomer(customer._id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Table
      size="small"
      columns={columns}
      dataSource={customerState.customers.get()}
    />
  );
};

export default CustomerTable;
