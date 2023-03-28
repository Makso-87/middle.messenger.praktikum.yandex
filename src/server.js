const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static(`${__dirname}/../dist`));

app.get('/*', (req, res) => {
  res.sendFile('index.html', { root: `${__dirname}/../dist/` });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${process.env.PORT || PORT}`);
});
