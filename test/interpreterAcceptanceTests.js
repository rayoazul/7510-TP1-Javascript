var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Interpreter = require('../src/interpreter');


describe("Interpreter", function () {

      var db = [
        "varon(juan).",
        "varon(pepe).",
        "varon(hector).",
        "varon(roberto).",
        "varon(alejandro).",
        "mujer(maria).",
        "mujer(cecilia).",
        "padre(juan,pepe).",
        "padre(juan,pepa).",
        "padre(hector,maria).",
        "padre(roberto,alejandro).",
        "padre(roberto,cecilia).",
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


    describe('Interpreter Facts', function () {

        it('varon(juan) should be true', function () {
            assert(interpreter.checkQuery('varon(juan).',db));
        });

        it('varon(maria) should be false', function () {
            assert(interpreter.checkQuery('varon(maria).',db) === false);
        });

        it('mujer(cecilia) should be true', function () {
            assert(interpreter.checkQuery('mujer(cecilia).',db));
        });

        it('padre(juan,pepe) should be true', function () {
            assert(interpreter.checkQuery('padre(juan,pepe).',db) === true);
        });

        it('padre(mario,pepe) should be false', function () {
            assert(interpreter.checkQuery('padre(mario,pepe).',db) === false);
        });

		 it('padre(hector,maria) should be true', function () {
            assert(interpreter.checkQuery('padre(hector,maria).',db) === true);
        });
		
		 it('padre(jose,carlos) should be false', function () {
            assert(interpreter.checkQuery('padre(jose,carlos).',db) === false);
        });
		
		 it('mujer(hector) should be false', function () {
            assert(interpreter.checkQuery('mujer(hector).',db) === false);
        });
        // TODO: Add more tests

    });

    describe('Interpreter Rules', function () {

        it('hijo(pepe,juan) should be true', function () {
            assert(interpreter.checkQuery('hijo(pepe,juan).',db) === true);
        });
        it('hija(maria,roberto) should be false', function () {
            assert(interpreter.checkQuery('hija(maria,roberto).',db) === false);
        });
        it('hijo(pepe,juan) should be true', function () {
            assert(interpreter.checkQuery('hijo(pepe,juan).',db));
        });
		it('hija(maria,hector) should be true', function () {
            assert(interpreter.checkQuery('hija(maria,hector).',db));
        });
		it('hijo(alejandro,roberto) should be true', function () {
            assert(interpreter.checkQuery('hijo(alejandro,roberto).',db));
        });
		it('hija(alejandro,maria) should be false', function () {
            assert(interpreter.checkQuery('hijo(alejandro,maria).',db) == false);
        });
        // TODO: Add more tests

    });


});