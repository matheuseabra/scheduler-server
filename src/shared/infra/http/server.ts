import 'reflect-metadata';

import api from './api';

const PORT = 9999;

api.listen(PORT, () => {
  console.log(`\u{1F530} Server started on port ${PORT}!`);
});
