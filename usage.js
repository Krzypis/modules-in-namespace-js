var namespace = new window.Namespace({
    delimiter: ".",
    debug: true,
    addProperties: true
});

var areHere = namespace.use("Some.Awesome.Modules.Are here");
areHere.example = 1;
var areThere = namespace.use("Some.Awesome.Modules.Are there");
areThere.example = 2;
console.log(namespace.use("Some"));
