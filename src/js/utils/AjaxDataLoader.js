export const RESPONSE_TEXT = 1;
export const RESPONSE_XML = 2;
export const RESPONSE_ARRAY_BUFFER = 3;

function AjaxDataLoader(url, async=true, responseType=RESPONSE_TEXT) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', url, async);

    if (responseType === RESPONSE_ARRAY_BUFFER) {
      xhr.responseType = 'arraybuffer';
    }

    xhr.send(null);

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        switch (responseType) {
          case RESPONSE_TEXT:
            resolve(xhr.responseText);
            break;
          case RESPONSE_XML:
            resolve(xhr.responseXML);
            break;
          case RESPONSE_ARRAY_BUFFER:
            resolve(xhr.response);
            break;
          default:
            resolve(xhr.responseText);
            break;
        }
      } else {
        reject(xhr.statusText);
      }
    };

    xhr.onerror = () => {
      reject(xhr.statusText);
    };
  });
}

export default AjaxDataLoader;
