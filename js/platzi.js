var vp = document.getElementById("villaplatzi");
var papel = vp.getContext("2d");
var selanimal = document.getElementById("selanimal");
var num = document.getElementById("numanimal");
var boton = document.getElementById("btnanimal");
boton.addEventListener("click",dibujar);
var botonref = document.getElementById("btnrefrescar");
botonref.addEventListener("click",refrescar);
var cont = document.getElementById("dibujar");
window.addEventListener("keydown",moveLobo);
//variables globales
var oldx=0,oldy=420;
var back = new Image();
var min=0;
var max=420;

var vpimgs={
	fondo: {
		url:"imgs/tile.png",
		ok:false
		},
	vaca:{
		url:"imgs/vaca.png",
		ok:false
		},
	cerdo:{
		url:"imgs/cerdo.png",
		ok:false
		},
	pollo:{
		url:"imgs/pollo.png",
		ok:false
		},
	lobo:{
		url:"imgs/lobo.png",
		ok:false
		}
};

//Crear imagenes
vpimgs.fondo.imagen = new Image();
vpimgs.fondo.imagen.src = vpimgs.fondo.url; 
vpimgs.fondo.imagen.addEventListener("load",cargarFondo);
//Vaca
vpimgs.vaca.imagen = new Image();
vpimgs.vaca.imagen.src = vpimgs.vaca.url;
//Cerdo
vpimgs.cerdo.imagen = new Image();
vpimgs.cerdo.imagen.src = vpimgs.cerdo.url; 
//Pollo
vpimgs.pollo.imagen = new Image();
vpimgs.pollo.imagen.src = vpimgs.pollo.url; 
//Lobo
vpimgs.lobo.imagen  = new Image();
vpimgs.lobo.imagen.src = vpimgs.lobo.url; 

function cargarFondo(){
	vpimgs.fondo.ok=true;
	
	papel.fillStyle = "grey";
    papel.rect(0, 0, 500, 500);
    papel.fill();
    //papel.drawImage(vpimgs.fondo.imagen,0,0);
}
function refrescar()
{
	location.reload();
}
function dibujar(){
	cont.style.display="none";
	var num = parseInt(numanimal.value);
	back = papel.getImageData(0, 0, 80, 80);
	switch (selanimal.value){
		case "todos":
			for (var i = 0; i < num; i++) {
				putImgs(vpimgs.vaca.imagen);
				putImgs(vpimgs.cerdo.imagen);
				putImgs(vpimgs.pollo.imagen);
			}
		break;
		case "vaca":
			for (var i = 0; i < num; i++) {
				putImgs(vpimgs.vaca.imagen);
			}
		break;
		case "cerdo":
			for (var i = 0; i < num; i++) {
				putImgs(vpimgs.cerdo.imagen);
			}
		break;
		case "pollo":
			for (var i = 0; i < num; i++) {
				putImgs(vpimgs.pollo.imagen);
			}
		break;
	}
	
	papel.drawImage(vpimgs.lobo.imagen,0,420);
	
}

function putImgs(ele){	
	papel.drawImage(ele,aleatorio(min,max),aleatorio(min,max));
}

function moveLobo(evt){
	if(evt.keyCode==37 || evt.keyCode==38 || evt.keyCode==39 || evt.keyCode==40){
	var x=oldx,y=oldy;
	switch(evt.keyCode){
		case 37:
			x=x-10;
		break;
		case 38:
			y=y-10;
		break;
		case 39:
			x=oldx+10;
		break;
		case 40:
			y=y+10;
		break;
	}
	//papel.clearRect(0,420,80,500);//limpia lobo
	papel.putImageData(back,oldx,oldy);//dibuja la imagen
	papel.drawImage(vpimgs.lobo.imagen,x,y);//dibuja la imagen
	oldx=x;
	oldy=y;
}
}

function aleatorio(min,max){
	return Math.floor(Math.random()*(max-min+1))+min;
}