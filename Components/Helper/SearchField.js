

export function searchField(dadosfiltrados, search){
  const lowercasedFilter = search.toLowerCase();
  return (dadosfiltrados.filter(dado => {
    return (dado.requerente.toLocaleLowerCase().includes(lowercasedFilter) || 
    dado.obs.toLocaleLowerCase().includes(lowercasedFilter) || 
    dado.processo === lowercasedFilter || 
    dado.processo.toLocaleLowerCase().includes(lowercasedFilter))          
  }))
}
