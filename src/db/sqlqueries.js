const updateByID = `
    UPDATE pernimagesaver
    SET description= $1, comment= $2, rating= $3, imageurl= $4, photographer= $5
    WHERE _id = $6
`

const insertEntry = `
    INSERT INTO pernimagesaver
    (description, comment, rating, imageurl, photographer, _id)
    VALUES
    ($1, $2, $3, $4, $5, $6)
`

const deleteByID = `
    DELETE FROM pernimagesaver
    WHERE _id = $1
`

const selectByID = `SELECT * FROM pernimagesaver WHERE _id = $1`

const selectAll = `SELECT * FROM pernimagesaver`

module.exports = {
    updateByID,
    selectByID,
    selectAll,
    insertEntry,
    deleteByID
}

// END of document
