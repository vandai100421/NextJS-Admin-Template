import { CopyOutlined } from "@ant-design/icons";
import { useHookstate } from "@hookstate/core";
import { Alert, Checkbox, Form, Input, message, Modal, Select } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { Staff } from "constants/types/staff.type";
import { useFormik } from "formik";
import roleStore from "pages/RoleManager/store";
import { FC, useEffect, useState } from "react";
import { generatePassword } from "utils/generatePassword";
import {
  isValidEmail,
  isValidPassword,
  isValidPhoneNumber,
  isValidUserName,
} from "utils/validate";
import * as Yup from "yup";

type FormControlValue = {
  first_name: string;
  last_name: string;
  username: string;
  password?: string;
  email: string;
  phone: string;
  roles: Array<string>;
};

type Props = {
  visible?: boolean;
  onCancel: () => void;
  staff?: Staff;
  onSubmit: (data: any) => void;
  okText: string;
  error?: string;
  hidePassword?: boolean;
};

const ModalControlStaff: FC<Props> = ({
  visible,
  onCancel,
  onSubmit,
  staff,
  okText,
  error,
  hidePassword,
}) => {
  const roleState = useHookstate(roleStore);
  const [isRandomPassword, setIsRandomPassword] = useState<boolean>(false);

  const initialValues: FormControlValue = {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone: "",
    roles: [],
  };

  const schema: any = {};

  if (!hidePassword) {
    schema.password = Yup.string().test(
      "validatePassword",
      "Mật khẩu không hợp lệ.",
      (password) => {
        if (password) {
          return isValidPassword(password);
        }
        return false;
      }
    );
    initialValues.password = "";
  }

  const formControlStaffSchema = Yup.object().shape({
    first_name: Yup.string().required("Họ người dùng không được để trống."),
    last_name: Yup.string().required("Tên người dùng không được để trống."),
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
    // roles: Yup.array().min(1, "Nhóm người dùng không được để trống."),
    ...schema,
  });

  const formControlStaff = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      username: "",
      password: "",
      email: "",
      phone: "",
      roles: [] as Array<string>,
    },
    validationSchema: formControlStaffSchema,
    onSubmit: (data) => {
      onSubmit(data);
    },
  });

  useEffect(() => {
    if (visible && staff) {
      const { first_name, last_name, username, email, phone } = staff;
      formControlStaff.setValues({
        first_name,
        last_name,
        username,
        email,
        phone,
        password: "",
        roles: [],
      });
    }
  }, [staff, visible]);

  const handleRandomPassword = (evt: CheckboxChangeEvent) => {
    const { checked } = evt.target;
    setIsRandomPassword(checked);
    if (checked) {
      const randomPassword = generatePassword();
      formControlStaff.setFieldValue("password", randomPassword);
    } else {
      formControlStaff.setFieldValue("password", "");
    }
  };

  const handleCopyPasswordToClipboard = () => {
    navigator.clipboard.writeText(formControlStaff.values.password);
    message.success("Đã sao chép mật khẩu.");
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      okText={okText}
      onOk={formControlStaff.submitForm}
      confirmLoading={formControlStaff.isSubmitting}
    >
      {error && (
        <Alert message={error} type="error" style={{ marginBottom: 16 }} />
      )}
      <Form layout="vertical">
        <Form.Item label="Tên người dùng" style={{ marginBottom: 0 }}>
          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(50% - 4px)",
              marginRight: "4px",
            }}
            validateStatus={
              formControlStaff.errors.first_name &&
              formControlStaff.touched.first_name
                ? "error"
                : ""
            }
            help={
              formControlStaff.errors.first_name &&
              formControlStaff.touched.first_name
                ? formControlStaff.errors.first_name
                : null
            }
          >
            <Input
              placeholder="Họ"
              name="first_name"
              value={formControlStaff.values.first_name}
              onChange={formControlStaff.handleChange}
            />
          </Form.Item>
          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(50% - 4px)",
              marginLeft: "4px",
            }}
            validateStatus={
              formControlStaff.errors.last_name &&
              formControlStaff.touched.last_name
                ? "error"
                : ""
            }
            help={
              formControlStaff.errors.last_name &&
              formControlStaff.touched.last_name
                ? formControlStaff.errors.last_name
                : null
            }
          >
            <Input
              placeholder="Tên"
              name="last_name"
              value={formControlStaff.values.last_name}
              onChange={formControlStaff.handleChange}
            />
          </Form.Item>
        </Form.Item>
        <Form.Item
          label="Tên đăng nhập"
          validateStatus={
            formControlStaff.errors.username &&
            formControlStaff.touched.username
              ? "error"
              : ""
          }
          help={
            formControlStaff.errors.username &&
            formControlStaff.touched.username
              ? formControlStaff.errors.username
              : null
          }
        >
          <Input
            type="username"
            placeholder="Nhập vào"
            name="username"
            value={formControlStaff.values.username}
            onChange={formControlStaff.handleChange}
          />
        </Form.Item>
        {!hidePassword && (
          <Form.Item label="Mật khẩu" style={{ marginBottom: 0 }}>
            <Form.Item
              style={{
                display: "inline-block",
                width: "calc(50% - 4px)",
                marginRight: "4px",
              }}
              validateStatus={
                formControlStaff.errors.password &&
                formControlStaff.touched.password
                  ? "error"
                  : ""
              }
              help={
                formControlStaff.errors.password &&
                formControlStaff.touched.password
                  ? formControlStaff.errors.password
                  : null
              }
            >
              <Input
                placeholder="Nhập vào"
                type="password"
                name="password"
                value={formControlStaff.values.password}
                onChange={formControlStaff.handleChange}
                addonAfter={
                  <CopyOutlined
                    style={{ cursor: "pointer" }}
                    onClick={handleCopyPasswordToClipboard}
                  />
                }
              />
            </Form.Item>
            <Form.Item
              style={{
                display: "inline-block",
                width: "calc(50% - 4px)",
                marginLeft: "4px",
              }}
            >
              <Checkbox
                checked={isRandomPassword}
                onChange={handleRandomPassword}
              >
                Mật khẩu ngẫu nhiên
              </Checkbox>
            </Form.Item>
          </Form.Item>
        )}
        <Form.Item
          label="Địa chỉ email"
          validateStatus={
            formControlStaff.errors.email && formControlStaff.touched.email
              ? "error"
              : ""
          }
          help={
            formControlStaff.errors.email && formControlStaff.touched.email
              ? formControlStaff.errors.email
              : null
          }
        >
          <Input
            type="email"
            placeholder="VD: example@gmail.com"
            name="email"
            value={formControlStaff.values.email}
            onChange={formControlStaff.handleChange}
          />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          validateStatus={
            formControlStaff.errors.phone && formControlStaff.touched.phone
              ? "error"
              : ""
          }
          help={
            formControlStaff.errors.phone && formControlStaff.touched.phone
              ? formControlStaff.errors.phone
              : null
          }
        >
          <Input
            placeholder="VD: 0334455667"
            name="phone"
            value={formControlStaff.values.phone}
            onChange={formControlStaff.handleChange}
          />
        </Form.Item>
        <Form.Item
          label="Nhóm người dùng"
          validateStatus={
            formControlStaff.errors.roles && formControlStaff.touched.roles
              ? "error"
              : ""
          }
          help={
            formControlStaff.errors.roles && formControlStaff.touched.roles
              ? formControlStaff.errors.roles
              : null
          }
        >
          <Select
            mode="multiple"
            value={formControlStaff.values.roles}
            onChange={(value) => formControlStaff.setFieldValue("roles", value)}
            placeholder="Chọn nhóm người dùng"
          >
            {roleState.roles.get().map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalControlStaff;
