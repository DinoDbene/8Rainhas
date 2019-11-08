// Configurando o Canvas
    var cnv =  document.querySelector("canvas");
    var ctx = cnv.getContext("2d");

    var WIDTH = cnv.width
    var HEIGHT = cnv.height

    var tileSize = 59
    var spriteSize = 100
// Inserindo o sprit sheet do personagem
    var trump = new Image()
        trump.src = "img/trump_run.png"
        trump.addEventListener("load", function() {
        requestAnimationFrame(loop, cnv)

    }, false)
// Inserindo o sprit sheet do goal
    var dollar = new Image()
        dollar.src = "img/dollar.png"
        dollar.addEventListener("load", function() {
        requestAnimationFrame(loop, cnv)

    }, false)


// Criando labirinto vazio

    var maze = [[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
            ]

    // Inicializa cada objeto da matriz
    function initMaze() {
        for (var row in maze) {
            for (var column in maze[row]) {
                maze[row][column].row = Number(row)
                maze[row][column].column = Number(column)
                maze[row][column].distance = Number.MAX_VALUE
                maze[row][column].dad = null
                maze[row][column].value = 0
                maze[row][column].status = 1 // Existe 2 status{0 = bloqueado, 1 = disponivel}
            }
        } 
    }

     initMaze()
    
    let nInicio = maze[1][1]
    let nFinal = maze[9][9]

    // configuranda os atributos do personagem
    const player = {
        x: (nInicio.column)*(tileSize+2),
        y: (nInicio.row)*(tileSize+2),
        width: tileSize-10,
        height: tileSize-10,
        velocidade: 1,
        srcX: 0,
        srcY: 0,
        countAnim: 0,
        isSelected: false
    }

    // configuranda os atributos do alvo
    const goal = {
        x: (nFinal.column)*(tileSize),
        y: (nFinal.row)*(tileSize),
        width: tileSize,
        height: tileSize,
        velocidade: 1,
        srcX: 0,
        srcY: 0,
        isSelected: false
    }
    // Verifica se o numero é impar
    impar = num => num%2!=0? true : false
    
    // Gera borda do labirinto
    function borderCreate() {
        
        for (var row in maze) {
            for (var column in maze[row]) {
                if (column == 0 || column == 9 || row == 0 || row == 9) {
                    maze[row][column].value = 1
                }
            }
        }
    }
    
    // GERA A GRADE E VAI ZERANDO ALGUNS EXCETO AS DUPLAS IMPARES
    function gridCreate(){

        for (var row in maze) {
            for (var column in maze[row]) {
                
                if (!impar(row) && impar(column)) {
                    maze[row][column].value = 1
                }

                if (impar(row) && !impar(column)) {
                    maze[row][column].value = 1
                }
            }
        }

    }
    
    borderCreate()
    

    var queue = []

    function buscaEmLargura(maze, nInicio, nFinal) {
        // for
        //      O algoritmo insere uma rainha
        //      solucao.push(rainha)
        //      Se (espaço disponivel) {
        //          checkpoint = solucao
        //      } else {
        //          solucao = checkpoint
        //      }
        //      procura a proxima coluna disponivel


 
           
    }
gridCreate()

// Função de atualizar a tela
    function update() {
        

    }
// Função que renderiza a matriz "maze" e a animação do personagem
    function render() {
        // Tabuleiro
        ctx.clearRect(0, 0, WIDTH, HEIGHT)
        ctx.save()
        for (let row in maze) {
            for (let column in maze[row]) {
                let tile = maze[row][column].value

                if (tile === 1) {
                    let x = column*tileSize
                    let y = row*tileSize
                    ctx.fillRect(x, y, tileSize, tileSize)
                }
            }
        }
        // Desenha o caminho

        // Rederiza o Dollar enquando o player não estiver encima dele
        // if (!(player.x > goal.x-10 && player.x < goal.x+10
        //     && player.y > goal.y-10 && player.y < goal.y+10)) {
        //     ctx.drawImage(
        //         dollar,
        //         goal.srcX, goal.srcY, 550, 550,
        //         goal.x, goal.y, goal.width, goal.height
        //     )
        // } else {
        //     console.log("Você conseguiu!!")
        // }
        
        // Renderiza o personagem
        // ctx.drawImage(
        //     trump,
        //     player.srcX, player.srcY, spriteSize, spriteSize,
        //     player.x-15, player.y-21, player.width+30, player.height+30
        // )
        
    }
// Faz com que o jogo continue iterando
    function loop() {
        update()
        render()
        requestAnimationFrame(loop, cnv)
    }


