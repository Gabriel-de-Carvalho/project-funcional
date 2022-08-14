export const distinct = (arr: any[], modality: string) => {
  var repeticoes: any[] = [];
  return arr.filter(function (el) {
    if (!repeticoes.includes(el[modalitysAttributes[modality]['distinct']])) {
      repeticoes.push(el[modalitysAttributes[modality]['distinct']]);
      return true;
    }
    return false;
  });
};

export const groupBy = (collection: any[], modality: string) => {
  switch (modality) {
    case 'repositories':
      return groupBySecondLevel(modality, 'keyObject', 'attribute', collection);
    case 'labels':
      return groupByFirstLevel(modality, collection);
    case 'issues':
      return groupBySecondLevel(modality, 'keyObject', 'attribute', collection);
    case 'topics':
      return groupByFirstLevel(modality, collection);
    case 'users':
      return groupByFirstLevel(modality, collection);
  }
};

const groupByFirstLevel = (modality: string, collection: any[]) => {
  const collectionCopy = [...collection];

  const result = collectionCopy.reduce((resultObj, currItem) => {
    const group = currItem[modalitysAttributes[modality]['groupBy']];

    if (!resultObj[group]) {
      resultObj[group] = [];
    }

    resultObj[group].push(currItem);

    return resultObj;
  }, {});

  return result;
};

const groupBySecondLevel = (
  modality: string,
  key: string,
  key2: string,
  collection: any[]
) => {
  const collectionCopy = [...collection];

  const result = collectionCopy.reduce((resultObj, currItem) => {
    const internalObj = currItem[modalitysAttributes[modality]['groupBy'][key]];

    const group = internalObj[modalitysAttributes[modality]['groupBy'][key2]];

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
  return f(modalidade, g(collection, modalidade2));
};

const modalitysAttributes: { [key: string]: any } = {
  repositories: {
    groupBy: { keyObject: 'owner', attribute: 'login' },
    orderBy: 'size',
    distinct: 'Author',
  },
  topics: {
    groupBy: 'featured',

    distinct: 'display_name',
  },
  users: {
    groupBy: 'type',
  },
  labels: {
    groupBy: 'name',
    orderBy: 'name',
    distinct: 'id',
  },
  issues: {
    distinct: 'repository_url',
    groupBy: { keyObject: 'user', attribute: 'id' },
    orderBy: 'title',
  },
};
