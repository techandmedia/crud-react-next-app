import { Form, Input, Select, Row, Col, Button } from "antd";

const { Option } = Select;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
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

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
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
        label: "E-Mail",
        field: "username",
        placeholder: "Email will be your user name",
        rules: [
          {
            type: "email",
            message: "The input is not valid E-mail!"
          },
          {
            required: true,
            message: "Please input your E-mail!"
          }
        ]
      },
      {
        label: "Full Name",
        field: "fullname",
        rules: [
          {
            required: true,
            message: "Please input your Full Name!"
          }
        ]
      },
      {
        label: "Password",
        field: "password",
        hasFeedback: true,
        rules: [
          {
            required: true,
            message: "Please input your password!"
          },
          {
            validator: this.validateToNextPassword
          }
        ]
      },
      {
        label: "Confirm Password",
        field: "confirm",
        hasFeedback: true,
        handleConfirmBlur: this.handleConfirmBlur,
        rules: [
          {
            required: true,
            message: "Please confirm your password!"
          },
          {
            validator: this.compareToFirstPassword
          }
        ]
      },
      {
        label: "Address",
        field: "address"
      },
      {
        label: "Phone Number",
        field: "phone",
        addonBefore: prefixSelector,
        style: { width: "100%" }
      }
    ];

    return (
      <Row type="flex" justify="center" style={{ paddingRight: 50 }}>
        <Col>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            {form.map(item => (
              <Form.Item
                label={item.label}
                key={item.label}
                hasFeedback={item.hasFeedback}
              >
                {getFieldDecorator(item.field, {
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
            ))}

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: "register" })(
  RegistrationForm
);

export default WrappedRegistrationForm;
