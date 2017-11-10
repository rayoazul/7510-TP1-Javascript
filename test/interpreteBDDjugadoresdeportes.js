var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Interpreter = require('../src/interpreter');


describe("Interpreter", function () {

      var db = [
        "nombre(ginobili).",
		"nombre(maradona).",
		"nombre(vilas).",
		"nombre(monzon).",
		"nombre(aymar).",
		"nacimiento(maradona,1960).",
		"nacimiento(ginobili,1977).",
		"nacimiento(aymar,1977).",
		"nacimiento(monzon,1952).",
		"nacimiento(vilas,1942).",
		"jugador(ginobili,basquet).",
		"jugador(maradona,futbol).",
		"jugador(vilas,tenis).",
		"jugador(monzon,boxeo).",
		"jugador(aymar,hockey).",
		"juegaAl(X,Y,Z) :- nombre(X), nacimiento(X,Y), jugador(X,Z).",
		"jugadorNacimiento(X,Y) :- nombre(X), nacimiento(X,Y)."	
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

		it('nombre(ginobili) deberia ser true', function () {
            assert(interpreter.checkQuery('nombre(ginobili).',db) === true);
        });
		it('nombre(maradona) deberia ser true', function () {
            assert(interpreter.checkQuery('nombre(maradona).',db) === true);
        });
		it('nombre(perez) deberia ser false', function () {
            assert(interpreter.checkQuery('nombre(perez).',db) === false);
        });
		it('nacimiento(maradona,1960) deberia ser true', function () {
            assert(interpreter.checkQuery('nacimiento(maradona,1960).',db) === true);
        });
		
		it('nacimiento(monzon,1944) deberia ser false', function () {
            assert(interpreter.checkQuery('nacimiento(monzon,1944).',db) === false);
        });
		
		it('nacimiento(vilas,1942) deberia ser true', function () {
            assert(interpreter.checkQuery('nacimiento(vilas,1942).',db) === true);
        });
		
		it('jugador(vilas,tenis) deberia ser true', function () {
            assert(interpreter.checkQuery('jugador(vilas,tenis).',db) === true);
        });
		
		it('jugador(aymar,basquet) deberia ser false', function () {
            assert(interpreter.checkQuery('jugador(aymar,basquet).',db) === false);
        });
		
		it('jugador(monzon,boxeo) deberia ser true', function () {
            assert(interpreter.checkQuery('jugador(monzon,boxeo).',db) === true);
        });
		
    });

    describe('Reglas del intérprete', function () {

        it('jugadorNacimiento(maradona,1960) deberia ser true', function () {
            assert(interpreter.checkQuery('jugadorNacimiento(maradona,1960).',db) === true);
        });
		it('jugadorNacimiento(ginobili,1977) deberia ser true', function () {
            assert(interpreter.checkQuery('jugadorNacimiento(ginobili,1977).',db) === true);
        });
		it('jugadorNacimiento(ginobili,1970) deberia ser false', function () {
            assert(interpreter.checkQuery('jugadorNacimiento(ginobili,1970).',db) === false);
        });
		it('jugadorNacimiento(monzon,1977) deberia ser false', function () {
            assert(interpreter.checkQuery('jugadorNacimiento(monzon,1977).',db) === false);
        });
		it('juegaAl(maradona,1960,futbol) deberia ser true', function () {
            assert(interpreter.checkQuery('juegaAl(maradona,1960,futbol).',db) === true);
        });
		it('juegaAl(ginobili,1960,futbol) deberia ser false', function () {
            assert(interpreter.checkQuery('juegaAl(ginobili,1960,futbol).',db) === false);
        });
		it('juegaAl(vilas,1924,tenis) deberia ser false', function () {
            assert(interpreter.checkQuery('juegaAl(vilas,1924,tenis).',db) === false);
        });
		it('juegaAl(aymar,1977,hockey) deberia ser true', function () {
            assert(interpreter.checkQuery('juegaAl(aymar,1977,hockey).',db) === true);
        });
        

    });


});