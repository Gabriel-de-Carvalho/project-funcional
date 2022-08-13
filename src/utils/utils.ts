export const distinct = (arr: any[]) => {
  var repeticoes: any[] = [];
  return arr.filter(function (el, i) {
    if (!repeticoes.includes(el['name'])) {
      repeticoes.push(el['name']);
      return true;
    }
    return false;
  });
};

export const groupBy = (key: any, collection: any[]) => {
  const collectionCopy = [...collection];
  const result = collectionCopy.reduce((resultObj, currItem) => {
    const group = currItem[key];

    if (!resultObj[group]) {
      resultObj[group] = [];
    }

    resultObj[group].push(currItem);

    return resultObj;
  }, {});

  return result;
};

export const orderBy = (key: any, collection: any[]) => {
  const collectionCopy = [...collection];

  const result = collectionCopy.sort((a, b) => {
    return a[key] < b[key] ? -1 : 1;
  });

  return result;
};

export const compose = function (
  f: any,
  g: any,
  modalidade: string,
  modalidade2: string,
  collection: any[]
) {
  return f(modalidade, g(collection));
};
