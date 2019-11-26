import { Table, Input, InputNumber, Popconfirm, Form } from "antd";

const EditableContext = React.createContext();

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === "number") {
      return <InputNumber />;
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`
                }
              ],
              initialValue: record[dataIndex]
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return (
      <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
    );
  }
}

/**
 * For this to work, make sure you have unique key in your data
 * Since I don't have key column, and I can't alias a column table name to "key"
 * MySQL won't let me, instead I alias it with indx
 * And, you pass it through a rowKey props as indx
 * 
 * Find item.key or record.key and replace it with item.indx or record.indx
 */

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: props.dataSource, editingKey: "" };
    this.columns = [
      ...this.props.columns,
      {
        title: "operation",
        dataIndex: "operation",
        width: 100,
        fixed: "right",
        render: (text, record) => {
          console.log
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    onClick={() => this.save(form, record.indx)}
                    style={{ marginRight: 8 }}
                  >
                    Save
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm
                title="Sure to cancel?"
                onConfirm={() => this.cancel(record.indx)}
              >
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <a
              disabled={editingKey !== ""}
              onClick={() => this.edit(record.indx)}
            >
              Edit
            </a>
          );
        }
      }
    ];
  }

  isEditing = record => record.indx === this.state.editingKey;
  // isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: "" });
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.indx);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row
        });
        this.setState({ data: newData, editingKey: "" });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: "" });
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }
  
  render() {
    console.log("render render", this.isEditing);
    const components = {
      body: {
        cell: EditableCell
      }
    };

    const columns = this.columns.map(col => {
      const inputType = [
        {
          key: "notes_one",
          type: "text"
        },
        {
          key: "notes_two",
          type: "text"
        },
        {
          key: "notes_three",
          type: "text"
        }
      ];
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          // col.dataIndex === inputType.filter(item => item.key && item.type),
          inputType: col.dataIndex === "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })
      };
    });

    // console.log("render render", this.props);

    return (
      <EditableContext.Provider value={this.props.form}>
        <Table
          components={components}
          bordered
          dataSource={this.state.data}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            onChange: this.cancel
          }}
          size={this.props.size}
          scroll={this.props.scroll}
          rowKey={this.props.rowKey}
        />
      </EditableContext.Provider>
    );
  }
}

const EditableFormTable = Form.create()(EditableTable);

export default EditableFormTable;
