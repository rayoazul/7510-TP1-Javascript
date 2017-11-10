var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Interpreter = require('../src/interpreter');


describe("Interpreter", function () {

      var db = [
		"dividir(20,4,5).",
		"dividir(72,8,9).",
		"dividir(100,5,20).",
		"dividir(81,9,9).",
		"dividir(63,7,9).",
		"dividir(144,12,12).",
		"multiplicar(X,Y,Z) :- dividir(Z,X,Y)."
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

        it('dividir(100,20,5) should be true', function () {
            assert(interpreter.checkQuery('dividir(100,5,20).',db));
        });
		
		it('dividir(144,12,12) should be true', function () {
            assert(interpreter.checkQuery('dividir(144,12,12).',db));
        });
		
		it('dividir(9,3,3) should be false', function () {
            assert(interpreter.checkQuery('dividir(9,3,3).',db) == false);
        });
		
		it('dividir(8,4,2) should be false', function () {
            assert(interpreter.checkQuery('dividir(8,4,2).',db) == false);
        });

    });

    describe('Reglaes del intérprete', function () {

        it('multiplicar(5,20,100) should be true', function () {
            assert(interpreter.checkQuery('multiplicar(5,20,100).',db) === true);
        });
       
	    it('multiplicar(4,5,20) should be true', function () {
            assert(interpreter.checkQuery('multiplicar(4,5,20).',db) === true);
        });
		
		it('multiplicar(12,12,144) should be true', function () {
            assert(interpreter.checkQuery('multiplicar(12,12,144).',db) === true);
        });
		
		it('multiplicar(20,5,100) should be false', function () {
            assert(interpreter.checkQuery('multiplicar(20,5,100).',db) === false);
        });
		
		it('multiplicar(5,4,20) should be false', function () {
            assert(interpreter.checkQuery('multiplicar(5,4,20).',db) === false);
        });
		
		it('multiplicar(8,2,16) should be false', function () {
            assert(interpreter.checkQuery('multiplicar(8,2,16).',db) === false);
        });
		
		it('multiplicar(8,3,21) should be false', function () {
            assert(interpreter.checkQuery('multiplicar(8,3,21).',db) === false);
        });
    });


});