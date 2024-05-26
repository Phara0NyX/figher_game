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
        document.querySelector('#tie').innerHTML = 'Tie'
    } else if(player.health > enemy.health){
        document.querySelector('#tie').innerHTML = 'Player 1 Win'
    } else if(player.health < enemy.health){
        document.querySelector('#tie').innerHTML = 'Player 2 Win'
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
    c.fillStyle = 'black'
    c.fillRect(0,0, canvas.width, canvas.height)
    background1.update()
    player.update()
    enemy.update()

    player.velocity.x= 0
    enemy.velocity.x= 0

    //player
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


     //enemy
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

//detect collisions
    if (
        rectangularCollision({
            rectangle1: player,
            rectangle2: enemy
        }) &&
        player.isAttacking===true && player.framesCurrent === 2
    ) {
        player.isAttacking = false
        enemy.health -= 20
        document.querySelector('#enemy_health_decreasing').style.width= enemy.health + '%'
        
    }

// if player misses
if(player.isAttacking && player.framesElapsed.Current === 4){
    player.isAttacking = false
}
// enemy  attack
    if (
        rectangularCollision({
            rectangle1: enemy,
            rectangle2: player
        }) &&
        enemy.isAttacking===true && enemy.framesCurrent === 2
    ) {
        enemy.isAttacking = false
        player.health -= 25
        document.querySelector('#player_health_decreasing').style.width= player.health + '%'
    }
    // end game based on health
    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({player, enemy, timerId})
    }
    //enemy miss
if(enemy.isAttacking && enemy.framesElapsed.Current === 4){
        enemy.isAttacking = false
}
}

animate()