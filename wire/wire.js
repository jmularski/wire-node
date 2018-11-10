let fs = require('fs');

let ConfigureFile = (args) => {
    data = '';
    args = flatten(args);
    args.forEach(element => {
        data += createRequire(element);
    });
    data += "\nlet stub = () => { \n"
    data += tryCatchFunc(args);
    data += "\n};";
    data += "\nmodule.exports = stub;";
    console.log(data);
    let writeStream = fs.createWriteStream('stub.js');
    writeStream.write(data);
    writeStream.end();
}

let flatten = function(arr, result = []) {
    for (let i = 0, length = arr.length; i < length; i++) {
      const value = arr[i];
      if (Array.isArray(value)) {
        flatten(value, result);
      } else {
        result.push(value);
      }
    }
    return result;
};

let createRequire = (element) => {
    return `let { ${element.set.name} } = require('./${element.filePath}'); \n`
};

let tryCatchFunc = (args) => {
    index = 0;
    res = '  try {'
    args.forEach(element => {
        let previousRes = index != 0 ? `val_${index-1}` : ''; 
        res += ` \n    val_${index} = ${element.set.name}(${previousRes});`
        index += 1;
    });
    res += `\n    return val_${index-1}; \n  } catch(err) {
    return err;
  }`;
    return res;
}

let Build = (args) => {
    ConfigureFile(args);
};

let NewSet = (args) => {
    return args;
}


module.exports = {
    NewSet,
    Build
};