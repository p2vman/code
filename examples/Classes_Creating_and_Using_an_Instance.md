# Creating and Using an Instance

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

const person1 = new Person('Alice', 30);
person1.greet();  // Output: Hello, my name is Alice and I am 30 years old.

Person.describe();  // Output: This is a class representing a person.