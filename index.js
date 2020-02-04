// elements
let elementsArray = []
let iteratorNum = 0

// handling the buttons that create each element
let creationButtons = document.querySelector('.makingButtons').addEventListener('click', (ev) => {
    if (ev.target.className === 'Hydrogen') {
        let hydrogenDiv = document.createElement('div')
        hydrogenDiv.className = 'hydrogenElement '
        hydrogenDiv.id = `${iteratorNum}`
        document.querySelector('.elementsPlacement').appendChild(hydrogenDiv)
        elementsArray.push({
            id: `${iteratorNum}`,
            bonds: 0,
            bondsLimit: 1,
            currentX: 0,
            currentY: 0
        })
        iteratorNum++
    } else if (ev.target.className === 'Oxygen') {
        let oxygenDiv = document.createElement('div')
        oxygenDiv.className = 'oxygenElement ' 
        oxygenDiv.id = `${iteratorNum}`
        document.querySelector('.elementsPlacement').appendChild(oxygenDiv)
        elementsArray.push({
            id: `${iteratorNum}`,
            bonds: 0,
            bondsLimit: 2,
            currentX: 0,
            currentY: 0
        })
        iteratorNum++
    } else if (ev.target.className === 'Nitrogen') {
        let nitrogenDiv = document.createElement('div')
        nitrogenDiv.className = 'nitrogenElement ' 
        nitrogenDiv.id = `${iteratorNum}`
        document.querySelector('.elementsPlacement').appendChild(nitrogenDiv)
        elementsArray.push({
            id: `${iteratorNum}`,
            bonds: 0,
            bondsLimit: 3,
            currentX: 0,
            currentY: 0
        })
        iteratorNum++
    } else if (ev.target.className === 'Carbon') {
        let carbonDiv = document.createElement('div')
        carbonDiv.className = 'carbonElement '
        carbonDiv.id =  `${iteratorNum}`
        document.querySelector('.elementsPlacement').appendChild(carbonDiv)
        elementsArray.push({
            id: `${iteratorNum}`,
            bonds: 0,
            bondsLimit: 4,
            currentX: 0,
            currentY: 0
        })
        iteratorNum++
    }
})

// THIS PART HANDLES MAKING EACH OF THE ELEMENTS MOVE

// element clicked for movement
let elementName = ''

// set the position of the moving client
let currX = 0
let currY = 0


// making the elements able to move
document.addEventListener('mousedown', (ev) => {
    elementName = ev.target.id
    if (elementName) {
        document.addEventListener('mousemove', (ev) => {
            currX = ev.clientX
            currY = ev.clientY
        })
        // interval that sets the current elements coordinates equal to the mouse coordinates every 100 miliseconds
        let moveTheTarget = setInterval(() => {
            document.getElementById(`${elementName}`).style.left = currX + 'px'
            document.getElementById(`${elementName}`).style.top = currY + 'px'
        }, 100)   
           
        // clears the interval so element stops moving, and sets the target to '' so next element can be selected
        document.addEventListener('mouseup', (e) => {
            elementsArray.forEach((ele, index) => {
                if (ele.id === elementName) {
                    ele.currentX = currX
                    ele.currentY = currY 
                }
                if (ele.id !== elementName) {
                    if ((Math.abs(ele.currentX-currX)) < 70 && (Math.abs(ele.currentY-currY)) < 70) {
                        if (ele.bonds < ele.bondsLimit) {
                            drawLine(elementName, ele.id)
                            ele.bonds
                            elementsArray.forEach((ele, index) => {
                                if (ele.id === elementName) {
                                    ele.bonds
                                }
                            })
                        }
                    }
                }
            })
            clearInterval(moveTheTarget)
        })
    }
})

// END OF MOVEMENT SECTION

// START OF EDGE DETECTION SECTION

// the function for drawing a line between any two points... pass in id of element
let drawLine = (atom1, atom2) => {
    // grab the x and y coordinates for each of the two divs
    let x1 = document.getElementById(`${atom1}`).getBoundingClientRect().right + 15
    let y1 = document.getElementById(`${atom1}`).getBoundingClientRect().top + 20
    let x2 = document.getElementById(`${atom2}`).getBoundingClientRect().right + 15
    let y2 = document.getElementById(`${atom2}`).getBoundingClientRect().top + 20

    console.log('x1: ', x1)
    console.log('x2: ', x2)
    console.log('y1: ', y1)
    console.log('y2: ', y2)

    // solve for distance between the two center points for the divs
    let lineLength = Math.sqrt(((x2-x1)**2)+((y2-y1)**2))

    // solve the angle between the two center points to transform the line to
    let lineAngle = Math.atan2((y2-y1), (x2-x1))*(180/Math.PI)

    let lineDiv = document.createElement('div')
    lineDiv.className = 'lineDivClass'
    lineDiv.id = `${x1}${x2}`
    document.querySelector('.elementsPlacement').appendChild(lineDiv)
    document.getElementById(`${x1}${x2}`).style.width = `${lineLength}px`
    document.getElementById(`${x1}${x2}`).style.transform = `rotate(${lineAngle}deg)`
    console.log('rotation is: ', lineAngle)
    // introducing cases for placement of the lines
    if (x2 > x1 && y2 > y1) {
        console.log('case 1')
        // down a little to left lot
        document.getElementById(`${x1}${x2}`).style.left = (x1-50) + 'px'
        document.getElementById(`${x1}${x2}`).style.top = (y1+16) + 'px'
    } else if (x1 > x2 && y2 > y1) {
        console.log('case 2')
        // down, left a little
        document.getElementById(`${x1}${x2}`).style.left = (x1-80) + 'px'
        document.getElementById(`${x1}${x2}`).style.top = (y1+15) + 'px'
    } else if (x1 > x2 && y1 > y2) {
        console.log('case 3')
        // up a little and to right little
        document.getElementById(`${x1}${x2}`).style.left = (x1-85) + 'px'
        document.getElementById(`${x1}${x2}`).style.top = (y1-15) + 'px'
    } else if (x2 > x1 && y1 > y2) {
        // down a little
        document.getElementById(`${x1}${x2}`).style.left = (x1-50) + 'px'
        document.getElementById(`${x1}${x2}`).style.top = (y1-20) + 'px'
        console.log('case 4')
    }
}


