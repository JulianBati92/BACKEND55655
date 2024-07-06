class UserDTO {
    constructor({ id, username, email, firstName, lastName, age, address, role }) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.address = address;
        this.role = role;
    }
}

export default UserDTO;
