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
  Divider,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
} from "antd";
import InputNumber from "components/InputNumber";
import styles from "pages/StaffManager/StaffList/StaffList.module.css";
import { useEffect, useState } from "react";
import ModalControlCustomer from "pages/CustomerManager/CustomerList/subcomponents/ModalControlCustomer";
import CustomerTable from "./subcomponents/CustomerTable";
import {
  CreateNewCustomerData,
  Customer as CustomerType,
  EditCustomerData,
} from "constants/types/customer.type";
import { customerApi } from "apis/customer";
import { handleGetCustomers } from "pages/CustomerManager/store";

const CustomerList = () => {
  const [visibleAddCustomer, setVisibleAddCustomer] = useState<boolean>(false);

  // add
  const handleSubmitAddCustomer = async (data: CreateNewCustomerData) => {
    try {
      await customerApi.create(data);
      handleGetCustomers();
      setVisibleAddCustomer(false);
    } catch (error) {
      message.error;
    }
  };

  // start edit
  const [visibleEditCustomer, setVisibleEditCustomer] =
    useState<boolean>(false);
  const [customerSelected, setCustomerfSelected] = useState<CustomerType>();

  const handleSubmitEditCustomer = async (customer: EditCustomerData) => {
    console.log("customerSelected", customerSelected);
    console.log("customer", customer);

    try {
      if (!customerSelected) return;
      await customerApi.update(customerSelected._id, customer);
      setVisibleEditCustomer(false);
      handleGetCustomers();
    } catch (err: any) {
      message.error(err);
    }
  };

  const handleOpenEditCustomer = (customer?: CustomerType) => {
    setVisibleEditCustomer(true);
    setCustomerfSelected(customer);
    console.log("open Edit", customer);
  };

  // block
  const handleConfirmBlockCustomer = (id?: string) => {
    console.log("Block", id);
  };

  // delete
  const handleConfirmDeleteCustomer = (id?: string) => {
    console.log("delete", id);
  };

  useEffect(() => {
    handleGetCustomers();
  }, []);

  return (
    <>
      <ModalControlCustomer
        visible={visibleEditCustomer}
        onSubmit={handleSubmitEditCustomer}
        onCancel={() => setVisibleEditCustomer(false)}
        okText="Cập nhật"
        hidePassword={true}
        customer={customerSelected}
      />

      <ModalControlCustomer
        visible={visibleAddCustomer}
        onSubmit={handleSubmitAddCustomer}
        onCancel={() => setVisibleAddCustomer(false)}
        okText="Thêm"
        hidePassword={false}
      />
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>Quản lý khách hàng</Breadcrumb.Item>
        <Breadcrumb.Item>Danh sách khách hàng</Breadcrumb.Item>
      </Breadcrumb>
      <Card title="Danh sách khách hàng">
        <Form labelCol={{ span: 8 }} labelAlign="left" colon={false}>
          <Row wrap={false}>
            <Col flex="auto">
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item label="Tên Khách hàng">
                    <Input placeholder="Nhập vào" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Số Điện Thoại">
                    <InputNumber value="987" onChange={console.log} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Nhóm/Phòng Ban">
                    <Select>
                      <Select.Option>All role</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Trạng Thái">
                    <Input placeholder="Nhập vào" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Ngày Tạo">
                    <Input placeholder="Nhập vào" />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col>
              <div className={styles.filterAction}>
                <Button block icon={<SearchOutlined />} type="primary">
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
              onClick={() => setVisibleAddCustomer(true)}
            >
              Thêm mới
            </Button>
            <Button>Option</Button>
          </Space>
          <Button icon={<DownloadOutlined />}>Export</Button>
        </Row>
        <CustomerTable
          onClickOpenEditCustomer={handleOpenEditCustomer}
          onClickConfirmDeleteCustomer={handleConfirmDeleteCustomer}
          onClickConfirmBlockCustomer={handleConfirmBlockCustomer}
        />
      </Card>
    </>
  );
};

export default CustomerList;
