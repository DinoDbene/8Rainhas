// Configurando o Canvas
    var cnv =  document.querySelector("canvas");
    var ctx = cnv.getContext("2d");

    var WIDTH = cnv.width
    var HEIGHT = cnv.height

    var tileSize = 59
    var spriteSize = 64

// Inserindo o sprit sheet da Rainha
    var Rainha = new Image()
        Rainha.src = "img/xadrez.png"
        Rainha.addEventListener("load", function() {
        requestAnimationFrame(loop, cnv)

    }, false)
// Inserindo o sprit sheet do Bloqueado
    var Bloqueado = new Image()
        Bloqueado.src = "img/bloqueado.png"
        Bloqueado.addEventListener("load", function() {
        requestAnimationFrame(loop, cnv)

    }, false)


// Criando matriz do tabuleiro

    var tabuleiro = [[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
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
    function initTabuleiro() {
        for (var row in tabuleiro) {
            for (var column in tabuleiro[row]) {
                tabuleiro[row][column].row = Number(row)
                tabuleiro[row][column].column = Number(column)
                tabuleiro[row][column].value = 0
                tabuleiro[row][column].status = 1 // Existe 2 status{0 = bloqueado, 1 = disponivel}
            }
        } 
    }

     initTabuleiro()
    
    let nInicio = tabuleiro[1][7]
    let nFinal = tabuleiro[8][5]

    // configuranda os atributos das rainhas
    const rainha = {
        x: (nInicio.column)*(tileSize),
        y: (nInicio.row)*(tileSize),
        width: tileSize,
        height: tileSize,
        velocidade: 1,
        srcX: 0,
        srcY: 0,
        countAnim: 0,
        isSelected: false
    }

    // configuranda os atributos dos bloqueios
    const bloqueio = {
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
        
        for (var row in tabuleiro) {
            for (var column in tabuleiro[row]) {
                if (column == 0 || column == 9 || row == 0 || row == 9) {
                    tabuleiro[row][column].value = 1
                    tabuleiro[row][column].status = 0
                }
            }
        }
    }
    
    // GERA OS QUADRADOS DO TABULEIRO
    function gridCreate(){

        for (var row in tabuleiro) {
            for (var column in tabuleiro[row]) {
                
                if (!impar(row) && impar(column)) {
                    tabuleiro[row][column].value = 1
                }

                if (impar(row) && !impar(column)) {
                    tabuleiro[row][column].value = 1
                }
            }
        }

    }
    
    borderCreate()
    

    var rainhas = []
    var lastUpdate = []
    var bloqueados = []
   

    // - Recebe o tabuleiro 
    // - Verifica se ha algum campo disponivel
    // - Retorna o campo se holver
    function procurar(tabuleiro) {
        let avaiable = false

        for (let row = 0; row < tabuleiro.length; row++) {
            for (let column = 0; column < tabuleiro[row].length; column++) {
                 
                if (tabuleiro[row][column].status === 1) {
                    avaiable = true
                    console.log(tabuleiro[row][column])
                    return [avaiable, tabuleiro[row][column]]
                }    
            }  
        }
        
        if (!avaiable) {
            return [avaiable]
        }
    }


    // - Recebe o tabuleiro 
    // - Insere a rainha
    // - Bloqueia linha, coluna e diagonal da rainha 
    // - Retorna o novo tabuleiro
    function reBloquear(tabuleiro, rainhas) {

        for (let i = 0; i < tabuleiro.length; i++) {
            for (let j = 0; j < tabuleiro[i].length; j++) {

                laterais = (i == 0 || i == 9 || j == 0 || j == 9) 

                if (!laterais) {
                    tabuleiro[i][j].status = 1 
                }
                
                
            }
            
        }

        for (let r = 0; r < rainhas.length; r++) {
            let x = rainhas[r].column
            let y = rainhas[r].row

            // // Zera a linha
            for (let i = 0; i < tabuleiro[y].length; i++) {
                laterais = (i == 0 || i == 9) 

                if (!laterais) {
                    tabuleiro[y][i].status = 0
                }        
            }

            // // Zera a coluna
            for (let i = 0; i < tabuleiro.length; i++) {
                laterais = (i == 0 || i == 9) 

                if (!laterais) {
                    tabuleiro[i][x].status = 0
                }        
            }

            // Zera a diagonal
            let k = x

            for (let i = y; (i < 9) && (k < 9); i++) {    
                for (let j = k; j < k+1; j++) {
                    laterais = (i == 0 || i == 9 || j == 0 || j == 9) 

                    if (!laterais) {
                        tabuleiro[i][j].status = 0 
                    }       
                } 
                k++ 
            }

            for (let i = 0; i < bloqueados.length; i++) {
                bloqueados[i].status = 0
                
            }
        }
    } 

    function inserirBloquear(tabuleiro, avaiable) {
        lastUpdate = []

        let column = avaiable.column
        let row = avaiable.row

        rainhas.push(avaiable)

        // // Zera a linha
        for (let i = 0; i < tabuleiro[row].length; i++) {
            laterais = (i == 0 || i == 9) 

            if (!laterais && tabuleiro[row][i].status !== 0) {
                tabuleiro[row][i].status = 0
            }        
        }

        // // Zera a coluna
        for (let i = 0; i < tabuleiro.length; i++) {
            laterais = (i == 0 || i == 9) 

            if (!laterais && tabuleiro[i][column].status !== 0) {
                tabuleiro[i][column].status = 0
            }        
        }

        // Zera a diagonal
        for (let k = 0; k < tabuleiro.length; k++) {
            if (k < ( tabuleiro.length-1-row) && ((column+k)< tabuleiro.length-1)) {

                tabuleiro[row+k][column+k].status = 0
            }

            if (k < ( tabuleiro.length-1-row) && ((column-k)>=0)) {

                tabuleiro[row+k][column-k].status = 0
            }
        }  

        // Diagonais para cima
        for (let k = 0; k < tabuleiro.length; k++) {
            if (k > 0 && ((column-k)>0)) {
                tabuleiro[row-k][column-k].status = 0
            }

            if (k > 0 && ((column+k)< tabuleiro.length-1)) {
                tabuleiro[row-k][column+k].status = 0
            }
        } 

        return tabuleiro
    }

    // - Recebe o tabuleiro 
    // - remove a ultima rainha
    // - Desbloqueia linha, coluna e diagonal da rainha removida
    // - Retorna o novo tabuleiro
    function removerDesbloquear() {
        let x = rainhas[rainhas.length-1].column
        let y = rainhas[rainhas.length-1].row

        bloqueados.push(tabuleiro[y][x])

        rainhas.pop()
        
        reBloquear(tabuleiro, rainhas)

        return tabuleiro
    }
  
    function inserirRainha() {
        console.log(rainhas)
           
        let disponivel = procurar(tabuleiro)

        console.log("disponivel: "+disponivel[0])
        if (disponivel[0]) {
            inserirBloquear(tabuleiro, disponivel[1])
            // inserirBloquear(tabuleiro, tabuleiro[3][5])
        } else {
            removerDesbloquear(tabuleiro)
            // inserirRainha()
        }
        // inserirBloquear(tabuleiro, procurar(tabuleiro))
        
    }

gridCreate()

function reset() {
    initTabuleiro()
    borderCreate()
    gridCreate()

    rainhas = []
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
    ctx.save()
    console.log(rainhas)
}

// Função de atualizar a tela
    function update() {
        
        
    }
// Função que renderiza tabuleiro, bloqueios e rainhas
    function render() {
        // Tabuleiro
        ctx.clearRect(0, 0, WIDTH, HEIGHT)
        ctx.save()
        for (let row in tabuleiro) {
            for (let column in tabuleiro[row]) {
                let tile = tabuleiro[row][column].value

                if (tile === 1) {
                    let x = column*tileSize
                    let y = row*tileSize
                    ctx.fillRect(x, y, tileSize, tileSize)
                }
            }
        }

        // Rederiza os campos bloqueados
        for (let row = 0; row < tabuleiro.length; row++) {
            for (let column = 0; column < tabuleiro[row].length; column++) {
                laterais = (column == 0 || column == 9 || row == 0 || row == 9) 

                if (tabuleiro[row][column].status === 0 && !laterais) {
                    let x = tabuleiro[row][column].column
                    let y = tabuleiro[row][column].row

                    ctx.drawImage(
                        Bloqueado,
                        bloqueio.srcX, bloqueio.srcY, 512, 512,
                        x*(tileSize), y*(tileSize), bloqueio.width, bloqueio.height
                    ) 
                }    
            }  
        }
             
        // Renderiza as rainhas
        for (let i = 0; i < rainhas.length; i++) {
            // laterais = (column == 0 || column == 9 || row == 0 || row == 9) 

            
            let x = rainhas[i].column
            let y = rainhas[i].row

            ctx.drawImage(
                Rainha,
                rainha.srcX, rainha.srcY, spriteSize, spriteSize,
                x*(tileSize), y*(tileSize), rainha.width, rainha.height
            )     
        }
    }

// Faz com que o jogo continue iterando
    function loop() {
        update()
        render()
        requestAnimationFrame(loop, cnv)
    }


