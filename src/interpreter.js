var Interpreter = function () {

//Se asume que la bd se pasa por parametro
 //Se invoca luego de haber comprobado que la bd esta bien parseada
 this.checkQuery = function(entrada,bd)
 {
	if(parseDB(bd)== false)
	{
		return undefined;
	}
	else
	{
		//Aun aqui debo identificar si es un hecho o una regla
		var nombre = entrada.substring(0,entrada.indexOf("("));
		
		//El hecho debe incluir el punto final
		var chequearHecho = new RegExp("^[a-zA-Z]+[(](([a-z0-9],)*[a-z0-9]{1})+[)].$");
		
		if(chequearHecho.test(entrada))
		{
			if (existeHecho(entrada,bd))
			{
				return true;
			}
			//Si no esta el hecho podria tratarse de una regla o de un hecho que no este
			else
			{
				//Veo si es una regla
				var reglaBuscada = encontrarRegla(nombre,entrada,bd);
				if(reglaBuscada != null)
				{
					return determinarArgumentos(reglaBuscada,entrada,bd);
				}
				else
				{
					alert('La regla o el hecho no se encuentra en la base de datos');
					return false;
				}
			}
		}
		else
		{
			alert('La entrada está mal formulada');
		}
	}
	
 }
 
 this.existeHecho = function(hecho,bd)
 {
	if(!hecho.includes("."))
	{
		return bd.includes(hecho + ".");
	}
	else
	{
		return bd.includes(hecho);
	}
 }
 
 this.determinarArgumentos = function(regla,entrada,bd)
 {
	var separados = regla.substring(regla.indexOf("(") + 1,regla.indexOf(")"));
	var argumentos = separados.split(",");
	
	var separadosentrada = entrada.substring(entrada.indexOf("(") + 1,entrada.indexOf(")"));
	var argumentosentrada = separadosentrada.split(",");
	
	return colocarArgumentos(argumentos,argumentosentrada,regla,bd);
	
 }
 
 this.colocarArgumentos = function(argumentos,argumentosentrada,regla,bd)
 {
	for(i = 0; i < argumentos.length;i++)
	{
		var encontrar = argumentos[i];
		var re = new RegExp(encontrar,'g');
		regla = regla.replace(re,argumentosentrada[i]);
	}
	return obtenerHechos(regla,bd);
 }
 
 this.obtenerHechos = function(cadena,basededatos)
 {
	var cadenaHechos = cadena.substring(cadena.indexOf("-") + 2,cadena.indexOf("."));
	var hechos = cadenaHechos.split(", ");
	return comprobarHechos(hechos,basededatos);
 }
 
 this.comprobarHechos = function(hechos,bd)
 {
	var seCumple = true;
	for(i = 0; i < hechos.length;i++)
	{
		seCumple = seCumple && existeHecho(hechos[i],bd);
	}
	return seCumple;
 }
 
 this.encontrarRegla = function(nombre,entrada,bd)
 {
	var elementoBuscado = null;
	for(i = 0; i < bd.length; i++)
	{
		if(bd[i].startsWith(nombre) && bd[i].includes(":-")) 
		{
			elementoBuscado = bd[i];
			return elementoBuscado;
		}
	}
	return elementoBuscado;
 }
 
 this.parseDB = function (bd, paramss, paramsss) 
  {
	//al tener una sola linea la bd esta mal creada. Ya que tiene un solo hecho o una sola regla
	if (db.length == 1)
	{
		alert("Ha habido un error en la inicialización de la base");
		return false;
	}
	var correcta = true;
	var chequearHecho = new RegExp("^[a-z]+[(](([a-z0-9],)*[a-z0-9]{1})+[)].$");
	for(i = 0; i < bd.length;i++)
	{
		correcta = chequearHecho.test(bd[i]) || chequearFormatoRegla(bd[i]);
		if(!correcta)
		{
			alert("Ha habido un error en la inicialización de la base");
			return false;
		}
		//Si es una regla verifico que esten los hechos definidos en la base
		if(chequearFormatoRegla(bd[i]))
		{
			var hechos = (bd[i].substring(bd[i].indexOf("-") +2,bd[i].indexOf("."))).split(", ");
			if(!comprobarHechosDeRegla(hechos,chequearHecho,bd))
			{
				alert("Ha habido un error: todos los hechos que conforman una regla no se encuentran definidos en la base.");
				return false;
			}
		}
	}
	return true;
  }	
  
  this.comprobarHechosDeRegla = function(hechos, chequearHecho,bd)
  {
	for (j=0; j < hechos.length;j++)
	{
		var nombreHecho = hechos[j].substring(0,hechos[j].indexOf("("));
		if (!existeHechoParseo(nombreHecho,chequearHecho,bd))
		{
			return false;
		}
	}
	return true;
  } 
  
  this.existeHechoParseo = function(nombreHecho,chequearHecho,bd)
  {
	for(h=0; h < bd.length;h++)
	{
		if(chequearHecho.test(bd[h]) && bd[h].includes(nombreHecho))
		{
			return true;
		}
	}
	return false;
  }
  
  this.chequearFormatoRegla = function(regla)
  {
		//las comas no estan separadas por espacio en los argumentos
		var expresionRegla = new RegExp("^[a-zA-Z]+[(](([A-Z],)*[A-Z]{1})[)] :- (([a-z]+[(](([A-Z],)*[A-Z]{1})[)], )*([a-z]+[(](([A-Z],)*[A-Z]{1})[)]){1}).$");
		var reglaValida = expresionRegla.test(regla);
		return reglaValida;
  }

}

module.exports = Interpreter;
