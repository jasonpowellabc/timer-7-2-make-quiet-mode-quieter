function incrementSoundLevel () {
    soundLevel += 1
    if (soundLevel > 1) {
        soundLevel = 0
        music.setVolume(32)
    } else {
        music.setVolume(127)
    }
}
input.onButtonPressed(Button.A, function () {
    if (started == false) {
        if (remember == true) {
            // Just this once'remember' last option & don't increment...
            remember = false
        } else if (firstRun == true) {
            firstRun = false
            menu = 3
        } else {
            menu += 1
            if (menu > 6) {
                menu = 1
            }
        }
        basic.showNumber(menu)
    } else {
        resetCount += 1
        if (resetCount >= 3) {
            control.reset()
        }
    }
})
input.onButtonPressed(Button.AB, function () {
    if (started == false) {
        LightMode = true
        started = true
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
        for (let index2 = 0; index2 < 6; index2++) {
            basic.pause(300000)
            music.playTone(262, music.beat(BeatFraction.Sixteenth))
        }
        basic.pause(1000)
        music.playTone(262, music.beat(BeatFraction.Sixteenth))
        control.reset()
    }
})
function setLEDS () {
    basic.clearScreen()
    timeLeft5min = minutesLeft / 5 - 1
    timeLeft1min = minutesLeft % 5 - 1
    for (let y = 0; y <= timeLeft5min; y++) {
        for (let z = 0; z <= 4; z++) {
            led.plotBrightness(z, y, 8)
        }
    }
    if (minutesLeft <= 25) {
        for (let a = 0; a <= timeLeft1min; a++) {
            led.plotBrightness(a, timeLeft5min + 1, 8)
        }
    } else if (minutesLeft >= 26 && minutesLeft <= 30) {
        if (minutesLeft == 30) {
            timeLeft1min = 4
        }
        led.plotBrightness(timeLeft1min, 4, 255)
    }
    // Show quiet mode by setting LED 0,0 brighter
    if (soundLevel == 0) {
        led.plotBrightness(0, 0, 255)
    }
}
input.onButtonPressed(Button.B, function () {
    if (started == false && menu >= 1) {
        started = true
        for (let item2 = 0; item2 <= menu * 5 - 1; item2++) {
            minutesLeft = menu * 5 - item2
            setLEDS()
            if (minutesLeft % 5 == 0 && minutesLeft != 0 && minutesLeft != menu * 5) {
                music.playTone(262, music.beat(BeatFraction.Sixteenth))
            }
            basic.pause(interval * 1000)
        }
        if (soundLevel == 1) {
            music.startMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once)
        } else {
            music.playTone(262, music.beat(BeatFraction.Sixteenth))
            basic.pause(1000)
            music.playTone(262, music.beat(BeatFraction.Sixteenth))
        }
        remember = true
        basic.clearScreen()
        started = false
    } else if (started == false) {
        incrementSoundLevel()
        if (soundLevel == 0) {
            basic.showString("Q")
        } else if (soundLevel == 1) {
            basic.showString("B")
        }
    }
})
input.onGesture(Gesture.Shake, function () {
    if (started == true && LightMode == false) {
        incrementSoundLevel()
        if (soundLevel == 0) {
            led.plotBrightness(0, 0, 255)
        } else if (soundLevel == 1) {
            led.plotBrightness(0, 0, 8)
        }
    }
})
let timeLeft1min = 0
let minutesLeft = 0
let timeLeft5min = 0
let resetCount = 0
let menu = 0
let remember = false
let LightMode = false
let soundLevel = 0
let interval = 0
let started = false
let firstRun = false
firstRun = true
let x = 0
let index = 0
let item = 0
started = false
interval = 1
soundLevel = 1
LightMode = false
remember = false
music.playTone(262, music.beat(BeatFraction.Sixteenth))
