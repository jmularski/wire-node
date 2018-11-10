let { ProvideFoo, ProvideBar, ProvideBaz } = require('./test_file.js');
let wire = require('../wire/wire');


let SuperSet = wire.NewSet([{set: ProvideFoo, filePath: 'example_files/test_file.js'}, {set: ProvideBar, filePath: 'example_files/test_file.js'}]);

let MegaSet = wire.NewSet([SuperSet, {set: ProvideBaz, filePath: 'example_files/test_file.js' }]);

wire.Build(MegaSet);