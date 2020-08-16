let game = new Vue({
  el: "#game",
  data: {
    board: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    choose1: {
      x: 0,
      y: 0
    },
    choose2: {
      x: 0,
      y: 0
    }
  },
  methods: {
    getStyle(x, y){
      if((this.choose1.x == x && this.choose1.y == y) || (this.choose2.x == x && this.choose2.y == y)){
        return 'choose'
      }else{
        return
      }
    },
    choose(x, y){
      console.log(x, y)
      if(this.board[x][y]){
        if(this.choose1.x == 0){
          this.choose1.x = x
          this.choose1.y = y
        }else{
          this.choose2.x = x
          this.choose2.y = y
          this.judge()
        }
      }
    },
    judge(){
      let x1 = this.choose1.x, x2 = this.choose2.x, y1 = this.choose1.y, y2 = this.choose2.y
      //判断是不是同一个小动物
      if(this.board[x1][y1] == this.board[x2][y2] && (x1 != x2 || y1 != y2)){
        //判断能不能直接相连
        if(this.judgeLine(this.choose1, this.choose2)){
          this.draw([
            this.choose1,
            this.choose2
          ])
          this.board[x1][y1] = 0
          this.board[x2][y2] = 0
        //判断是不是要拐个弯？
        }else{
          //如果对角点1号为空
          if(this.board[x1][y2] == 0 && this.judgeLine({x: x1, y: y1}, {x: x1, y: y2}) && this.judgeLine({x: x1, y: y2}, {x: x2, y: y2})){
            this.draw([
              this.choose1,
              {x: x1, y: y2},
              this.choose2
            ])
            this.board[x1][y1] = 0
            this.board[x2][y2] = 0
          }else if(this.board[x2][y1] == 0 && this.judgeLine({x: x1, y: y1}, {x: x2, y: y1}) && this.judgeLine({x: x2, y: y1}, {x: x2, y: y2})){
            this.draw([
              this.choose1,
              {x: x2, y: y1},
              this.choose2
            ])
            this.board[x1][y1] = 0
            this.board[x2][y2] = 0
          }else{
            //判断是不是要拐两个弯？
            //往上找点
            if(this.board[x1 - 1][y1] == 0){
              let i = 1
              for(i; x1 - i >= 0 && this.board[x1 - i][y1] == 0; i++){
                let newX = x1 - i
                if(this.board[newX][y1] == 0 && this.board[newX][y2] == 0 && this.judgeLine({x: newX, y: y1}, {x: newX, y: y2}) && this.judgeLine({x: newX, y: y2}, {x: x2, y: y2})){
                  this.draw([
                    this.choose1,
                    {x: newX, y: y1},
                    {x: newX, y: y2},
                    this.choose2
                  ])
                  this.board[x1][y1] = 0
                  this.board[x2][y2] = 0
                  this.choose1 = {
                    x: 0,
                    y: 0
                  }
                  this.choose2 = {
                    x: 0,
                    y: 0
                  }
                  return
                }
              }
            }
            //往下找点
            if(this.board[x1 + 1][y1] == 0){
              let i = 1
              for(i; x1 + i <= 9 && this.board[x1 + i][y1] == 0; i++){
                let newX = x1 + i
                if(this.board[newX][y1] == 0 && this.board[newX][y2] == 0 && this.judgeLine({x: newX, y: y1}, {x: newX, y: y2}) && this.judgeLine({x: newX, y: y2}, {x: x2, y: y2})){
                  this.draw([
                    this.choose1,
                    {x: newX, y: y1},
                    {x: newX, y: y2},
                    this.choose2
                  ])
                  this.board[x1][y1] = 0
                  this.board[x2][y2] = 0
                  this.choose1 = {
                    x: 0,
                    y: 0
                  }
                  this.choose2 = {
                    x: 0,
                    y: 0
                  }
                  return
                }
              }
            }
            //往左找点
            if(this.board[x1][y1 - 1] == 0){
              let i = 1
              for(i; y1 - i >= 0 && this.board[x1][y1 - i] == 0; i++){
                let newY = y1 - i
                if(this.board[x1][newY] == 0 && this.board[x2][newY] == 0 && this.judgeLine({x: x1, y: newY}, {x: x2, y: newY}) && this.judgeLine({x: x2, y: newY}, {x: x2, y: y2})){
                  this.draw([
                    this.choose1,
                    {x: x1, y: newY},
                    {x: x2, y: newY},
                    this.choose2
                  ])
                  this.board[x1][y1] = 0
                  this.board[x2][y2] = 0
                  this.choose1 = {
                    x: 0,
                    y: 0
                  }
                  this.choose2 = {
                    x: 0,
                    y: 0
                  }
                  return
                }
              }
            }
            //往右找点
            if(this.board[x1][y1 + 1] == 0){
              let i = 1
              for(i; y1 + i <= 9 && this.board[x1][y1 + i] == 0; i++){
                let newY = y1 + i
                if(this.board[x1][newY] == 0 && this.board[x2][newY] == 0 && this.judgeLine({x: x1, y: newY}, {x: x2, y: newY}) && this.judgeLine({x: x2, y: newY}, {x: x2, y: y2})){
                  this.draw([
                    this.choose1,
                    {x: x1, y: newY},
                    {x: x2, y: newY},
                    this.choose2
                  ])
                  this.board[x1][y1] = 0
                  this.board[x2][y2] = 0
                  this.choose1 = {
                    x: 0,
                    y: 0
                  }
                  this.choose2 = {
                    x: 0,
                    y: 0
                  }
                  return
                }
              }
            }
          }
        }
      }
      this.choose1 = {
        x: 0,
        y: 0
      }
      this.choose2 = {
        x: 0,
        y: 0
      }
    },
    judgeLine(p1, p2){
      //如果在同一条横线上
      if(p1.x == p2.x){
        //如果在同一条横线上相邻
        if(Math.abs(p1.y - p2.y) == 1){
          return true
        }else{
          //如果它们之间没有阻隔
          let start, end
          if(p1.y < p2.y){
            start = p1.y + 1
            end = p2.y
          }else{
            start = p2.y + 1
            end = p1.y
          }
          for(start; start < end; start++){
            if(this.board[p1.x][start] != 0){
              return false
            }
          }
          return true
        }
        //如果在同一条竖线上相邻
      }else if(p1.y == p2.y){
        if(Math.abs(p1.x - p2.x) == 1){
          return true
        }else{
          //如果它们之间没有阻隔
          let start, end
          if(p1.x < p2.x){
            start = p1.x + 1
            end = p2.x
          }else{
            start = p2.x + 1
            end = p1.x
          }
          for(start; start < end; start++){
            if(this.board[start][p1.y] != 0){
              return false
            }
          }
          return true
        }
      }else{
        return false
      }
    },
    draw(list){
      let lineList = []
      for(let i = 0; i < list.length - 1; i++){
        lineList[i] = new LeaderLine(
          LeaderLine.pointAnchor(this.$refs[list[i].x + '-' + list[i].y][0], {x: '50%', y: '50%'}),
          LeaderLine.pointAnchor(this.$refs[list[i + 1].x + '-' + list[i + 1].y][0], {x: '50%', y: '50%'}),
          {
            startPlug: 'disc',
            startPlugSize: 0.4,
            endPlug: 'disc',
            endPlugSize: 0.4,
            color: '#ffeb41'
          }
        )
      }
      lineList.forEach(item => {
        item.position()
        setTimeout(() => {
          item.remove()
        }, 1000)
      })
    }
  },
  mounted(){
    let arr = []
    for(let i=0; i<32; i++){
      arr[i] = _.random(1, 6)
    }
    arr = arr.concat(arr)
    arr = _.shuffle(arr)
    for(let i in arr){
      this.$set(this.board[parseInt(i/8) + 1], i%8 + 1, arr[i])
    }
  }
})