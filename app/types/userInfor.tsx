interface User {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone: string;
    company: {
      department: string;
      name: string;
      title: string;
    };
    image: string
  }