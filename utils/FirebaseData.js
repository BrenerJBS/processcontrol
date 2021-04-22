import { database } from "./firebaseUtils";
import { snapshotToArray } from "../Components/Helper/SnaptoArray";
import { getCurrentDate } from "../Components/Helper/DateCurrent";

export function nomeUsuario() {
  const auditoresRef = database.ref("lista_auditores");
  const auditores = auditoresRef.once("value", (snapshot) => {
    return snapshotToArray(snapshot);
  });

  let auditorFiltro = auditores.filter(
    (objeto) => objeto.key === window.localStorage.getItem("token")
  );
  return auditorFiltro[0].nome;
}

export function carregarBDval(endereco) {
  const dataRef = database.ref(endereco);
  let dado;
  dataRef.once("value", (snapshot) => {
    dado = snapshot.val();
  });

  return dado;
}

export function writeNewEntrada(
  database,
  entradaData,
  adress,
  setLoadingbutton
) {
  setLoadingbutton(true);
  const newEntradaKey = database.ref().child(adress).push().key;
  entradaData = { ...entradaData, key: newEntradaKey };

  var updates = {};
  updates["/" + adress + "/" + newEntradaKey] = entradaData;
  //updates['/history/entrada/' + newEntradaKey + '/' + entradaData.history] = entradaData;
  database.ref().update(updates);
  setLoadingbutton(false);
}

export async function updateEntrada(
  setLoadingbutton,
  setError,
  entradaData,
  adress,
  editkey
) {
  setLoadingbutton(true);
  setError(null);
  try {
    let historyData = await carregarBDval(adress + "/" + editkey);
    const datakeys = Object.keys(historyData);

    datakeys.forEach((key) => {
      return historyData[key] === entradaData[key] && (historyData[key] = null);
    });
    historyData.auditorkey = entradaData.auditorkey;
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates["/entrada/" + editkey] = entradaData;
    updates[
      "/history/entrada/" + editkey + "/" + getCurrentDate()
    ] = historyData;

    await database.ref().update(updates);
    setLoadingbutton(false);
  } catch (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    setError(errorCode + " - " + errorMessage);
    setLoadingbutton(false);
  }
}

export async function atualizarFB(
  key,
  value,
  name,
  database,
  adress,
  setError
) {
  try {
    const editRef = await database.ref(adress);
    return editRef.child(key).update({ [name]: value });
  } catch (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    setError(errorCode + " - " + errorMessage);
  }
}
