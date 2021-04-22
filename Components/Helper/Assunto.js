export function nomeAssunto(key, assuntos) {
  if (key !== "" && assuntos) {
    let assuntoFiltro = assuntos.filter((objeto) => objeto.key === key);
    return assuntoFiltro[0].assunto;
  } else return "";
}
