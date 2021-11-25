import React, { useState } from 'react';
import { Container, Form, Grid, Icon, Menu, Message } from 'semantic-ui-react';

import api from "../api";
import appState from '../appState';
import AppLayout from 'layouts/AppLayout';

function useField(checker) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(undefined);
  return {
    value,
    error,
    handler(e) {
      const v = e.target.value;
      setValue(v);
      setError(checker(v));
    },
    validate() {
      if (error === undefined) {
        setError(checker(value));
        return false;
      }
      return error === null;
    },
    renderError() {
      if (error === null || error === undefined)
        return null;
      if (!error)
        return true;
      return {
        'content': error,
        'position': 'bottom'
      };
    }
  };
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function checkEmail(v) {
  if (!v)
    return '';
  if (!validateEmail(v))
    return '邮箱地址格式错误';
  if (v.length > 250)
    return '邮箱地址最多包含 250 个字符';
  return null;
}

function checkDName(v) {
  if (!v)
    return '';
  return null;
}

function Profile() {
  const currentInfo = appState.user_info;

  const dnameField = useField(checkDName);
  const emailField = useField(checkEmail);

  const [errorPrompt, setErrorPrompt] = useState(null);

  async function onSubmit() {
    let ok = emailField.validate();
    if (!ok)
      return;
    let res;
    try {
      res = await api.edit_profile(dnameField.value, emailField.value);
    } catch (e) {
      return setErrorPrompt(e.toString());
    }
    if (res.code === 0)
      window.location = '/profile';
    else if (res.code === api.ERR_DUPL_EMAIL)
      setErrorPrompt('该邮箱已注册')
    else
      setErrorPrompt(res.code)
  }

  return (
    <AppLayout>
      <Container text style={{marginTop : '7em'}}>
        <Grid>
          <Grid.Column width={6}>
            <Menu secondary vertical>
              <Menu.Item active={true} href='../profile'>
                <Icon name='user' />
                个人信息
              </Menu.Item>
              <Menu.Item href='../password'>
                <Icon name='lock' />
                密码管理
              </Menu.Item>
            </Menu>
          </Grid.Column>

          <Grid.Column width={10}>
            <Form>
              <Form.Field
                label={'用户名'}
              />
              <Message>
                <p>{currentInfo.username}</p>
              </Message>
              <Form.Input
                label={'显示名称'}
                placeholder={currentInfo.dname}
              />
              <Form.Input
                label={'邮箱'}
                placeholder={currentInfo.email}
              />
              <Message error header ='修改失败' content={errorPrompt} />
              <Form.Button
                fluid
                onClick={onSubmit}
              >
                提交修改
              </Form.Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Container>
    </AppLayout>
  );
}

export default Profile;
