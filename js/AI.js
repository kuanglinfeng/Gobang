
/**
 * 获取评估分最高的点
 * @param {*} wins 
 * @param {*} myWin 
 * @param {*} computerWin 
 */
function getBestPoint(GameData) {
  var { wins, count, myWin, computerWin, chessArr } = GameData
  var myScore = []
  var computerScore = []
  var max = 0
  var u = 0, v = 0
  for (var i = 0; i < 15; i++) {
    myScore[i] = []
    computerScore[i] = []
    for (var j = 0; j < 15; j++) {
      myScore[i][j] = 0
      computerScore[i][j] = 0
    }
  }
  for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 15; j++) {
      if (chessArr[j][i] == 0) {

        for (var k = 0; k < count; k++) {
          if (wins[i][j][k]) {
            if (myWin[k] == 1) {
              myScore[i][j] += 200
            } else if (myWin[k] == 2) {
              myScore[i][j] += 400
            } else if (myWin[k] == 3) {
              myScore[i][j] += 2000
            } else if (myWin[k] == 4) {
              myScore[i][j] += 10000
            }
            if (computerWin[k] == 1) {
              computerScore[i][j] += 220
            } else if (computerWin[k] == 2) {
              computerScore[i][j] += 420
            } else if (computerWin[k] == 3) {
              computerScore[i][j] += 2100
            } else if (computerWin[k] == 4) {
              computerScore[i][j] += 20000
            }
          }
        }
        if (myScore[i][j] > max) {
          max = myScore[i][j]
          u = i
          v = j
        } else if (myScore[i][j] == max) {
          if (computerScore[i][j] > computerScore[u][v]) {
            u = i
            v = j
          }
        }
        if (computerScore[i][j] > max) {
          max = computerScore[i][j]
          u = i
          v = j
        } else if (computerScore[i][j] == max) {
          if (myScore[i][j] > myScore[u][v]) {
            u = i
            v = j
          }
        }
      }
    }
  }
  return { bestX: u, bestY: v }
}


