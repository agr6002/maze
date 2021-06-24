$LOAD_PATH << '.'
require 'part.rb'
require 'db.rb'
optionsData = DB.array('maze2.csv')

optionsNode = []
for i in 0...optionsData.length()
  optionsNode.push(Part.new(optionsData[i][0], optionsData[i][1], 
    optionsData[i][2], optionsData[i][3], optionsData[i][4]))
end
for i in 0..(optionsNode.length() - 2) 
  for d in 5...optionsData[i].length
    optionsNode[i].addNode(optionsNode[optionsData[i][d]])
  end
end

oldPart = optionsNode[0]
newPart = optionsNode[0]
while newPart.id() != 'part37'
  newPart = oldPart.maze()
  oldPart = newPart 
  #puts oldPart.id()
end
optionsNode[37].maze()