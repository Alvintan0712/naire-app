import { action, makeAutoObservable } from 'mobx';

class FlagStore {
  tokens;

  constructor() {
    this.tokens = new Map();
    makeAutoObservable(this);
  }

  make(token) {
    const that = this;
    return {
      set: action(() => that.tokens.set(token, true)),
      unset: action(() => that.tokens.delete(token)),
      get: action(() => that.tokens.has(token))
    };
  }

  count() {
    return this.tokens.size;
  }

  clean() {
    return this.tokens.size === 0;
  }

  dirty() {
    return this.tokens.size !== 0;
  }
}

export default FlagStore;
