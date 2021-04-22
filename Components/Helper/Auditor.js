export function nomeAuditor(key, auditores) {
  if (auditores && key) {
    let auditorFiltro = auditores.filter((objeto) => objeto.key === key);
    return auditorFiltro[0].nome;
  } else return "";
}
