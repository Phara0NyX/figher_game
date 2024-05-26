class Sprite {
    constructor({ position, imageSrc, scale=1, framesMax = 1, offset = {x: 0, y: 0} }) {
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 20
        this.offset = offset
    }
    draw () {
        c.drawImage(
//visto che gli sprite presentano molto spazio vuoto e la figura principale si trova al centro, abbiamo utilizzato un offset per spostare
//la rappresetazione dell'immagine in un punto piu' facile da tenere d'occhio per le hitbox di armi e di giocatori
            this.image, 
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x, 
            this.position.y - this.offset.y, 
            (this.image.width / this.framesMax) * this.scale, 
            this.image.height * this.scale
            )
    }

    animateFrames(){
        this.framesElapsed++
        if(this.framesElapsed % this.framesHold === 0){
            if(this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++
            } else {
            this.framesCurrent = 0
            }
        }
    }

    update () {
        this.draw()
        this.animateFrames()
    }        
}

class Fighter extends Sprite {
    constructor({
        position, 
        velocity, 
        color = 'red',
        imageSrc, 
        scale=1, 
        framesMax = 1, 
        offset = {x: 0, y: 0},
        sprites,
        attackBox = {offset:{}, width: undefined, height: undefined}
    }) {
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset,
        })

        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height,
        }
        this.color = color
        this.isAttacking = false
        this.health = 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 20
        this.sprites = sprites
        this.dead = false
// qui prendo ogni animazione all'interno dell'oggetto sprites che riutilizzero' dopo
        for( const sprite in this.sprites){
            sprites [sprite].image = new Image()
            sprites [sprite].image.src = sprites [sprite].imageSrc
        }
    }

    update () {
        this.draw()
        if(!this.dead) this.animateFrames()
        



        //attackbox
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y
        

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
//gravita'
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
            this.position.y = 426
        } else this.velocity.y += gravity
        }
    attack() {
        this.switchSprite('attack1')
        this.isAttacking = true
        
    }

    hit() {
        this.health -= 20

        if (this.health <= 0) {
            this.switchSprite('death')
        } else this.switchSprite('hit')
    }
    
    switchSprite(sprite) {

        if (this.image === this.sprites.death.image) {
            if(this.framesCurrent === this.sprites.death.framesMax -1 )
            this.dead = true
            return
        }
               

        if (
            this.image === this.sprites.attack1.image && 
            this.framesCurrent < this.sprites.attack1.framesMax -1) 
            return

        if (
            this.image === this.sprites.hit.image && 
            this.framesCurrent < this.sprites.hit.framesMax -1) 
            return

        switch(sprite) {
            case 'idle':
                if(this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image
                    this.framesMax = this.sprites.idle.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'run':
                if(this.image !== this.sprites.run.image) {
                    this.image = this.sprites.run.image
                    this.framesMax = this.sprites.run.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'jump':
                if(this.image !== this.sprites.jump.image) {
                this.image = this.sprites.jump.image
                this.framesMax = this.sprites.jump.framesMax
                this.framesCurrent = 0
                }
                break
            case 'fall':
                if(this.image !== this.sprites.fall.image) {
                this.image = this.sprites.fall.image
                this.framesMax = this.sprites.fall.framesMax
                this.framesCurrent = 0
                }
                break
            case 'attack1':
                if(this.image !== this.sprites.attack1.image) {
                this.image = this.sprites.attack1.image
                this.framesMax = this.sprites.attack1.framesMax
                this.framesCurrent = 0
                }
                break
            case 'hit':
                if(this.image !== this.sprites.hit.image) {
                    this.image = this.sprites.hit.image
                    this.framesMax = this.sprites.hit.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'death':
                if(this.image !== this.sprites.death.image) {
                    this.image = this.sprites.death.image
                    this.framesMax = this.sprites.death.framesMax
                    this.framesCurrent = 0
                }
                break
    }
}
}
