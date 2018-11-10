function Foo(x) {
    this.x = x;
};

function Bar(x) {
    this.x = x;
};

function Baz(x) {
    this.x = x;
}

function ProvideFoo() {
    return new Foo(42);
}

function ProvideBar(foo){
    return new Bar(-foo.x);
}

function ProvideBaz(bar){
    if(bar.x == 0) {
        throw new Error("Bar x is 0")
    }
    return new Baz(bar.x);
}

module.exports = {
    ProvideFoo, 
    ProvideBar,
    ProvideBaz
};

