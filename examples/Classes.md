This example demonstrates basic concepts in Node.js including classes, methods, and constructors.

## 1. Classes

### Example

```javascript
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }

    static describe() {
        console.log('This is a class representing a person.');
    }
}