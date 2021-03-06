function redirect_login() {
  window.location = '/login?r=' + encodeURIComponent(
    window.location.pathname + window.location.search
  );
}

function get_invite_url(token) {
  return '/o/' + token;
}

function with_origin(path) {
  return window.location.origin + path;
}

function get_query_param(key) {
  const qs = window.location.search;
  if (qs.startsWith('?' + key + '='))
    return decodeURIComponent(qs.slice(key.length + 2));
  else
    return null;
}

export { redirect_login, get_invite_url, with_origin, get_query_param };
