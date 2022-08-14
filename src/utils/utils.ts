
export const distinct =  (arr: any[]) => {
  
    var repeticoes: any[] = []
    return arr.filter(function(el, i) {
        if( !repeticoes.includes(el["name"])){
            repeticoes.push(el["name"])
            return true
        } 
        return false
      
    });
  }


export const groupBy = (collection: any[], modality: string) => {

  switch (modality) {
    case 'repositories':
    return groupBySecondLevel(modality, "keyObject", "attribute", collection);
  }


  };




  const groupByFirstLevel = (modality: string, collection: any[]) => {
    const collectionCopy = [...collection];
    
    const result = collectionCopy.reduce((resultObj, currItem) => {
      const group = currItem[modalitysAttributes[modality]["groupBy"]];
      
  
      if (!resultObj[group]) {
        resultObj[group] = [];
      }
  
      resultObj[group].push(currItem);
  
      return resultObj;
    }, {});
    
    return result;
  }


  const groupBySecondLevel = (modality: string, key: string, key2: string , collection: any[]) => {
    const collectionCopy = [...collection];

    const result = collectionCopy.reduce((resultObj, currItem) => {


      console.log(modalitysAttributes[modality]["groupBy"][key])

      const internalObj = currItem[modalitysAttributes[modality]["groupBy"][key]]

      const group = internalObj[modalitysAttributes[modality]["groupBy"][key2]];

      if (!resultObj[group]) {
        resultObj[group] = [];
      }
  
      resultObj[group].push(currItem);
  
      return resultObj;
    }, {});
    
    return result;
  }



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


const modalitysAttributes : {[key: string]: any} = {
  repositories: {
    groupBy: {keyObject: "owner", attribute: "login"},
    orderBy: "size",
    distinct: "Author"
  },
  topics: {
    groupBy: "featured",

    distinct: "display_name"
  },
  users:{

  },
  labels:{
    groupBy: "name",
    orderBy: "name",
    distinct: ""
  },
  issues: {
    distinct: "repository_url",
    groupBy: {keyObject: "user", attribute: "login"},
    orderBy: "title"
  }

}