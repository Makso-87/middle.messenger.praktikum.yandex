const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static(`${__dirname}/../dist`));

app.get('/*', (req, res) => {
  res.sendFile('index.ts.html', { root: `${__dirname}/../dist/` });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен на http://localhost:${process.env.PORT || PORT}`);
});
