
function init() {

  // 游戏配置
  var GameConfig = {
    rows: 15,
    cols: 15,
    chessBoardDom: document.querySelector('.chess-board'),
    roundChess: document.querySelector('.round-chess'),
    curTimeDom: document.querySelector('.cur-time'),
    resetDom: document.querySelector('.reset'),
    gameMenuDom: document.querySelector('.game-menu'),
    gameMenuContentDom: document.querySelector('.menu-content'),
    personAiDom: document.querySelector('.person-ai'),
    doublePersonDom: document.querySelector('.double-person'),
    personMsgDom: document.querySelector('.person-msg'),
    addPersonDom: document.querySelector('.add-person'),
    playerDom: document.querySelector('.player'),
    inputPlayerDom: document.querySelector('.player-body input'),
    savePlayerDom: document.querySelector('.player-footer .save'),
    closePlayerDom: document.querySelector('.player-footer .close'),
    closePlayerSpanDom: document.querySelector('.player-header span'),
    msgDom: document.querySelector('.msg'),
    closeMsgDom: document.querySelector('.msg-header span')
  }

  // 棋子类型
  var ChessType = {
    BLACK: 1,
    WHITE: 2,
    NULL: 0
  }

  var GameData = {
    // AI是否开启
    AI: true,
    // 游戏状态
    isOver: false,
    // 下个棋子
    nextChess: ChessType.BLACK,
    // 棋子数组
    chessArr: createChessArr(GameConfig, ChessType),
    // 赢法数组
    wins: [],
    // 总的赢法数
    count: 0,
    // 人赢法的统计数组
    myWin: [],
    // AI赢法的统计数组
    computerWin: []
  }
  GameData.wins = fillWins(GameConfig).wins
  GameData.count = fillWins(GameConfig).count
  GameData.myWin = initMyWinAndComputerWin(GameData).myWin
  GameData.computerWin = initMyWinAndComputerWin(GameData).computerWin
  removeChessBoard(GameConfig)
  removeEvents(GameConfig)
  // initMenu(GameConfig)

  showChessBoard(GameConfig, GameData)
  registerEvents(GameConfig, ChessType, GameData)
  showRound(GameConfig, ChessType, GameData)
  showTime(GameConfig)

}

init()











