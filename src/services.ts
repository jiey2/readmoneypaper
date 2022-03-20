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
