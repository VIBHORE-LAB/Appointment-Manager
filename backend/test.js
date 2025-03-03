const bcrypt = require("bcrypt");

const storedHashedPassword = "$2a$10$rXPtvBJUtFIXGA5ynjJ6wOEP.Pg89AT1/bgpUH7A4nZ6d.cnLpdxS";
const enteredPassword = "password123";

bcrypt.compare(enteredPassword, storedHashedPassword, (err, result) => {
    if (err) {
        console.error("Error during comparison:", err);
    } else {
        console.log("Password Match:", result);
    }
});
