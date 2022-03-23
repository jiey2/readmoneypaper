const baseURL = "https://vcsrnm6hf9.execute-api.ap-southeast-1.amazonaws.com/edge";

/**
 * 获取PDF列表
 */
export async function getDocumentsList() {
  // eslint-disable-next-line no-undef
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
  };
  const response = await fetch(
    baseURL + "/database",
    requestOptions
  );
  const data = await response.json();
  return data;
}

/**
 * Delete Record
 */
export async function deleteRecord(DID: string) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    did: DID,
  });

  var requestOptions: Record<string, any> = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    "https://vcsrnm6hf9.execute-api.ap-southeast-1.amazonaws.com/edge/database?operation=DELETE",
    requestOptions
  )
    .then((response) => response.text())
    .catch((error) => {
      throw new Error("error", error);
    })
    .finally(() => {window.location.reload()});
}

