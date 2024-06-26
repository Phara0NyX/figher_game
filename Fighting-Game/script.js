const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

//canvas possiamo considerarlo un greeenscreen il quale in un gioco molto movimentato mi aiuta a rendere piu' facile la rappresentazione grafica degli Sprites
//e mi permette di rendere piu' fluide le animazioni


canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.3

const background1 = new Sprite({
    position: {
        x: 0,
        y: -400
    },
    imageSrc: './Graphic/sfondo1.png'
})

const player = new Fighter({
    position: {
        x: 100,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    },
    imageSrc: './Graphic/character/Assassin/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 255,
        y: 190,
    },
// per facilitare la scelta delle immagini creo un oggetto che contiene al suo interno ogni animazione con ognuna il suo numero di frame, 
//    questo mi aiuta a sceglere il movimento di cui ho bisogno grazie a una proprieta' di scelta all'interno della classe che crea il personaggio
    sprites: {
        idle: {
            imageSrc: './Graphic/character/Assassin/Idle.png',
            framesMax: 8,
        },
        run: {
            imageSrc: './Graphic/character/Assassin/Run.png',
            framesMax: 3,
            image: new Image()
        },
        jump: {
            imageSrc: './Graphic/character/Assassin/Jump.png',
            framesMax: 3,
            image: new Image()
        },
        fall: {
            imageSrc: './Graphic/character/Assassin/Fall.png',
            framesMax: 3,
            image: new Image()
        },
        attack1: {
            imageSrc: './Graphic/character/Assassin/Attack1.png',
            framesMax: 5,
            image: new Image()
        },
        hit: {
            imageSrc: './Graphic/character/Assassin/Hit.png',
            framesMax: 6,
            image: new Image()
        },
        death: {
            imageSrc: './Graphic/character/Assassin/Death.png',
            framesMax: 9,
            image: new Image()
        }
    },
    attackBox: {
        offset: {
            x: 75,
            y: 10,
        },
        width: 160,
        height: 50
    }
})

const enemy = new Fighter({
    position: {
        x: 750,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset:{
        x: 0,
        y: 0
    },
    imageSrc: './Graphic/character/NightBorne/Idle.png',
    framesMax: 9,
    scale: 3.5,
    offset: {
        x: 100,
        y: 93,
    },
    sprites: {
        idle: {
            imageSrc: './Graphic/character/NightBorne/Idle.png',
            framesMax: 9,
        },
        run: {
            imageSrc: './Graphic/character/NightBorne/Run.png',
            framesMax: 6,
            image: new Image()
        },
        jump: {
            imageSrc: './Graphic/character/NightBorne/Jump.png',
            framesMax: 2,
            image: new Image()
        },
        fall: {
            imageSrc: './Graphic/character/NightBorne/Fall.png',
            framesMax: 2,
            image: new Image()
        },
        attack1: {
            imageSrc: './Graphic/character/NightBorne/Attack1.png',
            framesMax: 6,
            image: new Image()
        },
        hit: {
            imageSrc: './Graphic/character/NightBorne/Hit.png',
            framesMax: 5,
            image: new Image()
        },
        death: {
            imageSrc: './Graphic/character/NightBorne/Death.png',
            framesMax: 23,
            image: new Image()
        }
    },
    attackBox: {
        offset: {
            x: -160,
            y: 10,
        },
        width: 160,
        height: 50
    }
}
)

console.log(player)

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },

}


decreaseTimer()



window.addEventListener('keydown', (event) => {
    if(!player.dead) {

    
    switch (event.key) {
//player
        case 'd':
            keys.d.pressed = true 
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true 
            player.lastKey = 'a'
            break
        case 'w':
            if((player.position.y + player.height) >= canvas.height) {
                player.velocity.y = -13
            }  
            break
        case ' ':
            player.attack()
            break
        }
    }
    if(!enemy.dead) {
        switch(event.key){
        //enemy
            case 'ArrowRight':
                keys.ArrowRight.pressed = true 
                enemy.lastKey = 'ArrowRight'
                break
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true 
                enemy.lastKey = 'ArrowLeft'
                break
            case 'ArrowUp':
                if((enemy.position.y + enemy.height) >= canvas.height) {
                    enemy.velocity.y = -13
                }
                break
            case 'ArrowDown':
                enemy.attack()
                break
        }
    }

})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
//player
        case 'd':
            keys.d.pressed = false
            break 
        case 'a':
            keys.a.pressed = false 
            break
// enemy
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break 
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false 
            break
    }

})