import bcrypt from "bcryptjs";
const data = {
  users: [
    {
      username: "somsith00",
      email: "somsithbook@gmail.com",
      password: bcrypt.hashSync("1234", 8),
      isAadmin: true,
    },
    {
      username: "lobster00",
      email: "lobster@gmail.com",
      password: bcrypt.hashSync("01234", 8),
      isAadmin: false,
    },
  ],
};

export default data;
