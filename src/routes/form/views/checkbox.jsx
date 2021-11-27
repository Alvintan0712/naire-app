import React from 'react';
import { Form } from 'semantic-ui-react';

import { registerQuestionView, useAState } from './base';
import { QLabel } from './utils';

function CheckboxView(props) {
  const q = props.question;
  const [selectedOids, setSelectedOids] = useAState(q);
  const {min_choices, max_choices} = q;

  const [error, setError] = props.useErrorState(() => min_choices > 0);

  function addOid(oid) {
    setSelectedOids(a => {
      console.log('adding', oid, 'to', a);
      if (a.includes(oid))
        return;
      a.push(oid);
      console.log(a);
      setError(a.length > max_choices || a.length < min_choices);
      return a;
    });
  }

  function removeOid(oid) {
    setSelectedOids(o => {
      console.log('rming', oid, 'from', o);
      const a = o.filter(x => x !== oid);
      console.log(a);
      setError(a.length > max_choices || a.length < min_choices);
      return a;
    });
  }

  return <Form>
    {
      q.options.map(o => (
        <Form.Checkbox
          key={o.id}
          label={o.text}
          error={props.tried && error}
          onChange={(_, d) => (d.checked ? addOid(o.id) : removeOid(o.id))}
        />
      ))
    }
    {min_choices !== 0 && <QLabel
      text={`至少选择 ${min_choices} 项`}
      error={selectedOids.length < min_choices}
    />}
    {max_choices !== q.options.length && <QLabel
      text={`最多选择 ${max_choices} 项`}
      error={selectedOids.length > max_choices}
    />}
  </Form>;
}

registerQuestionView('checkbox', CheckboxView, () => []);
