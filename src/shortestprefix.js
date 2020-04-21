

const arr = [ 'zebra', 'dog', 'duck', 'dove' ]

const anode = function anode(val,left,right){
  console.log('entered',val,left,right);
  newnode = {}
  newnode.val = val
  console.log('newnode',newnode)

  newnode.setleft= (l) => {
    newnode.left = l
  }

  newnode.setright = (r) => {
    newnode.right = r
  }

  newnode.setright(right)
  newnode.setleft(left)
  return newnode
}


const root = new anode('dog')
console.log('root', root)
console.log('root.val', root.val)
console.log('root.left', root.left)
console.log('root.right', root.right)

const treeroot = {}
const insertTree => (word, treeroot) => {
  if (word.length) <= 0 return treeroot
  if (!treeroot.val){
    treeroot.val =  { val: word[0] }
  }
  else if(treeroot.val>= word[0] ){
    return insertTree(word[0],treeroot.left)
    if (!word[1]){
      return treeroot
    } else if(word[1] < word[0]){
      treeroot.left = {}
      return insertTree(wordsubstring(1),treeroot.left)
    } else {
      treeroot.right = {}
      return insertTree(wordsubstring(1),treeroot.right)
    }

    
  

