import { Form, InputNumber, Button } from "antd";
import { tailFormItemLayout, formItemLayout } from "components";

class PreferenceForm extends React.Component {
  state = {};

  handleSubmit = e => {
    const { user, postData, form } = this.props;
    const username = user.detail[0].user_name;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values, user);
        postData("api/users/change-preference", {
          working_hour_per_day: values.pwh,
          username
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { defaultValue } = this.props;

    console.log(defaultValue);

    const form = [
      {
        label: "Preferred Working Hours",
        field: "pwh",
        initialValue: defaultValue,
        rules: [
          {
            required: true,
            message: "Please select your Preferred Working Hours!"
          }
        ]
      }
    ];

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        {form.map(item => {
          /**
           * For Readability, if then else
           * is better than itinerary operator
           */
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
                <InputNumber
                  min={8}
                  max={10}
                  placeholder={item.placeholder}
                  onBlur={item.handleConfirmBlur}
                  addonBefore={item.addonBefore}
                  style={item.style}
                />
              )}
            </Form.Item>
          );
        })}

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedPreferenceForm = Form.create({ name: "register" })(PreferenceForm);

export default WrappedPreferenceForm;
