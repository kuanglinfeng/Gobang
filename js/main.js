
function init() {
  // 游戏配置
  var GameConfig = {
    rows: 15,
    cols: 15,
    // 棋盘容器
    chessBoardDom: document.querySelector('.chess-board'),
    // 回合显示
    roundChess: document.querySelector('.round-chess'),
    // 当前时间显示
    curTimeDom: document.querySelector('.cur-time'),
    // 用户名字显示
    userNameDom: document.querySelector('.username'),
    // 重开一局
    resetDom: document.querySelector('.reset'),
    // 游戏菜单容器
    gameMenuDom: document.querySelector('.game-menu'),
    // 游戏菜单
    gameMenuContentDom: document.querySelector('.menu-content'),
    // 人机模式-按钮
    personAiDom: document.querySelector('.person-ai'),
    // 双人模式-按钮
    doublePersonDom: document.querySelector('.double-person'),
    // 玩家信息-按钮
    personMsgDom: document.querySelector('.person-msg'),
    // 添加玩家-按钮
    addPersonDom: document.querySelector('.add-person'),
    // 添加玩家容器
    playerDom: document.querySelector('.player'),
    // 玩家名字-输入框
    inputPlayerDom: document.querySelector('.player-body input'),
    // 保存玩家信息-按钮
    savePlayerDom: document.querySelector('.player-footer .save'),
    // 关闭玩家信息-按钮
    closePlayerDom: document.querySelector('.player-footer .close'),
    // 关闭玩家信息
    closePlayerSpanDom: document.querySelector('.player-header span'),
    // 玩家信息容器
    msgDom: document.querySelector('.msg'),
    // 关闭玩家信息
    closeMsgDom: document.querySelector('.msg-header span'),
    // 玩家昵称
    nickNameDom: document.querySelector('#nickName'),
    // 玩家赢局
    winDom: document.querySelector('#win'),
    // 玩家负局
    failDom: document.querySelector('#fail'),
    // 总局数
    totalDom: document.querySelector('#total')
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

  showChessBoard(GameConfig, GameData)
  // 从localStorage搜索玩家信息到后显示姓名
  showPlayerName(GameConfig)
  registerEvents(GameConfig, ChessType, GameData)
  showRound(GameConfig, ChessType, GameData)
  showTime(GameConfig)
}

init()











