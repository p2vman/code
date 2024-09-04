Inheritance: The `Employee` class inherits from the `Person` class, using `super` to call the parent class's constructor.

```javascript
class Employee extends Person {
    constructor(name, age, position) {
        super(name, age);
        this.position = position;
    }

    describeJob() {
        console.log(`${this.name} is a ${this.position}.`);
    }
}