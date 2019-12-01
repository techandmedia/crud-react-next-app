import { Form, Input, Select, Button, Checkbox } from "antd";
import { tailFormItemLayout, formItemLayout } from "components";

const { Option } = Select;

class FormDosen extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.postData("api/dosen/tambah", {
          id_dosen: values.id_dosen,
          fullname: values.fullname,
        });
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { defaultValue, profile, login } = this.props;

    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "62"
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    const form = [
      {
        label: "ID Dosen",
        field: "id_dosen",
        placeholder: "ID Dosen",
        initialValue: profile ? defaultValue.user_name : "",
        rules: [
          {
            required: true,
            message: "Harap masukkan ID Dosen!"
          }
        ]
      },
      {
        label: "Nama Lengkap Dosen",
        field: "fullname",
        initialValue: profile ? defaultValue.user_full_name : "",
        rules: [
          {
            required: true,
            message: "Harap Masukkan Nama Lengkap Dosen!"
          }
        ]
      }
      // {
      //   label: "Password",
      //   field: "password",
      //   hasFeedback: true,
      //   rules: [
      //     {
      //       required: true,
      //       message: "Please input your password!"
      //     },
      //     {
      //       validator: this.validateToNextPassword
      //     }
      //   ]
      // },
      // {
      //   label: "Confirm Password",
      //   field: "confirm",
      //   hasFeedback: true,
      //   handleConfirmBlur: this.handleConfirmBlur,
      //   rules: [
      //     {
      //       required: true,
      //       message: "Please confirm your password!"
      //     },
      //     {
      //       validator: this.compareToFirstPassword
      //     }
      //   ]
      // },
      // {
      //   label: "Address",
      //   field: "address",
      //   initialValue: profile ? defaultValue.user_address : ""
      // },
      // {
      //   label: "Phone Number",
      //   field: "phone",
      //   addonBefore: prefixSelector,
      //   initialValue: profile ? defaultValue.user_phone_number : "",
      //   style: { width: "100%" }
      // }
    ];

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        {form.map(item => {
          /**
           * For Readability, if then else
           * is better than itinerary operator
           */
          if (
            profile &&
            (item.field === "password" || item.field === "confirm")
          ) {
            return null;
          } else {
            return (
              <Form.Item
                label={item.label}
                key={item.label}
                hasFeedback={item.hasFeedback}
              >
                {getFieldDecorator(item.field, {
                  initialValue: item.initialValue,
                  rules: item.rules
                })(
                  <Input
                    placeholder={item.placeholder}
                    onBlur={item.handleConfirmBlur}
                    addonBefore={item.addonBefore}
                    style={item.style}
                  />
                )}
              </Form.Item>
            );
          }
        })}

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            {profile ? "Save" : "Simpan"}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const FormTambahDosen = Form.create({ name: "register" })(FormDosen);

export default FormTambahDosen;
