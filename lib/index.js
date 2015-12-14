import LokkaTransport from './transport';
import uuid from 'uuid';

export default class Lokka {
  constructor(options = {}) {
    this._transport = options.transport;
    this._fragments = {};
    if (!(this._transport instanceof LokkaTransport)) {
      throw new Error('transport should be an instance of LokkaTransport');
    }
  }

  send(rawQuery) {
    if (!rawQuery) {
      throw new Error('rawQuery is required!');
    }

    return this._transport.send(rawQuery);
  }

  createFragment(fragment) {
    if (!fragment) {
      throw new Error('fragment is required!');
    }

    // XXX: Validate query against the schema
    const name = uuid.v4();
    const fragmentWithName = fragment.replace('fragment', `fragment ${name}`);
    this._fragments[name] = fragmentWithName;

    return name;
  }

  _findFragments(queryOrFragment, fragmentsMap = {}) {
    const matched = queryOrFragment.match(/\.\.\.[A-Za-z0-9\-]+/g);
    if (matched) {
      const fragmentNames = matched.map(name => name.replace('...', ''));
      fragmentNames.forEach(name => {
        const fragment = this._fragments[name];
        if (!fragment) {
          throw new Error(`There is no such fragment: ${name}`);
        }

        fragmentsMap[name] = fragment;
        this._findFragments(fragment, fragmentsMap);
      });
    }

    const fragmentsArray = Object.keys(fragmentsMap).map(key => {
      return fragmentsMap[key];
    });

    return fragmentsArray;
  }

  query(query) {
    if (!query) {
      throw new Error('query is required!');
    }

    // XXX: Validate query against the schema
    const fragments = this._findFragments(query);
    const queryWithFragments = `${query}\n${fragments.join('\n')}`;

    return this.send(queryWithFragments);
  }

  mutate(query) {
    if (!query) {
      throw new Error('query is required!');
    }

    // XXX: Validate query against the schema
    const mutationQuery = `mutation _ ${query.trim()}`;
    const fragments = this._findFragments(mutationQuery);
    const queryWithFragments = `${mutationQuery}\n${fragments.join('\n')}`;

    return this.send(queryWithFragments);
  }
}