const fs = require('fs');

export const writeFile = (file, data, res) => {
    fs.writeFile(file, JSON.stringify(data, null, 4), function (err) {
        if (err) console.error(err);
        res.json('success');
    });
};
