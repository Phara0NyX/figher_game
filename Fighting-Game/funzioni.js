function rectangularCollision ({rectangle1, rectangle2}) {
    return(
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && 
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width && 
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y && 
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height 
    )
}

function determineWinner({player,enemy, timerId}) {
    clearTimeout(timerId)
    document.querySelector('#tie').style.display = 'flex'
    if (player.health === enemy.health){
        document.querySelector('#tie').innerHTML = 'Pareggio'
    } else if(player.health > enemy.health){
        document.querySelector('#tie').innerHTML = 'Giocatore 1 Vince'
    } else if(player.health < enemy.health){
        document.querySelector('#tie').innerHTML = 'Giocatore 2 Vince'
    }
}

let timer = 60
let timerId
function decreaseTimer(){
    if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000)
        timer--
        document.querySelector('#timer').innerHTML = timer
    }
    if (timer === 0) {
        determineWinner({player, enemy, timerId})
    }   
}

function animate () {
    window. requestAnimationFrame(animate)
//    c.fillStyle = 'black'
//    c.fillRect(0,0, canvas.width, canvas.height)
    background1.update()
    player.update()
    enemy.update()
    console.log(player.position.x, player.position.y, enemy.position.x, enemy.position.y)

    player.velocity.x= 0
    enemy.velocity.x= 0

    //player
// visto che il movimento basato su condizioni di vero e falso blocccava il personaggio in caso di pressione di 2 tasti contemporaneamente
// abbiamo optato per una variabile contenente l'ultimo tasto schiacciato a cui viene data la priorita'

    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -3
        player.switchSprite('run')
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 3
        player.switchSprite('run')
    }else{
        player.switchSprite('idle')
    }

    if(player.velocity.y < 0){
        player.switchSprite('jump')
    }else if (player.velocity.y > 0){
        player.switchSprite('fall')
    }


     //nemico
     if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -3
        enemy.switchSprite('run')
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 3
        enemy.switchSprite('run')
    }else{
        enemy.switchSprite('idle')
    }


    if(player.velocity.y < 0){
        player.switchSprite('jump')
    }else if (player.velocity.y > 0){
        player.switchSprite('fall')
    }

//definisci contatto
    // attacco giocatore
    if (
        rectangularCollision({
            rectangle1: player,
            rectangle2: enemy
        }) &&
        player.isAttacking===true && player.framesCurrent === 2
    ) {
        enemy.hit()
        player.isAttacking = false
        
        document.querySelector('#enemy_health_decreasing').style.width= enemy.health + '%'
        
    }

// se il player sbaglia
if(player.isAttacking && player.framesElapsed.Current === 2){
    player.isAttacking = false
}
// attacco nemico
    if (
        rectangularCollision({
            rectangle1: enemy,
            rectangle2: player
        }) &&
        enemy.isAttacking===true && enemy.framesCurrent === 2
    ) {
        player.hit()
        enemy.isAttacking = false
        
        document.querySelector('#player_health_decreasing').style.width= player.health + '%'
    }
// in caso il timer scada
    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({player, enemy, timerId})
    }
    // se il nemico sbaglia
if(enemy.isAttacking && enemy.framesElapsed.Current === 2){
        enemy.isAttacking = false
}
}

animate()