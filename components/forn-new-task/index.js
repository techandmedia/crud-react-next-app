import { Form, Input, Button } from "antd";
import { tailFormItemLayout, formItemLayout } from "components";

const { TextArea } = Input;

class FormNewTask extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", this.props);
        const { id_group, user_name, postData, API } = this.props;
        console.log("Received values of form: ", values);
        postData(API, {
          id_group: id_group,
          user_name: user_name,
          notes_one: values.notes_one,
          notes_two: values.notes_two,
          notes_three: values.notes_three
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const form = [
      {
        label: "Notes 1",
        field: "notes_one"
      },
      {
        label: "Notes 2",
        field: "notes_two"
      },
      {
        label: "Notes 3",
        field: "notes_three"
      }
    ];

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        {form.map(item => (
          <Form.Item label={item.label} key={item.label}>
            {getFieldDecorator(item.field, {
              initialValue: item.initialValue,
              rules: item.rules
            })(<TextArea autoSize={{ minRows: 3, maxRows: 5 }} />)}
          </Form.Item>
        ))}

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedFormNewTask = Form.create({ name: "register" })(FormNewTask);

export default WrappedFormNewTask;
