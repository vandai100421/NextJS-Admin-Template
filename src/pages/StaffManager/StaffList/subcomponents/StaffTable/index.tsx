import { DeleteOutlined, EditOutlined, LockOutlined } from "@ant-design/icons";
import { useHookstate } from "@hookstate/core";
import { Badge, Button, Space, Table, Tag, Tooltip, Typography } from "antd";
import { ColumnsType } from "antd/lib/table";
import { Role } from "constants/types/role.type";
import { Staff } from "constants/types/staff.type";
import staffStore from "pages/StaffManager/store";
import { FC } from "react";

type Props = {
  onClickEditStaff: (staff: Staff) => void;
  onClickConfirmDeleteStaff: (id: string) => void;
  onClickConfirmBlockStaff: (id: string) => void;
};

const StaffTable: FC<Props> = ({
  onClickConfirmBlockStaff,
  onClickEditStaff,
  onClickConfirmDeleteStaff,
}) => {
  const staffState = useHookstate(staffStore);

  const columns: ColumnsType<any> = [
    {
      title: "ID Nhân Viên",
      dataIndex: "_id",
      render: (value) => (
        <Typography.Paragraph copyable>{value}</Typography.Paragraph>
      ),
    },
    {
      title: "Tên Nhân Viên",
      render: (staff: Staff) => (
        <span>{[staff.first_name, staff.last_name].join(" ")}</span>
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
      title: "Thuộc nhóm",
      dataIndex: "roles",
      render: (roles: Array<Role>) => (
        <>
          <Space direction="vertical">
            {roles.map((role) => (
              <Tag key={role._id}>{role.description}</Tag>
            ))}
          </Space>
        </>
      ),
    },
    {
      title: "Ngày Tạo",
      dataIndex: "created_at",
      render: (value) => {
        return <span>{value}</span>;
      },
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      render: (value) => <Badge status="success" text={value} />,
    },
    {
      title: "Thao Tác",
      render: (_, staff: Staff) => (
        <Space>
          <Tooltip title="Chỉnh sửa">
            <Button
              size="small"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => onClickEditStaff(staff)}
            />
          </Tooltip>
          <Tooltip title="Tạm khóa">
            <Button
              size="small"
              shape="circle"
              icon={<LockOutlined />}
              onClick={() => onClickConfirmBlockStaff(staff._id)}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              size="small"
              shape="circle"
              icon={<DeleteOutlined />}
              danger
              onClick={() => onClickConfirmDeleteStaff(staff._id)}
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
      dataSource={staffState.staffs.get()}
    />
  );
};

export default StaffTable;
