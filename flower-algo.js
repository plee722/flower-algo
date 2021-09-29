
// You are given a square matrix with cells that contain empty strings, the letter W to represent walls, and the letter F to represent flowers.
// You can place a light source on any empty string and any flower but not on a wall. The light source extends vertically and horizontally
// until it hits a wall. Find the cell that extends the light to the most flowers (including the cell where the light source is placed if on a flower)
// and return its coordinates. If there are multiple cells with the highest number, return any one cell. If there are no flowers in the matrix, return any cell.

let example1 = 
[['', 'W', 'F', ''],
['W', '', '', 'F'],
['W', '', '', 'F'],
['', '', '', '']]
// Result for example1 is [0, 3] with a max of 3 flowers.

let example2 = 
[['F', '', 'F'],
['', 'W', ''],
['W', '', 'W'],]
// Result for example2 is any of [0, 0], [0, 1], and [0, 2] with a max of 2 flowers.

let example3 = 
[['', '', ''],
['W', '', 'W'],
['', 'W', ''],]
// Result for example3 is [0, 0] with a max of 0 flowers.

let example4 = 
[['F', 'F'],
['F', 'F']]
// Result for example4 is any of [0, 0], [0, 1], [1, 0], and [1, 1] with a max of 3 flowers.

let example5 = 
[['', 'W', 'F', '', '', ''],
['W', '', '', 'F', '', ''],
['W', '', '', 'F', '', ''],
['', '', 'F', 'W', '', ''],
['F', 'F', 'F', '', '', 'F'],
['F', 'W', 'F', '', 'F', 'F'],]
// Result for example5 is [4, 2] with a max of 7 flowers.

// Approach
// 1. Initialize an empty array for horizontal scores matrix and a n x n matrix filled with zeroes for vertical scores matrix. These will keep the flower scores of each cell by orientation.
// 2. Initialize maxFlowers count variable and empty array for coordinates that will be returned at end of function.
// 3. Loop through outer array and run the helper function on each row and push results into horizontal scores matrix.
// 4. Loop through outer array and initialize columnArr variable to place columns values into an array.
// 5. Loop through inner array and push values in same column into columnArr.
// 6. Run helper function on columnArr and then loop through return value, assigning each score into corresponding cell in vertical scores matrix.
// 7. Double loop through both scores matrices.
// 8. If larger than maxFlowers, assign maxFlowers to sum of horizontal and vertical scores matrix and assign coordinates variable to current coordinates.
// 9. Return coordinates variable. 


// Overall time complexity is reduced to O(n^2) time complexity. This comes from running nested loops. 
// Doing an initial loop and calling the helper function in each iteration also results in the same time complexity.
// Space complexity is reduced to O(n^2) from the vertical and horizontal matrix variables. 
function findOptimalLight(arr) {
    let horizontal = []
    let vertical = new Array(arr.length).fill(0).map(() => new Array(arr.length).fill(0))
    let maxFlowers = 0
    let coordinates = []
    
    for (let i = 0; i < arr.length; i++) {
        horizontal.push(computeRow(arr[i]))
    }

    for (let i = 0; i < arr.length; i++) {
        let columnArr = []
        for (let j = 0; j < arr.length; j++) {
            columnArr.push(arr[j][i])
        }
        let verticalScores = computeRow(columnArr)
        for (let k = 0; k < verticalScores.length; k++) {
            vertical[k][i] = verticalScores[k]
        }
    }

    for (let i = 0; i < horizontal.length; i++) {
        for (let j = 0; j < vertical.length; j++) {
            if (horizontal[i][j] + vertical[i][j] > maxFlowers) {
                maxFlowers = horizontal[i][j] + vertical[i][j]

                if (arr[i][j] === 'F') maxFlowers--
                coordinates = [i, j]
            }
        }
    }
    console.log(maxFlowers)
    return maxFlowers > 0 ? coordinates : [0, 0]
}

console.log(findOptimalLight(example1))
console.log(findOptimalLight(example2))
console.log(findOptimalLight(example3))
console.log(findOptimalLight(example4))
console.log(findOptimalLight(example5))


// Helper function to return array that includes flower counts per cell given an input array
// This function will be called in the original function on rows and columns to calculate values for count matrices. 

let helper1 = ['', 'W', 'F', 'F', '', 'W', 'F', '']
// Result for helper1 is [0, 0, 2, 2, 2, 0, 1, 1]

let helper2 = ['F', 'F', '', 'F']
// Result for helper2 is [3, 3, 3, 3]

let helper3 = ['', 'W', '', 'W', 'F']
// Result for helper3 is [0, 0, 0, 0, 1]

let helper4 = ['F', '', 'W']
// Result for helper4 is [1, 1, 0]


// Time complexity of this helper function is O(2n) which turns to O(n). Index i gets reassigned, so there is only one loop through arr.
// The second loop goes through the result array but on the same scope.
// Space complexity is O(n) where n is the length of the input array.
function computeRow(arr) {
    let count = 0
    let result = new Array(arr.length).fill(0)
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '' || arr[i] === 'F') {
            for (let j = i; j < arr.length; j++) {
                if (arr[j] === 'F') {
                    count++
                }
                if (arr[j] === 'W' || j === arr.length - 1) {
                    for (let k = i; k < j; k++) {
                        result[k] = count
                    }

                    if (j === arr.length - 1 && arr[j] !== 'W') {
                        result[arr.length - 1] = count
                    }

                    count = 0
                    i = j
                    break
                }
            }
        }
    }
    return result
}

// console.log(computeRow(helper1))
// console.log(computeRow(helper2))
// console.log(computeRow(helper3))
// console.log(computeRow(helper4))