import {
  DownloadOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  DatePicker,
  DatePickerProps,
  Divider,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
} from "antd";
import { staffApi } from "apis/staff";
import InputNumber from "components/InputNumber";
import styles from "pages/StaffManager/StaffList/StaffList.module.css";
import StaffTable from "pages/StaffManager/StaffList/subcomponents/StaffTable";
import { useEffect, useState } from "react";
import { handleGetStaffs } from "pages/StaffManager/store";
import ModalControlStaff from "./subcomponents/ModalControllStaff";
import {
  CreateStaffData,
  EditStaffData,
  Staff as StaffType,
} from "constants/types/staff.type";
import roleStore, { handleGetRoles } from "pages/RoleManager/store";
import { useHookstate } from "@hookstate/core";
import { useFormik } from "formik";
import moment from "moment";

const StaffList = () => {
  const roleState = useHookstate(roleStore);

  // search
  const formSearchStaff = useFormik({
    initialValues: {
      last_name: "",
      phone: "",
      status: undefined,
      start_time: "30/10/2022",
      roles: undefined,
    },
    onSubmit: (data: any) => {
      console.log(data);
    },
  });

  const handleChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    formSearchStaff.setValues({
      ...formSearchStaff.values,
      start_time: dateString,
    });
  };

  // add
  const [visibleAddStaff, setVisibleAddStaff] = useState<boolean>(false);
  const [addUserError, setAddUserError] = useState<string>();

  const handleSubmitAddStaff = async (data: CreateStaffData) => {
    try {
      await staffApi.create(data);
      handleGetStaffs();
      setVisibleAddStaff(false);
    } catch (error) {
      message.error;
    }
  };

  // start edit staff
  const [visibleEditStaff, setVisibleEditStaff] = useState<boolean>(false);
  const [editStaffError, setEditStaffError] = useState<string>();
  const [staffSelected, setStaffSelected] = useState<StaffType>();

  const handleSubmitEditUser = async (staff: EditStaffData) => {
    try {
      if (!staffSelected) return;
      await staffApi.update(staffSelected._id, staff);
      handleGetStaffs();
    } catch (err: any) {
      message.error(err);
    }
  };

  const handleOpenEditStaff = (staft?: StaffType) => {
    setVisibleEditStaff(true);
    setStaffSelected(staft);
    console.log("open Edit", staft);
  };

  // block
  const handleConfirmBlockStaff = (data?: string) => {
    console.log("Block", data);
  };

  // delete
  const handleConfirmDeleteStaff = (id?: string) => {
    console.log("delete", id);
  };

  useEffect(() => {
    handleGetStaffs();
    handleGetRoles();
  }, []);

  return (
    <>
      <ModalControlStaff
        visible={visibleAddStaff}
        onCancel={() => setVisibleAddStaff(false)}
        onSubmit={handleSubmitAddStaff}
        okText="Thêm"
        error={addUserError}
      />
      <ModalControlStaff
        visible={visibleEditStaff}
        onCancel={() => setVisibleEditStaff(false)}
        okText="Cập nhật"
        onSubmit={handleSubmitEditUser}
        hidePassword={true}
        staff={staffSelected}
      />
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>Quản lý nhân sự</Breadcrumb.Item>
        <Breadcrumb.Item>Danh sách nhân sự</Breadcrumb.Item>
      </Breadcrumb>
      <Card title="Danh sách nhân sự">
        <Form labelCol={{ span: 8 }} labelAlign="left" colon={false}>
          <Row wrap={false}>
            <Col flex="auto">
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item label="Tên Nhân Viên">
                    <Input
                      placeholder="Nhập vào"
                      name="last_name"
                      value={formSearchStaff.values.last_name}
                      onChange={formSearchStaff.handleChange}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Số Điện Thoại">
                    <InputNumber
                      value={formSearchStaff.values.phone}
                      onChange={(value) =>
                        formSearchStaff.setFieldValue("phone", value)
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Nhóm/Phòng Ban">
                    <Select
                      value={formSearchStaff.values.roles}
                      onChange={(value) =>
                        formSearchStaff.setFieldValue("roles", value)
                      }
                      placeholder="Nhóm quyền"
                    >
                      {roleState.roles.get().map((item) => (
                        <Select.Option key={item.value}>
                          {item.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Trạng Thái">
                    <Select
                      className="status"
                      value={formSearchStaff.values.status}
                      onChange={(value) =>
                        formSearchStaff.setFieldValue("status", value)
                      }
                      placeholder="Trạng thái"
                      style={{ minWidth: 200 }}
                    >
                      <Select.Option value="">Tất cả</Select.Option>
                      <Select.Option value="actived">
                        Đã kích hoạt
                      </Select.Option>
                      <Select.Option value="unactive">
                        Chưa kích hoạt
                      </Select.Option>
                      <Select.Option value="locked">Đã khóa</Select.Option>
                      <Select.Option value="deleted">Đã xóa</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Ngày Tạo">
                    <DatePicker
                      format="DD-MM-YYYY"
                      value={
                        formSearchStaff.values.start_time
                          ? moment(
                              formSearchStaff.values.start_time,
                              "DD-MM-YYYY"
                            )
                          : undefined
                      }
                      onChange={handleChangeDate}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col>
              <div className={styles.filterAction}>
                <Button
                  block
                  icon={<SearchOutlined />}
                  type="primary"
                  onClick={formSearchStaff.submitForm}
                >
                  Tìm kiếm
                </Button>
                <Button block icon={<ReloadOutlined />}>
                  Tải lại
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
        <Divider style={{ marginTop: 0 }} />
        <Row justify="space-between" className="mb-4">
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setVisibleAddStaff(true)}
            >
              Thêm mới
            </Button>
            <Button>Option</Button>
          </Space>
          <Button icon={<DownloadOutlined />}>Export</Button>
        </Row>
        <StaffTable
          onClickEditStaff={handleOpenEditStaff}
          onClickConfirmDeleteStaff={handleConfirmDeleteStaff}
          onClickConfirmBlockStaff={handleConfirmBlockStaff}
        />
      </Card>
    </>
  );
};

export default StaffList;
