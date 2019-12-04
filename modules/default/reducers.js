export default function dataReducer(state, action) {
  console.log("TEST", state);
  console.log("TEST", action);
  const { type, user, data } = action;

  switch (type) {
    case "init":
      const API_FOR_NEW_TASK = "api/task/new-task";
      const API_FOR_UPDATE_TASK = "api/users/update-task";
      const API_TO_DELETE_TASK = "api/users/delete-task";
      const API_FOR_ALL_TASKS = "api/users/tasks";
      const profile = user.detail[0];
      const isAdmin = profile.group_name === "admin" ? true : false;
      const id_group =
        profile.group_name === "admin"
          ? 10001
          : profile.group_name === "manager"
          ? 10005
          : 10010;
      const user_name = profile.user_name;
      const preffered_working_hours =
        user.preferredWorkingHour * 60 * 60 * 1000;

      const columns = [
        {
          title: "Full Name",
          dataIndex: "user_full_name",
          key: "user_full_name",
          editable: isAdmin,
          width: 200,
          fixed: "left"
        },
        {
          title: "User Name",
          dataIndex: "user_name",
          key: "user_name",
          width: 200,
          editable: isAdmin
        },
        {
          title: "Notes 1",
          dataIndex: "notes_one",
          key: "notes_one",
          width: 200,
          editable: true
        },
        {
          title: "Notes 2",
          dataIndex: "notes_two",
          key: "notes_two",
          width: 200,
          editable: true
        },
        {
          title: "Notes 3",
          dataIndex: "notes_three",
          key: "notes_three",
          width: 200,
          editable: true
        },
        {
          title: "Grup",
          dataIndex: "group_name",
          key: "group_name",
          width: 100,
          editable: isAdmin
        },
        {
          title: "Date",
          children: [
            {
              title: "Created",
              dataIndex: "created",
              key: "created",
              width: 100
            },
            {
              title: "Modified",
              dataIndex: "modified",
              key: "modified",
              width: 100
            }
          ]
        }
      ];

      return {
        ...state,
        profile,
        isAdmin,
        id_group,
        user_name,
        preffered_working_hours,
        isLoading: true,
        data: [],
        API_FOR_ALL_TASKS,
        API_FOR_NEW_TASK,
        API_FOR_UPDATE_TASK,
        API_TO_DELETE_TASK,
        columns
      };

    case "fetch":
      let temp = [];
      data.data.map(item => {
        const created = new Date(item.created);
        const modified = new Date(item.modified);
        const result =
          (modified.getTime() - created.getTime()) * 60 * 60 * 1000;
        temp.push({
          ...item,
          isUnderWorkingHour:
            result >= state.preffered_working_hours ? true : false
        });
      });

      return {
        ...state,
        data: temp,
        isLoading: false
      };
    default:
      throw new Error();
  }
}
