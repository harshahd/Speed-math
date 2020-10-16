class Question
{
constructor(left,operator,right)
{
this.left=left;
this.operator=operator;
this.operatorStr="";
this.right=right;
this.answer=0;
}
setAnswer()
{
if(this.operator==2)
{
this.operatorStr="/";
if(this.left==0)
{
this.left=1;
}
if(this.right==0)
{
this.right = 1;
}
this.answer = this.left/this.right;
}
else if(this.operator==3)
{
this.operatorStr="-";
this.answer=this.left-this.right;
}
else if(this.operator==4)
{
this.operatorStr="+";
this.answer = this.left+this.right;
}
else
{
this.operatorStr="*";
this.answer=this.left*this.right;
}
}
}
