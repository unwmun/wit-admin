import { fetchUtils } from 'react-admin'
import simpleRestProvider from 'ra-data-simple-rest';

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  return fetchUtils.fetchJson(url, options);
}
const dataProvider = simpleRestProvider('http://localhost:4000', httpClient, 'X-Total-Count');

const myDataProvider = {
  ...dataProvider,
  create: (resource, params) => {
    console.log("create params: ", params);
    if (!params.data.file) {
      return dataProvider.create(resource, params);
    }

    return convertFileToBase64(params.data.file)
      .then(base64File => ({ src: base64File, title: `${params.data.file.title}`}))
      .then(transformedFile => dataProvider.create(resource, {
        ...params,
        data: {
          ...params.data,
          file: transformedFile
        }
      }))
  },
  update: (resource, params) => {
    console.log("update params: ", params);
    if (!params.data.file) {
      return dataProvider.update(resource, params);
    }

    return convertFileToBase64(params.data.file)
      .then(base64File => ({ src: base64File, title: `${params.data.file.title}`}))
      .then(transformedFile => dataProvider.update(resource, {
        ...params,
        data: {
          ...params.data,
          file: transformedFile
        }
      }))
  }, 
}

const convertFileToBase64 = file => 
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;

    reader.readAsDataURL(file.rawFile);
  });


export default myDataProvider;