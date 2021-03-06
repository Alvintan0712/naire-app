import { useState } from 'react';

const aMap = {};
const viewMap = {};
const initialMap = {};
const beforeSaveHookMap = {};

function registerQuestionView(type, View, initial, beforeSave) {
  viewMap[type] = View;
  initialMap[type] = initial;
  beforeSaveHookMap[type] = beforeSave;
}

function useAState(q) {
  const qid = q.id;
  const [value, setValue] = useState(() => aMap[qid]);
  return [value, v => {
    if (typeof v === 'function')
      setValue(s => {
        const nv = v(s);
        aMap[qid] = nv;
        return nv;
      });
    else {
      aMap[qid] = v;
      setValue(v);
    }
  }];
}

function useAStore(q) {
  const qid = q.id;
  return [
    aMap[qid],
    v => {
      if (typeof v === 'function')
        aMap[qid] = v(aMap[qid]);
      else
        aMap[qid] = v;
    }
  ];
}

export {
  registerQuestionView,
  viewMap,
  useAState,
  useAStore,
  aMap,
  initialMap,
  beforeSaveHookMap,
};
