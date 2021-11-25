//let cria uma variável. Usando camelCase
let xBolinha = 300;
let yBolinha = 200;
let d = 25;
let r = d/2;
let velocidadeXBolinha = 8
let velocidadeYBolinha = 6
let colidiu = false;

//placar
let meusPontos = 0;
let pontosOponente = 0;

//Variáveis da Raquete
let xRaquete = 10;
let yRaquete = 150;
let larguraRaquete = 10;
let alturaRaquete = 100;
let bordaRaquete = 15;
    
//Variáveis do oponente
let xRaqueteOp = 580;
let yRaqueteOp = 150;
let larguraRaqueteOp = 10;
let alturaRaqueteOp = 100;
let bordaRaqueteOp = 15;
let velocidadeYOp;
let chanceErro;

//Sons do jogo
let ponto;
let raquetada;
let trilha;

//Função de pré-carregamento ao iniciar o programa
function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  fisicaBolinha();
  bolinha();
  mostrarRaquete(xRaquete, yRaquete);
  movimentarRaquete();
  //atingirRaquete();
  colisaoBiblioteca(xRaquete, yRaquete);
  colisaoBiblioteca(xRaqueteOp, yRaqueteOp);
  mostrarRaquete(xRaqueteOp, yRaqueteOp);
  movimentaRaqueteOp();
  incluirPlacar();
  pontos();
  collideRectCircle();
}
  
function bolinha(){
  //Desenha a bolinha x, y, d
  circle(xBolinha, yBolinha, d);
  //Define as velocidades x e y da bolinha
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function fisicaBolinha() {
 //Definindo toque na extremidade x e invertendo a direção
 if((xBolinha + r) >=width || (xBolinha - r) <0){
  velocidadeXBolinha *=-1;
   ponto.play();
}
  
//Definindo toque na extremidade y e invertendo a direção
  if((yBolinha + r) >=height || (yBolinha - r) <0){
  velocidadeYBolinha *=-1;
    raquetada.play();
  } 
}

function mostrarRaquete(x, y){
  //x, y, largura, comprimento, borda
  rect(x, y, larguraRaquete, 
       alturaRaquete, bordaRaquete);
}

function movimentarRaquete(){
  if(keyIsDown(UP_ARROW)){
    yRaquete-=10;
  }
  
  else if(keyIsDown(DOWN_ARROW)){
    yRaquete+=10;
  }
}

//Função criada inicialmente para colidir com a raquete
/*function atingirRaquete(){
  if((xBolinha - r) < xRaquete + larguraRaquete
    && (yBolinha - r) < yRaquete + alturaRaquete && (yBolinha + r) > yRaquete){
     velocidadeXBolinha *=-1;
    raquetada.play();
  }
}*/


function colisaoBiblioteca(x,y){
  colidiu = collideRectCircle(x, y, larguraRaquete, alturaRaquete, xBolinha, yBolinha, r);
  
  if(colidiu){
    velocidadeXBolinha *=-1;
    raquetada.play();
  }
}

function movimentaRaqueteOp(){
  velocidadeYOp = yBolinha -yRaqueteOp - alturaRaquete / 2 - 30;
  yRaqueteOp += velocidadeYOp;
}
function incluirPlacar(){
  textAlign(CENTER);
  textSize(40);
  fill(color(255,140,0));
  rect(115, 10, 75, 50);
  fill(255);
  text(meusPontos, 150, 50);
  fill(color(255,140,0));
  rect(415, 10, 75, 50);
  fill(255);
  text(pontosOponente, 450, 50);
}

function pontos(){
  if((xBolinha + r) > 595){
    meusPontos += 1;
  }
  
  if((xBolinha - r) < 5){
    pontosOponente += 1;
  }
}



