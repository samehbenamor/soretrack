class User {
  constructor(
    id,
    name,
    prenom,
    email,
    password = "",
    num_telephone,
    code_paiement,
    credit,
    role
  ) {
    this.id = id;
    this.name = name;
    this.prenom = prenom;
    this.email = email;
    this.password = password;
    this.num_telephone = num_telephone;
    this.code_paiement = code_paiement;
    this.credit = credit;
    this.role = role;
  }
}

export default User;
