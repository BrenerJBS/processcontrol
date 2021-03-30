export function multiPropsFilter (products, filters) {
  const filterKeys = Object.keys(filters);
  return products.filter(product => {
    return filterKeys.every(key => {
      if (!filters[key].length) return true;
      // Loops again if product[key] is an array (for material attribute).
      if (Array.isArray(product[key])) {
        return product[key].some(keyEle => filters[key].includes(keyEle));
      }
      return filters[key].includes(product[key]);
    });
  });
};

export function filtrosSelecionados(filter,filterColetados,filters ){ 
  const filterKeys = Object.keys(filter);
 
  filterKeys.map(ind => {        
    if (filter[ind] === true){
      filterColetados = {...filterColetados, [ind]: filters[ind]}        
    }else{
      filterColetados = {...filterColetados, [ind]: ''}        
    }
  })
  return filterColetados;
}
