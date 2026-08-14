# JavaScript Data Types

## Primitive Data Types
Primitive data types are the basic built-in data types in JavaScript. They store single values and are copied by value.

Examples:
- String: "Hello"
- Number: 42
- Boolean: true or false
- Undefined: a variable declared but not assigned
- Null: represents no value
- Symbol: unique and immutable value
- BigInt: used for very large integers

## Reference Data Types
Reference data types are used to store collections or complex values. They are stored by reference, which means when one variable is assigned to another, both point to the same object.

Examples:
- Object: { name: "John", age: 25 }
- Array: [1, 2, 3]
- Function: function greet() { console.log("Hello"); }

## Difference Between Primitive and Reference Types
- Primitive types store simple values directly.
- Reference types store addresses of values in memory.
- Primitive values are copied by value.
- Reference values are copied by reference.

## Example
```javascript
let a = 10;
let b = a; // copied by value
b = 20;
console.log(a); // 10

let obj1 = { name: "Alice" };
let obj2 = obj1; // copied by reference
obj2.name = "Bob";
console.log(obj1.name); // Bob

```


## JSON(java script object notation)
-store objects in array format []






