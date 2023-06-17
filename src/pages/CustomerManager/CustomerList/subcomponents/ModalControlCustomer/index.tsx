import { Modal, Form, Input, Select } from "antd";
import { Customer as CustomerType } from "constants/types/customer.type";
import { useFormik } from "formik";
import { FC, useEffect } from "react";
import {
  isValidUserName,
  isValidEmail,
  isValidPhoneNumber,
} from "utils/validate";
import * as Yup from "yup";

type Props = {
  visible: boolean;
  onSubmit: (data: any) => void;
  okText: string;
  onCancel: () => void;
  hidePassword: boolean;
  customer?: CustomerType;
};

const schema: any = {};

const CUSTOMER_TYPES = ["individual", "organization"];
const NAME_CUSTOMER_TYPES = ["Khách hàng cá nhân", "Khách hàng tổ chức"];

const CUSTOMER_GROUPS = ["potential", "used", "using", "blacklist"];
const NAME_CUSTOMER_GROUPS = [
  "Khách hàng tiềm năng",
  "Khách hàng đã sử dụng dịch vụ",
  "Khách hàng đang sử dụng dịch vụ",
  "Blacklist",
];

const schemaControlCustomer = Yup.object().shape({
  first_name: Yup.string().required("Họ khách hàng không được để trống."),
  last_name: Yup.string().required("Tên khách hàng không được để trống."),
  username: Yup.string()
    .required("Tên đăng nhập không được để trống.")
    .test("validateUsername", "Tên đăng nhập không hợp lệ.", (username) => {
      if (username) {
        return isValidUserName(username);
      }
      return false;
    }),
  email: Yup.string().test(
    "validateEmail",
    "Địa chỉ email không hợp lệ.",
    (email) => {
      if (email) {
        return isValidEmail(email);
      }
      return false;
    }
  ),
  phone: Yup.string().test(
    "validatePhoneNumber",
    "Số điện thoại không hợp lệ.",
    (phone) => {
      if (phone) {
        return isValidPhoneNumber(phone);
      }
      return false;
    }
  ),
  type: Yup.string().required("Loại khách hàng không được để trống."),
  customer_group: Yup.string().required("Nhóm khách hàng không được để trống."),
  tax_code: Yup.string().required("Mã số thuế không được để trống."),
  ...schema,
});

