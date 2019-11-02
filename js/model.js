// 这个文件负责生成数据模型

/**
 * 创建一个棋子数组
 * @param {*} GameConfig 
 * @param {*} ChessType 
 */
function createChessArr(GameConfig, ChessType) {
  var chessArr = []
  for (var i = 0; i < GameConfig.rows; i++) {
    chessArr[i] = []
    for (var j = 0; j < GameConfig.cols; j++) {
      chessArr[i][j] = ChessType.NULL
    }
  }
  return chessArr
}

/**
 * 初始化赢法数组
 * @param {*} GameConfig 
 */
function fillWins(GameConfig) {
  var count = 0
  var wins = []
  for (var i = 0; i < GameConfig.rows; i++) {
    wins[i] = []
    for (var j = 0; j < GameConfig.cols; j++) {
      wins[i][j] = []
    }
  }
  for (var i = 0; i < GameConfig.rows; i++) {
    for (var j = 0; j < GameConfig.cols - 4; j++) {
      for (var k = 0; k < 5; k++) {
        wins[i][j + k][count] = true
      }
      count++
    }
  }
  for (var i = 0; i < GameConfig.rows; i++) {
    for (var j = 0; j < GameConfig.cols - 4; j++) {
      for (var k = 0; k < 5; k++) {
        wins[j + k][i][count] = true
      }
      count++
    }
  }
  for (var i = 0; i < GameConfig.rows - 4; i++) {
    for (var j = 0; j < GameConfig.cols - 4; j++) {
      for (var k = 0; k < 5; k++) {
        wins[i + k][j + k][count] = true
      }
      count++
    }
  }
  for (var i = 0; i < GameConfig.rows - 4; i++) {
    for (var j = GameConfig.cols - 1; j > GameConfig.cols - 12; j--) {
      for (var k = 0; k < 5; k++) {
        wins[i + k][j - k][count] = true
      }
      count++
    }
  }
  return { wins, count }
}

/**
 * 初始化赢法统计数组
 * @param {*} GameConfig 
 */
function initMyWinAndComputerWin(GameConfig) {
  var myWin = []
  var computerWin = []
  for (var i = 0; i < GameConfig.count; i++) {
    myWin[i] = 0
    computerWin[i] = 0
  }
  return { myWin, computerWin }
}


