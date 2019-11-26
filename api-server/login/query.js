module.exports = {
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
        DATE_FORMAT(tt.created, '%d-%m-%Y') created,
        DATE_FORMAT(tt.modified, '%d-%m-%Y') modified
    FROM
        time_table tt
            JOIN
                users us ON us.user_name = tt.user_name
            JOIN
                user_group ug ON ug.id_group = tt.id_group
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
        DATE_FORMAT(tt.created, '%d-%m-%Y') created,
        DATE_FORMAT(tt.modified, '%d-%m-%Y') modified
    FROM
        time_table tt
            JOIN
                users us ON us.user_name = tt.user_name
            JOIN
                user_group ug ON ug.id_group = tt.id_group
    WHERE
        tt.id_group != 10001
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
        DATE_FORMAT(tt.created, '%d-%m-%Y') created,
        DATE_FORMAT(tt.modified, '%d-%m-%Y') modified
    FROM
        time_table tt
            JOIN
                users us ON us.user_name = tt.user_name
            JOIN
                user_group ug ON ug.id_group = tt.id_group
    WHERE
        tt.user_name = ?
    `
};
