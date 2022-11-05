// import { doTask } from '@leon/my-lib';
// import { hello } from './tool';

// import L from 'lib2/Util';

import('lib2/Util').then(m => {
  // console.log(`module:`, m.default);
  // m();
  m.default();
})

window.onload = function () {
  // doTask();
  // console.log(`lib2:`, L);
}