const ModalControlCustomer: FC<Props> = ({
  visible,
  okText,
  onSubmit,
  onCancel,
  hidePassword,
  customer,
}) => {
  const formControlCustomer = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      phone: "",
      type: "",
      customer_group: "",
      tax_code: "",
      user_created: "",
    },
    validationSchema: schemaControlCustomer,
    onSubmit: (data) => {
      onSubmit(data);
    },
  });

  useEffect(() => {
    if (visible && customer) {
      const {
        first_name,
        last_name,
        username,
        email,
        phone,
        type,
        customer_group,
        tax_code,
        user_created,
      } = customer;
      formControlCustomer.setValues({
        first_name,
        last_name,
        username,
        email,
        phone,
        type,
        customer_group,
        tax_code,
        user_created,
      });
    }
  }, [customer, visible]);

  console.log(formControlCustomer.errors);

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      okText={okText}
      onOk={formControlCustomer.submitForm}
      confirmLoading={formControlCustomer.isSubmitting}
    >
      <Form layout="vertical">
        <Form.Item label="Tên khách hàng" style={{ marginBottom: 0 }}>
          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(50% - 4px)",
              marginRight: "4px",
            }}
            validateStatus={
              formControlCustomer.errors.first_name &&
              formControlCustomer.touched.first_name
                ? "error"
                : ""
            }
            help={
              formControlCustomer.errors.first_name &&
              formControlCustomer.touched.first_name
                ? formControlCustomer.errors.first_name
                : null
            }
          >
            <Input
              placeholder="Họ"
              name="first_name"
              value={formControlCustomer.values.first_name}
              onChange={formControlCustomer.handleChange}
            />
          </Form.Item>
          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(50% - 4px)",
              marginLeft: "4px",
            }}
            validateStatus={
              formControlCustomer.errors.last_name &&
              formControlCustomer.touched.last_name
                ? "error"
                : ""
            }
            help={
              formControlCustomer.errors.last_name &&
              formControlCustomer.touched.last_name
                ? formControlCustomer.errors.last_name
                : null
            }
          >
            <Input
              placeholder="Tên"
              name="last_name"
              value={formControlCustomer.values.last_name}
              onChange={formControlCustomer.handleChange}
            />
          </Form.Item>
        </Form.Item>
        <Form.Item
          label="Tên đăng nhập"
          validateStatus={
            formControlCustomer.errors.username &&
            formControlCustomer.touched.username
              ? "error"
              : ""
          }
          help={
            formControlCustomer.errors.username &&
            formControlCustomer.touched.username
              ? formControlCustomer.errors.username
              : null
          }
        >
          <Input
            type="username"
            placeholder="Nhập vào"
            name="username"
            value={formControlCustomer.values.username}
            onChange={formControlCustomer.handleChange}
          />
        </Form.Item>
        <Form.Item
          label="Địa chỉ email"
          validateStatus={
            formControlCustomer.errors.email &&
            formControlCustomer.touched.email
              ? "error"
              : ""
          }
          help={
            formControlCustomer.errors.email &&
            formControlCustomer.touched.email
              ? formControlCustomer.errors.email
              : null
          }
        >
          <Input
            type="email"
            placeholder="VD: example@gmail.com"
            name="email"
            value={formControlCustomer.values.email}
            onChange={formControlCustomer.handleChange}
          />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          validateStatus={
            formControlCustomer.errors.phone &&
            formControlCustomer.touched.phone
              ? "error"
              : ""
          }
          help={
            formControlCustomer.errors.phone &&
            formControlCustomer.touched.phone
              ? formControlCustomer.errors.phone
              : null
          }
        >
          <Input
            placeholder="VD: 0334455667"
            name="phone"
            value={formControlCustomer.values.phone}
            onChange={formControlCustomer.handleChange}
          />
        </Form.Item>
        <Form.Item
          label="Ngành nghề"
          validateStatus={
            formControlCustomer.errors.phone &&
            formControlCustomer.touched.phone
              ? "error"
              : ""
          }
          help={
            formControlCustomer.errors.phone &&
            formControlCustomer.touched.phone
              ? formControlCustomer.errors.phone
              : null
          }
        >
          <Input
            placeholder="VD: 0334455667"
            name="phone"
            value={formControlCustomer.values.phone}
            onChange={formControlCustomer.handleChange}
          />
        </Form.Item>
        <Form.Item
          label="Loại khách hàng"
          validateStatus={
            formControlCustomer.errors.type && formControlCustomer.touched.type
              ? "error"
              : ""
          }
          help={
            formControlCustomer.errors.type && formControlCustomer.touched.type
              ? formControlCustomer.errors.type
              : null
          }
        >
          <Select
            placeholder="Chọn loại khách hàng"
            value={formControlCustomer.values.type}
            onChange={(value) =>
              formControlCustomer.setFieldValue("type", value)
            }
          >
            <Select.Option value={CUSTOMER_TYPES[0]}>
              {NAME_CUSTOMER_TYPES[0]}
            </Select.Option>
            <Select.Option value={CUSTOMER_TYPES[1]}>
              {NAME_CUSTOMER_TYPES[1]}
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Nhóm khách hàng"
          validateStatus={
            formControlCustomer.errors.customer_group &&
            formControlCustomer.touched.customer_group
              ? "error"
              : ""
          }
          help={
            formControlCustomer.errors.customer_group &&
            formControlCustomer.touched.customer_group
              ? formControlCustomer.errors.customer_group
              : null
          }
        >
          <Select
            placeholder="Chọn nhóm khách hàng"
            value={formControlCustomer.values.customer_group}
            onChange={(value) =>
              formControlCustomer.setFieldValue("customer_group", value)
            }
          >
            <Select.Option value={CUSTOMER_GROUPS[0]}>
              {NAME_CUSTOMER_GROUPS[0]}
            </Select.Option>
            <Select.Option value={CUSTOMER_GROUPS[1]}>
              {NAME_CUSTOMER_GROUPS[1]}
            </Select.Option>
            <Select.Option value={CUSTOMER_GROUPS[2]}>
              {NAME_CUSTOMER_GROUPS[2]}
            </Select.Option>
            <Select.Option value={CUSTOMER_GROUPS[3]}>
              {NAME_CUSTOMER_GROUPS[3]}
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Mã số thuế"
          validateStatus={
            formControlCustomer.errors.tax_code &&
            formControlCustomer.touched.tax_code
              ? "error"
              : ""
          }
          help={
            formControlCustomer.errors.tax_code &&
            formControlCustomer.touched.tax_code
              ? formControlCustomer.errors.tax_code
              : null
          }
        >
          <Input
            placeholder="VD: 0334455667"
            name="tax_code"
            value={formControlCustomer.values.tax_code}
            onChange={formControlCustomer.handleChange}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalControlCustomer;
