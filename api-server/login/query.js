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
        us.user_name = ?`
};
