// This double quotes are intentional, otherwise MySQL syntax error
const DATETIME_FORMAT = "'%d-%m-%Y %H:%i:%S'";

module.exports = {
  dosenList: `
    SELECT 
        id_dosen as indx,
        nama_dosen,
        DATE_FORMAT(created, ${DATETIME_FORMAT}) created,
        DATE_FORMAT(modified, ${DATETIME_FORMAT}) modified
    FROM
        dosen
    `,
  adminUserList: `
    SELECT 
        lo.id_login AS indx,
        us.user_full_name,
        us.user_name,
        lo.id_group,
        DATE_FORMAT(lo.created, ${DATETIME_FORMAT}) created,
        DATE_FORMAT(lo.modified, ${DATETIME_FORMAT}) modified
    FROM
        login lo
            JOIN
                users us ON us.user_name = lo.user_name
    `,
  managerUserList: `
    SELECT 
        lo.id_login AS indx,
        us.user_full_name,
        us.user_name,
        lo.id_group,
        DATE_FORMAT(lo.created, ${DATETIME_FORMAT}) created,
        DATE_FORMAT(lo.modified, ${DATETIME_FORMAT}) modified
    FROM
        login lo
            JOIN
                users us ON us.user_name = lo.user_name
    WHERE tt.id_group != 10001
    `,
  userUserList: `
    SELECT 
        lo.id_login AS indx,
        us.user_full_name,
        us.user_name,
        lo.id_group,
        DATE_FORMAT(lo.created, ${DATETIME_FORMAT}) created,
        DATE_FORMAT(lo.modified, ${DATETIME_FORMAT}) modified
    FROM
        login lo
            JOIN
                users us ON us.user_name = lo.user_name
    WHERE tt.user_name = ?
    `,
  userDetails: `
      SELECT
          us.id_user, us.user_name, us.user_full_name, us.user_address, us.user_phone_number, ug.group_name
      FROM
          users us
              JOIN
                  login lo ON lo.user_name = us.user_name
              JOIN
                  user_group ug ON ug.id_group = lo.id_group
      WHERE
          us.user_name = ?
      `,
  adminWorkList: `
    SELECT 
        tt.id_time_table as indx,
        us.user_full_name,
        tt.user_name,
        tt.notes_one,
        tt.notes_two,
        tt.notes_three,
        ug.group_name,
        DATE_FORMAT(tt.created, ${DATETIME_FORMAT}) created,
        DATE_FORMAT(tt.modified, ${DATETIME_FORMAT}) modified
    FROM
        time_table tt
            JOIN
                users us ON us.user_name = tt.user_name
            JOIN
                user_group ug ON ug.id_group = tt.id_group
    ORDER BY tt.modified DESC, tt.created DESC
    `,
  managerWorkList: `
    SELECT 
        tt.id_time_table as indx,
        us.user_full_name,
        tt.user_name,
        tt.notes_one,
        tt.notes_two,
        tt.notes_three,
        ug.group_name,
        DATE_FORMAT(tt.created,${DATETIME_FORMAT}) created,
        DATE_FORMAT(tt.modified, ${DATETIME_FORMAT}) modified
    FROM
        time_table tt
            JOIN
                users us ON us.user_name = tt.user_name
            JOIN
                user_group ug ON ug.id_group = tt.id_group
    WHERE
        tt.id_group != 10001
    ORDER BY tt.modified DESC, tt.created DESC
    `,
  userWorkList: `
    SELECT 
        tt.id_time_table as indx,
        us.user_full_name,
        tt.user_name,
        tt.notes_one,
        tt.notes_two,
        tt.notes_three,
        ug.group_name,
        DATE_FORMAT(tt.created, ${DATETIME_FORMAT}) created,
        DATE_FORMAT(tt.modified, ${DATETIME_FORMAT}) modified
    FROM
        time_table tt
            JOIN
                users us ON us.user_name = tt.user_name
            JOIN
                user_group ug ON ug.id_group = tt.id_group
    WHERE
        tt.user_name = ?
    ORDER BY tt.modified DESC, tt.created DESC
    `
};
