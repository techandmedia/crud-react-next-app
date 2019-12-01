module.exports = {
  dosenList: `
    SELECT 
        id_dosen as indx,
        nama_dosen,
        DATE_FORMAT(created, '%d-%m-%Y') created,
        DATE_FORMAT(modified, '%d-%m-%Y') modified
    FROM
        dosen
    `
};
