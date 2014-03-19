var helpers = new window.Namespace({
    delimiter: ".",
    debug: true,
    rootName: "Helpers",
    addProperties: true
});

var tests = new window.Namespace({
    delimiter: ".",
    debug: true,
    rootName: "Tests",
    addProperties: true
});

helpers.create("Some.Awesome.Modules.Are here");
tests.create("Better.Modules.Are there");
helpers.create("A.B.C");
