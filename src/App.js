import "./styles.css";

/* 
Write a function defaultArguments.  It takes a function as an argument, along with an object containing   default values for that function’s arguments, and returns another function which defaults to the correct values.
You cannot assume that the function's arguments have any particular names
You should be able to call defaultArguments repeatedly to change the defaults

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


Hint: This problem requires using Function.prototype.toString() in order to extract a function's argument list.
*/

export default function App() {
  function defaultArguments(func, params) {
    // Get params from func function. i.e add(a,b)
    const input = func.toString().split("(")[1].split(")")[0].match(/[a-z]/g);

    // Local copy func function
    const myFunc = func;

    // Get arguments from func and solve
    func = (...args) => {
      let props = {};
      if (input && args.length > 0) {
        input.forEach((key, index) => {
          if (params[key] ?? args[index] !== undefined)
            props[key] = args[index] ?? params[key];
        });
        return myFunc(...Object.values(props));
      } else return myFunc(...Object.values(params));
    };

    return func;
  }

  // Drivers
  adding(defaultArguments);
  moreAdding(defaultArguments);
  edgeCase(defaultArguments);

  return (
    <div className="App">
      <h1>Function Closures</h1>
      <h2>
        Write a function <i>defaultArguments</i>
      </h2>
      <h3>
        It takes a function as an argument, along with an object containing
        default values for that function’s arguments, and returns another
        function which defaults to the correct values.
      </h3>
      <h3 style={{ textAlign: "left", marginLeft: "15%" }}>
        defaultArguments(func, params)
      </h3>
      <h4 style={{ textAlign: "left", marginLeft: "15%" }}>
        func: Function – A method with default values
        <br />
        params: Object – An object containing, values to be tested against func
        <br />
        Return Value: Function – A function which defaults to the correct values
      </h4>
    </div>
  );
}

function adding(defaultArguments) {
  function add(a, b) {
    return a + b;
  }

  let add_ = defaultArguments(add, { b: 4 });
  console.log("adding_1", add_(10)); // 10

  add_ = defaultArguments(add, { b: 3 });
  console.log("adding_2", add_(10)); // 13
}

function moreAdding(defaultArguments) {
  function f1(a, b, c, d, e) {
    return a + b + c + d + e;
  }

  let addingMore = defaultArguments(f1, { a: 1, b: 2, c: 3, d: 4, e: 5 });
  console.log("more adding", addingMore(10, 10, 10)); // 39
}

function edgeCase(defaultArguments) {
  function add(a, b) {
    return a * b;
  }

  let add_ = defaultArguments(add, { b: 9 });
  console.log("edge case_1", add_(10, 9)); // 90

  function id(_id) {
    return _id;
  }
  let noName = defaultArguments(id, { id: "test" });
  console.log("edge case_2", noName());
}
