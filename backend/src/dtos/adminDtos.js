class AdminDTO {
  constructor(data) {
    this.id = data.id;
    this.fullName = data.fullName;
    this.email = data.email;
    this.role = data.role;
    this.isActive = data.isActive;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

class AuthResponseDTO {
  constructor(token, admin) {
    this.token = token;
    this.admin = new AdminDTO(admin);
  }
}

module.exports = { AdminDTO, AuthResponseDTO };
