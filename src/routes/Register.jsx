import React, { useState } from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

import AppLayout from 'layouts/AppLayout';
import api from 'api';
import { checkEmail, checkPassword, checkUsername, useField } from 'utils/fieldHook';

function Register() {
  const usernameField = useField(checkUsername);
  const emailField = useField(checkEmail);
  const passwordField = useField(checkPassword);

  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [errorPrompt, setErrorPrompt] = useState(null);

  const [loading, setLoading] = useState(false);

  const repeatedPasswordError = passwordField.value !== repeatedPassword;

  async function onSubmit() {
    let ok = usernameField.validate();
    ok = emailField.validate() && ok;
    ok = passwordField.validate() && ok;
    if (!ok || repeatedPasswordError)
      return;

    setLoading(true);
    let res;
    try {
      res = await api.register(usernameField.value, emailField.value, passwordField.value, usernameField.value);
    } catch (e) {
      return setErrorPrompt(e.toString());
    }
    if (res.code === 0)
      return window.location = '/login' + window.location.search;
    else if (res.code === api.ERR_DUPL_USERNAME)
      setErrorPrompt('该用户名已注册');
    else if (res.code === api.ERR_DUPL_EMAIL)
      setErrorPrompt('该邮箱已注册');
    else
      setErrorPrompt(res.code);
    setLoading(false);
  }

  return (
    <AppLayout>
      <Grid centered style={{height: '100vh'}} verticalAlign='middle'>
        <Grid.Column style={{maxWidth: 450}}>
          <Header as='h2' className='text-center'>
            注册
          </Header>
          <Form size='large' error={errorPrompt !== null}>
            <Segment>
              <Form.Input
                fluid icon='user' iconPosition='left' placeholder='用户名' required
                error={usernameField.renderError()}
                value={usernameField.value}
                onChange={usernameField.handler}
                maxLength={50}
              />
              <Form.Input
                fluid icon='lock' iconPosition='left' placeholder='密码' type='password' required
                {...passwordField.toProps()}
                maxLength={500}
              />
              <Form.Input
                fluid icon='lock' iconPosition='left' placeholder='确认密码' type='password' required
                error={repeatedPasswordError}
                value={repeatedPassword}
                onChange={e => setRepeatedPassword(e.target.value)}
                maxLength={500}
              />
              <Form.Input
                fluid icon='mail' iconPosition='left' placeholder='邮箱' required
                error={emailField.renderError()}
                value={emailField.value}
                onChange={emailField.handler}
                maxLength={50}
              />
              <Message error header='注册失败' content={errorPrompt} />
              <Button
                primary fluid size='large'
                onClick={onSubmit}
                loading={loading}
                disabled={loading}
              >
                注册
              </Button>
            </Segment>
          </Form>
          <Message className='text-center'>
            已经注册？ <a href='/login'>登录</a>
          </Message>
        </Grid.Column>
      </Grid>
    </AppLayout>
  );
}

export default Register;
