import hyphenate from 'hyphenate-style-name';
import mq from './mediaQuery';

function negate(cond) {
  return `not ${cond}`;
}

function keyVal(k, v) {
  const realKey = hyphenate(k);

  // px shorthand
  if (typeof v === 'number') {
    v = `${v}px`;
  }
  if (v === true) {
    return k;
  }
  if (v === false) {
    return negate(k);
  }
  return `(${realKey}: ${v})`;
}

function join(conds) {
  return conds.join(' and ');
}

export default (obj) => {
  const rules = [];
  Object.keys(mq.all).forEach((k) => {
    const v = obj[k];
    if (v !== undefined) {
      rules.push(keyVal(k, v));
    }
  });
  return join(rules);
};
