### Wire-node - proof of concept automated dependency injection in Node.js

Wire-node is proof of concept that was inspired by [Wire](https://github.com/google/go-cloud/tree/master/wire) 

##Installing

Install wire-node by cloning repo of it
```
https://github.com/jmularski/wire-node
``` 
Inside of it you can find `wire` directory which contains file needed to use wire. No dependencies needed!

It also contains `example_files` directory where you can find simple usage of wire-node.

##Basics

Lets start by defining first provider

```js
function Foo(x) {
    this.x = x;
};

function ProvideFoo() {
    return new Foo(42);
}
```

It is a simple function without parameters, that returns Foo with x = 42. If first function has a parameter, you will need to add this manually as this is a simple proof of concept. Then any more providers can have a parameter, so lets define next one.

```js
function Bar(x) {
    this.x = x;
};

function ProvideBar(foo){
    return new Bar(-foo.x);
}
```

Another simple function with a dependency this time: it needs a Foo,that we can take from earlier function.

Providers can also returns error, here is a sample of that.

```js
function Baz(x) {
    this.x = x;
}

function ProvideBaz(bar){
    if(bar.x == 0) {
        throw new Error("Bar x is 0")
    }
    return new Baz(bar.x);
}
```

Lets now export this providers, so that we can use node-wire to automatically inject dependencions.

```js
module.exports = {
    ProvideFoo, 
    ProvideBar,
    ProvideBaz
};
```

Providers can be grouped in sets using `wire.NewSet` function.
It has to be called with array of objects which should have two params: `set` - function, and `filePath` - location of file from main directory, which you should run wire from. It has to be without first slash for now, so lets define first set.

I have created a new file called `wire_test.js`, and firstly we need to import previously created providers to it

```js
let { ProvideFoo, ProvideBar, ProvideBaz } = require('./test_file.js');
```

Then you have to import `node-wire` library from wire/wire.js
And then finally you can use `wire.NewSet` function

```js
let SuperSet = wire.NewSet([{set: ProvideFoo, filePath: 'example_files/test_file.js'}, {set: ProvideBar, filePath: 'example_files/test_file.js'}]);
```

You can also add other provider sets into a provider set.

```js
let MegaSet = wire.NewSet([SuperSet, {set: ProvideBaz, filePath: 'example_files/test_file.js' }]);
```

Then you have to just run `wire.Build` function with created provider set.

```js
wire.Build(MegaSet);
```

And that's it! If you done everything right a new file called `stub.js` should show up in your directory. If you followed instructions `stub.js` will look like this:

```js
let { ProvideFoo } = require('./example_files/test_file.js'); 
let { ProvideBar } = require('./example_files/test_file.js'); 
let { ProvideBaz } = require('./example_files/test_file.js'); 

let stub = () => { 
  try { 
    val_0 = ProvideFoo(); 
    val_1 = ProvideBar(val_0); 
    val_2 = ProvideBaz(val_1);
    return val_2; 
  } catch(err) {
    return err;
  }
};
module.exports = stub;
```

As you can see, it's simillar to what normal programmer would write, just change variables names, and then you are ready to go!

# I would like to remind you that this is a proof of concept, that is not production ready, but I think it works pretty cool nevertheless. Coolest task from GCI I've done so far! Feel free to message me at Gitter (@jmularski) or mail me (jakubmularski723@gmail.com) if you will run in any troubles, or just report issues to GitHub issue page!
