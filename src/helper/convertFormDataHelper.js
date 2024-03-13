import * as _ from 'lodash';

// let fd = new FormData()
export const objectToFormData = (
  formRequest = {},
  convertDataForm,
  parent = '',
) => {
  let fd = convertDataForm || new FormData();

  Object.keys(formRequest).forEach((vm) => {
    let newName = parent ? parent + '[' + vm + ']' : vm;

    if (formRequest[vm] instanceof File) {
      fd.append(newName, formRequest[vm]);
    } else if (formRequest[vm] instanceof Blob) {
      fd.append(newName, formRequest[vm], 'custom-filename.extension');
    } else if (_.isObject(formRequest[vm])) {
      fd = objectToFormData(formRequest[vm], fd, newName);
    } else if (_.isArray(formRequest[vm])) {
      if (!_.isEmpty(formRequest[vm])) {
        fd = arrayToFormData(formRequest[vm], fd, newName);
      } else {
        fd.append(newName, []);
      }
    } else {
      fd.append(newName, formRequest[vm]);
    }
  });

  return fd;
};

const arrayToFormData = (formRequest = [], convertDataForm, parent = '') => {
  let fd = convertDataForm || new FormData();

  formRequest.forEach((vm, index) => {
    let newName = parent ? parent + '[' + index + ']' : '[' + index + ']';

    if (vm instanceof File) {
      fd.append(newName, vm);
    } else if (vm instanceof Blob) {
      fd.append(newName, vm, 'custom-filename.extension');
    } else if (_.isObject(vm)) {
      fd = objectToFormData(vm, fd, newName);
    } else if (_.isArray(vm)) {
      if (!_.isEmpty(vm)) {
        fd = arrayToFormData(vm, fd, newName);
      } else {
        fd.append(newName, []);
      }
    } else {
      fd.append(newName, vm);
    }
  });

  return fd;
};

export function objectConvertToFormData(obj, form, namespace) {
  let fd = form || new FormData();
  let formKey;
  for (let property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (namespace) {
        formKey = namespace + '[' + property + ']';
      } else {
        formKey = property;
      }
      if (obj[property] instanceof Array) {
        for (let i = 0; i < obj[property].length; i++) {
          objectToFormData(obj[property][i], fd, `${property}[${i}]`);
        }
      } else if (
        typeof obj[property] === 'object' &&
        !(obj[property] instanceof File)
      ) {
        objectToFormData(obj[property], fd, property);
      } else {
        fd.append(formKey, obj[property]);
      }
    }
  }
  return fd;
}

export function createFormDataFromObject(
  data,
  formData = new FormData(),
  parentKey = '',
) {
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const currentKey = parentKey ? `${parentKey}[${key}]` : key;
      const value = data[key];

      if (value instanceof File) {
        formData.append(currentKey, value);
      } else if (value instanceof Blob) {
        // Jika Anda ingin menambahkan tipe MIME tertentu ke FormData
        formData.append(currentKey, value, 'custom-filename.extension');
      } else if (typeof value === 'object' && !Array.isArray(value)) {
        // Jika nilai adalah objek, panggil fungsi rekursif lagi
        createFormDataFromObject(value, formData, currentKey);
      } else if (Array.isArray(value)) {
        // Jika nilai adalah array, lakukan loop dan panggil fungsi rekursif untuk setiap elemen
        value.forEach((item, index) => {
          if (item instanceof File) {
            formData.append(`${currentKey}[${index}]`, item);
          } else if (item instanceof Blob) {
            // Jika Anda ingin menambahkan tipe MIME tertentu ke FormData
            formData.append(
              `${currentKey}[${index}]`,
              item,
              'custom-filename.extension',
            );
          } else {
            formData.append(`${currentKey}[${index}]`, item);
          }
        });
      } else {
        formData.append(currentKey, value);
      }
    }
  }

  return formData;
}
