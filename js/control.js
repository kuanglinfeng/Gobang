/**
 * 获取点击棋格子的横纵坐标
 * @param {*} target 
 */
function getBlankPosition(GameConfig, target) {
  var blanks = Array.from(GameConfig.chessBoardDom.children)
  var index = blanks.findIndex(item => item === target)
  var x = index % 15
  var y = Math.floor(index / 15)
  return { x, y }
}

/**
 * 判断是否有一方取胜
 * @param {*} wins 
 * @param {*} count 
 * @param {*} x 
 * @param {*} y 
 * @param {*} myWin 
 * @param {*} computerWin 
 */
function judgeWin(GameData, ChessType, x, y) {
  var { wins, count, nextChess } = GameData
  for (var k = 0; k < count; k++) {
    if (wins[x][y][k]) {
      if (nextChess === ChessType.WHITE) {
        GameData.myWin[k]++
        GameData.computerWin[k] = 6
        if (GameData.myWin[k] === 5) {
          return ChessType.BLACK
        }
      }
      if (nextChess === ChessType.BLACK) {
        GameData.computerWin[k]++
        GameData.myWin[k] = 6
        if (GameData.computerWin[k] === 5) {
          return ChessType.WHITE
        }
      }
    }
  }
  return null
}


/**
 * 这个函数处理人落下棋子的显示及更新棋子数组，同时处理落下后，判断游戏状态
 */
function personFallingChess(GameConfig, ChessType, GameData, targetBlank) {

  if (!GameData.isOver) {
    var { x, y } = getBlankPosition(GameConfig, targetBlank)
    if (showChess(GameConfig, ChessType, GameData, x, y)) {
      var person = judgeWin(GameData, ChessType, x, y)
      if (person) {
        if (person === ChessType.BLACK) {
          var msg = '恭喜，你赢了！'
          addUserWin()
        } else {
          var msg = '抱歉，你输了！'
          addUserFail()
        }
        alert(msg)
        GameData.isOver = true
      }
    }
  }
}

/**
 * 这个函数处理ai落下棋子的显示及更新棋子数组，同时处理落下后，判断游戏状态
 */
function aiFallingChess(GameConfig, ChessType, GameData) {
  if (!GameData.isOver) {
    var { bestX, bestY } = getBestPoint(GameData)
    showChess(GameConfig, ChessType, GameData, bestX, bestY)
    var person = judgeWin(GameData, ChessType, bestX, bestY)
    if (person) {
      if (person === ChessType.BLACK) {
        var msg = '恭喜，你赢了！'
        addUserWin()
      } else {
        var msg = '抱歉，你输了！'
        addUserFail()
      }
      alert(msg)
      GameData.isOver = true
    }
  }
}


function registerEvents(GameConfig, ChessType, GameData) {
  GameConfig.chessBoardDom.onclick = function (e) {
    if (!GameData.AI) {
      personFallingChess(GameConfig, ChessType, GameData, e.target)
    } else {
      personFallingChess(GameConfig, ChessType, GameData, e.target)
      aiFallingChess(GameConfig, ChessType, GameData)
    }
  }
  GameConfig.resetDom.onclick = function () {
    init()
    showMasklayerAndMenu(GameConfig)
  }
  // A 人机对战
  GameConfig.personAiDom.onclick = function () {
    removMasklayer(GameConfig)
    removeMenu(GameConfig)
    GameData.AI = true
  }
  // B 双人对战
  GameConfig.doublePersonDom.onclick = function () {
    removMasklayer(GameConfig)
    removeMenu(GameConfig)
    GameData.AI = false
  }
  // C 玩家信息
  GameConfig.personMsgDom.onclick = function () {
    removeMenu(GameConfig)
    // 从localStorage中加载数据并显示
    showPersonMsg(GameConfig)
  }
  GameConfig.closeMsgDom.onclick = function () {
    removePersonMsg(GameConfig)
    showMenu(GameConfig)
  }
  // D 添加玩家
  GameConfig.addPersonDom.onclick = function () {
    showAddPerson(GameConfig)
  }
  GameConfig.savePlayerDom.onclick = function () {
    savePlayer(GameConfig)
    removeAddPerson(GameConfig)
    showMenu(GameConfig)
    clearPersonInputValue(GameConfig)
  }
  GameConfig.closePlayerDom.onclick = function () {
    removeAddPerson(GameConfig)
    showMenu(GameConfig)
  }
  GameConfig.closePlayerSpanDom.onclick = function () {
    removeAddPerson(GameConfig)
    showMenu(GameConfig)
  }

}

function removeEvents(gameConfig) {
  gameConfig.chessBoardDom.onclick = null
  gameConfig.resetDom.onclick = null
}



