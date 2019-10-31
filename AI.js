// 赢法数组
var wins = []

// 赢法种数
var count = 0

for (var i = 0; i < 15; i++) {
  wins[i] = []
  for (var j = 0; j < 15; j++) {
    wins[i][j] = []
  }
}

// 所有的横线的赢法
for (var i = 0; i < 15; i++) {
  for (var j = 0; j < 11; j++) {
    for (var k = 0; k < 5; k++) {
      wins[i][j + k][count] = true
    }
    count++
  }
}
// 所有的竖线的赢法
for (var i = 0; i < 15; i++) {
  for (var j = 0; j < 11; j++) {
    for (var k = 0; k < 5; k++) {
      wins[j + k][i][count] = true
    }
    count++
  }
}
// 所有的斜线的赢法
for (var i = 0; i < 11; i++) {
  for (var j = 0; j < 11; j++) {
    for (var k = 0; k < 5; k++) {
      wins[i + k][j + k][count] = true
    }
    count++
  }
}

// 所有的反斜线的赢法
for (var i = 0; i < 11; i++) {
  for (var j = 14; j > 3; j--) {
    for (var k = 0; k < 5; k++) {
      wins[i + k][j - k][count] = true
    }
    count++
  }
}

// 棋盘上每个点的落子情况
var chessBoard = []

for (var i = 0; i < 15; i++) {
  chessBoard[i] = []
  for (var j = 0; j < 15; j++) {
    chessBoard[i][j] = 0
  }
}

// 赢法的统计数组
var myWin = []
var computerWin = []

function computerAI() {
  var myScore = []
  var computerScore = []
  // 保存最高的分数
  var max = 0
  // 保存最高分数的坐标
  var u = 0
  var v = 0
  // 初始情况下 每一个落子点的分数都是0
  for (var i = 0; i < 15; i++) {
    myScore[i] = []
    computerScore[i] = []
    for (var j = 0; j < 15; j++) {
      myScore[i][j] = 0
      computerScore[i][j] = 0
    }
  }
  // 遍历每一个空闲的落子点 
  // 算出这个空闲点的每种赢法对应的分数值，然后累加
  for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 15; j++) {
      if (chessBoard[i][j] === 0) {
        for (var k = 0; k < count; k++) {
          if (wins[i][j][k]) {
            // 如果黑棋已经练成1子
            if (myWin[k] === 1) {
              myScore[i][j] += 200
            } else if (myWin[k] === 2) {
              // 如果黑棋已经练成2子
              myScore[i][j] += 400
            } else if (myWin[k] === 3) {
              myScore[i][j] += 2000
            } else if (myWin[k] === 4) {
              myScore[i][j] += 10000
            }
            // 如果计算机已经练成1子
            if (computerWin[k] === 1) {
              computerScore[i][j] += 220
            } else if (computerWin[k] === 2) {
              // 如果计算机已经练成2子
              computerScore[i][j] += 420
            } else if (computerWin[k] === 3) {
              computerScore[i][j] += 2100
            } else if (computerWin[k] === 4) {
              computerScore[i][j] += 20000
            }
          }
        }
        if (myScore[i][j] > max) {
          max = myScore[i][j]
          u = i
          v = j
        } else if (myScore[i][j] === max) {
          if (computerScore[i][j] > computerScore[u][v]) {
            u = i
            v = j
          }
        }
        if (computerScore[i][j] > max) {
          max = computerScore[i][j]
          u = i
          v = j
        } else if (computerScore[i][j] === max) {
          if (myScore[i][j] > myScore[u][v]) {
            u = i
            v = j
          }
        }
      }
    }
  }
  oneStep(u, v, false)
  chessBoard[u][v] = 2
  for (var k = 0; k < count; k++) {
    if (wins[u][v][k]) {
      computerWin[k]++
      myWin[k] = 999
      if (computerWin[k] === 5) {
        alert('计算机赢了')
        over = true
      }
    }
  }
  if (!over) {
    me = !me
  }
}
