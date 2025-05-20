/**
 * Implementação do módulo querystring para o browser
 */

const querystring = {
  parse: function (str) {
    if (!str) return {};
    return str.split('&').reduce((params, param) => {
      const [key, value] = param.split('=');
      params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
      return params;
    }, {});
  },
  stringify: function (obj) {
    return Object.keys(obj)
      .map((key) => `${key}=${encodeURIComponent(obj[key])}`)
      .join('&');
  },
};

export default querystring;
