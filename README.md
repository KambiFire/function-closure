# function-closure

defaultArguments(func, params)

Takes a function and object as arguments with default object values and returns another function
Parameters:
func: Function – A method with default values
params: Object – An object containing, values to be tested against func
Return Value:
Function – A function which defaults to the correct values



function  add(a,b)  {return  a+b;};

var add_ = defaultArguments (add, {b: 9}),
  add_(10);   //  returns 19 
  add_(10,7);   A/  returns 17
  add_();  //   returns NaN

add_ = defaultArguments(add_, {b: 3, a: 2});
  add_(10);  //  returns 13
  add_();  //   returns  5

add_ = defaultArguments(add_, {c: 3});   // doesn't do anything,  since c isn't an argument
  add_(10);  //   returns NaN
  add_(10,10);   //  returns  20
