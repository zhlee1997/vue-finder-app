let timer;

export default {
  async login(context, payload) {
    return context.dispatch('auth', { ...payload, mode: 'login' }); // return -> so that promise can still keep track of
  },
  async signup(context, payload) {
    return context.dispatch('auth', { ...payload, mode: 'signup' }); // return -> so that promise can still keep track of
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBt4zioZjdLzQvdQ7EjAAk4nZOpBU7YAso';

    if (mode === 'signup') {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBt4zioZjdLzQvdQ7EjAAk4nZOpBU7YAso';
    }

    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });

    const resData = await res.json();

    if (!res.ok) {
      console.log(resData);
      const error = new Error(resData.message || 'Failed to authenticate');
      throw new Error(error);
    }

    console.log(resData);

    const expiresIn = +resData.expiresIn * 1000;
    // const expiresIn = 5000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem('token', resData.idToken);
    localStorage.setItem('userId', resData.localId);
    localStorage.setItem('tokenExpire', expirationDate);

    timer = setTimeout(function () {
      context.dispatch('autoLogout');
    }, expiresIn);

    context.commit('setUser', {
      token: resData.idToken,
      userId: resData.localId,
    });
  },
  autoLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpire = localStorage.getItem('tokenExpire');

    const expiresIn = +tokenExpire - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(function () {
      context.dispatch('autoLogout');
    }, expiresIn);

    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId,
      });
    }
  },
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpire');

    clearTimeout(timer);

    context.commit('setUser', { token: null, userId: null });
  },
  autoLogout(context) {
    context.dispatch('logout');
    context.commit('didLogout');
  },
};
