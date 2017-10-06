var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Interpreter = require('../src/interpreter');


describe("Interpreter", function () {

      var db = [
        "varon(juan).",
		"varon(pepe).",
        "varon(hector).",
		"mujer(maria).",
		"hijo(X,Y) :- varon(X), padre(Y,X).",
		"hija(X,Y) :- mujer(X), padre(Y,X)."
];

    var interpreter = null;

    before(function () {
        // runs before all tests in this block
    });

    after(function () {
        // runs after all tests in this block
    });

    beforeEach(function () {
        // runs before each test in this block
        interpreter = new Interpreter();
        interpreter.parseDB(db);
    });

    afterEach(function () {
        // runs after each test in this block
    });


    describe('Hechos del intérprete', function () {

        it('la base esta mal formulada. La consulta deberia devolver undefined', function () {
            assert(intepreter.checkQuery('varon(juan).',db) === undefined);
        });
		it('la base esta mal formulada. La consulta deberia devolver undefined', function () {
            assert(intepreter.checkQuery('mujer(maria).',db) === undefined);
        });
       

    });

    describe('Reglas del intérprete', function () {

        it('la base esta mal formulada. La consulta deberia devolver undefined', function () {
            assert(interpreter.checkQuery('hijo(pepe,juan).',db) === undefined);
        });
      

    });


});