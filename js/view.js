
// 这个文件负责处理界面


/**
 * 创建一个棋盘
 */
function createChessBoard(GameConfig, ChessType) {
  var chessBoard = new Array(GameConfig.rows)
  for (var i = 0; i < GameConfig.rows; i++) {
    chessBoard[i] = new Array(GameConfig.cols).fill(ChessType.NULL)
  }
  return chessBoard
}

/**
 * 将棋盘显示到界面
 * @param {*} chessBoard 棋盘
 */
function mapChessBoardToView(GameConfig, chessBoard) {
  for (var i = 0; i < chessBoard.length; i++) {
    for (var j = 0; j < chessBoard[i].length; j++) {
      var div = document.createElement('div')
      div.classList.add('chess-blank')
      if ((i + j) % 2 === 0) {
        div.classList.add('light-color')
      } else {
        div.classList.add('deep-color')
      }
      GameConfig.chessBoardDom.appendChild(div)
    }
  }
}

/**
 * 是对上面两个函数的高级封装
 * 创建棋盘，并将棋盘显示到界面上，然后将这个棋盘上所有的格子封装成二维数组返回
 * @param {*} gameConfig 配置对象
 */
function showChessBoard(GameConfig, ChessType) {
  return mapChessBoardToView(GameConfig, createChessBoard(GameConfig, ChessType))
}

/**
 * 销毁棋盘
 */
function removeChessBoard(GameConfig) {
  GameConfig.chessBoardDom.innerHTML = ''
}


/**
 * 添加一个棋子到棋子数组中
 * @param {*} chessArr 
 * @param {*} x 
 * @param {*} y 
 */
function pushChess(GameConfig, ChessType, GameData, x, y) { 
  if (x < 0 || x >= GameConfig.rows) {
    return false
  }
  if (y < 0 || y >= GameConfig.cols) {
    return false
  }

  if (GameData.chessArr[x][y] === ChessType.NULL) {
    GameData.chessArr[x][y] = GameData.nextChess
    GameData.nextChess = GameData.nextChess === ChessType.BLACK ? ChessType.WHITE : ChessType.BLACK
    return true
  }
  return false
}

/**
 * 将棋子数组映射到界面上
 * @param {*} chessArr 
 */
function mapChessArrToView(GameConfig, ChessType, GameData) {
  var blanks = Array.from(GameConfig.chessBoardDom.children)
  var { chessArr } = GameData
  var chessArr = chessArr.flat()
  for (var i = 0; i < blanks.length; i++) {
    if (blanks[i].children.length)  continue
    if (chessArr[i] !== ChessType.NULL) {
      var chess = document.createElement('div')
      var type = chessArr[i] === ChessType.BLACK ? 'black' : 'white'
      chess.classList.add('chess', type + '-chess')
      blanks[i].appendChild(chess)
    }
  }
}

/**
 * 是上两个函数的高级封装
 * 给顶一个坐标，如果这个坐标为空，则添加棋子同时在页面上显示
 * @param {*} chessArr 
 * @param {*} x 
 * @param {*} y 
 */
function showChess(GameConfig, ChessType, GameData, x, y) {
  var { nextChess } = GameData
  if (pushChess(GameConfig, ChessType, GameData, y, x)) {
    mapChessArrToView(GameConfig, ChessType, GameData)
    showRound(GameConfig, ChessType, GameData)
    return true
  }
  return false
}


/**
 * 将当前回合的棋子类型显示到界面
 */
function showRound(GameConfig, ChessType, GameData) {
  var { nextChess } = GameData
  var roundDom = GameConfig.roundChess
  if (nextChess === ChessType.BLACK) {
    roundDom.classList.remove('round-chess-white')
    roundDom.classList.add('round-chess-black')
  } else {
    roundDom.classList.remove('round-chess-black')
    roundDom.classList.add('round-chess-white')
  }
}


// 时间组件
function showTime(GameConfig) {
  setInterval(function () {
    GameConfig.curTimeDom.innerHTML = new Date().toLocaleTimeString()
  }, 1000)
}


/**
 * 显示菜单
 * @param {*} GameConfig 
 */
function showMenu(GameConfig) {
  GameConfig.gameMenuContentDom.classList.remove('remove')
}

/**
 * 移除菜单
 * @param {*} GameConfig 
 */
function removeMenu(GameConfig) {
  GameConfig.gameMenuContentDom.classList.add('remove')
}

/**
 * 移除遮罩层
 * @param {}} params 
 */
function removMasklayer(GameConfig) {
  GameConfig.gameMenuDom.classList.add('remove')  
}

/**
 * 显示添加玩家框
 * @param {*} GameConfig 
 */
function showAddPerson(GameConfig) {
  GameConfig.gameMenuContentDom.classList.add('remove')
  GameConfig.playerDom.classList.add('show')
}

/**
 * 移除添加玩家框
 * @param {*} GameConfig 
 */
function removeAddPerson(GameConfig) {
  GameConfig.playerDom.classList.remove('show')
}

/**
 * 显示玩家信息
 * @param {*} GameConfig 
 */
function showPersonMsg(GameConfig) {
  GameConfig.gameMenuContentDom.classList.add('remove')
  GameConfig.msgDom.classList.add('show')
}

function removePersonMsg(GameConfig) {
  GameConfig.msgDom.classList.remove('show')
}
