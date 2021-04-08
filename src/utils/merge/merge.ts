type Indexed<T = unknown> = {
    [key in string]: T;
};

function merge(lhs: Indexed, rhs: Indexed): Indexed {
  let output = Object.assign({}, lhs);
  if (isObject(lhs) && isObject(rhs)) {
    Object.keys(rhs).forEach(key => {
      if (isObject(rhs[key])) {
        if (!(key in lhs))
          Object.assign(output, { [key]: rhs[key] });
        else
          { // @ts-ignore
              output[key] = merge(lhs[key], rhs[key]);
          }
      } else {
        Object.assign(output, { [key]: rhs[key] });
      }
    });
  }
  return output;
}

function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
  }

export default merge

merge({a: {b: {a: 2}}, d: 5}, {a: {b: {c: 1}}});
/*
{
	a: {
		b: {
			a: 2,
			c: 1,
		}
	},
	d: 5,
}
*/



//add some types
/*
type Indexed<T = unknown> = {
  [key in string]: T;
};

function merge(lhs: Indexed, rhs: Indexed): Indexed {
  let output = Object.assign({}, lhs);
  if (isObject(lhs) && isObject(rhs)) {
    Object.keys(rhs).forEach(key => {
      if (isObject(rhs[key])) {
        if (!(key in lhs))
          Object.assign(output, { [key]: rhs[key] });
        else
          output[key] = merge(lhs[key], rhs[key]);
      } else {
        Object.assign(output, { [key]: rhs[key] });
      }
    });
  }
  return output;
}

function isObject(item: unknown) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

export default merge

merge({a: {b: {a: 2}}, d: 5}, {a: {b: {c: 1}}});
/!*
{
	a: {
		b: {
			a: 2,
			c: 1,
		}
	},
	d: 5,
}
*!/*/

